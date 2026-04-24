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
	"bytes"
	"compress/gzip"
	_ "embed"
	"fmt"
	"hash"
	"hash/crc32"
	"io"
	"io/fs"
	"math/rand/v2"
	"os"
	"path/filepath"
	"strings"
	"testing"

	"github.com/containerd/containerd/api/types"
	"github.com/containerd/continuity/pkg/ext4"
	erofs "github.com/erofs/go-erofs"
)

//go:embed _output/testbin.gz
var testbinGz []byte

// openTestbin returns a reader for the decompressed testbin binary.
func openTestbin() (io.Reader, error) {
	return gzip.NewReader(bytes.NewReader(testbinGz))
}

// testbinCommands lists the commands provided by the testbin binary.
// Symlinks are created in /bin for each command.
var testbinCommands = []string{"forever", "cat", "date", "echo", "exit", "hashverify", "memhog", "nc", "tickexit"}

// bigFileSize is the size of the IO benchmark fixture file. Large
// enough to swamp small per-call overheads while still building/
// extracting in well under a second on host storage.
const bigFileSize = 64 << 20 // 64 MiB

// bigFileContainerPath is where the IO fixture file is mounted inside
// the container, both via the dedicated erofs layer and via host bind
// mount (in different tests).
const bigFileContainerPath = "/data/bigfile"

// bigFileSeed is the ChaCha8 seed used to generate the fixture
// payload. Any change here invalidates the cached hash.
var bigFileSeed = [32]byte{
	's', 'h', 'i', 'm', 't', 'e', 's', 't',
	'b', 'i', 'g', 'f', 'i', 'l', 'e', 'v', '1',
}

// bigFileReader streams deterministic ChaCha8-seeded bytes up to
// bigFileSize and computes the crc32-Castagnoli of what it produced.
// The hash is available via HashHex once Read has returned io.EOF.
//
// Memory cost is O(1) — callers io.Copy it into the destination
// (erofs entry, host tempfile, etc.) without materializing the
// 64 MiB payload.
type bigFileReader struct {
	src    *rand.ChaCha8
	crc    hash.Hash32
	remain int
}

func newBigFileReader() *bigFileReader {
	return &bigFileReader{
		src:    rand.NewChaCha8(bigFileSeed),
		crc:    crc32.New(crc32.MakeTable(crc32.Castagnoli)),
		remain: bigFileSize,
	}
}

func (r *bigFileReader) Read(p []byte) (int, error) {
	if r.remain == 0 {
		return 0, io.EOF
	}
	n := len(p)
	if n > r.remain {
		n = r.remain
	}
	nr, _ := r.src.Read(p[:n]) // ChaCha8.Read always fills the buffer
	r.crc.Write(p[:nr])
	r.remain -= nr
	return nr, nil
}

// HashHex returns the crc32-Castagnoli (hex) of the bytes produced so
// far. Call after the reader is fully consumed to get the fixture's
// canonical hash.
func (r *bigFileReader) HashHex() string {
	return fmt.Sprintf("%08x", r.crc.Sum32())
}

// bigFileHashHex returns the canonical crc32-Castagnoli of the
// fixture by streaming through io.Discard. ~10ms; only called a
// couple of times per test run.
func bigFileHashHex() string {
	r := newBigFileReader()
	_, _ = io.Copy(io.Discard, r)
	return r.HashHex()
}

// writeBigFileErofs builds a separate erofs image containing only the
// IO benchmark fixture mounted at /data/bigfile. Returns the image
// path; callers compose it as an additional lower in the rootfs
// overlay.
func writeBigFileErofs(tb testing.TB) string {
	tb.Helper()

	imgPath := filepath.Join(tb.TempDir(), "bigfile.erofs")
	f, err := os.Create(imgPath)
	if err != nil {
		tb.Fatal("create bigfile erofs:", err)
	}
	defer f.Close()

	w := erofs.Create(f)

	if err := w.Mkdir("data", 0755); err != nil {
		tb.Fatal("mkdir data:", err)
	}

	bf, err := w.Create("data/bigfile")
	if err != nil {
		tb.Fatal("create bigfile entry:", err)
	}
	if _, err := io.Copy(bf, newBigFileReader()); err != nil {
		tb.Fatal("write bigfile:", err)
	}
	if err := bf.Chmod(0644); err != nil {
		tb.Fatal("chmod bigfile:", err)
	}
	if err := bf.Close(); err != nil {
		tb.Fatal("close bigfile:", err)
	}

	if err := w.Close(); err != nil {
		tb.Fatal("erofs close:", err)
	}

	return imgPath
}

