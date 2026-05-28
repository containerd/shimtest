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
	"runtime"
	"strconv"
	"strings"
	"sync"
	"syscall"
	"testing"
	"time"

	"github.com/containerd/containerd/api/events"
	taskAPI "github.com/containerd/containerd/api/runtime/task/v3"
	tasktypes "github.com/containerd/containerd/api/types/task"
	"github.com/containerd/containerd/v2/pkg/namespaces"
	"github.com/containerd/ttrpc"
	typeurl "github.com/containerd/typeurl/v2"
)

// RunSuite contains the always-run conformance tests: full container
// lifecycle, init exit-code propagation, output-then-exit, and
// event-stream verification. None of these tests are gated by a
// feature key — every shim should pass them.
type RunSuite struct {
	cfg Config
}

// NewRunSuite constructs a RunSuite from the given options.
func NewRunSuite(cfg Config) *RunSuite {
	return &RunSuite{cfg: cfg}
}

// Run runs every test in the suite as a subtest of t.
func (s *RunSuite) Run(t *testing.T) {
	t.Helper()
	registerShimLeakCheck(t, s.cfg.ShimBinary)
	t.Run("Lifecycle", s.testLifecycle)
	t.Run("InitExitCodes", s.testInitExitCodes)
	t.Run("OutputThenExit", s.testOutputThenExit)
	t.Run("Events", s.testEvents)
	t.Run("ParallelLifecycleScaling", s.testParallelLifecycleScaling)
}

// testLifecycle drives a container through create / start / state /
// kill / wait / delete / shutdown and verifies output appears.
func (s *RunSuite) testLifecycle(t *testing.T) {
	shimBin, bundleDir, rootfsMounts := shimSetup(t, s.cfg)
	t.Log("shim binary:", shimBin)

	createOCISpec(t, bundleDir, []string{"/bin/forever", "hello"}, s.cfg)

	containerID := containerID(t)
	stdoutPath, stderrPath := createIOFifos(t, bundleDir)
	ns := uniqueTestNamespace(t, "run")
	ctx := namespaces.WithNamespace(t.Context(), ns)

	params := startShim(t, shimBin, bundleDir, containerID, ns, s.cfg)
	t.Log("shim started, address:", params.Address)

	conn := connectShim(t, params.Address)
	client := ttrpc.NewClient(conn)
	defer client.Close()

	tc := taskAPI.NewTTRPCTaskClient(client)

	var stdoutBuf bytes.Buffer
	var stdoutMu sync.Mutex
	drainFifoInto(t, ctx, stdoutPath, &stdoutBuf, &stdoutMu)
	drainFifo(t, ctx, stderrPath)

	t.Log("creating task")
	createResp, err := tc.Create(ctx, newCreateTaskRequest(t, containerID, bundleDir, stdoutPath, stderrPath, rootfsMounts))
	if err != nil {
		t.Fatal("failed to create task:", err)
	}
	t.Log("task created, pid:", createResp.Pid)

	t.Log("starting task")
	startResp, err := tc.Start(ctx, &taskAPI.StartRequest{ID: containerID})
	if err != nil {
		t.Fatal("failed to start task:", err)
	}
	t.Log("task started, pid:", startResp.Pid)

	t.Log("checking state")
	stateResp, err := tc.State(ctx, &taskAPI.StateRequest{ID: containerID})
	if err != nil {
		t.Fatal("failed to get state:", err)
	}
	t.Log("task state:", stateResp.Status)
	if stateResp.Status != tasktypes.Status_RUNNING {
		t.Fatalf("expected task status RUNNING, got %s", stateResp.Status)
	}

	t.Log("waiting for output")
	deadline := time.After(30 * time.Second)
	for {
		stdoutMu.Lock()
		got := stdoutBuf.String()
		stdoutMu.Unlock()
		if strings.Contains(got, "hello") {
			t.Log("got expected output:", strings.TrimSpace(got))
			break
		}
		select {
		case <-deadline:
			t.Fatalf("timed out waiting for 'hello' output, got: %q", got)
		case <-time.After(100 * time.Millisecond):
		}
	}

	t.Log("killing task")
	if _, err := tc.Kill(ctx, &taskAPI.KillRequest{
		ID:     containerID,
		Signal: uint32(syscall.SIGKILL),
		All:    true,
	}); err != nil {
		t.Fatal("failed to kill task:", err)
	}

	t.Log("waiting for task exit")
	waitResp, err := tc.Wait(ctx, &taskAPI.WaitRequest{ID: containerID})
	if err != nil {
		t.Fatal("failed to wait for task:", err)
	}
	t.Log("task exited, status:", waitResp.ExitStatus)

	t.Log("deleting task")
	deleteResp, err := tc.Delete(ctx, &taskAPI.DeleteRequest{ID: containerID})
	if err != nil {
		t.Fatal("failed to delete task:", err)
	}
	t.Log("task deleted, pid:", deleteResp.Pid, "exit status:", deleteResp.ExitStatus)

	t.Log("shutting down shim")
	if _, err := tc.Shutdown(ctx, &taskAPI.ShutdownRequest{ID: containerID}); err != nil {
		t.Log("shutdown returned:", err)
	}
}

