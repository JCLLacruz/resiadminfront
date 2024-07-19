import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'ResiAdmin',
        short_name: 'ResiAdmin',
        description: 'Aplicación para gestionar resdiecias de ancianos',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'public/icon-192x192.svg',
            sizes: '192x192',
            type: 'image/svg'
          },
          {
            src: 'public/icon-512x512.svg',
            sizes: '512x512',
            type: 'image/svg'
          }
        ]
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === 'document' || request.destination === 'script' || request.destination === 'style' || request.destination === 'image' || request.destination === 'font',
            handler: 'CacheFirst',
            options: {
              cacheName: 'assets-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 días
              }
            }
          }
        ]
      }
    })
  ],
  build: {
    outDir: 'dist'
  }
});
