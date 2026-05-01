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
	"fmt"
	"io"
	"os"
	"path/filepath"
	"strconv"
	"strings"
	"sync"
	"syscall"
	"testing"
	"time"

	taskAPI "github.com/containerd/containerd/api/runtime/task/v3"
	"github.com/containerd/containerd/v2/pkg/namespaces"
	"github.com/containerd/fifo"
	"github.com/containerd/ttrpc"
	typeurl "github.com/containerd/typeurl/v2"
	"github.com/opencontainers/runtime-spec/specs-go"
)

// ExecSuite contains tests gated on the "exec" feature: running
// processes inside a container, stdio round-trip, the in-VM clock,
// exec exit-code propagation, and file-IO benchmarks driven via
// hashverify.
type ExecSuite struct {
	cfg   Config
	setup ShimSetupFunc
}

// NewExecSuite constructs an ExecSuite from the given options.
func NewExecSuite(opts SuiteOptions) *ExecSuite {
	return &ExecSuite{cfg: opts.Config, setup: opts.resolveSetup()}
}

// Run runs every test in the suite as a subtest of t.
func (s *ExecSuite) Run(t *testing.T) {
	t.Helper()
	t.Run("Exec", s.TestExec)
	t.Run("StdioRoundTrip", s.TestStdioRoundTrip)
	t.Run("Clock", s.TestClock)
	t.Run("ExitCodes", s.TestExitCodes)
	t.Run("LargeFileRead", s.TestLargeFileRead)
	t.Run("BindMountRead", s.TestBindMountRead)
}

// TestExec runs `echo execworks` inside a container and verifies the
// stdout makes it back through the shim.
func (s *ExecSuite) TestExec(t *testing.T) {
	shimBin, bundleDir, rootfsMounts := ShimSetup(t, s.cfg)
	containerID := ContainerID(t)

	CreateOCISpecCfg(t, bundleDir, []string{"/bin/forever"}, s.cfg)

	stdoutPath, stderrPath := CreateIOFifos(t, bundleDir)
	ctx := namespaces.WithNamespace(t.Context(), Namespace)

	params := StartShim(t, shimBin, bundleDir, containerID, Namespace, s.cfg)
	conn := ConnectShim(t, params.Address)
	client := ttrpc.NewClient(conn)
	defer client.Close()

	tc := taskAPI.NewTTRPCTaskClient(client)

	DrainFifo(t, ctx, stdoutPath)
	DrainFifo(t, ctx, stderrPath)

	if _, err := tc.Create(ctx, NewCreateTaskRequest(t, containerID, bundleDir, stdoutPath, stderrPath, rootfsMounts)); err != nil {
		t.Fatal("create failed:", err)
	}
	if _, err := tc.Start(ctx, &taskAPI.StartRequest{ID: containerID}); err != nil {
		t.Fatal("start failed:", err)
	}

	execID := "exec1"
	execStdout, execStderr := CreateIOFifos(t, t.TempDir())

	var execBuf bytes.Buffer
	var execMu sync.Mutex
	DrainFifoInto(t, ctx, execStdout, &execBuf, &execMu)
	DrainFifo(t, ctx, execStderr)

	procSpec, err := typeurl.MarshalAnyToProto(&specs.Process{
		Args: []string{"/bin/echo", "execworks"},
		Cwd:  "/",
		Env:  []string{"PATH=/bin:/usr/bin"},
	})
	if err != nil {
		t.Fatal("failed to marshal exec spec:", err)
	}

	if _, err := tc.Exec(ctx, &taskAPI.ExecProcessRequest{
		ID:     containerID,
		ExecID: execID,
		Spec:   procSpec,
		Stdout: execStdout,
		Stderr: execStderr,
	}); err != nil {
		t.Fatal("exec failed:", err)
	}

	if _, err := tc.Start(ctx, &taskAPI.StartRequest{ID: containerID, ExecID: execID}); err != nil {
		t.Fatal("exec start failed:", err)
	}

	waitResp, err := tc.Wait(ctx, &taskAPI.WaitRequest{ID: containerID, ExecID: execID})
	if err != nil {
		t.Fatal("exec wait failed:", err)
	}
	t.Log("exec exit status:", waitResp.ExitStatus)

	time.Sleep(200 * time.Millisecond)

	execMu.Lock()
	got := execBuf.String()
	execMu.Unlock()
	t.Log("exec stdout:", strings.TrimSpace(got))

	if !strings.Contains(got, "execworks") {
		t.Fatalf("exec output %q does not contain 'execworks'", got)
	}

	if _, err := tc.Delete(ctx, &taskAPI.DeleteRequest{ID: containerID, ExecID: execID}); err != nil {
		t.Fatal("exec delete failed:", err)
	}

	tc.Kill(ctx, &taskAPI.KillRequest{ID: containerID, Signal: uint32(syscall.SIGKILL), All: true})
	tc.Wait(ctx, &taskAPI.WaitRequest{ID: containerID})
	tc.Delete(ctx, &taskAPI.DeleteRequest{ID: containerID})
	tc.Shutdown(ctx, &taskAPI.ShutdownRequest{ID: containerID})
}

