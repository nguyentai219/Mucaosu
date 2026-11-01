#!/bin/sh
# Gom mọi file cần thiết (bản mới nhất trên main) vào 1 file nén để tải về.
# Cách dùng: ./dong-goi.sh <thư-mục-ra> [thư-mục-chứa-khoá-ký]
#   - Lấy toàn bộ repo Mucaosu từ origin/main (web app + mã nguồn APK + APK đã build).
#   - Lấy repo nguyentai219.github.io (file xác minh assetlinks.json) nếu đã clone cạnh repo này.
#   - Nếu có thư mục khoá ký (mucaosu.keystore + keystore-password.txt) thì kèm vào thư mục khoa-ky/.
set -e
cd "$(dirname "$0")"
OUT="${1:?Cần thư mục ra}"; KEYDIR="$2"
VER=$(sed -n "s/.*CACHE = 'mu-cao-su-\(v[0-9.]*\)'.*/\1/p" sw.js)
NAME="MuCaoSu-$VER"
TMP=$(mktemp -d); D="$TMP/$NAME"; mkdir -p "$D"
git fetch -q origin main
git archive --format=tar --prefix=Mucaosu/ origin/main | tar -x -C "$D"
cp "$D/Mucaosu/android-twa/release/MuCaoSu.apk" "$D/$NAME-Android.apk"
PAGES=../nguyentai219.github.io
if [ -d "$PAGES/.git" ]; then
  git -C "$PAGES" pull -q --ff-only || true
  git -C "$PAGES" archive --format=tar --prefix=nguyentai219.github.io/ HEAD | tar -x -C "$D"
fi
if [ -n "$KEYDIR" ] && [ -f "$KEYDIR/mucaosu.keystore" ]; then
  mkdir -p "$D/khoa-ky"; cp "$KEYDIR/mucaosu.keystore" "$KEYDIR/keystore-password.txt" "$D/khoa-ky/"
fi
cat > "$D/DOC-TRUOC.txt" <<TXT
Mủ Cao Su $VER — gói đầy đủ (lấy từ nhánh main trên GitHub)

$NAME-Android.apk        File cài app Android (mở app web trong Chrome, tự cập nhật theo web)
Mucaosu/                 Toàn bộ repo app web (index.html, sw.js, manifest.json, ảnh...) + mã nguồn APK
nguyentai219.github.io/  Repo chứa .well-known/assetlinks.json (để APK ẩn thanh địa chỉ)
khoa-ky/                 (nếu có) Khoá ký APK + mật khẩu — GIỮ KỸ, KHÔNG CHIA SẺ. Mất khoá thì
                         APK mới không cài đè được bản cũ.
TXT
mkdir -p "$OUT"; rm -f "$OUT/$NAME.zip"
(cd "$TMP" && zip -qr -X "$OUT/$NAME.zip" "$NAME")
rm -rf "$TMP"
echo "$OUT/$NAME.zip"
