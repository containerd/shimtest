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
	"archive/tar"
	"bytes"
	"context"
	"errors"
	"fmt"
	"io"
	"sort"
	"strings"
	"sync/atomic"
	"testing"
	"time"

	transferapi "github.com/containerd/containerd/api/services/transfer/v1"

	"github.com/dmcgowan/shimtest/internal/transfer"
)

// stressIterationTimeout caps how long any single Transfer is allowed
// to take. A healthy iteration finishes in single-digit milliseconds;
// anything more than this is a hang and the test should fail with a
// concrete deadline-exceeded error rather than blocking until the
// outer test timeout.
const stressIterationTimeout = 5 * time.Second

// stressSoakBuffer is how much headroom the stress test leaves before
// the test framework's deadline. The loop stops new iterations this
// far before -test.timeout fires so in-flight iterations have time
// to finish and results can be logged cleanly. Set generously so a
// normal stress run with the default 10-minute test timeout never
// bumps into it accidentally.
const stressSoakBuffer = 1 * time.Minute

// stressReadPoolSize is the number of files the read subtest
// pre-populates as a setup phase. The reader cycles through these
// files modulo the pool size, so the same file may be read many
// times during the stress run.
const stressReadPoolSize = 1000

// stressReadDir holds the pre-populated files used by the read
// subtest; stressWriteDir is where the write subtest creates new
// ones. Separate directories so concurrent write/read traffic
// can't collide on the same names.
const (
	stressReadDir  = "/tmp/stress-read"
	stressWriteDir = "/tmp/stress-write"
)

// fuzzMissingBase is the in-container directory that the missing-file
// fuzz tests synthesize paths under. The test never creates this
// directory, so any path under it (with a sanitized suffix) is
// guaranteed not to exist.
const fuzzMissingBase = "/.fuzz-missing"

// stressSubtest is one concurrent workload run inside testStress.
// All subtests share a single shim env and run as goroutines; the
// first one to fail cancels the rest via the shared run context.
type stressSubtest struct {
	name string
	fn   func(ctx context.Context) error
}

// testStress is the single stress entry point. It composes a list of
// subtests from whichever features are enabled in the active config,
// then runs them as concurrent goroutines against a shared shim env.
// The first subtest failure cancels the others; all subtests are
// awaited so each one's iteration count is logged before the test
// exits.
//
// Cancellation does not interrupt an in-flight iteration — the
// detached run context inside runStress ensures iterations finish
// (or hit their own per-iteration deadline) cleanly, after which the
// worker observes the parent cancellation and returns.
//
// Skipped under -short and when no feature in the active config
// contributes any stress subtests.
func testStress(t *testing.T) {
	if testing.Short() {
		t.Skip("skipping stress test in short mode")
	}

	var (
		env      *shimEnv
		subtests []stressSubtest
	)

	if !featureSkipped("transfer") {
		env = newShimEnv(t, t.Context())
		subtests = append(subtests, transferStressSubtests(t, env)...)
	}

	if len(subtests) == 0 {
		t.Skip("skipping: no stress subtests applicable for this configuration")
	}

	ctx, cancel := stressCtx(t, env.ctx)
	defer cancel()

	runCtx, runCancel := context.WithCancel(ctx)
	defer runCancel()

	type result struct {
		name    string
		iters   int64
		elapsed time.Duration
		err     error
	}
	results := make(chan result, len(subtests))

	for _, st := range subtests {
		go func() {
			iters, elapsed, err := runStress(runCtx, st.fn)
			if err != nil {
				runCancel()
			}
			results <- result{st.name, iters, elapsed, err}
		}()
	}

	var firstErr error
	var firstErrName string
	for i := 0; i < len(subtests); i++ {
		r := <-results
		if r.err != nil && firstErr == nil {
			firstErr = r.err
			firstErrName = r.name
		}
		rate := float64(r.iters) / r.elapsed.Seconds()
		t.Logf("%s: %d iterations in %s (%.0f iter/s)",
			r.name, r.iters, r.elapsed.Round(time.Millisecond), rate)
	}

	if firstErr != nil {
		t.Fatalf("%s: %v", firstErrName, firstErr)
	}

	shutdownShim(t, env.ctx, env)
}

