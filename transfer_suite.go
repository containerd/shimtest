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
	"strings"
	"sync"
	"sync/atomic"
	"testing"
	"time"

	taskAPI "github.com/containerd/containerd/api/runtime/task/v3"
	transferapi "github.com/containerd/containerd/api/services/transfer/v1"
	"github.com/containerd/typeurl/v2"
	"github.com/opencontainers/runtime-spec/specs-go"

	"github.com/dmcgowan/shimtest/internal/transfer"
)

// TransferSuite contains tests gated on the "transfer" feature: the
// transfer service's copy-in/out operations, the bidirectional-stream
// stress test, and a Fuzz target that callers can wire into a
// top-level FuzzXxx in their own _test.go.
type TransferSuite struct {
	cfg   Config
	setup ShimSetupFunc
}

// NewTransferSuite constructs a TransferSuite from the given options.
func NewTransferSuite(opts SuiteOptions) *TransferSuite {
	return &TransferSuite{cfg: opts.Config, setup: opts.resolveSetup()}
}

// Run runs every test in the suite as a subtest of t. Subtest names
// are kept stable (TransferCopyTo, TransferCopyToAndFrom,
// TransferExecVerify, Stress) so existing -test.run filters and CI
// workflow patterns keep matching.
func (s *TransferSuite) Run(t *testing.T) {
	t.Helper()
	t.Run("TransferCopyTo", s.TestCopyTo)
	t.Run("TransferCopyToAndFrom", s.TestCopyToAndFrom)
	t.Run("TransferExecVerify", s.TestExecVerify)
	t.Run("Stress", s.TestStress)
}

// TestCopyTo copies a small file into a running container via the
// transfer service.
func (s *TransferSuite) TestCopyTo(t *testing.T) {
	env := s.setup(t, t.Context())
	const testContent = "transfer-test-data-12345\n"

	copyToContainer(t, env.Ctx, env, testContent, "/tmp")
	t.Log("copy-to succeeded")

	ShutdownShim(t, env.Ctx, env)
}

// TestCopyToAndFrom copies a file in then back out and verifies the
// content matches.
func (s *TransferSuite) TestCopyToAndFrom(t *testing.T) {
	env := s.setup(t, t.Context())
	const testContent = "transfer-test-data-12345\n"

	copyToContainer(t, env.Ctx, env, testContent, "/tmp")
	t.Log("copy-to succeeded")

	received := copyFromContainer(t, env.Ctx, env, "/tmp/transferred.txt")
	if received != testContent {
		t.Fatalf("copy-from content mismatch: got %q, want %q", received, testContent)
	}
	t.Log("copy-from verified, content:", strings.TrimSpace(received))

	ShutdownShim(t, env.Ctx, env)
}

// TestExecVerify copies a file in and verifies it via /bin/cat exec.
func (s *TransferSuite) TestExecVerify(t *testing.T) {
	env := s.setup(t, t.Context())
	const testContent = "transfer-test-data-12345\n"

	copyToContainer(t, env.Ctx, env, testContent, "/tmp")

	execOutput := shimExec(t, env.Ctx, env, "verify", []string{"/bin/cat", "/tmp/transferred.txt"})
	if !strings.Contains(execOutput, strings.TrimRight(testContent, "\n")) {
		t.Fatalf("exec output %q does not contain expected content %q", execOutput, testContent)
	}
	t.Log("copy-to verified via exec:", strings.TrimSpace(execOutput))

	ShutdownShim(t, env.Ctx, env)
}

// copyToContainer transfers content as a tar archive into the
// container at the given path using the transfer service.
func copyToContainer(t *testing.T, ctx context.Context, env *ShimEnv, content, path string) {
	t.Helper()

	var tarBuf bytes.Buffer
	tw := tar.NewWriter(&tarBuf)
	if err := tw.WriteHeader(&tar.Header{
		Name: "transferred.txt",
		Mode: 0644,
		Size: int64(len(content)),
	}); err != nil {
		t.Fatal("failed to write tar header:", err)
	}
	if _, err := tw.Write([]byte(content)); err != nil {
		t.Fatal("failed to write tar data:", err)
	}
	if err := tw.Close(); err != nil {
		t.Fatal("failed to close tar writer:", err)
	}

	src := transfer.NewReadStream(&tarBuf, "application/x-tar")
	dst := &transfer.ContainerPath{
		ContainerID: env.ContainerID,
		Path:        path,
	}

	srcAny, err := marshalTransferAny(ctx, src, env.SC)
	if err != nil {
		t.Fatal("failed to marshal source:", err)
	}
	dstAny, err := marshalTransferAny(ctx, dst, env.SC)
	if err != nil {
		t.Fatal("failed to marshal destination:", err)
	}

	tfClient := transferapi.NewTTRPCTransferClient(env.Client)
	if _, err := tfClient.Transfer(ctx, &transferapi.TransferRequest{
		Source:      srcAny,
		Destination: dstAny,
	}); err != nil {
		t.Fatal("copy-to transfer failed:", err)
	}
}

