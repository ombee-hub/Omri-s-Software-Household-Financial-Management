// Self-destructing service worker - unregisters itself and clears all caches
// so users always get fresh content from now on.

self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        Promise.all([
            // Clear all caches
            caches.keys().then((keys) => Promise.all(keys.map((k) => caches.delete(k)))),
            // Unregister self
            self.registration.unregister(),
            // Reload all open clients to load fresh content without SW
            self.clients.matchAll({ type: 'window' }).then((clients) => {
                clients.forEach((client) => {
                    if ('navigate' in client) client.navigate(client.url);
                });
            }),
        ])
    );
});

// Network-only for any fetches that come through during the brief activation window
self.addEventListener('fetch', (event) => {
    // Don't intercept anything - let browser handle it normally
    return;
});
