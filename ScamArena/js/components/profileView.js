// Player Profile & Trophy Dossier Component for Scam Arena with Printable Security Certificate

class ProfileView {
  constructor() {
    this.container = null;
    this.showCert = false;
  }

  mount(container) {
    this.container = container;
    this.render();
  }

  render() {
    if (!this.container) return;

    const state = window.appState.get();
    const lvlInfo = window.xpEngine.getLevelInfo(state.xp);
    const accuracy = window.appState.getAccuracy();
    const rating = window.appState.getSecurityRating();
    const allBadges = window.badgeEngine.getAllBadges();
    const unlockedIds = state.unlockedBadges || [];

    const currentUser = window.authEngine ? window.authEngine.currentUser() : null;
    const avatar = currentUser && currentUser.avatar ? currentUser.avatar : '🛡️';
    const fullName = currentUser ? currentUser.name : state.playerName;
    const username = currentUser ? currentUser.username : 'operator';
    const email = currentUser ? currentUser.email : 'local@scamarena.app';
    const streak = state.streak || 0;

    this.container.innerHTML = `
      <div class="judge-container">
        <!-- Operator Dossier Header Card -->
        <div class="cyber-panel" style="border-color:var(--cyber-cyan); box-shadow:var(--shadow-cyber);">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px; margin-bottom:20px;">
            <div style="display:flex; align-items:center; gap:18px;">
              <div class="profile-avatar-display">${avatar}</div>
              <div>
                <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
                  <span class="threat-badge threat-boss">CYBER OPERATOR DOSSIER</span>
                  ${currentUser && currentUser.isDemo ? '<span class="demo-account-tag">DEMO ACCOUNT</span>' : ''}
                </div>
                <h1 style="font-size:2rem; font-weight:900; margin:4px 0;">${fullName}</h1>
                <div style="font-family:var(--font-mono); font-size:0.85rem; color:var(--text-muted); margin-bottom:4px;">
                  @${username} · ${email}
                </div>
                <div style="font-family:var(--font-mono); font-size:0.85rem; color:var(--cyber-cyan);">
                  LEVEL ${lvlInfo.level} · ${lvlInfo.title}
                </div>
              </div>
            </div>

            <div style="text-align:right; display:flex; flex-direction:column; align-items:flex-end; gap:6px;">
              <div>
                <div class="mono-text" style="font-size:0.75rem; color:var(--text-dim);">SECURITY RATING</div>
                <div style="font-size:1.3rem; font-weight:800; color:var(--cyber-emerald); font-family:var(--font-heading);">${rating}</div>
                <div class="mono-text" style="font-size:0.8rem; color:var(--text-muted);">${accuracy}% Detection Accuracy · ${streak} 🔥 Streak</div>
              </div>
              <div style="display:flex; gap:8px; margin-top:4px;">
                <button class="cyber-btn btn-primary btn-sm" id="btn-open-cert" style="font-size:0.8rem; padding:6px 14px;">
                  📜 OFFICIAL CERTIFICATE ➔
                </button>
                <button class="cyber-btn btn-danger btn-sm" id="btn-profile-logout" style="font-size:0.8rem; padding:6px 14px;">
                  🚪 LOGOUT
                </button>
              </div>
            </div>
          </div>

          <!-- XP Progress Bar to Next Level -->
          <div style="margin-top:16px;">
            <div style="display:flex; justify-content:space-between; font-family:var(--font-mono); font-size:0.8rem; margin-bottom:6px;">
              <span>XP PROGRESSION: <strong>${state.xp} XP</strong> · TOTAL SCORE: <strong>${state.score} PTS</strong></span>
              <span>${lvlInfo.neededForNext > 0 ? `${lvlInfo.neededForNext} XP to LVL ${lvlInfo.level + 1}` : 'MAX LEVEL ACHIEVED'}</span>
            </div>
            <div class="risk-bar-track" style="height:14px;">
              <div class="risk-bar-fill fill-low" style="width:${lvlInfo.percent}%;"></div>
            </div>
          </div>
        </div>

        <!-- Career Statistics Grid -->
        <div class="judge-stats-grid" style="grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));">
          <div class="judge-stat-card">
            <span class="judge-stat-num">${state.missionsCompleted}</span>
            <span class="judge-stat-lbl">Missions Completed</span>
          </div>
          <div class="judge-stat-card">
            <span class="judge-stat-num" style="color:var(--cyber-emerald);">${state.threatsDetected}</span>
            <span class="judge-stat-lbl">Threats Detected</span>
          </div>
          <div class="judge-stat-card">
            <span class="judge-stat-num" style="color:var(--cyber-crimson);">${state.threatsMissed}</span>
            <span class="judge-stat-lbl">Threats Missed</span>
          </div>
          <div class="judge-stat-card">
            <span class="judge-stat-num" style="color:var(--cyber-cyan);">${accuracy}%</span>
            <span class="judge-stat-lbl">Accuracy Rate</span>
          </div>
          <div class="judge-stat-card">
            <span class="judge-stat-num" style="color:var(--cyber-amber);">${streak}</span>
            <span class="judge-stat-lbl">Current Streak 🔥</span>
          </div>
          <div class="judge-stat-card">
            <span class="judge-stat-num" style="color:var(--cyber-violet);">${state.cluesDiscoveredTotal}</span>
            <span class="judge-stat-lbl">Clues Discovered</span>
          </div>
        </div>

        <!-- Trophy Cabinet & Badges -->
        <div class="cyber-panel">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px;">
            <div>
              <span class="threat-badge threat-medium">ACHIEVEMENTS</span>
              <h2 style="font-size:1.4rem; margin-top:4px;">Trophy Cabinet (${unlockedIds.length}/${allBadges.length} Unlocked)</h2>
            </div>
          </div>

          <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(280px, 1fr)); gap:16px;">
            ${allBadges.map(b => {
              const isUnlocked = unlockedIds.includes(b.id);
              return `
                <div style="background:${isUnlocked ? 'var(--bg-surface-elevated)' : 'rgba(0,0,0,0.2)'}; border:1px solid ${isUnlocked ? 'var(--cyber-cyan)' : 'var(--border-subtle)'}; border-radius:var(--radius-md); padding:16px; display:flex; gap:14px; align-items:center; opacity:${isUnlocked ? '1' : '0.45'};">
                  <div style="font-size:2.2rem; filter:${isUnlocked ? 'none' : 'grayscale(100%)'};">${b.icon}</div>
                  <div>
                    <div style="display:flex; align-items:center; gap:8px;">
                      <span style="font-weight:800; font-size:0.95rem; color:${isUnlocked ? 'var(--cyber-cyan)' : 'var(--text-dim)'};">${b.title}</span>
                      <span class="threat-badge" style="font-size:0.65rem; padding:1px 6px;">${b.rarity}</span>
                    </div>
                    <p style="font-size:0.78rem; color:var(--text-muted); margin-top:4px; line-height:1.4;">${b.description}</p>
                    <div style="font-family:var(--font-mono); font-size:0.7rem; color:${isUnlocked ? 'var(--cyber-emerald)' : 'var(--text-dim)'}; margin-top:4px;">
                      ${isUnlocked ? '✓ UNLOCKED' : '🔒 LOCKED'}
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Profile Presets & Management Controls -->
        <div class="cyber-panel" style="background:rgba(0,0,0,0.25);">
          <h3 style="font-size:1.1rem; margin-bottom:8px;">PROFILE PRESETS & DEMO CONTROLS</h3>
          <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:14px;">
            Instantly simulate different progression ranks for testing and demonstration.
          </p>

          <div style="display:flex; flex-wrap:wrap; gap:12px;">
            <button class="cyber-btn btn-outline btn-sm" id="preset-rookie">
              RECRUIT LEVEL 1 (ROOKIE)
            </button>
            <button class="cyber-btn btn-outline btn-sm" id="preset-hunter">
              PRO LEVEL 5 (HUNTER)
            </button>
            <button class="cyber-btn btn-outline btn-sm" id="preset-guardian">
              ELITE LEVEL 7 (CYBER GUARDIAN)
            </button>
            <button class="cyber-btn btn-danger btn-sm" id="preset-reset">
              ⚠️ RESET ALL CAREER DATA
            </button>
          </div>
        </div>

        <!-- Printable Security Certificate Modal -->
        ${this.showCert ? `
          <div class="modal-backdrop" id="certificate-modal" style="display:flex; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); z-index:9999; align-items:center; justify-content:center; padding:20px; overflow-y:auto;">
            <div style="max-width:680px; width:100%;">
              <div class="certificate-frame">
                <div class="cert-seal">🛡️</div>
                <div class="threat-badge threat-boss" style="align-self:center; font-size:0.8rem;">SCAM ARENA DEFENSE ACADEMY</div>
                <h2 style="font-size:1.7rem; font-family:var(--font-heading); color:var(--cyber-cyan); margin:0;">CERTIFICATE OF CYBER DEFENSE PROFICIENCY</h2>
                <p style="font-size:0.85rem; color:var(--text-muted); margin:0;">This official credential verifies that</p>
                <h1 style="font-size:2.2rem; font-weight:900; color:#ffffff; margin:4px 0; text-transform:uppercase;">${state.playerName}</h1>
                <p style="font-size:0.92rem; color:var(--text-main); line-height:1.6; max-width:560px; margin:0 auto;">
                  has completed rigorous operational simulation training in detecting social engineering coercion, identifying spoofed domain indicators, and executing decisive incident countermeasures.
                </p>
                
                <div style="display:flex; justify-content:space-around; align-items:center; border-top:1px dashed var(--border-subtle); border-bottom:1px dashed var(--border-subtle); padding:16px 0; margin:10px 0; font-family:var(--font-mono); font-size:0.85rem;">
                  <div>
                    <div style="color:var(--text-dim); font-size:0.75rem;">OPERATOR RANK</div>
                    <div style="color:var(--cyber-cyan); font-weight:800;">LVL ${lvlInfo.level} · ${lvlInfo.title}</div>
                  </div>
                  <div>
                    <div style="color:var(--text-dim); font-size:0.75rem;">ACCURACY</div>
                    <div style="color:var(--cyber-emerald); font-weight:800;">${accuracy}% (${rating})</div>
                  </div>
                  <div>
                    <div style="color:var(--text-dim); font-size:0.75rem;">TOTAL SCORE</div>
                    <div style="color:var(--cyber-amber); font-weight:800;">${state.score} PTS (${state.xp} XP)</div>
                  </div>
                </div>

                <div style="display:flex; justify-content:space-between; align-items:flex-end; font-size:0.75rem; color:var(--text-dim); font-family:var(--font-mono); margin-top:10px;">
                  <div style="text-align:left;">
                    <div>ISSUED: ${new Date().toLocaleDateString()}</div>
                    <div>VERIFICATION: 0x${Math.abs((state.score * 7919 + state.xp * 31 + 4217)).toString(16).toUpperCase().padStart(12, '0')}</div>
                  </div>
                  <div style="text-align:right;">
                    <div style="border-bottom:1px solid var(--text-dim); width:140px; margin-bottom:4px;"></div>
                    <div>SCAM ARENA DEFENSE LABS</div>
                  </div>
                </div>

                <div style="display:flex; justify-content:center; gap:12px; margin-top:20px;" class="no-print">
                  <button class="cyber-btn btn-primary btn-sm" id="btn-print-cert">🖨️ PRINT / SAVE PDF</button>
                  <button class="cyber-btn btn-ghost btn-sm" id="btn-close-cert">CLOSE</button>
                </div>
              </div>
            </div>
          </div>
        ` : ''}
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    const openCert = this.container.querySelector('#btn-open-cert');
    if (openCert) openCert.addEventListener('click', () => {
      window.soundFx.playLevelUp();
      this.showCert = true;
      this.render();
    });

    const closeCert = this.container.querySelector('#btn-close-cert');
    if (closeCert) closeCert.addEventListener('click', () => {
      this.showCert = false;
      this.render();
    });

    const printCert = this.container.querySelector('#btn-print-cert');
    if (printCert) printCert.addEventListener('click', () => {
      window.print();
    });

    const rookie = this.container.querySelector('#preset-rookie');
    if (rookie) rookie.addEventListener('click', () => {
      window.soundFx.playClick();
      window.appState.loadPreset('rookie');
      this.render();
    });

    const hunter = this.container.querySelector('#preset-hunter');
    if (hunter) hunter.addEventListener('click', () => {
      window.soundFx.playLevelUp();
      window.appState.loadPreset('hunter');
      this.render();
    });

    const guardian = this.container.querySelector('#preset-guardian');
    if (guardian) guardian.addEventListener('click', () => {
      window.soundFx.playLevelUp();
      window.appState.loadPreset('guardian');
      this.render();
    });

    const reset = this.container.querySelector('#preset-reset');
    if (reset) reset.addEventListener('click', () => {
      if (confirm('Reset all player progress, XP, and badges back to zero?')) {
        window.soundFx.playDanger();
        window.appState.resetAll();
        this.render();
      }
    });

    const logoutBtn = this.container.querySelector('#btn-profile-logout');
    if (logoutBtn) logoutBtn.addEventListener('click', () => {
      window.soundFx.playDanger();
      window.authEngine.logout();
      window.location.hash = '#/welcome';
    });
  }
}

window.ProfileView = ProfileView;
