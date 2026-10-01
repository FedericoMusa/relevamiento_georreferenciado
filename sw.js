const CACHE_NAME = 'relevamiento-v1';
const RECURSOS = [
  './',
  './index.html',
  './manifest.json'
];

// Instalar y guardar todo en el disco del celular
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(RECURSOS))
  );
  self.skipWaiting();
});

// Limpiar versiones viejas si se actualiza
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => k !== CACHE_NAME && caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Responder siempre desde el disco si no hay internet
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
