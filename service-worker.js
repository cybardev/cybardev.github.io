// @ts-nocheck
const cacheName = "cybarspace";

self.addEventListener("install", (event) => {
    // Kick out the old service worker
    self.skipWaiting();

    event.waitUntil(
        caches.open(cacheName).then((cache) => {
            return cache.addAll([
                "/",
                "/images/touch/apple-icon-180.png",
                "/images/touch/apple-splash-1125-2436.jpg",
                "/images/touch/apple-splash-1136-640.jpg",
                "/images/touch/apple-splash-1170-2532.jpg",
                "/images/touch/apple-splash-1242-2208.jpg",
                "/images/touch/apple-splash-1242-2688.jpg",
                "/images/touch/apple-splash-1284-2778.jpg",
                "/images/touch/apple-splash-1334-750.jpg",
                "/images/touch/apple-splash-1536-2048.jpg",
                "/images/touch/apple-splash-1620-2160.jpg",
                "/images/touch/apple-splash-1668-2224.jpg",
                "/images/touch/apple-splash-1668-2388.jpg",
                "/images/touch/apple-splash-1792-828.jpg",
                "/images/touch/apple-splash-2048-1536.jpg",
                "/images/touch/apple-splash-2048-2732.jpg",
                "/images/touch/apple-splash-2160-1620.jpg",
                "/images/touch/apple-splash-2208-1242.jpg",
                "/images/touch/apple-splash-2224-1668.jpg",
                "/images/touch/apple-splash-2388-1668.jpg",
                "/images/touch/apple-splash-2436-1125.jpg",
                "/images/touch/apple-splash-2532-1170.jpg",
                "/images/touch/apple-splash-2688-1242.jpg",
                "/images/touch/apple-splash-2732-2048.jpg",
                "/images/touch/apple-splash-2778-1284.jpg",
                "/images/touch/apple-splash-640-1136.jpg",
                "/images/touch/apple-splash-750-1334.jpg",
                "/images/touch/apple-splash-828-1792.jpg",
                "/images/touch/cy-icon.png",
                "/images/touch/manifest-icon-192.maskable.png",
                "/images/touch/manifest-icon-512.maskable.png",
                "/favicon.ico",
                "/index.html",
                "/index.xml",
                "/manifest.json",
                "/sitemap.xml",
                "/robots.txt",
                "/CNAME",
                "/404.html",
            ]);
        })
    );
});

self.addEventListener("activate", (event) => {
    // Delete any non-current cache
    event.waitUntil(
        caches.keys().then((keys) => {
            Promise.all(
                keys.map((key) => {
                    if (![cacheName].includes(key)) {
                        return caches.delete(key);
                    }
                })
            );
        })
    );
});

// Offline-first, cache-first strategy
// Kick off two asynchronous requests, one to the cache and one to the network
// If there's a cached version available, use it, but fetch an update for next time.
// Gets data on screen as quickly as possible, then updates once the network has returned the latest data.
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.open(cacheName).then((cache) => {
            return cache.match(event.request).then((response) => {
                return (
                    response ||
                    fetch(event.request).then((networkResponse) => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    })
                );
            });
        })
    );
});
