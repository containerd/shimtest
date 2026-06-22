window.BENCHMARK_DATA = {
  "lastUpdate": 1782148934180,
  "repoUrl": "https://github.com/containerd/shimtest",
  "entries": {
    "runc rootless / containerd v2.3.0-beta.2": [
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "4b1b14b5b9861b9a70092519ab5bd80d508f4304",
          "message": "Add benchmark tests to CI\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-04-23T23:13:35-07:00",
          "tree_id": "3bd41e4f0cdca832a4ec76753b44e77b5aba1e05",
          "url": "https://github.com/dmcgowan/shimtest/commit/4b1b14b5b9861b9a70092519ab5bd80d508f4304"
        },
        "date": 1777011990921,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle",
            "value": 46140664,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Startup",
            "value": 36438196,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Exec",
            "value": 20308121,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile",
            "value": 31821864,
            "unit": "ns/op\t2108.89 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile - ns/op",
            "value": 31821864,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile - MB/s",
            "value": 2108.89,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount",
            "value": 30806871,
            "unit": "ns/op\t2178.37 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - ns/op",
            "value": 30806871,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - MB/s",
            "value": 2178.37,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "8841bcbdf84559d7e5332a72cbbf956a281907b7",
          "message": "Avoid using systemdcgroup to get similar setup as rootless\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-04-24T00:06:45-07:00",
          "tree_id": "c21005793be2f9e0188ad2b251dc67b78f366ef9",
          "url": "https://github.com/dmcgowan/shimtest/commit/8841bcbdf84559d7e5332a72cbbf956a281907b7"
        },
        "date": 1777014651701,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle",
            "value": 54161132,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Startup",
            "value": 43250449,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Exec",
            "value": 23254428,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile",
            "value": 30136908,
            "unit": "ns/op\t2226.80 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile - ns/op",
            "value": 30136908,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile - MB/s",
            "value": 2226.8,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount",
            "value": 30246056,
            "unit": "ns/op\t2218.76 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - ns/op",
            "value": 30246056,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - MB/s",
            "value": 2218.76,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "0476a1bfbe8c32f6ef3e8a044b19a5f508aee5ec",
          "message": "Fix socket paths being too long on macOS\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-04-24T17:15:07-07:00",
          "tree_id": "6feffccb8d382aad5adaba1789b40e2faf6d83f4",
          "url": "https://github.com/dmcgowan/shimtest/commit/0476a1bfbe8c32f6ef3e8a044b19a5f508aee5ec"
        },
        "date": 1777076356991,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle",
            "value": 47701145,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Startup",
            "value": 42001834,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Exec",
            "value": 21827687,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile",
            "value": 28260329,
            "unit": "ns/op\t2374.67 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile - ns/op",
            "value": 28260329,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile - MB/s",
            "value": 2374.67,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount",
            "value": 28075248,
            "unit": "ns/op\t2390.32 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - ns/op",
            "value": 28075248,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - MB/s",
            "value": 2390.32,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "d588a40cce0c11b5d3b3420772f7171a25d0dd40",
          "message": "Add instructions for how to setup Github actions with shimtest\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-04-25T00:58:15-07:00",
          "tree_id": "fd8e8c540cc88c1f031fe20ba6ac65020be3ea8a",
          "url": "https://github.com/dmcgowan/shimtest/commit/d588a40cce0c11b5d3b3420772f7171a25d0dd40"
        },
        "date": 1777104092142,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle",
            "value": 46774087,
            "unit": "ns/op\t        24.52 ms/create\t         4.853 ms/delete\t         5.550 ms/kill\t         5.759 ms/shim-start\t         5.227 ms/start\t         0.8652 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ns/op",
            "value": 46774087,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/create",
            "value": 24.52,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/delete",
            "value": 4.853,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/kill",
            "value": 5.55,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/shim-start",
            "value": 5.759,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/start",
            "value": 5.227,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/wait",
            "value": 0.8652,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Startup",
            "value": 40724048,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Exec",
            "value": 21845802,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile",
            "value": 28136577,
            "unit": "ns/op\t2385.11 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile - ns/op",
            "value": 28136577,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile - MB/s",
            "value": 2385.11,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount",
            "value": 29098458,
            "unit": "ns/op\t2306.27 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - ns/op",
            "value": 29098458,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - MB/s",
            "value": 2306.27,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "ada1246fb1020406703f346d16c3f20a0c3df635",
          "message": "Add stress tests\n\nThese tests currently fail with nerdbox but will help find a solution\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-04-30T11:05:02-07:00",
          "tree_id": "99710c7414bf76dac00c98b5d9f9acd6b7d90aea",
          "url": "https://github.com/dmcgowan/shimtest/commit/ada1246fb1020406703f346d16c3f20a0c3df635"
        },
        "date": 1777573057191,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle",
            "value": 48708939,
            "unit": "ns/op\t        26.13 ms/create\t         5.207 ms/delete\t         5.841 ms/kill\t         5.182 ms/shim-start\t         5.360 ms/start\t         0.9896 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ns/op",
            "value": 48708939,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/create",
            "value": 26.13,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/delete",
            "value": 5.207,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/kill",
            "value": 5.841,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/shim-start",
            "value": 5.182,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/start",
            "value": 5.36,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/wait",
            "value": 0.9896,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Startup",
            "value": 43978844,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Exec",
            "value": 22871005,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile",
            "value": 28387413,
            "unit": "ns/op\t2364.04 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile - ns/op",
            "value": 28387413,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile - MB/s",
            "value": 2364.04,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount",
            "value": 28643431,
            "unit": "ns/op\t2342.91 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - ns/op",
            "value": 28643431,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - MB/s",
            "value": 2342.91,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "7c48d3a2ba7d0e3d0a7464b20d1783f51397a771",
          "message": "Wait for all topics to finish before sending shutdown\n\nA failure could occur on shutdown from a runner being slightly too slow.\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-05-01T16:02:24-07:00",
          "tree_id": "37faab4d44a7c99ce5a89b6730bd96d7af695543",
          "url": "https://github.com/dmcgowan/shimtest/commit/7c48d3a2ba7d0e3d0a7464b20d1783f51397a771"
        },
        "date": 1777676836532,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle",
            "value": 43621907,
            "unit": "ns/op\t        21.80 ms/create\t         4.308 ms/delete\t         5.375 ms/kill\t         6.091 ms/shim-start\t         5.268 ms/start\t         0.7778 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ns/op",
            "value": 43621907,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/create",
            "value": 21.8,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/delete",
            "value": 4.308,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/kill",
            "value": 5.375,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/shim-start",
            "value": 6.091,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/start",
            "value": 5.268,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/wait",
            "value": 0.7778,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Startup",
            "value": 34671471,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Exec",
            "value": 18582902,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile",
            "value": 28718016,
            "unit": "ns/op\t2336.82 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile - ns/op",
            "value": 28718016,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile - MB/s",
            "value": 2336.82,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount",
            "value": 29643128,
            "unit": "ns/op\t2263.89 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - ns/op",
            "value": 29643128,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - MB/s",
            "value": 2263.89,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "55a7e35d9f44c30b2ef0570e055a8f43c29bfc80",
          "message": "Fix shim leaks during longer running tests\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-05-02T07:41:36-07:00",
          "tree_id": "64851ac8d1af239f941a652ba828b87a922b670a",
          "url": "https://github.com/dmcgowan/shimtest/commit/55a7e35d9f44c30b2ef0570e055a8f43c29bfc80"
        },
        "date": 1777733134662,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle",
            "value": 52020294,
            "unit": "ns/op\t        25.65 ms/create\t         4.808 ms/delete\t         5.687 ms/kill\t         9.766 ms/shim-start\t         5.338 ms/start\t         0.7722 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ns/op",
            "value": 52020294,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/create",
            "value": 25.65,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/delete",
            "value": 4.808,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/kill",
            "value": 5.687,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/shim-start",
            "value": 9.766,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/start",
            "value": 5.338,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/wait",
            "value": 0.7722,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Startup",
            "value": 47373028,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Exec",
            "value": 22661618,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile",
            "value": 28931822,
            "unit": "ns/op\t2319.55 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile - ns/op",
            "value": 28931822,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile - MB/s",
            "value": 2319.55,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount",
            "value": 28676628,
            "unit": "ns/op\t2340.19 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - ns/op",
            "value": 28676628,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - MB/s",
            "value": 2340.19,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "13a86f5d6435571a2d9a493beb01d240886dfae5",
          "message": "Cycle through added files to ensure space does not fill up during stress\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-05-02T16:05:13-07:00",
          "tree_id": "55c35e43ce96694ae65944764a5da94535b44b32",
          "url": "https://github.com/dmcgowan/shimtest/commit/13a86f5d6435571a2d9a493beb01d240886dfae5"
        },
        "date": 1777763360844,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle",
            "value": 60182662,
            "unit": "ns/op\t        31.06 ms/create\t         5.435 ms/delete\t         6.253 ms/kill\t        10.29 ms/shim-start\t         6.089 ms/start\t         1.053 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ns/op",
            "value": 60182662,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/create",
            "value": 31.06,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/delete",
            "value": 5.435,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/kill",
            "value": 6.253,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/shim-start",
            "value": 10.29,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/start",
            "value": 6.089,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/wait",
            "value": 1.053,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Startup",
            "value": 45240829,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Exec",
            "value": 24048009,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile",
            "value": 31310162,
            "unit": "ns/op\t2143.36 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile - ns/op",
            "value": 31310162,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile - MB/s",
            "value": 2143.36,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount",
            "value": 31229492,
            "unit": "ns/op\t2148.89 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - ns/op",
            "value": 31229492,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - MB/s",
            "value": 2148.89,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "3e7494c6c2fde0be0ef3223016c5490a0d1d82b9",
          "message": "Update ttrpc version to fix deadlock\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-05-02T23:46:47-07:00",
          "tree_id": "5d798025c38f86d4ab6af32b88411a3f66bbe1a2",
          "url": "https://github.com/dmcgowan/shimtest/commit/3e7494c6c2fde0be0ef3223016c5490a0d1d82b9"
        },
        "date": 1777791248206,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle",
            "value": 43931462,
            "unit": "ns/op\t        21.85 ms/create\t         4.761 ms/delete\t         5.319 ms/kill\t         5.827 ms/shim-start\t         5.032 ms/start\t         1.136 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ns/op",
            "value": 43931462,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/create",
            "value": 21.85,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/delete",
            "value": 4.761,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/kill",
            "value": 5.319,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/shim-start",
            "value": 5.827,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/start",
            "value": 5.032,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/wait",
            "value": 1.136,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Startup",
            "value": 39910554,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Exec",
            "value": 18628420,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile",
            "value": 29325047,
            "unit": "ns/op\t2288.45 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile - ns/op",
            "value": 29325047,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile - MB/s",
            "value": 2288.45,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount",
            "value": 29268582,
            "unit": "ns/op\t2292.86 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - ns/op",
            "value": 29268582,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - MB/s",
            "value": 2292.86,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "de45369ce617e311a7f19ec419ee73ec13fde898",
          "message": "Add 100 layer test\n\nAdd test for 100 layers and benchmark with 30 layers.\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-05-08T20:49:11-07:00",
          "tree_id": "8c8d06910350cd14d1d7afc8b2035e6d16cb2b80",
          "url": "https://github.com/dmcgowan/shimtest/commit/de45369ce617e311a7f19ec419ee73ec13fde898"
        },
        "date": 1778298801443,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle",
            "value": 49465305,
            "unit": "ns/op\t        25.43 ms/create\t         4.936 ms/delete\t         6.200 ms/kill\t         6.569 ms/shim-start\t         5.456 ms/start\t         0.8744 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ns/op",
            "value": 49465305,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/create",
            "value": 25.43,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/delete",
            "value": 4.936,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/kill",
            "value": 6.2,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/shim-start",
            "value": 6.569,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/start",
            "value": 5.456,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/wait",
            "value": 0.8744,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Startup",
            "value": 41110766,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Exec",
            "value": 22811041,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile",
            "value": 29433952,
            "unit": "ns/op\t2279.98 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile - ns/op",
            "value": 29433952,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile - MB/s",
            "value": 2279.98,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount",
            "value": 28724560,
            "unit": "ns/op\t2336.29 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - ns/op",
            "value": 28724560,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - MB/s",
            "value": 2336.29,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "930837a1140cd588254dc5f4b92f8a00bac37d4f",
          "message": "Updates to stress test to be more reliable\n\nExpand memory growth allowance.\nSuppress known non-fatal issues on shutdown.\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-05-10T23:54:42-07:00",
          "tree_id": "e238de2ec82a3ef1350641ddcc23e6baf21a324a",
          "url": "https://github.com/dmcgowan/shimtest/commit/930837a1140cd588254dc5f4b92f8a00bac37d4f"
        },
        "date": 1778482791769,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle",
            "value": 52565783,
            "unit": "ns/op\t        25.81 ms/create\t         5.167 ms/delete\t         5.982 ms/kill\t         8.948 ms/shim-start\t         5.571 ms/start\t         1.086 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ns/op",
            "value": 52565783,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/create",
            "value": 25.81,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/delete",
            "value": 5.167,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/kill",
            "value": 5.982,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/shim-start",
            "value": 8.948,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/start",
            "value": 5.571,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/wait",
            "value": 1.086,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Startup",
            "value": 42108425,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Exec",
            "value": 23053653,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile",
            "value": 29712834,
            "unit": "ns/op\t2258.58 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile - ns/op",
            "value": 29712834,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile - MB/s",
            "value": 2258.58,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount",
            "value": 29131123,
            "unit": "ns/op\t2303.68 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - ns/op",
            "value": 29131123,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - MB/s",
            "value": 2303.68,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "f6f1d1ac06f34430c9b787c8bad90680a5cf5133",
          "message": "Makefile: use .exe extension for test binary on Windows\n\ngo test -c produces a binary without an extension by default (Linux\nconvention). On Windows executables must end in .exe to be runnable\ndirectly. Detect OS=Windows_NT and set TEST_BINARY accordingly.\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-05-12T18:51:42-04:00",
          "tree_id": "9fbaa25006a5194e363f58756a7cc28a5d18c111",
          "url": "https://github.com/dmcgowan/shimtest/commit/f6f1d1ac06f34430c9b787c8bad90680a5cf5133"
        },
        "date": 1778630846053,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle",
            "value": 49498299,
            "unit": "ns/op\t        25.94 ms/create\t         5.129 ms/delete\t         6.079 ms/kill\t         5.083 ms/shim-start\t         6.346 ms/start\t         0.9218 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ns/op",
            "value": 49498299,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/create",
            "value": 25.94,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/delete",
            "value": 5.129,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/kill",
            "value": 6.079,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/shim-start",
            "value": 5.083,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/start",
            "value": 6.346,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/wait",
            "value": 0.9218,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Startup",
            "value": 39090202,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Exec",
            "value": 21668024,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile",
            "value": 28371746,
            "unit": "ns/op\t2365.34 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile - ns/op",
            "value": 28371746,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile - MB/s",
            "value": 2365.34,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount",
            "value": 28003513,
            "unit": "ns/op\t2396.44 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - ns/op",
            "value": 28003513,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - MB/s",
            "value": 2396.44,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "633d5e618ab04d45e0e39368e0cad2bd4980921f",
          "message": "Fix temporary directories on Windows\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-05-12T20:56:35-04:00",
          "tree_id": "477effc29ea5079f49bf1c9a32f2a559734c9275",
          "url": "https://github.com/dmcgowan/shimtest/commit/633d5e618ab04d45e0e39368e0cad2bd4980921f"
        },
        "date": 1778634062893,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle",
            "value": 50321405,
            "unit": "ns/op\t        25.92 ms/create\t         5.329 ms/delete\t         5.778 ms/kill\t         6.793 ms/shim-start\t         5.788 ms/start\t         0.7098 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ns/op",
            "value": 50321405,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/create",
            "value": 25.92,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/delete",
            "value": 5.329,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/kill",
            "value": 5.778,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/shim-start",
            "value": 6.793,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/start",
            "value": 5.788,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/wait",
            "value": 0.7098,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Startup",
            "value": 42239783,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Exec",
            "value": 22581430,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile",
            "value": 29082925,
            "unit": "ns/op\t2307.50 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile - ns/op",
            "value": 29082925,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile - MB/s",
            "value": 2307.5,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount",
            "value": 28687030,
            "unit": "ns/op\t2339.35 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - ns/op",
            "value": 28687030,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - MB/s",
            "value": 2339.35,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "fd36ba3f9689b4f2e14787eb71ac90a833ce771b",
          "message": "Update testdata directory for testbin\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-05-27T00:44:01-07:00",
          "tree_id": "ef82e3e46ad2a8b8db20dc03d0e91dd572799384",
          "url": "https://github.com/dmcgowan/shimtest/commit/fd36ba3f9689b4f2e14787eb71ac90a833ce771b"
        },
        "date": 1779868131081,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle",
            "value": 54108049,
            "unit": "ns/op\t        27.04 ms/create\t         4.926 ms/delete\t         5.867 ms/kill\t         9.830 ms/shim-start\t         5.511 ms/start\t         0.9284 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ns/op",
            "value": 54108049,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/create",
            "value": 27.04,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/delete",
            "value": 4.926,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/kill",
            "value": 5.867,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/shim-start",
            "value": 9.83,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/start",
            "value": 5.511,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/wait",
            "value": 0.9284,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Startup",
            "value": 42778536,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Exec",
            "value": 23338456,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile",
            "value": 29808885,
            "unit": "ns/op\t2251.30 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile - ns/op",
            "value": 29808885,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile - MB/s",
            "value": 2251.3,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount",
            "value": 28894990,
            "unit": "ns/op\t2322.51 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - ns/op",
            "value": 28894990,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - MB/s",
            "value": 2322.51,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "7613658cf664183b6229c852ebdfa8985d2add28",
          "message": "Handle updated testbin location in release action\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-05-27T00:49:53-07:00",
          "tree_id": "498212943e54497d7b241d13d66eff67bd27f05c",
          "url": "https://github.com/dmcgowan/shimtest/commit/7613658cf664183b6229c852ebdfa8985d2add28"
        },
        "date": 1779868417915,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle",
            "value": 48233561,
            "unit": "ns/op\t        26.72 ms/create\t         5.115 ms/delete\t         6.122 ms/kill\t         3.935 ms/shim-start\t         5.577 ms/start\t         0.7538 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ns/op",
            "value": 48233561,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/create",
            "value": 26.72,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/delete",
            "value": 5.115,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/kill",
            "value": 6.122,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/shim-start",
            "value": 3.935,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/start",
            "value": 5.577,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/wait",
            "value": 0.7538,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Startup",
            "value": 41349223,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Exec",
            "value": 23025409,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile",
            "value": 28065590,
            "unit": "ns/op\t2391.14 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile - ns/op",
            "value": 28065590,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile - MB/s",
            "value": 2391.14,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount",
            "value": 28596722,
            "unit": "ns/op\t2346.73 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - ns/op",
            "value": 28596722,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - MB/s",
            "value": 2346.73,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "a6c99a9bb2f0e92066ad63974e6c5297119f5c5f",
          "message": "Fix copy from failure\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-05-27T16:55:09-07:00",
          "tree_id": "99cb7fbd0e264ce435b0f465fcfccdbecce1d004",
          "url": "https://github.com/dmcgowan/shimtest/commit/a6c99a9bb2f0e92066ad63974e6c5297119f5c5f"
        },
        "date": 1779926347921,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle",
            "value": 54549067,
            "unit": "ns/op\t        27.46 ms/create\t         5.094 ms/delete\t         5.806 ms/kill\t         9.631 ms/shim-start\t         5.443 ms/start\t         1.112 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ns/op",
            "value": 54549067,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/create",
            "value": 27.46,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/delete",
            "value": 5.094,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/kill",
            "value": 5.806,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/shim-start",
            "value": 9.631,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/start",
            "value": 5.443,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/wait",
            "value": 1.112,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Startup",
            "value": 46655955,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Exec",
            "value": 24104634,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile",
            "value": 30260759,
            "unit": "ns/op\t2217.69 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile - ns/op",
            "value": 30260759,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile - MB/s",
            "value": 2217.69,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount",
            "value": 30796184,
            "unit": "ns/op\t2179.13 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - ns/op",
            "value": 30796184,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - MB/s",
            "value": 2179.13,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "8e7da43b1b71cc07c8abe99780a9a4d1672f0e6f",
          "message": "Bump testbinVersion to v0.1.7\n\nThe testbin package was refactored into an importable package\n(github.com/dmcgowan/shimtest/testbin) and burstexit was added in\nv0.1.6 source but the testbinVersion download pointer was never\nupdated. v0.1.7 will publish a binary built from the new package.\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-06-05T15:28:58-07:00",
          "tree_id": "ea48144bb1d8a5181b8d674e89faa7afd087b8d1",
          "url": "https://github.com/dmcgowan/shimtest/commit/8e7da43b1b71cc07c8abe99780a9a4d1672f0e6f"
        },
        "date": 1780698898267,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle",
            "value": 53896794,
            "unit": "ns/op\t        27.00 ms/create\t         5.989 ms/delete\t         6.009 ms/kill\t         7.827 ms/shim-start\t         6.174 ms/start\t         0.8946 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ns/op",
            "value": 53896794,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/create",
            "value": 27,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/delete",
            "value": 5.989,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/kill",
            "value": 6.009,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/shim-start",
            "value": 7.827,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/start",
            "value": 6.174,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/wait",
            "value": 0.8946,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Startup",
            "value": 44110214,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Exec",
            "value": 23724939,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile",
            "value": 30266221,
            "unit": "ns/op\t2217.29 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile - ns/op",
            "value": 30266221,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile - MB/s",
            "value": 2217.29,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount",
            "value": 31453320,
            "unit": "ns/op\t2133.60 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - ns/op",
            "value": 31453320,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - MB/s",
            "value": 2133.6,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "e77d6bc026f632820b1331a2da6c55cd02947e51",
          "message": "Update stress timeout handling on macOS\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-06-10T23:52:35-07:00",
          "tree_id": "427f7db6f57a370fcb058a7241bc6c16cff22d21",
          "url": "https://github.com/dmcgowan/shimtest/commit/e77d6bc026f632820b1331a2da6c55cd02947e51"
        },
        "date": 1781161014760,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle",
            "value": 53013964,
            "unit": "ns/op\t        26.89 ms/create\t         5.661 ms/delete\t         5.766 ms/kill\t         7.548 ms/shim-start\t         6.138 ms/start\t         1.007 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ns/op",
            "value": 53013964,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/create",
            "value": 26.89,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/delete",
            "value": 5.661,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/kill",
            "value": 5.766,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/shim-start",
            "value": 7.548,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/start",
            "value": 6.138,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/wait",
            "value": 1.007,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Startup",
            "value": 44553542,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Exec",
            "value": 23747565,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile",
            "value": 30972038,
            "unit": "ns/op\t2166.76 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile - ns/op",
            "value": 30972038,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile - MB/s",
            "value": 2166.76,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount",
            "value": 29979585,
            "unit": "ns/op\t2238.49 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - ns/op",
            "value": 29979585,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - MB/s",
            "value": 2238.49,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "31c0ccd6ee4db8d3d016259407ad25bbf40adc53",
          "message": "Cleanup shutdown logic further\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-06-11T00:13:51-07:00",
          "tree_id": "2d17c9587201b3b48ca72a85aa0610f619ee850f",
          "url": "https://github.com/dmcgowan/shimtest/commit/31c0ccd6ee4db8d3d016259407ad25bbf40adc53"
        },
        "date": 1781162318753,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle",
            "value": 55666665,
            "unit": "ns/op\t        28.32 ms/create\t         5.549 ms/delete\t         6.484 ms/kill\t         8.339 ms/shim-start\t         6.275 ms/start\t         0.7022 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ns/op",
            "value": 55666665,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/create",
            "value": 28.32,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/delete",
            "value": 5.549,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/kill",
            "value": 6.484,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/shim-start",
            "value": 8.339,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/start",
            "value": 6.275,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/wait",
            "value": 0.7022,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Startup",
            "value": 44979077,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Exec",
            "value": 25305034,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile",
            "value": 34395496,
            "unit": "ns/op\t1951.09 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile - ns/op",
            "value": 34395496,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile - MB/s",
            "value": 1951.09,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount",
            "value": 31252511,
            "unit": "ns/op\t2147.31 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - ns/op",
            "value": 31252511,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - MB/s",
            "value": 2147.31,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "76cba0bb1bf50d800213f8271652ee399d560c3b",
          "message": "Fix socket path length check for macOS\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-06-11T07:40:47-07:00",
          "tree_id": "864c407728acd8d1028ddc130b67944f9918d6c7",
          "url": "https://github.com/dmcgowan/shimtest/commit/76cba0bb1bf50d800213f8271652ee399d560c3b"
        },
        "date": 1781189290225,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle",
            "value": 51700787,
            "unit": "ns/op\t        27.70 ms/create\t         5.583 ms/delete\t         6.300 ms/kill\t         5.254 ms/shim-start\t         5.933 ms/start\t         0.9248 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ns/op",
            "value": 51700787,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/create",
            "value": 27.7,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/delete",
            "value": 5.583,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/kill",
            "value": 6.3,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/shim-start",
            "value": 5.254,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/start",
            "value": 5.933,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/wait",
            "value": 0.9248,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Startup",
            "value": 46379182,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Exec",
            "value": 23490762,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile",
            "value": 31303884,
            "unit": "ns/op\t2143.79 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile - ns/op",
            "value": 31303884,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile - MB/s",
            "value": 2143.79,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount",
            "value": 30853687,
            "unit": "ns/op\t2175.07 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - ns/op",
            "value": 30853687,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - MB/s",
            "value": 2175.07,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "264e4a30e9ce39a671eea7a428e9c2d4fbb55118",
          "message": "Implement drainFifoIntoDone on Windows\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-06-13T00:17:03-07:00",
          "tree_id": "3eb8d58b7a19c9ff48bd3cad54752cf1b95b6970",
          "url": "https://github.com/dmcgowan/shimtest/commit/264e4a30e9ce39a671eea7a428e9c2d4fbb55118"
        },
        "date": 1781335561658,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle",
            "value": 50304578,
            "unit": "ns/op\t        27.09 ms/create\t         5.251 ms/delete\t         6.054 ms/kill\t         5.460 ms/shim-start\t         5.458 ms/start\t         0.9850 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ns/op",
            "value": 50304578,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/create",
            "value": 27.09,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/delete",
            "value": 5.251,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/kill",
            "value": 6.054,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/shim-start",
            "value": 5.46,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/start",
            "value": 5.458,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/wait",
            "value": 0.985,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Startup",
            "value": 47292341,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Exec",
            "value": 23915969,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile",
            "value": 30938052,
            "unit": "ns/op\t2169.14 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile - ns/op",
            "value": 30938052,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile - MB/s",
            "value": 2169.14,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount",
            "value": 30286012,
            "unit": "ns/op\t2215.84 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - ns/op",
            "value": 30286012,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - MB/s",
            "value": 2215.84,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "351d3f77ac0693112293c0dd149a4be43656aa87",
          "message": "Merge pull request #2 from austinvazquez/bump-golangci-lint-action\n\nci: bump golangci/golangci-lint-action v9.2.1",
          "timestamp": "2026-06-22T10:18:37-07:00",
          "tree_id": "486fa23eb97e0f67d09a83708ca71d5a066d3c61",
          "url": "https://github.com/containerd/shimtest/commit/351d3f77ac0693112293c0dd149a4be43656aa87"
        },
        "date": 1782148933748,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle",
            "value": 44680213,
            "unit": "ns/op\t        22.03 ms/create\t         4.448 ms/delete\t         5.147 ms/kill\t         7.225 ms/shim-start\t         5.062 ms/start\t         0.7674 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ns/op",
            "value": 44680213,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/create",
            "value": 22.03,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/delete",
            "value": 4.448,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/kill",
            "value": 5.147,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/shim-start",
            "value": 7.225,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/start",
            "value": 5.062,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/wait",
            "value": 0.7674,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Startup",
            "value": 37452624,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Exec",
            "value": 18590856,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile",
            "value": 29316577,
            "unit": "ns/op\t2289.11 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile - ns/op",
            "value": 29316577,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile - MB/s",
            "value": 2289.11,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount",
            "value": 29219183,
            "unit": "ns/op\t2296.74 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - ns/op",
            "value": 29219183,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - MB/s",
            "value": 2296.74,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      }
    ],
    "runc root / containerd v2.3.0-beta.2": [
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "4b1b14b5b9861b9a70092519ab5bd80d508f4304",
          "message": "Add benchmark tests to CI\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-04-23T23:13:35-07:00",
          "tree_id": "3bd41e4f0cdca832a4ec76753b44e77b5aba1e05",
          "url": "https://github.com/dmcgowan/shimtest/commit/4b1b14b5b9861b9a70092519ab5bd80d508f4304"
        },
        "date": 1777011991980,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc/Lifecycle",
            "value": 190423576,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Startup",
            "value": 32663142,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Exec",
            "value": 12891487,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile",
            "value": 23989396,
            "unit": "ns/op\t2797.44 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile - ns/op",
            "value": 23989396,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile - MB/s",
            "value": 2797.44,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount",
            "value": 24012224,
            "unit": "ns/op\t2794.78 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount - ns/op",
            "value": 24012224,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount - MB/s",
            "value": 2794.78,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "8841bcbdf84559d7e5332a72cbbf956a281907b7",
          "message": "Avoid using systemdcgroup to get similar setup as rootless\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-04-24T00:06:45-07:00",
          "tree_id": "c21005793be2f9e0188ad2b251dc67b78f366ef9",
          "url": "https://github.com/dmcgowan/shimtest/commit/8841bcbdf84559d7e5332a72cbbf956a281907b7"
        },
        "date": 1777014652686,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc/Lifecycle",
            "value": 179365032,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Startup",
            "value": 38440990,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Exec",
            "value": 14787058,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile",
            "value": 21017421,
            "unit": "ns/op\t3193.01 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile - ns/op",
            "value": 21017421,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile - MB/s",
            "value": 3193.01,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount",
            "value": 20848602,
            "unit": "ns/op\t3218.87 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount - ns/op",
            "value": 20848602,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount - MB/s",
            "value": 3218.87,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "0476a1bfbe8c32f6ef3e8a044b19a5f508aee5ec",
          "message": "Fix socket paths being too long on macOS\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-04-24T17:15:07-07:00",
          "tree_id": "6feffccb8d382aad5adaba1789b40e2faf6d83f4",
          "url": "https://github.com/dmcgowan/shimtest/commit/0476a1bfbe8c32f6ef3e8a044b19a5f508aee5ec"
        },
        "date": 1777076357868,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc/Lifecycle",
            "value": 181959112,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Startup",
            "value": 36554631,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Exec",
            "value": 13050892,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile",
            "value": 19376962,
            "unit": "ns/op\t3463.33 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile - ns/op",
            "value": 19376962,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile - MB/s",
            "value": 3463.33,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount",
            "value": 18810208,
            "unit": "ns/op\t3567.68 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount - ns/op",
            "value": 18810208,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount - MB/s",
            "value": 3567.68,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "d588a40cce0c11b5d3b3420772f7171a25d0dd40",
          "message": "Add instructions for how to setup Github actions with shimtest\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-04-25T00:58:15-07:00",
          "tree_id": "fd8e8c540cc88c1f031fe20ba6ac65020be3ea8a",
          "url": "https://github.com/dmcgowan/shimtest/commit/d588a40cce0c11b5d3b3420772f7171a25d0dd40"
        },
        "date": 1777104093060,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc/Lifecycle",
            "value": 178294378,
            "unit": "ns/op\t        20.38 ms/create\t       133.9 ms/delete\t         5.540 ms/kill\t         8.343 ms/shim-start\t         5.098 ms/start\t         5.030 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ns/op",
            "value": 178294378,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/create",
            "value": 20.38,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/delete",
            "value": 133.9,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/kill",
            "value": 5.54,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/shim-start",
            "value": 8.343,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/start",
            "value": 5.098,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/wait",
            "value": 5.03,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Startup",
            "value": 34765049,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Exec",
            "value": 12816856,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile",
            "value": 19269229,
            "unit": "ns/op\t3482.70 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile - ns/op",
            "value": 19269229,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile - MB/s",
            "value": 3482.7,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount",
            "value": 19665172,
            "unit": "ns/op\t3412.57 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount - ns/op",
            "value": 19665172,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount - MB/s",
            "value": 3412.57,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "ada1246fb1020406703f346d16c3f20a0c3df635",
          "message": "Add stress tests\n\nThese tests currently fail with nerdbox but will help find a solution\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-04-30T11:05:02-07:00",
          "tree_id": "99710c7414bf76dac00c98b5d9f9acd6b7d90aea",
          "url": "https://github.com/dmcgowan/shimtest/commit/ada1246fb1020406703f346d16c3f20a0c3df635"
        },
        "date": 1777573058400,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc/Lifecycle",
            "value": 178133238,
            "unit": "ns/op\t        22.50 ms/create\t       133.3 ms/delete\t         5.632 ms/kill\t         6.185 ms/shim-start\t         5.244 ms/start\t         5.263 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ns/op",
            "value": 178133238,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/create",
            "value": 22.5,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/delete",
            "value": 133.3,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/kill",
            "value": 5.632,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/shim-start",
            "value": 6.185,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/start",
            "value": 5.244,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/wait",
            "value": 5.263,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Startup",
            "value": 37233272,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Exec",
            "value": 12948575,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile",
            "value": 19964341,
            "unit": "ns/op\t3361.44 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile - ns/op",
            "value": 19964341,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile - MB/s",
            "value": 3361.44,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount",
            "value": 19310866,
            "unit": "ns/op\t3475.19 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount - ns/op",
            "value": 19310866,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount - MB/s",
            "value": 3475.19,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "7c48d3a2ba7d0e3d0a7464b20d1783f51397a771",
          "message": "Wait for all topics to finish before sending shutdown\n\nA failure could occur on shutdown from a runner being slightly too slow.\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-05-01T16:02:24-07:00",
          "tree_id": "37faab4d44a7c99ce5a89b6730bd96d7af695543",
          "url": "https://github.com/dmcgowan/shimtest/commit/7c48d3a2ba7d0e3d0a7464b20d1783f51397a771"
        },
        "date": 1777676838649,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc/Lifecycle",
            "value": 195305621,
            "unit": "ns/op\t        19.05 ms/create\t       156.6 ms/delete\t         4.908 ms/kill\t         5.509 ms/shim-start\t         4.721 ms/start\t         4.556 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ns/op",
            "value": 195305621,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/create",
            "value": 19.05,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/delete",
            "value": 156.6,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/kill",
            "value": 4.908,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/shim-start",
            "value": 5.509,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/start",
            "value": 4.721,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/wait",
            "value": 4.556,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Startup",
            "value": 31385425,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Exec",
            "value": 11377941,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile",
            "value": 22554539,
            "unit": "ns/op\t2975.40 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile - ns/op",
            "value": 22554539,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile - MB/s",
            "value": 2975.4,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount",
            "value": 22312726,
            "unit": "ns/op\t3007.65 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount - ns/op",
            "value": 22312726,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount - MB/s",
            "value": 3007.65,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "55a7e35d9f44c30b2ef0570e055a8f43c29bfc80",
          "message": "Fix shim leaks during longer running tests\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-05-02T07:41:36-07:00",
          "tree_id": "64851ac8d1af239f941a652ba828b87a922b670a",
          "url": "https://github.com/dmcgowan/shimtest/commit/55a7e35d9f44c30b2ef0570e055a8f43c29bfc80"
        },
        "date": 1777733136589,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc/Lifecycle",
            "value": 174013057,
            "unit": "ns/op\t        20.62 ms/create\t       132.2 ms/delete\t         5.279 ms/kill\t         5.573 ms/shim-start\t         5.160 ms/start\t         5.195 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ns/op",
            "value": 174013057,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/create",
            "value": 20.62,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/delete",
            "value": 132.2,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/kill",
            "value": 5.279,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/shim-start",
            "value": 5.573,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/start",
            "value": 5.16,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/wait",
            "value": 5.195,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Startup",
            "value": 38510369,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Exec",
            "value": 13986376,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile",
            "value": 20060396,
            "unit": "ns/op\t3345.34 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile - ns/op",
            "value": 20060396,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile - MB/s",
            "value": 3345.34,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount",
            "value": 19833466,
            "unit": "ns/op\t3383.62 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount - ns/op",
            "value": 19833466,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount - MB/s",
            "value": 3383.62,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "13a86f5d6435571a2d9a493beb01d240886dfae5",
          "message": "Cycle through added files to ensure space does not fill up during stress\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-05-02T16:05:13-07:00",
          "tree_id": "55c35e43ce96694ae65944764a5da94535b44b32",
          "url": "https://github.com/dmcgowan/shimtest/commit/13a86f5d6435571a2d9a493beb01d240886dfae5"
        },
        "date": 1777763361919,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc/Lifecycle",
            "value": 173459312,
            "unit": "ns/op\t        23.60 ms/create\t       125.3 ms/delete\t         6.007 ms/kill\t         6.893 ms/shim-start\t         5.540 ms/start\t         6.155 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ns/op",
            "value": 173459312,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/create",
            "value": 23.6,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/delete",
            "value": 125.3,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/kill",
            "value": 6.007,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/shim-start",
            "value": 6.893,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/start",
            "value": 5.54,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/wait",
            "value": 6.155,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Startup",
            "value": 40090447,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Exec",
            "value": 13715743,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile",
            "value": 20707845,
            "unit": "ns/op\t3240.75 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile - ns/op",
            "value": 20707845,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile - MB/s",
            "value": 3240.75,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount",
            "value": 20820134,
            "unit": "ns/op\t3223.27 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount - ns/op",
            "value": 20820134,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount - MB/s",
            "value": 3223.27,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "3e7494c6c2fde0be0ef3223016c5490a0d1d82b9",
          "message": "Update ttrpc version to fix deadlock\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-05-02T23:46:47-07:00",
          "tree_id": "5d798025c38f86d4ab6af32b88411a3f66bbe1a2",
          "url": "https://github.com/dmcgowan/shimtest/commit/3e7494c6c2fde0be0ef3223016c5490a0d1d82b9"
        },
        "date": 1777791249574,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc/Lifecycle",
            "value": 192530213,
            "unit": "ns/op\t        19.58 ms/create\t       153.0 ms/delete\t         4.695 ms/kill\t         5.354 ms/shim-start\t         4.544 ms/start\t         5.311 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ns/op",
            "value": 192530213,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/create",
            "value": 19.58,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/delete",
            "value": 153,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/kill",
            "value": 4.695,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/shim-start",
            "value": 5.354,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/start",
            "value": 4.544,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/wait",
            "value": 5.311,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Startup",
            "value": 29622836,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Exec",
            "value": 11761182,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile",
            "value": 21612001,
            "unit": "ns/op\t3105.17 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile - ns/op",
            "value": 21612001,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile - MB/s",
            "value": 3105.17,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount",
            "value": 22008077,
            "unit": "ns/op\t3049.28 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount - ns/op",
            "value": 22008077,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount - MB/s",
            "value": 3049.28,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "de45369ce617e311a7f19ec419ee73ec13fde898",
          "message": "Add 100 layer test\n\nAdd test for 100 layers and benchmark with 30 layers.\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-05-08T20:49:11-07:00",
          "tree_id": "8c8d06910350cd14d1d7afc8b2035e6d16cb2b80",
          "url": "https://github.com/dmcgowan/shimtest/commit/de45369ce617e311a7f19ec419ee73ec13fde898"
        },
        "date": 1778298802660,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc/Lifecycle",
            "value": 170832134,
            "unit": "ns/op\t        22.52 ms/create\t       125.4 ms/delete\t         5.827 ms/kill\t         6.715 ms/shim-start\t         5.347 ms/start\t         5.007 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ns/op",
            "value": 170832134,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/create",
            "value": 22.52,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/delete",
            "value": 125.4,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/kill",
            "value": 5.827,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/shim-start",
            "value": 6.715,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/start",
            "value": 5.347,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/wait",
            "value": 5.007,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Startup",
            "value": 34520685,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Exec",
            "value": 12644270,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile",
            "value": 19127246,
            "unit": "ns/op\t3508.55 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile - ns/op",
            "value": 19127246,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile - MB/s",
            "value": 3508.55,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount",
            "value": 21087900,
            "unit": "ns/op\t3182.34 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount - ns/op",
            "value": 21087900,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount - MB/s",
            "value": 3182.34,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "930837a1140cd588254dc5f4b92f8a00bac37d4f",
          "message": "Updates to stress test to be more reliable\n\nExpand memory growth allowance.\nSuppress known non-fatal issues on shutdown.\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-05-10T23:54:42-07:00",
          "tree_id": "e238de2ec82a3ef1350641ddcc23e6baf21a324a",
          "url": "https://github.com/dmcgowan/shimtest/commit/930837a1140cd588254dc5f4b92f8a00bac37d4f"
        },
        "date": 1778482793852,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc/Lifecycle",
            "value": 174306223,
            "unit": "ns/op\t        22.34 ms/create\t       128.0 ms/delete\t         6.036 ms/kill\t         6.167 ms/shim-start\t         6.272 ms/start\t         5.514 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ns/op",
            "value": 174306223,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/create",
            "value": 22.34,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/delete",
            "value": 128,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/kill",
            "value": 6.036,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/shim-start",
            "value": 6.167,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/start",
            "value": 6.272,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/wait",
            "value": 5.514,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Startup",
            "value": 34721436,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Exec",
            "value": 13180815,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile",
            "value": 21084366,
            "unit": "ns/op\t3182.87 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile - ns/op",
            "value": 21084366,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile - MB/s",
            "value": 3182.87,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount",
            "value": 20146276,
            "unit": "ns/op\t3331.08 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount - ns/op",
            "value": 20146276,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount - MB/s",
            "value": 3331.08,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "f6f1d1ac06f34430c9b787c8bad90680a5cf5133",
          "message": "Makefile: use .exe extension for test binary on Windows\n\ngo test -c produces a binary without an extension by default (Linux\nconvention). On Windows executables must end in .exe to be runnable\ndirectly. Detect OS=Windows_NT and set TEST_BINARY accordingly.\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-05-12T18:51:42-04:00",
          "tree_id": "9fbaa25006a5194e363f58756a7cc28a5d18c111",
          "url": "https://github.com/dmcgowan/shimtest/commit/f6f1d1ac06f34430c9b787c8bad90680a5cf5133"
        },
        "date": 1778630848094,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc/Lifecycle",
            "value": 67172888,
            "unit": "ns/op\t        20.76 ms/create\t        26.25 ms/delete\t         5.776 ms/kill\t         4.170 ms/shim-start\t         4.962 ms/start\t         5.255 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ns/op",
            "value": 67172888,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/create",
            "value": 20.76,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/delete",
            "value": 26.25,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/kill",
            "value": 5.776,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/shim-start",
            "value": 4.17,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/start",
            "value": 4.962,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/wait",
            "value": 5.255,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Startup",
            "value": 32310654,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Exec",
            "value": 13210096,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile",
            "value": 20183982,
            "unit": "ns/op\t3324.86 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile - ns/op",
            "value": 20183982,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile - MB/s",
            "value": 3324.86,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount",
            "value": 19033889,
            "unit": "ns/op\t3525.76 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount - ns/op",
            "value": 19033889,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount - MB/s",
            "value": 3525.76,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "633d5e618ab04d45e0e39368e0cad2bd4980921f",
          "message": "Fix temporary directories on Windows\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-05-12T20:56:35-04:00",
          "tree_id": "477effc29ea5079f49bf1c9a32f2a559734c9275",
          "url": "https://github.com/dmcgowan/shimtest/commit/633d5e618ab04d45e0e39368e0cad2bd4980921f"
        },
        "date": 1778634065497,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc/Lifecycle",
            "value": 72551783,
            "unit": "ns/op\t        21.42 ms/create\t        30.43 ms/delete\t         5.467 ms/kill\t         4.611 ms/shim-start\t         5.533 ms/start\t         5.088 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ns/op",
            "value": 72551783,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/create",
            "value": 21.42,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/delete",
            "value": 30.43,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/kill",
            "value": 5.467,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/shim-start",
            "value": 4.611,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/start",
            "value": 5.533,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/wait",
            "value": 5.088,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Startup",
            "value": 32699121,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Exec",
            "value": 13094316,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile",
            "value": 19628215,
            "unit": "ns/op\t3419.00 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile - ns/op",
            "value": 19628215,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile - MB/s",
            "value": 3419,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount",
            "value": 19329973,
            "unit": "ns/op\t3471.75 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount - ns/op",
            "value": 19329973,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount - MB/s",
            "value": 3471.75,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "fd36ba3f9689b4f2e14787eb71ac90a833ce771b",
          "message": "Update testdata directory for testbin\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-05-27T00:44:01-07:00",
          "tree_id": "ef82e3e46ad2a8b8db20dc03d0e91dd572799384",
          "url": "https://github.com/dmcgowan/shimtest/commit/fd36ba3f9689b4f2e14787eb71ac90a833ce771b"
        },
        "date": 1779868132581,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc/Lifecycle",
            "value": 71544208,
            "unit": "ns/op\t        21.33 ms/create\t        29.10 ms/delete\t         5.270 ms/kill\t         4.950 ms/shim-start\t         5.621 ms/start\t         5.273 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ns/op",
            "value": 71544208,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/create",
            "value": 21.33,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/delete",
            "value": 29.1,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/kill",
            "value": 5.27,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/shim-start",
            "value": 4.95,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/start",
            "value": 5.621,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/wait",
            "value": 5.273,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Startup",
            "value": 30471561,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Exec",
            "value": 12581806,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile",
            "value": 19521344,
            "unit": "ns/op\t3437.72 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile - ns/op",
            "value": 19521344,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile - MB/s",
            "value": 3437.72,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount",
            "value": 19451470,
            "unit": "ns/op\t3450.07 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount - ns/op",
            "value": 19451470,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount - MB/s",
            "value": 3450.07,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "7613658cf664183b6229c852ebdfa8985d2add28",
          "message": "Handle updated testbin location in release action\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-05-27T00:49:53-07:00",
          "tree_id": "498212943e54497d7b241d13d66eff67bd27f05c",
          "url": "https://github.com/dmcgowan/shimtest/commit/7613658cf664183b6229c852ebdfa8985d2add28"
        },
        "date": 1779868419152,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc/Lifecycle",
            "value": 73659311,
            "unit": "ns/op\t        20.23 ms/create\t        33.94 ms/delete\t         5.345 ms/kill\t         3.587 ms/shim-start\t         5.302 ms/start\t         5.252 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ns/op",
            "value": 73659311,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/create",
            "value": 20.23,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/delete",
            "value": 33.94,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/kill",
            "value": 5.345,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/shim-start",
            "value": 3.587,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/start",
            "value": 5.302,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/wait",
            "value": 5.252,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Startup",
            "value": 30158958,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Exec",
            "value": 13235514,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile",
            "value": 19400724,
            "unit": "ns/op\t3459.09 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile - ns/op",
            "value": 19400724,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile - MB/s",
            "value": 3459.09,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount",
            "value": 19554701,
            "unit": "ns/op\t3431.85 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount - ns/op",
            "value": 19554701,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount - MB/s",
            "value": 3431.85,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "a6c99a9bb2f0e92066ad63974e6c5297119f5c5f",
          "message": "Fix copy from failure\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-05-27T16:55:09-07:00",
          "tree_id": "99cb7fbd0e264ce435b0f465fcfccdbecce1d004",
          "url": "https://github.com/dmcgowan/shimtest/commit/a6c99a9bb2f0e92066ad63974e6c5297119f5c5f"
        },
        "date": 1779926350013,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc/Lifecycle",
            "value": 75445509,
            "unit": "ns/op\t        21.56 ms/create\t        29.73 ms/delete\t         5.891 ms/kill\t         6.916 ms/shim-start\t         5.792 ms/start\t         5.558 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ns/op",
            "value": 75445509,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/create",
            "value": 21.56,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/delete",
            "value": 29.73,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/kill",
            "value": 5.891,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/shim-start",
            "value": 6.916,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/start",
            "value": 5.792,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/wait",
            "value": 5.558,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Startup",
            "value": 33369021,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Exec",
            "value": 13740224,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile",
            "value": 19929748,
            "unit": "ns/op\t3367.27 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile - ns/op",
            "value": 19929748,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile - MB/s",
            "value": 3367.27,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount",
            "value": 20686769,
            "unit": "ns/op\t3244.05 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount - ns/op",
            "value": 20686769,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount - MB/s",
            "value": 3244.05,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "8e7da43b1b71cc07c8abe99780a9a4d1672f0e6f",
          "message": "Bump testbinVersion to v0.1.7\n\nThe testbin package was refactored into an importable package\n(github.com/dmcgowan/shimtest/testbin) and burstexit was added in\nv0.1.6 source but the testbinVersion download pointer was never\nupdated. v0.1.7 will publish a binary built from the new package.\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-06-05T15:28:58-07:00",
          "tree_id": "ea48144bb1d8a5181b8d674e89faa7afd087b8d1",
          "url": "https://github.com/dmcgowan/shimtest/commit/8e7da43b1b71cc07c8abe99780a9a4d1672f0e6f"
        },
        "date": 1780698899572,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc/Lifecycle",
            "value": 75458675,
            "unit": "ns/op\t        21.90 ms/create\t        31.98 ms/delete\t         5.892 ms/kill\t         3.896 ms/shim-start\t         5.798 ms/start\t         5.991 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ns/op",
            "value": 75458675,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/create",
            "value": 21.9,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/delete",
            "value": 31.98,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/kill",
            "value": 5.892,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/shim-start",
            "value": 3.896,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/start",
            "value": 5.798,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/wait",
            "value": 5.991,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Startup",
            "value": 34145394,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Exec",
            "value": 13848352,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile",
            "value": 20910294,
            "unit": "ns/op\t3209.37 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile - ns/op",
            "value": 20910294,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile - MB/s",
            "value": 3209.37,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount",
            "value": 20547891,
            "unit": "ns/op\t3265.97 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount - ns/op",
            "value": 20547891,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount - MB/s",
            "value": 3265.97,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "e77d6bc026f632820b1331a2da6c55cd02947e51",
          "message": "Update stress timeout handling on macOS\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-06-10T23:52:35-07:00",
          "tree_id": "427f7db6f57a370fcb058a7241bc6c16cff22d21",
          "url": "https://github.com/dmcgowan/shimtest/commit/e77d6bc026f632820b1331a2da6c55cd02947e51"
        },
        "date": 1781161016117,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc/Lifecycle",
            "value": 69473633,
            "unit": "ns/op\t        20.71 ms/create\t        28.10 ms/delete\t         5.898 ms/kill\t         3.823 ms/shim-start\t         5.566 ms/start\t         5.380 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ns/op",
            "value": 69473633,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/create",
            "value": 20.71,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/delete",
            "value": 28.1,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/kill",
            "value": 5.898,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/shim-start",
            "value": 3.823,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/start",
            "value": 5.566,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/wait",
            "value": 5.38,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Startup",
            "value": 31755109,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Exec",
            "value": 13716989,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile",
            "value": 20175478,
            "unit": "ns/op\t3326.26 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile - ns/op",
            "value": 20175478,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile - MB/s",
            "value": 3326.26,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount",
            "value": 20530840,
            "unit": "ns/op\t3268.69 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount - ns/op",
            "value": 20530840,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount - MB/s",
            "value": 3268.69,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "31c0ccd6ee4db8d3d016259407ad25bbf40adc53",
          "message": "Cleanup shutdown logic further\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-06-11T00:13:51-07:00",
          "tree_id": "2d17c9587201b3b48ca72a85aa0610f619ee850f",
          "url": "https://github.com/dmcgowan/shimtest/commit/31c0ccd6ee4db8d3d016259407ad25bbf40adc53"
        },
        "date": 1781162320086,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc/Lifecycle",
            "value": 73847047,
            "unit": "ns/op\t        21.74 ms/create\t        30.40 ms/delete\t         5.868 ms/kill\t         4.786 ms/shim-start\t         5.582 ms/start\t         5.476 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ns/op",
            "value": 73847047,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/create",
            "value": 21.74,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/delete",
            "value": 30.4,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/kill",
            "value": 5.868,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/shim-start",
            "value": 4.786,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/start",
            "value": 5.582,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/wait",
            "value": 5.476,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Startup",
            "value": 34779480,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Exec",
            "value": 13521274,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile",
            "value": 21363073,
            "unit": "ns/op\t3141.35 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile - ns/op",
            "value": 21363073,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile - MB/s",
            "value": 3141.35,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount",
            "value": 21891647,
            "unit": "ns/op\t3065.50 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount - ns/op",
            "value": 21891647,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount - MB/s",
            "value": 3065.5,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "76cba0bb1bf50d800213f8271652ee399d560c3b",
          "message": "Fix socket path length check for macOS\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-06-11T07:40:47-07:00",
          "tree_id": "864c407728acd8d1028ddc130b67944f9918d6c7",
          "url": "https://github.com/dmcgowan/shimtest/commit/76cba0bb1bf50d800213f8271652ee399d560c3b"
        },
        "date": 1781189292107,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc/Lifecycle",
            "value": 73245103,
            "unit": "ns/op\t        21.70 ms/create\t        30.31 ms/delete\t         6.164 ms/kill\t         4.075 ms/shim-start\t         5.587 ms/start\t         5.407 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ns/op",
            "value": 73245103,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/create",
            "value": 21.7,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/delete",
            "value": 30.31,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/kill",
            "value": 6.164,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/shim-start",
            "value": 4.075,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/start",
            "value": 5.587,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/wait",
            "value": 5.407,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Startup",
            "value": 34771890,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Exec",
            "value": 13783472,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile",
            "value": 20483136,
            "unit": "ns/op\t3276.30 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile - ns/op",
            "value": 20483136,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile - MB/s",
            "value": 3276.3,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount",
            "value": 20613928,
            "unit": "ns/op\t3255.51 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount - ns/op",
            "value": 20613928,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount - MB/s",
            "value": 3255.51,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "264e4a30e9ce39a671eea7a428e9c2d4fbb55118",
          "message": "Implement drainFifoIntoDone on Windows\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-06-13T00:17:03-07:00",
          "tree_id": "3eb8d58b7a19c9ff48bd3cad54752cf1b95b6970",
          "url": "https://github.com/dmcgowan/shimtest/commit/264e4a30e9ce39a671eea7a428e9c2d4fbb55118"
        },
        "date": 1781335562957,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc/Lifecycle",
            "value": 77193094,
            "unit": "ns/op\t        21.99 ms/create\t        32.64 ms/delete\t         6.380 ms/kill\t         4.024 ms/shim-start\t         5.533 ms/start\t         6.625 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ns/op",
            "value": 77193094,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/create",
            "value": 21.99,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/delete",
            "value": 32.64,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/kill",
            "value": 6.38,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/shim-start",
            "value": 4.024,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/start",
            "value": 5.533,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/wait",
            "value": 6.625,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Startup",
            "value": 31786731,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Exec",
            "value": 13724647,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile",
            "value": 20430638,
            "unit": "ns/op\t3284.72 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile - ns/op",
            "value": 20430638,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile - MB/s",
            "value": 3284.72,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount",
            "value": 20882664,
            "unit": "ns/op\t3213.62 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount - ns/op",
            "value": 20882664,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount - MB/s",
            "value": 3213.62,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      }
    ],
    "runc rootless / containerd main": [
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "4b1b14b5b9861b9a70092519ab5bd80d508f4304",
          "message": "Add benchmark tests to CI\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-04-23T23:13:35-07:00",
          "tree_id": "3bd41e4f0cdca832a4ec76753b44e77b5aba1e05",
          "url": "https://github.com/dmcgowan/shimtest/commit/4b1b14b5b9861b9a70092519ab5bd80d508f4304"
        },
        "date": 1777011992975,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle",
            "value": 50739668,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Startup",
            "value": 43377952,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Exec",
            "value": 23211502,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile",
            "value": 29422077,
            "unit": "ns/op\t2280.90 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile - ns/op",
            "value": 29422077,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile - MB/s",
            "value": 2280.9,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount",
            "value": 30236158,
            "unit": "ns/op\t2219.49 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - ns/op",
            "value": 30236158,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - MB/s",
            "value": 2219.49,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "8841bcbdf84559d7e5332a72cbbf956a281907b7",
          "message": "Avoid using systemdcgroup to get similar setup as rootless\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-04-24T00:06:45-07:00",
          "tree_id": "c21005793be2f9e0188ad2b251dc67b78f366ef9",
          "url": "https://github.com/dmcgowan/shimtest/commit/8841bcbdf84559d7e5332a72cbbf956a281907b7"
        },
        "date": 1777014653502,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle",
            "value": 48791420,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Startup",
            "value": 35938973,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Exec",
            "value": 18729989,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile",
            "value": 28798882,
            "unit": "ns/op\t2330.26 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile - ns/op",
            "value": 28798882,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile - MB/s",
            "value": 2330.26,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount",
            "value": 29417367,
            "unit": "ns/op\t2281.27 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - ns/op",
            "value": 29417367,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - MB/s",
            "value": 2281.27,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "0476a1bfbe8c32f6ef3e8a044b19a5f508aee5ec",
          "message": "Fix socket paths being too long on macOS\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-04-24T17:15:07-07:00",
          "tree_id": "6feffccb8d382aad5adaba1789b40e2faf6d83f4",
          "url": "https://github.com/dmcgowan/shimtest/commit/0476a1bfbe8c32f6ef3e8a044b19a5f508aee5ec"
        },
        "date": 1777076358695,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle",
            "value": 49065309,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Startup",
            "value": 41423644,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Exec",
            "value": 22836366,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile",
            "value": 28563363,
            "unit": "ns/op\t2349.47 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile - ns/op",
            "value": 28563363,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile - MB/s",
            "value": 2349.47,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount",
            "value": 28799798,
            "unit": "ns/op\t2330.19 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - ns/op",
            "value": 28799798,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - MB/s",
            "value": 2330.19,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "d588a40cce0c11b5d3b3420772f7171a25d0dd40",
          "message": "Add instructions for how to setup Github actions with shimtest\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-04-25T00:58:15-07:00",
          "tree_id": "fd8e8c540cc88c1f031fe20ba6ac65020be3ea8a",
          "url": "https://github.com/dmcgowan/shimtest/commit/d588a40cce0c11b5d3b3420772f7171a25d0dd40"
        },
        "date": 1777104093899,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle",
            "value": 47079815,
            "unit": "ns/op\t        25.21 ms/create\t         4.805 ms/delete\t         5.746 ms/kill\t         5.345 ms/shim-start\t         5.252 ms/start\t         0.7156 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ns/op",
            "value": 47079815,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/create",
            "value": 25.21,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/delete",
            "value": 4.805,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/kill",
            "value": 5.746,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/shim-start",
            "value": 5.345,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/start",
            "value": 5.252,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/wait",
            "value": 0.7156,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Startup",
            "value": 44722403,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Exec",
            "value": 22399886,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile",
            "value": 30236567,
            "unit": "ns/op\t2219.46 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile - ns/op",
            "value": 30236567,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile - MB/s",
            "value": 2219.46,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount",
            "value": 29478952,
            "unit": "ns/op\t2276.50 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - ns/op",
            "value": 29478952,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - MB/s",
            "value": 2276.5,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "ada1246fb1020406703f346d16c3f20a0c3df635",
          "message": "Add stress tests\n\nThese tests currently fail with nerdbox but will help find a solution\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-04-30T11:05:02-07:00",
          "tree_id": "99710c7414bf76dac00c98b5d9f9acd6b7d90aea",
          "url": "https://github.com/dmcgowan/shimtest/commit/ada1246fb1020406703f346d16c3f20a0c3df635"
        },
        "date": 1777573059487,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle",
            "value": 52400770,
            "unit": "ns/op\t        26.84 ms/create\t         5.362 ms/delete\t         6.499 ms/kill\t         7.069 ms/shim-start\t         5.709 ms/start\t         0.9156 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ns/op",
            "value": 52400770,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/create",
            "value": 26.84,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/delete",
            "value": 5.362,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/kill",
            "value": 6.499,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/shim-start",
            "value": 7.069,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/start",
            "value": 5.709,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/wait",
            "value": 0.9156,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Startup",
            "value": 43778617,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Exec",
            "value": 23911043,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile",
            "value": 30344906,
            "unit": "ns/op\t2211.54 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile - ns/op",
            "value": 30344906,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile - MB/s",
            "value": 2211.54,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount",
            "value": 30195763,
            "unit": "ns/op\t2222.46 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - ns/op",
            "value": 30195763,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - MB/s",
            "value": 2222.46,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "7c48d3a2ba7d0e3d0a7464b20d1783f51397a771",
          "message": "Wait for all topics to finish before sending shutdown\n\nA failure could occur on shutdown from a runner being slightly too slow.\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-05-01T16:02:24-07:00",
          "tree_id": "37faab4d44a7c99ce5a89b6730bd96d7af695543",
          "url": "https://github.com/dmcgowan/shimtest/commit/7c48d3a2ba7d0e3d0a7464b20d1783f51397a771"
        },
        "date": 1777676840441,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle",
            "value": 53631608,
            "unit": "ns/op\t        26.66 ms/create\t         5.137 ms/delete\t         5.896 ms/kill\t         8.940 ms/shim-start\t         6.120 ms/start\t         0.8736 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ns/op",
            "value": 53631608,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/create",
            "value": 26.66,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/delete",
            "value": 5.137,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/kill",
            "value": 5.896,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/shim-start",
            "value": 8.94,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/start",
            "value": 6.12,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/wait",
            "value": 0.8736,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Startup",
            "value": 39919043,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Exec",
            "value": 22640729,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile",
            "value": 28923995,
            "unit": "ns/op\t2320.18 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile - ns/op",
            "value": 28923995,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile - MB/s",
            "value": 2320.18,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount",
            "value": 28406803,
            "unit": "ns/op\t2362.42 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - ns/op",
            "value": 28406803,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - MB/s",
            "value": 2362.42,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "55a7e35d9f44c30b2ef0570e055a8f43c29bfc80",
          "message": "Fix shim leaks during longer running tests\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-05-02T07:41:36-07:00",
          "tree_id": "64851ac8d1af239f941a652ba828b87a922b670a",
          "url": "https://github.com/dmcgowan/shimtest/commit/55a7e35d9f44c30b2ef0570e055a8f43c29bfc80"
        },
        "date": 1777733138329,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle",
            "value": 48070614,
            "unit": "ns/op\t        26.11 ms/create\t         4.792 ms/delete\t         5.722 ms/kill\t         4.832 ms/shim-start\t         5.533 ms/start\t         1.076 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ns/op",
            "value": 48070614,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/create",
            "value": 26.11,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/delete",
            "value": 4.792,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/kill",
            "value": 5.722,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/shim-start",
            "value": 4.832,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/start",
            "value": 5.533,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/wait",
            "value": 1.076,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Startup",
            "value": 41462564,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Exec",
            "value": 23094528,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile",
            "value": 30176058,
            "unit": "ns/op\t2223.91 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile - ns/op",
            "value": 30176058,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile - MB/s",
            "value": 2223.91,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount",
            "value": 28201584,
            "unit": "ns/op\t2379.61 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - ns/op",
            "value": 28201584,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - MB/s",
            "value": 2379.61,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "13a86f5d6435571a2d9a493beb01d240886dfae5",
          "message": "Cycle through added files to ensure space does not fill up during stress\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-05-02T16:05:13-07:00",
          "tree_id": "55c35e43ce96694ae65944764a5da94535b44b32",
          "url": "https://github.com/dmcgowan/shimtest/commit/13a86f5d6435571a2d9a493beb01d240886dfae5"
        },
        "date": 1777763362991,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle",
            "value": 51633252,
            "unit": "ns/op\t        26.45 ms/create\t         5.290 ms/delete\t         5.706 ms/kill\t         7.449 ms/shim-start\t         5.774 ms/start\t         0.9672 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ns/op",
            "value": 51633252,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/create",
            "value": 26.45,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/delete",
            "value": 5.29,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/kill",
            "value": 5.706,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/shim-start",
            "value": 7.449,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/start",
            "value": 5.774,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/wait",
            "value": 0.9672,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Startup",
            "value": 44922774,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Exec",
            "value": 22907959,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile",
            "value": 29716668,
            "unit": "ns/op\t2258.29 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile - ns/op",
            "value": 29716668,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile - MB/s",
            "value": 2258.29,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount",
            "value": 29652295,
            "unit": "ns/op\t2263.19 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - ns/op",
            "value": 29652295,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - MB/s",
            "value": 2263.19,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "3e7494c6c2fde0be0ef3223016c5490a0d1d82b9",
          "message": "Update ttrpc version to fix deadlock\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-05-02T23:46:47-07:00",
          "tree_id": "5d798025c38f86d4ab6af32b88411a3f66bbe1a2",
          "url": "https://github.com/dmcgowan/shimtest/commit/3e7494c6c2fde0be0ef3223016c5490a0d1d82b9"
        },
        "date": 1777791250810,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle",
            "value": 53671586,
            "unit": "ns/op\t        26.59 ms/create\t         5.437 ms/delete\t         6.816 ms/kill\t         8.331 ms/shim-start\t         5.772 ms/start\t         0.7208 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ns/op",
            "value": 53671586,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/create",
            "value": 26.59,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/delete",
            "value": 5.437,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/kill",
            "value": 6.816,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/shim-start",
            "value": 8.331,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/start",
            "value": 5.772,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/wait",
            "value": 0.7208,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Startup",
            "value": 45341747,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Exec",
            "value": 24543033,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile",
            "value": 29861279,
            "unit": "ns/op\t2247.35 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile - ns/op",
            "value": 29861279,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile - MB/s",
            "value": 2247.35,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount",
            "value": 28936141,
            "unit": "ns/op\t2319.21 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - ns/op",
            "value": 28936141,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - MB/s",
            "value": 2319.21,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "de45369ce617e311a7f19ec419ee73ec13fde898",
          "message": "Add 100 layer test\n\nAdd test for 100 layers and benchmark with 30 layers.\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-05-08T20:49:11-07:00",
          "tree_id": "8c8d06910350cd14d1d7afc8b2035e6d16cb2b80",
          "url": "https://github.com/dmcgowan/shimtest/commit/de45369ce617e311a7f19ec419ee73ec13fde898"
        },
        "date": 1778298803765,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle",
            "value": 52862366,
            "unit": "ns/op\t        26.89 ms/create\t         5.443 ms/delete\t         6.359 ms/kill\t         7.612 ms/shim-start\t         5.605 ms/start\t         0.9478 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ns/op",
            "value": 52862366,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/create",
            "value": 26.89,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/delete",
            "value": 5.443,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/kill",
            "value": 6.359,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/shim-start",
            "value": 7.612,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/start",
            "value": 5.605,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/wait",
            "value": 0.9478,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Startup",
            "value": 40538434,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Exec",
            "value": 22412914,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile",
            "value": 28526412,
            "unit": "ns/op\t2352.52 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile - ns/op",
            "value": 28526412,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile - MB/s",
            "value": 2352.52,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount",
            "value": 28258145,
            "unit": "ns/op\t2374.85 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - ns/op",
            "value": 28258145,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - MB/s",
            "value": 2374.85,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "930837a1140cd588254dc5f4b92f8a00bac37d4f",
          "message": "Updates to stress test to be more reliable\n\nExpand memory growth allowance.\nSuppress known non-fatal issues on shutdown.\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-05-10T23:54:42-07:00",
          "tree_id": "e238de2ec82a3ef1350641ddcc23e6baf21a324a",
          "url": "https://github.com/dmcgowan/shimtest/commit/930837a1140cd588254dc5f4b92f8a00bac37d4f"
        },
        "date": 1778482795627,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle",
            "value": 50211878,
            "unit": "ns/op\t        25.39 ms/create\t         5.121 ms/delete\t         6.810 ms/kill\t         6.505 ms/shim-start\t         5.337 ms/start\t         1.046 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ns/op",
            "value": 50211878,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/create",
            "value": 25.39,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/delete",
            "value": 5.121,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/kill",
            "value": 6.81,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/shim-start",
            "value": 6.505,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/start",
            "value": 5.337,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/wait",
            "value": 1.046,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Startup",
            "value": 44671218,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Exec",
            "value": 22536024,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount",
            "value": 29918468,
            "unit": "ns/op\t2243.06 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - ns/op",
            "value": 29918468,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - MB/s",
            "value": 2243.06,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "f6f1d1ac06f34430c9b787c8bad90680a5cf5133",
          "message": "Makefile: use .exe extension for test binary on Windows\n\ngo test -c produces a binary without an extension by default (Linux\nconvention). On Windows executables must end in .exe to be runnable\ndirectly. Detect OS=Windows_NT and set TEST_BINARY accordingly.\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-05-12T18:51:42-04:00",
          "tree_id": "9fbaa25006a5194e363f58756a7cc28a5d18c111",
          "url": "https://github.com/dmcgowan/shimtest/commit/f6f1d1ac06f34430c9b787c8bad90680a5cf5133"
        },
        "date": 1778630850129,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle",
            "value": 54749653,
            "unit": "ns/op\t        28.12 ms/create\t         5.949 ms/delete\t         7.309 ms/kill\t         5.826 ms/shim-start\t         6.306 ms/start\t         1.238 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ns/op",
            "value": 54749653,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/create",
            "value": 28.12,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/delete",
            "value": 5.949,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/kill",
            "value": 7.309,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/shim-start",
            "value": 5.826,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/start",
            "value": 6.306,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/wait",
            "value": 1.238,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Startup",
            "value": 43402499,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Exec",
            "value": 23751961,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile",
            "value": 29881939,
            "unit": "ns/op\t2245.80 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile - ns/op",
            "value": 29881939,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile - MB/s",
            "value": 2245.8,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount",
            "value": 29796888,
            "unit": "ns/op\t2252.21 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - ns/op",
            "value": 29796888,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - MB/s",
            "value": 2252.21,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "633d5e618ab04d45e0e39368e0cad2bd4980921f",
          "message": "Fix temporary directories on Windows\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-05-12T20:56:35-04:00",
          "tree_id": "477effc29ea5079f49bf1c9a32f2a559734c9275",
          "url": "https://github.com/dmcgowan/shimtest/commit/633d5e618ab04d45e0e39368e0cad2bd4980921f"
        },
        "date": 1778634068065,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle",
            "value": 49383886,
            "unit": "ns/op\t        26.09 ms/create\t         4.814 ms/delete\t         6.035 ms/kill\t         6.064 ms/shim-start\t         5.379 ms/start\t         1.004 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ns/op",
            "value": 49383886,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/create",
            "value": 26.09,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/delete",
            "value": 4.814,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/kill",
            "value": 6.035,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/shim-start",
            "value": 6.064,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/start",
            "value": 5.379,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/wait",
            "value": 1.004,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Startup",
            "value": 40183048,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Exec",
            "value": 22413401,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile",
            "value": 29824380,
            "unit": "ns/op\t2250.13 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile - ns/op",
            "value": 29824380,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile - MB/s",
            "value": 2250.13,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount",
            "value": 27962090,
            "unit": "ns/op\t2399.99 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - ns/op",
            "value": 27962090,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - MB/s",
            "value": 2399.99,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "fd36ba3f9689b4f2e14787eb71ac90a833ce771b",
          "message": "Update testdata directory for testbin\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-05-27T00:44:01-07:00",
          "tree_id": "ef82e3e46ad2a8b8db20dc03d0e91dd572799384",
          "url": "https://github.com/dmcgowan/shimtest/commit/fd36ba3f9689b4f2e14787eb71ac90a833ce771b"
        },
        "date": 1779868133996,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle",
            "value": 86908991,
            "unit": "ns/op\t        66.26 ms/create\t         4.060 ms/delete\t         4.388 ms/kill\t         6.733 ms/shim-start\t         4.629 ms/start\t         0.8336 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ns/op",
            "value": 86908991,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/create",
            "value": 66.26,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/delete",
            "value": 4.06,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/kill",
            "value": 4.388,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/shim-start",
            "value": 6.733,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/start",
            "value": 4.629,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/wait",
            "value": 0.8336,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Startup",
            "value": 159259356,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Exec",
            "value": 38694814,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile",
            "value": 28863329,
            "unit": "ns/op\t2325.06 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile - ns/op",
            "value": 28863329,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile - MB/s",
            "value": 2325.06,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount",
            "value": 37281682,
            "unit": "ns/op\t1800.05 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - ns/op",
            "value": 37281682,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - MB/s",
            "value": 1800.05,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "7613658cf664183b6229c852ebdfa8985d2add28",
          "message": "Handle updated testbin location in release action\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-05-27T00:49:53-07:00",
          "tree_id": "498212943e54497d7b241d13d66eff67bd27f05c",
          "url": "https://github.com/dmcgowan/shimtest/commit/7613658cf664183b6229c852ebdfa8985d2add28"
        },
        "date": 1779868420358,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle",
            "value": 49291745,
            "unit": "ns/op\t        26.04 ms/create\t         4.989 ms/delete\t         5.935 ms/kill\t         6.212 ms/shim-start\t         5.386 ms/start\t         0.7232 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ns/op",
            "value": 49291745,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/create",
            "value": 26.04,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/delete",
            "value": 4.989,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/kill",
            "value": 5.935,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/shim-start",
            "value": 6.212,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/start",
            "value": 5.386,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/wait",
            "value": 0.7232,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Startup",
            "value": 42491304,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Exec",
            "value": 22965340,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile",
            "value": 28831965,
            "unit": "ns/op\t2327.59 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile - ns/op",
            "value": 28831965,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile - MB/s",
            "value": 2327.59,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount",
            "value": 29179784,
            "unit": "ns/op\t2299.84 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - ns/op",
            "value": 29179784,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - MB/s",
            "value": 2299.84,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "a6c99a9bb2f0e92066ad63974e6c5297119f5c5f",
          "message": "Fix copy from failure\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-05-27T16:55:09-07:00",
          "tree_id": "99cb7fbd0e264ce435b0f465fcfccdbecce1d004",
          "url": "https://github.com/dmcgowan/shimtest/commit/a6c99a9bb2f0e92066ad63974e6c5297119f5c5f"
        },
        "date": 1779926351732,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle",
            "value": 52595396,
            "unit": "ns/op\t        26.82 ms/create\t         5.066 ms/delete\t         6.085 ms/kill\t         8.127 ms/shim-start\t         5.556 ms/start\t         0.9294 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ns/op",
            "value": 52595396,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/create",
            "value": 26.82,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/delete",
            "value": 5.066,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/kill",
            "value": 6.085,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/shim-start",
            "value": 8.127,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/start",
            "value": 5.556,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/wait",
            "value": 0.9294,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Startup",
            "value": 42756450,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Exec",
            "value": 23092385,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile",
            "value": 29268998,
            "unit": "ns/op\t2292.83 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile - ns/op",
            "value": 29268998,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile - MB/s",
            "value": 2292.83,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount",
            "value": 29053687,
            "unit": "ns/op\t2309.82 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - ns/op",
            "value": 29053687,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - MB/s",
            "value": 2309.82,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "8e7da43b1b71cc07c8abe99780a9a4d1672f0e6f",
          "message": "Bump testbinVersion to v0.1.7\n\nThe testbin package was refactored into an importable package\n(github.com/dmcgowan/shimtest/testbin) and burstexit was added in\nv0.1.6 source but the testbinVersion download pointer was never\nupdated. v0.1.7 will publish a binary built from the new package.\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-06-05T15:28:58-07:00",
          "tree_id": "ea48144bb1d8a5181b8d674e89faa7afd087b8d1",
          "url": "https://github.com/dmcgowan/shimtest/commit/8e7da43b1b71cc07c8abe99780a9a4d1672f0e6f"
        },
        "date": 1780698900788,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle",
            "value": 43214299,
            "unit": "ns/op\t        21.08 ms/create\t         4.413 ms/delete\t         4.730 ms/kill\t         7.608 ms/shim-start\t         4.791 ms/start\t         0.5856 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ns/op",
            "value": 43214299,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/create",
            "value": 21.08,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/delete",
            "value": 4.413,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/kill",
            "value": 4.73,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/shim-start",
            "value": 7.608,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/start",
            "value": 4.791,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/wait",
            "value": 0.5856,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Startup",
            "value": 38612407,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Exec",
            "value": 17644911,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile",
            "value": 28093473,
            "unit": "ns/op\t2388.77 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile - ns/op",
            "value": 28093473,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile - MB/s",
            "value": 2388.77,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount",
            "value": 28633679,
            "unit": "ns/op\t2343.70 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - ns/op",
            "value": 28633679,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - MB/s",
            "value": 2343.7,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "e77d6bc026f632820b1331a2da6c55cd02947e51",
          "message": "Update stress timeout handling on macOS\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-06-10T23:52:35-07:00",
          "tree_id": "427f7db6f57a370fcb058a7241bc6c16cff22d21",
          "url": "https://github.com/dmcgowan/shimtest/commit/e77d6bc026f632820b1331a2da6c55cd02947e51"
        },
        "date": 1781161017240,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle",
            "value": 50208657,
            "unit": "ns/op\t        26.26 ms/create\t         5.391 ms/delete\t         5.942 ms/kill\t         5.935 ms/shim-start\t         5.701 ms/start\t         0.9720 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ns/op",
            "value": 50208657,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/create",
            "value": 26.26,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/delete",
            "value": 5.391,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/kill",
            "value": 5.942,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/shim-start",
            "value": 5.935,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/start",
            "value": 5.701,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/wait",
            "value": 0.972,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Startup",
            "value": 43052024,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Exec",
            "value": 23686981,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile",
            "value": 31436693,
            "unit": "ns/op\t2134.73 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile - ns/op",
            "value": 31436693,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile - MB/s",
            "value": 2134.73,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount",
            "value": 29960616,
            "unit": "ns/op\t2239.90 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - ns/op",
            "value": 29960616,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - MB/s",
            "value": 2239.9,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "31c0ccd6ee4db8d3d016259407ad25bbf40adc53",
          "message": "Cleanup shutdown logic further\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-06-11T00:13:51-07:00",
          "tree_id": "2d17c9587201b3b48ca72a85aa0610f619ee850f",
          "url": "https://github.com/dmcgowan/shimtest/commit/31c0ccd6ee4db8d3d016259407ad25bbf40adc53"
        },
        "date": 1781162321298,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle",
            "value": 52315208,
            "unit": "ns/op\t        27.22 ms/create\t         5.177 ms/delete\t         6.141 ms/kill\t         7.096 ms/shim-start\t         5.603 ms/start\t         1.074 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ns/op",
            "value": 52315208,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/create",
            "value": 27.22,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/delete",
            "value": 5.177,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/kill",
            "value": 6.141,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/shim-start",
            "value": 7.096,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/start",
            "value": 5.603,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/wait",
            "value": 1.074,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Startup",
            "value": 42690651,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Exec",
            "value": 23956908,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile",
            "value": 30041201,
            "unit": "ns/op\t2233.89 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile - ns/op",
            "value": 30041201,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile - MB/s",
            "value": 2233.89,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount",
            "value": 31044028,
            "unit": "ns/op\t2161.73 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - ns/op",
            "value": 31044028,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - MB/s",
            "value": 2161.73,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "76cba0bb1bf50d800213f8271652ee399d560c3b",
          "message": "Fix socket path length check for macOS\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-06-11T07:40:47-07:00",
          "tree_id": "864c407728acd8d1028ddc130b67944f9918d6c7",
          "url": "https://github.com/dmcgowan/shimtest/commit/76cba0bb1bf50d800213f8271652ee399d560c3b"
        },
        "date": 1781189293582,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle",
            "value": 43622604,
            "unit": "ns/op\t        22.06 ms/create\t         4.342 ms/delete\t         4.839 ms/kill\t         6.513 ms/shim-start\t         4.781 ms/start\t         1.081 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ns/op",
            "value": 43622604,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/create",
            "value": 22.06,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/delete",
            "value": 4.342,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/kill",
            "value": 4.839,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/shim-start",
            "value": 6.513,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/start",
            "value": 4.781,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/wait",
            "value": 1.081,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Startup",
            "value": 38644216,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Exec",
            "value": 18146688,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile",
            "value": 28594008,
            "unit": "ns/op\t2346.96 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile - ns/op",
            "value": 28594008,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile - MB/s",
            "value": 2346.96,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount",
            "value": 28788788,
            "unit": "ns/op\t2331.08 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - ns/op",
            "value": 28788788,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - MB/s",
            "value": 2331.08,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "264e4a30e9ce39a671eea7a428e9c2d4fbb55118",
          "message": "Implement drainFifoIntoDone on Windows\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-06-13T00:17:03-07:00",
          "tree_id": "3eb8d58b7a19c9ff48bd3cad54752cf1b95b6970",
          "url": "https://github.com/dmcgowan/shimtest/commit/264e4a30e9ce39a671eea7a428e9c2d4fbb55118"
        },
        "date": 1781335564120,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle",
            "value": 50103160,
            "unit": "ns/op\t        26.55 ms/create\t         5.009 ms/delete\t         5.795 ms/kill\t         6.315 ms/shim-start\t         5.714 ms/start\t         0.7148 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ns/op",
            "value": 50103160,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/create",
            "value": 26.55,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/delete",
            "value": 5.009,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/kill",
            "value": 5.795,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/shim-start",
            "value": 6.315,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/start",
            "value": 5.714,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Lifecycle - ms/wait",
            "value": 0.7148,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Startup",
            "value": 43368867,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/Exec",
            "value": 22398576,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile",
            "value": 29735496,
            "unit": "ns/op\t2256.86 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile - ns/op",
            "value": 29735496,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadLargeFile - MB/s",
            "value": 2256.86,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount",
            "value": 29672831,
            "unit": "ns/op\t2261.63 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - ns/op",
            "value": 29672831,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc-rootless/ReadBindMount - MB/s",
            "value": 2261.63,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      }
    ],
    "runc root / containerd main": [
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "4b1b14b5b9861b9a70092519ab5bd80d508f4304",
          "message": "Add benchmark tests to CI\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-04-23T23:13:35-07:00",
          "tree_id": "3bd41e4f0cdca832a4ec76753b44e77b5aba1e05",
          "url": "https://github.com/dmcgowan/shimtest/commit/4b1b14b5b9861b9a70092519ab5bd80d508f4304"
        },
        "date": 1777011993966,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc/Lifecycle",
            "value": 170180362,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Startup",
            "value": 37321752,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Exec",
            "value": 12582332,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile",
            "value": 20099809,
            "unit": "ns/op\t3338.78 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile - ns/op",
            "value": 20099809,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile - MB/s",
            "value": 3338.78,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount",
            "value": 19856771,
            "unit": "ns/op\t3379.65 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount - ns/op",
            "value": 19856771,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount - MB/s",
            "value": 3379.65,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "8841bcbdf84559d7e5332a72cbbf956a281907b7",
          "message": "Avoid using systemdcgroup to get similar setup as rootless\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-04-24T00:06:45-07:00",
          "tree_id": "c21005793be2f9e0188ad2b251dc67b78f366ef9",
          "url": "https://github.com/dmcgowan/shimtest/commit/8841bcbdf84559d7e5332a72cbbf956a281907b7"
        },
        "date": 1777014654344,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc/Lifecycle",
            "value": 194967942,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Startup",
            "value": 33696143,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Exec",
            "value": 10912891,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile",
            "value": 22376708,
            "unit": "ns/op\t2999.05 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile - ns/op",
            "value": 22376708,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile - MB/s",
            "value": 2999.05,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount",
            "value": 21933560,
            "unit": "ns/op\t3059.64 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount - ns/op",
            "value": 21933560,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount - MB/s",
            "value": 3059.64,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "0476a1bfbe8c32f6ef3e8a044b19a5f508aee5ec",
          "message": "Fix socket paths being too long on macOS\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-04-24T17:15:07-07:00",
          "tree_id": "6feffccb8d382aad5adaba1789b40e2faf6d83f4",
          "url": "https://github.com/dmcgowan/shimtest/commit/0476a1bfbe8c32f6ef3e8a044b19a5f508aee5ec"
        },
        "date": 1777076359547,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc/Lifecycle",
            "value": 175234901,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Startup",
            "value": 36120238,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Exec",
            "value": 12901932,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile",
            "value": 20258785,
            "unit": "ns/op\t3312.58 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile - ns/op",
            "value": 20258785,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile - MB/s",
            "value": 3312.58,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount",
            "value": 19884935,
            "unit": "ns/op\t3374.86 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount - ns/op",
            "value": 19884935,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount - MB/s",
            "value": 3374.86,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "d588a40cce0c11b5d3b3420772f7171a25d0dd40",
          "message": "Add instructions for how to setup Github actions with shimtest\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-04-25T00:58:15-07:00",
          "tree_id": "fd8e8c540cc88c1f031fe20ba6ac65020be3ea8a",
          "url": "https://github.com/dmcgowan/shimtest/commit/d588a40cce0c11b5d3b3420772f7171a25d0dd40"
        },
        "date": 1777104094711,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc/Lifecycle",
            "value": 174319366,
            "unit": "ns/op\t        21.83 ms/create\t       127.9 ms/delete\t         5.436 ms/kill\t         8.172 ms/shim-start\t         5.490 ms/start\t         5.445 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ns/op",
            "value": 174319366,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/create",
            "value": 21.83,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/delete",
            "value": 127.9,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/kill",
            "value": 5.436,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/shim-start",
            "value": 8.172,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/start",
            "value": 5.49,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/wait",
            "value": 5.445,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Startup",
            "value": 39264799,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Exec",
            "value": 12606556,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile",
            "value": 19590141,
            "unit": "ns/op\t3425.64 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile - ns/op",
            "value": 19590141,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile - MB/s",
            "value": 3425.64,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount",
            "value": 20089520,
            "unit": "ns/op\t3340.49 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount - ns/op",
            "value": 20089520,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount - MB/s",
            "value": 3340.49,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "ada1246fb1020406703f346d16c3f20a0c3df635",
          "message": "Add stress tests\n\nThese tests currently fail with nerdbox but will help find a solution\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-04-30T11:05:02-07:00",
          "tree_id": "99710c7414bf76dac00c98b5d9f9acd6b7d90aea",
          "url": "https://github.com/dmcgowan/shimtest/commit/ada1246fb1020406703f346d16c3f20a0c3df635"
        },
        "date": 1777573060536,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc/Lifecycle",
            "value": 178000962,
            "unit": "ns/op\t        21.82 ms/create\t       133.6 ms/delete\t         5.995 ms/kill\t         4.730 ms/shim-start\t         6.059 ms/start\t         5.806 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ns/op",
            "value": 178000962,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/create",
            "value": 21.82,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/delete",
            "value": 133.6,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/kill",
            "value": 5.995,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/shim-start",
            "value": 4.73,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/start",
            "value": 6.059,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/wait",
            "value": 5.806,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Startup",
            "value": 34002722,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Exec",
            "value": 14533667,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile",
            "value": 20920025,
            "unit": "ns/op\t3207.88 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile - ns/op",
            "value": 20920025,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile - MB/s",
            "value": 3207.88,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount",
            "value": 20547628,
            "unit": "ns/op\t3266.02 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount - ns/op",
            "value": 20547628,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount - MB/s",
            "value": 3266.02,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "7c48d3a2ba7d0e3d0a7464b20d1783f51397a771",
          "message": "Wait for all topics to finish before sending shutdown\n\nA failure could occur on shutdown from a runner being slightly too slow.\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-05-01T16:02:24-07:00",
          "tree_id": "37faab4d44a7c99ce5a89b6730bd96d7af695543",
          "url": "https://github.com/dmcgowan/shimtest/commit/7c48d3a2ba7d0e3d0a7464b20d1783f51397a771"
        },
        "date": 1777676842123,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc/Lifecycle",
            "value": 180759655,
            "unit": "ns/op\t        19.63 ms/create\t       140.3 ms/delete\t         5.670 ms/kill\t         4.701 ms/shim-start\t         5.380 ms/start\t         5.115 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ns/op",
            "value": 180759655,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/create",
            "value": 19.63,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/delete",
            "value": 140.3,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/kill",
            "value": 5.67,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/shim-start",
            "value": 4.701,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/start",
            "value": 5.38,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/wait",
            "value": 5.115,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Startup",
            "value": 33407896,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Exec",
            "value": 12270974,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile",
            "value": 19187429,
            "unit": "ns/op\t3497.54 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile - ns/op",
            "value": 19187429,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile - MB/s",
            "value": 3497.54,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount",
            "value": 19060692,
            "unit": "ns/op\t3520.80 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount - ns/op",
            "value": 19060692,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount - MB/s",
            "value": 3520.8,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "55a7e35d9f44c30b2ef0570e055a8f43c29bfc80",
          "message": "Fix shim leaks during longer running tests\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-05-02T07:41:36-07:00",
          "tree_id": "64851ac8d1af239f941a652ba828b87a922b670a",
          "url": "https://github.com/dmcgowan/shimtest/commit/55a7e35d9f44c30b2ef0570e055a8f43c29bfc80"
        },
        "date": 1777733139959,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc/Lifecycle",
            "value": 183605999,
            "unit": "ns/op\t        21.36 ms/create\t       139.7 ms/delete\t         5.454 ms/kill\t         6.302 ms/shim-start\t         5.318 ms/start\t         5.475 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ns/op",
            "value": 183605999,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/create",
            "value": 21.36,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/delete",
            "value": 139.7,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/kill",
            "value": 5.454,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/shim-start",
            "value": 6.302,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/start",
            "value": 5.318,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/wait",
            "value": 5.475,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Startup",
            "value": 37754559,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Exec",
            "value": 13088183,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile",
            "value": 19352998,
            "unit": "ns/op\t3467.62 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile - ns/op",
            "value": 19352998,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile - MB/s",
            "value": 3467.62,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount",
            "value": 19160074,
            "unit": "ns/op\t3502.54 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount - ns/op",
            "value": 19160074,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount - MB/s",
            "value": 3502.54,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "13a86f5d6435571a2d9a493beb01d240886dfae5",
          "message": "Cycle through added files to ensure space does not fill up during stress\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-05-02T16:05:13-07:00",
          "tree_id": "55c35e43ce96694ae65944764a5da94535b44b32",
          "url": "https://github.com/dmcgowan/shimtest/commit/13a86f5d6435571a2d9a493beb01d240886dfae5"
        },
        "date": 1777763364036,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc/Lifecycle",
            "value": 166873532,
            "unit": "ns/op\t        21.47 ms/create\t       122.1 ms/delete\t         6.443 ms/kill\t         6.210 ms/shim-start\t         5.491 ms/start\t         5.152 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ns/op",
            "value": 166873532,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/create",
            "value": 21.47,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/delete",
            "value": 122.1,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/kill",
            "value": 6.443,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/shim-start",
            "value": 6.21,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/start",
            "value": 5.491,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/wait",
            "value": 5.152,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Startup",
            "value": 35431503,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Exec",
            "value": 13378699,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile",
            "value": 19602461,
            "unit": "ns/op\t3423.49 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile - ns/op",
            "value": 19602461,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile - MB/s",
            "value": 3423.49,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount",
            "value": 20357419,
            "unit": "ns/op\t3296.53 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount - ns/op",
            "value": 20357419,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount - MB/s",
            "value": 3296.53,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "3e7494c6c2fde0be0ef3223016c5490a0d1d82b9",
          "message": "Update ttrpc version to fix deadlock\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-05-02T23:46:47-07:00",
          "tree_id": "5d798025c38f86d4ab6af32b88411a3f66bbe1a2",
          "url": "https://github.com/dmcgowan/shimtest/commit/3e7494c6c2fde0be0ef3223016c5490a0d1d82b9"
        },
        "date": 1777791252039,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc/Lifecycle",
            "value": 179058105,
            "unit": "ns/op\t        22.25 ms/create\t       131.7 ms/delete\t         6.234 ms/kill\t         7.024 ms/shim-start\t         5.853 ms/start\t         5.988 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ns/op",
            "value": 179058105,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/create",
            "value": 22.25,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/delete",
            "value": 131.7,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/kill",
            "value": 6.234,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/shim-start",
            "value": 7.024,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/start",
            "value": 5.853,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/wait",
            "value": 5.988,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Startup",
            "value": 38356158,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Exec",
            "value": 14920995,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile",
            "value": 20160045,
            "unit": "ns/op\t3328.81 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile - ns/op",
            "value": 20160045,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile - MB/s",
            "value": 3328.81,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount",
            "value": 20595233,
            "unit": "ns/op\t3258.47 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount - ns/op",
            "value": 20595233,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount - MB/s",
            "value": 3258.47,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "de45369ce617e311a7f19ec419ee73ec13fde898",
          "message": "Add 100 layer test\n\nAdd test for 100 layers and benchmark with 30 layers.\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-05-08T20:49:11-07:00",
          "tree_id": "8c8d06910350cd14d1d7afc8b2035e6d16cb2b80",
          "url": "https://github.com/dmcgowan/shimtest/commit/de45369ce617e311a7f19ec419ee73ec13fde898"
        },
        "date": 1778298804852,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc/Lifecycle",
            "value": 174109995,
            "unit": "ns/op\t        21.41 ms/create\t       127.5 ms/delete\t         6.231 ms/kill\t         7.990 ms/shim-start\t         5.363 ms/start\t         5.660 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ns/op",
            "value": 174109995,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/create",
            "value": 21.41,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/delete",
            "value": 127.5,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/kill",
            "value": 6.231,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/shim-start",
            "value": 7.99,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/start",
            "value": 5.363,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/wait",
            "value": 5.66,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Startup",
            "value": 35325943,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Exec",
            "value": 13767438,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile",
            "value": 19777529,
            "unit": "ns/op\t3393.19 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile - ns/op",
            "value": 19777529,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile - MB/s",
            "value": 3393.19,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount",
            "value": 19436549,
            "unit": "ns/op\t3452.72 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount - ns/op",
            "value": 19436549,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount - MB/s",
            "value": 3452.72,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "930837a1140cd588254dc5f4b92f8a00bac37d4f",
          "message": "Updates to stress test to be more reliable\n\nExpand memory growth allowance.\nSuppress known non-fatal issues on shutdown.\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-05-10T23:54:42-07:00",
          "tree_id": "e238de2ec82a3ef1350641ddcc23e6baf21a324a",
          "url": "https://github.com/dmcgowan/shimtest/commit/930837a1140cd588254dc5f4b92f8a00bac37d4f"
        },
        "date": 1778482797398,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc/Lifecycle",
            "value": 167018740,
            "unit": "ns/op\t        22.43 ms/create\t       122.0 ms/delete\t         6.242 ms/kill\t         5.102 ms/shim-start\t         5.200 ms/start\t         6.051 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ns/op",
            "value": 167018740,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/create",
            "value": 22.43,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/delete",
            "value": 122,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/kill",
            "value": 6.242,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/shim-start",
            "value": 5.102,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/start",
            "value": 5.2,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/wait",
            "value": 6.051,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Startup",
            "value": 35000879,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Exec",
            "value": 12802752,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile",
            "value": 20320723,
            "unit": "ns/op\t3302.48 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile - ns/op",
            "value": 20320723,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile - MB/s",
            "value": 3302.48,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount",
            "value": 21048339,
            "unit": "ns/op\t3188.32 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount - ns/op",
            "value": 21048339,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount - MB/s",
            "value": 3188.32,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "f6f1d1ac06f34430c9b787c8bad90680a5cf5133",
          "message": "Makefile: use .exe extension for test binary on Windows\n\ngo test -c produces a binary without an extension by default (Linux\nconvention). On Windows executables must end in .exe to be runnable\ndirectly. Detect OS=Windows_NT and set TEST_BINARY accordingly.\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-05-12T18:51:42-04:00",
          "tree_id": "9fbaa25006a5194e363f58756a7cc28a5d18c111",
          "url": "https://github.com/dmcgowan/shimtest/commit/f6f1d1ac06f34430c9b787c8bad90680a5cf5133"
        },
        "date": 1778630851726,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc/Lifecycle",
            "value": 67616572,
            "unit": "ns/op\t        22.27 ms/create\t        22.10 ms/delete\t         6.278 ms/kill\t         4.751 ms/shim-start\t         6.189 ms/start\t         6.025 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ns/op",
            "value": 67616572,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/create",
            "value": 22.27,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/delete",
            "value": 22.1,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/kill",
            "value": 6.278,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/shim-start",
            "value": 4.751,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/start",
            "value": 6.189,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/wait",
            "value": 6.025,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Startup",
            "value": 35486668,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Exec",
            "value": 14670099,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile",
            "value": 20086092,
            "unit": "ns/op\t3341.06 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile - ns/op",
            "value": 20086092,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile - MB/s",
            "value": 3341.06,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount",
            "value": 20806971,
            "unit": "ns/op\t3225.31 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount - ns/op",
            "value": 20806971,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount - MB/s",
            "value": 3225.31,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "633d5e618ab04d45e0e39368e0cad2bd4980921f",
          "message": "Fix temporary directories on Windows\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-05-12T20:56:35-04:00",
          "tree_id": "477effc29ea5079f49bf1c9a32f2a559734c9275",
          "url": "https://github.com/dmcgowan/shimtest/commit/633d5e618ab04d45e0e39368e0cad2bd4980921f"
        },
        "date": 1778634070774,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc/Lifecycle",
            "value": 72418802,
            "unit": "ns/op\t        20.30 ms/create\t        32.30 ms/delete\t         5.742 ms/kill\t         3.613 ms/shim-start\t         5.054 ms/start\t         5.413 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ns/op",
            "value": 72418802,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/create",
            "value": 20.3,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/delete",
            "value": 32.3,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/kill",
            "value": 5.742,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/shim-start",
            "value": 3.613,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/start",
            "value": 5.054,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/wait",
            "value": 5.413,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Startup",
            "value": 30929964,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Exec",
            "value": 12924667,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile",
            "value": 18952609,
            "unit": "ns/op\t3540.88 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile - ns/op",
            "value": 18952609,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile - MB/s",
            "value": 3540.88,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount",
            "value": 19112597,
            "unit": "ns/op\t3511.24 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount - ns/op",
            "value": 19112597,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount - MB/s",
            "value": 3511.24,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "fd36ba3f9689b4f2e14787eb71ac90a833ce771b",
          "message": "Update testdata directory for testbin\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-05-27T00:44:01-07:00",
          "tree_id": "ef82e3e46ad2a8b8db20dc03d0e91dd572799384",
          "url": "https://github.com/dmcgowan/shimtest/commit/fd36ba3f9689b4f2e14787eb71ac90a833ce771b"
        },
        "date": 1779868135491,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc/Lifecycle",
            "value": 284349344,
            "unit": "ns/op\t        19.51 ms/create\t       247.5 ms/delete\t         4.227 ms/kill\t         4.535 ms/shim-start\t         4.340 ms/start\t         4.216 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ns/op",
            "value": 284349344,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/create",
            "value": 19.51,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/delete",
            "value": 247.5,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/kill",
            "value": 4.227,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/shim-start",
            "value": 4.535,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/start",
            "value": 4.34,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/wait",
            "value": 4.216,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Startup",
            "value": 26105744,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Exec",
            "value": 50324113,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile",
            "value": 37867814,
            "unit": "ns/op\t1772.19 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile - ns/op",
            "value": 37867814,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile - MB/s",
            "value": 1772.19,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount",
            "value": 17490918,
            "unit": "ns/op\t3836.78 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount - ns/op",
            "value": 17490918,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount - MB/s",
            "value": 3836.78,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "7613658cf664183b6229c852ebdfa8985d2add28",
          "message": "Handle updated testbin location in release action\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-05-27T00:49:53-07:00",
          "tree_id": "498212943e54497d7b241d13d66eff67bd27f05c",
          "url": "https://github.com/dmcgowan/shimtest/commit/7613658cf664183b6229c852ebdfa8985d2add28"
        },
        "date": 1779868421499,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc/Lifecycle",
            "value": 73669670,
            "unit": "ns/op\t        20.26 ms/create\t        32.83 ms/delete\t         5.820 ms/kill\t         4.508 ms/shim-start\t         4.998 ms/start\t         5.255 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ns/op",
            "value": 73669670,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/create",
            "value": 20.26,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/delete",
            "value": 32.83,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/kill",
            "value": 5.82,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/shim-start",
            "value": 4.508,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/start",
            "value": 4.998,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/wait",
            "value": 5.255,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Startup",
            "value": 30432670,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Exec",
            "value": 12705398,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile",
            "value": 19704173,
            "unit": "ns/op\t3405.82 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile - ns/op",
            "value": 19704173,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile - MB/s",
            "value": 3405.82,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount",
            "value": 19717475,
            "unit": "ns/op\t3403.52 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount - ns/op",
            "value": 19717475,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount - MB/s",
            "value": 3403.52,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "a6c99a9bb2f0e92066ad63974e6c5297119f5c5f",
          "message": "Fix copy from failure\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-05-27T16:55:09-07:00",
          "tree_id": "99cb7fbd0e264ce435b0f465fcfccdbecce1d004",
          "url": "https://github.com/dmcgowan/shimtest/commit/a6c99a9bb2f0e92066ad63974e6c5297119f5c5f"
        },
        "date": 1779926353502,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc/Lifecycle",
            "value": 72668764,
            "unit": "ns/op\t        21.76 ms/create\t        31.16 ms/delete\t         5.412 ms/kill\t         3.549 ms/shim-start\t         5.272 ms/start\t         5.510 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ns/op",
            "value": 72668764,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/create",
            "value": 21.76,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/delete",
            "value": 31.16,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/kill",
            "value": 5.412,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/shim-start",
            "value": 3.549,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/start",
            "value": 5.272,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/wait",
            "value": 5.51,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Startup",
            "value": 31152318,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Exec",
            "value": 12825181,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile",
            "value": 19939733,
            "unit": "ns/op\t3365.58 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile - ns/op",
            "value": 19939733,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile - MB/s",
            "value": 3365.58,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount",
            "value": 19488112,
            "unit": "ns/op\t3443.58 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount - ns/op",
            "value": 19488112,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount - MB/s",
            "value": 3443.58,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "8e7da43b1b71cc07c8abe99780a9a4d1672f0e6f",
          "message": "Bump testbinVersion to v0.1.7\n\nThe testbin package was refactored into an importable package\n(github.com/dmcgowan/shimtest/testbin) and burstexit was added in\nv0.1.6 source but the testbinVersion download pointer was never\nupdated. v0.1.7 will publish a binary built from the new package.\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-06-05T15:28:58-07:00",
          "tree_id": "ea48144bb1d8a5181b8d674e89faa7afd087b8d1",
          "url": "https://github.com/dmcgowan/shimtest/commit/8e7da43b1b71cc07c8abe99780a9a4d1672f0e6f"
        },
        "date": 1780698901976,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc/Lifecycle",
            "value": 70068979,
            "unit": "ns/op\t        18.18 ms/create\t        33.71 ms/delete\t         4.670 ms/kill\t         4.435 ms/shim-start\t         4.324 ms/start\t         4.747 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ns/op",
            "value": 70068979,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/create",
            "value": 18.18,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/delete",
            "value": 33.71,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/kill",
            "value": 4.67,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/shim-start",
            "value": 4.435,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/start",
            "value": 4.324,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/wait",
            "value": 4.747,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Startup",
            "value": 28947312,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Exec",
            "value": 10985398,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile",
            "value": 21637194,
            "unit": "ns/op\t3101.55 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile - ns/op",
            "value": 21637194,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile - MB/s",
            "value": 3101.55,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount",
            "value": 22694906,
            "unit": "ns/op\t2957.00 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount - ns/op",
            "value": 22694906,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount - MB/s",
            "value": 2957,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "e77d6bc026f632820b1331a2da6c55cd02947e51",
          "message": "Update stress timeout handling on macOS\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-06-10T23:52:35-07:00",
          "tree_id": "427f7db6f57a370fcb058a7241bc6c16cff22d21",
          "url": "https://github.com/dmcgowan/shimtest/commit/e77d6bc026f632820b1331a2da6c55cd02947e51"
        },
        "date": 1781161018338,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc/Lifecycle",
            "value": 72471336,
            "unit": "ns/op\t        19.69 ms/create\t        33.43 ms/delete\t         5.396 ms/kill\t         3.525 ms/shim-start\t         5.200 ms/start\t         5.227 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ns/op",
            "value": 72471336,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/create",
            "value": 19.69,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/delete",
            "value": 33.43,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/kill",
            "value": 5.396,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/shim-start",
            "value": 3.525,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/start",
            "value": 5.2,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/wait",
            "value": 5.227,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Startup",
            "value": 32909140,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Exec",
            "value": 13120080,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile",
            "value": 20135925,
            "unit": "ns/op\t3332.79 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile - ns/op",
            "value": 20135925,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile - MB/s",
            "value": 3332.79,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount",
            "value": 19510027,
            "unit": "ns/op\t3439.71 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount - ns/op",
            "value": 19510027,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount - MB/s",
            "value": 3439.71,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "31c0ccd6ee4db8d3d016259407ad25bbf40adc53",
          "message": "Cleanup shutdown logic further\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-06-11T00:13:51-07:00",
          "tree_id": "2d17c9587201b3b48ca72a85aa0610f619ee850f",
          "url": "https://github.com/dmcgowan/shimtest/commit/31c0ccd6ee4db8d3d016259407ad25bbf40adc53"
        },
        "date": 1781162322437,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc/Lifecycle",
            "value": 74383356,
            "unit": "ns/op\t        21.27 ms/create\t        31.80 ms/delete\t         5.994 ms/kill\t         4.191 ms/shim-start\t         5.440 ms/start\t         5.686 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ns/op",
            "value": 74383356,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/create",
            "value": 21.27,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/delete",
            "value": 31.8,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/kill",
            "value": 5.994,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/shim-start",
            "value": 4.191,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/start",
            "value": 5.44,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/wait",
            "value": 5.686,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Startup",
            "value": 34396318,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Exec",
            "value": 13896778,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile",
            "value": 19785859,
            "unit": "ns/op\t3391.76 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile - ns/op",
            "value": 19785859,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile - MB/s",
            "value": 3391.76,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount",
            "value": 20075813,
            "unit": "ns/op\t3342.77 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount - ns/op",
            "value": 20075813,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount - MB/s",
            "value": 3342.77,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "76cba0bb1bf50d800213f8271652ee399d560c3b",
          "message": "Fix socket path length check for macOS\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-06-11T07:40:47-07:00",
          "tree_id": "864c407728acd8d1028ddc130b67944f9918d6c7",
          "url": "https://github.com/dmcgowan/shimtest/commit/76cba0bb1bf50d800213f8271652ee399d560c3b"
        },
        "date": 1781189295104,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc/Lifecycle",
            "value": 72979725,
            "unit": "ns/op\t        19.77 ms/create\t        33.71 ms/delete\t         4.699 ms/kill\t         4.753 ms/shim-start\t         4.993 ms/start\t         5.051 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ns/op",
            "value": 72979725,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/create",
            "value": 19.77,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/delete",
            "value": 33.71,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/kill",
            "value": 4.699,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/shim-start",
            "value": 4.753,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/start",
            "value": 4.993,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/wait",
            "value": 5.051,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Startup",
            "value": 28493950,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Exec",
            "value": 11105047,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile",
            "value": 22793139,
            "unit": "ns/op\t2944.26 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile - ns/op",
            "value": 22793139,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile - MB/s",
            "value": 2944.26,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount",
            "value": 22826836,
            "unit": "ns/op\t2939.91 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount - ns/op",
            "value": 22826836,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount - MB/s",
            "value": 2939.91,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "264e4a30e9ce39a671eea7a428e9c2d4fbb55118",
          "message": "Implement drainFifoIntoDone on Windows\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-06-13T00:17:03-07:00",
          "tree_id": "3eb8d58b7a19c9ff48bd3cad54752cf1b95b6970",
          "url": "https://github.com/dmcgowan/shimtest/commit/264e4a30e9ce39a671eea7a428e9c2d4fbb55118"
        },
        "date": 1781335565204,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/runc/Lifecycle",
            "value": 74025766,
            "unit": "ns/op\t        21.00 ms/create\t        30.81 ms/delete\t         6.197 ms/kill\t         4.795 ms/shim-start\t         5.645 ms/start\t         5.572 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ns/op",
            "value": 74025766,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/create",
            "value": 21,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/delete",
            "value": 30.81,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/kill",
            "value": 6.197,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/shim-start",
            "value": 4.795,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/start",
            "value": 5.645,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Lifecycle - ms/wait",
            "value": 5.572,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Startup",
            "value": 35328703,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/Exec",
            "value": 13047113,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile",
            "value": 20895516,
            "unit": "ns/op\t3211.64 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile - ns/op",
            "value": 20895516,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadLargeFile - MB/s",
            "value": 3211.64,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount",
            "value": 19775152,
            "unit": "ns/op\t3393.60 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount - ns/op",
            "value": 19775152,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/runc/ReadBindMount - MB/s",
            "value": 3393.6,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      }
    ],
    "nerdbox (main)": [
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "4b1b14b5b9861b9a70092519ab5bd80d508f4304",
          "message": "Add benchmark tests to CI\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-04-23T23:13:35-07:00",
          "tree_id": "3bd41e4f0cdca832a4ec76753b44e77b5aba1e05",
          "url": "https://github.com/dmcgowan/shimtest/commit/4b1b14b5b9861b9a70092519ab5bd80d508f4304"
        },
        "date": 1777011994901,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle",
            "value": 225037512,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Startup",
            "value": 208084877,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Exec",
            "value": 10263125,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadLargeFile",
            "value": 27111588,
            "unit": "ns/op\t2475.28 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadLargeFile - ns/op",
            "value": 27111588,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadLargeFile - MB/s",
            "value": 2475.28,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadBindMount",
            "value": 82886673,
            "unit": "ns/op\t 809.65 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadBindMount - ns/op",
            "value": 82886673,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadBindMount - MB/s",
            "value": 809.65,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "8841bcbdf84559d7e5332a72cbbf956a281907b7",
          "message": "Avoid using systemdcgroup to get similar setup as rootless\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-04-24T00:06:45-07:00",
          "tree_id": "c21005793be2f9e0188ad2b251dc67b78f366ef9",
          "url": "https://github.com/dmcgowan/shimtest/commit/8841bcbdf84559d7e5332a72cbbf956a281907b7"
        },
        "date": 1777014655182,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle",
            "value": 226465890,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Startup",
            "value": 166749317,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Exec",
            "value": 8090695,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadLargeFile",
            "value": 21988948,
            "unit": "ns/op\t3051.94 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadLargeFile - ns/op",
            "value": 21988948,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadLargeFile - MB/s",
            "value": 3051.94,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadBindMount",
            "value": 55005923,
            "unit": "ns/op\t1220.03 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadBindMount - ns/op",
            "value": 55005923,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadBindMount - MB/s",
            "value": 1220.03,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "0476a1bfbe8c32f6ef3e8a044b19a5f508aee5ec",
          "message": "Fix socket paths being too long on macOS\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-04-24T17:15:07-07:00",
          "tree_id": "6feffccb8d382aad5adaba1789b40e2faf6d83f4",
          "url": "https://github.com/dmcgowan/shimtest/commit/0476a1bfbe8c32f6ef3e8a044b19a5f508aee5ec"
        },
        "date": 1777076360370,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle",
            "value": 389120720,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Startup",
            "value": 379686026,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Exec",
            "value": 8796863,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadLargeFile",
            "value": 21465992,
            "unit": "ns/op\t3126.29 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadLargeFile - ns/op",
            "value": 21465992,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadLargeFile - MB/s",
            "value": 3126.29,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadBindMount",
            "value": 58704211,
            "unit": "ns/op\t1143.17 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadBindMount - ns/op",
            "value": 58704211,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadBindMount - MB/s",
            "value": 1143.17,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "d588a40cce0c11b5d3b3420772f7171a25d0dd40",
          "message": "Add instructions for how to setup Github actions with shimtest\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-04-25T00:58:15-07:00",
          "tree_id": "fd8e8c540cc88c1f031fe20ba6ac65020be3ea8a",
          "url": "https://github.com/dmcgowan/shimtest/commit/d588a40cce0c11b5d3b3420772f7171a25d0dd40"
        },
        "date": 1777104095518,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle",
            "value": 214669583,
            "unit": "ns/op\t       188.5 ms/create\t         5.340 ms/delete\t         4.622 ms/kill\t         8.574 ms/shim-start\t         4.164 ms/start\t         3.450 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ns/op",
            "value": 214669583,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/create",
            "value": 188.5,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/delete",
            "value": 5.34,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/kill",
            "value": 4.622,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/shim-start",
            "value": 8.574,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/start",
            "value": 4.164,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/wait",
            "value": 3.45,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Startup",
            "value": 204815694,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Exec",
            "value": 8234230,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadLargeFile",
            "value": 26341051,
            "unit": "ns/op\t2547.69 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadLargeFile - ns/op",
            "value": 26341051,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadLargeFile - MB/s",
            "value": 2547.69,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadBindMount",
            "value": 56197044,
            "unit": "ns/op\t1194.17 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadBindMount - ns/op",
            "value": 56197044,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadBindMount - MB/s",
            "value": 1194.17,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "ada1246fb1020406703f346d16c3f20a0c3df635",
          "message": "Add stress tests\n\nThese tests currently fail with nerdbox but will help find a solution\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-04-30T11:05:02-07:00",
          "tree_id": "99710c7414bf76dac00c98b5d9f9acd6b7d90aea",
          "url": "https://github.com/dmcgowan/shimtest/commit/ada1246fb1020406703f346d16c3f20a0c3df635"
        },
        "date": 1777573061584,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle",
            "value": 220473974,
            "unit": "ns/op\t       191.0 ms/create\t         5.742 ms/delete\t         6.195 ms/kill\t         7.657 ms/shim-start\t         5.273 ms/start\t         4.639 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ns/op",
            "value": 220473974,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/create",
            "value": 191,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/delete",
            "value": 5.742,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/kill",
            "value": 6.195,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/shim-start",
            "value": 7.657,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/start",
            "value": 5.273,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/wait",
            "value": 4.639,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Startup",
            "value": 207249622,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Exec",
            "value": 10976801,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadLargeFile",
            "value": 27678556,
            "unit": "ns/op\t2424.58 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadLargeFile - ns/op",
            "value": 27678556,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadLargeFile - MB/s",
            "value": 2424.58,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadBindMount",
            "value": 76558114,
            "unit": "ns/op\t 876.57 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadBindMount - ns/op",
            "value": 76558114,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadBindMount - MB/s",
            "value": 876.57,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "7c48d3a2ba7d0e3d0a7464b20d1783f51397a771",
          "message": "Wait for all topics to finish before sending shutdown\n\nA failure could occur on shutdown from a runner being slightly too slow.\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-05-01T16:02:24-07:00",
          "tree_id": "37faab4d44a7c99ce5a89b6730bd96d7af695543",
          "url": "https://github.com/dmcgowan/shimtest/commit/7c48d3a2ba7d0e3d0a7464b20d1783f51397a771"
        },
        "date": 1777676843840,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle",
            "value": 226147111,
            "unit": "ns/op\t       191.8 ms/create\t         5.624 ms/delete\t         6.327 ms/kill\t         9.215 ms/shim-start\t         5.157 ms/start\t         7.993 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ns/op",
            "value": 226147111,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/create",
            "value": 191.8,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/delete",
            "value": 5.624,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/kill",
            "value": 6.327,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/shim-start",
            "value": 9.215,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/start",
            "value": 5.157,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/wait",
            "value": 7.993,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Startup",
            "value": 230931401,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Exec",
            "value": 10232090,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadLargeFile",
            "value": 29026828,
            "unit": "ns/op\t2311.96 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadLargeFile - ns/op",
            "value": 29026828,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadLargeFile - MB/s",
            "value": 2311.96,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadBindMount",
            "value": 76069615,
            "unit": "ns/op\t 882.20 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadBindMount - ns/op",
            "value": 76069615,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadBindMount - MB/s",
            "value": 882.2,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "55a7e35d9f44c30b2ef0570e055a8f43c29bfc80",
          "message": "Fix shim leaks during longer running tests\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-05-02T07:41:36-07:00",
          "tree_id": "64851ac8d1af239f941a652ba828b87a922b670a",
          "url": "https://github.com/dmcgowan/shimtest/commit/55a7e35d9f44c30b2ef0570e055a8f43c29bfc80"
        },
        "date": 1777733141509,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle",
            "value": 220990630,
            "unit": "ns/op\t       190.3 ms/create\t         5.661 ms/delete\t         7.610 ms/kill\t         7.164 ms/shim-start\t         5.345 ms/start\t         4.860 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ns/op",
            "value": 220990630,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/create",
            "value": 190.3,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/delete",
            "value": 5.661,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/kill",
            "value": 7.61,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/shim-start",
            "value": 7.164,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/start",
            "value": 5.345,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/wait",
            "value": 4.86,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Startup",
            "value": 217339064,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Exec",
            "value": 10805562,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadLargeFile",
            "value": 29165641,
            "unit": "ns/op\t2300.96 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadLargeFile - ns/op",
            "value": 29165641,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadLargeFile - MB/s",
            "value": 2300.96,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadBindMount",
            "value": 77414915,
            "unit": "ns/op\t 866.87 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadBindMount - ns/op",
            "value": 77414915,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadBindMount - MB/s",
            "value": 866.87,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "13a86f5d6435571a2d9a493beb01d240886dfae5",
          "message": "Cycle through added files to ensure space does not fill up during stress\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-05-02T16:05:13-07:00",
          "tree_id": "55c35e43ce96694ae65944764a5da94535b44b32",
          "url": "https://github.com/dmcgowan/shimtest/commit/13a86f5d6435571a2d9a493beb01d240886dfae5"
        },
        "date": 1777763365047,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle",
            "value": 220641746,
            "unit": "ns/op\t       187.8 ms/create\t         5.689 ms/delete\t         6.767 ms/kill\t         7.822 ms/shim-start\t         5.009 ms/start\t         7.565 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ns/op",
            "value": 220641746,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/create",
            "value": 187.8,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/delete",
            "value": 5.689,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/kill",
            "value": 6.767,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/shim-start",
            "value": 7.822,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/start",
            "value": 5.009,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/wait",
            "value": 7.565,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Startup",
            "value": 206603965,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Exec",
            "value": 10877721,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadLargeFile",
            "value": 26550290,
            "unit": "ns/op\t2527.61 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadLargeFile - ns/op",
            "value": 26550290,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadLargeFile - MB/s",
            "value": 2527.61,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadBindMount",
            "value": 73854953,
            "unit": "ns/op\t 908.66 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadBindMount - ns/op",
            "value": 73854953,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadBindMount - MB/s",
            "value": 908.66,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "3e7494c6c2fde0be0ef3223016c5490a0d1d82b9",
          "message": "Update ttrpc version to fix deadlock\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-05-02T23:46:47-07:00",
          "tree_id": "5d798025c38f86d4ab6af32b88411a3f66bbe1a2",
          "url": "https://github.com/dmcgowan/shimtest/commit/3e7494c6c2fde0be0ef3223016c5490a0d1d82b9"
        },
        "date": 1777791253251,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle",
            "value": 229950755,
            "unit": "ns/op\t       200.5 ms/create\t         6.044 ms/delete\t         6.242 ms/kill\t         7.235 ms/shim-start\t         5.138 ms/start\t         4.769 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ns/op",
            "value": 229950755,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/create",
            "value": 200.5,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/delete",
            "value": 6.044,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/kill",
            "value": 6.242,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/shim-start",
            "value": 7.235,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/start",
            "value": 5.138,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/wait",
            "value": 4.769,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Startup",
            "value": 205837812,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Exec",
            "value": 11032132,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadLargeFile",
            "value": 26816566,
            "unit": "ns/op\t2502.52 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadLargeFile - ns/op",
            "value": 26816566,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadLargeFile - MB/s",
            "value": 2502.52,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadBindMount",
            "value": 75458965,
            "unit": "ns/op\t 889.34 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadBindMount - ns/op",
            "value": 75458965,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadBindMount - MB/s",
            "value": 889.34,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "de45369ce617e311a7f19ec419ee73ec13fde898",
          "message": "Add 100 layer test\n\nAdd test for 100 layers and benchmark with 30 layers.\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-05-08T20:49:11-07:00",
          "tree_id": "8c8d06910350cd14d1d7afc8b2035e6d16cb2b80",
          "url": "https://github.com/dmcgowan/shimtest/commit/de45369ce617e311a7f19ec419ee73ec13fde898"
        },
        "date": 1778298805883,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle",
            "value": 216882213,
            "unit": "ns/op\t       190.5 ms/create\t         5.230 ms/delete\t         5.349 ms/kill\t         8.196 ms/shim-start\t         4.216 ms/start\t         3.390 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ns/op",
            "value": 216882213,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/create",
            "value": 190.5,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/delete",
            "value": 5.23,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/kill",
            "value": 5.349,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/shim-start",
            "value": 8.196,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/start",
            "value": 4.216,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/wait",
            "value": 3.39,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Startup",
            "value": 204549587,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Exec",
            "value": 7546887,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadLargeFile",
            "value": 27812836,
            "unit": "ns/op\t2412.87 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadLargeFile - ns/op",
            "value": 27812836,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadLargeFile - MB/s",
            "value": 2412.87,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadBindMount",
            "value": 57206185,
            "unit": "ns/op\t1173.11 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadBindMount - ns/op",
            "value": 57206185,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadBindMount - MB/s",
            "value": 1173.11,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "930837a1140cd588254dc5f4b92f8a00bac37d4f",
          "message": "Updates to stress test to be more reliable\n\nExpand memory growth allowance.\nSuppress known non-fatal issues on shutdown.\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-05-10T23:54:42-07:00",
          "tree_id": "e238de2ec82a3ef1350641ddcc23e6baf21a324a",
          "url": "https://github.com/dmcgowan/shimtest/commit/930837a1140cd588254dc5f4b92f8a00bac37d4f"
        },
        "date": 1778482799176,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle",
            "value": 231983423,
            "unit": "ns/op\t       200.6 ms/create\t         6.038 ms/delete\t         7.135 ms/kill\t         7.931 ms/shim-start\t         5.566 ms/start\t         4.710 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ns/op",
            "value": 231983423,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/create",
            "value": 200.6,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/delete",
            "value": 6.038,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/kill",
            "value": 7.135,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/shim-start",
            "value": 7.931,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/start",
            "value": 5.566,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/wait",
            "value": 4.71,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Startup",
            "value": 211354433,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Exec",
            "value": 10983897,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadLargeFile",
            "value": 29068167,
            "unit": "ns/op\t2308.67 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadLargeFile - ns/op",
            "value": 29068167,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadLargeFile - MB/s",
            "value": 2308.67,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadBindMount",
            "value": 70893210,
            "unit": "ns/op\t 946.62 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadBindMount - ns/op",
            "value": 70893210,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadBindMount - MB/s",
            "value": 946.62,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "f6f1d1ac06f34430c9b787c8bad90680a5cf5133",
          "message": "Makefile: use .exe extension for test binary on Windows\n\ngo test -c produces a binary without an extension by default (Linux\nconvention). On Windows executables must end in .exe to be runnable\ndirectly. Detect OS=Windows_NT and set TEST_BINARY accordingly.\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-05-12T18:51:42-04:00",
          "tree_id": "9fbaa25006a5194e363f58756a7cc28a5d18c111",
          "url": "https://github.com/dmcgowan/shimtest/commit/f6f1d1ac06f34430c9b787c8bad90680a5cf5133"
        },
        "date": 1778630853431,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle",
            "value": 213289824,
            "unit": "ns/op\t       189.9 ms/create\t         5.876 ms/delete\t         4.697 ms/kill\t         5.488 ms/shim-start\t         3.835 ms/start\t         3.443 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ns/op",
            "value": 213289824,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/create",
            "value": 189.9,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/delete",
            "value": 5.876,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/kill",
            "value": 4.697,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/shim-start",
            "value": 5.488,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/start",
            "value": 3.835,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/wait",
            "value": 3.443,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Startup",
            "value": 204508296,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Exec",
            "value": 8368829,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadLargeFile",
            "value": 26079003,
            "unit": "ns/op\t2573.29 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadLargeFile - ns/op",
            "value": 26079003,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadLargeFile - MB/s",
            "value": 2573.29,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadBindMount",
            "value": 48945759,
            "unit": "ns/op\t1371.09 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadBindMount - ns/op",
            "value": 48945759,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadBindMount - MB/s",
            "value": 1371.09,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "633d5e618ab04d45e0e39368e0cad2bd4980921f",
          "message": "Fix temporary directories on Windows\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-05-12T20:56:35-04:00",
          "tree_id": "477effc29ea5079f49bf1c9a32f2a559734c9275",
          "url": "https://github.com/dmcgowan/shimtest/commit/633d5e618ab04d45e0e39368e0cad2bd4980921f"
        },
        "date": 1778634072923,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle",
            "value": 226709802,
            "unit": "ns/op\t       189.6 ms/create\t         5.731 ms/delete\t         7.001 ms/kill\t         7.494 ms/shim-start\t         5.101 ms/start\t        11.79 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ns/op",
            "value": 226709802,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/create",
            "value": 189.6,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/delete",
            "value": 5.731,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/kill",
            "value": 7.001,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/shim-start",
            "value": 7.494,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/start",
            "value": 5.101,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/wait",
            "value": 11.79,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Startup",
            "value": 215652484,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Exec",
            "value": 11082697,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadLargeFile",
            "value": 28279007,
            "unit": "ns/op\t2373.10 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadLargeFile - ns/op",
            "value": 28279007,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadLargeFile - MB/s",
            "value": 2373.1,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadBindMount",
            "value": 79626953,
            "unit": "ns/op\t 842.79 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadBindMount - ns/op",
            "value": 79626953,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadBindMount - MB/s",
            "value": 842.79,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "fd36ba3f9689b4f2e14787eb71ac90a833ce771b",
          "message": "Update testdata directory for testbin\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-05-27T00:44:01-07:00",
          "tree_id": "ef82e3e46ad2a8b8db20dc03d0e91dd572799384",
          "url": "https://github.com/dmcgowan/shimtest/commit/fd36ba3f9689b4f2e14787eb71ac90a833ce771b"
        },
        "date": 1779868136824,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle",
            "value": 215084568,
            "unit": "ns/op\t       186.1 ms/create\t         5.875 ms/delete\t         7.544 ms/kill\t         6.136 ms/shim-start\t         5.042 ms/start\t         4.350 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ns/op",
            "value": 215084568,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/create",
            "value": 186.1,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/delete",
            "value": 5.875,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/kill",
            "value": 7.544,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/shim-start",
            "value": 6.136,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/start",
            "value": 5.042,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/wait",
            "value": 4.35,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Startup",
            "value": 200672368,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Exec",
            "value": 10795307,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadLargeFile",
            "value": 27008594,
            "unit": "ns/op\t2484.72 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadLargeFile - ns/op",
            "value": 27008594,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadLargeFile - MB/s",
            "value": 2484.72,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadBindMount",
            "value": 76989173,
            "unit": "ns/op\t 871.67 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadBindMount - ns/op",
            "value": 76989173,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadBindMount - MB/s",
            "value": 871.67,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "7613658cf664183b6229c852ebdfa8985d2add28",
          "message": "Handle updated testbin location in release action\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-05-27T00:49:53-07:00",
          "tree_id": "498212943e54497d7b241d13d66eff67bd27f05c",
          "url": "https://github.com/dmcgowan/shimtest/commit/7613658cf664183b6229c852ebdfa8985d2add28"
        },
        "date": 1779868422687,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle",
            "value": 219956014,
            "unit": "ns/op\t       190.5 ms/create\t         5.733 ms/delete\t         7.231 ms/kill\t         6.572 ms/shim-start\t         5.194 ms/start\t         4.753 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ns/op",
            "value": 219956014,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/create",
            "value": 190.5,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/delete",
            "value": 5.733,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/kill",
            "value": 7.231,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/shim-start",
            "value": 6.572,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/start",
            "value": 5.194,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/wait",
            "value": 4.753,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Startup",
            "value": 204089170,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Exec",
            "value": 10798644,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadLargeFile",
            "value": 29309010,
            "unit": "ns/op\t2289.70 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadLargeFile - ns/op",
            "value": 29309010,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadLargeFile - MB/s",
            "value": 2289.7,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadBindMount",
            "value": 73243101,
            "unit": "ns/op\t 916.25 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadBindMount - ns/op",
            "value": 73243101,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadBindMount - MB/s",
            "value": 916.25,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "a6c99a9bb2f0e92066ad63974e6c5297119f5c5f",
          "message": "Fix copy from failure\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-05-27T16:55:09-07:00",
          "tree_id": "99cb7fbd0e264ce435b0f465fcfccdbecce1d004",
          "url": "https://github.com/dmcgowan/shimtest/commit/a6c99a9bb2f0e92066ad63974e6c5297119f5c5f"
        },
        "date": 1779926355281,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle",
            "value": 217415071,
            "unit": "ns/op\t       189.4 ms/create\t         5.647 ms/delete\t         6.658 ms/kill\t         6.381 ms/shim-start\t         5.007 ms/start\t         4.314 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ns/op",
            "value": 217415071,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/create",
            "value": 189.4,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/delete",
            "value": 5.647,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/kill",
            "value": 6.658,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/shim-start",
            "value": 6.381,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/start",
            "value": 5.007,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/wait",
            "value": 4.314,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Startup",
            "value": 225223718,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Exec",
            "value": 10877809,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadLargeFile",
            "value": 23789926,
            "unit": "ns/op\t2820.89 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadLargeFile - ns/op",
            "value": 23789926,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadLargeFile - MB/s",
            "value": 2820.89,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadBindMount",
            "value": 70018596,
            "unit": "ns/op\t 958.44 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadBindMount - ns/op",
            "value": 70018596,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadBindMount - MB/s",
            "value": 958.44,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "8e7da43b1b71cc07c8abe99780a9a4d1672f0e6f",
          "message": "Bump testbinVersion to v0.1.7\n\nThe testbin package was refactored into an importable package\n(github.com/dmcgowan/shimtest/testbin) and burstexit was added in\nv0.1.6 source but the testbinVersion download pointer was never\nupdated. v0.1.7 will publish a binary built from the new package.\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-06-05T15:28:58-07:00",
          "tree_id": "ea48144bb1d8a5181b8d674e89faa7afd087b8d1",
          "url": "https://github.com/dmcgowan/shimtest/commit/8e7da43b1b71cc07c8abe99780a9a4d1672f0e6f"
        },
        "date": 1780698903196,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle",
            "value": 226936576,
            "unit": "ns/op\t       197.1 ms/create\t         5.889 ms/delete\t         7.158 ms/kill\t         6.704 ms/shim-start\t         5.252 ms/start\t         4.830 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ns/op",
            "value": 226936576,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/create",
            "value": 197.1,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/delete",
            "value": 5.889,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/kill",
            "value": 7.158,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/shim-start",
            "value": 6.704,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/start",
            "value": 5.252,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/wait",
            "value": 4.83,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Startup",
            "value": 212579863,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Exec",
            "value": 11085891,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadLargeFile",
            "value": 24637145,
            "unit": "ns/op\t2723.89 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadLargeFile - ns/op",
            "value": 24637145,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadLargeFile - MB/s",
            "value": 2723.89,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadBindMount",
            "value": 77175634,
            "unit": "ns/op\t 869.56 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadBindMount - ns/op",
            "value": 77175634,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadBindMount - MB/s",
            "value": 869.56,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "e77d6bc026f632820b1331a2da6c55cd02947e51",
          "message": "Update stress timeout handling on macOS\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-06-10T23:52:35-07:00",
          "tree_id": "427f7db6f57a370fcb058a7241bc6c16cff22d21",
          "url": "https://github.com/dmcgowan/shimtest/commit/e77d6bc026f632820b1331a2da6c55cd02947e51"
        },
        "date": 1781161019393,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle",
            "value": 215752546,
            "unit": "ns/op\t       187.6 ms/create\t         5.464 ms/delete\t         7.081 ms/kill\t         6.007 ms/shim-start\t         5.082 ms/start\t         4.472 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ns/op",
            "value": 215752546,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/create",
            "value": 187.6,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/delete",
            "value": 5.464,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/kill",
            "value": 7.081,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/shim-start",
            "value": 6.007,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/start",
            "value": 5.082,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/wait",
            "value": 4.472,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Startup",
            "value": 199972202,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Exec",
            "value": 10474069,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadLargeFile",
            "value": 27268905,
            "unit": "ns/op\t2461.00 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadLargeFile - ns/op",
            "value": 27268905,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadLargeFile - MB/s",
            "value": 2461,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadBindMount",
            "value": 72354181,
            "unit": "ns/op\t 927.50 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadBindMount - ns/op",
            "value": 72354181,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadBindMount - MB/s",
            "value": 927.5,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "31c0ccd6ee4db8d3d016259407ad25bbf40adc53",
          "message": "Cleanup shutdown logic further\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-06-11T00:13:51-07:00",
          "tree_id": "2d17c9587201b3b48ca72a85aa0610f619ee850f",
          "url": "https://github.com/dmcgowan/shimtest/commit/31c0ccd6ee4db8d3d016259407ad25bbf40adc53"
        },
        "date": 1781162323637,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle",
            "value": 218069161,
            "unit": "ns/op\t       187.8 ms/create\t         5.698 ms/delete\t         8.997 ms/kill\t         6.289 ms/shim-start\t         4.811 ms/start\t         4.503 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ns/op",
            "value": 218069161,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/create",
            "value": 187.8,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/delete",
            "value": 5.698,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/kill",
            "value": 8.997,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/shim-start",
            "value": 6.289,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/start",
            "value": 4.811,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/wait",
            "value": 4.503,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Startup",
            "value": 207394015,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Exec",
            "value": 11314753,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadLargeFile",
            "value": 25334323,
            "unit": "ns/op\t2648.93 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadLargeFile - ns/op",
            "value": 25334323,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadLargeFile - MB/s",
            "value": 2648.93,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadBindMount",
            "value": 68428069,
            "unit": "ns/op\t 980.72 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadBindMount - ns/op",
            "value": 68428069,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadBindMount - MB/s",
            "value": 980.72,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "76cba0bb1bf50d800213f8271652ee399d560c3b",
          "message": "Fix socket path length check for macOS\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-06-11T07:40:47-07:00",
          "tree_id": "864c407728acd8d1028ddc130b67944f9918d6c7",
          "url": "https://github.com/dmcgowan/shimtest/commit/76cba0bb1bf50d800213f8271652ee399d560c3b"
        },
        "date": 1781189296720,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle",
            "value": 215429666,
            "unit": "ns/op\t       186.0 ms/create\t         5.890 ms/delete\t         7.230 ms/kill\t         6.868 ms/shim-start\t         4.850 ms/start\t         4.635 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ns/op",
            "value": 215429666,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/create",
            "value": 186,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/delete",
            "value": 5.89,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/kill",
            "value": 7.23,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/shim-start",
            "value": 6.868,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/start",
            "value": 4.85,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/wait",
            "value": 4.635,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Startup",
            "value": 201975950,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Exec",
            "value": 10793010,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadLargeFile",
            "value": 25789623,
            "unit": "ns/op\t2602.17 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadLargeFile - ns/op",
            "value": 25789623,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadLargeFile - MB/s",
            "value": 2602.17,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadBindMount",
            "value": 73583187,
            "unit": "ns/op\t 912.01 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadBindMount - ns/op",
            "value": 73583187,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadBindMount - MB/s",
            "value": 912.01,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "committer": {
            "email": "derek@mcg.dev",
            "name": "Derek McGowan",
            "username": "dmcgowan"
          },
          "distinct": true,
          "id": "264e4a30e9ce39a671eea7a428e9c2d4fbb55118",
          "message": "Implement drainFifoIntoDone on Windows\n\nSigned-off-by: Derek McGowan <derek@mcg.dev>",
          "timestamp": "2026-06-13T00:17:03-07:00",
          "tree_id": "3eb8d58b7a19c9ff48bd3cad54752cf1b95b6970",
          "url": "https://github.com/dmcgowan/shimtest/commit/264e4a30e9ce39a671eea7a428e9c2d4fbb55118"
        },
        "date": 1781335566329,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle",
            "value": 205224130,
            "unit": "ns/op\t       185.2 ms/create\t         4.691 ms/delete\t         2.798 ms/kill\t         6.418 ms/shim-start\t         3.203 ms/start\t         2.941 ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ns/op",
            "value": 205224130,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/create",
            "value": 185.2,
            "unit": "ms/create",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/delete",
            "value": 4.691,
            "unit": "ms/delete",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/kill",
            "value": 2.798,
            "unit": "ms/kill",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/shim-start",
            "value": 6.418,
            "unit": "ms/shim-start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/start",
            "value": 3.203,
            "unit": "ms/start",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Lifecycle - ms/wait",
            "value": 2.941,
            "unit": "ms/wait",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Startup",
            "value": 196556281,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/Exec",
            "value": 8852341,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadLargeFile",
            "value": 21859158,
            "unit": "ns/op\t3070.06 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadLargeFile - ns/op",
            "value": 21859158,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadLargeFile - MB/s",
            "value": 3070.06,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadBindMount",
            "value": 75508258,
            "unit": "ns/op\t 888.76 MB/s",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadBindMount - ns/op",
            "value": 75508258,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkShim/nerdbox/ReadBindMount - MB/s",
            "value": 888.76,
            "unit": "MB/s",
            "extra": "5 times\n4 procs"
          }
        ]
      }
    ]
  }
}