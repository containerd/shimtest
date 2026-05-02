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
	"fmt"
	"io"
	"os"
	"path/filepath"
	"strings"
	"sync"
	"sync/atomic"
	"syscall"
	"testing"
	"time"

	taskAPI "github.com/containerd/containerd/api/runtime/task/v3"
	transferapi "github.com/containerd/containerd/api/services/transfer/v1"
	"github.com/containerd/containerd/v2/pkg/namespaces"
	"github.com/containerd/fifo"
	"github.com/containerd/ttrpc"
	typeurl "github.com/containerd/typeurl/v2"
	"github.com/opencontainers/runtime-spec/specs-go"
	"google.golang.org/protobuf/types/known/anypb"

	"github.com/dmcgowan/shimtest/internal/transfer"
)

// StressSuite contains long-running stress tests that exercise the
// shim under sustained load. Each subtest runs for a configurable
// duration (bounded by t.Deadline() - stressSoakBuffer); the whole
// suite is skipped under -short.
//
// The suite verifies, on completion, that no shim processes leaked
// and (where applicable) that long-running shims didn't grow
// memory unboundedly.
type StressSuite struct {
	cfg     Config
	options StressOptions
}

// StressOptions tunes which subtests StressSuite.Run executes.
type StressOptions struct {
	// Transfer enables the bidirectional transfer-service stress
	// test. The shim under test must implement the transfer service.
	Transfer bool
}

// NewStressSuite constructs a StressSuite from cfg and options.
func NewStressSuite(cfg Config, options StressOptions) *StressSuite {
	return &StressSuite{cfg: cfg, options: options}
}

// Run runs every configured stress test as a subtest of t. Skipped
// under -short. Registers a leak check that fires after all subtests
// (and their cleanups) complete.
func (s *StressSuite) Run(t *testing.T) {
	if testing.Short() {
		t.Skip("skipping stress test in short mode")
	}

	// Snapshot shim PIDs before the suite runs and verify after all
	// subtest cleanups have fired (LIFO order — cleanups registered
	// later run earlier).
	beforePIDs := shimPIDs(t, s.cfg.ShimBinary)
	t.Cleanup(func() {
		// Give kernel a moment to reap zombies after the last
		// shutdown RPC.
		time.Sleep(500 * time.Millisecond)
		afterPIDs := shimPIDs(t, s.cfg.ShimBinary)
		leaked := pidDiff(beforePIDs, afterPIDs)
		if len(leaked) > 0 {
			t.Errorf("leaked %d shim processes: %v", len(leaked), leaked)
		}
	})

	t.Run("Lifecycle", s.testLifecycle)
	t.Run("Exec", s.testExec)
	if s.options.Transfer {
		t.Run("Transfer", s.testTransfer)
	}
}

// testLifecycle exercises the full create/start/run/kill/wait/delete
// path repeatedly. Each iteration is a sub-T so per-iteration
// resources (shim, bundle, fifos) are released between iterations
// rather than accumulating on the parent's cleanup stack.
func (s *StressSuite) testLifecycle(t *testing.T) {
	ctx, cancel := stressCtx(t, t.Context())
	defer cancel()

	var idx atomic.Int64
	iters, elapsed, err := runStress(ctx, func(ctx context.Context) error {
		i := idx.Add(1)
		name := fmt.Sprintf("iter%05d", i)
		var iterErr error
		ok := t.Run(name, func(subT *testing.T) {
			iterErr = doFullLifecycle(subT, ctx, s.cfg)
			if iterErr != nil {
				subT.Fatal(iterErr)
			}
		})
		if !ok {
			return iterErr
		}
		return nil
	})
	rate := float64(iters) / elapsed.Seconds()
	t.Logf("lifecycle: %d iterations in %s (%.0f iter/s)",
		iters, elapsed.Round(time.Millisecond), rate)
	if err != nil {
		t.Fatalf("lifecycle: %v", err)
	}
}

