const CACHE_NAME = "2024-09-18 06:00";
const urlsToCache = [
  "/kanji-meiro/",
  "/kanji-meiro/index.js",
  "/kanji-meiro/mp3/incorrect1.mp3",
  "/kanji-meiro/mp3/cat.mp3",
  "/kanji-meiro/mp3/correct3.mp3",
  "/kanji-meiro/favicon/favicon.svg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    }),
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    }),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName)),
      );
    }),
  );
});
