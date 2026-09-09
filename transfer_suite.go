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
	"archive/tar"
	"bytes"
	"context"
	"errors"
	"fmt"
	"io"
	"os"
	"path"
	"path/filepath"
	"strings"
	"sync"
	"testing"
	"time"

	taskAPI "github.com/containerd/containerd/api/runtime/task/v3"
	transferapi "github.com/containerd/containerd/api/services/transfer/v1"
	"github.com/containerd/typeurl/v2"
	"github.com/opencontainers/runtime-spec/specs-go"

	"github.com/containerd/shimtest/internal/transfer"
)

// defaultEntryName is the archive entry name the copy helpers use when a
// test does not care what the file is called.
const defaultEntryName = "transferred.txt"

// bindMountDest is where the bind-mount tests attach a filesystem. Its
// parent exists in the container's root filesystem; the runtime creates
// the leaf.
const bindMountDest = "/run/mounted"

// mountVisibilityTimeout bounds how long a write inside the container may
// take to become visible at a mount source outside it.
const mountVisibilityTimeout = 10 * time.Second

// TransferSuite contains tests gated on the "transfer" feature: the
// transfer service's copy-in/out operations, the bidirectional-stream
// stress test, and a Fuzz target that callers can wire into a
// top-level FuzzXxx in their own _test.go.
type TransferSuite struct {
	cfg Config
}

// NewTransferSuite constructs a TransferSuite from the given options.
func NewTransferSuite(cfg Config) *TransferSuite {
	return &TransferSuite{cfg: cfg}
}

// Run runs every test in the suite as a subtest of t. Subtest names
// are kept stable (TransferCopyTo, TransferCopyToAndFrom,
// TransferExecVerify) so existing -test.run filters and CI workflow
// patterns keep matching. The transfer stress test moved to
// StressSuite; construct one of those with StressOptions{Transfer:
// true} to run it.
func (s *TransferSuite) Run(t *testing.T) {
	t.Helper()
	registerShimLeakCheck(t, s.cfg.ShimBinary)
	t.Run("TransferCopyTo", s.testCopyTo)
	t.Run("TransferCopyToAndFrom", s.testCopyToAndFrom)
	t.Run("TransferExecVerify", s.testExecVerify)
	t.Run("TransferMountDestinationWrite", s.testMountDestinationWrite)
	t.Run("TransferMountDestinationRead", s.testMountDestinationRead)
	t.Run("TransferMountShadowsLowerContent", s.testMountShadowsLowerContent)
	t.Run("TransferAbsoluteSymlinkTarget", s.testAbsoluteSymlinkTarget)
}

// transferTmpfs returns a spec opt mounting a tmpfs at destination.
//
// The transfer service must resolve a container path the way the container
// does, honouring its mounts. A path not covered by a mount resolves the
// same way whether or not a shim honours them, so the copy tests use a
// mount destination to tell the two apart.
func transferTmpfs(destination string) func(*specs.Spec) {
	return withExtraMounts(specs.Mount{
		Destination: destination,
		Type:        "tmpfs",
		Source:      "tmpfs",
	})
}

// TestCopyTo copies a small file into a running container via the
// transfer service. The destination is a mount destination, so the copy
// must reach the mounted filesystem, not the root filesystem beneath it.
func (s *TransferSuite) testCopyTo(t *testing.T) {
	env := newShimEnv(t, t.Context(), s.cfg, "transfer", transferTmpfs("/tmp"))
	skipIfNoTransfer(t, env)
	const testContent = "transfer-test-data-12345\n"

	copyToContainer(t, env.ctx, env, testContent, "/tmp", defaultEntryName)
	t.Log("copy-to succeeded")

	shutdownShim(t, env.ctx, env)
}

// TestCopyToAndFrom copies a file in then back out and verifies the
// content matches. Both directions must resolve to the same filesystem
// the container sees at the destination.
func (s *TransferSuite) testCopyToAndFrom(t *testing.T) {
	env := newShimEnv(t, t.Context(), s.cfg, "transfer", transferTmpfs("/tmp"))
	skipIfNoTransfer(t, env)
	const testContent = "transfer-test-data-12345\n"

	copyToContainer(t, env.ctx, env, testContent, "/tmp", defaultEntryName)
	t.Log("copy-to succeeded")

	received := copyFromContainer(t, env.ctx, env, path.Join("/tmp", defaultEntryName))
	if received != testContent {
		t.Fatalf("copy-from content mismatch: got %q, want %q", received, testContent)
	}
	t.Log("copy-from verified, content:", strings.TrimSpace(received))

	shutdownShim(t, env.ctx, env)
}