// TestStdioRoundTrip writes a token to stdin of an exec'd `cat` and
// verifies the same token is read back from stdout.
func (s *ExecSuite) TestStdioRoundTrip(t *testing.T) {
	shimBin, bundleDir, rootfsMounts := ShimSetup(t, s.cfg)
	containerID := ContainerID(t)

	CreateOCISpecCfg(t, bundleDir, []string{"/bin/forever"}, s.cfg)

	stdoutPath, stderrPath := CreateIOFifos(t, bundleDir)
	ctx := namespaces.WithNamespace(t.Context(), Namespace)

	params := StartShim(t, shimBin, bundleDir, containerID, Namespace, s.cfg)
	conn := ConnectShim(t, params.Address)
	client := ttrpc.NewClient(conn)
	defer client.Close()

	tc := taskAPI.NewTTRPCTaskClient(client)

	DrainFifo(t, ctx, stdoutPath)
	DrainFifo(t, ctx, stderrPath)

	if _, err := tc.Create(ctx, NewCreateTaskRequest(t, containerID, bundleDir, stdoutPath, stderrPath, rootfsMounts)); err != nil {
		t.Fatal("create failed:", err)
	}
	if _, err := tc.Start(ctx, &taskAPI.StartRequest{ID: containerID}); err != nil {
		t.Fatal("start failed:", err)
	}

	execID := "stdio-rt"
	execDir := t.TempDir()
	execStdin, execStdout, execStderr := CreateStdioFifos(t, execDir)

	var execBuf bytes.Buffer
	var execMu sync.Mutex
	DrainFifoInto(t, ctx, execStdout, &execBuf, &execMu)
	DrainFifo(t, ctx, execStderr)

	stdinFifo, err := fifo.OpenFifo(ctx, execStdin, syscall.O_WRONLY|syscall.O_NONBLOCK, 0)
	if err != nil {
		t.Fatal("open stdin fifo:", err)
	}
	defer stdinFifo.Close()

	procSpec, err := typeurl.MarshalAnyToProto(&specs.Process{
		Args: []string{"/bin/cat"},
		Cwd:  "/",
		Env:  []string{"PATH=/bin:/usr/bin"},
	})
	if err != nil {
		t.Fatal("marshal exec spec:", err)
	}

	if _, err := tc.Exec(ctx, &taskAPI.ExecProcessRequest{
		ID:     containerID,
		ExecID: execID,
		Spec:   procSpec,
		Stdin:  execStdin,
		Stdout: execStdout,
		Stderr: execStderr,
	}); err != nil {
		t.Fatal("exec failed:", err)
	}
	if _, err := tc.Start(ctx, &taskAPI.StartRequest{ID: containerID, ExecID: execID}); err != nil {
		t.Fatal("exec start failed:", err)
	}

	token := RandomSuffix() + "\n"
	if _, err := stdinFifo.Write([]byte(token)); err != nil {
		t.Fatal("write to stdin:", err)
	}

	deadline := time.After(30 * time.Second)
	for {
		execMu.Lock()
		got := execBuf.String()
		execMu.Unlock()
		if strings.Contains(got, strings.TrimSpace(token)) {
			t.Log("stdio round trip succeeded, got:", strings.TrimSpace(got))
			break
		}
		select {
		case <-deadline:
			t.Fatalf("timed out waiting for stdio round trip, got: %q", got)
		case <-time.After(10 * time.Millisecond):
		}
	}

	stdinFifo.Close()
	tc.Kill(ctx, &taskAPI.KillRequest{ID: containerID, ExecID: execID, Signal: uint32(syscall.SIGKILL)})
	tc.Wait(ctx, &taskAPI.WaitRequest{ID: containerID, ExecID: execID})
	tc.Delete(ctx, &taskAPI.DeleteRequest{ID: containerID, ExecID: execID})
	tc.Kill(ctx, &taskAPI.KillRequest{ID: containerID, Signal: uint32(syscall.SIGKILL), All: true})
	tc.Wait(ctx, &taskAPI.WaitRequest{ID: containerID})
	tc.Delete(ctx, &taskAPI.DeleteRequest{ID: containerID})
	tc.Shutdown(ctx, &taskAPI.ShutdownRequest{ID: containerID})
}

