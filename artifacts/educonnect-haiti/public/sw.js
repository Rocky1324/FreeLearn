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
    const REAL_API_URL = "https://educonnect-api-07ao.onrender.com";
    console.log("SW: Début de mise en cache pour", data.urls);
    
    event.waitUntil(
      caches.open(MEDIA_CACHE).then((cache) => {
        return Promise.all(
          data.urls.map((url) => {
            // Si l'URL est locale (/api/proxy-pdf...), on la transforme en URL API réelle pour le téléchargement
            const fetchUrl = url.replace(self.location.origin, REAL_API_URL);
            
            return fetch(fetchUrl)
              .then((res) => {
                if (res.ok) {
                  console.log("SW: Fichier récupéré avec succès depuis l'API:", fetchUrl);
                  // Mais on le range sous l'URL locale pour que le frontend le retrouve
                  return cache.put(url, res);
                }
                console.error("SW: Erreur fetch API (pas OK):", fetchUrl, res.status);
              })
              .catch((err) => { console.error("SW: Erreur réseau fetch API:", fetchUrl, err); });
          })
        ).then(() => {
          console.log("SW: Mise en cache terminée");
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

  // 1. INTERCEPTION PRIORITAIRE : Lecture PDF (même si c'est une navigation)
  if (url.pathname.startsWith("/view-pdf")) {
    event.respondWith(
      (async () => {
        const targetUrl = url.searchParams.get("url");
        const REAL_API_URL = "https://educonnect-api-07ao.onrender.com";
        
        // On construit deux URLs : une pour le cache (interne), une pour le réseau (externe)
        const cacheKey = `${self.location.origin}/api/proxy-pdf?url=${encodeURIComponent(targetUrl || "")}`;
        const networkUrl = `${REAL_API_URL}/api/proxy-pdf?url=${encodeURIComponent(targetUrl || "")}`;
        
        const mediaCache = await caches.open(MEDIA_CACHE);
        const cachedResponse = await mediaCache.match(cacheKey);
        
        if (cachedResponse) {
          console.log("SW: Lecture du PDF depuis le cache");
          return cachedResponse;
        }
        
        console.log("SW: PDF non trouvé en cache, tentative réseau via API réelle");
        return fetch(networkUrl);
      })()
    );
    return;
  }

  // 2. Sécurité : On ne gère que les fichiers de notre domaine pour le reste
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    (async () => {
      // 3. Chercher dans le cache Média (Images, etc.)
      const mediaCache = await caches.open(MEDIA_CACHE);
      const cachedMedia = await mediaCache.match(req);
      if (cachedMedia) return cachedMedia;

      // 4. Chercher dans le cache App (scripts/styles/html)

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
