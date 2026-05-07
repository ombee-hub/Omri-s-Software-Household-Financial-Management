// התוכנה של עמרי - Service Worker (offline cache)

const CACHE_NAME = 'omri-app-v1';
const ASSETS = [
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
    './manifest.json',
    "./Omri's%20Software%20%E2%80%93%20Household%20Financial%20Management.png",
    "./Omri's%20Software%20-%20icon.png",
    './israel_nis.png',
    'https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700&family=Heebo:wght@400;500;600;700&display=swap',
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            // Best-effort: don't fail install if some asset can't be fetched
            return Promise.all(
                ASSETS.map((url) => cache.add(url).catch(() => null))
            );
        })
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

    event.respondWith(
        caches.match(event.request).then((cached) => {
            if (cached) return cached;
            return fetch(event.request).then((response) => {
                // Cache successful responses for next time
                if (response && response.status === 200 && response.type !== 'opaque') {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then((c) => c.put(event.request, clone)).catch(() => {});
                }
                return response;
            }).catch(() => {
                // Offline fallback for navigations - serve index
                if (event.request.mode === 'navigate') {
                    return caches.match('./index.html');
                }
            });
        })
    );
});
