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
	"fmt"
	"os"
	"path/filepath"
	"strconv"
	"strings"
	"testing"
)

// readRSS returns the Resident Set Size of the given pid in bytes.
// Reads /proc/<pid>/status (the VmRSS line, kB).
func readRSS(pid int) (int64, error) {
	data, err := os.ReadFile(fmt.Sprintf("/proc/%d/status", pid))
	if err != nil {
		return 0, err
	}
	for _, line := range strings.Split(string(data), "\n") {
		if !strings.HasPrefix(line, "VmRSS:") {
			continue
		}
		fields := strings.Fields(line)
		if len(fields) < 2 {
			break
		}
		kb, err := strconv.ParseInt(fields[1], 10, 64)
		if err != nil {
			return 0, err
		}
		return kb * 1024, nil
	}
	return 0, fmt.Errorf("VmRSS not found in /proc/%d/status", pid)
}

// shimPIDs returns the set of currently-live shim processes whose
// /proc/<pid>/exe symlink resolves to the same path as binary.
// Returns nil on errors so leak detection silently degrades to a
// no-op rather than failing the test on environmental issues.
func shimPIDs(t *testing.T, binary string) map[int]struct{} {
	t.Helper()
	target, err := filepath.EvalSymlinks(binary)
	if err != nil {
		t.Logf("cannot resolve shim binary path %q: %v (leak detection disabled)", binary, err)
		return nil
	}
	entries, err := os.ReadDir("/proc")
	if err != nil {
		return nil
	}
	pids := make(map[int]struct{})
	for _, e := range entries {
		pid, err := strconv.Atoi(e.Name())
		if err != nil {
			continue
		}
		exe, err := os.Readlink(fmt.Sprintf("/proc/%d/exe", pid))
		if err != nil {
			continue
		}
		if exe == target {
			pids[pid] = struct{}{}
		}
	}
	return pids
}
