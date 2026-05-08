const APP_CACHE = "freelearn-app-v2";
const MEDIA_CACHE = "freelearn-media-v1";

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(APP_CACHE).then((cache) =>
      cache.add("./").catch(() => {})
    )
  );
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

  if (data.type === "SKIP_WAITING") {
    self.skipWaiting();
    return;
  }

  if (data.type === "CACHE_MEDIA" && Array.isArray(data.urls)) {
    event.waitUntil(
      caches.open(MEDIA_CACHE).then((cache) => {
        return Promise.all(
          data.urls.map((url) =>
            fetch(url)
              .then((res) => {
                if (res.ok) cache.put(url, res);
              })
              .catch(() => {})
          )
        );
      })
    );
    if (event.source) {
      event.source.postMessage({ type: "CACHE_MEDIA_START", urls: data.urls });
    }
  }

  if (data.type === "REMOVE_MEDIA" && Array.isArray(data.urls)) {
    event.waitUntil(
      caches.open(MEDIA_CACHE).then(async (cache) => {
        for (const url of data.urls) await cache.delete(url);
      })
    );
  }

  if (data.type === "CHECK_CACHED" && data.url) {
    event.waitUntil(
      caches.open(MEDIA_CACHE).then(async (cache) => {
        const match = await cache.match(data.url);
        if (event.source) {
          event.source.postMessage({ type: "CACHED_STATUS", url: data.url, cached: !!match });
        }
      })
    );
  }
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  if (url.pathname.startsWith("/api/")) return;
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    (async () => {
      const mediaCache = await caches.open(MEDIA_CACHE);
      const cachedMedia = await mediaCache.match(req);
      if (cachedMedia) return cachedMedia;

      const appCache = await caches.open(APP_CACHE);

      if (req.mode === "navigate") {
        try {
          const fresh = await fetch(req);
          appCache.put(req, fresh.clone()).catch(() => {});
          return fresh;
        } catch {
          const cached = await appCache.match(req);
          if (cached) return cached;
          const shell = await appCache.match("./");
          if (shell) return shell;
          throw new Error("Offline — no cached shell");
        }
      }

      const cachedAsset = await appCache.match(req);
      if (cachedAsset) return cachedAsset;

      try {
        const fresh = await fetch(req);
        if (fresh && fresh.ok && fresh.type === "basic") {
          appCache.put(req, fresh.clone()).catch(() => {});
        }
        return fresh;
      } catch {
        throw new Error("Offline: resource not cached");
      }
    })()
  );
});
