const CACHE = 'mu-cao-su-v2.7.8';
const FILES = ['/Mucaosu/','/Mucaosu/index.html','/Mucaosu/manifest.json','/Mucaosu/icon-192.png','/Mucaosu/icon-512.png','/Mucaosu/apple-touch-icon.png','/Mucaosu/logo.png','/Mucaosu/splash.png'];

self.addEventListener('install', e => {
  // Tải các file với cache:'reload' (bỏ qua HẲN bộ nhớ đệm HTTP của trình duyệt). GitHub Pages trả header
  // max-age=600 (10 phút) — nếu dùng c.addAll(FILES) thông thường, bản index.html CŨ còn trong bộ nhớ đệm HTTP
  // có thể bị nhét vào cache của phiên bản MỚI, khiến app đã "cập nhật" nhưng vẫn hiện bản cũ.
  e.waitUntil(
    caches.open(CACHE).then(c => Promise.all(FILES.map(u =>
      fetch(new Request(u, { cache: 'reload' })).then(r => { if (r && r.ok) return c.put(u, r); }).catch(()=>{})
    ))).catch(()=>{})
  );
  self.skipWaiting(); // kích hoạt SW mới ngay lập tức
});

self.addEventListener('activate', e => {
  // Chỉ xoá cache CŨ CỦA APP NÀY (tiền tố 'mu-cao-su-'). Bộ nhớ cache dùng chung cho cả tên miền
  // nguyentai219.github.io — xoá hết sẽ làm mất bản offline của app khác (VD Quản Lý Heo).
  e.waitUntil(
    caches.keys().then(ks =>
      Promise.all(ks.filter(k => k.startsWith('mu-cao-su-') && k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim(); // chiếm quyền kiểm soát tất cả tab ngay
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  // CHỈ can thiệp (cache) các request CÙNG GỐC với app — mọi request ra ngoài (API thời tiết, Supabase,
  // Google Drive...) phải để trình duyệt tự xử lý bình thường, KHÔNG được đi qua logic cache/fallback
  // phía dưới. Nếu không loại trừ, một request ra ngoài lỡ thất bại (mạng chập chờn, CORS...) sẽ bị rơi
  // vào nhánh dự phòng "trả về index.html đã cache" ở bên dưới — khiến bên gọi (ví dụ: lấy dữ liệu thời
  // tiết) nhận nhầm HTML thay vì JSON thật, tưởng thành công nhưng không đọc được dữ liệu, lỗi rất khó
  // nhận ra vì không có thông báo lỗi rõ ràng nào cả.
  if (url.origin !== self.location.origin) return;
  if (e.request.method !== 'GET') return;
  const isHTML = e.request.destination === 'document' || url.pathname.endsWith('.html') || url.pathname.endsWith('/');

  // Icon và manifest phải dùng Network First để Chrome luôn so sánh được hash thật từ server
  // — nếu dùng Cache First, Chrome nhận icon từ cache (qua SW) có thể không khớp với server
  // → hiện popup "Xem lại bản cập nhật biểu tượng" mỗi lần mở app dù icon không hề đổi.
  const isNetworkFirst = isHTML
    || url.pathname.endsWith('.png')
    || url.pathname.endsWith('.ico')
    || url.pathname.endsWith('manifest.json');

  if (isNetworkFirst) {
    // Network First — luôn lấy bản mới nhất từ server, cache làm dự phòng offline
    // cache:'no-cache' = luôn hỏi lại server (gửi yêu cầu điều kiện, nếu không đổi server chỉ trả 304 rất nhẹ)
    // thay vì dùng bản trong bộ nhớ đệm HTTP còn hạn tới 10 phút → bản mới trên GitHub Pages hiện ngay khi đã triển khai.
    e.respondWith(
      fetch(new Request(e.request.url, { cache: 'no-cache' }))
        .then(response => {
          if (response && response.ok) {
            const clone = response.clone();
            caches.open(CACHE).then(c => c.put(e.request, clone));
          }
          return response;
        })
        // Mất mạng: tìm đúng bản đã lưu; nếu là yêu cầu mở trang mà không khớp (VD địa chỉ có thêm ?...)
        // thì vẫn mở app bằng index.html đã lưu thay vì để trình duyệt hiện trang lỗi.
        .catch(() => caches.match(e.request).then(r => r || (e.request.mode === 'navigate' || e.request.destination === 'document'
          ? caches.match('/Mucaosu/index.html', { ignoreSearch: true })
          : undefined)))
    );
  } else {
    // Tài nguyên tĩnh khác: Cache First — nhanh hơn
    e.respondWith(
      caches.match(e.request).then(r => r || fetch(e.request).catch(() => caches.match('/Mucaosu/index.html')))
    );
  }
});
