# shimtest

A conformance test suite for containerd shim implementations. Tests the task
lifecycle (create, start, exec, kill, delete), stdio round-trip, clock
synchronization across a VM boundary, the transfer service, and UDS socket
forwarding.

## Prerequisites

- A built shim binary (e.g., `containerd-shim-runc-v2` or
  `containerd-shim-nerdbox-v1`)
- Go toolchain (for compiling the test binary and `cmd/testbin`)

No containerd daemon is required. The test rootfs is built in-process from
an embedded Go binary (`cmd/testbin`) compressed as `_output/testbin.gz` and
written into an erofs image at test time.

## Building

```bash
make build
```

This builds `cmd/testbin` (a small multicall binary embedded in the test
rootfs) and compiles the test binary to `_output/shimtest.test`. The testbin
is always cross-compiled for `linux/amd64` via `CGO_ENABLED=0`; override with
`TESTBIN_GOOS`/`TESTBIN_GOARCH` or drop a pre-built `_output/testbin.gz` in
place before `make build`.

## Configuration

Tests are driven by one or more JSON configuration files. See
`shimtest.config.sample.json` for all options. The key fields are:

| Field | Type | Description |
|---|---|---|
| `shim_binary` | string | Name or path of the shim binary to test (required) |
| `uid` | int | UID to run as; defaults to the current user's UID. If set to a value different from the current UID and the effective UID is 0, the harness re-execs itself as that user via `sudo` |
| `gid` | int | GID to run as |
| `format_mounts` | bool | Provide the rootfs as formatted erofs/ext4 images with a `format/mkdir/overlay` descriptor for the shim to mount. Default (`false`) extracts the rootfs and provides a pre-mounted overlay (or plain directory when rootless) |
| `skip` | []string | Feature names to skip (`exec`, `oom`, `transfer`, `uds`) |
| `env` | map | Additional environment variables for the test run |
| `debug` | bool | Enable debug logging on the shim |

## Running

shimtest runs in one of two modes.

### Single config

```bash
_output/shimtest.test -test.v -shimtest.config=profiles/myconfig.json
```

### Config directory

All `*.json` files in the directory are loaded; each becomes a subtest named
after the file:

```bash
_output/shimtest.test -test.v -shimtest.configdir=profiles/
```

Configs with a `uid` that doesn't match the current process are skipped, or
re-exec'd via `sudo` when the effective UID is 0. The parent serializes the
full config into a temp file and passes it to the child so no fields are
lost across the re-exec.

### Examples

```bash
# Run a single test case in a single config
_output/shimtest.test -test.v -test.run='TestShim/myconfig/Lifecycle' \
  -shimtest.config=profiles/myconfig.json

# Run all configs in profiles/
sudo _output/shimtest.test -test.v -shimtest.configdir=profiles/

# Run StartupPhases benchmark across all configs (benchtime=3x is quick)
_output/shimtest.test -test.run='^$' \
  -test.bench='BenchmarkShim/[^/]+/StartupPhases' -test.benchtime=3x \
  -shimtest.configdir=profiles/
```

## Tests

All tests are subtests of the single entry point `TestShim`. Within each
config, the tree is `TestShim/<config-name>/<test-name>`.

| Test | Feature | Description |
|---|---|---|
| `Lifecycle` | — | Full create/start/kill/wait/delete cycle |
| `Exec` | exec | Exec a process inside a running container |
| `StdioRoundTrip` | exec | Write to stdin, read from stdout via exec |
| `Clock` | exec | Verify VM clock is synchronized with host |
| `ExitCodes` | exec | Exec processes that exit with a range of status codes and verify propagation |
| `InitExitCodes` | — | Run the container's init process with `/bin/exit N` and verify task-level exit status propagation |
| `OutputThenExit` | — | Run a process that prints 50 lines over 50ms then exits non-zero; verify both exit status and every line of output |
| `OOM` | oom | Run a memory hog under a 128MiB limit and verify the kernel OOM-kills it (exit 137) |
| `TransferCopyTo` | transfer | Copy a file into a container |
| `TransferCopyToAndFrom` | transfer | Copy a file in and back out |
| `TransferExecVerify` | transfer | Copy a file in, verify via exec |
| `UDSRoundTrip` | uds | UDS socket forwarding round-trip |

### Planned tests

Candidates to add later, ranked roughly by value:

- **Signals** — send SIGTERM (not SIGKILL) to init, verify exit 143. Most shims get KILL right but botch non-KILL forwarding.
- **Pause/Resume** — pause a ticker process, verify output stops; resume, verify it continues.
- **Stats** — call `tc.Stats()` and assert cgroup counters populate (probe since not all shims implement it).
- **Events** — verify Create/Start/Exit (and OOM) events fire with the expected fields. The shim is a publisher, not a server: it dials `ContainerdGrpcAddress` and calls `containerd.services.events.v1.Events.Forward`/`.Publish`, so this requires a receiver-side harness — a small TTRPC server implementing `Events.Forward` bound to that socket before `startShim`.
- **Missing executable** — set `Args` to a nonexistent path and verify a clean error (not a hang or panic).
- **Double-kill / post-exit API** — Kill after exit; Wait/State after Delete. Idempotency.
- **Zombie reaping** — init that forks and exits; verify the shim's pid 1 reaps the orphan.

## Benchmarks

Benchmarks live under `BenchmarkShim/<config-name>/<bench-name>`.

| Benchmark | Feature | Description |
|---|---|---|
| `Lifecycle` | — | Full container create/start/kill/wait/delete cycle |
| `Startup` | — | Shim start through first output |
| `StartupPhases` | — | Same as `Startup` with per-phase breakdown reported via custom metrics (`ms/shim-start`, `ms/connect`, `ms/create`, `ms/task-start`, `ms/output`, `ms/total`) |
| `Start` | — | Shim start subcommand only (bootstrap, no container) |
| `Exec` | exec | Exec cycle inside a running container (exec/start/wait/delete) |
| `StdioRoundTrip` | exec | Stdio write/read at 8B, 4KB, 4MB |
| `UDSRoundTrip` | uds | UDS forwarded-socket throughput in both directions (HostToContainer, ContainerToHost) at 8B, 4KB, 4MB |
