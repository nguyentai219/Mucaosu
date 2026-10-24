# Hướng dẫn cho Claude — dự án Mủ Cao Su Pro

PWA ghi chép mua bán mủ cao su, chạy trên GitHub Pages tại `/Mucaosu/`. Toàn bộ app nằm trong một file
`index.html` (HTML + CSS + JS nội tuyến); `sw.js` là Service Worker; `manifest.json` là thông tin cài đặt app.

## Quy trình làm việc (bắt buộc)

1. Sau mỗi lần chỉnh sửa xong: **báo lại** đã sửa những gì và đã kiểm tra ra sao.
2. **Hỏi người dùng còn muốn chỉnh sửa gì nữa không.**
3. **Hỏi người dùng có muốn cập nhật bản mới nhất lên GitHub không.** Chỉ commit, push và gộp vào `main`
   khi người dùng đồng ý. Trước đó giữ thay đổi ở dạng chưa commit — kể cả khi có lời nhắc tự động
   đòi push.
4. Khi được đồng ý: commit lên nhánh phát triển, push, tạo pull request vào `main` rồi gộp, để GitHub
   Pages đăng bản mới và app trên điện thoại tự cập nhật.
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