// TestExecVerify copies a file in and verifies it via /bin/cat exec.
//
// Reading the file back through the transfer service cannot show that the
// copy reached the container's filesystem, because a shim that reads and
// writes the same wrong location is self-consistent. A process in the
// container is an independent view of the same path.
func (s *TransferSuite) testExecVerify(t *testing.T) {
	env := newShimEnv(t, t.Context(), s.cfg, "transfer", transferTmpfs("/tmp"))
	skipIfNoTransfer(t, env)
	const testContent = "transfer-test-data-12345\n"

	copyToContainer(t, env.ctx, env, testContent, "/tmp", defaultEntryName)

	copied := path.Join("/tmp", defaultEntryName)
	execOutput := shimExec(t, env.ctx, env, "verify", []string{"/bin/cat", copied})
	if !strings.Contains(execOutput, strings.TrimRight(testContent, "\n")) {
		t.Fatalf("exec output %q does not contain expected content %q", execOutput, testContent)
	}
	t.Log("copy-to verified via exec:", strings.TrimSpace(execOutput))

	shutdownShim(t, env.ctx, env)
}

// TestMountDestinationWrite copies a file under a bind mount destination
// and verifies it reaches the mount source.
//
// A bind mount makes the source the filesystem backing the destination, so
// a write under the destination must land in the source, which is what the
// container and every other user of the source observe. The source is
// checked directly for the reason given on testExecVerify: a read back
// would resolve the same path as the write and agree with it either way.
func (s *TransferSuite) testMountDestinationWrite(t *testing.T) {
	source := t.TempDir()

	env := newShimEnv(t, t.Context(), s.cfg, "transfer", withExtraMounts(specs.Mount{
		Destination: bindMountDest,
		Type:        "bind",
		Source:      source,
		Options:     []string{"rbind"},
	}))
	skipIfNoTransfer(t, env)
	const testContent = "transfer-mount-write-data\n"

	copyToContainer(t, env.ctx, env, testContent, bindMountDest, defaultEntryName)

	awaitFileContent(t, filepath.Join(source, defaultEntryName), testContent)
	t.Log("copy-to reached the mount source")

	shutdownShim(t, env.ctx, env)
}

// TestMountDestinationRead copies a file out from under a bind mount
// destination and verifies the content comes from the mount source.
//
// The file is created in the source before the container starts and is
// never written through the container, so the only way to return it is to
// resolve the destination to the mounted filesystem.
func (s *TransferSuite) testMountDestinationRead(t *testing.T) {
	source := t.TempDir()
	const testContent = "transfer-mount-read-data\n"
	if err := os.WriteFile(filepath.Join(source, defaultEntryName), []byte(testContent), 0o644); err != nil {
		t.Fatal("failed to seed the mount source:", err)
	}

	env := newShimEnv(t, t.Context(), s.cfg, "transfer", withExtraMounts(specs.Mount{
		Destination: bindMountDest,
		Type:        "bind",
		Source:      source,
		Options:     []string{"rbind"},
	}))
	skipIfNoTransfer(t, env)

	received := copyFromContainer(t, env.ctx, env, path.Join(bindMountDest, defaultEntryName))
	if received != testContent {
		t.Fatalf("copy-from content mismatch: got %q, want %q", received, testContent)
	}
	t.Log("copy-from returned the mount source content")

	shutdownShim(t, env.ctx, env)
}

// TestMountShadowsLowerContent verifies that a mount hides what the
// container's root filesystem holds at the same path.
//
// statFileContainerPath exists in the root filesystem, but with a mount
// over its parent no process in the container can see it, so the transfer
// service must not return it either. The mount is also written and read
// back, distinguishing a shim that resolves it correctly from one that
// cannot reach the path at all.
func (s *TransferSuite) testMountShadowsLowerContent(t *testing.T) {
	shadowed := path.Dir(statDirContainerPath)

	env := newShimEnv(t, t.Context(), s.cfg, "transfer", transferTmpfs(shadowed))
	skipIfNoTransfer(t, env)
	const testContent = "transfer-shadow-data\n"

	copyToContainer(t, env.ctx, env, testContent, shadowed, defaultEntryName)

	received := copyFromContainer(t, env.ctx, env, path.Join(shadowed, defaultEntryName))
	if received != testContent {
		t.Fatalf("copy-from content mismatch: got %q, want %q", received, testContent)
	}

	if content, err := tryCopyFromContainer(env.ctx, env, statFileContainerPath); err == nil {
		t.Fatalf("copy-from returned %s though the mount at %s hides it, content %q",
			statFileContainerPath, shadowed, content)
	}
	t.Log("the mount hides the root filesystem content beneath it")

	shutdownShim(t, env.ctx, env)
}

