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
	"strconv"
	"strings"
	"sync"
	"syscall"
	"testing"
	"time"

	taskAPI "github.com/containerd/containerd/api/runtime/task/v3"
	tasktypes "github.com/containerd/containerd/api/types/task"
	"github.com/containerd/containerd/v2/pkg/namespaces"
	"github.com/containerd/fifo"
	"github.com/containerd/ttrpc"
	typeurl "github.com/containerd/typeurl/v2"
	"github.com/opencontainers/runtime-spec/specs-go"
)

func testShimLifecycle(t *testing.T) {
	shimBin, bundleDir, rootfsMounts := shimSetup(t)
	t.Log("shim binary:", shimBin)

	// Write OCI spec
	createOCISpec(t, bundleDir, []string{"/bin/forever", "hello"})

	containerID := containerID(t)
	ns := shimtestNamespace

	// Create FIFO paths for IO
	stdoutPath, stderrPath := createIOFifos(t, bundleDir)

	ctx := namespaces.WithNamespace(t.Context(), ns)

	// Start the shim using the "start" subcommand protocol.
	// SHIM_SOCKET_DIR controls where the socket is created, avoiding
	// the default /run/containerd/s/ which requires root.
	params := startShim(t, shimBin, bundleDir, containerID, ns)
	t.Log("shim started, address:", params.Address)

	// Connect to the shim via TTRPC. The socket is ready immediately
	// after "start" returns — no polling needed.
	conn := connectShim(t, params.Address)
	client := ttrpc.NewClient(conn)
	defer client.Close()

	tc := taskAPI.NewTTRPCTaskClient(client)

	// Open FIFOs for reading (must be done before Create, which opens the
	// write end; containerd FIFO package handles non-blocking open)
	var stdoutBuf bytes.Buffer
	var stdoutMu sync.Mutex
	stdoutFifo, err := fifo.OpenFifo(ctx, stdoutPath, syscall.O_RDONLY|syscall.O_NONBLOCK, 0)
	if err != nil {
		t.Fatal("failed to open stdout fifo:", err)
	}
	defer stdoutFifo.Close()

	stderrFifo, err := fifo.OpenFifo(ctx, stderrPath, syscall.O_RDONLY|syscall.O_NONBLOCK, 0)
	if err != nil {
		t.Fatal("failed to open stderr fifo:", err)
	}
	defer stderrFifo.Close()

	// Copy stdout in background
	go func() {
		buf := make([]byte, 4096)
		for {
			n, err := stdoutFifo.Read(buf)
			if n > 0 {
				stdoutMu.Lock()
				stdoutBuf.Write(buf[:n])
				stdoutMu.Unlock()
			}
			if err != nil {
				return
			}
		}
	}()

	// Create the task
	t.Log("creating task")
	createResp, err := tc.Create(ctx, newCreateTaskRequest(t, containerID, bundleDir, stdoutPath, stderrPath, rootfsMounts))
	if err != nil {
		t.Fatal("failed to create task:", err)
	}
	t.Log("task created, pid:", createResp.Pid)

	// Start the task
	t.Log("starting task")
	startResp, err := tc.Start(ctx, &taskAPI.StartRequest{
		ID: containerID,
	})
	if err != nil {
		t.Fatal("failed to start task:", err)
	}
	t.Log("task started, pid:", startResp.Pid)

	// Check state — should be running
	t.Log("checking state")
	stateResp, err := tc.State(ctx, &taskAPI.StateRequest{
		ID: containerID,
	})
	if err != nil {
		t.Fatal("failed to get state:", err)
	}
	t.Log("task state:", stateResp.Status)
	if stateResp.Status != tasktypes.Status_RUNNING {
		t.Fatalf("expected task status RUNNING, got %s", stateResp.Status)
	}

	// Wait for "hello" output
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

	// Kill the task
	t.Log("killing task")
	_, err = tc.Kill(ctx, &taskAPI.KillRequest{
		ID:     containerID,
		Signal: uint32(syscall.SIGKILL),
		All:    true,
	})
	if err != nil {
		t.Fatal("failed to kill task:", err)
	}

	// Wait for the task to exit
	t.Log("waiting for task exit")
	waitResp, err := tc.Wait(ctx, &taskAPI.WaitRequest{
		ID: containerID,
	})
	if err != nil {
		t.Fatal("failed to wait for task:", err)
	}
	t.Log("task exited, status:", waitResp.ExitStatus)

	// Delete the task
	t.Log("deleting task")
	deleteResp, err := tc.Delete(ctx, &taskAPI.DeleteRequest{
		ID: containerID,
	})
	if err != nil {
		t.Fatal("failed to delete task:", err)
	}
	t.Log("task deleted, pid:", deleteResp.Pid, "exit status:", deleteResp.ExitStatus)

	// Shutdown the shim
	t.Log("shutting down shim")
	_, err = tc.Shutdown(ctx, &taskAPI.ShutdownRequest{
		ID: containerID,
	})
	if err != nil {
		t.Log("shutdown returned:", err)
	}

	t.Log("shim lifecycle test passed")
}

