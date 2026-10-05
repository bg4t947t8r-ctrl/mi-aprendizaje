const CACHE_NAME = 'mi-aprendizaje-v3';

const ARCHIVOS_ESTATICOS = [
  './',
  './index.html',
  './styles.css',
  './manifest.json'
];

self.addEventListener('install', event => {
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ARCHIVOS_ESTATICOS);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Estos archivos SIEMPRE deben venir de GitHub Pages.
  // No queremos que el Service Worker entregue versiones viejas.
  if (
    url.pathname.endsWith('/app.js') ||
    url.pathname.endsWith('/contenido.json') ||
    url.pathname.endsWith('/styles.css')
  ) {
    event.respondWith(
      fetch(event.request, {
        cache: 'no-store'
      })
    );
    return;
  }

  // Para el resto: red primero, caché como respaldo.
  event.respondWith(
    fetch(event.request)
      .then(response => {
        if (
          response &&
          response.status === 200 &&
          response.type === 'basic'
        ) {
          const responseClone = response.clone();

          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
        }

        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
