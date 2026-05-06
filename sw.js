// Studio Approvals — Service Worker with FCM
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'AIzaSyAVv4NxYkXYLOWUNUcLGarmqLmjToTLs0Q',
  projectId: 'studio-approvals',
  messagingSenderId: '212756206526',
  appId: '1:212756206526:web:d59da8958a1bf974c45fef'
});

const messaging = firebase.messaging();

// Handle background push messages
messaging.onBackgroundMessage(payload => {
  const { title, body, tag } = payload.notification || payload.data || {};
  self.registration.showNotification(title || 'Studio Approvals', {
    body: body || '',
    tag: tag || 'studio',
    icon: 'https://dinesh86lk.github.io/Studio-Approvals/icon.png',
    badge: 'https://dinesh86lk.github.io/Studio-Approvals/icon.png',
    requireInteraction: true,
    data: { url: 'https://dinesh86lk.github.io/Studio-Approvals/' }
  });
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  const url = (e.notification.data && e.notification.data.url) || 'https://dinesh86lk.github.io/Studio-Approvals/';
  e.waitUntil(clients.matchAll({ type: 'window' }).then(wins => {
    const existing = wins.find(w => w.url === url);
    if (existing) return existing.focus();
    return clients.openWindow(url);
  }));
});
