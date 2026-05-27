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

//go:build !shimtest_embedded

// To build a fully functional test binary, run:
//
//	make build
//
// which compiles testbin and passes -tags shimtest_embedded to embed it
// directly. Without that tag the package builds successfully (for vendoring
// and go get), but any test that needs the rootfs will attempt to fetch
// testbin from the GitHub release matching the module version resolved in
// the consumer's build. The fetched binary is cached under
// os.UserCacheDir()/shimtest/<version>/ for subsequent runs.
//
// To regenerate _output/testbin without rebuilding the full test binary:
//
//go:generate make testbin
package shimtest

import (
	"bytes"
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"runtime"
	"runtime/debug"
	"strings"
)

// testbinOS is the OS for which testbin is always built. Regardless of the
// host running the tests, the container binary is always a Linux ELF.
const testbinOS = "linux"

const shimtestModulePath = "github.com/dmcgowan/shimtest"

// openTestbin fetches the testbin binary for the current GOARCH from the
// GitHub release that corresponds to the resolved version of this module in
// the consumer's build. testbin is always a Linux binary regardless of the
// host OS. The binary is cached under os.UserCacheDir()/shimtest/<version>/
// and reused on subsequent calls.
//
// If the module version cannot be determined (e.g. a replace directive or a
// local development build), openTestbin returns an error directing the caller
// to build with "make build" or set the SHIMTEST_TESTBIN environment variable
// to the path of a pre-built testbin binary.
func openTestbin() (io.Reader, error) {
	// Allow explicit override via environment variable.
	if path := os.Getenv("SHIMTEST_TESTBIN"); path != "" {
		data, err := os.ReadFile(path)
		if err != nil {
			return nil, fmt.Errorf("SHIMTEST_TESTBIN: %w", err)
		}
		return bytes.NewReader(data), nil
	}

	version, err := shimtestVersion()
	if err != nil {
		return nil, err
	}

	data, err := fetchTestbin(version, runtime.GOARCH)
	if err != nil {
		return nil, err
	}
	return bytes.NewReader(data), nil
}

// shimtestVersion returns the module version of github.com/dmcgowan/shimtest
// as recorded in the consumer binary's build info. Returns an error if the
// binary was not built from a tagged release (e.g. a replace directive or
// local development checkout).
func shimtestVersion() (string, error) {
	bi, ok := debug.ReadBuildInfo()
	if !ok {
		return "", fmt.Errorf(
			"shimtest: cannot read build info; rebuild with 'make build' " +
				"or set SHIMTEST_TESTBIN to a pre-built testbin binary",
		)
	}

	// When shimtest is the main module itself (e.g. running its own tests
	// via `go test` without the shimtest_embedded tag), bi.Main holds it.
	if bi.Main.Path == shimtestModulePath {
		if v := bi.Main.Version; v != "" && v != "(devel)" {
			return v, nil
		}
		return "", unversionedError()
	}

	// When shimtest is a dependency, look it up in the dep list.
	for _, dep := range bi.Deps {
		if dep.Path == shimtestModulePath {
			if dep.Version == "" || dep.Version == "(devel)" {
				return "", unversionedError()
			}
			return dep.Version, nil
		}
	}

	return "", unversionedError()
}

func unversionedError() error {
	return fmt.Errorf(
		"shimtest: module version is not a tagged release " +
			"(local replace directive or development build); " +
			"rebuild with 'make build' (-tags shimtest_embedded) or " +
			"set SHIMTEST_TESTBIN to the path of a pre-built testbin binary",
	)
}

// fetchTestbin returns the testbin Linux binary for the given version/goarch,
// downloading it from the GitHub release if it is not already cached.
func fetchTestbin(version, goarch string) ([]byte, error) {
	cached, err := cachedTestbin(version, goarch)
	if err != nil {
		return nil, err
	}

	// Return cached copy if present.
	if data, err := os.ReadFile(cached); err == nil {
		return data, nil
	}

	// Fetch from GitHub Releases.
	url := testbinURL(version, goarch)
	resp, err := http.Get(url) //nolint:noctx
	if err != nil {
		return nil, fmt.Errorf("shimtest: fetching testbin from %s: %w", url, err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf(
			"shimtest: fetching testbin from %s: unexpected status %s; "+
				"ensure a release exists for version %s or rebuild with 'make build'",
			url, resp.Status, version,
		)
	}

	data, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("shimtest: reading testbin from %s: %w", url, err)
	}

	// Write to cache.
	if err := os.MkdirAll(filepath.Dir(cached), 0755); err == nil {
		_ = os.WriteFile(cached, data, 0755)
	}

	return data, nil
}

// cachedTestbin returns the local cache path for the given testbin variant.
// The directory is created lazily on first fetch.
func cachedTestbin(version, goarch string) (string, error) {
	cacheDir, err := os.UserCacheDir()
	if err != nil {
		return "", fmt.Errorf("shimtest: cannot determine user cache dir: %w", err)
	}
	// Sanitise the version string so it is safe as a path component.
	safe := strings.NewReplacer("/", "-", "\\", "-").Replace(version)
	return filepath.Join(cacheDir, "shimtest", safe, testbinAssetName(goarch)), nil
}

// testbinURL returns the GitHub Releases download URL for the given variant.
func testbinURL(version, goarch string) string {
	return fmt.Sprintf(
		"https://github.com/%s/releases/download/%s/%s",
		strings.TrimPrefix(shimtestModulePath, "github.com/"),
		version,
		testbinAssetName(goarch),
	)
}

// testbinAssetName returns the release asset filename for the given arch.
// testbin is always a Linux binary.
func testbinAssetName(goarch string) string {
	return fmt.Sprintf("testbin-%s-%s", testbinOS, goarch)
}
