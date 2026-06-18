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

package shimtest_test

import (
	"sort"
	"testing"

	"github.com/containerd/shimtest"
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
			c := cfg.Config

			shimtest.NewRunSuite(c).Run(t)
			if !featureSkipped("exec") {
				shimtest.NewExecSuite(c).Run(t)
			}
			if !featureSkipped("transfer") {
				shimtest.NewTransferSuite(c).Run(t)
			}
			if !featureSkipped("uds") {
				shimtest.NewUDSSuite(c).Run(t)
			}
			if !featureSkipped("oom") {
				shimtest.NewOOMSuite(c).Run(t)
			}
			if !featureSkipped("layers") {
				shimtest.NewLayersSuite(c).Run(t)
			}
			t.Run("Stress", shimtest.NewStressSuite(c, shimtest.StressOptions{
				Transfer: !featureSkipped("transfer"),
			}).Run)
		})
	}
}

// BenchmarkShim is the top-level benchmark runner. For each
// configured profile it activates the config, then dispatches to
// each suite that has benchmarks (RunSuite, ExecSuite, UDSSuite,
// LayersSuite), gated on the same Skip list as TestShim.
func BenchmarkShim(b *testing.B) {
	for _, name := range sortedConfigNames() {
		cfg := testConfigs[name]
		if reason := checkRunnable(cfg); reason != "" {
			b.Run(name, func(b *testing.B) { b.Skipf("skipping: %s", reason) })
			continue
		}
		b.Run(name, func(b *testing.B) {
			activateConfig(cfg)
			c := cfg.Config

			shimtest.NewRunSuite(c).Bench(b)
			if !featureSkipped("exec") {
				shimtest.NewExecSuite(c).Bench(b)
			}
			if !featureSkipped("uds") {
				shimtest.NewUDSSuite(c).Bench(b)
			}
			if !featureSkipped("layers") {
				shimtest.NewLayersSuite(c).Bench(b)
			}
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