// writeRootfsErofs builds an erofs image containing the testbin rootfs
// directly from the embedded binary, without touching the local
// filesystem. Returns the path to the image file.
func writeRootfsErofs(tb testing.TB) string {
	tb.Helper()

	imgPath := filepath.Join(tb.TempDir(), "rootfs.erofs")
	f, err := os.Create(imgPath)
	if err != nil {
		tb.Fatal("create erofs image:", err)
	}
	defer f.Close()

	w := erofs.Create(f)

	// Directory scaffold.
	for _, d := range []string{
		"bin", "dev", "etc", "proc", "run", "sys", "tmp",
	} {
		if err := w.Mkdir(d, 0755); err != nil {
			tb.Fatal("mkdir:", err)
		}
	}

	// Write the testbin binary.
	bin, err := w.Create("bin/testbin")
	if err != nil {
		tb.Fatal("create testbin:", err)
	}
	r, err := openTestbin()
	if err != nil {
		tb.Fatal("open testbin:", err)
	}
	if _, err := io.Copy(bin, r); err != nil {
		tb.Fatal("write testbin:", err)
	}
	if err := bin.Chmod(0755); err != nil {
		tb.Fatal("chmod testbin:", err)
	}
	if err := bin.Close(); err != nil {
		tb.Fatal("close testbin:", err)
	}

	// Symlinks for each command.
	for _, cmd := range testbinCommands {
		if err := w.Symlink("testbin", "bin/"+cmd); err != nil {
			tb.Fatal("symlink:", err)
		}
	}

	// Minimal /etc files.
	writeErofsFile(tb, w, "etc/passwd", []byte("root:x:0:0:root:/root:/bin/forever\n"))
	writeErofsFile(tb, w, "etc/group", []byte("root:x:0:\n"))
	writeErofsFile(tb, w, "etc/resolv.conf", []byte(""))
	writeErofsFile(tb, w, "etc/hostname", []byte("shimtest\n"))
	writeErofsFile(tb, w, "etc/hosts", []byte("127.0.0.1\tlocalhost\n"))

	if err := w.Close(); err != nil {
		tb.Fatal("erofs close:", err)
	}

	return imgPath
}

// writeErofsFile is a helper to create a small file in an erofs image.
func writeErofsFile(tb testing.TB, w *erofs.Writer, path string, data []byte) {
	tb.Helper()
	f, err := w.Create(path)
	if err != nil {
		tb.Fatalf("create %s: %v", path, err)
	}
	if _, err := f.Write(data); err != nil {
		tb.Fatalf("write %s: %v", path, err)
	}
	if err := f.Close(); err != nil {
		tb.Fatalf("close %s: %v", path, err)
	}
}

// extractErofsIntoDir opens an erofs image and copies its contents
// into the given directory.
func extractErofsIntoDir(tb testing.TB, imgPath, dir string) {
	tb.Helper()

	f, err := os.Open(imgPath)
	if err != nil {
		tb.Fatal("open erofs:", err)
	}
	defer f.Close()

	img, err := erofs.Open(f)
	if err != nil {
		tb.Fatal("erofs open:", err)
	}

	type readLinker interface {
		ReadLink(string) (string, error)
	}
	rl, hasReadLink := img.(readLinker)

	err = fs.WalkDir(img, ".", func(path string, d fs.DirEntry, err error) error {
		if err != nil {
			return err
		}
		target := filepath.Join(dir, path)

		if d.Type()&fs.ModeSymlink != 0 {
			if !hasReadLink {
				return &os.PathError{Op: "readlink", Path: path, Err: os.ErrInvalid}
			}
			linkTarget, err := rl.ReadLink(path)
			if err != nil {
				return err
			}
			return os.Symlink(linkTarget, target)
		}

		if d.IsDir() {
			return os.MkdirAll(target, 0755)
		}

		// Regular file.
		info, err := d.Info()
		if err != nil {
			return err
		}
		src, err := img.(fs.FS).Open(path)
		if err != nil {
			return err
		}
		defer src.Close()

		dst, err := os.OpenFile(target, os.O_CREATE|os.O_WRONLY, info.Mode().Perm())
		if err != nil {
			return err
		}
		defer dst.Close()

		_, err = io.Copy(dst, src)
		return err
	})
	if err != nil {
		tb.Fatal("extract erofs:", err)
	}
}

