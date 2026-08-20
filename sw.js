const CACHE = 'mu-cao-su-v2.3.8';
const FILES = ['/Mucaosu/','/Mucaosu/index.html','/Mucaosu/manifest.json','/Mucaosu/icon-192.png','/Mucaosu/icon-512.png','/Mucaosu/apple-touch-icon.png','/Mucaosu/logo.png','/Mucaosu/splash.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).catch(()=>{}));
  self.skipWaiting(); // kích hoạt SW mới ngay lập tức
});

self.addEventListener('activate', e => {
  // Xóa tất cả cache cũ
  e.waitUntil(
    caches.keys().then(ks =>
      Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))
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
  const isHTML = e.request.destination === 'document' || url.pathname.endsWith('.html') || url.pathname.endsWith('/');

  if (isHTML) {
    // HTML: Network First — luôn lấy bản mới nhất, cache làm dự phòng offline
    e.respondWith(
      fetch(e.request)
        .then(response => {
          // Cập nhật cache với bản mới
          const clone = response.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
          return response;
        })
        .catch(() => caches.match(e.request))
    );
  } else {
    // Tài nguyên tĩnh (icon, manifest): Cache First — nhanh hơn
    e.respondWith(
      caches.match(e.request).then(r => r || fetch(e.request).catch(() => caches.match('/Mucaosu/index.html')))
    );
  }
});
