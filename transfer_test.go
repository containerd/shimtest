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
	"io"
	"strings"
	"sync"
	"syscall"
	"testing"
	"time"

	taskAPI "github.com/containerd/containerd/api/runtime/task/v3"
	streamingapi "github.com/containerd/containerd/api/services/streaming/v1"
	transferapi "github.com/containerd/containerd/api/services/transfer/v1"
	"github.com/containerd/containerd/v2/core/streaming"
	"github.com/containerd/containerd/v2/pkg/namespaces"
	"github.com/containerd/errdefs/pkg/errgrpc"
	"github.com/containerd/ttrpc"
	"github.com/containerd/typeurl/v2"
	"github.com/opencontainers/runtime-spec/specs-go"
	"google.golang.org/protobuf/types/known/anypb"

	"github.com/dmcgowan/shimtest/internal/transfer"
)

func testTransferCopyTo(t *testing.T) {
	skipFeature(t, "transfer")
	env := newShimEnv(t)
	ctx := env.ctx

	const testContent = "transfer-test-data-12345\n"

	// Copy a file into the container via the transfer service.
	// The destination path is the directory; the tar entry name
	// ("transferred.txt") determines the final filename.
	copyToContainer(t, ctx, env, testContent, "/tmp")
	t.Log("copy-to succeeded")

	shutdownShim(t, ctx, env)
}

func testTransferCopyToAndFrom(t *testing.T) {
	skipFeature(t, "transfer")
	env := newShimEnv(t)
	ctx := env.ctx

	const testContent = "transfer-test-data-12345\n"

	// Copy a file into the container. The tar entry "transferred.txt"
	// is extracted under /tmp, creating /tmp/transferred.txt.
	copyToContainer(t, ctx, env, testContent, "/tmp")
	t.Log("copy-to succeeded")

	// Copy the file back and verify the content matches.
	received := copyFromContainer(t, ctx, env, "/tmp/transferred.txt")
	if received != testContent {
		t.Fatalf("copy-from content mismatch: got %q, want %q", received, testContent)
	}
	t.Log("copy-from verified, content:", strings.TrimSpace(received))

	shutdownShim(t, ctx, env)
}

func testTransferExecVerify(t *testing.T) {
	skipFeature(t, "transfer")
	env := newShimEnv(t)
	ctx := env.ctx

	const testContent = "transfer-test-data-12345\n"

	// Copy a file in, then exec cat to read it back.
	copyToContainer(t, ctx, env, testContent, "/tmp")

	execOutput := shimExec(t, ctx, env, "verify", []string{
		"/bin/cat", "/tmp/transferred.txt",
	})
	if !strings.Contains(execOutput, strings.TrimRight(testContent, "\n")) {
		t.Fatalf("exec output %q does not contain expected content %q", execOutput, testContent)
	}
	t.Log("copy-to verified via exec:", strings.TrimSpace(execOutput))

	shutdownShim(t, ctx, env)
}

// shimEnv holds the shared state for a running shim + container.
type shimEnv struct {
	ctx         context.Context
	client      *ttrpc.Client
	tc          taskAPI.TTRPCTaskService
	sc          streaming.StreamCreator
	containerID string
}

