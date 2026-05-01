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
	"context"
	"strings"
	"syscall"
	"testing"

	taskAPI "github.com/containerd/containerd/api/runtime/task/v3"
	streamingapi "github.com/containerd/containerd/api/services/streaming/v1"
	transferapi "github.com/containerd/containerd/api/services/transfer/v1"
	"github.com/containerd/containerd/v2/core/streaming"
	"github.com/containerd/containerd/v2/pkg/namespaces"
	"github.com/containerd/ttrpc"
)

// ShimEnv is the per-test shim environment. It wraps the shim's
// TTRPC client, task service, streaming service, and the running
// container's identity. Tests typically receive a ShimEnv from
// SuiteOptions.Setup and use it to invoke task / transfer / streaming
// operations.
type ShimEnv struct {
	// Ctx is the namespaced request context for use with the shim's
	// services. It is derived from the caller's base context (e.g.
	// t.Context()) and the shimtest namespace.
	Ctx context.Context

	// Client is the shim's TTRPC client. Its lifetime is bound to the
	// caller's testing.TB via Cleanup.
	Client *ttrpc.Client

	// TC is the task-API client used to drive the container.
	TC taskAPI.TTRPCTaskService

	// SC creates streaming.Stream instances over the TTRPC connection
	// — used by the transfer service's bidirectional streams.
	SC streaming.StreamCreator

	// ContainerID is the unique id of the container created during
	// setup. It also doubles as the bundle's instance id.
	ContainerID string

	// BundleDir is the on-disk OCI bundle. Tests that need to drop
	// extra fixture files alongside the bundle (e.g. a host-side
	// socket) can place them here.
	BundleDir string
}

// DefaultSetup returns a ShimSetupFunc that runs the standard shimtest
// flow: build a rootfs from the embedded testbin, start the shim,
// connect, create + start a container, probe the transfer service,
// and register cleanup via tb.Cleanup. The returned function may
// call tb.Skip when the shim under test does not implement a probed
// feature (currently: transfer).
func DefaultSetup(cfg Config) ShimSetupFunc {
	return func(tb testing.TB, ctx context.Context) *ShimEnv {
		return NewShimEnv(tb, ctx, cfg)
	}
}

// NewShimEnv starts a shim, creates and starts a container, and
// returns a ShimEnv ready for task/transfer operations. Cleanup is
// registered via tb.Cleanup. The container runs /bin/forever as its
// init process.
func NewShimEnv(tb testing.TB, baseCtx context.Context, cfg Config) *ShimEnv {
	tb.Helper()

	shimBin, bundleDir, rootfsMounts := ShimSetup(tb, cfg)

	containerID := ContainerID(tb)

	// OCI spec must exist before starting the shim ("start" reads it).
	CreateOCISpec(tb, bundleDir, []string{"/bin/forever"})

	// Create FIFOs for task IO; the initial process doesn't produce
	// interesting output but the shim requires them.
	stdoutPath, stderrPath := CreateIOFifos(tb, bundleDir)

	ctx := namespaces.WithNamespace(baseCtx, Namespace)

	params := StartShim(tb, shimBin, bundleDir, containerID, Namespace, cfg)

	conn := ConnectShim(tb, params.Address)
	client := ttrpc.NewClient(conn)
	tb.Cleanup(func() { client.Close() })

	tc := taskAPI.NewTTRPCTaskClient(client)

	// Probe the transfer service — skip transfer-using callers when
	// the shim doesn't implement it.
	tfProbe := transferapi.NewTTRPCTransferClient(client)
	_, probeErr := tfProbe.Transfer(ctx, &transferapi.TransferRequest{})
	if probeErr != nil {
		msg := probeErr.Error()
		if strings.Contains(msg, "Unimplemented") || strings.Contains(msg, "unknown service") {
			tb.Skip("skipping: shim does not support transfer service:", probeErr)
		}
	}

	sc := &ttrpcStreamCreator{client: streamingapi.NewTTRPCStreamingClient(client)}

	DrainFifo(tb, ctx, stdoutPath)
	DrainFifo(tb, ctx, stderrPath)
	if _, err := tc.Create(ctx, NewCreateTaskRequest(tb, containerID, bundleDir, stdoutPath, stderrPath, rootfsMounts)); err != nil {
		tb.Fatal("failed to create task:", err)
	}
	if _, err := tc.Start(ctx, &taskAPI.StartRequest{ID: containerID}); err != nil {
		tb.Fatal("failed to start task:", err)
	}

	return &ShimEnv{
		Ctx:         ctx,
		Client:      client,
		TC:          tc,
		SC:          sc,
		ContainerID: containerID,
		BundleDir:   bundleDir,
	}
}

// ShutdownShim kills, waits, deletes, and shuts down the shim's task.
// Best-effort: errors are logged on tb but not fatal, since it's
// commonly called as cleanup after a test that's already failed.
func ShutdownShim(tb testing.TB, ctx context.Context, env *ShimEnv) {
	tb.Helper()

	tb.Log("killing task")
	env.TC.Kill(ctx, &taskAPI.KillRequest{
		ID:     env.ContainerID,
		Signal: uint32(syscall.SIGKILL),
		All:    true,
	})

	tb.Log("waiting for exit")
	env.TC.Wait(ctx, &taskAPI.WaitRequest{ID: env.ContainerID})

	tb.Log("deleting task")
	env.TC.Delete(ctx, &taskAPI.DeleteRequest{ID: env.ContainerID})

	tb.Log("shutting down shim")
	env.TC.Shutdown(ctx, &taskAPI.ShutdownRequest{ID: env.ContainerID})
}