// testInitExitCodes runs /bin/exit N as the container's init for a
// range of values and verifies the task-level exit status.
func (s *RunSuite) testInitExitCodes(t *testing.T) {
	for _, code := range []int{0, 1, 2, 42, 127, 255} {
		t.Run(fmt.Sprintf("Exit%d", code), func(t *testing.T) {
			shimBin, bundleDir, rootfsMounts := shimSetup(t, s.cfg)
			cid := containerID(t)

			createOCISpec(t, bundleDir, []string{"/bin/exit", strconv.Itoa(code)}, s.cfg)

			stdoutPath, stderrPath := createIOFifos(t, bundleDir)
			ns := uniqueTestNamespace(t, "run")
			ctx := namespaces.WithNamespace(t.Context(), ns)

			params := startShim(t, shimBin, bundleDir, cid, ns, s.cfg)
			conn := connectShim(t, params.Address)
			client := ttrpc.NewClient(conn)
			defer client.Close()

			tc := taskAPI.NewTTRPCTaskClient(client)

			drainFifo(t, ctx, stdoutPath)
			drainFifo(t, ctx, stderrPath)

			if _, err := tc.Create(ctx, newCreateTaskRequest(t, cid, bundleDir, stdoutPath, stderrPath, rootfsMounts)); err != nil {
				t.Fatal("create failed:", err)
			}
			if _, err := tc.Start(ctx, &taskAPI.StartRequest{ID: cid}); err != nil {
				t.Fatal("start failed:", err)
			}

			waitResp, err := tc.Wait(ctx, &taskAPI.WaitRequest{ID: cid})
			if err != nil {
				t.Fatal("wait failed:", err)
			}
			if waitResp.ExitStatus != uint32(code) {
				t.Fatalf("expected exit status %d, got %d", code, waitResp.ExitStatus)
			}

			tc.Delete(ctx, &taskAPI.DeleteRequest{ID: cid})
			tc.Shutdown(ctx, &taskAPI.ShutdownRequest{ID: cid})
		})
	}
}

