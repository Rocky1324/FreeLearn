const APP_CACHE = "freelearn-app-v2";
const MEDIA_CACHE = "freelearn-media-v1";
const API_BASE_URL = "https://educonnect-api-07ao.onrender.com";

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
              .then((res) => {
                if (res.ok) {
                  console.log("SW: Fichier récupéré avec succès:", url);
                  return cache.put(url, res);
                }
                console.error("SW: Erreur fetch (pas OK):", url, res.status);
              })
              .catch((err) => { console.error("SW: Erreur réseau fetch:", url, err); })
          )
        ).then(() => {
          console.log("SW: Mise en cache terminée pour tous les fichiers");
          if (event.source) {
            data.urls.forEach(url => {
              event.source.postMessage({ type: "CACHED_STATUS", url, cached: true });
            });
          }
        });
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

  event.respondWith(
    (async () => {
      // 1. Interception spéciale pour la lecture des PDF sauvegardés
      if (url.pathname.startsWith("/view-pdf")) {
        const targetUrl = url.searchParams.get("url");
        const proxyUrl = `${API_BASE_URL}/api/proxy-pdf?url=${encodeURIComponent(targetUrl || "")}`;
        
        const mediaCache = await caches.open(MEDIA_CACHE);
        const cachedResponse = await mediaCache.match(proxyUrl);
        
        if (cachedResponse) {
          console.log("SW: Lecture du PDF depuis le cache");
          return cachedResponse;
        }
        
        // Si pas en cache, on redirige vers le vrai proxy (nécessite internet)
        console.log("SW: PDF non trouvé en cache, redirection vers l'API");
        return fetch(proxyUrl);
      }

      // 2. Chercher d'abord dans le cache Média (Images, etc.)
      const mediaCache = await caches.open(MEDIA_CACHE);
      const cachedMedia = await mediaCache.match(req);
      if (cachedMedia) return cachedMedia;

      if (url.origin !== self.location.origin) return fetch(req);

      // 2. Chercher dans le cache App (scripts/styles/html)
      const appCache = await caches.open(APP_CACHE);
      try {
        const fresh = await fetch(req);
        if (fresh && fresh.ok) {
          appCache.put(req, fresh.clone()).catch(() => { });
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
