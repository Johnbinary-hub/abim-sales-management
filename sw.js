const CACHE_NAME = 'abimbest-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/management.html',
  '/reciept.html',
  '/offline.js',
  '/sw.js',
  '/firebase-config.js',
  '/auth.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request).catch(()=> caches.match('/index.html')))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(names => Promise.all(names.map(name => name !== CACHE_NAME ? caches.delete(name) : null)))
  );
});
