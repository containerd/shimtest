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
	"encoding/json"
	"flag"
	"fmt"
	"os"
	"os/exec"
	"os/user"
	"path/filepath"
	"strconv"
	"strings"
	"testing"

	"github.com/containerd/typeurl/v2"
	"github.com/opencontainers/runtime-spec/specs-go"
)

// Config holds the shimtest configuration.
type Config struct {
	// ShimBinary is the shim binary name or path to test.
	ShimBinary string `json:"shim_binary"`

	// Env is additional environment variables to set for the test run.
	Env map[string]string `json:"env,omitempty"`

	// Skip is a list of feature names to skip.
	// Known features: "transfer", "exec", "uds".
	Skip []string `json:"skip,omitempty"`

	// FormatMounts provides the rootfs as formatted images (erofs +
	// ext4) with a format/mkdir/overlay mount descriptor. The shim
	// is responsible for mounting them. When false (default), the
	// rootfs is extracted to a directory and provided as a
	// pre-mounted overlay.
	FormatMounts bool `json:"format_mounts,omitempty"`

	// UID is the user ID to run tests as. Defaults to the current
	// user's UID. When the effective UID is 0 (root) and UID is
	// set to a non-zero value, the test binary re-executes itself
	// as that user via sudo.
	UID *int `json:"uid,omitempty"`

	// GID is the group ID to run tests as. Defaults to the current
	// user's GID.
	GID *int `json:"gid,omitempty"`

	// Debug enables debug logging on the shim.
	Debug bool `json:"debug,omitempty"`
}

const shimtestNamespace = "shimtest"

var (
	testCfg     Config
	configFlag  = flag.String("shimtest.config", "", "path to shimtest JSON configuration file")
	configDir   = flag.String("shimtest.configdir", "", "directory of JSON configuration files (one subtest per file)")
	testConfigs map[string]Config
)

func TestMain(m *testing.M) {
	flag.Parse()

	// Register OCI spec types with typeurl (normally done by containerd client init).
	const prefix = "types.containerd.io"
	major := strconv.Itoa(specs.VersionMajor)
	typeurl.Register(&specs.Process{}, prefix, "opencontainers/runtime-spec", major, "Process")

	testConfigs = discoverConfigs()
	if len(testConfigs) == 0 {
		fmt.Fprintln(os.Stderr, "shimtest: no configuration provided (use -shimtest.config or -shimtest.configdir)")
		os.Exit(1)
	}

	// Check if re-exec is needed for any config.
	euid := os.Geteuid()
	uid := os.Getuid()
	isReexec := os.Getenv("SHIMTEST_REEXEC") != ""

	var exitCode int

	// Find configs that need re-exec (target UID differs from current).
	var reexecConfigs []string
	runnable := false
	for name, cfg := range testConfigs {
		targetUID := uid
		if cfg.UID != nil {
			targetUID = *cfg.UID
		}
		if targetUID == uid {
			runnable = true
		} else if euid == 0 && !isReexec {
			reexecConfigs = append(reexecConfigs, name)
		}
	}

	if runnable {
		exitCode = m.Run()
	}

	// Re-exec for configs that need a different UID.
	for _, name := range reexecConfigs {
		cfg := testConfigs[name]
		targetUID := *cfg.UID
		u, err := user.LookupId(strconv.Itoa(targetUID))
		if err != nil {
			fmt.Fprintf(os.Stderr, "shimtest: cannot find user with uid %d: %v\n", targetUID, err)
			exitCode = 1
			continue
		}
		fmt.Fprintf(os.Stderr, "\n=== RE-EXEC: running %s as %s (uid %d) ===\n\n", name, u.Username, targetUID)
		code := reexecAsUser(u.Username, cfg)
		if code != 0 {
			exitCode = code
		}
	}

	os.Exit(exitCode)
}

// discoverConfigs returns the set of named configs to run.
func discoverConfigs() map[string]Config {
	configs := make(map[string]Config)

	if *configDir != "" {
		entries, err := os.ReadDir(*configDir)
		if err != nil {
			fmt.Fprintf(os.Stderr, "shimtest: failed to read config dir %s: %v\n", *configDir, err)
			os.Exit(1)
		}
		for _, e := range entries {
			if e.IsDir() || !strings.HasSuffix(e.Name(), ".json") {
				continue
			}
			name := strings.TrimSuffix(e.Name(), ".json")
			cfg, err := loadConfigFile(filepath.Join(*configDir, e.Name()))
			if err != nil {
				fmt.Fprintf(os.Stderr, "shimtest: %v\n", err)
				os.Exit(1)
			}
			configs[name] = cfg
		}
	}

	if *configFlag != "" {
		cfg, err := loadConfigFile(*configFlag)
		if err != nil {
			fmt.Fprintf(os.Stderr, "shimtest: %v\n", err)
			os.Exit(1)
		}
		name := strings.TrimSuffix(filepath.Base(*configFlag), ".json")
		configs[name] = cfg
	}

	// Fall back to SHIM_BINARY env var for single inline config.
	if len(configs) == 0 {
		if v := os.Getenv("SHIM_BINARY"); v != "" {
			configs["default"] = Config{ShimBinary: v}
		}
	}

	return configs
}

