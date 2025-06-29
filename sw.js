self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open("static").then((cache) => {
      return cache.addAll([
        "/",
        "/offline.html"
      ]);
    })
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request).then((res) => res || caches.match("/offline.html")))
  );
});
