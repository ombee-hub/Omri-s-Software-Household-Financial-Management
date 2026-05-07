// התוכנה של עמרי - Service Worker
// Network-first for HTML/JS/CSS so updates always win.
// Cache-first only for images and the SDK CDNs.

const CACHE_NAME = 'omri-app-v5';
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
    "./Omri's%20Software%20%E2%80%93%20Logo.png",
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

    // Bypass cache entirely for Firebase APIs
    if (url.hostname.includes('firebase') ||
        url.hostname.includes('firestore') ||
        url.hostname.includes('googleapis.com') ||
        url.hostname.includes('gstatic.com') ||
        url.hostname.includes('sheetjs.com')) {
        return; // network only
    }

    // For our own HTML/JS/CSS - network-first so updates always apply,
    // fall back to cache only if offline
    const isCodeFile = /\.(html|js|css|json)$/i.test(url.pathname) || url.pathname.endsWith('/');
    if (isCodeFile) {
        event.respondWith(
            fetch(event.request).then((response) => {
                if (response && response.status === 200) {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then((c) => c.put(event.request, clone)).catch(() => {});
                }
                return response;
            }).catch(() => caches.match(event.request).then(c => c || caches.match('./index.html')))
        );
        return;
    }

    // Images and other static assets - cache-first
    event.respondWith(
        caches.match(event.request).then((cached) => {
            if (cached) return cached;
            return fetch(event.request).then((response) => {
                if (response && response.status === 200 && response.type !== 'opaque') {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then((c) => c.put(event.request, clone)).catch(() => {});
                }
                return response;
            });
        })
    );
});
