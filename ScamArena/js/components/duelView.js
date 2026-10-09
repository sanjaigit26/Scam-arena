// SCAMMER CHAT DUEL COMPONENT (Route: /duel)
// Interactive turn-based conversational combat against simulated scammers

class DuelView {
  constructor() {
    this.container = null;
    this.unsubscribeDuel = null;
    this.selectedScenarioId = "duel_bank";
  }

  mount(container) {
    this.container = container;
    this.render();

    if (window.duelEngine) {
      this.unsubscribeDuel = window.duelEngine.subscribe(() => this.renderChatArea());
      // Start initial duel if idle
      if (window.duelEngine.getState().status === 'IDLE') {
        window.duelEngine.startDuel(this.selectedScenarioId);
      }
    }
  }

  unmount() {
    if (this.unsubscribeDuel) {
      this.unsubscribeDuel();
      this.unsubscribeDuel = null;
    }
  }

  render() {
    if (!this.container) return;
    const t = (k, def) => window.i18n ? window.i18n.t(k, def) : (def || k);
    const lang = window.i18n ? window.i18n.getLanguage() : 'en';
    const scripts = window.DUEL_SCRIPTS || [];

    this.container.innerHTML = `
      <div class="judge-container">
        <!-- Header -->
        <div class="scanner-header" style="text-align:center; margin-bottom:16px;">
          <div class="threat-badge threat-boss" style="align-self:center;">FLAGSHIP CYBER COMBAT</div>
          <h1 class="scanner-title">⚔️ ${t('duelTitle', 'SCAMMER CHAT DUEL')}</h1>
          <p class="scanner-subtitle">
            ${t('duelSubtitle', 'Interrogate and outsmart simulated scammers in live conversational combat. Protect your Trust Shield!')}
          </p>
        </div>

        <!-- Scammer Scenario Selector Bar -->
        <div style="display:flex; justify-content:center; gap:10px; flex-wrap:wrap; margin-bottom:16px;">
          ${scripts.map(sc => `
            <button class="cyber-btn ${this.selectedScenarioId === sc.id ? 'btn-primary' : 'btn-outline'} btn-sm select-duel-scenario-btn" data-id="${sc.id}">
              <span>${sc.avatar}</span>
              <span>${sc.title[lang] || sc.title.en}</span>
              <span class="threat-badge ${sc.difficulty === 'EASY' ? 'threat-easy' : sc.difficulty === 'MEDIUM' ? 'threat-medium' : 'threat-hard'}" style="font-size:0.65rem; padding:1px 6px;">
                ${sc.difficulty}
              </span>
            </button>
          `).join('')}
        </div>

        <!-- Duel Battlefield -->
        <div id="duel-battlefield-slot"></div>
      </div>
    `;

    // Bind scenario buttons
    const btns = this.container.querySelectorAll('.select-duel-scenario-btn');
    btns.forEach(b => {
      b.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        if (id && id !== this.selectedScenarioId) {
          this.selectedScenarioId = id;
          window.soundFx.playClick();
          window.duelEngine.startDuel(id);
          this.render();
        }
      });
    });

    this.renderChatArea();
  }

  renderChatArea() {
    const slot = document.getElementById('duel-battlefield-slot');
    if (!slot) return;

    const state = window.duelEngine.getState();
    const sc = state.scenario;
    if (!sc) return;

    const t = (k, def) => window.i18n ? window.i18n.t(k, def) : (def || k);
    const lang = window.i18n ? window.i18n.getLanguage() : 'en';

    // Check terminal outcome
    if (state.status === 'WON' || state.status === 'LOST') {
      slot.innerHTML = this.renderDuelReport(state, sc, t, lang);
      this.bindReportEvents();
      return;
    }

    const currentStep = state.step;
    const isTyping = state.status === 'TYPING';

    slot.innerHTML = `
      <div style="display:grid; grid-template-columns: 1fr 320px; gap:20px; align-items:start;">
        <!-- Left: Chat Arena -->
        <div class="cyber-panel" style="padding:0; overflow:hidden; border-color:var(--border-strong);">
          <!-- Top HUD Bar: Shield & Pressure -->
          <div style="background:var(--bg-surface-elevated); padding:16px 20px; border-bottom:1px solid var(--border-subtle); display:flex; flex-direction:column; gap:12px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <div style="display:flex; align-items:center; gap:10px;">
                <span style="font-size:1.8rem;">${sc.avatar}</span>
                <div>
                  <div style="font-weight:800; font-size:1rem; color:var(--text-main);">${sc.scammerName[lang] || sc.scammerName.en}</div>
                  <div style="font-size:0.75rem; color:var(--cyber-cyan); font-family:var(--font-mono);">
                    ${isTyping ? '⚡ SCAMMER IS TYPING...' : '🔴 LIVE CONVERSATION'}
                  </div>
                </div>
              </div>

              <!-- AI Mode Toggle Badge -->
              <div style="display:flex; align-items:center; gap:8px;">
                <label style="font-size:0.72rem; color:var(--text-dim); font-family:var(--font-mono); display:flex; align-items:center; gap:4px; cursor:pointer;">
                  <input type="checkbox" id="duel-ai-toggle" ${state.aiMode ? 'checked' : ''}>
                  <span>${t('aiModeToggle', 'AI Mode (Requires LLM API Key)')}</span>
                </label>
              </div>
            </div>

            <!-- Gauges: Player Shield vs Scammer Pressure -->
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:16px;">
              <div>
                <div style="display:flex; justify-content:space-between; font-size:0.75rem; font-family:var(--font-mono); font-weight:700; margin-bottom:4px;">
                  <span style="color:var(--cyber-emerald);">${t('trustShieldLabel', 'TRUST SHIELD')}:</span>
                  <span style="color:var(--cyber-emerald);">${state.trustShield}%</span>
                </div>
                <div class="risk-bar-track" style="height:10px;">
                  <div class="risk-bar-fill fill-low" style="width:${state.trustShield}%;"></div>
                </div>
              </div>

              <div>
                <div style="display:flex; justify-content:space-between; font-size:0.75rem; font-family:var(--font-mono); font-weight:700; margin-bottom:4px;">
                  <span style="color:var(--cyber-crimson);">${t('pressureMeterLabel', 'SCAMMER PRESSURE')}:</span>
                  <span style="color:var(--cyber-crimson);">${state.scammerPressure}%</span>
                </div>
                <div class="risk-bar-track" style="height:10px;">
                  <div class="risk-bar-fill fill-high" style="width:${state.scammerPressure}%;"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Chat Messages Scroll Stream -->
          <div id="duel-messages-stream" style="min-height:360px; max-height:460px; overflow-y:auto; padding:20px; display:flex; flex-direction:column; gap:14px; background:rgba(0,0,0,0.25);">
            ${state.chatHistory.map(m => {
              if (m.sender === 'system') {
                return `
                  <div style="align-self:center; max-width:90%; background:${m.type === 'good' ? 'rgba(16,185,129,0.15)' : 'rgba(255,51,102,0.15)'}; border:1px solid ${m.type === 'good' ? 'var(--cyber-emerald)' : 'var(--cyber-crimson)'}; padding:8px 14px; border-radius:8px; font-size:0.82rem; color:${m.type === 'good' ? '#a7f3d0' : '#fecdd3'}; text-align:center;">
                    ${m.tacticTag ? `<span class="threat-badge threat-boss" style="font-size:0.65rem; margin-right:6px;">🎯 ${t('tacticExposed', 'TACTIC EXPOSED')}: ${m.tacticTag}</span>` : ''}
                    <span>${m.text}</span>
                  </div>
                `;
              }
              const isPlayer = m.sender === 'player';
              return `
                <div style="display:flex; flex-direction:column; align-self:${isPlayer ? 'flex-end' : 'flex-start'}; max-width:82%;">
                  <div style="font-size:0.72rem; color:var(--text-dim); margin-bottom:2px; font-family:var(--font-mono); text-align:${isPlayer ? 'right' : 'left'};">
                    ${isPlayer ? 'YOU' : m.name} · ${m.time}
                  </div>
                  <div style="background:${isPlayer ? 'rgba(0,229,255,0.15)' : '#162238'}; border:1px solid ${isPlayer ? 'var(--cyber-cyan)' : 'rgba(255,255,255,0.08)'}; padding:12px 16px; border-radius:14px; ${isPlayer ? 'border-bottom-right-radius:2px;' : 'border-bottom-left-radius:2px;'}; font-size:0.92rem; line-height:1.5; color:var(--text-main);">
                    ${m.text}
                  </div>
                </div>
              `;
            }).join('')}

            ${isTyping ? `
              <div style="align-self:flex-start; background:#162238; border:1px solid rgba(255,255,255,0.08); padding:10px 16px; border-radius:14px; font-size:0.85rem; color:var(--cyber-cyan); display:flex; align-items:center; gap:8px;">
                <span class="typing-dot" style="animation:pulse 0.8s infinite;">●</span>
                <span class="typing-dot" style="animation:pulse 0.8s 0.2s infinite;">●</span>
                <span class="typing-dot" style="animation:pulse 0.8s 0.4s infinite;">●</span>
                <span style="font-size:0.75rem; color:var(--text-dim); font-family:var(--font-mono);">Scammer is typing...</span>
              </div>
            ` : ''}
          </div>

          <!-- Bottom Player Response Dock -->
          <div style="padding:18px 20px; background:var(--bg-surface-elevated); border-top:1px solid var(--border-subtle); display:flex; flex-direction:column; gap:12px;">
            <div style="font-size:0.8rem; font-family:var(--font-mono); font-weight:700; color:var(--cyber-cyan);">
              SELECT YOUR DEFENSIVE COUNTER-MOVE:
            </div>

            <!-- Dynamic Reply Option Cards -->
            <div style="display:flex; flex-direction:column; gap:8px;">
              ${(!isTyping && currentStep && currentStep.replies) ? currentStep.replies.map((r, idx) => `
                <button class="cyber-btn btn-outline duel-reply-btn" data-idx="${idx}" style="text-align:left; justify-content:flex-start; padding:10px 14px; font-size:0.88rem; text-transform:none; line-height:1.4;">
                  <span style="font-family:var(--font-mono); color:var(--cyber-cyan); font-weight:800; min-width:24px;">0${idx+1}.</span>
                  <span>${r.text[lang] || r.text.en}</span>
                </button>
              `).join('') : `
                <div style="padding:12px; color:var(--text-dim); font-size:0.85rem; font-family:var(--font-mono); text-align:center;">
                  Awaiting scammer transmission...
                </div>
              `}
            </div>

            <!-- Custom Free-Text Reply Input -->
            <div style="display:flex; gap:8px; margin-top:4px;">
              <input type="text" id="duel-custom-text-input" placeholder="${t('typeCustomReply', 'Or type your custom response...')}" style="flex:1; background:var(--bg-surface); border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:10px 14px; color:var(--text-main); font-size:0.88rem; outline:none;">
              <button class="cyber-btn btn-primary btn-sm" id="btn-send-custom-reply" ${isTyping ? 'disabled' : ''}>
                SEND ➔
              </button>
            </div>
          </div>
        </div>

        <!-- Right: Live Scammer Tactics Radar Panel -->
        <div class="cyber-panel" style="display:flex; flex-direction:column; gap:16px;">
          <div style="border-bottom:1px solid var(--border-subtle); padding-bottom:10px;">
            <div style="font-family:var(--font-mono); font-size:0.75rem; color:var(--cyber-cyan); font-weight:800;">LIVE TELEMETRY</div>
            <h3 style="font-size:1.15rem; margin-top:2px;">TACTICS EXPOSED</h3>
          </div>

          <div style="display:flex; flex-direction:column; gap:8px; min-height:140px;">
            ${state.tacticsExposed.length > 0 ? state.tacticsExposed.map(tact => `
              <div style="background:rgba(168,85,247,0.15); border:1px solid var(--cyber-violet); padding:8px 12px; border-radius:6px; font-size:0.82rem; color:#f3e8ff; display:flex; align-items:center; gap:8px;">
                <span>🎯</span>
                <span style="font-weight:700;">${tact}</span>
              </div>
            `).join('') : `
              <div style="font-size:0.8rem; color:var(--text-dim); font-family:var(--font-mono); line-height:1.5;">
                No tactics exposed yet. Challenge the scammer's authority, refuse OTPs, or demand proof to break their script!
              </div>
            `}
          </div>

          <div style="background:rgba(0,229,255,0.06); border-left:3px solid var(--cyber-cyan); padding:12px; border-radius:4px; font-size:0.82rem; line-height:1.5; color:var(--text-muted);">
            💡 <strong>GOLDEN TACTIC:</strong> Scammers thrive on speed and panic. Pausing, asking verification questions, and refusing OTP codes immediately collapses their script.
          </div>
        </div>
      </div>
    `;

    // Auto scroll chat to bottom
    const stream = document.getElementById('duel-messages-stream');
    if (stream) stream.scrollTop = stream.scrollHeight;

    // Bind reply buttons
    const replyBtns = slot.querySelectorAll('.duel-reply-btn');
    replyBtns.forEach(b => {
      b.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.getAttribute('data-idx'), 10);
        window.duelEngine.chooseReply(idx);
      });
    });

    // Bind custom text input
    const customInp = slot.querySelector('#duel-custom-text-input');
    const sendBtn = slot.querySelector('#btn-send-custom-reply');
    if (customInp && sendBtn) {
      const sendAction = () => {
        const val = customInp.value.trim();
        if (val) {
          window.duelEngine.processCustomText(val);
          customInp.value = '';
        }
      };
      sendBtn.addEventListener('click', sendAction);
      customInp.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') sendAction();
      });
    }

    // AI toggle
    const aiToggle = slot.querySelector('#duel-ai-toggle');
    if (aiToggle) {
      aiToggle.addEventListener('change', (e) => {
        if (e.target.checked) {
          alert('Note: External LLM API key not configured. Using deterministic high-fidelity scammer engine (100% offline resilient).');
          window.duelEngine.setAiMode(false);
          e.target.checked = false;
        }
      });
    }
  }

  renderDuelReport(state, sc, t, lang) {
    const isWin = state.status === 'WON';
    const xpEarned = isWin ? 150 + (state.tacticsExposed.length * 25) : 20;

    return `
      <div class="cyber-panel" style="max-width:760px; margin:0 auto; padding:36px; border-color:${isWin ? 'var(--cyber-emerald)' : 'var(--cyber-crimson)'}; box-shadow:0 0 35px ${isWin ? 'var(--cyber-emerald-glow)' : 'var(--cyber-crimson-glow)'};">
        <div style="text-align:center; display:flex; flex-direction:column; align-items:center; gap:12px; margin-bottom:24px;">
          <span style="font-size:3.5rem;">${isWin ? '🏆' : '🚨'}</span>
          <h2 style="font-size:2rem; font-weight:900; color:${isWin ? 'var(--cyber-emerald)' : 'var(--cyber-crimson)'};">
            ${isWin ? t('duelWinTitle', 'SCAMMER EXPOSED & DEFEATED!') : t('duelLoseTitle', 'TRUST SHIELD BREACHED!')}
          </h2>
          <p style="color:var(--text-muted); max-width:540px;">
            ${isWin ? 'You maintained critical skepticism, identified deception tactics, and forced the scammer to abandon the attack.' : 'You yielded to pressure or shared sensitive credentials. In real scenarios, pause and verify out-of-band!'}
          </p>
        </div>

        <!-- Metrics Grid -->
        <div class="judge-stats-grid" style="margin-bottom:24px;">
          <div class="judge-stat-card">
            <span class="judge-stat-num" style="color:var(--cyber-emerald);">${state.trustShield}%</span>
            <span class="judge-stat-lbl">${t('trustShieldLabel', 'Trust Shield')}</span>
          </div>
          <div class="judge-stat-card">
            <span class="judge-stat-num">${state.tacticsExposed.length}</span>
            <span class="judge-stat-lbl">${t('tacticsNeutralizedLabel', 'Tactics Exposed')}</span>
          </div>
          <div class="judge-stat-card">
            <span class="judge-stat-num">${state.durationSeconds}s</span>
            <span class="judge-stat-lbl">Combat Time</span>
          </div>
          <div class="judge-stat-card">
            <span class="judge-stat-num" style="color:var(--cyber-cyan);">+${xpEarned}</span>
            <span class="judge-stat-lbl">XP Earned</span>
          </div>
        </div>

        <!-- Exposed Tactics List -->
        ${state.tacticsExposed.length > 0 ? `
          <div style="margin-bottom:24px; background:var(--bg-surface-elevated); padding:16px; border-radius:8px;">
            <div style="font-family:var(--font-mono); font-size:0.75rem; color:var(--cyber-cyan); font-weight:800; margin-bottom:8px;">
              TACTICS YOU EXPOSED IN THIS COMBAT:
            </div>
            <div style="display:flex; flex-wrap:wrap; gap:8px;">
              ${state.tacticsExposed.map(tag => `
                <span class="threat-badge threat-boss" style="font-size:0.75rem;">✓ ${tag}</span>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Actions -->
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; border-top:1px solid var(--border-subtle); padding-top:20px;">
          <button class="cyber-btn btn-outline" id="btn-replay-duel">
            ${t('duelReplayBtn', '↺ DUEL AGAIN')}
          </button>
          <a href="#/arena" class="cyber-btn btn-primary">
            RETURN TO MISSION ARENA ➔
          </a>
        </div>
      </div>
    `;
  }

  bindReportEvents() {
    const replay = this.container.querySelector('#btn-replay-duel');
    if (replay) {
      replay.addEventListener('click', () => {
        window.soundFx.playClick();
        window.duelEngine.startDuel(this.selectedScenarioId);
      });
    }
  }
}

window.DuelView = DuelView;
