// ZeroCoin Theme Switcher
(function () {
  function getPreferredTheme() {
    const saved = localStorage.getItem('zerocoin-theme');
    if (saved) return saved;
    // Default is dark (matches original website)
    return 'dark';
  }

  function applyTheme(theme) {
    const isLight = theme === 'light';
    if (isLight) {
      document.documentElement.setAttribute('data-theme', 'light');
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
    localStorage.setItem('zerocoin-theme', theme);
    updateButtons(isLight);
  }

  function updateButtons(isLight) {
    const label = isLight ? 'Увімкнути темну тему' : 'Увімкнути світлу тему';

    const mainBtn = document.getElementById('theme-toggle');
    if (mainBtn) {
      mainBtn.setAttribute('aria-label', label);
      mainBtn.setAttribute('title', label);
    }

    const mobileBtn = document.getElementById('mobile-theme-toggle');
    if (mobileBtn) {
      mobileBtn.setAttribute('aria-label', label);
      mobileBtn.setAttribute('title', label);
      const textSpan = mobileBtn.querySelector('.theme-text');
      if (textSpan) {
        textSpan.textContent = isLight ? 'Темна тема' : 'Світла тема';
      }
    }
  }

  function toggleTheme() {
    const currentIsLight = document.documentElement.getAttribute('data-theme') === 'light';
    applyTheme(currentIsLight ? 'dark' : 'light');
  }

  function init() {
    applyTheme(getPreferredTheme());

    const mainBtn = document.getElementById('theme-toggle');
    if (mainBtn) {
      mainBtn.addEventListener('click', toggleTheme);
    }

    const mobileBtn = document.getElementById('mobile-theme-toggle');
    if (mobileBtn) {
      mobileBtn.addEventListener('click', toggleTheme);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
