(function () {
  // ✅ Register the Service Worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then(() => console.log('✅ Service worker registered'))
      .catch(err => console.warn('❌ Service worker error:', err));
  }

  // ✅ Handle PWA install prompt
  let deferredPrompt;
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;

    // Create install button
    const installBtn = document.createElement('button');
    installBtn.textContent = '⬇️ Install App';
    installBtn.style.position = 'fixed';
    installBtn.style.bottom = '1em';
    installBtn.style.left = '50%';
    installBtn.style.transform = 'translateX(-50%)';
    installBtn.style.zIndex = 999;
    installBtn.style.background = '#333';
    installBtn.style.color = '#fff';
    installBtn.style.border = '1px solid #555';
    installBtn.style.borderRadius = '6px';
    installBtn.style.padding = '0.5em 1em';
    installBtn.style.cursor = 'pointer';

    document.body.appendChild(installBtn);

    installBtn.addEventListener('click', () => {
      installBtn.remove();
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(() => {
        deferredPrompt = null;
      });
    });
  });
})();
