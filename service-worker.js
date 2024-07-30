"use strict";
/// <reference lib="webworker" />

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('static-cache-v1')
            .then((cache) => {
                const resources = [
                    './',
                    './index.html',
                    './manifest.json',
                    './public/icons/icon-192x192.svg',
                    './public/icons/icon-512x512.svg',
                    // Add more resources here
                ];

                return Promise.all(
                    resources.map((resource) => {
                        return cache.add(resource).catch((error) => {
                            console.error(`Failed to cache ${resource}:`, error);
                        });
                    })
                );
            })
            .catch((error) => {
                console.error('Failed to open cache:', error);
            })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request);
            })
    );
});
