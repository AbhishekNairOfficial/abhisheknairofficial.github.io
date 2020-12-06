workbox.routing.registerRoute(new RegExp('/'), workbox.strategies.CacheFirst());
workbox.precaching.precacheAndRoute(self.__precacheManifest || []);
