const APP_CACHE = "freelearn-app-v3";
const MEDIA_CACHE = "freelearn-media-v2";
const API_BASE_URL = self.location.origin;

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

  if (data.type === "SKIP_WAITING") {
    self.skipWaiting();
    return;
  }

  if (data.type === "CACHE_MEDIA" && Array.isArray(data.urls)) {
    console.log("SW: Début de mise en cache pour", data.urls);
    event.waitUntil(
      caches.open(MEDIA_CACHE).then((cache) => {
        return Promise.all(
          data.urls.map((url) =>
            fetch(url)
              .then(async (res) => {
                if (res.ok) {
                  await cache.put(url, res);
                  console.log("SW: Fichier mis en cache avec succès:", url);
                  return { url, cached: true };
                }
                console.error("SW: Erreur fetch (pas OK):", url, res.status);
                return { url, cached: false };
              })
              .catch((err) => {
                console.error("SW: Erreur réseau fetch:", url, err);
                return { url, cached: false };
              })
          )
        ).then((results) => {
          if (event.source) {
            results.forEach(({ url, cached }) => {
              event.source.postMessage({ type: "CACHED_STATUS", url, cached });
            });
          }
        });
      })
    );
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

  if (url.origin !== self.location.origin) return;

  event.respondWith(
    (async () => {
      const mediaCache = await caches.open(MEDIA_CACHE);
      const cachedMedia = await mediaCache.match(req);
      if (cachedMedia) return cachedMedia;

      const appCache = await caches.open(APP_CACHE);
      try {
        const fresh = await fetch(req);
        if (fresh && fresh.ok) {
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
    })()
  );
});