// newShimEnv starts a shim, creates and starts a container, and returns
// the environment for further operations.
func newShimEnv(t *testing.T) *shimEnv {
	t.Helper()

	shimBin, bundleDir, rootfsMounts := shimSetup(t)

	containerID := containerID(t)
	ns := shimtestNamespace

	// OCI spec must exist before starting the shim (readSpec in "start" mode).
	// Use "sh -c" with sleep so the container stays alive for transfer operations.
	createOCISpec(t, bundleDir, []string{"/bin/forever"})

	// Create FIFOs for task IO (the initial process doesn't produce
	// interesting output, but the shim requires them).
	stdoutPath, stderrPath := createIOFifos(t, bundleDir)

	ctx := namespaces.WithNamespace(t.Context(), ns)

	params := startShim(t, shimBin, bundleDir, containerID, ns)

	conn := connectShim(t, params.Address)
	client := ttrpc.NewClient(conn)
	t.Cleanup(func() { client.Close() })

	tc := taskAPI.NewTTRPCTaskClient(client)
	// Probe the transfer service — skip transfer tests for shims
	// that don't implement it (e.g., the default runc shim).
	tfProbe := transferapi.NewTTRPCTransferClient(client)
	_, probeErr := tfProbe.Transfer(ctx, &transferapi.TransferRequest{})
	if probeErr != nil {
		msg := probeErr.Error()
		// The service is registered if the error indicates it processed
		// the request but rejected it for application-level reasons:
		// "not implemented", "not found", "failed precondition" (VM not
		// started yet), etc. Only skip if the error indicates the service
		// method itself doesn't exist (ttrpc returns "Unimplemented").
		if strings.Contains(msg, "Unimplemented") || strings.Contains(msg, "unknown service") {
			t.Skip("skipping: shim does not support transfer service:", probeErr)
		}
	}

	sc := &ttrpcStreamCreator{client: streamingapi.NewTTRPCStreamingClient(client)}

	// Open FIFOs and drain them
	drainFifo(t, ctx, stdoutPath)
	drainFifo(t, ctx, stderrPath)
	if _, err := tc.Create(ctx, newCreateTaskRequest(t, containerID, bundleDir, stdoutPath, stderrPath, rootfsMounts)); err != nil {
		t.Fatal("failed to create task:", err)
	}

	if _, err := tc.Start(ctx, &taskAPI.StartRequest{ID: containerID}); err != nil {
		t.Fatal("failed to start task:", err)
	}

	return &shimEnv{
		ctx:         ctx,
		client:      client,
		tc:          tc,
		sc:          sc,
		containerID: containerID,
	}
}

// copyToContainer transfers content as a tar archive into the container
// at the given path using the transfer service.
func copyToContainer(t *testing.T, ctx context.Context, env *shimEnv, content, path string) {
	t.Helper()

	// Build a tar archive containing the file.
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
		ContainerID: env.containerID,
		Path:        path,
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
}

