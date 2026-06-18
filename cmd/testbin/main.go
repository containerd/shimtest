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

// Testbin is a minimal multicall binary for use inside shimtest
// containers. It provides a small set of utilities needed by the
// test suite, invoked either directly (testbin <cmd> [args...]) or
// via symlink (e.g. /bin/cat -> /bin/testbin).
//
// Commands: forever, burstexit, cat, date, echo, exit, hashverify,
// layercheck, ls, memhog, nc, tickexit
package main

import "github.com/containerd/shimtest/testbin"

func main() { testbin.Main() }
