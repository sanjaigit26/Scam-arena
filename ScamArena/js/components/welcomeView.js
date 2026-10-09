// Pre-Authentication Welcome & Landing Screen for Scam Arena

class WelcomeView {
  constructor() {
    this.container = null;
  }

  mount(container) {
    this.container = container;
    this.render();
  }

  unmount() {
    this.container = null;
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="welcome-hero-container">
        <!-- Top Cyber Badge -->
        <div class="welcome-logo-badge">
          <span>🛡️</span>
          <span>CYBER DEFENSE INTELLIGENCE PLATFORM</span>
        </div>

        <!-- Main Title & Tagline -->
        <h1 class="welcome-main-title">
          SCAM <span style="color:var(--cyber-cyan);">ARENA</span>
        </h1>

        <div class="welcome-tagline">
          "Detect. Decide. Defend."
        </div>

        <p class="welcome-subtitle">
          Train yourself to recognize digital scams before they become real-world threats.
          Experience realistic simulated cyber threats, confront conversational scammers, and build instinctive security reflexes.
        </p>

        <!-- Primary Call to Action Buttons -->
        <div class="welcome-actions-row">
          <a href="#/signup" class="cyber-btn btn-primary btn-lg" onclick="window.soundFx.playClick()">
            <span>⚡ START TRAINING</span>
          </a>
          <a href="#/login" class="cyber-btn btn-outline btn-lg" onclick="window.soundFx.playClick()">
            <span>🔑 LOGIN</span>
          </a>
          <a href="#/signup" class="cyber-btn btn-outline btn-lg" onclick="window.soundFx.playClick()">
            <span>📝 CREATE ACCOUNT</span>
          </a>
          <button class="cyber-btn btn-amber btn-lg" id="btn-welcome-demo" onclick="window.soundFx.playLevelUp()">
            <span>🚀 CONTINUE AS DEMO USER</span>
          </button>
        </div>

        <!-- Key Capability Cards -->
        <div class="welcome-features-grid">
          <div class="welcome-feature-card">
            <div class="welcome-feature-icon" style="color:var(--cyber-cyan);">🎮</div>
            <h3 style="font-size:1.15rem;">10 Realistic Missions</h3>
            <p style="font-size:0.86rem; color:var(--text-muted); line-height:1.5;">
              Investigate simulated SMS smishing, fake recruiters, reverse UPI requests, and executive AI voice notes.
            </p>
          </div>

          <div class="welcome-feature-card">
            <div class="welcome-feature-icon" style="color:var(--cyber-crimson);">⚔️</div>
            <h3 style="font-size:1.15rem;">Scammer Chat Duel</h3>
            <p style="font-size:0.86rem; color:var(--text-muted); line-height:1.5;">
              Confront deceptive social engineering bots in interactive real-time duels with Trust Shield mechanics.
            </p>
          </div>

          <div class="welcome-feature-card">
            <div class="welcome-feature-icon" style="color:var(--cyber-emerald);">🔬</div>
            <h3 style="font-size:1.15rem;">Explainable AI Engine</h3>
            <p style="font-size:0.86rem; color:var(--text-muted); line-height:1.5;">
              Transparent deterministic heuristics break down urgency, domain spoofing, and manipulation triggers.
            </p>
          </div>

          <div class="welcome-feature-card">
            <div class="welcome-feature-icon" style="color:#38bdf8;">👵</div>
            <h3 style="font-size:1.15rem;">Audience Protections</h3>
            <p style="font-size:0.86rem; color:var(--text-muted); line-height:1.5;">
              Tailored Senior Shield (voice read-aloud) and Kid Guardian (Guardy mascot) modes for all generations.
            </p>
          </div>
        </div>

        <div style="font-size:0.85rem; color:var(--text-dim); margin-top:24px; font-family:var(--font-mono);">
          <span>Already have an account? </span>
          <a href="#/login" class="auth-link">Sign in here ➔</a>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    const demoBtn = this.container.querySelector('#btn-welcome-demo');
    if (demoBtn) {
      demoBtn.addEventListener('click', () => {
        const res = window.authEngine.loginAsDemo();
        if (res.success) {
          this.showWelcomeTransition(res.user);
        }
      });
    }
  }

  showWelcomeTransition(user) {
    const overlay = document.createElement('div');
    overlay.className = 'welcome-fanfare-overlay';
    overlay.innerHTML = `
      <div class="welcome-fanfare-box">
        <div class="welcome-avatar-circle">${user.avatar || '🛡️'}</div>
        <span class="threat-badge threat-boss" style="font-size:0.75rem;">OPERATOR SESSION INITIALIZED</span>
        <h2 style="font-size:1.5rem; margin:0;">Welcome, ${user.name}!</h2>
        <p style="font-size:0.92rem; color:var(--text-muted); line-height:1.5; margin:0;">
          Ready to test your scam detection skills? Defense console is primed.
        </p>
        <button class="cyber-btn btn-primary auth-submit-btn" id="btn-enter-console">
          ⚡ ENTER THE ARENA ➔
        </button>
      </div>
    `;
    document.body.appendChild(overlay);

    const redirectPath = window.app && window.app.intendedRoute ? window.app.intendedRoute : '#/';
    if (window.app) window.app.intendedRoute = null;

    const proceed = () => {
      overlay.remove();
      window.location.hash = redirectPath;
    };

    overlay.querySelector('#btn-enter-console').addEventListener('click', proceed);
    setTimeout(proceed, 1800);
  }
}

window.WelcomeView = WelcomeView;
