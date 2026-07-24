/* Brainchurn service worker — offline app shell.
   Strategy:
   - Navigations (opening the app): network-first, so users always get the
     latest version when online; falls back to the cached shell offline.
   - Other same-origin GETs (icons, manifest): cache-first.
   - Cross-origin calls (e.g. the Datamuse open-data API) are never cached
     and always go to the network. */
const CACHE = "brainchurn-v6";
const SHELL = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "icon-192.png",
  "icon-512.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  // Only handle same-origin GETs; let everything else hit the network.
  if (e.request.method !== "GET" || url.origin !== self.location.origin) return;

  // Navigations: network-first so updates apply, cached shell offline.
  if (e.request.mode === "navigate") {
    e.respondWith(
      fetch(e.request).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => { c.put("./", copy); }).catch(() => {});
        return res;
      }).catch(() =>
        caches.match("./", { ignoreSearch: true })
          .then((hit) => hit || caches.match("index.html"))
      )
    );
    return;
  }

  // Static assets: cache-first (ignoreSearch tolerates ?v= style params).
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then((hit) =>
      hit || fetch(e.request).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => { c.put(e.request, copy); }).catch(() => {});
        return res;
      })
    )
  );
});
