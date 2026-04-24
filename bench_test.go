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
	"crypto/rand"
	"fmt"
	"io"
	"os"
	"path/filepath"
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

// benchmarkShimLifecycle measures the full create-start-kill-wait-delete
// lifecycle of a container through the shim, including the shim start.
func benchmarkShimLifecycle(b *testing.B) {
	base := containerID(b)
	ns := shimtestNamespace

	b.ResetTimer()

	for i := 0; i < b.N; i++ {
		b.StopTimer()
		cid := fmt.Sprintf("%s-%d", base, i)
		shimBin, bundleDir, rootfsMounts := shimSetup(b)
		createOCISpec(b, bundleDir, []string{"/bin/forever", "hello"})
		stdoutPath, stderrPath := createIOFifos(b, bundleDir)
		ctx := namespaces.WithNamespace(b.Context(), ns)

		var stdoutBuf bytes.Buffer
		var stdoutMu sync.Mutex
		drainFifoInto(b, ctx, stdoutPath, &stdoutBuf, &stdoutMu)
		drainFifo(b, ctx, stderrPath)

		b.StartTimer()

		params := startShim(b, shimBin, bundleDir, cid, ns)
		conn := connectShim(b, params.Address)
		client := ttrpc.NewClient(conn)
		tc := taskAPI.NewTTRPCTaskClient(client)

		if _, err := tc.Create(ctx, newCreateTaskRequest(b, cid, bundleDir, stdoutPath, stderrPath, rootfsMounts)); err != nil {
			b.Fatal("create failed:", err)
		}
		if _, err := tc.Start(ctx, &taskAPI.StartRequest{ID: cid}); err != nil {
			b.Fatal("start failed:", err)
		}
		if _, err := tc.Kill(ctx, &taskAPI.KillRequest{ID: cid, Signal: uint32(syscall.SIGKILL), All: true}); err != nil {
			b.Fatal("kill failed:", err)
		}
		if _, err := tc.Wait(ctx, &taskAPI.WaitRequest{ID: cid}); err != nil {
			b.Fatal("wait failed:", err)
		}
		if _, err := tc.Delete(ctx, &taskAPI.DeleteRequest{ID: cid}); err != nil {
			b.Fatal("delete failed:", err)
		}

		b.StopTimer()
		tc.Shutdown(ctx, &taskAPI.ShutdownRequest{ID: cid})
		client.Close()
	}
}

// benchmarkShimStartup measures the time from shim start through the
// first output being produced by the container process.
func benchmarkShimStartup(b *testing.B) {
	base := containerID(b)
	ns := shimtestNamespace

	b.ResetTimer()

	for i := 0; i < b.N; i++ {
		b.StopTimer()
		cid := fmt.Sprintf("%s-%d", base, i)
		shimBin, bundleDir, rootfsMounts := shimSetup(b)
		createOCISpec(b, bundleDir, []string{"/bin/forever", "started"})
		stdoutPath, stderrPath := createIOFifos(b, bundleDir)
		ctx := namespaces.WithNamespace(b.Context(), ns)

		var stdoutBuf bytes.Buffer
		var stdoutMu sync.Mutex
		drainFifoInto(b, ctx, stdoutPath, &stdoutBuf, &stdoutMu)
		drainFifo(b, ctx, stderrPath)

		b.StartTimer()

		params := startShim(b, shimBin, bundleDir, cid, ns)
		conn := connectShim(b, params.Address)
		client := ttrpc.NewClient(conn)
		tc := taskAPI.NewTTRPCTaskClient(client)

		if _, err := tc.Create(ctx, newCreateTaskRequest(b, cid, bundleDir, stdoutPath, stderrPath, rootfsMounts)); err != nil {
			b.Fatal("create failed:", err)
		}
		if _, err := tc.Start(ctx, &taskAPI.StartRequest{ID: cid}); err != nil {
			b.Fatal("start failed:", err)
		}

		deadline := time.After(30 * time.Second)
		for {
			stdoutMu.Lock()
			got := stdoutBuf.String()
			stdoutMu.Unlock()
			if strings.Contains(got, "started") {
				break
			}
			select {
			case <-deadline:
				b.Fatal("timed out waiting for output")
			case <-time.After(1 * time.Millisecond):
			}
		}

		b.StopTimer()

		tc.Kill(ctx, &taskAPI.KillRequest{ID: cid, Signal: uint32(syscall.SIGKILL), All: true})
		tc.Wait(ctx, &taskAPI.WaitRequest{ID: cid})
		tc.Delete(ctx, &taskAPI.DeleteRequest{ID: cid})
		tc.Shutdown(ctx, &taskAPI.ShutdownRequest{ID: cid})
		client.Close()
	}
}

