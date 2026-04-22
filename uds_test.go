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
	"io"
	"net"
	"path/filepath"
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

// TestShimUDSRoundTrip verifies that a container can connect to a host-side
// unix domain socket via the UDS mount type, and that data flows
// bidirectionally.
func testShimUDSRoundTrip(t *testing.T) {
	skipFeature(t, "uds")

	shimBin, bundleDir, rootfsMounts := shimSetup(t)

	containerID := containerID(t)
	ns := shimtestNamespace

	// Create a host-side UDS listener.
	hostSockDir := t.TempDir()
	hostSockPath := filepath.Join(hostSockDir, "test.sock")
	ln, err := net.Listen("unix", hostSockPath)
	if err != nil {
		t.Fatal("listen:", err)
	}
	defer ln.Close()

	const containerSockPath = "/run/test.sock"

	// Build OCI spec with UDS mount.
	createOCISpec(t, bundleDir, []string{"/bin/forever"},
		specs.Mount{
			Type:        "uds",
			Source:      hostSockPath,
			Destination: containerSockPath,
		},
	)

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

	// Exec nc -U inside the container — it connects to the forwarded
	// socket and copies stdio ↔ socket bidirectionally.
	execID := "uds-rt"
	execDir := t.TempDir()
	_, execStdout, execStderr := createStdioFifos(t, execDir)

	var execBuf bytes.Buffer
	var execMu sync.Mutex
	drainFifoInto(t, ctx, execStdout, &execBuf, &execMu)
	drainFifo(t, ctx, execStderr)

	procSpec, err := typeurl.MarshalAnyToProto(&specs.Process{
		Args: []string{"/bin/nc", "-U", containerSockPath},
		Cwd:  "/",
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

	// Accept the forwarded connection on the host listener.
	ln.(*net.UnixListener).SetDeadline(time.Now().Add(30 * time.Second))
	hostConn, err := ln.Accept()
	if err != nil {
		t.Fatal("accept:", err)
	}
	defer hostConn.Close()

	// Send a token from the host, expect the container's nc to pipe
	// it back to stdout via the socket connection. nc copies
	// socket→stdout, so the data arrives in execBuf.
	token := randomSuffix() + "\n"
	if _, err := hostConn.Write([]byte(token)); err != nil {
		t.Fatal("host write:", err)
	}

	deadline := time.After(30 * time.Second)
	for {
		execMu.Lock()
		got := execBuf.String()
		execMu.Unlock()
		if bytes.Contains([]byte(got), []byte(token)) {
			t.Log("UDS round trip succeeded, got:", got)
			break
		}
		select {
		case <-deadline:
			t.Fatalf("timed out waiting for UDS round trip, got: %q", got)
		case <-time.After(10 * time.Millisecond):
		}
	}

	// Cleanup
	hostConn.Close()
	tc.Kill(ctx, &taskAPI.KillRequest{ID: containerID, ExecID: execID, Signal: uint32(syscall.SIGKILL)})
	tc.Wait(ctx, &taskAPI.WaitRequest{ID: containerID, ExecID: execID})
	tc.Delete(ctx, &taskAPI.DeleteRequest{ID: containerID, ExecID: execID})

	tc.Kill(ctx, &taskAPI.KillRequest{ID: containerID, Signal: uint32(syscall.SIGKILL), All: true})
	tc.Wait(ctx, &taskAPI.WaitRequest{ID: containerID})
	tc.Delete(ctx, &taskAPI.DeleteRequest{ID: containerID})
	tc.Shutdown(ctx, &taskAPI.ShutdownRequest{ID: containerID})

	t.Log("UDS round trip test passed")
}

// benchmarkShimUDSRoundTrip measures one-way throughput across a
// UDS-forwarded socket in both directions at different payload sizes.
// The container runs `nc -U` which pipes socket↔stdio, giving us two
// independent data paths to time:
//
//   - HostToContainer: host writes to hostConn, container's nc reads
//     from the socket and writes to stdout. Host reads from the exec
//     stdout FIFO.
//   - ContainerToHost: host writes to the exec stdin FIFO, container's
//     nc reads from stdin and writes to the socket. Host reads from
//     hostConn.
func benchmarkShimUDSRoundTrip(b *testing.B) {
	skipFeatureBench(b, "uds")

	shimBin, bundleDir, rootfsMounts := shimSetup(b)
	cid := containerID(b)
	ns := shimtestNamespace

	hostSockDir := b.TempDir()
	hostSockPath := filepath.Join(hostSockDir, "bench.sock")
	ln, err := net.Listen("unix", hostSockPath)
	if err != nil {
		b.Fatal("listen:", err)
	}
	defer ln.Close()

	const containerSockPath = "/run/bench.sock"

	createOCISpec(b, bundleDir, []string{"/bin/forever"},
		specs.Mount{
			Type:        "uds",
			Source:      hostSockPath,
			Destination: containerSockPath,
		},
	)

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

	// Set up exec with stdin/stdout/stderr FIFOs we control directly.
	execID := "uds-bench"
	execDir := b.TempDir()
	execStdin, execStdout, execStderr := createStdioFifos(b, execDir)

	// Open stdin write-end and stdout read-end before Exec so the
	// shim can open its ends without blocking.
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
		Args: []string{"/bin/nc", "-U", containerSockPath},
		Cwd:  "/",
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

	// Accept the forwarded connection.
	ln.(*net.UnixListener).SetDeadline(time.Now().Add(30 * time.Second))
	hostConn, err := ln.Accept()
	if err != nil {
		b.Fatal("accept:", err)
	}
	defer hostConn.Close()

	sizes := []struct {
		name string
		size int
	}{
		{"8B", 8},
		{"4KB", 4096},
		{"4MB", 4 * 1024 * 1024},
	}

	// HostToContainer: write to hostConn, read from exec stdout FIFO.
	b.Run("HostToContainer", func(b *testing.B) {
		for _, sz := range sizes {
			b.Run(sz.name, func(b *testing.B) {
				payload := make([]byte, sz.size)
				rand.Read(payload)
				recvBuf := make([]byte, sz.size)

				b.SetBytes(int64(sz.size))
				b.ResetTimer()

				for i := 0; i < b.N; i++ {
					errCh := make(chan error, 1)
					go func() {
						_, err := hostConn.Write(payload)
						errCh <- err
					}()
					if _, err := io.ReadFull(stdoutFifo, recvBuf); err != nil {
						b.Fatal("read stdout:", err)
					}
					if err := <-errCh; err != nil {
						b.Fatal("write hostConn:", err)
					}
				}
			})
		}
	})

	// ContainerToHost: write to exec stdin FIFO, read from hostConn.
	b.Run("ContainerToHost", func(b *testing.B) {
		for _, sz := range sizes {
			b.Run(sz.name, func(b *testing.B) {
				payload := make([]byte, sz.size)
				rand.Read(payload)
				recvBuf := make([]byte, sz.size)

				b.SetBytes(int64(sz.size))
				b.ResetTimer()

				for i := 0; i < b.N; i++ {
					errCh := make(chan error, 1)
					go func() {
						_, err := stdinFifo.Write(payload)
						errCh <- err
					}()
					if _, err := io.ReadFull(hostConn, recvBuf); err != nil {
						b.Fatal("read hostConn:", err)
					}
					if err := <-errCh; err != nil {
						b.Fatal("write stdin:", err)
					}
				}
			})
		}
	})

	stdinFifo.Close()
	hostConn.Close()
	tc.Kill(ctx, &taskAPI.KillRequest{ID: cid, Signal: uint32(syscall.SIGKILL), All: true})
	tc.Wait(ctx, &taskAPI.WaitRequest{ID: cid})
	tc.Delete(ctx, &taskAPI.DeleteRequest{ID: cid, ExecID: execID})
	tc.Delete(ctx, &taskAPI.DeleteRequest{ID: cid})
	tc.Shutdown(ctx, &taskAPI.ShutdownRequest{ID: cid})
}
