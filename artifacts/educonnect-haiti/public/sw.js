const APP_CACHE = "educonnect-app-v1";
const MEDIA_CACHE = "educonnect-media-v1";

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(caches.open(APP_CACHE));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((k) => k !== APP_CACHE && k !== MEDIA_CACHE)
          .map((k) => caches.delete(k))
      );
      await self.clients.claim();
    })()
  );
});

self.addEventListener("message", (event) => {
  const data = event.data || {};
  if (data.type === "CACHE_MEDIA" && Array.isArray(data.urls)) {
    event.waitUntil(
      caches.open(MEDIA_CACHE).then((cache) => cache.addAll(data.urls)),
    );
  }
  if (data.type === "REMOVE_MEDIA" && Array.isArray(data.urls)) {
    event.waitUntil(
      caches.open(MEDIA_CACHE).then(async (cache) => {
        for (const url of data.urls) await cache.delete(url);
      }),
    );
  }
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    (async () => {
      const mediaCache = await caches.open(MEDIA_CACHE);
      const cachedMedia = await mediaCache.match(req);
      if (cachedMedia) return cachedMedia;

      const appCache = await caches.open(APP_CACHE);
      try {
        const fresh = await fetch(req);
        if (fresh && fresh.ok && fresh.type === "basic") {
          appCache.put(req, fresh.clone()).catch(() => {});
        }
        return fresh;
      } catch (err) {
        const cached = await appCache.match(req);
        if (cached) return cached;
        if (req.mode === "navigate") {
          const fallback = await appCache.match("./");
          if (fallback) return fallback;
        }
        throw err;
      }
    })(),
  );
});
