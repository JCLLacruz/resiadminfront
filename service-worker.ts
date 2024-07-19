/// <reference lib="webworker" />

self.addEventListener('install', (event: ExtendableEvent) => {
    event.waitUntil(
      caches.open('static-cache-v1').then((cache: Cache) => {
        return cache.addAll([
          './',
          './index.html',
          './manifest.json',
          './public/icon-192x192.svg',
          './public/icon-512x512.svg',
          // Agrega aquí otros recursos que quieras cachear
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', (event: FetchEvent) => {
    event.respondWith(
      caches.match(event.request).then((response: Response | undefined) => {
        return response || fetch(event.request);
      })
    );
  });