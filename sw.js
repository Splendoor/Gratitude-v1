/* Service worker for One Thing.
   Job: make the app installable and work offline. Nothing else.
   Bump CACHE when you change any file below, or browsers will keep
   serving the old copy. */

const CACHE = "onething-v1";

const SHELL = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

// Install: pre-cache the shell.
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(SHELL))
      .then(() => self.skipWaiting())
  );
});

// Activate: drop caches from older versions.
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* Fetch: cache-first for our own files (fast, works offline).
   The font is fetched from Google and cached on first success; if it's
   never cached and you're offline, the app falls back to a system serif. */
self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.method !== "GET") return;

  event.respondWith(
    caches.match(req).then(hit => {
      if (hit) return hit;

      return fetch(req).then(res => {
        const url = new URL(req.url);
        const cacheable =
          url.origin === self.location.origin ||
          url.hostname === "fonts.googleapis.com" ||
          url.hostname === "fonts.gstatic.com";

        if (cacheable && (res.ok || res.type === "opaque")) {
          const copy = res.clone();
          caches.open(CACHE).then(cache => cache.put(req, copy));
        }
        return res;
      }).catch(() => {
        // Offline and not cached: for a page request, serve the app shell.
        if (req.mode === "navigate") return caches.match("./index.html");
        return new Response("", { status: 504, statusText: "Offline" });
      });
    })
  );
});