// copyFromContainer reads a file from the container via the transfer
// service and returns its content.
func copyFromContainer(t *testing.T, ctx context.Context, env *shimEnv, path string) string {
	t.Helper()

	src := &transfer.ContainerPath{
		ContainerID: env.containerID,
		Path:        path,
	}

	var received bytes.Buffer
	dst := transfer.NewWriteStream(&nopWriteCloser{&received}, "application/x-tar")

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
		t.Fatal("copy-from transfer failed:", err)
	}

	// The received data is a tar archive — extract the file content.
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
func shimExec(t *testing.T, ctx context.Context, env *shimEnv, execID string, args []string) string {
	t.Helper()

	// Create FIFOs for exec IO
	execStdout, execStderr := createIOFifos(t, t.TempDir())

	// Collect exec stdout
	var execBuf bytes.Buffer
	var execMu sync.Mutex
	drainFifoInto(t, ctx, execStdout, &execBuf, &execMu)
	drainFifo(t, ctx, execStderr)

	// Marshal the process spec for exec
	procSpec := &specs.Process{
		Args: args,
		Cwd:  "/",
		Env:  []string{"PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"},
	}
	execSpec, err := typeurl.MarshalAnyToProto(procSpec)
	if err != nil {
		t.Fatal("failed to marshal exec spec:", err)
	}

	// Exec
	if _, err := env.tc.Exec(ctx, &taskAPI.ExecProcessRequest{
		ID:     env.containerID,
		ExecID: execID,
		Spec:   execSpec,
		Stdout: execStdout,
		Stderr: execStderr,
	}); err != nil {
		t.Fatal("exec failed:", err)
	}

	// Start the exec
	if _, err := env.tc.Start(ctx, &taskAPI.StartRequest{
		ID:     env.containerID,
		ExecID: execID,
	}); err != nil {
		t.Fatal("exec start failed:", err)
	}

	// Wait for exec to finish
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

	// Give a moment for stdout to flush through the FIFO
	time.Sleep(100 * time.Millisecond)

	// Delete the exec
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

func shutdownShim(t *testing.T, ctx context.Context, env *shimEnv) {
	t.Helper()

	t.Log("killing task")
	env.tc.Kill(ctx, &taskAPI.KillRequest{
		ID:     env.containerID,
		Signal: uint32(syscall.SIGKILL),
		All:    true,
	})

	t.Log("waiting for exit")
	env.tc.Wait(ctx, &taskAPI.WaitRequest{ID: env.containerID})

	t.Log("deleting task")
	env.tc.Delete(ctx, &taskAPI.DeleteRequest{ID: env.containerID})

	t.Log("shutting down shim")
	env.tc.Shutdown(ctx, &taskAPI.ShutdownRequest{ID: env.containerID})
}

// streamMarshaler is implemented by types that create streams during marshaling.
type streamMarshaler interface {
	MarshalAny(context.Context, streaming.StreamCreator) (typeurl.Any, error)
}

func marshalTransferAny(ctx context.Context, v any, sc streaming.StreamCreator) (*anypb.Any, error) {
	var a typeurl.Any
	var err error
	if sm, ok := v.(streamMarshaler); ok {
		a, err = sm.MarshalAny(ctx, sc)
	} else {
		a, err = typeurl.MarshalAny(v)
	}
	if err != nil {
		return nil, err
	}
	return &anypb.Any{
		TypeUrl: a.GetTypeUrl(),
		Value:   a.GetValue(),
	}, nil
}

type nopWriteCloser struct {
	io.Writer
}

func (nopWriteCloser) Close() error { return nil }

// ttrpcStreamCreator implements streaming.StreamCreator over TTRPC.
// It opens a bidirectional stream to the shim's streaming service,
// sends a StreamInit with the stream ID, waits for the ack, and
// returns a Stream that wraps the TTRPC bidi stream.
type ttrpcStreamCreator struct {
	client streamingapi.TTRPCStreamingClient
}

func (sc *ttrpcStreamCreator) Create(ctx context.Context, id string) (streaming.Stream, error) {
	stream, err := sc.client.Stream(ctx)
	if err != nil {
		return nil, err
	}

	a, err := typeurl.MarshalAny(&streamingapi.StreamInit{ID: id})
	if err != nil {
		return nil, err
	}
	if err := stream.Send(typeurl.MarshalProto(a)); err != nil {
		return nil, errgrpc.ToNative(err)
	}

	// Wait for ack
	if _, err := stream.Recv(); err != nil {
		return nil, errgrpc.ToNative(err)
	}

	return &ttrpcStream{s: stream}, nil
}

type ttrpcStream struct {
	s streamingapi.TTRPCStreaming_StreamClient
}

func (cs *ttrpcStream) Send(a typeurl.Any) error {
	return toNative(cs.s.Send(typeurl.MarshalProto(a)))
}

func (cs *ttrpcStream) Recv() (typeurl.Any, error) {
	a, err := cs.s.Recv()
	if err != nil {
		return nil, toNative(err)
	}
	return a, nil
}

// toNative converts ttrpc status errors to native Go errors, but
// preserves context errors directly so that errors.Is checks work.
func toNative(err error) error {
	if err == nil {
		return nil
	}
	if errors.Is(err, context.Canceled) {
		return context.Canceled
	}
	if errors.Is(err, context.DeadlineExceeded) {
		return context.DeadlineExceeded
	}
	return errgrpc.ToNative(err)
}

func (cs *ttrpcStream) Close() error {
	return cs.s.CloseSend()
}
