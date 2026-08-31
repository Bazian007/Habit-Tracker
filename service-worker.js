const CACHE_NAME = "habit-tracker-v14";
const APP_FILES = [
    "./",
    "./index.html",
    "./styles.css",
    "./app.js",
    "./manifest.webmanifest",
    "./icons/icon-192.png",
    "./icons/icon-512.png",
  ];

  self.addEventListener("install", (event) => {
    event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_FILES))
    );
  });

  self.addEventListener("fetch", (event) => {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (event.request.method === "GET") {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, copy);
            });
          }

          return response;
        })
        .catch(() => caches.match(event.request))
    );
  });