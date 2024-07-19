/// <reference lib="webworker" />

import { precacheAndRoute } from 'workbox-precaching';

self.addEventListener('install', (event: ExtendableEvent) => {
  event.waitUntil(
    caches.open('static-cache-v1').then((cache: Cache) => {
      return cache.addAll([
        './',
        './index.html',
        './manifest.json',
        // './icon-192x192.png',
        // './icon-512x512.png',
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
