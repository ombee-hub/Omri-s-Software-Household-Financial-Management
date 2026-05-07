// התוכנה של עמרי - Service Worker
// Network-first for everything (always fresh content). Cache only as offline fallback.

const CACHE_NAME = 'omri-app-v20';
const STATIC_ASSETS = [
    './',
    './index.html',
    './login.html',
    './credit-cards.html',
    './bills.html',
    './tasks.html',
    './documents.html',
    './users.html',
    './calculator.html',
    './app.css',
    './app.js',
    './firebase-init.js',
    './manifest.json',
    "./images/Omri's%20Software%20%E2%80%93%20Household%20Financial%20Management.png",
    "./images/Omri's%20Software%20-%20icon.png",
    "./images/Omri's%20Software%20%E2%80%93%20Logo.png",
    './images/israel_nis.png',
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
        ).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;

    const url = new URL(event.request.url);

    // Bypass cache entirely for Firebase APIs and external CDNs
    if (url.hostname.includes('firebase') ||
        url.hostname.includes('firestore') ||
        url.hostname.includes('googleapis.com') ||
        url.hostname.includes('gstatic.com') ||
        url.hostname.includes('sheetjs.com')) {
        return; // network only, browser default
    }

    // Network-first for ALL same-origin assets - always serve latest content,
    // fall back to cache when offline.
    event.respondWith(
        fetch(event.request).then((response) => {
            if (response && response.status === 200 && response.type !== 'opaque') {
                const clone = response.clone();
                caches.open(CACHE_NAME).then((c) => c.put(event.request, clone)).catch(() => {});
            }
            return response;
        }).catch(() =>
            caches.match(event.request).then(c =>
                c || (event.request.mode === 'navigate' ? caches.match('./index.html') : undefined)
            )
        )
    );
});