// TestClock verifies the in-container clock matches the host's
// (within a tolerance) by running `date +%s` and bracketing it with
// host timestamps.
func (s *ExecSuite) TestClock(t *testing.T) {
	shimBin, bundleDir, rootfsMounts := ShimSetup(t, s.cfg)
	containerID := ContainerID(t)

	CreateOCISpecCfg(t, bundleDir, []string{"/bin/forever"}, s.cfg)

	stdoutPath, stderrPath := CreateIOFifos(t, bundleDir)
	ctx := namespaces.WithNamespace(t.Context(), Namespace)

	params := StartShim(t, shimBin, bundleDir, containerID, Namespace, s.cfg)
	conn := ConnectShim(t, params.Address)
	client := ttrpc.NewClient(conn)
	defer client.Close()

	tc := taskAPI.NewTTRPCTaskClient(client)

	DrainFifo(t, ctx, stdoutPath)
	DrainFifo(t, ctx, stderrPath)

	if _, err := tc.Create(ctx, NewCreateTaskRequest(t, containerID, bundleDir, stdoutPath, stderrPath, rootfsMounts)); err != nil {
		t.Fatal("create failed:", err)
	}
	if _, err := tc.Start(ctx, &taskAPI.StartRequest{ID: containerID}); err != nil {
		t.Fatal("start failed:", err)
	}

	execID := "clock1"
	execStdout, execStderr := CreateIOFifos(t, t.TempDir())

	var execBuf bytes.Buffer
	var execMu sync.Mutex
	DrainFifoInto(t, ctx, execStdout, &execBuf, &execMu)
	DrainFifo(t, ctx, execStderr)

	procSpec, err := typeurl.MarshalAnyToProto(&specs.Process{
		Args: []string{"/bin/date", "+%s"},
		Cwd:  "/",
		Env:  []string{"PATH=/bin:/usr/bin:/sbin:/usr/sbin"},
	})
	if err != nil {
		t.Fatal("failed to marshal exec spec:", err)
	}

	before := time.Now()
	if _, err := tc.Exec(ctx, &taskAPI.ExecProcessRequest{
		ID:     containerID,
		ExecID: execID,
		Spec:   procSpec,
		Stdout: execStdout,
		Stderr: execStderr,
	}); err != nil {
		t.Fatal("exec failed:", err)
	}
	if _, err := tc.Start(ctx, &taskAPI.StartRequest{ID: containerID, ExecID: execID}); err != nil {
		t.Fatal("exec start failed:", err)
	}

	waitResp, err := tc.Wait(ctx, &taskAPI.WaitRequest{ID: containerID, ExecID: execID})
	if err != nil {
		t.Fatal("exec wait failed:", err)
	}
	after := time.Now()

	if waitResp.ExitStatus != 0 {
		t.Fatalf("clock exec exited with status %d", waitResp.ExitStatus)
	}
	time.Sleep(200 * time.Millisecond)

	execMu.Lock()
	got := strings.TrimSpace(execBuf.String())
	execMu.Unlock()
	t.Log("clock exec output:", got)

	vmEpoch, err := strconv.ParseInt(got, 10, 64)
	if err != nil {
		t.Fatalf("failed to parse VM timestamp %q: %v", got, err)
	}

	vmTime := time.Unix(vmEpoch, 0)
	t.Logf("host before: %s", before.UTC())
	t.Logf("VM time:     %s (epoch %d)", vmTime.UTC(), vmEpoch)
	t.Logf("host after:  %s", after.UTC())

	tolerance := 2 * time.Second
	if vmTime.Before(before.Add(-tolerance)) || vmTime.After(after.Add(tolerance)) {
		t.Fatalf("VM clock is not synchronized: VM=%s, host range=[%s, %s], drift=%s",
			vmTime.UTC(), before.UTC(), after.UTC(),
			fmt.Sprintf("%+.1fs", vmTime.Sub(before).Seconds()))
	}

	if _, err := tc.Delete(ctx, &taskAPI.DeleteRequest{ID: containerID, ExecID: execID}); err != nil {
		t.Fatal("exec delete failed:", err)
	}
	tc.Kill(ctx, &taskAPI.KillRequest{ID: containerID, Signal: uint32(syscall.SIGKILL), All: true})
	tc.Wait(ctx, &taskAPI.WaitRequest{ID: containerID})
	tc.Delete(ctx, &taskAPI.DeleteRequest{ID: containerID})
	tc.Shutdown(ctx, &taskAPI.ShutdownRequest{ID: containerID})
}

