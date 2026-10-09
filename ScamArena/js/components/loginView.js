// Operator Login View for Scam Arena

class LoginView {
  constructor() {
    this.container = null;
    this.errorMessage = null;
    this.infoMessage = null;
  }

  mount(container) {
    this.container = container;
    this.errorMessage = null;
    if (window.app && window.app.intendedRoute) {
      this.infoMessage = "Operator authentication required. Please sign in or continue as demo user to access this console.";
    } else {
      this.infoMessage = null;
    }
    this.render();
  }

  unmount() {
    if (this.welcomeTimer) {
      clearTimeout(this.welcomeTimer);
      this.welcomeTimer = null;
    }
    const overlay = document.querySelector('.welcome-fanfare-overlay');
    if (overlay) overlay.remove();
    this.container = null;
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="auth-wrapper">
        <div class="auth-card">
          <div class="auth-header">
            <div class="auth-header-icon">🔑</div>
            <h2 class="auth-title">OPERATOR LOGIN</h2>
            <p class="auth-subtitle">Access your tactical cybersecurity defense console</p>
          </div>

          ${this.errorMessage ? `
            <div class="auth-alert-banner" style="margin-bottom:16px;">
              <span>⚠️</span>
              <span>${this.errorMessage}</span>
            </div>
          ` : ''}

          ${this.infoMessage ? `
            <div class="auth-info-banner" style="margin-bottom:16px;">
              <span>ℹ️</span>
              <span>${this.infoMessage}</span>
            </div>
          ` : ''}

          <form class="auth-form" id="login-form">
            <!-- Username or Email Field -->
            <div class="auth-field-group">
              <label class="auth-label" for="login-email">
                <span>USERNAME OR EMAIL</span>
              </label>
              <div class="auth-input-wrapper">
                <input 
                  type="text" 
                  id="login-email" 
                  name="login-identifier"
                  data-alias="login-identifier"
                  class="auth-input ${this.errorMessage ? 'has-error' : ''}" 
                  placeholder="e.g. alex or operator@scamarena.app" 
                  autocomplete="username"
                  required
                />
              </div>
            </div>

            <!-- Password Field -->
            <div class="auth-field-group">
              <label class="auth-label" for="login-password">
                <span>PASSWORD</span>
                <button type="button" class="auth-link" id="btn-forgot-pwd" style="font-size:0.75rem; text-transform:none; font-family:var(--font-body);">
                  Forgot password?
                </button>
              </label>
              <div class="auth-input-wrapper">
                <input 
                  type="password" 
                  id="login-password" 
                  class="auth-input ${this.errorMessage ? 'has-error' : ''}" 
                  placeholder="Enter your security password" 
                  autocomplete="current-password"
                  required
                />
                <button type="button" class="auth-input-pwd-toggle" id="btn-toggle-pwd" title="Show/Hide Password">
                  👁️
                </button>
              </div>
            </div>

            <!-- Submit Button -->
            <button type="submit" class="cyber-btn btn-primary auth-submit-btn" id="btn-login-submit" data-action="btn-submit-login">
              ⚡ LOGIN TO CONSOLE
            </button>

            <!-- Divider -->
            <div class="auth-divider">
              <span>OR EVALUATE AS JURY</span>
            </div>

            <!-- Demo User Button -->
            <button type="button" class="cyber-btn auth-demo-btn" id="btn-login-demo">
              <span>🚀 CONTINUE AS DEMO USER (ALEX MORGAN)</span>
            </button>
          </form>

          <!-- Footer Switch Link -->
          <div class="auth-footer-links">
            <span>New cybersecurity recruit? </span>
            <a href="#/signup" class="auth-link" onclick="window.soundFx.playClick()">Create an account ➔</a>
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    const form = this.container.querySelector('#login-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const identifier = (this.container.querySelector('#login-email') || this.container.querySelector('#login-identifier')).value;
        const password = this.container.querySelector('#login-password').value;

        window.soundFx.playClick();
        const result = window.authEngine.login(identifier, password);

        if (result.success) {
          window.soundFx.playLevelUp();
          this.errorMessage = null;
          this.showWelcomeTransition(result.user);
        } else {
          window.soundFx.playDanger();
          this.errorMessage = result.error;
          this.render();
          const idInput = this.container.querySelector('#login-email') || this.container.querySelector('#login-identifier');
          if (idInput) idInput.focus();
        }
      });
    }

    const demoBtn = this.container.querySelector('#btn-login-demo');
    if (demoBtn) {
      demoBtn.addEventListener('click', () => {
        window.soundFx.playLevelUp();
        const res = window.authEngine.loginAsDemo();
        if (res.success) {
          this.showWelcomeTransition(res.user);
        }
      });
    }

    const togglePwd = this.container.querySelector('#btn-toggle-pwd');
    if (togglePwd) {
      togglePwd.addEventListener('click', () => {
        const input = this.container.querySelector('#login-password');
        if (input) {
          input.type = input.type === 'password' ? 'text' : 'password';
          togglePwd.textContent = input.type === 'password' ? '👁️' : '🔒';
        }
      });
    }

    const forgotBtn = this.container.querySelector('#btn-forgot-pwd');
    if (forgotBtn) {
      forgotBtn.addEventListener('click', () => {
        window.soundFx.playClick();
        this.infoMessage = "Demo mode: Password recovery is local. Default demo password is 'Password123!', or use 'Continue as Demo User' for instant evaluation.";
        this.render();
      });
    }
  }

  showWelcomeTransition(user) {
    const overlay = document.createElement('div');
    overlay.className = 'welcome-fanfare-overlay';
    overlay.innerHTML = `
      <div class="welcome-fanfare-box">
        <div class="welcome-avatar-circle">${user.avatar || '🛡️'}</div>
        <span class="threat-badge threat-boss" style="font-size:0.75rem;">AUTHENTICATION CONFIRMED</span>
        <h2 style="font-size:1.5rem; margin:0;">Welcome back, ${user.name}.</h2>
        <p style="font-size:0.92rem; color:var(--text-muted); line-height:1.5; margin:0;">
          Ready to test your scam detection skills?
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
      if (this.welcomeTimer) {
        clearTimeout(this.welcomeTimer);
        this.welcomeTimer = null;
      }
      if (overlay.parentNode) overlay.remove();
      window.location.hash = redirectPath;
    };

    overlay.querySelector('#btn-enter-arena').addEventListener('click', proceed);
    this.welcomeTimer = setTimeout(proceed, 500);
  }
}

window.LoginView = LoginView;
