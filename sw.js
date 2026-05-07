// התוכנה של עמרי - Service Worker
// Caches static assets only. Firebase API calls (Firestore/Auth) bypass the
// cache and go to the network so data is always live.

const CACHE_NAME = 'omri-app-v3';
const STATIC_ASSETS = [
    './',
    './index.html',
    './login.html',
    './credit-cards.html',
    './bills.html',
    './tasks.html',
    './documents.html',
    './users.html',
    './app.css',
    './app.js',
    './firebase-init.js',
    './manifest.json',
    "./Omri's%20Software%20%E2%80%93%20Household%20Financial%20Management.png",
    "./Omri's%20Software%20-%20icon.png",
    './israel_nis.png',
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) =>
            Promise.all(STATIC_ASSETS.map((url) => cache.add(url).catch(() => null)))
        )
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
        )
    );
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;

    const url = new URL(event.request.url);

    // Bypass cache for Firebase APIs - always go to network for live data
    if (url.hostname.includes('firebase') ||
        url.hostname.includes('firestore') ||
        url.hostname.includes('googleapis.com') ||
        url.hostname.includes('gstatic.com')) {
        // Network only for Firebase + Firebase SDK CDN
        return;
    }

    event.respondWith(
        caches.match(event.request).then((cached) => {
            if (cached) return cached;
            return fetch(event.request).then((response) => {
                if (response && response.status === 200 && response.type !== 'opaque') {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then((c) => c.put(event.request, clone)).catch(() => {});
                }
                return response;
            }).catch(() => {
                if (event.request.mode === 'navigate') {
                    return caches.match('./index.html');
                }
            });
        })
    );
});