// testOutputThenExit runs a process that writes 50 lines then exits
// non-zero, and verifies both the exit status and every output line
// are captured by the shim.
func (s *RunSuite) testOutputThenExit(t *testing.T) {
	shimBin, bundleDir, rootfsMounts := shimSetup(t, s.cfg)
	containerID := containerID(t)

	createOCISpec(t, bundleDir, []string{"/bin/tickexit"}, s.cfg)

	stdoutPath, stderrPath := createIOFifos(t, bundleDir)
	ns := uniqueTestNamespace(t, "run")
	ctx := namespaces.WithNamespace(t.Context(), ns)

	params := startShim(t, shimBin, bundleDir, containerID, ns, s.cfg)
	conn := connectShim(t, params.Address)
	client := ttrpc.NewClient(conn)
	defer client.Close()

	tc := taskAPI.NewTTRPCTaskClient(client)

	var stdoutBuf bytes.Buffer
	var stdoutMu sync.Mutex
	drainFifoInto(t, ctx, stdoutPath, &stdoutBuf, &stdoutMu)
	drainFifo(t, ctx, stderrPath)

	if _, err := tc.Create(ctx, newCreateTaskRequest(t, containerID, bundleDir, stdoutPath, stderrPath, rootfsMounts)); err != nil {
		t.Fatal("create failed:", err)
	}
	if _, err := tc.Start(ctx, &taskAPI.StartRequest{ID: containerID}); err != nil {
		t.Fatal("failed to start task:", err)
	}

	waitResp, err := tc.Wait(ctx, &taskAPI.WaitRequest{ID: containerID})
	if err != nil {
		t.Fatal("wait failed:", err)
	}
	t.Log("task exit status:", waitResp.ExitStatus)

	const expectedExit = 7
	if waitResp.ExitStatus != expectedExit {
		t.Fatalf("expected exit status %d, got %d", expectedExit, waitResp.ExitStatus)
	}

	deadline := time.After(5 * time.Second)
	for {
		stdoutMu.Lock()
		got := stdoutBuf.String()
		stdoutMu.Unlock()
		if strings.Contains(got, "tick 50\n") {
			break
		}
		select {
		case <-deadline:
			stdoutMu.Lock()
			final := stdoutBuf.String()
			stdoutMu.Unlock()
			t.Fatalf("timed out waiting for final output, got: %q", final)
		case <-time.After(10 * time.Millisecond):
		}
	}

	stdoutMu.Lock()
	got := stdoutBuf.String()
	stdoutMu.Unlock()
	lines := strings.Split(strings.TrimRight(got, "\n"), "\n")
	if len(lines) != 50 {
		t.Fatalf("expected 50 output lines, got %d: %q", len(lines), got)
	}
	for i, line := range lines {
		want := fmt.Sprintf("tick %d", i+1)
		if line != want {
			t.Fatalf("line %d: got %q, want %q", i, line, want)
		}
	}

	tc.Delete(ctx, &taskAPI.DeleteRequest{ID: containerID})
	tc.Shutdown(ctx, &taskAPI.ShutdownRequest{ID: containerID})
}

// testEvents verifies that the shim publishes the expected task
// lifecycle events (create, start, exit, delete) to its containerd
// events endpoint during a normal run.
func (s *RunSuite) testEvents(t *testing.T) {
	shimBin, bundleDir, rootfsMounts := shimSetup(t, s.cfg)
	containerID := containerID(t)
	ns := uniqueTestNamespace(t, "run")

	createOCISpec(t, bundleDir, []string{"/bin/exit", "0"}, s.cfg)

	stdoutPath, stderrPath := createIOFifos(t, bundleDir)
	ctx := namespaces.WithNamespace(t.Context(), ns)

	rec := startEventsRecorder(t, bundleDir)

	params := startShim(t, shimBin, bundleDir, containerID, ns, s.cfg)
	conn := connectShim(t, params.Address)
	client := ttrpc.NewClient(conn)
	defer client.Close()

	tc := taskAPI.NewTTRPCTaskClient(client)

	drainFifo(t, ctx, stdoutPath)
	drainFifo(t, ctx, stderrPath)

	if _, err := tc.Create(ctx, newCreateTaskRequest(t, containerID, bundleDir, stdoutPath, stderrPath, rootfsMounts)); err != nil {
		t.Fatal("create failed:", err)
	}
	if _, err := tc.Start(ctx, &taskAPI.StartRequest{ID: containerID}); err != nil {
		t.Fatal("start failed:", err)
	}

	if _, err := tc.Wait(ctx, &taskAPI.WaitRequest{ID: containerID}); err != nil {
		t.Fatal("wait failed:", err)
	}

	if rec.waitForTopic("/tasks/exit", 2*time.Second) == nil {
		t.Fatalf("exit event not published after task wait; received topics: %v", rec.topics())
	}

	if _, err := tc.Delete(ctx, &taskAPI.DeleteRequest{ID: containerID}); err != nil {
		t.Fatal("delete failed:", err)
	}

	want := []string{
		"/tasks/create",
		"/tasks/start",
		"/tasks/exit",
		"/tasks/delete",
	}
	for _, topic := range want {
		if env := rec.waitForTopic(topic, 5*time.Second); env == nil {
			t.Fatalf("missing event %q; received topics: %v", topic, rec.topics())
		}
	}

	tc.Shutdown(ctx, &taskAPI.ShutdownRequest{ID: containerID})

	got := rec.topics()
	t.Log("received topics:", got)
	idx := 0
	for _, topic := range got {
		if idx < len(want) && topic == want[idx] {
			idx++
		}
	}
	if idx != len(want) {
		t.Fatalf("events out of order or missing: want (in order) %v, got %v", want, got)
	}

	exitEnv := rec.waitForTopic("/tasks/exit", 0)
	if exitEnv == nil {
		t.Fatal("exit envelope vanished")
	}
	if exitEnv.Namespace != ns {
		t.Errorf("exit envelope namespace: got %q, want %q", exitEnv.Namespace, ns)
	}
	var exitEvt events.TaskExit
	if err := typeurl.UnmarshalTo(exitEnv.Event, &exitEvt); err != nil {
		t.Fatal("unmarshal TaskExit:", err)
	}
	if exitEvt.ContainerID != containerID {
		t.Errorf("exit event container id: got %q, want %q", exitEvt.ContainerID, containerID)
	}
	if exitEvt.ExitStatus != 0 {
		t.Errorf("exit event exit status: got %d, want 0", exitEvt.ExitStatus)
	}
}