// benchmarkShimStartupPhases reports per-phase timings for the startup
// sequence. Custom metrics are averaged over b.N iterations.
func benchmarkShimStartupPhases(b *testing.B) {
	base := containerID(b)
	ns := shimtestNamespace

	var sumShimStart, sumConnect, sumCreate, sumTaskStart, sumOutput, sumTotal time.Duration

	b.ResetTimer()

	for i := 0; i < b.N; i++ {
		b.StopTimer()
		cid := fmt.Sprintf("%s-%d", base, i)
		shimBin, bundleDir, rootfsMounts := shimSetup(b)
		createOCISpec(b, bundleDir, []string{"/bin/forever", "started"})
		stdoutPath, stderrPath := createIOFifos(b, bundleDir)
		ctx := namespaces.WithNamespace(b.Context(), ns)

		var stdoutBuf bytes.Buffer
		var stdoutMu sync.Mutex
		drainFifoInto(b, ctx, stdoutPath, &stdoutBuf, &stdoutMu)
		drainFifo(b, ctx, stderrPath)

		b.StartTimer()
		t0 := time.Now()

		params := startShim(b, shimBin, bundleDir, cid, ns)
		tShimStart := time.Since(t0)

		t1 := time.Now()
		conn := connectShim(b, params.Address)
		client := ttrpc.NewClient(conn)
		tc := taskAPI.NewTTRPCTaskClient(client)
		tConnect := time.Since(t1)

		t2 := time.Now()
		if _, err := tc.Create(ctx, newCreateTaskRequest(b, cid, bundleDir, stdoutPath, stderrPath, rootfsMounts)); err != nil {
			b.Fatal("create failed:", err)
		}
		tCreate := time.Since(t2)

		t3 := time.Now()
		if _, err := tc.Start(ctx, &taskAPI.StartRequest{ID: cid}); err != nil {
			b.Fatal("start failed:", err)
		}
		tTaskStart := time.Since(t3)

		t4 := time.Now()
		deadline := time.After(30 * time.Second)
		for {
			stdoutMu.Lock()
			got := stdoutBuf.String()
			stdoutMu.Unlock()
			if strings.Contains(got, "started") {
				break
			}
			select {
			case <-deadline:
				b.Fatal("timed out waiting for output")
			case <-time.After(1 * time.Millisecond):
			}
		}
		tOutput := time.Since(t4)
		tTotal := time.Since(t0)

		b.StopTimer()

		sumShimStart += tShimStart
		sumConnect += tConnect
		sumCreate += tCreate
		sumTaskStart += tTaskStart
		sumOutput += tOutput
		sumTotal += tTotal

		tc.Kill(ctx, &taskAPI.KillRequest{ID: cid, Signal: uint32(syscall.SIGKILL), All: true})
		tc.Wait(ctx, &taskAPI.WaitRequest{ID: cid})
		tc.Delete(ctx, &taskAPI.DeleteRequest{ID: cid})
		tc.Shutdown(ctx, &taskAPI.ShutdownRequest{ID: cid})
		client.Close()
	}

	n := float64(b.N)
	b.ReportMetric(float64(sumShimStart.Milliseconds())/n, "ms/shim-start")
	b.ReportMetric(float64(sumConnect.Milliseconds())/n, "ms/connect")
	b.ReportMetric(float64(sumCreate.Milliseconds())/n, "ms/create")
	b.ReportMetric(float64(sumTaskStart.Milliseconds())/n, "ms/task-start")
	b.ReportMetric(float64(sumOutput.Milliseconds())/n, "ms/output")
	b.ReportMetric(float64(sumTotal.Milliseconds())/n, "ms/total")
}

// benchmarkShimStart measures just the shim "start" subcommand: the
// time from fork/exec of the shim binary until it returns its
// bootstrap parameters.
func benchmarkShimStart(b *testing.B) {
	base := containerID(b)
	ns := shimtestNamespace

	b.ResetTimer()

	for i := 0; i < b.N; i++ {
		b.StopTimer()
		cid := fmt.Sprintf("%s-%d", base, i)
		shimBin, bundleDir, _ := shimSetup(b)
		createOCISpec(b, bundleDir, []string{"/bin/forever"})
		ctx := namespaces.WithNamespace(b.Context(), ns)

		b.StartTimer()
		params := startShim(b, shimBin, bundleDir, cid, ns)
		b.StopTimer()

		// Cleanup
		conn := connectShim(b, params.Address)
		client := ttrpc.NewClient(conn)
		tc := taskAPI.NewTTRPCTaskClient(client)
		tc.Shutdown(ctx, &taskAPI.ShutdownRequest{ID: cid})
		client.Close()
	}
}

