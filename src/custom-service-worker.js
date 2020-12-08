const CacheFirst = workbox.strategies.CacheFirst;
const CacheableResponsePlugin = workbox.plugins.CacheableResponsePlugin;
const ExpirationPlugin = workbox.plugins.ExpirationPlugin;

workbox.routing.registerRoute(
  ({ url }) => url.origin === 'https://firebasestorage.googleapis.com',
  new CacheFirst({
    cacheName: 'firebase',
  }),
  new CacheFirst({
    cacheName: 'images',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  })
);
workbox.precaching.precacheAndRoute(self.__precacheManifest || []);
