# 🌿 Mủ Cao Su Pro

Phần mềm ghi chép **mua bán mủ cao su** — PWA cài được lên điện thoại như app thật, hoạt động offline.

## 📋 Lịch sử phiên bản

| Phiên bản | Ngày | Thay đổi |
|-----------|------|----------|
| **v10.4** | 2026-07 | Thêm cơ chế chống gian lận hạn dùng thử (chống xoá dữ liệu duyệt web để reset vô hạn) dựa trên dấu vân tay thiết bị + bảng `device_trials` trên Supabase; xác nhận lại phân quyền mật khẩu: 28082008 = quản trị cao nhất (gồm gia hạn, chốt sổ, mọi thao tác), 234567 = chỉ chốt sổ/quản lý giao dịch, không gia hạn được |
| **v10.3** | 2026-07 | Đổi định dạng ngày trong màn xem dữ liệu Supabase và file PDF xuất ra sang dd/mm/yyyy; sửa công thức tính hạn dùng thử — ngày cài đặt không tính vào 3 ngày dùng thử (dùng miễn phí thêm ngày cài đặt, tổng 4 ngày truy cập trước khi khoá) |
| **v10.2** | 2026-07 | Bộ lọc "Theo khách hàng" đổi thành "Theo khách hàng (chưa chốt sổ)" — ẩn các ghi chép Sổ gửi/Ứng tiền đã chốt sổ; thêm tuỳ chọn mới "Toàn bộ dữ liệu của khách hàng" (hiện cả dữ liệu đã chốt sổ); ô "Theo ngày" đổi sang lịch tuỳ chỉnh có chấm đánh dấu ngày có ghi chép giống các tab khác |
| **v10.1** | 2026-07 | Thêm bộ lọc xem dữ liệu Supabase theo Ngày / Tháng / Khách hàng; gộp nút "Xem dữ liệu ghi chép" + "Tải PDF chi tiết" thành 1 mục; xuất PDF đúng theo đúng dữ liệu đang được lọc trên màn hình |
| **v10.0** | 2026-07 | Thêm màn "Xem dữ liệu ghi chép" ngay trong app cho phương án Supabase (xem Mua/Bán/Sổ gửi/Ứng tiền dạng bảng, có tổng tiền từng mục); thêm xuất báo cáo PDF chi tiết tải về điện thoại; thêm nút hiện/ẩn mật khẩu (👁️) khi đăng nhập Supabase |
| **v9.9** | 2026-07 | Thêm phương án đồng bộ **Supabase** (đăng nhập email/mật khẩu, dùng chung nhiều thiết bị) hoạt động song song với Google Drive; thêm modal chọn phương án đồng bộ khi bấm thanh trạng thái; tự động đồng bộ dữ liệu lên Supabase ngay sau mỗi giao dịch/sổ gửi/ứng tiền; giữ nguyên 100% chức năng Google Drive hiện có |
| **v9.8** | — | Phiên bản gốc trước khi bổ sung Supabase (mốc bắt đầu ghi tiếp lịch sử phiên bản từ đây) |
| **v1.3** | 2026-05 | Sửa lỗi đọc số tiền bằng chữ; dropdown chọn loại mủ xổ xuống tại chỗ + auto nhảy ô; thêm icon Sổ Gửi với đầy đủ chi tiết, sửa/xoá; popup xác nhận khi lưu/gửi; cột Chất hiện tên loại mủ cho mủ chén/dây |
| **v1.2** | 2026-05 | Sửa thứ tự ô, công thức tính, lỗi mủ chén, thêm cột Kg |
| **v1.1** | 2026-05 | Sửa công thức, ghi nhớ đơn giá theo loại mủ |
| **v1.0** | 2026-05 | Phiên bản đầu tiên |

## ✨ Tính năng

### Nhập giao dịch
- **Loại mủ** — dropdown xổ tại chỗ, chọn xong tự nhảy sang ô Tên
- **Đơn giá** — ghi nhớ theo từng loại mủ; để trống nếu loại mới
- **Tên người bán/mua** — gợi ý autocomplete
- **Số kg + Độ / Khấu hao** (tùy loại mủ)

### Công thức tính
| Loại | Công thức |
|------|-----------|
| Mủ nước | `kg × giá × độ` |
| Mủ đông | `(kg − khấu hao) × giá` |
| Mủ chén / Dây | `kg × giá` |

### Popup xác nhận
Khi **Lưu giao dịch** hoặc **Ghi sổ gửi** → hiện popup chi tiết: Tên, Loại mủ, Số kg, Đơn giá, Độ/KH, Thành tiền

### Bảng giao dịch
- Cột Chất: mủ nước → Độ, mủ đông → Khấu hao, mủ chén/dây → tên loại
- Nhấp đúp dòng → chỉnh sửa (tô vàng sau khi sửa)
- Nhấp đúp cột Gửi → popup xác nhận → ghi sổ gửi ✅

### Sổ Gửi 📒
- Nhấn icon 📒 trên header → danh sách khách đã gửi
- Xem chi tiết từng khách: ngày, loại, kg, độ, giá, tiền — tổng cộng
- Nhấp đúp ghi chép → chỉnh sửa / xoá

### Khách hàng 👥
- Mua và bán có danh sách riêng
- Thêm / Sửa / Xoá

## 📱 Cài lên điện thoại

### Deploy GitHub Pages (miễn phí)
1. Tạo repo mới trên github.com
2. Upload toàn bộ 6 file
3. **Settings → Pages → Branch: main → Save**
4. Link: `https://username.github.io/ten-repo/`

### Cài như app
| Hệ điều hành | Cách |
|---|---|
| **Android** | Chrome → Menu ⋮ → *Thêm vào màn hình chính* |
| **iPhone** | Safari → Nút chia sẻ ↑ → *Thêm vào màn hình chính* |

## 📁 File cần upload lên GitHub
```
mu-cao-su/
├── index.html      ← Toàn bộ app (v1.3)
├── manifest.json   ← Cấu hình PWA
├── sw.js           ← Service Worker (offline)
├── icon-192.png    ← Icon app
├── icon-512.png    ← Icon splash
└── README.md
```
> 💾 Dữ liệu lưu trong **localStorage** — không cần server, hoạt động offline hoàn toàn.
