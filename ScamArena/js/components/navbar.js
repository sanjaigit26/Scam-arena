// Cyber HUD Navigation Component with Multilingual Switcher & Authentication State

class NavbarComponent {
  constructor() {
    this.container = null;
    this.unsubscribeState = null;
    this.unsubscribeI18n = null;
    this.unsubscribeAuth = null;
  }

  mount(container) {
    this.container = container;
    this.render();
    this.unsubscribeState = window.appState.subscribe(() => this.render());
    if (window.i18n) {
      this.unsubscribeI18n = window.i18n.subscribe(() => this.render());
    }
    if (window.authEngine) {
      this.unsubscribeAuth = window.authEngine.subscribe(() => this.render());
    }
  }

  unmount() {
    if (this.unsubscribeState) this.unsubscribeState();
    if (this.unsubscribeI18n) this.unsubscribeI18n();
    if (this.unsubscribeAuth) this.unsubscribeAuth();
  }

  render() {
    if (!this.container) return;
    const state = window.appState.get();
    const lvlInfo = window.xpEngine.getLevelInfo(state.xp);
    const hash = window.location.hash || '#/';
    const isMuted = window.soundFx.isMuted();
    const isDark = state.theme === 'dark';
    const currentLang = window.i18n ? window.i18n.getLanguage() : 'en';
    const t = (k, def) => window.i18n ? window.i18n.t(k, def) : (def || k);

    const isAuth = window.authEngine ? window.authEngine.isAuthenticated() : false;
    const currentUser = window.authEngine ? window.authEngine.currentUser() : null;

    if (!isAuth) {
      // Unauthenticated Navigation Bar
      this.container.innerHTML = `
        <nav class="cyber-nav">
          <a href="#/welcome" class="nav-brand" onclick="window.soundFx.playClick()">
            <div class="brand-icon">🛡️</div>
            <span>${t('brandName', 'SCAM ARENA')}</span>
          </a>

          <div style="display:flex; align-items:center; gap:12px; margin-left:auto;">
            <!-- Multilingual Selector -->
            <div class="lang-switch-group" title="${t('langSelectLabel', 'Select Language')}">
              <button class="lang-btn ${currentLang === 'en' ? 'active' : ''}" data-lang="en">EN</button>
              <button class="lang-btn ${currentLang === 'ta' ? 'active' : ''}" data-lang="ta">தமிழ்</button>
              <button class="lang-btn ${currentLang === 'hi' ? 'active' : ''}" data-lang="hi">हिन्दी</button>
            </div>

            <!-- Audio & Theme -->
            <div class="hud-actions">
              <button class="icon-btn" id="btn-toggle-sound" title="${isMuted ? t('unmuteAudio', 'Unmute Audio') : t('muteAudio', 'Mute Audio')}">
                ${isMuted ? '🔇' : '🔊'}
              </button>
              <button class="icon-btn" id="btn-toggle-theme" title="${t('themeToggle', 'Toggle Theme')}">
                ${isDark ? '☀️' : '🌙'}
              </button>
            </div>

            <!-- Auth Action Buttons -->
            <a href="#/login" class="cyber-btn btn-outline btn-sm" onclick="window.soundFx.playClick()">
              🔑 LOGIN
            </a>
            <a href="#/signup" class="cyber-btn btn-primary btn-sm" onclick="window.soundFx.playClick()">
              ⚡ SIGN UP
            </a>
            <button class="cyber-btn btn-amber btn-sm" id="btn-nav-demo">
              🚀 DEMO
            </button>
          </div>
        </nav>
      `;

      this.bindSharedEvents();

      const demoBtn = this.container.querySelector('#btn-nav-demo');
      if (demoBtn) {
        demoBtn.addEventListener('click', () => {
          window.soundFx.playLevelUp();
          const res = window.authEngine.loginAsDemo();
          if (res.success) {
            window.location.hash = '#/';
          }
        });
      }
      return;
    }

    // Authenticated Navigation Bar
    this.container.innerHTML = `
      <nav class="cyber-nav">
        <a href="#/" class="nav-brand" onclick="window.soundFx.playClick()">
          <div class="brand-icon">🛡️</div>
          <span>${t('brandName', 'SCAM ARENA')}</span>
        </a>

        <ul class="nav-links">
          <li><a href="#/" class="nav-link ${hash === '#/' || hash === '' ? 'active' : ''}">${t('navHub', 'Mission Hub')}</a></li>
          <li><a href="#/arena" class="nav-link ${hash.startsWith('#/arena') ? 'active' : ''}">${t('navArena', 'Arena')}</a></li>
          <li><a href="#/duel" class="nav-link nav-duel-pill ${hash === '#/duel' ? 'active' : ''}">${t('navDuel', '⚔️ Chat Duel')}</a></li>
          <li><a href="#/scan" class="nav-link ${hash === '#/scan' ? 'active' : ''}">${t('navScan', 'Scan & Detect')}</a></li>
          <li><a href="#/intelligence" class="nav-link ${hash === '#/intelligence' ? 'active' : ''}">${t('navIntel', 'Threat Intel')}</a></li>
          <li><a href="#/leaderboard" class="nav-link ${hash === '#/leaderboard' ? 'active' : ''}">${t('navLeaderboard', 'Leaderboard')}</a></li>
          <li><a href="#/demo" class="nav-link nav-judge-pill ${hash === '#/demo' ? 'active' : ''}">${t('navJudge', '⚡ Judge Mode')}</a></li>
        </ul>

        <div class="nav-dossier">
          <!-- Multilingual Selector (EN | தமிழ் | हिन्दी) -->
          <div class="lang-switch-group" title="${t('langSelectLabel', 'Select Language')}">
            <button class="lang-btn ${currentLang === 'en' ? 'active' : ''}" data-lang="en">EN</button>
            <button class="lang-btn ${currentLang === 'ta' ? 'active' : ''}" data-lang="ta">தமிழ்</button>
            <button class="lang-btn ${currentLang === 'hi' ? 'active' : ''}" data-lang="hi">हिन्दी</button>
          </div>

          <!-- User HUD Area with Dropdown -->
          <div class="hud-user-menu-wrapper" id="user-menu-wrapper">
            <button class="hud-player-badge-btn" id="btn-user-menu-toggle" type="button" title="Operator Console Menu">
              <span class="level-badge-icon">${currentUser && currentUser.avatar ? currentUser.avatar : lvlInfo.badge}</span>
              <div class="player-info-text">
                <span class="player-level-title">
                  ${currentUser ? currentUser.username : 'Operator'}
                  ${currentUser && currentUser.isDemo ? '<span class="demo-account-tag">DEMO</span>' : ''}
                </span>
                <span class="player-xp-counter">${t('levelTitle', 'LVL')} ${lvlInfo.level} · ${state.xp} ${t('xpLabel', 'XP')}</span>
              </div>
              <span style="font-size:0.7rem; color:var(--text-dim); margin-left:4px;">▾</span>
            </button>

            <div class="user-menu-dropdown" id="user-menu-dropdown" style="display:none;">
              <div class="user-menu-header">
                <div class="user-menu-header-name">${currentUser ? currentUser.name : 'Operator'}</div>
                <div class="user-menu-header-meta">@${currentUser ? currentUser.username : 'operator'} · ${currentUser ? currentUser.email : ''}</div>
              </div>
              <a href="#/profile" class="user-menu-item" id="menu-item-profile">
                <span>👤</span>
                <span>Profile & Dossier</span>
              </a>
              <a href="#/profile" class="user-menu-item" id="menu-item-settings">
                <span>⚙️</span>
                <span>Settings & Presets</span>
              </a>
              <div class="user-menu-divider"></div>
              <button type="button" class="user-menu-item logout-item" id="menu-item-logout">
                <span>🚪</span>
                <span>Logout</span>
              </button>
            </div>
          </div>

          ${state.streak > 0 ? `
            <div class="streak-pill ${state.streak >= 4 ? 'streak-active-glow' : ''}" title="${t('streakLabel', 'Current Streak')}: ${state.streak}">
              <span class="streak-flame">🔥</span>
              <span>${state.streak}</span>
            </div>
          ` : ''}

          <div class="hud-score-badge" title="Total Score">
            <span>${t('ptsLabel', 'PTS')}</span>
            <span>${state.score}</span>
          </div>

          <div class="hud-actions">
            <button class="icon-btn" id="btn-toggle-sound" title="${isMuted ? t('unmuteAudio', 'Unmute Audio') : t('muteAudio', 'Mute Audio')}">
              ${isMuted ? '🔇' : '🔊'}
            </button>
            <button class="icon-btn" id="btn-toggle-theme" title="${t('themeToggle', 'Toggle Theme')}">
              ${isDark ? '☀️' : '🌙'}
            </button>
            <button class="icon-btn" id="btn-nav-logout" title="Logout Operator" style="color:var(--cyber-crimson);" onclick="window.soundFx.playClick()">
              🚪
            </button>
          </div>
        </div>
      </nav>
    `;

    this.bindSharedEvents();

    // Bind User Dropdown Toggle
    const menuToggle = this.container.querySelector('#btn-user-menu-toggle');
    const dropdown = this.container.querySelector('#user-menu-dropdown');
    if (menuToggle && dropdown) {
      menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        window.soundFx.playClick();
        const isOpen = dropdown.style.display !== 'none';
        dropdown.style.display = isOpen ? 'none' : 'flex';
        menuToggle.classList.toggle('menu-open', !isOpen);
      });

