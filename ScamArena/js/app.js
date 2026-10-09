// Main Application Router & Orchestrator for Scam Arena

class ScamArenaApp {
  constructor() {
    this.navContainer = document.getElementById('nav-container');
    this.viewContainer = document.getElementById('view-container');
    this.navbar = new window.NavbarComponent();
    this.activeView = null;

    // Component instances
    this.welcomeView = new window.WelcomeView();
    this.loginView = new window.LoginView();
    this.signupView = new window.SignupView();
    this.landingView = new window.LandingView();
    this.arenaView = new window.ArenaView();
    this.duelView = new window.DuelView();
    this.scanView = new window.ScanView();
    this.judgeView = new window.JudgeView();
    this.intelligenceView = new window.IntelligenceView();
    this.leaderboardView = new window.LeaderboardView();
    this.profileView = new window.ProfileView();
    this.intendedRoute = null;

    window.arenaComponent = this.arenaView;
    window.duelComponent = this.duelView;
  }

  init() {
    // 1. Initialize Theme
    const state = window.appState.get();
    document.documentElement.setAttribute('data-theme', state.theme);

    // 2. Mount Navbar
    this.navbar.mount(this.navContainer);

    // 3. Listen to Hash & Navigation Changes
    window.addEventListener('hashchange', () => this.handleRoute());
    window.addEventListener('popstate', () => this.handleRoute());
    if (window.navigation) {
      window.navigation.addEventListener('navigate', () => {
        setTimeout(() => this.handleRoute(), 10);
      });
    }

    // 4. Listen to Auth State Changes
    if (window.authEngine) {
      window.authEngine.subscribe(() => {
        this.navbar.render();
      });
    }

    // 5. Setup Global Keyboard Shortcuts
    this.setupKeyboardShortcuts();

    // 6. Initial Route Dispatch
    this.handleRoute();
  }

  handleRoute() {
    const rawHash = window.location.hash || '#/';
    const path = rawHash.split('?')[0];

    const isAuth = window.authEngine && window.authEngine.isAuthenticated();
    const publicRoutes = ['#/welcome', '#/login', '#/signup'];

    // Route Protection Guard
    if (!isAuth) {
      if (path === '#/' || path === '' || path === '#/welcome') {
        if (this.activeView && typeof this.activeView.unmount === 'function') {
          this.activeView.unmount();
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.activeView = this.welcomeView;
        this.welcomeView.mount(this.viewContainer);
        this.navbar.render();
        return;
      }

      if (!publicRoutes.includes(path)) {
        // Protected route accessed while unauthenticated!
        this.intendedRoute = rawHash;
        window.location.hash = '#/login';
        return;
      }
    } else {
      // Authenticated user trying to access public auth routes
      if (publicRoutes.includes(path)) {
        window.location.hash = '#/';
        return;
      }
    }

    // Clean up previous view
    if (this.activeView && typeof this.activeView.unmount === 'function') {
      this.activeView.unmount();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });

    switch(path) {
      case '#/':
      case '':
        if (isAuth) {
          this.activeView = this.landingView;
          this.landingView.mount(this.viewContainer);
        } else {
          this.activeView = this.welcomeView;
          this.welcomeView.mount(this.viewContainer);
        }
        break;

      case '#/welcome':
        this.activeView = this.welcomeView;
        this.welcomeView.mount(this.viewContainer);
        break;

      case '#/login':
        this.activeView = this.loginView;
        this.loginView.mount(this.viewContainer);
        break;

      case '#/signup':
        this.activeView = this.signupView;
        this.signupView.mount(this.viewContainer);
        break;

      case '#/arena':
        this.activeView = this.arenaView;
        this.arenaView.mount(this.viewContainer, null);
        break;

      case '#/arena/play':
        this.activeView = this.arenaView;
        this.arenaView.mount(this.viewContainer);
        break;

      case '#/duel':
        this.activeView = this.duelView;
        this.duelView.mount(this.viewContainer);
        break;

      case '#/scan':
        this.activeView = this.scanView;
        this.scanView.mount(this.viewContainer);
        break;

      case '#/demo':
        this.activeView = this.judgeView;
        this.judgeView.mount(this.viewContainer);
        break;

      case '#/intelligence':
        this.activeView = this.intelligenceView;
        this.intelligenceView.mount(this.viewContainer);
        break;

      case '#/leaderboard':
        this.activeView = this.leaderboardView;
        this.leaderboardView.mount(this.viewContainer);
        break;

      case '#/profile':
        this.activeView = this.profileView;
        this.profileView.mount(this.viewContainer);
        break;

      default:
        if (isAuth) {
          this.activeView = this.landingView;
          this.landingView.mount(this.viewContainer);
        } else {
          this.activeView = this.welcomeView;
          this.welcomeView.mount(this.viewContainer);
        }
        break;
    }

    // Refresh navbar active link states
    this.navbar.render();
  }

  setupKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
      // Ignore if user is typing in input or textarea
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      const key = e.key.toLowerCase();

      // Mute toggle: 'm'
      if (key === 'm') {
        window.soundFx.toggleMute();
        this.navbar.render();
        return;
      }

      // Theme toggle: 't'
      if (key === 't') {
        window.appState.toggleTheme();
        return;
      }

      // Live Arena Hotkeys:
      // '1' or 's' -> SAFE
      // '2' or 'w' -> SUSPICIOUS
      // '3' or 'x' -> SCAM
      const hash = window.location.hash || '';
      if (hash.startsWith('#/arena/play')) {
        if (key === '1' || key === 's') {
          const btn = document.getElementById('btn-decision-safe') || document.getElementById('senior-act-safe');
          if (btn) btn.click();
        } else if (key === '2' || key === 'w') {
          const btn = document.getElementById('btn-decision-suspicious') || document.getElementById('senior-act-suspicious');
          if (btn) btn.click();
        } else if (key === '3' || key === 'x') {
          const btn = document.getElementById('btn-decision-scam') || document.getElementById('senior-act-scam');
          if (btn) btn.click();
        }
      }
    });
  }
}

// Boot application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.app = new ScamArenaApp();
  window.app.init();
});
