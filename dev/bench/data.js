window.BENCHMARK_DATA = {
  "lastUpdate": 1777011992315,
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
      }
    ]
  }
}