const CACHE = 'netstudy-v16';
const DATA_CACHE = 'netstudy-data-v1';
const FILES = [
  '.',
  'index.html',
  'style.css',
  'recall.css',
  'app.js',
  'study.js',
  'labs.js',
  'statsbar.js',
  'manifest.json',
  'data/ccna_glossary_data.js',
  'data/ccna_concepts.js',
  'fonts/inter-400.woff2',
  'fonts/inter-600.woff2',
  'fonts/inter-700.woff2',
  'fonts/inter-800.woff2',
  'fonts/playfairdisplay-700.woff2',
  'icons/zokie.svg',
  'icons/icon-180.png',
  'icons/icon-192.png',
  'icons/icon-512.png'
];
self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
});
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE && k !== DATA_CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;
  // Network-first for large study data and audio: fresh when online, cached copy when offline.
  if (url.pathname.endsWith('/data/ccna_active_recall.json') || url.pathname.endsWith('/data/ccna_practice_labs.json') || url.pathname.includes('/data/audio/') || url.pathname.includes('/data/behavioral_')) {
    e.respondWith(
      fetch(e.request).then(res => {
        if (res && res.status === 200) {
          const clone = res.clone();
          caches.open(DATA_CACHE).then(cache => cache.put(e.request, clone));
        }
        return res;
      }).catch(() => caches.match(e.request).then(r => r || caches.match('index.html')))
    );
    return;
  }
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).then(res => {
    if (res && res.status === 200) {
      const c = caches.open(CACHE).then(cache => { cache.put(e.request, res.clone()); return res; });
      return c;
    }
    return res;
  }).catch(() => caches.match('index.html'))));
});
