// Operator Registration / Sign Up View for Scam Arena

class SignupView {
  constructor() {
    this.container = null;
    this.selectedAvatar = '🛡️';
    this.errors = {};
    this.formData = {
      name: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  }

  mount(container) {
    this.container = container;
    this.errors = {};
    this.render();
  }

  unmount() {
    this.container = null;
  }

  render() {
    if (!this.container) return;

    const avatars = ['🛡️', '🕵️', '🤖', '⚡', '🦅', '🦊', '🥋', '👑'];

    this.container.innerHTML = `
      <div class="auth-wrapper">
        <div class="auth-card" style="max-width:520px;">
          <div class="auth-header">
            <div class="auth-header-icon">🛡️</div>
            <h2 class="auth-title">NEW OPERATOR RECRUITMENT</h2>
            <p class="auth-subtitle">Create your personal defense profile & initialize telemetry tracking</p>
          </div>

          <form class="auth-form" id="signup-form" novalidate>
            <!-- Full Name -->
            <div class="auth-field-group">
              <label class="auth-label" for="signup-name">FULL NAME</label>
              <div class="auth-input-wrapper">
                <input 
                  type="text" 
                  id="signup-name" 
                  class="auth-input ${this.errors.name ? 'has-error' : ''}" 
                  placeholder="e.g. Maya Patel" 
                  value="${this.formData.name || ''}"
                  required
                />
              </div>
              ${this.errors.name ? `<div class="auth-error-text">⚠️ ${this.errors.name}</div>` : ''}
            </div>

            <!-- Username & Email Grid -->
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
              <div class="auth-field-group">
                <label class="auth-label" for="signup-username">USERNAME</label>
                <div class="auth-input-wrapper">
                  <input 
                    type="text" 
                    id="signup-username" 
                    class="auth-input ${this.errors.username ? 'has-error' : ''}" 
                    placeholder="e.g. maya_defend" 
                    value="${this.formData.username || ''}"
                    required
                  />
                </div>
                ${this.errors.username ? `<div class="auth-error-text">⚠️ ${this.errors.username}</div>` : ''}
              </div>

              <div class="auth-field-group">
                <label class="auth-label" for="signup-email">EMAIL</label>
                <div class="auth-input-wrapper">
                  <input 
                    type="email" 
                    id="signup-email" 
                    class="auth-input ${this.errors.email ? 'has-error' : ''}" 
                    placeholder="maya@defense.io" 
                    value="${this.formData.email || ''}"
                    required
                  />
                </div>
                ${this.errors.email ? `<div class="auth-error-text">⚠️ ${this.errors.email}</div>` : ''}
              </div>
            </div>

            <!-- Avatar Selection -->
            <div class="auth-field-group">
              <label class="auth-label">SELECT OPERATOR AVATAR</label>
              <div class="avatar-selection-grid">
                ${avatars.map(a => `
                  <button type="button" class="avatar-option-btn ${this.selectedAvatar === a ? 'selected' : ''}" data-avatar="${a}">
                    ${a}
                  </button>
                `).join('')}
              </div>
            </div>

            <!-- Password & Confirm Grid -->
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
              <div class="auth-field-group">
                <label class="auth-label" for="signup-password">PASSWORD</label>
                <div class="auth-input-wrapper">
                  <input 
                    type="password" 
                    id="signup-password" 
                    class="auth-input ${this.errors.password ? 'has-error' : ''}" 
                    placeholder="Min 8 characters" 
                    required
                  />
                </div>
                ${this.errors.password ? `<div class="auth-error-text">⚠️ ${this.errors.password}</div>` : ''}
              </div>

              <div class="auth-field-group">
                <label class="auth-label" for="signup-confirm">CONFIRM</label>
                <div class="auth-input-wrapper">
                  <input 
                    type="password" 
                    id="signup-confirm" 
                    class="auth-input ${this.errors.confirmPassword ? 'has-error' : ''}" 
                    placeholder="Repeat password" 
                    required
                  />
                </div>
                ${this.errors.confirmPassword ? `<div class="auth-error-text">⚠️ ${this.errors.confirmPassword}</div>` : ''}
              </div>
            </div>

            <!-- Submit Button -->
            <button type="submit" class="cyber-btn btn-primary auth-submit-btn" id="btn-submit-signup">
              ⚡ INITIALIZE OPERATOR ACCOUNT
            </button>

            <!-- Divider -->
            <div class="auth-divider">
              <span>OR EVALUATE AS JURY</span>
            </div>

            <!-- Demo User Button -->
            <button type="button" class="cyber-btn auth-demo-btn" id="btn-signup-demo">
              <span>🚀 QUICK DEMO ACCESS (ALEX MORGAN)</span>
            </button>
          </form>

          <!-- Footer Switch Link -->
          <div class="auth-footer-links">
            <span>Already have an operator account? </span>
            <a href="#/login" class="auth-link" onclick="window.soundFx.playClick()">Sign in here ➔</a>
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    // Avatar selector clicks
    const avatarBtns = this.container.querySelectorAll('.avatar-option-btn');
    avatarBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        window.soundFx.playClick();
        this.selectedAvatar = e.currentTarget.getAttribute('data-avatar');
        avatarBtns.forEach(b => b.classList.remove('selected'));
        e.currentTarget.classList.add('selected');
      });
    });

    // Form submit
    const form = this.container.querySelector('#signup-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.formData.name = this.container.querySelector('#signup-name').value;
        this.formData.username = this.container.querySelector('#signup-username').value;
        this.formData.email = this.container.querySelector('#signup-email').value;
        this.formData.password = this.container.querySelector('#signup-password').value;
        this.formData.confirmPassword = this.container.querySelector('#signup-confirm').value;

        // Reset errors
        this.errors = {};

        // Client-side confirmation check
        if (!this.formData.confirmPassword) {
          this.errors.confirmPassword = 'Password confirmation is required.';
        } else if (this.formData.password !== this.formData.confirmPassword) {
          this.errors.confirmPassword = 'Passwords do not match.';
        }

        if (Object.keys(this.errors).length > 0) {
          window.soundFx.playDanger();
          this.render();
          return;
        }

        // Call register engine
        const result = window.authEngine.register({
          name: this.formData.name,
          username: this.formData.username,
          email: this.formData.email,
          password: this.formData.password,
          avatar: this.selectedAvatar
        });

        if (result.success) {
          window.soundFx.playLevelUp();
          this.showWelcomeTransition(result.user);
        } else {
          window.soundFx.playDanger();
          if (result.errors) {
            this.errors = { ...this.errors, ...result.errors };
          }
          this.render();
        }
      });
    }

    const demoBtn = this.container.querySelector('#btn-signup-demo');
    if (demoBtn) {
      demoBtn.addEventListener('click', () => {
        window.soundFx.playLevelUp();
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
        <span class="threat-badge threat-boss" style="font-size:0.75rem;">REGISTRATION COMPLETE</span>
        <h2 style="font-size:1.5rem; margin:0;">Welcome, ${user.name}!</h2>
        <p style="font-size:0.92rem; color:var(--text-muted); line-height:1.5; margin:0;">
          Operator profile created. Initializing defense telemetry...
        </p>
        <button class="cyber-btn btn-primary auth-submit-btn" id="btn-enter-arena">
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

    overlay.querySelector('#btn-enter-arena').addEventListener('click', proceed);
    setTimeout(proceed, 1800);
  }
}

window.SignupView = SignupView;