// parallelLifecycleScalingLevel describes one concurrency level for
// testParallelLifecycleScaling.
type parallelLifecycleScalingLevel struct {
	multiplier int    // concurrency = NumCPU * multiplier
	label      string // subtest name
	maxRatio   float64 // maximum allowed ratio vs the n baseline
}

// parallelLifecycleScalingLevels defines the four concurrency levels
// and their individual ratio limits. The baseline is n (multiplier=1,
// ratio limit=1.25×). Each subsequent level adds one more n, and its
// limit grows by 1.25× accordingly: 2n≤2.5×, 3n≤3.75×, 4n≤5.0×.
//
// These limits are deliberately tighter than pure linear scaling
// (which would predict 1×, 2×, 3×, 4×) but looser than exponential
// growth. A shim that serialises internally — where doubling containers
// doubles wall time — would breach 1.25× at 2n and fail the test.
var parallelLifecycleScalingLevels = []parallelLifecycleScalingLevel{
	{1, "n", 1.25},
	{2, "2n", 2.50},
	{3, "3n", 3.75},
	{4, "4n", 5.00},
}

// testParallelLifecycleScaling runs the full container lifecycle
// (shimSetup → startShim → Create → Start → wait for output → kill →
// wait → delete → shutdown) at four concurrency levels derived from
// runtime.NumCPU(): n, 2n, 3n, and 4n.
//
// At each level all containers are launched simultaneously in their
// own t.Run subtests so every tb-safe helper (shimSetup, startShim,
// createIOFifos, …) is called from the subtest's goroutine. A
// sync.WaitGroup captures wall-clock time from first goroutine launch
// to last subtest completion.
//
// The baseline is the n run. Each higher level is checked against its
// own limit (1.25×n, 2.50×n, 3.75×n, 5.00×n). This allows up to 25%
// overhead per additional n of concurrency — enough headroom for
// scheduler jitter — while catching exponential degradation caused by
// contention, serialisation, or resource exhaustion.
func (s *RunSuite) testParallelLifecycleScaling(t *testing.T) {
	ncpu := runtime.NumCPU()
	t.Logf("NumCPU = %d", ncpu)

	// elapsed[i] is the wall-clock duration of the i-th level.
	elapsed := make([]time.Duration, len(parallelLifecycleScalingLevels))

	for idx, lvl := range parallelLifecycleScalingLevels {
		count := ncpu * lvl.multiplier
		idx, lvl, count := idx, lvl, count // capture for subtest

		t.Run(lvl.label, func(t *testing.T) {
			t.Logf("concurrency = %d containers", count)

			var wg sync.WaitGroup
			// started is closed once all goroutines are in flight,
			// acting as a release gate so containers begin as
			// simultaneously as possible.
			started := make(chan struct{})

			tBegin := time.Now()
			for j := 0; j < count; j++ {
				j := j
				wg.Add(1)
				go func() {
					defer wg.Done()
					<-started
					t.Run(fmt.Sprintf("container%03d", j), func(t *testing.T) {
						runOneParallelLifecycle(t, s.cfg)
					})
				}()
			}
			close(started)
			wg.Wait()
			elapsed[idx] = time.Since(tBegin)

			if t.Failed() {
				return
			}
			t.Logf("wall time for %d containers: %s", count, elapsed[idx].Round(time.Millisecond))
		})

		if t.Failed() {
			return
		}
	}

	// baseline is the n run (index 0).
	baseline := elapsed[0]
	if baseline == 0 {
		return
	}

	// Check each level against its individual ratio limit.
	t.Log("scaling summary (wall time relative to n baseline):")
	for idx, lvl := range parallelLifecycleScalingLevels {
		if elapsed[idx] == 0 {
			continue
		}
		count := ncpu * lvl.multiplier
		ratio := elapsed[idx].Seconds() / baseline.Seconds()
		t.Logf("  %-4s  containers=%3d  elapsed=%-10s  ratio=%.2f×  limit=%.2f×",
			lvl.label, count, elapsed[idx].Round(time.Millisecond), ratio, lvl.maxRatio)
		if ratio > lvl.maxRatio {
			t.Errorf("concurrency %s: elapsed %s is %.2f× the n baseline (%s), exceeds %.2f× limit — scaling is not sub-linear",
				lvl.label, elapsed[idx].Round(time.Millisecond), ratio,
				baseline.Round(time.Millisecond), lvl.maxRatio)
		}
	}
}