// doFullLifecycle drives one container through start-to-shutdown
// inside a sub-test scope. Helpers register cleanups on subT, which
// fire when the sub-test ends.
func doFullLifecycle(t *testing.T, baseCtx context.Context, cfg Config) error {
	t.Helper()
	shimBin, bundleDir, rootfsMounts := shimSetup(t, cfg)
	cid := containerID(t)

	createOCISpec(t, bundleDir, []string{"/bin/echo", "hello"}, cfg)

	stdoutPath, stderrPath := createIOFifos(t, bundleDir)
	ctx := namespaces.WithNamespace(baseCtx, shimtestNamespace)

	params := startShim(t, shimBin, bundleDir, cid, shimtestNamespace, cfg)
	conn := connectShim(t, params.Address)
	client := ttrpc.NewClient(conn)
	defer client.Close()

	tc := taskAPI.NewTTRPCTaskClient(client)

	var stdoutBuf bytes.Buffer
	var stdoutMu sync.Mutex
	drainFifoInto(t, ctx, stdoutPath, &stdoutBuf, &stdoutMu)
	drainFifo(t, ctx, stderrPath)

	if _, err := tc.Create(ctx, newCreateTaskRequest(t, cid, bundleDir, stdoutPath, stderrPath, rootfsMounts)); err != nil {
		return fmt.Errorf("create: %w", err)
	}
	if _, err := tc.Start(ctx, &taskAPI.StartRequest{ID: cid}); err != nil {
		return fmt.Errorf("start: %w", err)
	}

	// Wait for output (deadline is short — process is /bin/echo, exits fast).
	deadline := time.After(stressIterationTimeout)
	for {
		stdoutMu.Lock()
		got := stdoutBuf.String()
		stdoutMu.Unlock()
		if strings.Contains(got, "hello") {
			break
		}
		select {
		case <-deadline:
			return fmt.Errorf("timed out waiting for output")
		case <-time.After(5 * time.Millisecond):
		}
	}

	if _, err := tc.Wait(ctx, &taskAPI.WaitRequest{ID: cid}); err != nil {
		return fmt.Errorf("wait: %w", err)
	}
	if _, err := tc.Delete(ctx, &taskAPI.DeleteRequest{ID: cid}); err != nil {
		return fmt.Errorf("delete: %w", err)
	}
	if _, err := tc.Shutdown(ctx, &taskAPI.ShutdownRequest{ID: cid}); err != nil {
		return fmt.Errorf("shutdown: %w", err)
	}
	return nil
}

// stressExecConcurrency is how many exec processes the exec-stress
// test launches per iteration. Each iteration waits for all of them
// to complete before the next iteration starts.
const stressExecConcurrency = 4

// stressMaxRSSGrowth is the upper bound on shim RSS growth between
// the start and end of the exec stress run. Crossing this threshold
// indicates an unbounded leak in the shim's per-exec bookkeeping.
const stressMaxRSSGrowth = 64 << 20 // 64 MiB

// testExec keeps one shim alive and exec's many concurrent
// short-lived processes against it. RSS is sampled before and after
// the loop; growth beyond stressMaxRSSGrowth fails the test.
func (s *StressSuite) testExec(t *testing.T) {
	env := newShimEnv(t, t.Context(), s.cfg)
	defer shutdownShim(t, env.ctx, env)

	pid := env.shimPID
	if pid == 0 {
		t.Skip("skipping: shim pid not available, RSS monitoring unavailable")
	}

	rssBefore, err := readRSS(pid)
	if err != nil {
		t.Skipf("cannot read shim RSS: %v", err)
	}

	procSpec, err := typeurl.MarshalAnyToProto(&specs.Process{
		Args: []string{"/bin/echo", "execstress"},
		Cwd:  "/",
		Env:  []string{"PATH=/bin:/usr/bin"},
	})
	if err != nil {
		t.Fatal("marshal exec spec:", err)
	}

	ctx, cancel := stressCtx(t, env.ctx)
	defer cancel()

	var iterIdx atomic.Int64
	iters, elapsed, runErr := runStress(ctx, func(ctx context.Context) error {
		i := iterIdx.Add(1)
		var wg sync.WaitGroup
		var firstErr atomic.Pointer[error]
		for j := 0; j < stressExecConcurrency; j++ {
			wg.Add(1)
			go func(j int) {
				defer wg.Done()
				execID := fmt.Sprintf("e-%d-%d", i, j)
				if err := runOneExec(ctx, env, execID, procSpec); err != nil {
					e := err
					firstErr.CompareAndSwap(nil, &e)
				}
			}(j)
		}
		wg.Wait()
		if e := firstErr.Load(); e != nil {
			return *e
		}
		return nil
	})

	rssAfter, _ := readRSS(pid)
	growth := rssAfter - rssBefore
	rate := float64(iters*stressExecConcurrency) / elapsed.Seconds()
	t.Logf("exec: %d iterations × %d execs in %s (%.0f exec/s); rss %d → %d (Δ %+d)",
		iters, stressExecConcurrency, elapsed.Round(time.Millisecond),
		rate, rssBefore, rssAfter, growth)

	if runErr != nil {
		t.Fatalf("exec stress: %v", runErr)
	}
	if growth > stressMaxRSSGrowth {
		t.Errorf("shim RSS grew %d bytes (threshold %d) during exec stress", growth, stressMaxRSSGrowth)
	}
}