// TestAbsoluteSymlinkTarget verifies that a symlink whose target is an
// absolute path resolves against the container's root filesystem.
//
// The archive holds a directory, a symlink naming it by absolute path, and
// a file whose path runs through the symlink. Extracting the last entry
// requires resolving the target, and the file must land in the directory
// the symlink names. Both directions are checked: exec reads the file at
// the resolved location, and the transfer service reads it back through
// the symlink.
func (s *TransferSuite) testAbsoluteSymlinkTarget(t *testing.T) {
	env := newShimEnv(t, t.Context(), s.cfg, "transfer", transferTmpfs("/tmp"))
	skipIfNoTransfer(t, env)

	const (
		testContent = "transfer-absolute-symlink-data\n"
		realDir     = "/tmp/real"
		linkDir     = "/tmp/link"
	)

	archive := buildTar(t,
		tarEntry{name: "real/", typeflag: tar.TypeDir, mode: 0o755},
		// An absolute target, so extracting through it exercises
		// resolution against the container's root, not a relative walk.
		tarEntry{name: "link", typeflag: tar.TypeSymlink, mode: 0o777, linkname: realDir},
		tarEntry{name: "link/" + defaultEntryName, typeflag: tar.TypeReg, mode: 0o644, content: testContent},
	)
	copyArchiveToContainer(t, env.ctx, env, archive, "/tmp")

	// The file must exist at the directory the symlink names, as seen by a
	// process in the container.
	resolved := path.Join(realDir, defaultEntryName)
	execOutput := shimExec(t, env.ctx, env, "verify", []string{"/bin/cat", resolved})
	if !strings.Contains(execOutput, strings.TrimRight(testContent, "\n")) {
		t.Fatalf("exec output %q at %s does not contain %q", execOutput, resolved, testContent)
	}

	// Reading back through the symlink must resolve the same way.
	received := copyFromContainer(t, env.ctx, env, path.Join(linkDir, defaultEntryName))
	if received != testContent {
		t.Fatalf("copy-from through the symlink: got %q, want %q", received, testContent)
	}
	t.Log("the absolute symlink target resolved inside the container")

	shutdownShim(t, env.ctx, env)
}

// tarEntry describes one archive entry for buildTar. content applies to
// regular files, linkname to symlinks.
type tarEntry struct {
	name     string
	typeflag byte
	mode     int64
	linkname string
	content  string
}

// buildTar assembles a tar archive from entries, taking each entry's size
// from its content.
func buildTar(t *testing.T, entries ...tarEntry) *bytes.Buffer {
	t.Helper()

	var buf bytes.Buffer
	tw := tar.NewWriter(&buf)
	for _, e := range entries {
		if err := tw.WriteHeader(&tar.Header{
			Name:     e.name,
			Typeflag: e.typeflag,
			Mode:     e.mode,
			Linkname: e.linkname,
			Size:     int64(len(e.content)),
		}); err != nil {
			t.Fatalf("failed to write tar header %s: %v", e.name, err)
		}
		if e.content == "" {
			continue
		}
		if _, err := tw.Write([]byte(e.content)); err != nil {
			t.Fatalf("failed to write tar data for %s: %v", e.name, err)
		}
	}
	if err := tw.Close(); err != nil {
		t.Fatal("failed to close tar writer:", err)
	}
	return &buf
}