// TestExitCodes runs /bin/exit N inside a container via exec for a
// range of values and verifies each is propagated back via Wait.
func (s *ExecSuite) TestExitCodes(t *testing.T) {
	shimBin, bundleDir, rootfsMounts := ShimSetup(t, s.cfg)
	containerID := ContainerID(t)

	CreateOCISpecCfg(t, bundleDir, []string{"/bin/forever"}, s.cfg)

	stdoutPath, stderrPath := CreateIOFifos(t, bundleDir)
	ctx := namespaces.WithNamespace(t.Context(), Namespace)

	params := StartShim(t, shimBin, bundleDir, containerID, Namespace, s.cfg)
	conn := ConnectShim(t, params.Address)
	client := ttrpc.NewClient(conn)
	defer client.Close()

	tc := taskAPI.NewTTRPCTaskClient(client)

	DrainFifo(t, ctx, stdoutPath)
	DrainFifo(t, ctx, stderrPath)

	if _, err := tc.Create(ctx, NewCreateTaskRequest(t, containerID, bundleDir, stdoutPath, stderrPath, rootfsMounts)); err != nil {
		t.Fatal("create failed:", err)
	}
	if _, err := tc.Start(ctx, &taskAPI.StartRequest{ID: containerID}); err != nil {
		t.Fatal("start failed:", err)
	}

	for i, code := range []int{0, 1, 2, 42, 127, 255} {
		t.Run(fmt.Sprintf("Exit%d", code), func(t *testing.T) {
			execID := fmt.Sprintf("exit-%d", i)
			execStdout, execStderr := CreateIOFifos(t, t.TempDir())
			DrainFifo(t, ctx, execStdout)
			DrainFifo(t, ctx, execStderr)

			procSpec, err := typeurl.MarshalAnyToProto(&specs.Process{
				Args: []string{"/bin/exit", strconv.Itoa(code)},
				Cwd:  "/",
				Env:  []string{"PATH=/bin:/usr/bin"},
			})
			if err != nil {
				t.Fatal("marshal exec spec:", err)
			}

			if _, err := tc.Exec(ctx, &taskAPI.ExecProcessRequest{
				ID:     containerID,
				ExecID: execID,
				Spec:   procSpec,
				Stdout: execStdout,
				Stderr: execStderr,
			}); err != nil {
				t.Fatal("exec failed:", err)
			}
			if _, err := tc.Start(ctx, &taskAPI.StartRequest{ID: containerID, ExecID: execID}); err != nil {
				t.Fatal("exec start failed:", err)
			}

			waitResp, err := tc.Wait(ctx, &taskAPI.WaitRequest{ID: containerID, ExecID: execID})
			if err != nil {
				t.Fatal("exec wait failed:", err)
			}
			if waitResp.ExitStatus != uint32(code) {
				t.Fatalf("expected exit status %d, got %d", code, waitResp.ExitStatus)
			}
			if _, err := tc.Delete(ctx, &taskAPI.DeleteRequest{ID: containerID, ExecID: execID}); err != nil {
				t.Fatal("exec delete failed:", err)
			}
		})
	}

	tc.Kill(ctx, &taskAPI.KillRequest{ID: containerID, Signal: uint32(syscall.SIGKILL), All: true})
	tc.Wait(ctx, &taskAPI.WaitRequest{ID: containerID})
	tc.Delete(ctx, &taskAPI.DeleteRequest{ID: containerID})
	tc.Shutdown(ctx, &taskAPI.ShutdownRequest{ID: containerID})
}

// TestLargeFileRead reads /data/bigfile (a 64 MiB fixture from the
// secondary read-only erofs layer) inside the container, verifies
// its crc32-Castagnoli, and reports throughput.
func (s *ExecSuite) TestLargeFileRead(t *testing.T) {
	s.runHashverify(t, BigFileContainerPath, BigFileHashHex(), nil)
}

// TestBindMountRead streams the same 64 MiB fixture into a host
// tempfile, bind-mounts it into the container, and runs hashverify
// against the bind path.
func (s *ExecSuite) TestBindMountRead(t *testing.T) {
	hostFile := filepath.Join(t.TempDir(), "bigfile")
	f, err := os.Create(hostFile)
	if err != nil {
		t.Fatal("create host bigfile:", err)
	}
	if _, err := io.Copy(f, NewBigFileReader()); err != nil {
		f.Close()
		t.Fatal("write host bigfile:", err)
	}
	if err := f.Close(); err != nil {
		t.Fatal("close host bigfile:", err)
	}

	const containerPath = "/tmp/bigfile"
	mount := specs.Mount{
		Type:        "bind",
		Source:      hostFile,
		Destination: containerPath,
		Options:     []string{"rbind"},
	}
	s.runHashverify(t, containerPath, BigFileHashHex(), []specs.Mount{mount})
}