// copyFromContainer reads a file from the container via the transfer
// service and returns its content.
func copyFromContainer(t *testing.T, ctx context.Context, env *ShimEnv, path string) string {
	t.Helper()

	src := &transfer.ContainerPath{
		ContainerID: env.ContainerID,
		Path:        path,
	}

	var received bytes.Buffer
	dst := transfer.NewWriteStream(&nopWriteCloser{&received}, "application/x-tar")

	srcAny, err := marshalTransferAny(ctx, src, env.SC)
	if err != nil {
		t.Fatal("failed to marshal source:", err)
	}
	dstAny, err := marshalTransferAny(ctx, dst, env.SC)
	if err != nil {
		t.Fatal("failed to marshal destination:", err)
	}

	tfClient := transferapi.NewTTRPCTransferClient(env.Client)
	if _, err := tfClient.Transfer(ctx, &transferapi.TransferRequest{
		Source:      srcAny,
		Destination: dstAny,
	}); err != nil {
		t.Fatal("copy-from transfer failed:", err)
	}

	tr := tar.NewReader(&received)
	for {
		hdr, err := tr.Next()
		if err == io.EOF {
			break
		}
		if err != nil {
			t.Fatal("failed to read tar:", err)
		}
		if strings.HasSuffix(hdr.Name, "transferred.txt") {
			data, err := io.ReadAll(tr)
			if err != nil {
				t.Fatal("failed to read tar entry:", err)
			}
			return string(data)
		}
	}

	t.Fatal("transferred.txt not found in tar archive")
	return ""
}

// shimExec runs a process inside the container via the Exec API and
// returns its stdout output.
func shimExec(t *testing.T, ctx context.Context, env *ShimEnv, execID string, args []string) string {
	t.Helper()

	execStdout, execStderr := CreateIOFifos(t, t.TempDir())

	var execBuf bytes.Buffer
	var execMu sync.Mutex
	DrainFifoInto(t, ctx, execStdout, &execBuf, &execMu)
	DrainFifo(t, ctx, execStderr)

	procSpec := &specs.Process{
		Args: args,
		Cwd:  "/",
		Env:  []string{"PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"},
	}
	execSpec, err := typeurl.MarshalAnyToProto(procSpec)
	if err != nil {
		t.Fatal("failed to marshal exec spec:", err)
	}

	if _, err := env.TC.Exec(ctx, &taskAPI.ExecProcessRequest{
		ID:     env.ContainerID,
		ExecID: execID,
		Spec:   execSpec,
		Stdout: execStdout,
		Stderr: execStderr,
	}); err != nil {
		t.Fatal("exec failed:", err)
	}

	if _, err := env.TC.Start(ctx, &taskAPI.StartRequest{
		ID:     env.ContainerID,
		ExecID: execID,
	}); err != nil {
		t.Fatal("exec start failed:", err)
	}

	waitResp, err := env.TC.Wait(ctx, &taskAPI.WaitRequest{
		ID:     env.ContainerID,
		ExecID: execID,
	})
	if err != nil {
		t.Fatal("exec wait failed:", err)
	}
	if waitResp.ExitStatus != 0 {
		t.Fatalf("exec exited with status %d", waitResp.ExitStatus)
	}

	time.Sleep(100 * time.Millisecond)

	if _, err := env.TC.Delete(ctx, &taskAPI.DeleteRequest{
		ID:     env.ContainerID,
		ExecID: execID,
	}); err != nil {
		t.Fatal("exec delete failed:", err)
	}

	execMu.Lock()
	defer execMu.Unlock()
	return execBuf.String()
}

//
// ----- Stress test ---------------------------------------------------
//

// stressIterationTimeout caps how long any single Transfer is allowed
// to take. A healthy iteration finishes in single-digit milliseconds;
// anything more than this is a hang.
const stressIterationTimeout = 5 * time.Second

// stressSoakBuffer is how much headroom the stress test leaves before
// the test framework's deadline. Set generously so a normal stress
// run with the default 10-minute test timeout never bumps into it.
const stressSoakBuffer = 1 * time.Minute