// benchmarkShimExec measures the time to exec a process inside a
// running container (exec + start + wait + delete). The container is
// set up once outside the benchmark loop.
func benchmarkShimExec(b *testing.B) {
	skipFeatureBench(b, "exec")

	shimBin, bundleDir, rootfsMounts := shimSetup(b)
	cid := containerID(b)
	ns := shimtestNamespace

	createOCISpec(b, bundleDir, []string{"/bin/forever"})
	stdoutPath, stderrPath := createIOFifos(b, bundleDir)
	ctx := namespaces.WithNamespace(b.Context(), ns)

	params := startShim(b, shimBin, bundleDir, cid, ns)
	conn := connectShim(b, params.Address)
	client := ttrpc.NewClient(conn)
	defer client.Close()

	tc := taskAPI.NewTTRPCTaskClient(client)

	drainFifo(b, ctx, stdoutPath)
	drainFifo(b, ctx, stderrPath)

	if _, err := tc.Create(ctx, newCreateTaskRequest(b, cid, bundleDir, stdoutPath, stderrPath, rootfsMounts)); err != nil {
		b.Fatal("create failed:", err)
	}
	if _, err := tc.Start(ctx, &taskAPI.StartRequest{ID: cid}); err != nil {
		b.Fatal("start failed:", err)
	}

	procSpec, err := typeurl.MarshalAnyToProto(&specs.Process{
		Args: []string{"/bin/echo", "benchexec"},
		Cwd:  "/",
		Env:  []string{"PATH=/bin:/usr/bin"},
	})
	if err != nil {
		b.Fatal("marshal exec spec:", err)
	}

	b.ResetTimer()

	for i := 0; i < b.N; i++ {
		b.StopTimer()
		execID := fmt.Sprintf("exec-%d", i)
		execStdout, execStderr := createIOFifos(b, b.TempDir())
		drainFifo(b, ctx, execStdout)
		drainFifo(b, ctx, execStderr)
		b.StartTimer()

		if _, err := tc.Exec(ctx, &taskAPI.ExecProcessRequest{
			ID:     cid,
			ExecID: execID,
			Spec:   procSpec,
			Stdout: execStdout,
			Stderr: execStderr,
		}); err != nil {
			b.Fatal("exec failed:", err)
		}
		if _, err := tc.Start(ctx, &taskAPI.StartRequest{ID: cid, ExecID: execID}); err != nil {
			b.Fatal("exec start failed:", err)
		}
		if _, err := tc.Wait(ctx, &taskAPI.WaitRequest{ID: cid, ExecID: execID}); err != nil {
			b.Fatal("exec wait failed:", err)
		}
		if _, err := tc.Delete(ctx, &taskAPI.DeleteRequest{ID: cid, ExecID: execID}); err != nil {
			b.Fatal("exec delete failed:", err)
		}
	}

	b.StopTimer()

	tc.Kill(ctx, &taskAPI.KillRequest{ID: cid, Signal: uint32(syscall.SIGKILL), All: true})
	tc.Wait(ctx, &taskAPI.WaitRequest{ID: cid})
	tc.Delete(ctx, &taskAPI.DeleteRequest{ID: cid})
	tc.Shutdown(ctx, &taskAPI.ShutdownRequest{ID: cid})
}

