const CacheFirst = workbox.strategies.CacheFirst;

workbox.routing.registerRoute(
  ({ url }) => url.origin === 'https://firebasestorage.googleapis.com',
  new CacheFirst({
    cacheName: 'firebase',
  })
);
workbox.precaching.precacheAndRoute(self.__precacheManifest || []);