// stressReadPoolSize is the number of files the read subtest
// pre-populates as a setup phase.
const stressReadPoolSize = 1000

// stressReadDir / stressWriteDir are the in-container directories
// used by the read and write stress subtests.
const (
	stressReadDir  = "/tmp/stress-read"
	stressWriteDir = "/tmp/stress-write"
)

// fuzzMissingBase is the in-container directory that the missing-file
// fuzz tests synthesize paths under. The test never creates it, so
// any path under it (with a sanitized suffix) is guaranteed to not
// exist.
const fuzzMissingBase = "/.fuzz-missing"

// stressSubtest is one concurrent workload run inside TestStress.
type stressSubtest struct {
	name string
	fn   func(ctx context.Context) error
}

// TestStress launches stat/write/read goroutines against a shared
// shim env and stops at the first failure. Subtest iteration counts
// are reported via t.Logf.
//
// Skipped under -short.
func (s *TransferSuite) TestStress(t *testing.T) {
	if testing.Short() {
		t.Skip("skipping stress test in short mode")
	}

	env := s.setup(t, t.Context())
	ctx, cancel := stressCtx(t, env.Ctx)
	defer cancel()

	subtests := s.transferStressSubtests(t, env)

	runCtx, runCancel := context.WithCancel(ctx)
	defer runCancel()

	type result struct {
		name    string
		iters   int64
		elapsed time.Duration
		err     error
	}
	results := make(chan result, len(subtests))

	for _, st := range subtests {
		go func() {
			iters, elapsed, err := runStress(runCtx, st.fn)
			if err != nil {
				runCancel()
			}
			results <- result{st.name, iters, elapsed, err}
		}()
	}

	var firstErr error
	var firstErrName string
	for i := 0; i < len(subtests); i++ {
		r := <-results
		if r.err != nil && firstErr == nil {
			firstErr = r.err
			firstErrName = r.name
		}
		rate := float64(r.iters) / r.elapsed.Seconds()
		t.Logf("%s: %d iterations in %s (%.0f iter/s)",
			r.name, r.iters, r.elapsed.Round(time.Millisecond), rate)
	}

	if firstErr != nil {
		t.Fatalf("%s: %v", firstErrName, firstErr)
	}

	ShutdownShim(t, env.Ctx, env)
}

