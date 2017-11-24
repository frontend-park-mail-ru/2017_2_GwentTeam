const CACHE_VERSION = 'app_sw_v1';

const cacheUrls = [
    // '/game',
    // '/singleplayer',
    // '/about',
    // '/login',
    // '/signup',
    // '/',

    '/build/client.bundle.js',
    '/build/img/'
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