// runHashverify spins up a container with the given extra mounts,
// execs /bin/hashverify against the path, parses
// "ok bytes=N ns=M cpu_bound=K" from stdout, and reports throughput
// via t.Log.
func (s *ExecSuite) runHashverify(t *testing.T, path, hashHex string, extraMounts []specs.Mount) {
	t.Helper()
	shimBin, bundleDir, rootfsMounts := ShimSetup(t, s.cfg)
	cid := ContainerID(t)

	var opts []func(*specs.Spec)
	if len(extraMounts) > 0 {
		opts = append(opts, WithExtraMounts(extraMounts...))
	}
	CreateOCISpecCfg(t, bundleDir, []string{"/bin/forever"}, s.cfg, opts...)

	stdoutPath, stderrPath := CreateIOFifos(t, bundleDir)
	ctx := namespaces.WithNamespace(t.Context(), Namespace)

	params := StartShim(t, shimBin, bundleDir, cid, Namespace, s.cfg)
	conn := ConnectShim(t, params.Address)
	client := ttrpc.NewClient(conn)
	defer client.Close()

	tc := taskAPI.NewTTRPCTaskClient(client)

	DrainFifo(t, ctx, stdoutPath)
	DrainFifo(t, ctx, stderrPath)

	if _, err := tc.Create(ctx, NewCreateTaskRequest(t, cid, bundleDir, stdoutPath, stderrPath, rootfsMounts)); err != nil {
		t.Fatal("create failed:", err)
	}
	if _, err := tc.Start(ctx, &taskAPI.StartRequest{ID: cid}); err != nil {
		t.Fatal("start failed:", err)
	}

	execID := "hashv"
	execStdout, execStderr := CreateIOFifos(t, t.TempDir())
	var execBuf bytes.Buffer
	var execMu sync.Mutex
	DrainFifoInto(t, ctx, execStdout, &execBuf, &execMu)
	DrainFifo(t, ctx, execStderr)

	procSpec, err := typeurl.MarshalAnyToProto(&specs.Process{
		Args: []string{"/bin/hashverify", path, hashHex},
		Cwd:  "/",
		Env:  []string{"PATH=/bin:/usr/bin"},
	})
	if err != nil {
		t.Fatal("marshal exec spec:", err)
	}

	if _, err := tc.Exec(ctx, &taskAPI.ExecProcessRequest{
		ID:     cid,
		ExecID: execID,
		Spec:   procSpec,
		Stdout: execStdout,
		Stderr: execStderr,
	}); err != nil {
		t.Fatal("exec failed:", err)
	}
	if _, err := tc.Start(ctx, &taskAPI.StartRequest{ID: cid, ExecID: execID}); err != nil {
		t.Fatal("exec start failed:", err)
	}

	waitResp, err := tc.Wait(ctx, &taskAPI.WaitRequest{ID: cid, ExecID: execID})
	if err != nil {
		t.Fatal("exec wait failed:", err)
	}
	if waitResp.ExitStatus != 0 {
		t.Fatalf("hashverify exit status %d", waitResp.ExitStatus)
	}

	time.Sleep(200 * time.Millisecond)

	execMu.Lock()
	out := strings.TrimSpace(execBuf.String())
	execMu.Unlock()

	var nBytes, elapsedNS, cpuBound int64
	parsed, err := fmt.Sscanf(out, "ok bytes=%d ns=%d cpu_bound=%d", &nBytes, &elapsedNS, &cpuBound)
	if err != nil || parsed != 3 {
		t.Fatalf("could not parse hashverify output %q: %v (parsed %d)", out, err, parsed)
	}

	mibPerSec := float64(nBytes) / (float64(elapsedNS) / 1e9) / (1 << 20)
	t.Logf("read %d bytes in %.2f ms = %.2f MiB/s (cpu_bound=%d)",
		nBytes, float64(elapsedNS)/1e6, mibPerSec, cpuBound)

	tc.Delete(ctx, &taskAPI.DeleteRequest{ID: cid, ExecID: execID})
	tc.Kill(ctx, &taskAPI.KillRequest{ID: cid, Signal: uint32(syscall.SIGKILL), All: true})
	tc.Wait(ctx, &taskAPI.WaitRequest{ID: cid})
	tc.Delete(ctx, &taskAPI.DeleteRequest{ID: cid})
	tc.Shutdown(ctx, &taskAPI.ShutdownRequest{ID: cid})
}