// runOneParallelLifecycle drives a single container through the
// complete startup lifecycle: shimSetup → OCI spec → startShim →
// connect → Create → Start → wait for output → kill → wait →
// delete → shutdown. All tb methods are called on t, making this
// safe to invoke from a t.Run goroutine.
func runOneParallelLifecycle(t *testing.T, cfg Config) {
	t.Helper()

	shimBin, bundleDir, rootfsMounts := shimSetup(t, cfg)
	cid := containerID(t)

	createOCISpec(t, bundleDir, []string{"/bin/forever", "hello"}, cfg)
	stdoutPath, stderrPath := createIOFifos(t, bundleDir)
	ns := uniqueTestNamespace(t, "run")
	ctx := namespaces.WithNamespace(t.Context(), ns)

	params := startShim(t, shimBin, bundleDir, cid, ns, cfg)
	conn := connectShim(t, params.Address)
	client := ttrpc.NewClient(conn)
	defer client.Close()
	tc := taskAPI.NewTTRPCTaskClient(client)

	var stdoutBuf bytes.Buffer
	var stdoutMu sync.Mutex
	drainFifoInto(t, ctx, stdoutPath, &stdoutBuf, &stdoutMu)
	drainFifo(t, ctx, stderrPath)

	if _, err := tc.Create(ctx, newCreateTaskRequest(t, cid, bundleDir, stdoutPath, stderrPath, rootfsMounts)); err != nil {
		t.Fatal("create failed:", err)
	}
	if _, err := tc.Start(ctx, &taskAPI.StartRequest{ID: cid}); err != nil {
		t.Fatal("start failed:", err)
	}

	deadline := time.After(30 * time.Second)
	for {
		stdoutMu.Lock()
		got := stdoutBuf.String()
		stdoutMu.Unlock()
		if strings.Contains(got, "hello") {
			break
		}
		select {
		case <-deadline:
			t.Fatal("timed out waiting for output")
		case <-time.After(1 * time.Millisecond):
		}
	}

	if _, err := tc.Kill(ctx, &taskAPI.KillRequest{ID: cid, Signal: uint32(syscall.SIGKILL), All: true}); err != nil {
		t.Fatal("kill failed:", err)
	}
	if _, err := tc.Wait(ctx, &taskAPI.WaitRequest{ID: cid}); err != nil {
		t.Fatal("wait failed:", err)
	}
	if _, err := tc.Delete(ctx, &taskAPI.DeleteRequest{ID: cid}); err != nil {
		t.Fatal("delete failed:", err)
	}
	tc.Shutdown(ctx, &taskAPI.ShutdownRequest{ID: cid})
}
