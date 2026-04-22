// Testbin is a minimal multicall binary for use inside shimtest
// containers. It provides a small set of utilities needed by the
// test suite, invoked either directly (testbin <cmd> [args...]) or
// via symlink (e.g. /bin/cat -> /bin/testbin).
//
// Commands: forever, cat, date, echo, nc
package main

import (
	"fmt"
	"io"
	"net"
	"os"
	"os/signal"
	"path/filepath"
	"strings"
	"sync"
	"time"
)

func main() {
	name := filepath.Base(os.Args[0])

	var cmd string
	var args []string
	if name == "testbin" || name == "" {
		if len(os.Args) < 2 {
			fmt.Fprintln(os.Stderr, "usage: testbin <command> [args...]")
			os.Exit(1)
		}
		cmd = os.Args[1]
		args = os.Args[1:]
	} else {
		cmd = name
		args = os.Args
	}

	switch cmd {
	case "forever":
		cmdForever(args)
	case "cat":
		cmdCat(args)
	case "date":
		cmdDate(args)
	case "echo":
		cmdEcho(args)
	case "nc":
		cmdNC(args)
	default:
		fmt.Fprintf(os.Stderr, "testbin: unknown command: %s\n", cmd)
		os.Exit(127)
	}
}

// cmdForever prints its arguments to stdout then blocks forever.
func cmdForever(args []string) {
	if len(args) > 1 {
		fmt.Println(strings.Join(args[1:], " "))
	}
	// Wait for a signal that will never arrive voluntarily.
	// The process will be killed by the test harness.
	sig := make(chan os.Signal, 1)
	signal.Notify(sig)
	<-sig
}

// cmdEcho prints its arguments to stdout and exits.
func cmdEcho(args []string) {
	fmt.Println(strings.Join(args[1:], " "))
}

// cmdCat copies files (or stdin) to stdout.
func cmdCat(args []string) {
	files := args[1:]
	if len(files) == 0 {
		files = []string{"-"}
	}
	for _, name := range files {
		var r io.Reader
		if name == "-" {
			r = os.Stdin
		} else {
			f, err := os.Open(name)
			if err != nil {
				fmt.Fprintf(os.Stderr, "cat: %s: %v\n", name, err)
				os.Exit(1)
			}
			defer f.Close()
			r = f
		}
		if _, err := io.Copy(os.Stdout, r); err != nil {
			os.Exit(1)
		}
	}
}

// cmdDate prints the current time. Supports +%s and +%s%N.
func cmdDate(args []string) {
	format := "+%s"
	if len(args) > 1 {
		format = args[1]
	}
	now := time.Now()
	switch format {
	case "+%s":
		fmt.Println(now.Unix())
	case "+%s%N":
		fmt.Printf("%d%09d\n", now.Unix(), now.Nanosecond())
	default:
		fmt.Fprintf(os.Stderr, "date: unsupported format: %s\n", format)
		os.Exit(1)
	}
}

// cmdNC connects to a unix domain socket and copies bidirectionally
// between the socket and stdio. Usage: nc -U <path>
func cmdNC(args []string) {
	if len(args) < 3 || args[1] != "-U" {
		fmt.Fprintln(os.Stderr, "usage: nc -U <socket-path>")
		os.Exit(1)
	}
	conn, err := net.Dial("unix", args[2])
	if err != nil {
		fmt.Fprintf(os.Stderr, "nc: %s: %v\n", args[2], err)
		os.Exit(1)
	}
	defer conn.Close()

	var wg sync.WaitGroup
	wg.Add(2)
	go func() {
		defer wg.Done()
		io.Copy(os.Stdout, conn)
	}()
	go func() {
		defer wg.Done()
		io.Copy(conn, os.Stdin)
	}()
	wg.Wait()
}
