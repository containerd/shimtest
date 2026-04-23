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

import "testing"

// TestShim is the top-level test runner. It iterates over all discovered
// configurations and runs the full test suite for each as a subtest
// named after the config file.
func TestShim(t *testing.T) {
	for name, cfg := range testConfigs {
		if reason := checkRunnable(cfg); reason != "" {
			t.Run(name, func(t *testing.T) {
				t.Skipf("skipping: %s", reason)
			})
			continue
		}
		t.Run(name, func(t *testing.T) {
			activateConfig(cfg)
			t.Run("Lifecycle", testShimLifecycle)
			t.Run("Exec", testShimExec)
			t.Run("StdioRoundTrip", testShimStdioRoundTrip)
			t.Run("Clock", testShimClock)
			t.Run("ExitCodes", testShimExitCodes)
			t.Run("InitExitCodes", testShimInitExitCodes)
			t.Run("OutputThenExit", testShimOutputThenExit)
			t.Run("OOM", testShimOOM)
			t.Run("TransferCopyTo", testTransferCopyTo)
			t.Run("TransferCopyToAndFrom", testTransferCopyToAndFrom)
			t.Run("TransferExecVerify", testTransferExecVerify)
			t.Run("UDSRoundTrip", testShimUDSRoundTrip)
		})
	}
}

// BenchmarkShim is the top-level benchmark runner.
func BenchmarkShim(b *testing.B) {
	for name, cfg := range testConfigs {
		if reason := checkRunnable(cfg); reason != "" {
			b.Run(name, func(b *testing.B) {
				b.Skipf("skipping: %s", reason)
			})
			continue
		}
		b.Run(name, func(b *testing.B) {
			activateConfig(cfg)
			b.Run("Lifecycle", benchmarkShimLifecycle)
			b.Run("Startup", benchmarkShimStartup)
			b.Run("StartupPhases", benchmarkShimStartupPhases)
			b.Run("Start", benchmarkShimStart)
			b.Run("Exec", benchmarkShimExec)
			b.Run("StdioRoundTrip", benchmarkShimStdioRoundTrip)
			b.Run("UDSRoundTrip", benchmarkShimUDSRoundTrip)
		})
	}
}
