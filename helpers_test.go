/*
   Copyright The containerd Authors.

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

package shimtest

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"net"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"sync"
	"syscall"
	"testing"
	"time"

	bootapi "github.com/containerd/containerd/api/runtime/bootstrap/v1"
	taskAPI "github.com/containerd/containerd/api/runtime/task/v3"
	"github.com/containerd/containerd/api/types"
	runcopt "github.com/containerd/containerd/api/types/runc/options"
	"github.com/containerd/containerd/v2/core/mount"
	"github.com/containerd/fifo"
	"github.com/containerd/typeurl/v2"
	"github.com/opencontainers/runtime-spec/specs-go"
	"google.golang.org/protobuf/encoding/protowire"
	"google.golang.org/protobuf/proto"
	"google.golang.org/protobuf/types/known/anypb"
)

// containerID returns a safe container ID derived from the test name,
// replacing characters that are invalid in paths.
func containerID(tb testing.TB) string {
	tb.Helper()
	name := tb.Name()
	// Replace slashes and spaces with hyphens for path safety.
	name = strings.NewReplacer("/", "-", " ", "-").Replace(name)
	// Truncate and add a random suffix for uniqueness.
	if len(name) > 60 {
		name = name[:60]
	}
	return strings.ToLower(name) + "-" + randomSuffix()
}

// randomSuffix generates a short random hex string for uniqueness.
func randomSuffix() string {
	b := make([]byte, 4)
	f, err := os.Open("/dev/urandom")
	if err != nil {
		return "0000"
	}
	defer f.Close()
	f.Read(b)
	return fmt.Sprintf("%x", b)
}

// createOCISpec writes a minimal OCI spec config.json at the given path.
// Each opt is applied to the spec in order before it is written.
func createOCISpec(tb testing.TB, bundleDir string, args []string, opts ...func(*specs.Spec)) {
	tb.Helper()

	spec := specs.Spec{
		Version: specs.Version,
		Root: &specs.Root{
			Path:     "rootfs",
			Readonly: false,
		},
		Process: &specs.Process{
			Args: args,
			Cwd:  "/",
			Env:  []string{"PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"},
		},
		Mounts: []specs.Mount{
			{
				Destination: "/proc",
				Type:        "proc",
				Source:      "proc",
			},
			{
				Destination: "/dev",
				Type:        "tmpfs",
				Source:      "tmpfs",
			},
		},
		Linux: &specs.Linux{
			Namespaces: []specs.LinuxNamespace{
				{Type: specs.MountNamespace},
			},
		},
	}

	// When running rootless, runc requires a user namespace and UID/GID
	// mappings. A PID namespace is also needed so proc can be mounted.
	// When using format mounts the shim runs the container inside a
	// VM where the runtime is always root. User namespace mappings
	// based on the host UID are not applicable.
	if os.Getuid() != 0 && !testCfg.FormatMounts {
		spec.Linux.Namespaces = append(spec.Linux.Namespaces,
			specs.LinuxNamespace{Type: specs.UserNamespace},
			specs.LinuxNamespace{Type: specs.PIDNamespace},
			specs.LinuxNamespace{Type: specs.NetworkNamespace},
		)
		spec.Linux.UIDMappings = []specs.LinuxIDMapping{
			{ContainerID: 0, HostID: uint32(os.Getuid()), Size: 1},
		}
		spec.Linux.GIDMappings = []specs.LinuxIDMapping{
			{ContainerID: 0, HostID: uint32(os.Getgid()), Size: 1},
		}
	}

	for _, opt := range opts {
		opt(&spec)
	}

	data, err := json.Marshal(spec)
	if err != nil {
		tb.Fatal("failed to marshal OCI spec:", err)
	}

	if err := os.WriteFile(filepath.Join(bundleDir, "config.json"), data, 0644); err != nil {
		tb.Fatal("failed to write config.json:", err)
	}
}

// withExtraMounts appends the given mounts to the OCI spec.
func withExtraMounts(mounts ...specs.Mount) func(*specs.Spec) {
	return func(s *specs.Spec) {
		s.Mounts = append(s.Mounts, mounts...)
	}
}

// withMemoryLimit sets the memory limit (in bytes) on the OCI spec,
// with swap set equal to the limit so the container cannot grow via
// swap before the OOM killer fires.
func withMemoryLimit(bytes int64) func(*specs.Spec) {
	return func(s *specs.Spec) {
		if s.Linux.Resources == nil {
			s.Linux.Resources = &specs.LinuxResources{}
		}
		s.Linux.Resources.Memory = &specs.LinuxMemory{
			Limit: &bytes,
			Swap:  &bytes,
		}
	}
}

// shimSetup finds the shim binary and creates a bundle directory.
// Returns the shim binary path, bundle directory, and rootfs mounts
// built from the embedded testbin rootfs.
func shimSetup(tb testing.TB) (shimBin, bundleDir string, rootfsMounts []*types.Mount) {
	tb.Helper()

	shimBin, err := exec.LookPath(testCfg.ShimBinary)
	if err != nil {
		tb.Fatalf("shim binary %q not found in PATH: %v", testCfg.ShimBinary, err)
	}

	// Ensure the shim binary's directory is in PATH so that sibling
	// binaries (e.g. nerdbox-kernel, libkrun.so) are discoverable.
	shimDir := filepath.Dir(shimBin)
	if !strings.Contains(os.Getenv("PATH"), shimDir) {
		os.Setenv("PATH", shimDir+":"+os.Getenv("PATH"))
	}

	bundleDir = tb.TempDir()
	bundleDir, err = filepath.EvalSymlinks(bundleDir)
	if err != nil {
		tb.Fatal("failed to resolve bundle dir:", err)
	}

	// Create the rootfs directory (needed for the bundle even if using mounts)
	rootfsDir := filepath.Join(bundleDir, "rootfs")
	if err := os.MkdirAll(rootfsDir, 0755); err != nil {
		tb.Fatal("failed to create rootfs dir:", err)
	}
	// Unmount rootfs on cleanup — the shim may have mounted an overlay
	// here, and without a mount namespace it persists in the host.
	tb.Cleanup(func() {
		mount.Unmount(rootfsDir, 0)
	})

	rootfsMounts = buildEmbeddedRootfs(tb, bundleDir)

	return shimBin, bundleDir, rootfsMounts
}

// containerdSockPath is the unix socket path inside a bundle that the
// shim dials as its containerd events endpoint.
func containerdSockPath(bundleDir string) string {
	return filepath.Join(bundleDir, "c.sock")
}

// createIOFifos creates stdout and stderr FIFOs in the given directory.
func createIOFifos(tb testing.TB, dir string) (stdoutPath, stderrPath string) {
	tb.Helper()
	stdoutPath = filepath.Join(dir, "stdout")
	stderrPath = filepath.Join(dir, "stderr")
	if err := syscall.Mkfifo(stdoutPath, 0600); err != nil {
		tb.Fatal("failed to create stdout fifo:", err)
	}
	if err := syscall.Mkfifo(stderrPath, 0600); err != nil {
		tb.Fatal("failed to create stderr fifo:", err)
	}
	return
}

// createStdioFifos creates stdin, stdout, and stderr FIFOs in the given directory.
func createStdioFifos(tb testing.TB, dir string) (stdinPath, stdoutPath, stderrPath string) {
	tb.Helper()
	stdinPath = filepath.Join(dir, "stdin")
	stdoutPath = filepath.Join(dir, "stdout")
	stderrPath = filepath.Join(dir, "stderr")
	if err := syscall.Mkfifo(stdinPath, 0600); err != nil {
		tb.Fatal("failed to create stdin fifo:", err)
	}
	if err := syscall.Mkfifo(stdoutPath, 0600); err != nil {
		tb.Fatal("failed to create stdout fifo:", err)
	}
	if err := syscall.Mkfifo(stderrPath, 0600); err != nil {
		tb.Fatal("failed to create stderr fifo:", err)
	}
	return
}

// drainFifo opens a FIFO for reading and discards all data in a goroutine.
func drainFifo(tb testing.TB, ctx context.Context, path string) {
	tb.Helper()
	f, err := fifo.OpenFifo(ctx, path, syscall.O_RDONLY|syscall.O_NONBLOCK, 0)
	if err != nil {
		tb.Fatal("failed to open fifo:", err)
	}
	go func() {
		buf := make([]byte, 32768)
		for {
			if _, err := f.Read(buf); err != nil {
				return
			}
		}
	}()
	tb.Cleanup(func() { f.Close() })
}

// drainFifoInto opens a FIFO for reading and copies data into buf (protected by mu).
func drainFifoInto(tb testing.TB, ctx context.Context, path string, buf *bytes.Buffer, mu *sync.Mutex) {
	tb.Helper()
	f, err := fifo.OpenFifo(ctx, path, syscall.O_RDONLY|syscall.O_NONBLOCK, 0)
	if err != nil {
		tb.Fatal("failed to open fifo:", err)
	}
	go func() {
		b := make([]byte, 4096)
		for {
			n, err := f.Read(b)
			if n > 0 {
				mu.Lock()
				buf.Write(b[:n])
				mu.Unlock()
			}
			if err != nil {
				return
			}
		}
	}()
	tb.Cleanup(func() { f.Close() })
}

// newCreateTaskRequest builds a CreateTaskRequest with runc Options.
// SystemdCgroup is explicitly set to false on every request so both
// root and rootless runs use the cgroupfs manager — otherwise root
// on systemd hosts (notably GHA) pays tens of ms of DBus round-trips
// per container lifecycle, skewing benchmark comparisons.
//
// Rootless paths additionally need:
//   - IoUid/IoGid set to the current user (avoids chown EPERM)
//   - Root set to a writable temp directory (avoids /run/containerd/runc EPERM)
func newCreateTaskRequest(tb testing.TB, id, bundle, stdout, stderr string, rootfs []*types.Mount) *taskAPI.CreateTaskRequest {
	tb.Helper()
	req := &taskAPI.CreateTaskRequest{
		ID:     id,
		Bundle: bundle,
		Stdout: stdout,
		Stderr: stderr,
		Rootfs: rootfs,
	}
	opts := &runcopt.Options{
		SystemdCgroup: false,
	}
	uid := os.Getuid()
	gid := os.Getgid()
	if uid != 0 {
		runcRoot := filepath.Join(os.TempDir(), "shimtest-runc")
		os.MkdirAll(runcRoot, 0700)
		opts.IoUid = uint32(uid)
		opts.IoGid = uint32(gid)
		opts.Root = runcRoot
	}
	any, err := typeurl.MarshalAnyToProto(opts)
	if err != nil {
		tb.Fatal("failed to marshal runc options:", err)
	}
	req.Options = &anypb.Any{
		TypeUrl: any.TypeUrl,
		Value:   any.Value,
	}
	return req
}

// bootstrapParams is the JSON payload returned on stdout from `shim start`.
type bootstrapParams struct {
	Version  int    `json:"version"`
	Address  string `json:"address"`
	Protocol string `json:"protocol"`
}

// parseBootstrapResult tries to decode the shim's start response.
// Newer shims (containerd v2.3+) return protobuf; older ones return JSON.
func parseBootstrapResult(data []byte, params *bootstrapParams) error {
	// Try JSON first (older shims).
	if len(data) > 0 && data[0] == '{' {
		return json.Unmarshal(data, params)
	}

	// Try protobuf: BootstrapResult has version (field 1, varint),
	// address (field 2, string), protocol (field 3, string).
	b := data
	for len(b) > 0 {
		num, wtype, n := protowire.ConsumeTag(b)
		if n < 0 {
			return fmt.Errorf("invalid protobuf tag")
		}
		b = b[n:]
		switch wtype {
		case protowire.VarintType:
			v, n := protowire.ConsumeVarint(b)
			if n < 0 {
				return fmt.Errorf("invalid protobuf varint")
			}
			b = b[n:]
			if num == 1 {
				params.Version = int(v)
			}
		case protowire.BytesType:
			v, n := protowire.ConsumeBytes(b)
			if n < 0 {
				return fmt.Errorf("invalid protobuf bytes")
			}
			b = b[n:]
			switch num {
			case 2:
				params.Address = string(v)
			case 3:
				params.Protocol = string(v)
			}
		default:
			return fmt.Errorf("unexpected protobuf wire type %d for field %d", wtype, num)
		}
	}
	if params.Address == "" {
		return fmt.Errorf("no address in bootstrap result")
	}
	return nil
}

// startShim runs the shim binary's "start" subcommand and returns the
// bootstrap params.
func startShim(tb testing.TB, shimBin, bundleDir, id, ns string) bootstrapParams {
	tb.Helper()

	socketDir, err := os.MkdirTemp("/tmp", "nb-")
	if err != nil {
		tb.Fatal("failed to create socket dir:", err)
	}
	tb.Cleanup(func() { os.RemoveAll(socketDir) })

	logPath := filepath.Join(bundleDir, "log")
	if err := syscall.Mkfifo(logPath, 0700); err != nil {
		tb.Fatal("failed to create log fifo:", err)
	}
	logFifo, err := fifo.OpenFifo(context.Background(), logPath, syscall.O_RDONLY|syscall.O_NONBLOCK, 0)
	if err != nil {
		tb.Fatal("failed to open log fifo:", err)
	}
	// Buffer shim logs and only dump them on test failure. Benchmarks
	// always discard — shim log lines would otherwise truncate the
	// benchmark result output.
	_, isBench := tb.(*testing.B)
	var logBuf bytes.Buffer
	done := make(chan struct{})
	go func() {
		defer close(done)
		buf := make([]byte, 32768)
		for {
			n, err := logFifo.Read(buf)
			if n > 0 && !isBench {
				logBuf.Write(buf[:n])
			}
			if err != nil {
				return
			}
		}
	}()
	// Cleanup order (LIFO): dump runs first (below). It falls through
	// to the Close/wait cleanup, which shuts the FIFO and blocks until
	// the reader has finished appending — so the buffer is complete
	// by the time we read it in the dump.
	if !isBench {
		tb.Cleanup(func() {
			if !tb.Failed() {
				return
			}
			if logBuf.Len() == 0 {
				return
			}
			tb.Logf("shim logs:\n%s", logBuf.String())
		})
	}
	tb.Cleanup(func() {
		logFifo.Close()
		<-done
	})

	containerdAddr := containerdSockPath(bundleDir)

	// Build bootstrap params to send on stdin (new protocol).
	bootParams := &bootapi.BootstrapParams{
		InstanceID:            id,
		Namespace:             ns,
		ContainerdGrpcAddress: containerdAddr,
		SocketDir:             &socketDir,
	}
	if testCfg.Debug {
		bootParams.LogLevel = bootapi.LogLevel_LOG_LEVEL_DEBUG
	}
	bootData, err := proto.Marshal(bootParams)
	if err != nil {
		tb.Fatal("marshal bootstrap params:", err)
	}

	// Legacy flags are still passed for older shims.
	shimArgs := []string{
		"-namespace", ns,
		"-id", id,
		"-address", containerdAddr,
	}
	if testCfg.Debug {
		shimArgs = append(shimArgs, "-debug")
	}
	shimArgs = append(shimArgs, "start")
	cmd := exec.Command(shimBin, shimArgs...)
	cmd.Dir = bundleDir
	cmd.Stdin = bytes.NewReader(bootData)
	cmd.Env = append(os.Environ(),
		"GOMAXPROCS=2",
		"SHIM_SOCKET_DIR="+socketDir,
		// TTRPC_ADDRESS is where the shim forwards events. When a test
		// has bound an eventRecorder to this path it will receive them;
		// otherwise the publish calls fail with ENOENT and are logged
		// but not fatal.
		"TTRPC_ADDRESS="+containerdAddr,
	)

	var stdout, stderr bytes.Buffer
	cmd.Stdout = &stdout
	cmd.Stderr = &stderr

	if err := cmd.Run(); err != nil {
		tb.Fatalf("shim start failed: %v\nstderr: %s", err, stderr.String())
	}

	var params bootstrapParams
	if err := parseBootstrapResult(stdout.Bytes(), &params); err != nil {
		tb.Fatalf("failed to parse bootstrap params: %v\nraw stdout: %s", err, stdout.String())
	}

	if params.Address == "" {
		tb.Fatal("shim returned empty address")
	}

	// Read the shim PID now so we can verify cleanup later.
	var shimPid int
	if data, err := os.ReadFile(filepath.Join(bundleDir, "shim.pid")); err == nil {
		shimPid, _ = parseIntBytes(data)
	}
	if shimPid > 0 {
		tb.Logf("shim pid: %d", shimPid)
	}

	tb.Cleanup(func() {
		if shimPid <= 0 {
			return
		}

		// Check if already gone.
		if syscall.Kill(shimPid, 0) != nil {
			return
		}

		// Send SIGTERM and wait up to 3s for graceful exit.
		syscall.Kill(shimPid, syscall.SIGTERM)
		for i := 0; i < 30; i++ {
			time.Sleep(100 * time.Millisecond)
			if syscall.Kill(shimPid, 0) != nil {
				return
			}
		}

		// Still alive — force kill.
		tb.Errorf("shim process %d did not exit after SIGTERM, sending SIGKILL", shimPid)
		syscall.Kill(shimPid, syscall.SIGKILL)
		// Wait for the zombie to be reaped.
		if p, err := os.FindProcess(shimPid); err == nil {
			p.Wait()
		}
	})

	return params
}

// parseIntBytes parses a decimal integer from a byte slice.
func parseIntBytes(b []byte) (int, error) {
	s := strings.TrimSpace(string(b))
	var n int
	for _, c := range s {
		if c < '0' || c > '9' {
			return 0, nil
		}
		n = n*10 + int(c-'0')
	}
	return n, nil
}

// connectShim dials the shim's TTRPC unix socket.
func connectShim(tb testing.TB, address string) net.Conn {
	tb.Helper()
	addr := strings.TrimPrefix(address, "unix://")
	conn, err := net.Dial("unix", addr)
	if err != nil {
		tb.Fatalf("failed to connect to shim at %s: %v", addr, err)
	}
	tb.Cleanup(func() { conn.Close() })
	return conn
}