// benchmarkShimStdioRoundTrip measures the time for a write-to-stdin /
// read-from-stdout round trip through a container running `cat`. Only
// the write+read is timed. Sub-benchmarks cover different payload sizes.
func benchmarkShimStdioRoundTrip(b *testing.B) {
	skipFeatureBench(b, "exec")

	shimBin, bundleDir, rootfsMounts := shimSetup(b)
	cid := containerID(b)
	ns := shimtestNamespace

	createOCISpec(b, bundleDir, []string{"/bin/forever"})
	stdoutPath, stderrPath := createIOFifos(b, bundleDir)
	ctx := namespaces.WithNamespace(b.Context(), ns)

	params := startShim(b, shimBin, bundleDir, cid, ns)
	conn := connectShim(b, params.Address)
	client := ttrpc.NewClient(conn)
	defer client.Close()

	tc := taskAPI.NewTTRPCTaskClient(client)

	drainFifo(b, ctx, stdoutPath)
	drainFifo(b, ctx, stderrPath)

	if _, err := tc.Create(ctx, newCreateTaskRequest(b, cid, bundleDir, stdoutPath, stderrPath, rootfsMounts)); err != nil {
		b.Fatal("create failed:", err)
	}
	if _, err := tc.Start(ctx, &taskAPI.StartRequest{ID: cid}); err != nil {
		b.Fatal("start failed:", err)
	}

	execID := "stdio-rt"
	execDir := b.TempDir()
	execStdin, execStdout, execStderr := createStdioFifos(b, execDir)

	stdinFifo, err := fifo.OpenFifo(ctx, execStdin, syscall.O_WRONLY|syscall.O_NONBLOCK, 0)
	if err != nil {
		b.Fatal("open stdin fifo:", err)
	}
	defer stdinFifo.Close()

	stdoutFifo, err := fifo.OpenFifo(ctx, execStdout, syscall.O_RDONLY|syscall.O_NONBLOCK, 0)
	if err != nil {
		b.Fatal("open stdout fifo:", err)
	}
	defer stdoutFifo.Close()

	drainFifo(b, ctx, execStderr)

	procSpec, err := typeurl.MarshalAnyToProto(&specs.Process{
		Args: []string{"/bin/cat"},
		Cwd:  "/",
		Env:  []string{"PATH=/bin:/usr/bin"},
	})
	if err != nil {
		b.Fatal("marshal exec spec:", err)
	}

	if _, err := tc.Exec(ctx, &taskAPI.ExecProcessRequest{
		ID:     cid,
		ExecID: execID,
		Spec:   procSpec,
		Stdin:  execStdin,
		Stdout: execStdout,
		Stderr: execStderr,
	}); err != nil {
		b.Fatal("exec failed:", err)
	}
	if _, err := tc.Start(ctx, &taskAPI.StartRequest{ID: cid, ExecID: execID}); err != nil {
		b.Fatal("exec start failed:", err)
	}

	// Warmup.
	warmup := make([]byte, 8)
	rand.Read(warmup)
	if _, err := stdinFifo.Write(warmup); err != nil {
		b.Fatal("warmup write:", err)
	}
	warmupBuf := make([]byte, len(warmup))
	if _, err := io.ReadFull(stdoutFifo, warmupBuf); err != nil {
		b.Fatal("warmup read:", err)
	}

	sizes := []struct {
		name string
		size int
	}{
		{"8B", 8},
		{"4KB", 4096},
		{"4MB", 4 * 1024 * 1024},
	}

	for _, sz := range sizes {
		b.Run(sz.name, func(b *testing.B) {
			payload := make([]byte, sz.size)
			rand.Read(payload)
			recvBuf := make([]byte, sz.size)

			b.SetBytes(int64(sz.size))
			b.ResetTimer()

			for i := 0; i < b.N; i++ {
				// Write and read concurrently to avoid deadlock
				// when the payload exceeds the pipe buffer size.
				errCh := make(chan error, 1)
				go func() {
					_, err := stdinFifo.Write(payload)
					errCh <- err
				}()
				if _, err := io.ReadFull(stdoutFifo, recvBuf); err != nil {
					b.Fatal("read:", err)
				}
				if err := <-errCh; err != nil {
					b.Fatal("write:", err)
				}
			}

			b.StopTimer()
		})
	}

	stdinFifo.Close()
	tc.Kill(ctx, &taskAPI.KillRequest{ID: cid, Signal: uint32(syscall.SIGKILL), All: true})
	tc.Wait(ctx, &taskAPI.WaitRequest{ID: cid})
	tc.Delete(ctx, &taskAPI.DeleteRequest{ID: cid, ExecID: execID})
	tc.Delete(ctx, &taskAPI.DeleteRequest{ID: cid})
	tc.Shutdown(ctx, &taskAPI.ShutdownRequest{ID: cid})
}

// benchmarkShimReadLargeFile measures the time to read + crc32 a
// 64 MiB fixture from the secondary erofs layer. The container is
// set up once; each iteration is one exec of /bin/hashverify with
// fresh IO FIFOs. Warm-cache after the first iteration, so this is
// really a measure of the shim's IO plumbing (virtio-blk / erofs /
// page-cache indirection) under cache hit.
func benchmarkShimReadLargeFile(b *testing.B) {
	skipFeatureBench(b, "exec")
	benchmarkShimHashverify(b, bigFileContainerPath, bigFileHashHex(), nil)
}

