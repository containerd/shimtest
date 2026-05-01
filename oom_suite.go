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
	"syscall"
	"testing"

	taskAPI "github.com/containerd/containerd/api/runtime/task/v3"
	"github.com/containerd/containerd/v2/pkg/namespaces"
	"github.com/containerd/ttrpc"
)

// OOMSuite contains the OOM-killer test, gated on the "oom" feature
// (some shim configurations don't expose memory cgroup controls or
// can't reliably trigger the kernel OOM killer).
type OOMSuite struct {
	cfg   Config
	setup ShimSetupFunc
}

// NewOOMSuite constructs an OOMSuite from the given options.
func NewOOMSuite(opts SuiteOptions) *OOMSuite {
	return &OOMSuite{cfg: opts.Config, setup: opts.resolveSetup()}
}

// Run runs every test in the suite as a subtest of t.
func (s *OOMSuite) Run(t *testing.T) {
	t.Helper()
	t.Run("OOM", s.TestOOM)
}

// TestOOM runs a memory-hungry process inside a container with a
// 128MiB memory limit and verifies the kernel OOM-kills it (exit 137).
func (s *OOMSuite) TestOOM(t *testing.T) {
	shimBin, bundleDir, rootfsMounts := ShimSetup(t, s.cfg)
	containerID := ContainerID(t)

	CreateOCISpecCfg(t, bundleDir, []string{"/bin/memhog"}, s.cfg,
		WithMemoryLimit(128*1024*1024),
	)

	stdoutPath, stderrPath := CreateIOFifos(t, bundleDir)
	ctx := namespaces.WithNamespace(t.Context(), Namespace)

	params := StartShim(t, shimBin, bundleDir, containerID, Namespace, s.cfg)
	conn := ConnectShim(t, params.Address)
	client := ttrpc.NewClient(conn)
	defer client.Close()

	tc := taskAPI.NewTTRPCTaskClient(client)

	DrainFifo(t, ctx, stdoutPath)
	DrainFifo(t, ctx, stderrPath)

	if _, err := tc.Create(ctx, NewCreateTaskRequest(t, containerID, bundleDir, stdoutPath, stderrPath, rootfsMounts)); err != nil {
		t.Fatal("create failed:", err)
	}
	if _, err := tc.Start(ctx, &taskAPI.StartRequest{ID: containerID}); err != nil {
		t.Fatal("start failed:", err)
	}

	waitResp, err := tc.Wait(ctx, &taskAPI.WaitRequest{ID: containerID})
	if err != nil {
		t.Fatal("wait failed:", err)
	}
	t.Log("task exit status:", waitResp.ExitStatus)

	const sigkillExit = 128 + uint32(syscall.SIGKILL)
	if waitResp.ExitStatus != sigkillExit {
		t.Fatalf("expected exit status %d (SIGKILL from OOM killer), got %d",
			sigkillExit, waitResp.ExitStatus)
	}

	tc.Delete(ctx, &taskAPI.DeleteRequest{ID: containerID})
	tc.Shutdown(ctx, &taskAPI.ShutdownRequest{ID: containerID})
}