func testShimExec(t *testing.T) {
	skipFeature(t, "exec")
	shimBin, bundleDir, rootfsMounts := shimSetup(t)
	_ = shimBin

	containerID := containerID(t)
	ns := shimtestNamespace

	createOCISpec(t, bundleDir, []string{"/bin/forever"})

	stdoutPath, stderrPath := createIOFifos(t, bundleDir)
	ctx := namespaces.WithNamespace(t.Context(), ns)

	params := startShim(t, shimBin, bundleDir, containerID, ns)
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

	// Exec: run "echo execworks" inside the container
	execID := "exec1"
	execStdout, execStderr := createIOFifos(t, t.TempDir())

	var execBuf bytes.Buffer
	var execMu sync.Mutex
	drainFifoInto(t, ctx, execStdout, &execBuf, &execMu)
	drainFifo(t, ctx, execStderr)

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

	if _, err := tc.Start(ctx, &taskAPI.StartRequest{
		ID:     containerID,
		ExecID: execID,
	}); err != nil {
		t.Fatal("exec start failed:", err)
	}

	waitResp, err := tc.Wait(ctx, &taskAPI.WaitRequest{
		ID:     containerID,
		ExecID: execID,
	})
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

	if _, err := tc.Delete(ctx, &taskAPI.DeleteRequest{
		ID:     containerID,
		ExecID: execID,
	}); err != nil {
		t.Fatal("exec delete failed:", err)
	}

	tc.Kill(ctx, &taskAPI.KillRequest{ID: containerID, Signal: uint32(syscall.SIGKILL), All: true})
	tc.Wait(ctx, &taskAPI.WaitRequest{ID: containerID})
	tc.Delete(ctx, &taskAPI.DeleteRequest{ID: containerID})
	tc.Shutdown(ctx, &taskAPI.ShutdownRequest{ID: containerID})

	t.Log("exec test passed")
}

func testShimStdioRoundTrip(t *testing.T) {
	skipFeature(t, "exec")
	shimBin, bundleDir, rootfsMounts := shimSetup(t)

	containerID := containerID(t)
	ns := shimtestNamespace

	createOCISpec(t, bundleDir, []string{"/bin/forever"})

	stdoutPath, stderrPath := createIOFifos(t, bundleDir)
	ctx := namespaces.WithNamespace(t.Context(), ns)

	params := startShim(t, shimBin, bundleDir, containerID, ns)
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

	// Exec "cat" which copies stdin to stdout.
	execID := "stdio-rt"
	execDir := t.TempDir()
	execStdin, execStdout, execStderr := createStdioFifos(t, execDir)

	var execBuf bytes.Buffer
	var execMu sync.Mutex
	drainFifoInto(t, ctx, execStdout, &execBuf, &execMu)
	drainFifo(t, ctx, execStderr)

	// Open stdin write end before Exec so the shim can open the read
	// end without blocking.
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

	// Write a random value to stdin and read it back from stdout.
	token := randomSuffix() + "\n"

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

	// Kill the exec process (cat does not exit on FIFO close because
	// the shim may hold the write end of the stdin pipe open).
	tc.Kill(ctx, &taskAPI.KillRequest{ID: containerID, ExecID: execID, Signal: uint32(syscall.SIGKILL)})
	tc.Wait(ctx, &taskAPI.WaitRequest{ID: containerID, ExecID: execID})
	tc.Delete(ctx, &taskAPI.DeleteRequest{ID: containerID, ExecID: execID})

	tc.Kill(ctx, &taskAPI.KillRequest{ID: containerID, Signal: uint32(syscall.SIGKILL), All: true})
	tc.Wait(ctx, &taskAPI.WaitRequest{ID: containerID})
	tc.Delete(ctx, &taskAPI.DeleteRequest{ID: containerID})
	tc.Shutdown(ctx, &taskAPI.ShutdownRequest{ID: containerID})

	t.Log("stdio round trip test passed")
}

