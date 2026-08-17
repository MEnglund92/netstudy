// NetStudy service-worker registration.
// Loaded from index.html; registers the offline cache worker after first paint.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('sw.js').catch(function () {});
  });
}