// loadConfigFile reads and validates a single config file.
func loadConfigFile(path string) (Config, error) {
	data, err := os.ReadFile(path)
	if err != nil {
		return Config{}, fmt.Errorf("failed to read config %s: %w", path, err)
	}
	var cfg Config
	if err := json.Unmarshal(data, &cfg); err != nil {
		return Config{}, fmt.Errorf("failed to parse config %s: %w", path, err)
	}

	// Environment variable overrides config file value.
	if v := os.Getenv("SHIM_BINARY"); v != "" {
		cfg.ShimBinary = v
	}

	if cfg.ShimBinary == "" {
		return Config{}, fmt.Errorf("shim_binary is required in %s", path)
	}

	return cfg, nil
}

// activateConfig sets the global testCfg and applies env vars for
// the given configuration.
func activateConfig(cfg Config) {
	testCfg = cfg
	for k, v := range cfg.Env {
		os.Setenv(k, v)
	}
}

// skipFeature skips the current test if the given feature is listed in
// the config's Skip list.
func skipFeature(t *testing.T, feature string) {
	t.Helper()
	for _, s := range testCfg.Skip {
		if s == feature {
			t.Skipf("feature %q disabled in config", feature)
		}
	}
}

// skipFeatureBench is the benchmark equivalent of skipFeature.
func skipFeatureBench(b *testing.B, feature string) {
	b.Helper()
	for _, s := range testCfg.Skip {
		if s == feature {
			b.Skipf("feature %q disabled in config", feature)
		}
	}
}

// checkRunnable returns an empty string if the config can run in the
// current process, or a reason string if it cannot.
func checkRunnable(cfg Config) string {
	uid := os.Getuid()
	targetUID := uid
	if cfg.UID != nil {
		targetUID = *cfg.UID
	}
	if targetUID != uid {
		return fmt.Sprintf("requires uid %d, running as %d", targetUID, uid)
	}
	return ""
}

// reexecAsUser re-executes the test binary as the given user via sudo,
// passing the full config as a temp file.
func reexecAsUser(username string, cfg Config) int {
	exe, err := os.Executable()
	if err != nil {
		fmt.Fprintf(os.Stderr, "shimtest: cannot determine executable path: %v\n", err)
		return 1
	}

	// Resolve the shim binary to an absolute path so the child
	// can find it regardless of PATH.
	shimAbs, err := exec.LookPath(cfg.ShimBinary)
	if err != nil {
		shimAbs = cfg.ShimBinary
	}
	shimAbs, _ = filepath.Abs(shimAbs)
	cfg.ShimBinary = shimAbs

	// Write the full config to a temp file the child can read.
	cfgData, err := json.Marshal(cfg)
	if err != nil {
		fmt.Fprintf(os.Stderr, "shimtest: marshal config for reexec: %v\n", err)
		return 1
	}
	cfgFile, err := os.CreateTemp("", "shimtest-config-*.json")
	if err != nil {
		fmt.Fprintf(os.Stderr, "shimtest: create temp config: %v\n", err)
		return 1
	}
	cfgFile.Write(cfgData)
	cfgFile.Close()
	// Make readable by the target user.
	os.Chmod(cfgFile.Name(), 0644)
	defer os.Remove(cfgFile.Name())

	childEnv := []string{
		"SHIMTEST_REEXEC=1",
		"PATH=" + filepath.Dir(shimAbs) + ":" + os.Getenv("PATH"),
	}
	for k, v := range cfg.Env {
		childEnv = append(childEnv, k+"="+v)
	}

	sudoArgs := []string{"-Hu", username, "--", "env"}
	sudoArgs = append(sudoArgs, childEnv...)
	sudoArgs = append(sudoArgs, exe)
	sudoArgs = append(sudoArgs, "-shimtest.config="+cfgFile.Name())

	// Forward test flags, skipping config flags from the parent.
	args := os.Args[1:]
	for i := 0; i < len(args); i++ {
		arg := args[i]
		if strings.HasPrefix(arg, "-shimtest.config=") || strings.HasPrefix(arg, "--shimtest.config=") {
			continue
		}
		if strings.HasPrefix(arg, "-shimtest.configdir=") || strings.HasPrefix(arg, "--shimtest.configdir=") {
			continue
		}
		if arg == "-shimtest.config" || arg == "--shimtest.config" ||
			arg == "-shimtest.configdir" || arg == "--shimtest.configdir" {
			i++
			continue
		}
		sudoArgs = append(sudoArgs, arg)
	}

	cmd := exec.Command("sudo", sudoArgs...)
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	if err := cmd.Run(); err != nil {
		if exitErr, ok := err.(*exec.ExitError); ok {
			return exitErr.ExitCode()
		}
		fmt.Fprintf(os.Stderr, "shimtest: reexec as %s failed: %v\n", username, err)
		return 1
	}
	return 0
}
