var CACHE_NAME = 'pwa-test-cache-v1';
var urlsToCache = [
  'index.html',
  'css/main.css',
  'js/main.js',
  'https://code.jquery.com/jquery-3.5.1.js',
  'icon/android-icon-192x192-dunplab-manifest-28009.png',
  'icon/apple-icon-114x114-dunplab-manifest-28009.png',
  'icon/apple-icon-120x120-dunplab-manifest-28009.png',
  'icon/apple-icon-144x144-dunplab-manifest-28009.png',
  'icon/apple-icon-152x152-dunplab-manifest-28009.png',
  'icon/apple-icon-180x180-dunplab-manifest-28009.png',
  'icon/apple-icon-57x57-dunplab-manifest-28009.png',
  'icon/apple-icon-60x60-dunplab-manifest-28009.png',
  'icon/apple-icon-72x72-dunplab-manifest-28009.png',
  'icon/apple-icon-76x76-dunplab-manifest-28009.png',
  'icon/favicon-16x16-dunplab-manifest-28009.png',
  'icon/favicon-32x32-dunplab-manifest-28009.png',
  'icon/favicon-96x96-dunplab-manifest-28009.png'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      // Cache hit - return response
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName != CACHE_NAME
        }).map(function(cacheName){
          return caches.delete(cacheName);
        })
      );
    })
  );
});