// runOneExec runs a single short-lived exec inside the shared
// container, with its own FIFOs and a per-exec timeout.
func runOneExec(parentCtx context.Context, env *shimEnv, execID string, procSpec *anypb.Any) error {
	subCtx, cancel := context.WithTimeout(parentCtx, stressIterationTimeout)
	defer cancel()

	dir, err := os.MkdirTemp("", "stress-exec-")
	if err != nil {
		return fmt.Errorf("mkdtemp: %w", err)
	}
	defer os.RemoveAll(dir)

	stdoutPath := filepath.Join(dir, "stdout")
	stderrPath := filepath.Join(dir, "stderr")
	if err := syscall.Mkfifo(stdoutPath, 0600); err != nil {
		return fmt.Errorf("mkfifo stdout: %w", err)
	}
	if err := syscall.Mkfifo(stderrPath, 0600); err != nil {
		return fmt.Errorf("mkfifo stderr: %w", err)
	}

	stdout, err := fifo.OpenFifo(subCtx, stdoutPath, syscall.O_RDONLY|syscall.O_NONBLOCK, 0)
	if err != nil {
		return fmt.Errorf("open stdout: %w", err)
	}
	defer stdout.Close()
	stderr, err := fifo.OpenFifo(subCtx, stderrPath, syscall.O_RDONLY|syscall.O_NONBLOCK, 0)
	if err != nil {
		return fmt.Errorf("open stderr: %w", err)
	}
	defer stderr.Close()
	go io.Copy(io.Discard, stdout)
	go io.Copy(io.Discard, stderr)

	if _, err := env.tc.Exec(subCtx, &taskAPI.ExecProcessRequest{
		ID:     env.containerID,
		ExecID: execID,
		Spec:   procSpec,
		Stdout: stdoutPath,
		Stderr: stderrPath,
	}); err != nil {
		return fmt.Errorf("exec: %w", err)
	}
	if _, err := env.tc.Start(subCtx, &taskAPI.StartRequest{ID: env.containerID, ExecID: execID}); err != nil {
		return fmt.Errorf("start exec: %w", err)
	}
	if _, err := env.tc.Wait(subCtx, &taskAPI.WaitRequest{ID: env.containerID, ExecID: execID}); err != nil {
		return fmt.Errorf("wait: %w", err)
	}
	if _, err := env.tc.Delete(subCtx, &taskAPI.DeleteRequest{ID: env.containerID, ExecID: execID}); err != nil {
		return fmt.Errorf("delete exec: %w", err)
	}
	return nil
}

// pidDiff returns PIDs in `after` that aren't in `before`.
func pidDiff(before, after map[int]struct{}) []int {
	var out []int
	for pid := range after {
		if _, ok := before[pid]; !ok {
			out = append(out, pid)
		}
	}
	return out
}

// stressIterationTimeout caps how long any single Transfer or exec
// is allowed to take. A healthy iteration finishes in single-digit
// milliseconds; anything more than this is a hang.
const stressIterationTimeout = 5 * time.Second

// stressSoakBuffer is how much headroom the stress tests leave
// before the test framework's deadline. Set generously so a normal
// stress run with the default 10-minute test timeout never bumps
// into it.
const stressSoakBuffer = 1 * time.Minute

// stressReadPoolSize is the number of files the read subtest of
// the transfer stress pre-populates as a setup phase.
const stressReadPoolSize = 1000

// stressReadDir / stressWriteDir are the in-container directories
// used by the read and write transfer-stress subtests.
const (
	stressReadDir  = "/tmp/stress-read"
	stressWriteDir = "/tmp/stress-write"
)

// fuzzMissingBase is the in-container directory that the missing-file
// fuzz tests synthesize paths under. The test never creates it, so
// any path under it (with a sanitized suffix) is guaranteed to not
// exist.
const fuzzMissingBase = "/.fuzz-missing"

// stressSubtest is one concurrent workload run inside testTransfer.
type stressSubtest struct {
	name string
	fn   func(ctx context.Context) error
}

// testTransfer launches stat/write/read goroutines against a shared
// shim env and stops at the first failure. Subtest iteration counts
// are reported via t.Logf. (Was previously TransferSuite.testStress.)
func (s *StressSuite) testTransfer(t *testing.T) {
	env := newShimEnv(t, t.Context(), s.cfg)
	skipIfNoTransfer(t, env)
	defer shutdownShim(t, env.ctx, env)

	ctx, cancel := stressCtx(t, env.ctx)
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
}

