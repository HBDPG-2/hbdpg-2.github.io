/*  (c) 2024 Piotr Kniaz

    This file is part of HBDPG-2.
    Repository: https://github.com/HBDPG-2/hbdpg-2.github.io

    Licensed under the MIT License. See LICENSE file in the project root for details.
*/

const CACHE_VERSION = 'v20241213-1';
// const CACHE_VERSION = 'v1-debug';

const ASSETS = [
    '/',
    '/index.html',
    '/manifest.webmanifest',
    '/favicon.ico',
    '/images/Logo-beta.webp',
    '/images/check.svg',
    '/images/loading.webp',
    '/styles/style.css',
    '/styles/fonts/JetBrainsMono-Regular.woff2',
    '/scripts/ui-items.js',
    '/scripts/ui.js',
    '/scripts/updater.js',
    '/scripts/core.js',
    '/scripts/argon2.js',
    '/scripts/argon2/argon2.js',
    '/scripts/argon2/argon2.wasm',
    '/scripts/argon2/argon2-simd.wasm'
];

self.addEventListener('install', event => {
    event.waitUntil(caches.open(CACHE_VERSION).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheVersions => {
            return Promise.all(
                cacheVersions.map(cacheVersion => {
                    if (cacheVersion !== CACHE_VERSION) {
                        return caches.delete(cacheVersion);
                    }
                })
            );
        })
    );

    self.clients.claim();
});

self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request).catch(() => {
                return new Response('Network error occurred.', {
                    status: 503,
                    statusText: 'Service Unavailable',
                });
            });
        })
    );
});