// transferStressSubtests returns the stat/write/read stress subtests
// that exercise the transfer service's bidirectional streaming. The
// read pool is pre-populated synchronously so that by the time the
// caller spawns goroutines, the read subtest can find its files.
func transferStressSubtests(t *testing.T, env *shimEnv) []stressSubtest {
	t.Helper()

	for i := 0; i < stressReadPoolSize; i++ {
		name := fmt.Sprintf("file-%05d.txt", i)
		content := stressFileContent(i)
		if err := stressTransferWriteFile(env.ctx, env, stressReadDir, name, content); err != nil {
			t.Fatalf("read pool setup %d: %v", i, err)
		}
	}

	var writeIdx, readIdx atomic.Int64

	return []stressSubtest{
		{
			name: "stat",
			fn: func(ctx context.Context) error {
				return stressTransferStat(ctx, env, statDirContainerPath)
			},
		},
		{
			name: "write",
			fn: func(ctx context.Context) error {
				i := writeIdx.Add(1)
				name := fmt.Sprintf("file-%08d.txt", i)
				return stressTransferWriteFile(ctx, env, stressWriteDir, name, stressFileContent(int(i)))
			},
		},
		{
			name: "read",
			fn: func(ctx context.Context) error {
				i := int(readIdx.Add(1)-1) % stressReadPoolSize
				name := fmt.Sprintf("file-%05d.txt", i)
				want := stressFileContent(i)
				path := stressReadDir + "/" + name
				got, err := stressTransferReadFile(ctx, env, path, name)
				if err != nil {
					return err
				}
				if got != want {
					return fmt.Errorf("content mismatch for %s: got %q, want %q", name, got, want)
				}
				return nil
			},
		},
	}
}

// FuzzTransferMissing fuzzes the transfer service with paths that
// never exist. Each iteration generates a suffix that gets appended
// to a never-created base directory, so the server should always
// return a not-found error. A timeout — meaning the server stopped
// responding entirely — is treated as a fuzz failure.
//
// Run as a regular test (`go test`) the seed corpus is exercised
// (a few iterations, sub-second). Run with
// `go test -fuzz=FuzzTransferMissing` it generates random inputs
// continuously until -fuzztime elapses or a failing input is found.
func FuzzTransferMissing(f *testing.F) {
	cfg, name := pickFuzzConfig(f)
	f.Logf("fuzzing against config %s", name)
	activateConfig(cfg)

	skipFeature(f, "transfer")

	env := newShimEnv(f, f.Context())

	// Seed corpus: a handful of strings exercising different shapes
	// (simple name, nested, long, special chars).
	f.Add("missing.txt")
	f.Add("a/b/c/d.txt")
	f.Add("does-not-exist")
	f.Add(strings.Repeat("a", 200))
	f.Add(".hidden")

	f.Fuzz(func(t *testing.T, suffix string) {
		if !validFuzzSuffix(suffix) {
			t.Skip("rejected fuzz suffix")
		}
		path := fuzzMissingBase + "/" + suffix

		err := stressTransferStat(env.ctx, env, path)
		if err == nil {
			t.Errorf("expected error for missing path %q, got nil", path)
			return
		}
		if errors.Is(err, context.DeadlineExceeded) || errors.Is(err, context.Canceled) {
			t.Errorf("path %q: server did not respond before iteration deadline: %v", path, err)
		}
	})
}