func testShimClock(t *testing.T) {
	skipFeature(t, "exec")
	shimBin, bundleDir, rootfsMounts := shimSetup(t)

	containerID := containerID(t)
	ns := shimtestNamespace

	createOCISpec(t, bundleDir, []string{"/bin/forever"})

	stdoutPath, stderrPath := createIOFifos(t, bundleDir)
	ctx := namespaces.WithNamespace(t.Context(), ns)

	params := startShim(t, shimBin, bundleDir, containerID, ns)
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

	// Run date +%s inside the VM and verify the timestamp is accurate.
	// We bracket the exec with host timestamps so the VM time must fall
	// within [before, after].
	execID := "clock1"
	execStdout, execStderr := createIOFifos(t, t.TempDir())

	var execBuf bytes.Buffer
	var execMu sync.Mutex
	drainFifoInto(t, ctx, execStdout, &execBuf, &execMu)
	drainFifo(t, ctx, execStderr)

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

	if _, err := tc.Start(ctx, &taskAPI.StartRequest{
		ID:     containerID,
		ExecID: execID,
	}); err != nil {
		t.Fatal("exec start failed:", err)
	}

	waitResp, err := tc.Wait(ctx, &taskAPI.WaitRequest{
		ID:     containerID,
		ExecID: execID,
	})
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

	// Parse the output as the unix timestamp from date +%s.
	vmEpoch, err := strconv.ParseInt(got, 10, 64)
	if err != nil {
		t.Fatalf("failed to parse VM timestamp %q: %v", got, err)
	}

	vmTime := time.Unix(vmEpoch, 0)
	t.Logf("host before: %s", before.UTC())
	t.Logf("VM time:     %s (epoch %d)", vmTime.UTC(), vmEpoch)
	t.Logf("host after:  %s", after.UTC())

	// The VM clock must fall within [before, after] with a small tolerance
	// to account for the date command's second-granularity truncation.
	tolerance := 2 * time.Second
	if vmTime.Before(before.Add(-tolerance)) || vmTime.After(after.Add(tolerance)) {
		t.Fatalf("VM clock is not synchronized: VM=%s, host range=[%s, %s], drift=%s",
			vmTime.UTC(), before.UTC(), after.UTC(),
			fmt.Sprintf("%+.1fs", vmTime.Sub(before).Seconds()))
	}

	if _, err := tc.Delete(ctx, &taskAPI.DeleteRequest{
		ID:     containerID,
		ExecID: execID,
	}); err != nil {
		t.Fatal("exec delete failed:", err)
	}

	tc.Kill(ctx, &taskAPI.KillRequest{ID: containerID, Signal: uint32(syscall.SIGKILL), All: true})
	tc.Wait(ctx, &taskAPI.WaitRequest{ID: containerID})
	tc.Delete(ctx, &taskAPI.DeleteRequest{ID: containerID})
	tc.Shutdown(ctx, &taskAPI.ShutdownRequest{ID: containerID})

	t.Log("clock test passed")
}