// extractErofsToDir extracts an erofs image into a new temp directory
// and returns its path.
func extractErofsToDir(tb testing.TB, imgPath string) string {
	tb.Helper()
	dir := filepath.Join(tb.TempDir(), "rootfs")
	if err := os.MkdirAll(dir, 0755); err != nil {
		tb.Fatal("mkdir:", err)
	}
	extractErofsIntoDir(tb, imgPath, dir)
	return dir
}

// buildEmbeddedRootfs builds rootfs mounts from the embedded testbin
// binary. When FormatMounts is set, the rootfs is provided as erofs
// and ext4 images with a format/mkdir/overlay mount descriptor for the
// shim to mount. When running as root, the rootfs is extracted and
// provided as an overlay mount. When running as non-root (rootless),
// the rootfs is extracted directly into the bundle's rootfs directory
// with no mounts — the OCI runtime uses it as-is via Root.Path.
func buildEmbeddedRootfs(tb testing.TB, bundleDir string) []*types.Mount {
	tb.Helper()

	erofsImg := writeRootfsErofs(tb)
	bigImg := writeBigFileErofs(tb)

	if testCfg.FormatMounts {
		return buildErofsMounts(tb, []string{erofsImg, bigImg})
	}

	if os.Getuid() != 0 {
		// Rootless: extract directly into the bundle's rootfs dir.
		// No mounts needed — crun uses Root.Path directly.
		rootfs := filepath.Join(bundleDir, "rootfs")
		extractErofsIntoDir(tb, erofsImg, rootfs)
		extractErofsIntoDir(tb, bigImg, rootfs)
		return nil
	}

	srcDir := extractErofsToDir(tb, erofsImg)
	extractErofsIntoDir(tb, bigImg, srcDir)
	return buildOverlayMounts(tb, srcDir)
}

// buildOverlayMounts returns an overlay mount with lower (read-only
// rootfs), upper (writable), and work directories.
func buildOverlayMounts(tb testing.TB, lower string) []*types.Mount {
	tb.Helper()

	dir := tb.TempDir()
	upper := filepath.Join(dir, "upper")
	work := filepath.Join(dir, "work")
	if err := os.MkdirAll(upper, 0755); err != nil {
		tb.Fatal("mkdir upper:", err)
	}
	if err := os.MkdirAll(work, 0755); err != nil {
		tb.Fatal("mkdir work:", err)
	}

	return []*types.Mount{{
		Type:   "overlay",
		Source: "overlay",
		Options: []string{
			"index=off",
			"workdir=" + work,
			"upperdir=" + upper,
			"lowerdir=" + lower,
		},
	}}
}

// buildErofsMounts builds the layered erofs layout: ext4 (rw scratch)
// + one or more erofs lowers + overlay. Lowers are stacked in order,
// with erofsImgs[0] highest (matching overlay's lowerdir semantics).
func buildErofsMounts(tb testing.TB, erofsImgs []string) []*types.Mount {
	tb.Helper()

	ext4Img := filepath.Join(tb.TempDir(), "scratch.ext4")
	if err := ext4.Create(ext4Img, 64*1024*1024); err != nil {
		tb.Fatal("create ext4:", err)
	}

	mounts := []*types.Mount{{
		Type:    "ext4",
		Source:  ext4Img,
		Options: []string{"rw", "loop"},
	}}

	lowers := make([]string, 0, len(erofsImgs))
	for i, img := range erofsImgs {
		mounts = append(mounts, &types.Mount{
			Type:    "erofs",
			Source:  img,
			Options: []string{"ro", "loop"},
		})
		lowers = append(lowers, fmt.Sprintf("{{ mount %d }}", i+1))
	}

	mounts = append(mounts, &types.Mount{
		Type:   "format/mkdir/overlay",
		Source: "overlay",
		Options: []string{
			"X-containerd.mkdir.path={{ mount 0 }}/upper:0755",
			"X-containerd.mkdir.path={{ mount 0 }}/work:0755",
			"workdir={{ mount 0 }}/work",
			"upperdir={{ mount 0 }}/upper",
			"lowerdir=" + strings.Join(lowers, ":"),
		},
	})

	return mounts
}
