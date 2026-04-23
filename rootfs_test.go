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
	"io"
	"io/fs"
	"os"
	"path/filepath"
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
var testbinCommands = []string{"forever", "cat", "date", "echo", "exit", "memhog", "nc", "tickexit"}

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

	if testCfg.FormatMounts {
		return buildErofsMounts(tb, erofsImg)
	}

	if os.Getuid() != 0 {
		// Rootless: extract directly into the bundle's rootfs dir.
		// No mounts needed — crun uses Root.Path directly.
		extractErofsIntoDir(tb, erofsImg, filepath.Join(bundleDir, "rootfs"))
		return nil
	}

	srcDir := extractErofsToDir(tb, erofsImg)
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

// buildErofsMounts builds the three-mount erofs layout: ext4 (rw) +
// erofs (ro) + overlay, matching what the erofs snapshotter produces.
func buildErofsMounts(tb testing.TB, erofsImg string) []*types.Mount {
	tb.Helper()

	ext4Img := filepath.Join(tb.TempDir(), "scratch.ext4")
	if err := ext4.Create(ext4Img, 64*1024*1024); err != nil {
		tb.Fatal("create ext4:", err)
	}

	return []*types.Mount{
		{
			Type:    "ext4",
			Source:  ext4Img,
			Options: []string{"rw", "loop"},
		},
		{
			Type:    "erofs",
			Source:  erofsImg,
			Options: []string{"ro", "loop"},
		},
		{
			Type:   "format/mkdir/overlay",
			Source: "overlay",
			Options: []string{
				"X-containerd.mkdir.path={{ mount 0 }}/upper:0755",
				"X-containerd.mkdir.path={{ mount 0 }}/work:0755",
				"workdir={{ mount 0 }}/work",
				"upperdir={{ mount 0 }}/upper",
				"lowerdir={{ mount 1 }}",
			},
		},
	}
}
