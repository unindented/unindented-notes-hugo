/*
{{ $latestArticles := partial "utils/articles-latest" . }}
{{ $latestArticles = delimit (apply $latestArticles "partial" "utils/rel-permalink" ".") "', '" }}

{{ $offlineImage := (resources.GetMatch "images/offline.svg").Content }}

{{ $version := now.Format "v20060102" }}
*/

// @ts-ignore
const _self = /** @type {ServiceWorkerGlobalScope} */ (self);

const version = "{{ $version }}";
const staticCacheName = version + "-static";
const pagesCacheName = version + "-pages";
const imagesCacheName = version + "-images";
const assetsCacheName = version + "-assets";

const offlinePages = [
  '{{ relref . "/" }}',
  '{{ relref . "/notes" }}',
  '{{ $latestArticles }}'
];

const staticAssets = [
  '{{ "offline.html" | relURL }}',
  '{{ "css/styles.min.css" | relURL }}',
  '{{ "js/scripts.min.mjs" | relURL }}',
  '{{ "favicon.ico" | relURL }}',
  '{{ "images/logo.svg" | relURL }}',
  '{{ "images/sprites.svg" | relURL }}',
];

const updateStaticCache = () => {
  // These items can be cached after install.
  caches.open(staticCacheName).then((cache) => cache.addAll(offlinePages.map((url) => new Request(url))));
  // These items must be cached for the ServiceWorker to complete installation.
  return caches.open(staticCacheName).then((cache) => cache.addAll(staticAssets.map((url) => new Request(url))));
};

/**
 * @param {string} cacheName
 * @param {Request} request
 * @param {Response} response
 */
const stashInCache = async (cacheName, request, response) => {
  const cache = await caches.open(cacheName);
  cache.put(request, response);
};

/**
 * @param {RequestInfo} request
 * @returns {Promise<Response | undefined>}
 */
const readCaches = (request) => caches.match(request, { ignoreVary: true });

/**
 * @param {string} cacheName
 * @param {number} maxItems
 */
const trimCache = async (cacheName, maxItems) => {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  if (keys.length > maxItems) {
    await cache.delete(keys[0]);
    trimCache(cacheName, maxItems);
  }
};

/**
 * @returns {Promise<boolean[]>}
 */
const clearOldCaches = async () => {
  const keys = await caches.keys();
  const keysToDelete = keys.filter((key) => key.indexOf(version) !== 0);
  return Promise.all(keysToDelete.map((key) => caches.delete(key)));
};

/**
 * @param {Request} request
 * @param {string} type
 * @returns {boolean}
 */
const isRequestOfType = (request, type) => {
  const accept = request.headers.get("accept") || "text/html";
  return accept.indexOf(type) != -1;
};

/**
 * @param {Request} request
 * @returns {boolean}
 */
const isRequestForOfflinePage = (request) => {
  const { pathname } = new URL(request.url);
  return offlinePages.includes(pathname) || offlinePages.includes(`${pathname}/`);
};

/**
 * @param {Request} request
 * @returns {boolean}
 */
const isRequestForStaticAsset = (request) => {
  const { pathname } = new URL(request.url);
  return staticAssets.includes(pathname);
};

/**
 * @param {Request} request
 * @returns {string}
 */
const getCacheNameForRequest = (request) => {
  if (isRequestForOfflinePage(request) || isRequestForStaticAsset(request)) {
    return staticCacheName;
  }
  if (isRequestOfType(request, "text/html")) {
    return pagesCacheName;
  }
  if (isRequestOfType(request, "image")) {
    return imagesCacheName;
  }
  return assetsCacheName;
};

_self.addEventListener("install", (event) => {
  event.waitUntil(updateStaticCache().then(() => _self.skipWaiting()));
});

_self.addEventListener("activate", (event) => {
  event.waitUntil(clearOldCaches().then(() => _self.clients.claim()));
});

_self.addEventListener("message", (event) => {
  if (event.data.command === "trimCaches") {
    trimCache(pagesCacheName, 25);
    trimCache(imagesCacheName, 10);
  }
});

_self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") {
    return;
  }

  /**
   * @param {Response} response
   * @returns {Response}
   */
  const onNetworkResolve = (response) => {
    const cacheCopy = response.clone();
    const cacheName = getCacheNameForRequest(request);
    stashInCache(cacheName, request, cacheCopy);

    return response;
  };

  /**
   * @returns {Promise<Response>}
   */
  const onNetworkReject = async () => {
    /** @type {Response | undefined} */
    let response;

    if (isRequestOfType(request, "text/html")) {
      response = (await readCaches(request)) ?? (await readCaches('{{ "offline.html" | relURL }}'));
    } else if (isRequestOfType(request, "image")) {
      response = new Response(`{{ $offlineImage }}`, { headers: { "content-type": "image/svg+xml" } });
    }

    return response ?? new Response(null, { status: 404, statusText: "Not Found" });
  };

  /**
   * @returns {Promise<Response>}
   */
  const fetchFromNetworkOrFallback = async () => {
    try {
      const response = await fetch(request);
      return onNetworkResolve(response);
    } catch {
      return onNetworkReject();
    }
  };

  /**
   * @returns {Promise<Response>}
   */
  const cacheOrFetchFromNetworkOrFallback = async () => {
    const cachedResponse = await readCaches(request);
    return cachedResponse ?? fetchFromNetworkOrFallback();
  };

  // For HTML requests, try the network first, then fall back to the cache.
  if (isRequestOfType(request, "text/html")) {
    return event.respondWith(fetchFromNetworkOrFallback());
  }
  // For non-HTML requests, try the cache first, then network if no cache exists, then fallback.
  event.respondWith(cacheOrFetchFromNetworkOrFallback());
});