// transferStressSubtests returns the stat / write / read stress
// subtests. The read pool is pre-populated synchronously so by the
// time the caller spawns goroutines, the read subtest can find its
// files.
func (s *StressSuite) transferStressSubtests(t *testing.T, env *shimEnv) []stressSubtest {
	t.Helper()

	for i := 0; i < stressReadPoolSize; i++ {
		name := fmt.Sprintf("file-%05d.txt", i)
		content := stressFileContent(i)
		if err := stressTransferWriteFile(env.ctx, env, stressReadDir, name, content); err != nil {
			t.Fatalf("read pool setup %d: %v", i, err)
		}
	}

	// Verify setup actually wrote all files. If the streaming layer
	// silently dropped writes, the read goroutine below would surface
	// the dropouts as "file not found" errors much later — a confusing
	// failure mode. Surface it here instead.
	missing := 0
	for i := 0; i < stressReadPoolSize; i++ {
		name := fmt.Sprintf("file-%05d.txt", i)
		path := stressReadDir + "/" + name
		if err := stressTransferStat(env.ctx, env, path); err != nil {
			missing++
			if missing <= 5 {
				t.Logf("setup verify: missing %s: %v", name, err)
			}
		}
	}
	if missing > 0 {
		t.Fatalf("setup verify: %d/%d read-pool files were not persisted by the shim", missing, stressReadPoolSize)
	}

	var writeIdx, readIdx atomic.Int64

	return []stressSubtest{
		{
			name: "stat",
			fn: func(ctx context.Context) error {
				return stressTransferStat(ctx, env, statDirContainerPath)
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

// stressFileContent is the canonical content for the i-th stress file.
func stressFileContent(i int) string {
	return fmt.Sprintf("stress-content-%05d\n", i)
}

// runStress runs fn in a sequential loop until fn returns an error
// or the parent context is canceled. fn receives a context detached
// from the parent so cancellation of the parent does not propagate
// into an in-flight iteration.
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
func stressTransferStat(ctx context.Context, env *shimEnv, path string) error {
	subCtx, cancel := context.WithTimeout(ctx, stressIterationTimeout)
	defer cancel()

	src := &transfer.ContainerPath{
		ContainerID: env.containerID,
		Path:        path,
		NoWalk:      true,
	}
	dst := transfer.NewWriteStream(&nopWriteCloser{io.Discard}, "application/x-tar")

	return stressDoTransfer(subCtx, env, src, dst)
}

// stressTransferWriteFile writes a single small file as a one-entry
// tar to the given directory in the container.
func stressTransferWriteFile(ctx context.Context, env *shimEnv, dir, name, content string) error {
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
		ContainerID: env.containerID,
		Path:        dir,
	}
	return stressDoTransfer(subCtx, env, src, dst)
}

// stressTransferReadFile reads a single file back from the container
// and returns its content.
func stressTransferReadFile(ctx context.Context, env *shimEnv, path, name string) (string, error) {
	subCtx, cancel := context.WithTimeout(ctx, stressIterationTimeout)
	defer cancel()

	src := &transfer.ContainerPath{
		ContainerID: env.containerID,
		Path:        path,
	}

	var received bytes.Buffer
	closed := make(chan struct{})
	dst := transfer.NewWriteStream(&signalCloser{w: &received, done: closed}, "application/x-tar")

	if err := stressDoTransfer(subCtx, env, src, dst); err != nil {
		return "", err
	}

	// Wait for the WriteStream's MarshalAny goroutine to finish
	// draining the stream into received. The Transfer RPC returning
	// only confirms the server is done writing — the client-side
	// io.Copy from stream into received runs in a separate goroutine
	// that signals via the writer's Close.
	select {
	case <-closed:
	case <-subCtx.Done():
		return "", subCtx.Err()
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
func stressDoTransfer(ctx context.Context, env *shimEnv, src, dst any) error {
	srcAny, err := marshalTransferAny(ctx, src, env.sc)
	if err != nil {
		return fmt.Errorf("marshal source: %w", err)
	}
	dstAny, err := marshalTransferAny(ctx, dst, env.sc)
	if err != nil {
		return fmt.Errorf("marshal destination: %w", err)
	}

	tfClient := transferapi.NewTTRPCTransferClient(env.client)
	_, err = tfClient.Transfer(ctx, &transferapi.TransferRequest{
		Source:      srcAny,
		Destination: dstAny,
	})
	return err
}
