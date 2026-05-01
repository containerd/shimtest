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
	"sort"
	"testing"
)

// TestShim is the local JSON-driven runner. For each configured
// profile it activates the config, then dispatches to each suite
// whose feature isn't in the profile's Skip list.
//
// Library callers don't go through TestShim — they import this
// package and call NewXxxSuite(opts).Run(t) directly from their own
// test functions.
func TestShim(t *testing.T) {
	for _, name := range sortedConfigNames() {
		cfg := testConfigs[name]
		if reason := checkRunnable(cfg); reason != "" {
			t.Run(name, func(t *testing.T) { t.Skipf("skipping: %s", reason) })
			continue
		}
		t.Run(name, func(t *testing.T) {
			activateConfig(cfg)
			opts := SuiteOptions{Config: cfg.Config}

			NewRunSuite(opts).Run(t)
			if !featureSkipped("exec") {
				NewExecSuite(opts).Run(t)
			}
			if !featureSkipped("transfer") {
				NewTransferSuite(opts).Run(t)
			}
			if !featureSkipped("uds") {
				NewUDSSuite(opts).Run(t)
			}
			if !featureSkipped("oom") {
				NewOOMSuite(opts).Run(t)
			}
		})
	}
}

// BenchmarkShim is the top-level benchmark runner. Benchmarks are
// not yet migrated to suites — they continue to use the package-
// internal helpers and run directly.
func BenchmarkShim(b *testing.B) {
	for _, name := range sortedConfigNames() {
		cfg := testConfigs[name]
		if reason := checkRunnable(cfg); reason != "" {
			b.Run(name, func(b *testing.B) { b.Skipf("skipping: %s", reason) })
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
			b.Run("ReadLargeFile", benchmarkShimReadLargeFile)
			b.Run("ReadBindMount", benchmarkShimReadBindMount)
			b.Run("UDSRoundTrip", benchmarkShimUDSRoundTrip)
		})
	}
}

// sortedConfigNames returns the keys of testConfigs in deterministic
// order so subtest names are stable across runs.
func sortedConfigNames() []string {
	names := make([]string, 0, len(testConfigs))
	for n := range testConfigs {
		names = append(names, n)
	}
	sort.Strings(names)
	return names
}