// pickFuzzConfig chooses a single config for FuzzTransferMissing.
// Fuzz tests are top-level functions and don't naturally iterate the
// configured shim profiles the way TestShim does, so we pick the
// alphabetically-first config deterministically. Run the fuzz once
// per profile by passing -shimtest.config or filtering via
// -shimtest.configdir if multiple profiles exist.
func pickFuzzConfig(f *testing.F) (Config, string) {
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

// validFuzzSuffix gates fuzz inputs to suffixes that, when joined to
// fuzzMissingBase, stay inside that directory and don't contain
// bytes the shim's path layer can't represent. Rejected inputs are
// skipped (not failed).
func validFuzzSuffix(s string) bool {
	if s == "" || len(s) > 4000 {
		return false
	}
	if strings.HasPrefix(s, "/") {
		return false
	}
	if strings.Contains(s, "\x00") {
		return false
	}
	if strings.Contains(s, "..") {
		return false
	}
	return true
}

// stressFileContent is the canonical content for the i-th stress file.
// Read and write paths both call this so the read-side comparison
// stays in sync with what the write-side produced.
func stressFileContent(i int) string {
	return fmt.Sprintf("stress-content-%05d\n", i)
}

// runStress runs fn in a sequential loop until fn returns an error or
// the parent context is canceled. Returns the iteration count, the
// actual elapsed time, and the first error (or nil if it stopped
// because the context was canceled).
//
// fn receives a context detached from the parent so cancellation of
// the parent (test deadline approaching, sibling subtest failure)
// does not propagate into an in-flight iteration. The iteration
// runs to completion (success or its own per-iteration timeout); the
// loop then sees the parent context's Done and exits.
func runStress(ctx context.Context, fn func(ctx context.Context) error) (int64, time.Duration, error) {
	start := time.Now()

	runCtx, cancel := context.WithCancel(context.Background())
	defer cancel()

	var iters int64
	for ctx.Err() == nil {
		if err := fn(runCtx); err != nil {
			return iters, time.Since(start), err
		}
		iters++
	}
	return iters, time.Since(start), nil
}

// stressCtx derives a cancel context from parent, additionally bounded
// by t.Deadline() if one is set. The deadline is shortened by
// stressSoakBuffer so in-flight iterations have time to finish and
// results can be logged before -test.timeout fires.
//
// If less than stressSoakBuffer is available before the test
// deadline, the test is skipped — there isn't enough room for a
// meaningful stress run plus a clean shutdown.
func stressCtx(t *testing.T, parent context.Context) (context.Context, context.CancelFunc) {
	t.Helper()
	d, ok := t.Deadline()
	if !ok {
		return context.WithCancel(parent)
	}
	if remaining := time.Until(d); remaining < stressSoakBuffer {
		t.Skipf("skipping: stress needs at least %s before -test.timeout, only %s left",
			stressSoakBuffer, remaining.Round(time.Millisecond))
	}
	return context.WithDeadline(parent, d.Add(-stressSoakBuffer))
}

// stressTransferStat performs a single Transfer with NoWalk=true on
// the given path. The server-side payload is discarded.
//
// A per-iteration deadline ensures a stuck Transfer or stream
// creation surfaces as a concrete deadline-exceeded error instead
// of hanging until the outer test timeout.
func stressTransferStat(ctx context.Context, env *shimEnv, path string) error {
	subCtx, cancel := context.WithTimeout(ctx, stressIterationTimeout)
	defer cancel()

	src := &transfer.ContainerPath{
		ContainerID: env.containerID,
		Path:        path,
		NoWalk:      true,
	}
	dst := transfer.NewWriteStream(&nopWriteCloser{io.Discard}, "application/x-tar")

	return stressDoTransfer(subCtx, env, src, dst)
}

// stressTransferWriteFile writes a single small file as a one-entry
// tar to the given directory in the container.
func stressTransferWriteFile(ctx context.Context, env *shimEnv, dir, name, content string) error {
	subCtx, cancel := context.WithTimeout(ctx, stressIterationTimeout)
	defer cancel()

	var tarBuf bytes.Buffer
	tw := tar.NewWriter(&tarBuf)
	if err := tw.WriteHeader(&tar.Header{
		Name: name,
		Mode: 0644,
		Size: int64(len(content)),
	}); err != nil {
		return fmt.Errorf("write tar header: %w", err)
	}
	if _, err := tw.Write([]byte(content)); err != nil {
		return fmt.Errorf("write tar body: %w", err)
	}
	if err := tw.Close(); err != nil {
		return fmt.Errorf("close tar: %w", err)
	}

	src := transfer.NewReadStream(&tarBuf, "application/x-tar")
	dst := &transfer.ContainerPath{
		ContainerID: env.containerID,
		Path:        dir,
	}

	return stressDoTransfer(subCtx, env, src, dst)
}

// stressTransferReadFile reads a single file back from the container
// and returns its content. Mirrors copyFromContainer's pattern: the
// data is in the buffer by the time the Transfer RPC reply arrives,
// so it's safe to parse after Transfer returns.
func stressTransferReadFile(ctx context.Context, env *shimEnv, path, name string) (string, error) {
	subCtx, cancel := context.WithTimeout(ctx, stressIterationTimeout)
	defer cancel()

	src := &transfer.ContainerPath{
		ContainerID: env.containerID,
		Path:        path,
	}

	var received bytes.Buffer
	dst := transfer.NewWriteStream(&nopWriteCloser{&received}, "application/x-tar")

	if err := stressDoTransfer(subCtx, env, src, dst); err != nil {
		return "", err
	}

	tr := tar.NewReader(&received)
	for {
		hdr, err := tr.Next()
		if err == io.EOF {
			break
		}
		if err != nil {
			return "", fmt.Errorf("read tar: %w", err)
		}
		if strings.HasSuffix(hdr.Name, name) {
			data, err := io.ReadAll(tr)
			if err != nil {
				return "", fmt.Errorf("read tar entry: %w", err)
			}
			return string(data), nil
		}
	}
	return "", fmt.Errorf("entry %q not found in tar", name)
}

// stressDoTransfer marshals src and dst, then issues the Transfer RPC.
func stressDoTransfer(ctx context.Context, env *shimEnv, src, dst any) error {
	srcAny, err := marshalTransferAny(ctx, src, env.sc)
	if err != nil {
		return fmt.Errorf("marshal source: %w", err)
	}
	dstAny, err := marshalTransferAny(ctx, dst, env.sc)
	if err != nil {
		return fmt.Errorf("marshal destination: %w", err)
	}

	tfClient := transferapi.NewTTRPCTransferClient(env.client)
	_, err = tfClient.Transfer(ctx, &transferapi.TransferRequest{
		Source:      srcAny,
		Destination: dstAny,
	})
	return err
}
