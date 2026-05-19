# 🌿 Mủ Cao Su Pro

Phần mềm ghi chép **mua bán mủ cao su** — PWA cài được lên điện thoại như app thật, hoạt động offline.

## 📋 Lịch sử phiên bản

| Phiên bản | Ngày | Thay đổi |
|-----------|------|----------|
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