// transferStressSubtests returns the stat / write / read stress
// subtests. The read pool is pre-populated synchronously so by the
// time the caller spawns goroutines, the read subtest can find its
// files.
func (s *TransferSuite) transferStressSubtests(t *testing.T, env *ShimEnv) []stressSubtest {
	t.Helper()

	for i := 0; i < stressReadPoolSize; i++ {
		name := fmt.Sprintf("file-%05d.txt", i)
		content := stressFileContent(i)
		if err := stressTransferWriteFile(env.Ctx, env, stressReadDir, name, content); err != nil {
			t.Fatalf("read pool setup %d: %v", i, err)
		}
	}

	var writeIdx, readIdx atomic.Int64

	return []stressSubtest{
		{
			name: "stat",
			fn: func(ctx context.Context) error {
				return stressTransferStat(ctx, env, StatDirContainerPath)
			},
		},
		{
			name: "write",
			fn: func(ctx context.Context) error {
				i := writeIdx.Add(1)
				name := fmt.Sprintf("file-%08d.txt", i)
				return stressTransferWriteFile(ctx, env, stressWriteDir, name, stressFileContent(int(i)))
			},
		},
		{
			name: "read",
			fn: func(ctx context.Context) error {
				i := int(readIdx.Add(1)-1) % stressReadPoolSize
				name := fmt.Sprintf("file-%05d.txt", i)
				want := stressFileContent(i)
				path := stressReadDir + "/" + name
				got, err := stressTransferReadFile(ctx, env, path, name)
				if err != nil {
					return err
				}
				if got != want {
					return fmt.Errorf("content mismatch for %s: got %q, want %q", name, got, want)
				}
				return nil
			},
		},
	}
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
	env := s.setup(f, f.Context())

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

		err := stressTransferStat(env.Ctx, env, path)
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

// stressFileContent is the canonical content for the i-th stress file.
func stressFileContent(i int) string {
	return fmt.Sprintf("stress-content-%05d\n", i)
}

// runStress runs fn in a sequential loop until fn returns an error
// or the parent context is canceled.
//
// fn receives a context detached from the parent so cancellation of
// the parent does not propagate into an in-flight iteration. The
// iteration runs to completion (success or its own per-iteration
// timeout); the loop then sees the parent context's Done and exits.
func runStress(ctx context.Context, fn func(ctx context.Context) error) (int64, time.Duration, error) {
	start := time.Now()

	runCtx, cancel := context.WithCancel(context.Background())
	defer cancel()

	var iters int64
	for ctx.Err() == nil {
		if err := fn(runCtx); err != nil {
			return iters, time.Since(start), err
		}
		iters++
	}
	return iters, time.Since(start), nil
}

// stressCtx derives a cancel context from parent, additionally bounded
// by t.Deadline() if one is set, with stressSoakBuffer of headroom.
// Skips when there isn't enough room for a meaningful run.
func stressCtx(t *testing.T, parent context.Context) (context.Context, context.CancelFunc) {
	t.Helper()
	d, ok := t.Deadline()
	if !ok {
		return context.WithCancel(parent)
	}
	if remaining := time.Until(d); remaining < stressSoakBuffer {
		t.Skipf("skipping: stress needs at least %s before -test.timeout, only %s left",
			stressSoakBuffer, remaining.Round(time.Millisecond))
	}
	return context.WithDeadline(parent, d.Add(-stressSoakBuffer))
}

// stressTransferStat performs a single Transfer with NoWalk=true on
// the given path. The server-side payload is discarded.
func stressTransferStat(ctx context.Context, env *ShimEnv, path string) error {
	subCtx, cancel := context.WithTimeout(ctx, stressIterationTimeout)
	defer cancel()

	src := &transfer.ContainerPath{
		ContainerID: env.ContainerID,
		Path:        path,
		NoWalk:      true,
	}
	dst := transfer.NewWriteStream(&nopWriteCloser{io.Discard}, "application/x-tar")

	return stressDoTransfer(subCtx, env, src, dst)
}

// stressTransferWriteFile writes a single small file as a one-entry
// tar to the given directory in the container.
func stressTransferWriteFile(ctx context.Context, env *ShimEnv, dir, name, content string) error {
	subCtx, cancel := context.WithTimeout(ctx, stressIterationTimeout)
	defer cancel()

	var tarBuf bytes.Buffer
	tw := tar.NewWriter(&tarBuf)
	if err := tw.WriteHeader(&tar.Header{
		Name: name,
		Mode: 0644,
		Size: int64(len(content)),
	}); err != nil {
		return fmt.Errorf("write tar header: %w", err)
	}
	if _, err := tw.Write([]byte(content)); err != nil {
		return fmt.Errorf("write tar body: %w", err)
	}
	if err := tw.Close(); err != nil {
		return fmt.Errorf("close tar: %w", err)
	}

	src := transfer.NewReadStream(&tarBuf, "application/x-tar")
	dst := &transfer.ContainerPath{
		ContainerID: env.ContainerID,
		Path:        dir,
	}
	return stressDoTransfer(subCtx, env, src, dst)
}

// stressTransferReadFile reads a single file back from the container
// and returns its content.
func stressTransferReadFile(ctx context.Context, env *ShimEnv, path, name string) (string, error) {
	subCtx, cancel := context.WithTimeout(ctx, stressIterationTimeout)
	defer cancel()

	src := &transfer.ContainerPath{
		ContainerID: env.ContainerID,
		Path:        path,
	}

	var received bytes.Buffer
	dst := transfer.NewWriteStream(&nopWriteCloser{&received}, "application/x-tar")

	if err := stressDoTransfer(subCtx, env, src, dst); err != nil {
		return "", err
	}

	tr := tar.NewReader(&received)
	for {
		hdr, err := tr.Next()
		if err == io.EOF {
			break
		}
		if err != nil {
			return "", fmt.Errorf("read tar: %w", err)
		}
		if strings.HasSuffix(hdr.Name, name) {
			data, err := io.ReadAll(tr)
			if err != nil {
				return "", fmt.Errorf("read tar entry: %w", err)
			}
			return string(data), nil
		}
	}
	return "", fmt.Errorf("entry %q not found in tar", name)
}

// stressDoTransfer marshals src and dst, then issues the Transfer RPC.
func stressDoTransfer(ctx context.Context, env *ShimEnv, src, dst any) error {
	srcAny, err := marshalTransferAny(ctx, src, env.SC)
	if err != nil {
		return fmt.Errorf("marshal source: %w", err)
	}
	dstAny, err := marshalTransferAny(ctx, dst, env.SC)
	if err != nil {
		return fmt.Errorf("marshal destination: %w", err)
	}

	tfClient := transferapi.NewTTRPCTransferClient(env.Client)
	_, err = tfClient.Transfer(ctx, &transferapi.TransferRequest{
		Source:      srcAny,
		Destination: dstAny,
	})
	return err
}
