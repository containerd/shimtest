// Testbin is a minimal multicall binary for use inside shimtest
// containers. It provides a small set of utilities needed by the
// test suite, invoked either directly (testbin <cmd> [args...]) or
// via symlink (e.g. /bin/cat -> /bin/testbin).
//
// Commands: forever, cat, date, echo, exit, hashverify, memhog, nc, tickexit
package main

import (
	"fmt"
	"hash/crc32"
	"io"
	"net"
	"os"
	"os/signal"
	"path/filepath"
	"strconv"
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
	case "exit":
		cmdExit(args)
	case "hashverify":
		cmdHashverify(args)
	case "memhog":
		cmdMemhog(args)
	case "nc":
		cmdNC(args)
	case "tickexit":
		cmdTickexit(args)
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

// cmdHashverify reads a file in 1 MiB chunks and verifies the data
// against an expected crc32-Castagnoli (hex). Reads happen on the main
// goroutine using a sync.Pool of buffers; chunks are handed to a
// hashing consumer via a small buffered channel. A non-blocking send
// is tried first and the count of blocking falls is reported, so the
// caller can see when the hash consumer (rather than IO) is the
// bottleneck. On success it prints
//
//	ok bytes=N ns=M cpu_bound=K
//
// to stdout. Hash mismatch or read errors exit non-zero.
//
// Usage: hashverify <file> <expected-hex>
func cmdHashverify(args []string) {
	if len(args) < 3 {
		fmt.Fprintln(os.Stderr, "usage: hashverify <file> <expected-hex>")
		os.Exit(1)
	}
	path := args[1]
	wantHex := args[2]

	f, err := os.Open(path)
	if err != nil {
		fmt.Fprintf(os.Stderr, "hashverify: open %s: %v\n", path, err)
		os.Exit(1)
	}
	defer f.Close()

	const bufSize = 1 << 20 // 1 MiB
	pool := &sync.Pool{New: func() any {
		b := make([]byte, bufSize)
		return &b
	}}
	ch := make(chan *[]byte, 8)

	h := crc32.New(crc32.MakeTable(crc32.Castagnoli))
	var consumerWG sync.WaitGroup
	consumerWG.Add(1)
	go func() {
		defer consumerWG.Done()
		for buf := range ch {
			h.Write(*buf)
			full := (*buf)[:cap(*buf)]
			pool.Put(&full)
		}
	}()

	var (
		total    int64
		cpuBound int
	)
	start := time.Now()
	for {
		bp := pool.Get().(*[]byte)
		full := (*bp)[:cap(*bp)]
		n, rerr := f.Read(full)
		if n > 0 {
			chunk := full[:n]
			cp := &chunk
			select {
			case ch <- cp:
			default:
				cpuBound++
				ch <- cp
			}
			total += int64(n)
		} else {
			pool.Put(bp)
		}
		if rerr == io.EOF {
			break
		}
		if rerr != nil {
			close(ch)
			fmt.Fprintf(os.Stderr, "hashverify: read %s: %v\n", path, rerr)
			os.Exit(1)
		}
	}
	elapsed := time.Since(start)
	close(ch)
	consumerWG.Wait()

	gotHex := fmt.Sprintf("%08x", h.Sum32())
	if gotHex != wantHex {
		fmt.Fprintf(os.Stderr, "hashverify: hash mismatch for %s: got %s, want %s\n", path, gotHex, wantHex)
		os.Exit(1)
	}

	fmt.Printf("ok bytes=%d ns=%d cpu_bound=%d\n", total, elapsed.Nanoseconds(), cpuBound)
}

// cmdExit parses its first argument as an integer status and exits
// with it. Exits 0 if no argument is supplied.
func cmdExit(args []string) {
	if len(args) < 2 {
		os.Exit(0)
	}
	code, err := strconv.Atoi(args[1])
	if err != nil {
		fmt.Fprintf(os.Stderr, "exit: invalid status %q: %v\n", args[1], err)
		os.Exit(2)
	}
	os.Exit(code)
}

// cmdMemhog allocates memory 1MiB at a time, touching every page to
// force commit, until the kernel OOM-kills the process. Used to drive
// a memory-limited container to its limit.
func cmdMemhog(_ []string) {
	pageSize := os.Getpagesize()
	const chunkSize = 1 << 20 // 1 MiB
	var keep [][]byte
	for {
		b := make([]byte, chunkSize)
		for i := 0; i < chunkSize; i += pageSize {
			b[i] = 0xff
		}
		keep = append(keep, b)
	}
}

// cmdTickexit writes "tick N\n" for N=1..50 with a 1ms delay between
// writes, then exits with status 7. Used to verify that output
// produced up to the moment of exit is captured by the shim.
func cmdTickexit(_ []string) {
	for i := 1; i <= 50; i++ {
		fmt.Printf("tick %d\n", i)
		time.Sleep(1 * time.Millisecond)
	}
	os.Exit(7)
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
