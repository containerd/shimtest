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

// shimEnv is the per-test shim environment. It wraps the shim's
// TTRPC client, task service, streaming service, and the running
// container's identity. Suite tests call newShimEnv to construct
// one; cleanup is registered on the supplied testing.TB.
type shimEnv struct {
	ctx         context.Context
	client      *ttrpc.Client
	tc          taskAPI.TTRPCTaskService
	sc          streaming.StreamCreator
	containerID string
}

// newShimEnv starts a shim, creates and starts a container, and
// returns a shimEnv ready for task/transfer operations. Cleanup is
// registered via tb.Cleanup. The container runs /bin/forever as its
// init process. Tests that need a different command build their own
// env via the lower-level helpers (shimSetup, createOCISpec,
// startShim, ...).
func newShimEnv(tb testing.TB, baseCtx context.Context, cfg Config) *shimEnv {
	tb.Helper()

	shimBin, bundleDir, rootfsMounts := shimSetup(tb, cfg)

	cid := containerID(tb)

	createOCISpec(tb, bundleDir, []string{"/bin/forever"}, cfg)

	stdoutPath, stderrPath := createIOFifos(tb, bundleDir)

	ctx := namespaces.WithNamespace(baseCtx, shimtestNamespace)

	params := startShim(tb, shimBin, bundleDir, cid, shimtestNamespace, cfg)

	conn := connectShim(tb, params.Address)
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

	drainFifo(tb, ctx, stdoutPath)
	drainFifo(tb, ctx, stderrPath)
	if _, err := tc.Create(ctx, newCreateTaskRequest(tb, cid, bundleDir, stdoutPath, stderrPath, rootfsMounts)); err != nil {
		tb.Fatal("failed to create task:", err)
	}
	if _, err := tc.Start(ctx, &taskAPI.StartRequest{ID: cid}); err != nil {
		tb.Fatal("failed to start task:", err)
	}

	return &shimEnv{
		ctx:         ctx,
		client:      client,
		tc:          tc,
		sc:          sc,
		containerID: cid,
	}
}

// shutdownShim kills, waits, deletes, and shuts down the shim's task.
// Best-effort: errors are logged on tb but not fatal, since it's
// commonly called as cleanup after a test that's already failed.
func shutdownShim(tb testing.TB, ctx context.Context, env *shimEnv) {
	tb.Helper()

	tb.Log("killing task")
	env.tc.Kill(ctx, &taskAPI.KillRequest{
		ID:     env.containerID,
		Signal: uint32(syscall.SIGKILL),
		All:    true,
	})

	tb.Log("waiting for exit")
	env.tc.Wait(ctx, &taskAPI.WaitRequest{ID: env.containerID})

	tb.Log("deleting task")
	env.tc.Delete(ctx, &taskAPI.DeleteRequest{ID: env.containerID})

	tb.Log("shutting down shim")
	env.tc.Shutdown(ctx, &taskAPI.ShutdownRequest{ID: env.containerID})
}
