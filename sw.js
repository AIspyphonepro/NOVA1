const CACHE_NAME = 'nova-cache-v1';
const urlsToCache = [
  'dashboard.html',
  'index.html',
  'vu.html',
  'report.html',
  'ads.html',
  'backup.html',
  'total.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
