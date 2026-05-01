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

// Package shimtest is a conformance test suite for containerd shim
// implementations. The tests are organized into Suites — RunSuite,
// ExecSuite, TransferSuite, UDSSuite, OOMSuite — each gated against
// one feature key. Callers construct a Config + SuiteOptions and call
// the suite's Run method (or individual Test methods) from their own
// test functions:
//
//	func TestMyShim(t *testing.T) {
//	    opts := shimtest.SuiteOptions{
//	        Config: shimtest.Config{ShimBinary: "containerd-shim-myshim-v1"},
//	    }
//	    shimtest.NewRunSuite(opts).Run(t)
//	    shimtest.NewExecSuite(opts).Run(t)
//	}
//
// The shim setup happens via a SetupFunc on SuiteOptions; if nil, the
// default flow (start shim, create+start container) is used.
package shimtest

import (
	"context"
	"testing"
)

// Namespace is the containerd namespace used for all shimtest
// operations.
const Namespace = "shimtest"

// Config is the suite-level configuration. It carries everything a
// suite needs to bring up a shim. There is no Skip field — choosing
// which suites to run is the caller's concern (skip a feature by not
// constructing the corresponding suite).
type Config struct {
	// ShimBinary is the name (resolved via PATH) or absolute path of
	// the shim binary under test.
	ShimBinary string

	// FormatMounts, when true, provides the rootfs to the shim as
	// formatted erofs/ext4 images plus a format/mkdir/overlay mount
	// descriptor — appropriate for VM-based shims that mount the
	// rootfs themselves. When false the rootfs is extracted (or
	// overlay-mounted on the host) and provided pre-mounted.
	FormatMounts bool

	// Env is a set of environment variables propagated to processes
	// spawned by the harness (the shim binary, runc, etc.). The local
	// JSON-driven runner applies this via os.Setenv before any test
	// runs; library callers can pre-populate the process environment
	// directly and leave this empty.
	Env map[string]string

	// Debug enables verbose logging from the shim.
	Debug bool
}

// ShimSetupFunc brings up a shim and a running container for a single
// test. The returned ShimEnv is ready for task-API and transfer-API
// calls. The implementation must register cleanup via tb.Cleanup so
// the shim, container, and supporting resources are torn down after
// the test.
type ShimSetupFunc func(tb testing.TB, ctx context.Context) *ShimEnv

// SuiteOptions is the argument to every NewXxxSuite constructor.
type SuiteOptions struct {
	// Config is the shim configuration. Required.
	Config Config

	// Setup is the per-test shim/container bring-up. Optional; when
	// nil DefaultSetup(Config) is used.
	Setup ShimSetupFunc
}

// resolveSetup returns opts.Setup or DefaultSetup(opts.Config) when
// the caller didn't supply one.
func (o SuiteOptions) resolveSetup() ShimSetupFunc {
	if o.Setup != nil {
		return o.Setup
	}
	return DefaultSetup(o.Config)
}
