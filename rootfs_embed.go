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

//go:build shimtest_embedded

package shimtest

import (
	"bytes"
	_ "embed"
	"io"
)

//go:embed _output/testbin
var testbinBin []byte

// openTestbin returns a reader for the testbin binary.
func openTestbin() (io.Reader, error) {
	return bytes.NewReader(testbinBin), nil
}
