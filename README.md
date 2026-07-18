# 🌿 Mủ Cao Su Pro

Phần mềm ghi chép **mua bán mủ cao su** — PWA cài được lên điện thoại như app thật, hoạt động offline.

## 🔢 Quy tắc đánh số phiên bản (áp dụng từ v1.a1)

Số phiên bản cũ (v11.x) tăng quá cao nên đổi sang cơ chế mới: **`1.<chữ><số>`**

- Số hàng đơn vị chạy từ **1 → 9**, hết thì chữ cái tăng lên và số quay lại 1.
- Ví dụ thứ tự: `1.a1` → `1.a2` → ... → `1.a9` → `1.b1` → `1.b2` → ... → `1.b9` → `1.c1` → ... → `1.d1` → `1.e1` ...
- Mỗi lần cập nhật chỉ tăng 1 bước theo đúng thứ tự trên, tại đúng 3 vị trí như quy tắc cũ (title/logo-ver trong index.html, description trong manifest.json, CACHE trong sw.js).
- Các ghi chú phiên bản cũ (v7.x–v11.x) còn sót lại trong code là mốc lịch sử, không đổi lại theo hệ mới.

## 📋 Lịch sử phiên bản

| Phiên bản | Ngày | Thay đổi |
|-----------|------|----------|
| **v1.a9** | 2026-07 | (1) Sửa lỗi mọi khách hàng đều bị gắn cả 2 nhãn "🌾 Khách bán" và "🚛 Khách mua" cùng lúc: nguyên nhân do khi lưu tên (dù ở tab Mua, Bán, Sổ Gửi hay Ứng tiền) đều tự động ghi vào CẢ HAI danh sách nội bộ `kh3_mua`/`kh3_ban`; nay chỉ ghi đúng vào danh sách của tab đang lưu, đồng thời gợi ý tên (autocomplete) ở tab Mua/Bán cũng chỉ lấy đúng danh sách của tab đó — không còn lẫn tên qua lại. Có chạy dọn dữ liệu cũ 1 lần khi mở app: xây lại đúng vai trò dựa trên giao dịch Mua/Bán thực tế đã có. (2) Gộp 2 màn quản lý khách hàng làm 1: icon 👥 nay mở thẳng màn "📇 Mã khách hàng" (trước đây mở màn "Danh sách khách hàng" riêng, tách biệt và thiếu đồng bộ với màn Mã khách hàng ở Cài đặt). Màn này nay có thêm khối "➕ Thêm khách hàng mới" (nhập tên + chọn vai trò Khách bán/Khách mua) và nút ✏️ cạnh nút 📋 Sao chép ở mỗi dòng để mở popup sửa tên/vai trò, lưu hoặc xoá khách hàng ngay tại đây |
| **v1.a8** | 2026-07 | (1) Khoá đúng cách 2 khu vực **Chấm Công** và **Tính Toán** khi hết hạn/chưa kích hoạt — trước đây chỉ chặn được thao tác lưu ở tầng code (guardLicense) nhưng giao diện vẫn không mờ/khoá trực quan như Mua/Bán/Sổ Gửi; phát hiện thêm nút "Lưu Sổ Sách" bị mất id `tt-luu-btn` từ trước nên khoá chưa từng có tác dụng — đã khôi phục và bổ sung banner khoá cho cả 2 khu vực. (2) Sửa công thức **Thực lãnh** trong Chấm Công: trước đây tính bằng cả tháng lương trừ nghỉ/ứng cộng thưởng (sai với kỳ đang mở, chưa hết tháng); nay tính đúng theo **số ngày đã làm thực tế × tiền công 1 ngày**, trừ ứng cộng thưởng — phản ánh đúng số tiền thực tế tính đến hiện tại. (3) Màn "📇 Mã khách hàng" nay phân biệt rõ 3 vai trò bằng nhãn màu riêng: 👷 Công nhân (vàng), 🌾 Khách bán (xanh dương — người bán mủ cho vựa), 🚛 Khách mua (xanh lá — đầu mối mua lại mủ từ vựa) |
| **v1.a7** | 2026-07 | Sửa lỗi app đứng yên ở bản cũ dù đã tải file mới lên GitHub: thêm banner "🔄 Đã có bản cập nhật mới" tự hiện khi phát hiện bản mới (app tự kiểm tra mỗi khi mở lại), bấm vào để tải lại đúng bản mới nhất — không cần gỡ cài đặt hay xoá cache thủ công nữa |
| **v1.a6** | 2026-07 | (1) "Chốt danh sách Thu Mua" đổi sang chọn **ngày chốt tuỳ ý** qua lịch mini có đánh dấu ngày có giao dịch (● đỏ), mặc định là hôm nay, có thể đổi sang ngày khác/tháng khác. (2) Công nhân trong Chấm Công nay cũng được cấp **Mã KH riêng** (đồng bộ sang app "Sổ Khách Hàng" để tự tra cứu kỳ chấm công của mình). (3) Màn "👥 Danh sách khách hàng" (CRUD) nay hiển thị luôn Mã KH kèm nút 📋 sao chép nhanh, không cần mở riêng màn "📇 Mã khách hàng" nữa |
| **v1.a5** | 2026-07 | Đồng bộ thêm mật khẩu quản lý giao dịch lên Supabase (khoá `thang_pw`) để app "Xem Sổ Khách Hàng" có thể xác thực trước khi cho khách hàng mở menu Cài đặt của họ (tránh bấm nhầm thoát/đổi mã) |
| **v1.a4** | 2026-07 | Sửa lỗi bấm "Chốt danh sách Thu Mua" không có phản hồi: modal xác nhận mật khẩu bị modal Mã khách hàng đè lên (cùng z-index, modal Mã khách hàng nằm sau trong DOM nên vẽ đè lên trên) — nay modal xác nhận mật khẩu luôn ở lớp trên cùng. Đồng thời đổi cơ chế "Chốt danh sách Thu Mua" từ chốt chung 1 mốc duy nhất sang **chốt riêng theo từng khách hàng**: bấm nút sẽ mở popup có menu xổ xuống chọn tên khách hàng, hiện trạng thái đã/chưa chốt của người đó, rồi mới chốt/huỷ chốt (`mua_chot_moc` đổi cấu trúc từ 1 số thành object `{ "Tên KH": mốc }`) |
| **v1.a3** | 2026-07 | (1) Sửa lỗi mã khách hàng bị nhân đôi khi xoá rồi thêm lại khách hàng trùng tên khác hoa/thường (VD "anh 2" và "Anh 2"): mọi so khớp tên khách hàng (thêm mới, sửa tên, tra mã) nay không phân biệt hoa/thường và khoảng trắng thừa; màn "📇 Mã khách hàng" chỉ hiện khách đang tồn tại, không còn hiện mã mồ côi của khách đã xoá; đổi tên khách hàng nay di chuyển đúng mã cũ sang tên mới thay vì sinh mã mới. (2) Thêm cơ chế "🔒 Chốt danh sách Thu Mua" trong màn Mã khách hàng: khi chốt (yêu cầu mật khẩu quản lý giao dịch), app "Xem Sổ Khách Hàng" sẽ chỉ hiện các giao dịch Thu Mua phát sinh SAU thời điểm chốt — dữ liệu cũ vẫn được giữ nguyên đầy đủ trong app này, chỉ ẩn khỏi app khách hàng. Có thể "🔓 Huỷ chốt" bất cứ lúc nào. (3) Thay toàn bộ logo/icon ứng dụng và ảnh khởi động (splash) bằng bộ nhận diện thương hiệu mới |
| **v1.a2** | 2026-07 | Thêm `admin_pw` (mã quản trị) vào danh sách đồng bộ Supabase, kèm giá trị mặc định đúng khi chưa từng đổi mật khẩu — phục vụ tính năng "chế độ quản trị" sắp có ở app "Xem Sổ Khách Hàng" (nhập mã quản trị vào ô Mã khách hàng sẽ được xem toàn bộ khách hàng thay vì chỉ 1 người) |
| **v1.a1** | 2026-07 | Đổi cơ chế đánh số phiên bản: chuyển từ v11.14 sang hệ mới `1.<chữ><số>` (xem quy tắc phía trên) do số phiên bản cũ đã quá cao. Không có thay đổi tính năng nào trong bản này |
| **v11.14** | 2026-07 | Thêm hệ thống "Mã khách hàng" cố định (5 ký tự, không đụng cấu trúc kh3_all cũ nên không ảnh hưởng autocomplete hiện có) — mỗi khách hàng tự động có 1 mã khi tên được lưu. Thêm màn "📇 Mã khách hàng" trong Cài đặt để tra cứu/sao chép mã, chuẩn bị cho app đồng hành "Xem Sổ Khách Hàng" (máy khách) sắp triển khai — khách hàng nhập đúng mã này để xem sổ Thu Mua/Gửi/Ứng của riêng mình. Đồng bộ mã KH lên cả Supabase (`kh_ids`) và Google Drive (sheet `Ma_KH`) |
| **v11.13** | 2026-07 | Thêm 3 tuỳ chọn lọc mới trong menu "Xem dữ liệu Supabase": "📒 Theo Gửi sổ (chọn khách hàng)", "💵 Theo Ứng tiền (chọn khách hàng)", "⏱️ Theo Chấm công (chọn công nhân)" — mỗi tuỳ chọn chỉ hiện đúng 1 loại dữ liệu và có ô chọn tên riêng để xem chính xác người/công cần xem. Tên công nhân (Chấm công) dùng ô chọn hoàn toàn tách biệt với tên khách hàng (Gửi sổ/Ứng tiền/Mua/Bán), không gộp chung danh sách nữa như v11.12 |
| **v11.12** | 2026-07 | Xác nhận dữ liệu Chấm Công đã tự động đồng bộ Supabase (khoá `cc_data`) từ trước — mọi thao tác tạo/ghi chép/chốt/xoá đều gọi autoSync() ngay. Bổ sung phần "⏱️ Chấm Công" vào màn "Xem dữ liệu Supabase": thẻ tổng quan từng công nhân (ngày làm/nghỉ, ứng, thưởng, thực lãnh, trạng thái mở/chốt) và bảng ghi chép chi tiết (ngày, công nhân, loại, số tiền, lý do) có thể lọc theo ngày/tháng/tên công nhân giống các mục khác; đưa tên công nhân vào chung dropdown lọc theo khách hàng; thêm mục Chấm Công vào file PDF xuất từ Supabase |
| **v11.11** | 2026-07 | Xác nhận lỗi "Chốt công/Xoá chấm công" ở v11.10 là do trình duyệt/PWA chưa cập nhật cache, không phải lỗi code (đã hoạt động đúng sau khi xoá lịch sử/cache trình duyệt). Thêm lưới an toàn try/catch quanh 2 nút này để nếu có lỗi bất ngờ trong tương lai sẽ luôn hiện thông báo rõ ràng thay vì im lặng |
| **v11.10** | 2026-07 | Sửa lỗi nghiêm trọng: nút "Chốt công" và "Xoá chấm công" không có phản ứng khi bấm xác nhận — nguyên nhân do cơ chế nút back Android chỉ theo dõi 1 modal, khi popup xác nhận (mở chồng lên modal chi tiết chấm công) đóng lại thì lại đóng nhầm luôn modal chi tiết bên dưới, khiến người dùng tưởng không có gì xảy ra. Đã viết lại toàn bộ cơ chế thành ngăn xếp modal (hỗ trợ nhiều modal chồng nhau đúng cách). Làm lại màn tổng quan Chấm Công: tách riêng từng chỉ số (ngày làm, ngày nghỉ, tiền ứng, tiền thưởng, trừ nghỉ, thực lãnh) với màu rõ ràng (ứng = đỏ, thưởng = xanh), thêm nhãn trạng thái "Đang mở"/"Đã chốt". Thêm kiểm tra giấy phép (guardLicense) và thông báo lỗi rõ ràng thay vì im lặng cho toàn bộ thao tác Chấm Công |
| **v11.9** | 2026-07 | Nâng cấp lớn màn chi tiết Chấm Công: lịch hiển thị 5 trạng thái mỗi ngày (✔ có làm mặc định, ✗ nghỉ, 💵 ứng tiền, 💵 thưởng tiền, ❗ khác); nhấn vào ngày đã đánh dấu sẽ đổ dữ liệu xuống khung nhập liệu bên dưới để sửa (chọn ngày/loại ghi chép/số tiền nếu là ứng-thưởng/lý do), lưu có popup xác nhận. Thêm phần "Chi tiết đầy đủ" (số ngày làm/nghỉ, tiền trừ nghỉ, tiền ứng, tiền thưởng, thực lãnh) và nút "✅ Chốt công" (có popup xác nhận) để khoá ghi chép tháng đó; muốn tính tháng mới cho cùng 1 người thì tạo chấm công mới với tên đó — hệ thống tự thêm hậu tố "(Tháng X/Y)" và chặn tạo trùng nếu kỳ cũ chưa chốt |
| **v11.8** | 2026-07 | Thêm sub-tab "⏱️ Chấm Công" trong tab Sổ Gửi (giữ nguyên sub-tab "📒 Sổ Gửi & Ứng Tiền" như cũ). Nút "➕ Tạo chấm công mới" mở popup nhập: Ngày (mặc định hôm nay, chọn qua lịch tùy chỉnh có đánh dấu), Tên công nhân, Tiền công tháng — tự tính Tiền công/ngày = Tiền công tháng ÷ 30. Mỗi công nhân có màn chi tiết với lịch để đánh dấu ngày nghỉ, tự động trừ tiền các ngày nghỉ và tính ra Thực lãnh. Dữ liệu Chấm Công đồng bộ cả Supabase (`cc_data`) và Google Drive (sheet `Cham_Cong`) |
| **v11.7** | 2026-07 | Sửa lỗi các nút trong menu ⚙️ Cài đặt (Gia hạn, Đổi mật khẩu, Quên mật khẩu, Hướng dẫn sử dụng) bấm không có phản ứng — nguyên nhân do cơ chế nút back Android đóng nhầm modal vừa mở khi chuyển tiếp từ modal Cài đặt; đã thêm hàm chuyển đổi modal an toàn (swapM) để khắc phục |
| **v11.6** | 2026-07 | Màn xem dữ liệu Supabase: khi lọc theo ngày/tháng/khách hàng, thêm hàng "Tổng cộng" in đậm ở cuối mỗi bảng (Mua/Bán/Sổ gửi/Ứng tiền); khi chọn "Xem tất cả", chèn hàng in đậm ngăn cách giữa các ngày khác nhau trong bảng để dễ phân biệt |
| **v11.5** | 2026-07 | Viết lại cơ chế nút quay lại điện thoại: đóng popup đang mở ở lần bấm đầu, thoát app tự nhiên ở lần bấm tiếp theo (bỏ popup xác nhận thoát vì trình duyệt không cho phép JS tự đóng app đáng tin cậy); bỏ tuỳ chọn bật/tắt tự đồng bộ trong Cài đặt — luôn tự động đồng bộ ngay khi có giao dịch/thay đổi cài đặt nếu đã đăng nhập Supabase/Drive; đổi màu số trừ bì trong bảng danh sách sang đỏ nhạt dễ đọc hơn; rút gọn tên loại mủ (Chén/Dây/Đông) trong cột Độ/Loại của bảng Chi tiết thu mua trong ngày |
| **v11.4** | 2026-07 | Sửa lỗi nút "Thoát ứng dụng" không phản hồi (đơn giản hoá lại cơ chế thoát, bỏ window.close() gây gián đoạn); làm nét icon màn hình khởi động — giảm padding, bỏ chế độ "maskable" khiến hệ điều hành tự thu nhỏ thêm gây mờ |
| **v11.3** | 2026-07 | Thay toàn bộ icon app (logo header, apple-touch-icon, icon-192, icon-512) bằng logo mới, đã xử lý xoá nền và làm sạch cho hiển thị đẹp trên mọi kích thước; thêm popup xác nhận khi bấm nút quay lại của điện thoại để tránh thoát app nhầm |
| **v11.2** | 2026-07 | Lần đầu cài đặt/mở app hiện popup "Kích hoạt phần mềm" (thay vì báo hết hạn) yêu cầu nhập mã, khoá phần nhập liệu cho đến khi kích hoạt; banner khoá hiện "Nhấn vào đây để kích hoạt phần mềm" (màu xanh) khi chưa từng kích hoạt, đổi thành "Phần mềm đã hết hạn — Nhấn để gia hạn" (màu đỏ) khi đã từng dùng rồi hết hạn; popup thông báo hết hạn có thêm nút "Gia hạn ngay"; sửa lỗi form không tự mở khoá sau khi gia hạn/kích hoạt thành công; logo chính giảm về đúng chiều cao 2 hàng chữ, không vượt quá như trước |
| **v11.1** | 2026-07 | Logo chính phóng to bao phủ cả 2 hàng chữ (tiêu đề + email/phiên bản/hạn dùng); icon Cài đặt/Khách hàng thu nhỏ, căn theo hàng tiêu đề, không lấn xuống hàng dưới; Hướng dẫn sử dụng bỏ hết nội dung liên quan "dùng thử", chỉ còn hướng dẫn gia hạn |
| **v11.0** | 2026-07 | Thu nhỏ icon Cài đặt/Khách hàng (bằng độ rộng icon logo), giữ cùng hàng với tiêu đề, giảm khoảng cách các hàng header để dành nhiều không gian hơn cho phần nhập liệu; xoá bỏ hoàn toàn ngày dùng thử miễn phí — cài đặt app xong khoá ngay, bắt buộc gia hạn mới sử dụng được (dữ liệu hạn dùng vẫn đồng bộ lên Supabase như cũ); cập nhật lại hướng dẫn sử dụng cho đúng |
| **v10.9** | 2026-07 | Icon Cài đặt và Khách hàng chuyển lên cùng hàng với tên app, hàng dưới chỉ còn email/phiên bản/hạn dùng cho rộng rãi hơn; thanh trạng thái đồng bộ đổi tên tài khoản (chiếm nhiều diện tích) thành "Đã kết nối mạng - sẵn sàng lưu trữ online" kèm icon phương án đang dùng, tên tài khoản vẫn xem được khi bấm vào; cập nhật đầy đủ Hướng dẫn sử dụng với phần Supabase (đăng nhập, xem dữ liệu, lọc, xuất PDF) và mốc dùng thử mới; gắn hạn dùng thử vào tài khoản Supabase (ngoài vân tay thiết bị) để khôi phục đáng tin cậy hơn khi đăng nhập lại sau khi xoá dữ liệu duyệt web |
| **v10.8** | 2026-07 | Ẩn thông tin mật khẩu khỏi lịch sử phiên bản; đổi tên nhãn "mật khẩu chốt sổ" thành "mật khẩu giao dịch" trong giao diện Hủy chốt sổ cho nhất quán |
| **v10.7** | 2026-07 | Thanh trạng thái Supabase hiện rõ "Đang đồng bộ..." khi đang xử lý và "Lỗi đồng bộ (n)" kèm số bản ghi chưa đồng bộ khi thất bại (tự thử lại ở lần ghi chép/cài đặt tiếp theo); thay đổi cài đặt (làm tròn số, tự đồng bộ) giờ cũng được đồng bộ lên Supabase; màn xem dữ liệu ghi chép và PDF bỏ cột "Loại mủ" — gộp vào cột "Độ" (hiện Chén/Dây/Đông thay số độ, riêng mủ nước vẫn hiện số độ); định dạng ngày thông minh: cùng năm hệ thống hiện dd/mm, khác năm hiện dd/mm/yyyy |
| **v10.6** | 2026-07 | Tái cấu trúc triệt để hàm Gia hạn: đóng popup + hiện thông báo thành công chạy ngay sau khi xác thực (không còn phụ thuộc các bước phụ như đồng bộ server/kiểm tra hạn); mọi thao tác phụ đều bọc an toàn; bọc toàn bộ hàm trong try/catch kèm thông báo lỗi rõ ràng nếu có sự cố, tránh treo im lặng |
| **v10.5** | 2026-07 | Sửa lỗi popup Gia hạn không đóng và không hiện thông báo thành công khi dùng mật khẩu quản trị (dù ngày vẫn được cộng đúng) — đổi thứ tự xử lý để đóng popup/thông báo trước khi chạy kiểm tra phụ; sửa lỗi ô nhập mật khẩu gia hạn nhận sai chế độ (hiện nút "Gia hạn" thay vì "Áp dụng") khi gõ mật khẩu quản trị |
| **v10.4** | 2026-07 | Thêm cơ chế chống gian lận hạn dùng thử (chống xoá dữ liệu duyệt web để reset vô hạn) dựa trên dấu vân tay thiết bị + bảng `device_trials` trên Supabase; xác nhận lại phân quyền mật khẩu: mật khẩu quản trị = cao nhất (gồm gia hạn, chốt sổ, mọi thao tác), mật khẩu giao dịch = chỉ chốt sổ/quản lý giao dịch, không gia hạn được |
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
