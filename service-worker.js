"use strict";
/// <reference lib="webworker" />
self.addEventListener('install', (event) => {
    event.waitUntil(caches.open('static-cache-v1').then((cache) => {
        return cache.addAll([
            './',
            './index.html',
            './manifest.json',
              './public/icon-192x192.svg',
              './public/icon-512x512.svg',
            // Agrega aquí otros recursos que quieras cachear
        ]);
    }));
});
self.addEventListener('fetch', (event) => {
    event.respondWith(caches.match(event.request).then((response) => {
        return response || fetch(event.request);
    }));
});
