const CACHE = 'mu-cao-su-v5.5';
const FILES = ['/Mucaosu/','/Mucaosu/index.html','/Mucaosu/manifest.json','/Mucaosu/icon-192.png','/Mucaosu/icon-512.png','/Mucaosu/apple-touch-icon.png'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).catch(()=>{}));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).catch(() => caches.match('/Mucaosu/index.html'))));
});
