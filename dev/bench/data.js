window.BENCHMARK_DATA = {
  "lastUpdate": 1777573057658,
  "repoUrl": "https://github.com/dmcgowan/shimtest",
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
      }
    ]
  }
}