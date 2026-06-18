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