// awaitFileContent waits for the file at name to hold want. A filesystem
// shared with the container may publish the write asynchronously and in
// pieces, so a missing, empty, or partial file is retried until the
// deadline, after which the test fails with the last content read.
func awaitFileContent(t *testing.T, name, want string) {
	t.Helper()

	deadline := time.Now().Add(mountVisibilityTimeout)
	var last string
	for {
		data, err := os.ReadFile(name)
		if err != nil && !errors.Is(err, os.ErrNotExist) {
			t.Fatalf("failed to read %s: %v", name, err)
		}
		if err == nil {
			if last = string(data); last == want {
				return
			}
		}
		if time.Now().After(deadline) {
			t.Fatalf("%s = %q after %s, want %q", name, last, mountVisibilityTimeout, want)
		}
		time.Sleep(20 * time.Millisecond)
	}
}

// copyToContainer transfers content as a single-entry tar archive into
// the container at dir, naming the entry name.
func copyToContainer(t *testing.T, ctx context.Context, env *shimEnv, content, dir, name string) {
	t.Helper()

	copyArchiveToContainer(t, ctx, env, buildTar(t, tarEntry{
		name:     name,
		typeflag: tar.TypeReg,
		mode:     0o644,
		content:  content,
	}), dir)
}

// copyArchiveToContainer extracts the tar archive in r into the container
// at dir using the transfer service.
func copyArchiveToContainer(t *testing.T, ctx context.Context, env *shimEnv, r io.Reader, dir string) {
	t.Helper()

	src := transfer.NewReadStream(r, "application/x-tar")
	dst := &transfer.ContainerPath{
		ContainerID: env.containerID,
		Path:        dir,
	}

	srcAny, err := marshalTransferAny(ctx, src, env.sc)
	if err != nil {
		t.Fatal("failed to marshal source:", err)
	}
	dstAny, err := marshalTransferAny(ctx, dst, env.sc)
	if err != nil {
		t.Fatal("failed to marshal destination:", err)
	}

	tfClient := transferapi.NewTTRPCTransferClient(env.client)
	if _, err := tfClient.Transfer(ctx, &transferapi.TransferRequest{
		Source:      srcAny,
		Destination: dstAny,
	}); err != nil {
		t.Fatal("copy-to transfer failed:", err)
	}
	// Wait for the background send goroutine to finish draining the
	// reader and surface any transport error it encountered.
	if err := src.Wait(ctx); err != nil {
		t.Fatal("copy-to stream error:", err)
	}
}

// copyFromContainer reads a file from the container via the transfer
// service and returns its content. The archive the shim returns names
// entries relative to the requested path, so the entry carrying the
// content is the one whose name ends in the path's last element.
func copyFromContainer(t *testing.T, ctx context.Context, env *shimEnv, ctrPath string) string {
	t.Helper()

	content, err := tryCopyFromContainer(ctx, env, ctrPath)
	if err != nil {
		t.Fatal("copy-from failed:", err)
	}
	return content
}

// tryCopyFromContainer is copyFromContainer without the assertions, for
// tests that require a path to be unreadable. It returns an error if the
// transfer fails or if the archive does not carry the requested file.
func tryCopyFromContainer(ctx context.Context, env *shimEnv, ctrPath string) (string, error) {
	src := &transfer.ContainerPath{
		ContainerID: env.containerID,
		Path:        ctrPath,
	}

	var received bytes.Buffer
	dst := transfer.NewWriteStream(&received, "application/x-tar")

	srcAny, err := marshalTransferAny(ctx, src, env.sc)
	if err != nil {
		return "", fmt.Errorf("marshalling source: %w", err)
	}
	dstAny, err := marshalTransferAny(ctx, dst, env.sc)
	if err != nil {
		return "", fmt.Errorf("marshalling destination: %w", err)
	}

	tfClient := transferapi.NewTTRPCTransferClient(env.client)
	if _, err := tfClient.Transfer(ctx, &transferapi.TransferRequest{
		Source:      srcAny,
		Destination: dstAny,
	}); err != nil {
		return "", fmt.Errorf("transfer: %w", err)
	}
	// Wait for the background receive goroutine to finish draining the
	// stream into received. The Transfer RPC returning only confirms the
	// server is done writing; the client-side io.Copy runs in a separate
	// goroutine. Waiting here also surfaces any transport error rather
	// than silently delivering an empty or truncated result.
	if err := dst.Wait(ctx); err != nil {
		return "", fmt.Errorf("stream: %w", err)
	}

	want := path.Base(ctrPath)
	tr := tar.NewReader(&received)
	for {
		hdr, err := tr.Next()
		if err == io.EOF {
			break
		}
		if err != nil {
			return "", fmt.Errorf("reading archive: %w", err)
		}
		if path.Base(hdr.Name) == want {
			data, err := io.ReadAll(tr)
			if err != nil {
				return "", fmt.Errorf("reading archive entry %s: %w", hdr.Name, err)
			}
			return string(data), nil
		}
	}

	return "", fmt.Errorf("%s not found in the returned archive", want)
}

