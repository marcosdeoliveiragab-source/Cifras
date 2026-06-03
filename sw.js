const CACHE_NAME = 'cifras-v1';
const ASSETS = [
  'index.html',
  'manifest.json'
];

// Instala o Service Worker e guarda os arquivos no cache seguro
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Ativa e remove caches antigos se houver atualização
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Intercepta as requisições para fazer o site abrir do cache quando estiver offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
