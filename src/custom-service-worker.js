const StaleWhileRevalidate = workbox.strategies.StaleWhileRevalidate;

workbox.routing.registerRoute(
  ({ url }) => url.origin === 'https://firebasestorage.googleapis.com',
  new StaleWhileRevalidate({
    cacheName: 'firebase',
  })
);
workbox.precaching.precacheAndRoute(self.__precacheManifest || []);