// benchmarkShimReadBindMount is the bind-mount counterpart of
// benchmarkShimReadLargeFile: host tempfile → bind-mounted into the
// container → same hashverify loop. For nerdbox this exercises the
// virtiofs bind path; for runc it's a host kernel bind.
func benchmarkShimReadBindMount(b *testing.B) {
	skipFeatureBench(b, "exec")

	hostFile := filepath.Join(b.TempDir(), "bigfile")
	f, err := os.Create(hostFile)
	if err != nil {
		b.Fatal("create host bigfile:", err)
	}
	if _, err := io.Copy(f, newBigFileReader()); err != nil {
		f.Close()
		b.Fatal("write host bigfile:", err)
	}
	if err := f.Close(); err != nil {
		b.Fatal("close host bigfile:", err)
	}

	const containerPath = "/tmp/bigfile"
	benchmarkShimHashverify(b, containerPath, bigFileHashHex(), []specs.Mount{{
		Type:        "bind",
		Source:      hostFile,
		Destination: containerPath,
		Options:     []string{"rbind"},
	}})
}

// benchmarkShimHashverify is the shared driver for the two read
// benchmarks. Only the exec+start+wait of hashverify is timed; the
// per-iteration FIFO and exec-delete work is excluded via
// StopTimer/StartTimer.
func benchmarkShimHashverify(b *testing.B, path, hashHex string, extraMounts []specs.Mount) {
	shimBin, bundleDir, rootfsMounts := shimSetup(b)
	cid := containerID(b)
	ns := shimtestNamespace

	var opts []func(*specs.Spec)
	if len(extraMounts) > 0 {
		opts = append(opts, withExtraMounts(extraMounts...))
	}
	createOCISpec(b, bundleDir, []string{"/bin/forever"}, opts...)

	stdoutPath, stderrPath := createIOFifos(b, bundleDir)
	ctx := namespaces.WithNamespace(b.Context(), ns)

	params := startShim(b, shimBin, bundleDir, cid, ns)
	conn := connectShim(b, params.Address)
	client := ttrpc.NewClient(conn)
	defer client.Close()

	tc := taskAPI.NewTTRPCTaskClient(client)
	drainFifo(b, ctx, stdoutPath)
	drainFifo(b, ctx, stderrPath)

	if _, err := tc.Create(ctx, newCreateTaskRequest(b, cid, bundleDir, stdoutPath, stderrPath, rootfsMounts)); err != nil {
		b.Fatal("create failed:", err)
	}
	if _, err := tc.Start(ctx, &taskAPI.StartRequest{ID: cid}); err != nil {
		b.Fatal("start failed:", err)
	}

	procSpec, err := typeurl.MarshalAnyToProto(&specs.Process{
		Args: []string{"/bin/hashverify", path, hashHex},
		Cwd:  "/",
		Env:  []string{"PATH=/bin:/usr/bin"},
	})
	if err != nil {
		b.Fatal("marshal exec spec:", err)
	}

	b.SetBytes(bigFileSize)
	b.ResetTimer()

	for i := 0; i < b.N; i++ {
		b.StopTimer()
		execID := fmt.Sprintf("hashv-%d", i)
		execStdout, execStderr := createIOFifos(b, b.TempDir())
		drainFifo(b, ctx, execStdout)
		drainFifo(b, ctx, execStderr)
		b.StartTimer()

		if _, err := tc.Exec(ctx, &taskAPI.ExecProcessRequest{
			ID:     cid,
			ExecID: execID,
			Spec:   procSpec,
			Stdout: execStdout,
			Stderr: execStderr,
		}); err != nil {
			b.Fatal("exec failed:", err)
		}
		if _, err := tc.Start(ctx, &taskAPI.StartRequest{ID: cid, ExecID: execID}); err != nil {
			b.Fatal("exec start failed:", err)
		}
		waitResp, err := tc.Wait(ctx, &taskAPI.WaitRequest{ID: cid, ExecID: execID})
		if err != nil {
			b.Fatal("exec wait failed:", err)
		}
		if waitResp.ExitStatus != 0 {
			b.Fatalf("hashverify exit %d", waitResp.ExitStatus)
		}

		b.StopTimer()
		if _, err := tc.Delete(ctx, &taskAPI.DeleteRequest{ID: cid, ExecID: execID}); err != nil {
			b.Fatal("exec delete failed:", err)
		}
		b.StartTimer()
	}

	b.StopTimer()
	tc.Kill(ctx, &taskAPI.KillRequest{ID: cid, Signal: uint32(syscall.SIGKILL), All: true})
	tc.Wait(ctx, &taskAPI.WaitRequest{ID: cid})
	tc.Delete(ctx, &taskAPI.DeleteRequest{ID: cid})
	tc.Shutdown(ctx, &taskAPI.ShutdownRequest{ID: cid})
}
