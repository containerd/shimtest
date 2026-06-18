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

// FuzzTransferMissing is the local JSON-driven entry point that
// delegates to TransferSuite.Fuzz. Library callers wire up their own
// FuzzXxx in their _test.go file:
//
//	func FuzzMyShim(f *testing.F) {
//	    shimtest.NewTransferSuite(opts).Fuzz(f)
//	}
//
// Picks the alphabetically-first configuration; for multi-config
// runs, invoke the binary once per profile.
func FuzzTransferMissing(f *testing.F) {
	cfg, name := pickFuzzConfig(f)
	f.Logf("fuzzing against config %s", name)

	activateConfig(cfg)
	if featureSkipped("transfer") {
		f.Skip("feature \"transfer\" disabled in config")
	}

	shimtest.NewTransferSuite(cfg.Config).Fuzz(f)
}

// pickFuzzConfig returns the alphabetically-first configuration.
// Fuzz tests are top-level functions that don't naturally iterate
// the configured shim profiles the way TestShim does.
func pickFuzzConfig(f *testing.F) (runConfig, string) {
	f.Helper()
	if len(testConfigs) == 0 {
		f.Skip("no configuration available")
	}
	names := make([]string, 0, len(testConfigs))
	for n := range testConfigs {
		names = append(names, n)
	}
	sort.Strings(names)
	return testConfigs[names[0]], names[0]
}