      const profileItem = dropdown.querySelector('#menu-item-profile');
      if (profileItem) {
        profileItem.addEventListener('click', () => {
          dropdown.style.display = 'none';
          menuToggle.classList.remove('menu-open');
        });
      }

      const settingsItem = dropdown.querySelector('#menu-item-settings');
      if (settingsItem) {
        settingsItem.addEventListener('click', () => {
          dropdown.style.display = 'none';
          menuToggle.classList.remove('menu-open');
        });
      }

      const menuLogout = dropdown.querySelector('#menu-item-logout');
      if (menuLogout) {
        menuLogout.addEventListener('click', () => {
          dropdown.style.display = 'none';
          window.soundFx.playDanger();
          window.authEngine.logout();
          window.location.hash = '#/welcome';
        });
      }

      // Close dropdown when clicking outside
      const outsideClick = (e) => {
        if (!this.container.contains(e.target)) {
          dropdown.style.display = 'none';
          menuToggle.classList.remove('menu-open');
          document.removeEventListener('click', outsideClick);
        }
      };
      document.addEventListener('click', outsideClick);
    }

    // Bind quick logout button
    const logoutBtn = this.container.querySelector('#btn-nav-logout');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        window.soundFx.playDanger();
        window.authEngine.logout();
        window.location.hash = '#/welcome';
      });
    }
  }

  bindSharedEvents() {
    // Bind language switchers
    const langBtns = this.container.querySelectorAll('.lang-btn');
    langBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const targetLang = e.currentTarget.getAttribute('data-lang');
        if (targetLang && window.i18n) {
          window.soundFx.playClick();
          window.i18n.setLanguage(targetLang);
        }
      });
    });

    // Bind sound toggle
    const soundBtn = this.container.querySelector('#btn-toggle-sound');
    if (soundBtn) {
      soundBtn.addEventListener('click', () => {
        window.soundFx.toggleMute();
        this.render();
      });
    }

    // Bind theme toggle
    const themeBtn = this.container.querySelector('#btn-toggle-theme');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        window.soundFx.playClick();
        window.appState.toggleTheme();
      });
    }
  }
}

window.NavbarComponent = NavbarComponent;