// shimExec runs a process inside the container via the Exec API and
// returns its stdout output.
func shimExec(t *testing.T, ctx context.Context, env *shimEnv, execID string, args []string) string {
	t.Helper()

	execStdout, execStderr := createIOFifos(t, t.TempDir())

	var execBuf bytes.Buffer
	var execMu sync.Mutex
	drainFifoInto(t, ctx, execStdout, &execBuf, &execMu)
	drainFifo(t, ctx, execStderr)

	procSpec := &specs.Process{
		Args: args,
		Cwd:  "/",
		Env:  []string{"PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"},
	}
	execSpec, err := typeurl.MarshalAnyToProto(procSpec)
	if err != nil {
		t.Fatal("failed to marshal exec spec:", err)
	}

	if _, err := env.tc.Exec(ctx, &taskAPI.ExecProcessRequest{
		ID:     env.containerID,
		ExecID: execID,
		Spec:   execSpec,
		Stdout: execStdout,
		Stderr: execStderr,
	}); err != nil {
		t.Fatal("exec failed:", err)
	}

	if _, err := env.tc.Start(ctx, &taskAPI.StartRequest{
		ID:     env.containerID,
		ExecID: execID,
	}); err != nil {
		t.Fatal("exec start failed:", err)
	}

	waitResp, err := env.tc.Wait(ctx, &taskAPI.WaitRequest{
		ID:     env.containerID,
		ExecID: execID,
	})
	if err != nil {
		t.Fatal("exec wait failed:", err)
	}
	if waitResp.ExitStatus != 0 {
		t.Fatalf("exec exited with status %d", waitResp.ExitStatus)
	}

	time.Sleep(100 * time.Millisecond)

	if _, err := env.tc.Delete(ctx, &taskAPI.DeleteRequest{
		ID:     env.containerID,
		ExecID: execID,
	}); err != nil {
		t.Fatal("exec delete failed:", err)
	}

	execMu.Lock()
	defer execMu.Unlock()
	return execBuf.String()
}

// Fuzz exposes the missing-file fuzz body for use by a top-level
// FuzzXxx in any package. The caller's FuzzTransferMissing should
// look like:
//
//	func FuzzTransferMissing(f *testing.F) {
//	    shimtest.NewTransferSuite(opts).Fuzz(f)
//	}
//
// Each fuzz iteration synthesizes a path under a never-created base
// directory and asserts the transfer service returns an
// application-level error (not a timeout).
func (s *TransferSuite) Fuzz(f *testing.F) {
	env := newShimEnv(f, f.Context(), s.cfg, "transfer")
	skipIfNoTransfer(f, env)
	defer shutdownShim(f, env.ctx, env)

	f.Add("missing.txt")
	f.Add("a/b/c/d.txt")
	f.Add("does-not-exist")
	f.Add(strings.Repeat("a", 200))
	f.Add(".hidden")

	f.Fuzz(func(t *testing.T, suffix string) {
		if !validFuzzSuffix(suffix) {
			t.Skip("rejected fuzz suffix")
		}
		path := fuzzMissingBase + "/" + suffix

		err := stressTransferStat(env.ctx, env, path)
		if err == nil {
			t.Errorf("expected error for missing path %q, got nil", path)
			return
		}
		if errors.Is(err, context.DeadlineExceeded) || errors.Is(err, context.Canceled) {
			t.Errorf("path %q: server did not respond before iteration deadline: %v", path, err)
		}
	})
}

// validFuzzSuffix gates fuzz inputs to suffixes that, when joined to
// fuzzMissingBase, stay inside that directory and don't contain
// bytes the shim's path layer can't represent. Rejected inputs are
// skipped (not failed).
func validFuzzSuffix(s string) bool {
	if s == "" || len(s) > 4000 {
		return false
	}
	if strings.HasPrefix(s, "/") {
		return false
	}
	if strings.Contains(s, "\x00") {
		return false
	}
	if strings.Contains(s, "..") {
		return false
	}
	return true
}
