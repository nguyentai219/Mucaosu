# Hướng dẫn cho Claude — dự án Mủ Cao Su Pro

PWA ghi chép mua bán mủ cao su, chạy trên GitHub Pages tại `/Mucaosu/`. Toàn bộ app nằm trong một file
`index.html` (HTML + CSS + JS nội tuyến); `sw.js` là Service Worker; `manifest.json` là thông tin cài đặt app.

## Quy trình làm việc (bắt buộc)

1. Sau mỗi lần chỉnh sửa và kiểm tra xong: **tự động đưa lên GitHub**, không cần hỏi — commit lên nhánh
   phát triển, push, tạo pull request vào `main` rồi gộp, để GitHub Pages đăng bản mới và app trên điện
   thoại tự cập nhật. Đồng thời tự làm mọi thay đổi cần thiết khác trên GitHub để app chạy ổn định
   (VD: repo `nguyentai219/nguyentai219.github.io`, kiểm tra GitHub Pages đã đăng xong).
2. **Gói file nén mới nhất**: sau khi gộp vào `main`, chạy `./dong-goi.sh <thư mục scratchpad> [thư mục
   chứa khoá ký nếu có]` rồi gửi file `.zip` cho người dùng tải về (gồm web app, APK, mã nguồn APK,
   assetlinks.json và khoá ký nếu có trong phiên).
3. Sau đó **báo lại** đã sửa những gì, đã kiểm tra ra sao và đã đưa lên GitHub (kèm link pull request).
4. **Hỏi người dùng còn muốn chỉnh sửa gì nữa không.**
5. Trả lời người dùng bằng tiếng Việt.

## Đánh số phiên bản

Theo quy tắc `Z.X.Y` ghi ở đầu `README.md`. Mỗi lần cập nhật tăng đúng 1 bước và đổi ở đủ các vị trí:

- `index.html`: `<title>`, `logo-ver`, 2 dòng phiên bản trong màn "Hướng dẫn sử dụng".
- `sw.js`: hằng `CACHE` — bắt buộc đổi, vì app trên điện thoại chỉ tự cập nhật khi `sw.js` thay đổi.
- **Không** ghi số phiên bản vào `manifest.json`.

Sau khi đổi, `grep` số cũ để chắc không sót. Thêm 1 dòng vào bảng "Lịch sử phiên bản" trong `README.md`
(dòng mới nhất ở trên cùng).

## Kiểm tra trước khi báo xong

- `node --check sw.js` và kiểm tra cú pháp các khối `<script>` nội tuyến trong `index.html`.
- Khi cần, chạy thử bằng Playwright (Chromium có sẵn): phục vụ thư mục cha qua HTTP sao cho app nằm ở
  đường dẫn `/Mucaosu/`, mở `index.html` và kiểm tra không có lỗi JS.

## App Android (APK)

Thư mục `android-twa/` chứa mã nguồn APK dạng Trusted Web Activity: APK chỉ mở trang
`https://nguyentai219.github.io/Mucaosu/` trong Chrome, nên sửa web **không** cần build lại APK.
Chỉ build lại khi đổi tên/biểu tượng/màu của app Android (tăng `versionCode` trong `AndroidManifest.xml`),
bằng `android-twa/build.sh`, rồi chép APK mới vào `android-twa/release/MuCaoSu.apk` (bản dùng để phát hành,
cũng tải được ở `https://nguyentai219.github.io/Mucaosu/android-twa/release/MuCaoSu.apk`). Bắt buộc ký bằng đúng khoá cũ (`mucaosu.keystore`, người dùng giữ — không
bao giờ đưa khoá vào repo), nếu không APK mới không cài đè được và Chrome sẽ hiện lại thanh địa chỉ.
File xác minh `assetlinks.json` nằm ở repo `nguyentai219/nguyentai219.github.io` (thư mục `.well-known/`,
cần file `.nojekyll`).
