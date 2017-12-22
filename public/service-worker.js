const CACHE_VERSION = 'app_sw_v3';

const cacheUrls = [
    '/client.bundle.js',
    '/img/',
    '/index.html'
];

this.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_VERSION)
            .then((cache) => {
                return cache.addAll(cacheUrls);
            })
    );
});

this.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }
            return fetch(event.request);
        })
    );
});
