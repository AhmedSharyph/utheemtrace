const CACHE_NAME = "utheemtrace-cache-v1";
const urlsToCache = [
  "/utheemtrace/",
  "/utheemtrace/index.html",
  "/utheemtrace/style.css",
  "/utheemtrace/app.js",
  "/utheemtrace/install.js",
  "/utheemtrace/ft_logo.png",
  "/utheemtrace/manifest.json"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name))
      )
    )
  );
});
