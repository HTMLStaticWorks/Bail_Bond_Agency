/**
 * Bail Bond Agency Website
 * Preferences Controller - Manages Light/Dark Mode and LTR/RTL layout states.
 */

// Immediate execution of preferences initialization to prevent layout flash (FOUC)
(function initPreferences() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  const savedDir = localStorage.getItem('dir') || 'ltr';
  document.documentElement.setAttribute('dir', savedDir);
})();

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Toggle logic
  const themeToggleButtons = document.querySelectorAll('.theme-toggle-btn');
  updateToggleButtons();

  themeToggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateToggleButtons();
    });
  });

  function updateToggleButtons() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    themeToggleButtons.forEach(btn => {
      btn.setAttribute('aria-label', `Switch to ${currentTheme === 'dark' ? 'light' : 'dark'} mode`);
      if (currentTheme === 'dark') {
        btn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun">
            <circle cx="12" cy="12" r="4"/>
            <path d="M12 2v2"/>
            <path d="M12 20v2"/>
            <path d="m4.93 4.93 1.41 1.41"/>
            <path d="m17.66 17.66 1.41 1.41"/>
            <path d="M2 12h2"/>
            <path d="M20 12h2"/>
            <path d="m6.34 17.66-1.41 1.41"/>
            <path d="m19.07 4.93-1.41 1.41"/>
          </svg>
        `;
      } else {
        btn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon">
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
          </svg>
        `;
      }
    });
  }

  // 2. RTL Toggle logic
  const rtlToggleButtons = document.querySelectorAll('.rtl-toggle-btn');
  updateRtlButtons();

  rtlToggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
      const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
      
      document.documentElement.setAttribute('dir', newDir);
      localStorage.setItem('dir', newDir);
      updateRtlButtons();
    });
  });

  function updateRtlButtons() {
    const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
    rtlToggleButtons.forEach(btn => {
      btn.setAttribute('aria-label', `Switch to ${currentDir === 'rtl' ? 'left-to-right' : 'right-to-left'} layout`);
      btn.textContent = currentDir === 'rtl' ? 'LTR' : 'RTL';
    });
  }
});

