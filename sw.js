// L'ancien générateur Instagram s'installait comme une application et gardait la page en cache.
// Ce service worker remplace l'ancien pour le désinstaller : il vide les caches, se désinscrit
// puis recharge les pages ouvertes depuis le site, qui sert alors toujours la dernière version.
self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(key => caches.delete(key)));
    await self.registration.unregister();
    const windows = await self.clients.matchAll({ type: 'window' });
    windows.forEach(client => client.navigate(client.url));
  })());
});
