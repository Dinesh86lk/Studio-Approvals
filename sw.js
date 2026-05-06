// Studio Approvals — Service Worker
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));

self.addEventListener('push', e => {
  const data = e.data ? e.data.json() : {};
  const title = data.title || 'Studio Approvals';
  const options = {
    body: data.body || '',
    icon: data.icon || '/Studio-Approvals/icon.png',
    badge: data.badge || '/Studio-Approvals/icon.png',
    tag: data.tag || 'studio-approval',
    data: data.url || '/',
    requireInteraction: true
  };
  e.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.openWindow(e.notification.data || '/'));
});
