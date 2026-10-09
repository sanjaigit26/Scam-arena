// Arena & Mission Gameplay View for Scam Arena
// Supports 3 Audience Modes: STANDARD, SENIOR SHIELD, KID GUARDIAN

class ArenaView {
  constructor() {
    this.container = null;
    this.currentMode = localStorage.getItem('scamarena_mode') || 'standard';
    this.currentScenario = null;
    this.timerInterval = null;
    this.timeRemaining = 0;
    this.totalTime = 0;
    this.discoveredClues = new Set();
    this.hotspotMode = false;
    this.missionResult = null;
    this.isDecisionMade = false;
    this.unsubscribeI18n = null;
  }

  mount(container, scenarioId = null) {
    this.container = container;
    this.cleanUpTimer();
    
    if (window.i18n) {
      this.unsubscribeI18n = window.i18n.subscribe(() => {
        if (this.currentScenario) {
          this.renderActiveMission();
        } else {
          this.renderCampaignHub();
        }
      });
    }

    const params = new URLSearchParams(window.location.hash.split('?')[1]);
    const id = scenarioId || params.get('id');
    const modeParam = params.get('mode');
    if (modeParam && ['standard', 'senior', 'kid'].includes(modeParam)) {
      this.currentMode = modeParam;
      localStorage.setItem('scamarena_mode', modeParam);
    }

    if (id) {
      const allScenarios = this.getAllScenarios();
      const found = allScenarios.find(s => s.id === id);
      if (found) {
        this.loadScenario(found);
        return;
      }
    }

    this.renderCampaignHub();
  }

  unmount() {
    this.cleanUpTimer();
    if (window.i18n) window.i18n.stopSpeaking();
    if (this.unsubscribeI18n) {
      this.unsubscribeI18n();
      this.unsubscribeI18n = null;
    }
  }

  cleanUpTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  getAllScenarios() {
    if (this.currentMode === 'senior') {
      return window.SENIOR_SCENARIOS || [];
    }
    if (this.currentMode === 'kid') {
      return window.KID_SCENARIOS || [];
    }
    return window.SCENARIOS || [];
  }

  setMode(mode) {
    this.currentMode = mode;
    localStorage.setItem('scamarena_mode', mode);
    window.soundFx.playClick();
    this.renderCampaignHub();
  }

  loadScenario(scenario) {
    this.currentScenario = scenario;
    this.discoveredClues.clear();
    this.hotspotMode = false;
    this.missionResult = null;
    this.isDecisionMade = false;
    this.userChoice = null;
    
    // No timers in Senior or Kid mode
    if (this.currentMode === 'senior' || this.currentMode === 'kid') {
      this.totalTime = 0;
    } else {
      this.totalTime = scenario.timerSeconds || 0;
    }
    this.timeRemaining = this.totalTime;

    this.renderActiveMission();

    if (this.totalTime > 0) {
      this.timerInterval = setInterval(() => {
        this.timeRemaining -= 1;
        const timerEl = this.container.querySelector('.timer-countdown');
        if (timerEl) {
          timerEl.textContent = `${this.timeRemaining}s`;
          if (this.timeRemaining <= 7) {
            timerEl.closest('.arena-timer-box').classList.add('urgent');
          }
        }

        if (this.timeRemaining <= 0) {
          this.cleanUpTimer();
          if (!this.isDecisionMade) {
            this.handleDecision('SAFE');
          }
        }
      }, 1000);
    }
  }

  renderCampaignHub() {
    const t = (k, def) => window.i18n ? window.i18n.t(k, def) : (def || k);
    const lang = window.i18n ? window.i18n.getLanguage() : 'en';
    const state = window.appState.get();
    const completedIds = state.completedMissionIds || [];
    const activeScenarios = this.getAllScenarios();

    this.container.innerHTML = `
      <div class="arena-container">
        <!-- Audience Mode Selector Bar -->
        <div>
          <div style="font-family:var(--font-mono); font-size:0.8rem; font-weight:800; color:var(--cyber-cyan); margin-bottom:4px;">
            ${t('chooseModeTitle', 'CHOOSE YOUR DEFENSE MODE')}
          </div>
          <div class="mode-selection-wrapper">
            <!-- Standard Mode -->
            <div class="mode-card-btn standard ${this.currentMode === 'standard' ? 'active' : ''}" id="mode-btn-standard">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <span style="font-size:1.5rem;">🎮</span>
                <span class="threat-badge threat-easy">${t('modeStandard', 'STANDARD')}</span>
              </div>
              <h3 style="font-size:1.15rem; margin-top:4px;">${t('modeStandard', 'Standard Campaign')}</h3>
              <p style="font-size:0.82rem; color:var(--text-muted); line-height:1.4;">
                ${t('modeStandardDesc', 'Full tactical simulation for working professionals, students, and digital citizens.')}
              </p>
            </div>

            <!-- Senior Shield Mode -->
            <div class="mode-card-btn senior ${this.currentMode === 'senior' ? 'active' : ''}" id="mode-btn-senior">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <span style="font-size:1.5rem;">👵</span>
                <span class="threat-badge threat-medium">${t('modeSeniorBadge', 'ELDERS & PARENTS')}</span>
              </div>
              <h3 style="font-size:1.15rem; margin-top:4px; color:#38bdf8;">${t('modeSenior', 'Senior Shield')}</h3>
              <p style="font-size:0.82rem; color:var(--text-muted); line-height:1.4;">
                ${t('modeSeniorDesc', 'High contrast, larger text, gentle pacing, zero timers, voice read-aloud assistance.')}
              </p>
            </div>

            <!-- Kid Guardian Mode -->
            <div class="mode-card-btn kid ${this.currentMode === 'kid' ? 'active' : ''}" id="mode-btn-kid">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <span style="font-size:1.5rem;">🛡️</span>
                <span class="threat-badge threat-boss">${t('modeKidBadge', 'KIDS & GAMERS')}</span>
              </div>
              <h3 style="font-size:1.15rem; margin-top:4px; color:#f472b6;">${t('modeKid', 'Kid Guardian')}</h3>
              <p style="font-size:0.82rem; color:var(--text-muted); line-height:1.4;">
                ${t('modeKidDesc', 'Friendly gaming scenarios, Guardy shield buddy, star rewards, positive habits.')}
              </p>
            </div>
          </div>
        </div>

        <!-- Mode Header -->
        <div class="mission-hud">
          <div class="mission-meta-left">
            <span class="mission-number-tag">
              ${this.currentMode === 'senior' ? 'SENIOR SHIELD DEFENSE' : this.currentMode === 'kid' ? 'KID GUARDIAN MISSIONS' : 'STANDARD CYBER CAMPAIGN'}
            </span>
            <h1 class="mission-title">
              ${this.currentMode === 'senior' ? t('modeSenior', 'Senior Shield Mode') : this.currentMode === 'kid' ? t('modeKid', 'Kid Guardian Mode') : 'Scam Arena Mission Command'}
            </h1>
            <div class="mission-objective">
              <span>${activeScenarios.length} Scenarios Available · ${completedIds.length} Completed</span>
            </div>
          </div>
          <div class="mission-meta-right">
            <button class="cyber-btn btn-primary" id="btn-start-first-mission">
              ▶ START FIRST MISSION
            </button>
          </div>
        </div>

        <!-- Scenarios Grid -->
        <div class="scenarios-grid" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(320px, 1fr)); gap:20px;">
          ${activeScenarios.map((sc, index) => {
            const isCompleted = completedIds.includes(sc.id);
            const title = typeof sc.title === 'object' ? (sc.title[lang] || sc.title.en) : sc.title;
            const subtitle = typeof sc.category === 'object' ? (sc.category[lang] || sc.category.en) : (sc.subtitle || sc.category);

            return `
              <div class="cyber-panel mission-card" style="border-color:${isCompleted ? 'var(--cyber-emerald)' : 'var(--border-subtle)'};">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
                  <span class="threat-badge ${sc.threatLevel === 'EASY' || this.currentMode !== 'standard' ? 'threat-easy' : sc.threatLevel === 'MEDIUM' ? 'threat-medium' : 'threat-hard'}">
                    ${this.currentMode === 'kid' ? '⭐⭐⭐' : sc.threatLevel || 'SAFETY MISSION'}
                  </span>
                  <span class="mono-text" style="font-size:0.75rem; color:${isCompleted ? 'var(--cyber-emerald)' : 'var(--text-dim)'};">
                    ${isCompleted ? '✓ COMPLETED' : (sc.number || `MISSION 0${index+1}`)}
                  </span>
                </div>
                
                <h3 style="font-size:1.2rem; margin:4px 0 8px;">${title}</h3>
                <p style="font-size:0.85rem; color:var(--text-muted); line-height:1.5; margin-bottom:16px;">${subtitle}</p>

                <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--border-subtle); padding-top:12px;">
                  <span style="font-size:0.75rem; color:var(--text-dim); font-family:var(--font-mono);">
                    ${this.currentMode === 'kid' ? 'SAFETY HABIT' : this.currentMode === 'senior' ? 'VOICE ENABLED' : (sc.interfaceType || 'SMS').toUpperCase()}
                  </span>
                  <button class="cyber-btn ${isCompleted ? 'btn-outline' : 'btn-primary'} btn-sm engage-mission-btn" data-id="${sc.id}">
                    ${isCompleted ? 'REPLAY' : 'ENGAGE ➔'}
                  </button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    // Bind mode selection
    const bStd = this.container.querySelector('#mode-btn-standard');
    if (bStd) bStd.addEventListener('click', () => this.setMode('standard'));

    const bSen = this.container.querySelector('#mode-btn-senior');
    if (bSen) bSen.addEventListener('click', () => this.setMode('senior'));

    const bKid = this.container.querySelector('#mode-btn-kid');
    if (bKid) bKid.addEventListener('click', () => this.setMode('kid'));

    // Bind engage buttons
    const engageBtns = this.container.querySelectorAll('.engage-mission-btn');
    engageBtns.forEach(b => {
      b.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        const found = this.getAllScenarios().find(s => s.id === id);
        if (found) {
          window.soundFx.playClick();
          window.location.hash = `#/arena/play?id=${id}&mode=${this.currentMode}`;
          this.loadScenario(found);
        }
      });
    });

    const startFirst = this.container.querySelector('#btn-start-first-mission');
    if (startFirst && activeScenarios.length > 0) {
      startFirst.addEventListener('click', () => {
        window.soundFx.playClick();
        window.location.hash = `#/arena/play?id=${activeScenarios[0].id}&mode=${this.currentMode}`;
        this.loadScenario(activeScenarios[0]);
      });
    }
  }

  renderActiveMission() {
    const sc = this.currentScenario;
    if (!sc) return;

    if (this.currentMode === 'senior') {
      this.renderSeniorActiveMission();
      return;
    }

    if (this.currentMode === 'kid') {
      this.renderKidActiveMission();
      return;
    }

    this.renderStandardActiveMission();
  }

  // --- SENIOR SHIELD MODE RENDERER ---
  renderSeniorActiveMission() {
    const sc = this.currentScenario;
    const t = (k, def) => window.i18n ? window.i18n.t(k, def) : (def || k);
    const lang = window.i18n ? window.i18n.getLanguage() : 'en';

    const title = (typeof sc.title === 'object' && sc.title !== null) ? (sc.title[lang] || sc.title.en) : (sc.title || 'Mission');
    const category = (typeof sc.category === 'object' && sc.category !== null) ? (sc.category[lang] || sc.category.en) : (sc.category || 'Senior Shield');
    const messageText = (sc.simulatedUI && sc.simulatedUI.message && typeof sc.simulatedUI.message === 'object')
      ? (sc.simulatedUI.message[lang] || sc.simulatedUI.message.en)
      : (sc.simulatedUI && sc.simulatedUI.message ? sc.simulatedUI.message : '');
    const senderName = (sc.simulatedUI && sc.simulatedUI.senderName && typeof sc.simulatedUI.senderName === 'object')
      ? (sc.simulatedUI.senderName[lang] || sc.simulatedUI.senderName.en)
      : (sc.simulatedUI && sc.simulatedUI.senderName ? sc.simulatedUI.senderName : '');

    const expectedAnswer = ((sc.correctAnswer || sc.correctDecision || 'SCAM')).trim().toUpperCase();
    const explanationText = (typeof sc.explanation === 'object' && sc.explanation !== null)
      ? (sc.explanation[lang] || sc.explanation.en || '')
      : (sc.explanation || (sc.consequence ? (typeof sc.consequence === 'object' ? (sc.consequence[lang] || sc.consequence.en) : sc.consequence) : ''));
    const redFlagsList = Array.isArray(sc.redFlags) ? sc.redFlags : [
      "Threat of immediate power disconnection tonight without prior notice",
      "Manufactured urgency (9:30 PM deadline to trigger panic)",
      "Sent from a personal mobile phone number instead of official SMS header",
      "Direct payment demand / request to call an unverified individual"
    ];
    const rememberTipText = (typeof sc.rememberTip === 'object' && sc.rememberTip !== null)
      ? (sc.rememberTip[lang] || sc.rememberTip.en || '')
      : (sc.rememberTip || 'Electricity boards never send personal phone numbers to call. Always pay bills through official counters or authorized apps.');

    this.container.innerHTML = `
      <div class="arena-container senior-mode-active">
        <!-- Top Senior HUD -->
        <div class="mission-hud" style="border-color:#38bdf8;">
          <div class="mission-meta-left">
            <span class="threat-badge threat-medium">SENIOR SHIELD DEFENSE</span>
            <h1 class="mission-title" style="color:#e0f2fe; margin-top:4px;">${title}</h1>
            <div style="font-size:1.05rem; color:#bae6fd;">${category}</div>
          </div>
          <div class="mission-meta-right">
            <button class="cyber-btn btn-outline" id="btn-exit-senior" style="padding:10px 18px;">
              ✕ EXIT TO MODES
            </button>
          </div>
        </div>

        <div class="arena-stage-split" style="gap:24px;">
          <!-- Left: Big High-Contrast Message Frame -->
          <div>
            <div class="cyber-panel" style="background:#091322; border:2px solid #38bdf8; padding:24px;">
              <!-- Read Aloud Voice Button -->
              <button class="btn-read-aloud" id="btn-read-aloud-text">
                ${t('readAloudBtn', '🔊 Read Aloud')}
              </button>

              <div style="font-size:0.95rem; color:#94a3b8; font-family:var(--font-mono); margin-bottom:8px;">
                FROM: <strong>${sc.simulatedUI.sender}</strong> (${senderName})
              </div>

              <div class="chat-bubble" style="background:#132847; border:2px solid #38bdf8; border-radius:14px; color:#f0f9ff; font-size:1.25rem; line-height:1.65; margin:16px 0;">
                ${messageText}
              </div>

              <!-- Remember This Tip -->
              <div class="senior-remember-box">
                <div class="senior-remember-title">💡 ${t('seniorRememberTitle', 'ALWAYS REMEMBER')}</div>
                <div style="font-size:1.05rem; line-height:1.5; color:#fef3c7;">
                  ${rememberTipText}
                </div>
              </div>
            </div>
          </div>

          <!-- Right: Senior 3 Clues & Big Decision Buttons -->
          <div>
            <div class="cyber-panel" style="border:2px solid var(--border-strong);">
              <h2 style="font-size:1.35rem; margin-bottom:14px; color:#38bdf8;">
                ${t('investigationControls', 'INVESTIGATION CLUES')}
              </h2>

              <div style="display:flex; flex-direction:column; gap:12px; margin-bottom:20px;">
                <button class="cyber-btn btn-outline senior-clue-btn" data-key="sender" style="text-align:left; font-size:1.05rem; padding:14px;">
                  <span>👤</span> <span>${t('seniorClueSender', 'Who is sending this?')}</span>
                </button>
                <button class="cyber-btn btn-outline senior-clue-btn" data-key="link" style="text-align:left; font-size:1.05rem; padding:14px;">
                  <span>🔗</span> <span>${t('seniorClueLink', 'Is this link or call safe?')}</span>
                </button>
                <button class="cyber-btn btn-outline senior-clue-btn" data-key="urgency" style="text-align:left; font-size:1.05rem; padding:14px;">
                  <span>⏱️</span> <span>${t('seniorClueUrgency', 'Why are they in such a hurry?')}</span>
                </button>
              </div>

              <!-- Clue Reveal Area -->
              <div id="senior-clue-reveal" style="min-height:90px; padding:16px; background:rgba(0,0,0,0.3); border-radius:8px; font-size:1.05rem; color:#bae6fd; line-height:1.5; margin-bottom:20px;">
                Tap any question above to read safety advice.
              </div>

              <!-- 3 Big Senior Decision Buttons -->
              <div style="display:flex; flex-direction:column; gap:12px;">
                <button class="cyber-btn btn-danger btn-lg ${this.userChoice === 'SCAM' ? 'active-choice' : ''}" 
                        id="senior-act-scam" 
                        ${this.isDecisionMade ? 'disabled' : ''}
                        style="min-height:52px; font-size:1.2rem; padding:16px 20px; touch-action:manipulation; cursor:${this.isDecisionMade ? 'not-allowed' : 'pointer'}; opacity:${this.isDecisionMade && this.userChoice !== 'SCAM' ? '0.5' : '1'}; ${this.userChoice === 'SCAM' ? 'border: 2px solid #ef4444; box-shadow: 0 0 15px rgba(239, 68, 68, 0.5);' : ''}">
                  ${t('actScam', '🚨 IT IS A SCAM / FRAUD')}${this.userChoice === 'SCAM' ? ' (Selected)' : ''}
                </button>
                <button class="cyber-btn btn-amber btn-lg ${this.userChoice === 'SUSPICIOUS' ? 'active-choice' : ''}" 
                        id="senior-act-suspicious" 
                        ${this.isDecisionMade ? 'disabled' : ''}
                        style="min-height:52px; font-size:1.15rem; padding:16px 20px; touch-action:manipulation; cursor:${this.isDecisionMade ? 'not-allowed' : 'pointer'}; opacity:${this.isDecisionMade && this.userChoice !== 'SUSPICIOUS' ? '0.5' : '1'}; ${this.userChoice === 'SUSPICIOUS' ? 'border: 2px solid #f59e0b; box-shadow: 0 0 15px rgba(245, 158, 11, 0.5);' : ''}">
                  ${t('actSuspicious', '⚠️ SUSPICIOUS / CALL FAMILY FIRST')}${this.userChoice === 'SUSPICIOUS' ? ' (Selected)' : ''}
                </button>
                <button class="cyber-btn btn-emerald btn-lg ${this.userChoice === 'SAFE' ? 'active-choice' : ''}" 
                        id="senior-act-safe" 
                        ${this.isDecisionMade ? 'disabled' : ''}
                        style="min-height:52px; font-size:1.15rem; padding:16px 20px; touch-action:manipulation; cursor:${this.isDecisionMade ? 'not-allowed' : 'pointer'}; opacity:${this.isDecisionMade && this.userChoice !== 'SAFE' ? '0.5' : '1'}; ${this.userChoice === 'SAFE' ? 'border: 2px solid #10b981; box-shadow: 0 0 15px rgba(16, 185, 129, 0.5);' : ''}">
                  ${t('actSafe', '🛡️ SAFE / TRUST')}${this.userChoice === 'SAFE' ? ' (Selected)' : ''}
                </button>
              </div>

              <!-- Feedback State (when decision is made) -->
              ${this.isDecisionMade && this.missionResult ? `
                <div id="senior-feedback-panel" style="margin-top:20px; display:flex; flex-direction:column; gap:16px; animation: fadeIn 0.3s ease-in-out;">
                  <!-- Result Banner -->
                  <div style="background:${this.missionResult.isCorrect ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)'}; border:2px solid ${this.missionResult.isCorrect ? 'var(--cyber-emerald, #10b981)' : 'var(--cyber-crimson, #ef4444)'}; padding:20px; border-radius:10px; text-align:left;">
                    <div style="font-size:1.35rem; font-weight:800; color:${this.missionResult.isCorrect ? '#10b981' : '#ef4444'}; display:flex; align-items:center; gap:8px;">
                      <span>${this.missionResult.isCorrect ? '✓' : '✕'}</span>
                      <span>${this.missionResult.isCorrect ? 'Correct! This is a SCAM' : 'Not quite'}</span>
                    </div>

                    ${!this.missionResult.isCorrect ? `
                      <div style="margin-top:6px; font-size:1.1rem; font-weight:700; color:#fca5a5;">
                        Correct Answer: ${expectedAnswer}
                      </div>
                    ` : ''}

                    <div style="margin-top:10px; font-size:1.05rem; line-height:1.55; color:#f1f5f9;">
                      ${explanationText}
                    </div>
                  </div>

                  <!-- Red Flags List -->
                  <div style="background:rgba(15,23,42,0.7); border:1px solid var(--border-medium); border-radius:10px; padding:16px;">
                    <div style="font-size:0.95rem; font-weight:700; color:#f59e0b; text-transform:uppercase; letter-spacing:0.05em; margin-bottom:10px; display:flex; align-items:center; gap:6px;">
                      <span>🚩</span> <span>Red Flags Identified:</span>
                    </div>
                    <ul style="margin:0; padding-left:22px; color:#cbd5e1; font-size:1rem; line-height:1.6;">
                      ${redFlagsList.map(flag => `<li>${flag}</li>`).join('')}
                    </ul>
                  </div>

                  <!-- Always Remember Tip -->
                  <div style="background:rgba(245,158,11,0.12); border-left:4px solid #f59e0b; padding:14px 16px; border-radius:4px;">
                    <div style="color:#fcd34d; font-weight:700; font-size:0.95rem; margin-bottom:4px;">
                      💡 Always Remember:
                    </div>
                    <div style="color:#fef3c7; font-size:0.95rem; line-height:1.5;">
                      ${rememberTipText}
                    </div>
                  </div>

                  <!-- Next Button -->
                  <button class="cyber-btn btn-primary btn-lg" id="btn-next-senior-mission" style="min-height:52px; font-size:1.2rem; font-weight:700; width:100%; justify-content:center; touch-action:manipulation;">
                    ${t('nextMission', 'NEXT MISSION ➔')}
                  </button>
                </div>
              ` : ''}
            </div>
          </div>
        </div>
      </div>
    `;

    // Bind Senior Events
    const exitBtn = this.container.querySelector('#btn-exit-senior');
    if (exitBtn) exitBtn.addEventListener('click', () => {
      window.location.hash = '#/arena';
      this.renderCampaignHub();
    });

    const speakBtn = this.container.querySelector('#btn-read-aloud-text');
    if (speakBtn) speakBtn.addEventListener('click', () => {
      window.i18n.speak(messageText);
    });

    const clueBtns = this.container.querySelectorAll('.senior-clue-btn');
    clueBtns.forEach(b => {
      b.addEventListener('click', (e) => {
        const key = e.currentTarget.getAttribute('data-key');
        const text = sc.clues[key] ? (sc.clues[key][lang] || sc.clues[key].en) : '';
        const reveal = this.container.querySelector('#senior-clue-reveal');
        if (reveal && text) {
          reveal.innerHTML = `<strong>💡 ${e.currentTarget.textContent}:</strong><br>${text}`;
          window.soundFx.playClue();
          window.i18n.speak(text);
        }
      });
    });

    if (!this.isDecisionMade) {
      const actScam = this.container.querySelector('#senior-act-scam');
      const actSusp = this.container.querySelector('#senior-act-suspicious');
      const actSafe = this.container.querySelector('#senior-act-safe');

      const bindDecision = (btn, choice) => {
        if (!btn) return;
        const trigger = (e) => {
          if (e) {
            e.preventDefault();
            e.stopPropagation();
          }
          this.handleSeniorDecision(choice);
        };
        btn.addEventListener('click', trigger);
        btn.addEventListener('pointerup', trigger);
      };

      bindDecision(actScam, 'SCAM');
      bindDecision(actSusp, 'SUSPICIOUS');
      bindDecision(actSafe, 'SAFE');
    }

    const nextBtn = this.container.querySelector('#btn-next-senior-mission');
    if (nextBtn) {
      const advance = (e) => {
        if (e) e.preventDefault();
        this.advanceSeniorMission();
      };
      nextBtn.addEventListener('click', advance);
      nextBtn.addEventListener('pointerup', advance);
    }
  }

  handleSeniorDecision(choice) {
    if (this.isDecisionMade) return;
    this.isDecisionMade = true;
    this.userChoice = choice;

    const sc = this.currentScenario;
    const normalizedChoice = (choice || '').trim().toUpperCase();
    const expectedAnswer = ((sc.correctAnswer || sc.correctDecision || 'SCAM')).trim().toUpperCase();
    const isCorrect = normalizedChoice === expectedAnswer;

    this.missionResult = {
      isCorrect,
      selectedAnswer: normalizedChoice,
      correctAnswer: expectedAnswer,
      pointsDelta: isCorrect ? 150 : -20,
      xpDelta: isCorrect ? 100 : 20
    };

    if (isCorrect) {
      if (window.soundFx && window.soundFx.playCorrect) window.soundFx.playCorrect();
    } else {
      if (window.soundFx && window.soundFx.playDanger) window.soundFx.playDanger();
    }

    if (window.appState && window.appState.recordMissionOutcome) {
      window.appState.recordMissionOutcome(this.currentScenario, this.missionResult, 3, 0, 0);
    }

    this.renderActiveMission();
  }

  advanceSeniorMission() {
    const list = window.SENIOR_SCENARIOS || [];
    const idx = list.findIndex(s => s.id === this.currentScenario.id);
    if (idx >= 0 && idx < list.length - 1) {
      const nextScenario = list[idx + 1];
      window.location.hash = `#/arena/play?id=${nextScenario.id}&mode=senior`;
      this.loadScenario(nextScenario);
    } else {
      window.location.hash = '#/profile';
    }
  }

  // --- KID GUARDIAN MODE RENDERER ---
  renderKidActiveMission() {
    const sc = this.currentScenario;
    const t = (k, def) => window.i18n ? window.i18n.t(k, def) : (def || k);
    const lang = window.i18n ? window.i18n.getLanguage() : 'en';

    const title = sc.title[lang] || sc.title.en;
    const headline = sc.simulatedUI.headline[lang] || sc.simulatedUI.headline.en;
    const bodyText = sc.simulatedUI.body[lang] || sc.simulatedUI.body.en;
    const guardyTip = sc.guardyTip[lang] || sc.guardyTip.en;

    this.container.innerHTML = `
      <div class="arena-container kid-mode-active">
        <!-- Guardy Mascot Card -->
        <div class="guardy-mascot-card">
          <div class="guardy-avatar-bubble">🛡️✨</div>
          <div class="guardy-text-bubble">
            <div class="guardy-name">${t('guardyTipTitle', "Guardy's Safety Shield Tip")}</div>
            <div style="font-size:1.05rem; color:#fdf2f8; line-height:1.5;">${guardyTip}</div>
          </div>
        </div>

        <div class="arena-stage-split" style="gap:24px;">
          <!-- Left: Game Message Box -->
          <div>
            <div class="cyber-panel" style="background:#181028; border:2px solid #ec4899; padding:24px;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
                <span class="kid-badge-sticker">🌟 ${title}</span>
                <span style="font-size:1.5rem;">${sc.simulatedUI.characterIcon}</span>
              </div>

              <h2 style="font-size:1.3rem; color:#f472b6; margin-bottom:12px;">${headline}</h2>

              <div style="background:#25163d; border:1px solid #ec4899; padding:18px; border-radius:12px; font-size:1.1rem; line-height:1.6; color:#fdf2f8; margin-bottom:16px;">
                ${bodyText}
              </div>

              <div style="display:flex; justify-content:space-between; align-items:center;">
                <span style="font-size:0.85rem; color:#d8b4fe; font-family:var(--font-mono);">${sc.simulatedUI.platform}</span>
                <span style="color:#fde047; font-size:1.3rem;">⭐⭐⭐</span>
              </div>
            </div>
          </div>

          <!-- Right: Kid Actions & Positive Feedback -->
          <div>
            <div class="cyber-panel" style="border:2px solid #a855f7;">
              <h2 style="font-size:1.3rem; color:#c084fc; margin-bottom:14px;">
                WHAT SHOULD YOU DO?
              </h2>

              ${!this.isDecisionMade ? `
                <div style="display:flex; flex-direction:column; gap:12px;">
                  <button class="cyber-btn btn-primary btn-lg" id="kid-act-adult" style="font-size:1.2rem; padding:18px; background:linear-gradient(135deg, #ec4899, #8b5cf6);">
                    ${t('actTellAdult', '🗣️ TELL A TRUSTED ADULT')}
                  </button>
                  <button class="cyber-btn btn-danger btn-lg" id="kid-act-scam" style="font-size:1.15rem; padding:16px;">
                    ${t('actScam', '🚨 DON\'T CLICK / IT\'S A TRAP')}
                  </button>
                  <button class="cyber-btn btn-outline btn-lg" id="kid-act-safe" style="font-size:1.1rem; padding:14px;">
                    ${t('actSafe', '🛡️ TYPE PASSWORD / TRUST')}
                  </button>
                </div>
              ` : `
                <div style="display:flex; flex-direction:column; gap:14px; text-align:center;">
                  <div style="font-size:3rem;">🌟</div>
                  <div style="font-size:1.25rem; font-weight:800; color:#34d399;">
                    ${this.missionResult.message}
                  </div>
                  <div style="font-size:1rem; color:#f3e8ff; line-height:1.5;">
                    ${sc.consequence[lang] || sc.consequence.en}
                  </div>
                  <div style="margin-top:10px;">
                    <span class="kid-badge-sticker">🏆 BADGE UNLOCKED: ${sc.badgeReward.title} ${sc.badgeReward.icon}</span>
                  </div>
                  <button class="cyber-btn btn-primary btn-lg" id="btn-next-kid-mission" style="margin-top:12px;">
                    ${t('nextMission', 'NEXT ADVENTURE ➔')}
                  </button>
                </div>
              `}
            </div>
          </div>
        </div>
      </div>
    `;

    const actAdult = this.container.querySelector('#kid-act-adult');
    if (actAdult) actAdult.addEventListener('click', () => this.handleKidDecision(true));

    const actScam = this.container.querySelector('#kid-act-scam');
    if (actScam) actScam.addEventListener('click', () => this.handleKidDecision(true));

    const actSafe = this.container.querySelector('#kid-act-safe');
    if (actSafe) actSafe.addEventListener('click', () => this.handleKidDecision(false));

    const nextBtn = this.container.querySelector('#btn-next-kid-mission');
    if (nextBtn) nextBtn.addEventListener('click', () => this.advanceKidMission());
  }

  handleKidDecision(isCorrect) {
    this.isDecisionMade = true;
    this.missionResult = {
      isCorrect,
      message: isCorrect ? 'YOU ARE A CYBER HERO! ⭐⭐⭐' : 'Oops! Guardy says: Always ask an adult first!',
      pointsDelta: isCorrect ? 200 : 50
    };

    if (isCorrect) {
      window.soundFx.playLevelUp();
    } else {
      window.soundFx.playDanger();
    }

    if (window.appState) {
      window.appState.recordMissionOutcome(this.currentScenario, this.missionResult, 3, 0, 0);
    }

    this.renderActiveMission();
  }

  advanceKidMission() {
    const list = window.KID_SCENARIOS || [];
    const idx = list.findIndex(s => s.id === this.currentScenario.id);
    if (idx >= 0 && idx < list.length - 1) {
      this.loadScenario(list[idx + 1]);
    } else {
      alert('Congratulations Young Guardian! You earned all the cyber safety stars!');
      window.location.hash = '#/profile';
    }
  }

  // --- STANDARD CAMPAIGN RENDERER ---
  renderStandardActiveMission() {
    const sc = this.currentScenario;
    const t = (k, def) => window.i18n ? window.i18n.t(k, def) : (def || k);
    const cluesDiscoveredCount = this.discoveredClues.size;

    this.container.innerHTML = `
      <div class="arena-container">
        <!-- Top Mission HUD -->
        <div class="mission-hud">
          <div class="mission-meta-left">
            <span class="mission-number-tag">${sc.number} · ${sc.category}</span>
            <h2 class="mission-title">${sc.title}</h2>
            <div class="mission-objective">
              <span>🎯 OBJECTIVE: ${sc.objective}</span>
            </div>
          </div>

          <div class="mission-meta-right">
            <span class="threat-badge ${sc.threatLevel === 'EASY' ? 'threat-easy' : sc.threatLevel === 'MEDIUM' ? 'threat-medium' : sc.threatLevel === 'HARD' ? 'threat-hard' : 'threat-boss'}">${sc.threatLevel}</span>
            
            ${sc.timerSeconds ? `
              <div class="arena-timer-box">
                <span>⏱️</span>
                <span class="timer-countdown">${this.timeRemaining}s</span>
              </div>
            ` : ''}

            <a href="#/arena" class="cyber-btn btn-ghost btn-sm" onclick="window.soundFx.playClick()">
              ✕ EXIT
            </a>
          </div>
        </div>

        <!-- Split Stage: Simulated Interface (Left) & Investigation Tooling (Right) -->
        <div class="arena-stage-split ${this.hotspotMode ? 'hotspot-mode-active' : ''}">
          <!-- LEFT: Simulated Digital Interaction -->
          <div class="simulated-device-column">
            ${this.renderSimulatedDevice(sc)}
          </div>

          <!-- RIGHT: Interactive Investigation Controls & Clues -->
          <div class="investigation-column">
            <div class="cyber-panel investigation-panel">
              <div class="investigation-toolbar-title">
                <span class="cyber-heading" style="font-size:1.1rem;">${t('investigationControls', 'INVESTIGATION CONTROLS')}</span>
                <span class="clues-counter-tag">${t('cluesCountLabel', 'CLUES')}: <span id="clue-count-badge">${cluesDiscoveredCount}</span>/4</span>
              </div>

              <p style="font-size:0.85rem; color:var(--text-muted);">
                ${t('investigationHint', 'Analyze signals before making your decision. Each clue uncovered awards investigation XP.')}
              </p>

              <!-- Investigation Buttons -->
              <div class="investigation-buttons-grid">
                <button class="investigate-btn ${this.discoveredClues.has('sender') ? 'discovered' : ''}" id="btn-inspect-sender">
                  <span>👤</span> <span>${t('inspectSender', 'INSPECT SENDER')}</span>
                </button>
                <button class="investigate-btn ${this.discoveredClues.has('link') ? 'discovered' : ''}" id="btn-inspect-link">
                  <span>🔗</span> <span>${t('inspectLink', 'INSPECT LINK / FILE')}</span>
                </button>
                <button class="investigate-btn ${this.discoveredClues.has('language') ? 'discovered' : ''}" id="btn-inspect-language">
                  <span>💬</span> <span>${t('inspectLanguage', 'ANALYZE LANGUAGE')}</span>
                </button>
                <button class="investigate-btn ${this.discoveredClues.has('details') ? 'discovered' : ''}" id="btn-inspect-details">
                  <span>⚙️</span> <span>${t('inspectDetails', 'CHECK DETAILS')}</span>
                </button>
              </div>

              <button class="cyber-btn btn-outline btn-sm" id="btn-toggle-hotspots" style="width:100%;">
                ${this.hotspotMode ? t('hideRedFlags', '🎯 HIDE RED FLAGS') : t('findRedFlags', '🎯 HIGHLIGHT RED FLAGS ON MESSAGE')}
              </button>

              <!-- Clue Reveal Container -->
              <div id="clue-display-area">
                ${this.renderActiveClue()}
              </div>

              ${this.hotspotMode ? `
                <div class="ai-signal-badge">
                  <span>🚩 <strong>RED FLAGS DETECTED:</strong><br>• ${sc.clues.redFlags.join('<br>• ')}</span>
                </div>
              ` : ''}
            </div>

            <!-- Decision Dock -->
            ${!this.isDecisionMade ? `
              <div class="decision-dock">
                <div class="decision-dock-title">MAKE YOUR SECURITY DECISION</div>
                <div class="decision-actions-row">
                  <button class="cyber-btn btn-emerald" id="btn-decision-safe">
                    <span>${t('actSafe', '🛡️ SAFE')}</span>
                  </button>
                  <button class="cyber-btn btn-amber" id="btn-decision-suspicious">
                    <span>${t('actSuspicious', '⚠️ SUSPICIOUS')}</span>
                  </button>
                  <button class="cyber-btn btn-danger" id="btn-decision-scam">
                    <span>${t('actScam', '🚨 SCAM')}</span>
                  </button>
                </div>
              </div>
            ` : ''}
          </div>
        </div>

        <!-- Outcome Analysis Area -->
        <div id="outcome-analysis-area">
          ${this.missionResult ? this.renderOutcomeReport() : ''}
        </div>
      </div>
    `;

    this.bindStandardEvents();
  }

  renderSimulatedDevice(sc) {
    const data = sc.interfaceData;
    if (!data) return '';

    switch(sc.interfaceType) {
      case 'sms':
        return `
          <div class="device-frame-phone">
            <div class="phone-status-bar">
              <span>9:41</span>
              <div class="phone-notch"></div>
              <span>${data.phoneCarrier} · 100%</span>
            </div>
            <div class="phone-app-header">
              <div class="phone-avatar" style="background:${data.avatarBg}">${data.avatarText}</div>
              <div class="phone-contact-info">
                <span class="phone-contact-name inspectable-flag" title="Inspect contact">${data.contactName}</span>
                <span class="phone-contact-sub">SMS / MMS</span>
              </div>
            </div>
            <div class="phone-chat-screen">
              <div class="chat-date-pill">Today ${data.time}</div>
              <div class="chat-bubble bubble-received">
                <div>${data.messageBody}</div>
                <div class="bubble-timestamp">${data.time} · Delivered</div>
              </div>
            </div>
          </div>
        `;

      case 'email':
        return `
          <div class="device-frame-email">
            <div class="email-window-titlebar">
              <div class="window-dots">
                <div class="window-dot dot-red"></div>
                <div class="window-dot dot-yellow"></div>
                <div class="window-dot dot-green"></div>
              </div>
              <span class="mono-text" style="font-size:0.75rem; color:var(--text-dim);">${data.emailClient}</span>
            </div>
            <div class="email-headers-panel">
              <div class="email-header-row">
                <span class="email-header-label">FROM:</span>
                <span class="email-header-val inspectable-flag">${data.from}</span>
              </div>
              <div class="email-header-row">
                <span class="email-header-label">REPLY-TO:</span>
                <span class="email-header-val inspectable-flag">${data.replyTo}</span>
              </div>
              <div class="email-header-row">
                <span class="email-header-label">SUBJECT:</span>
                <span class="email-header-val inspectable-flag" style="font-weight:700;">${data.subject}</span>
              </div>
              <div class="auth-badge-row">
                <span class="auth-chip ${data.spf.includes('PASS') ? 'chip-pass' : 'chip-fail'}">SPF: ${data.spf.split(' ')[0]}</span>
                <span class="auth-chip ${data.dkim.includes('PASS') ? 'chip-pass' : 'chip-fail'}">DKIM: ${data.dkim.split(' ')[0]}</span>
                <span class="auth-chip ${data.dmarc.includes('PASS') ? 'chip-pass' : 'chip-fail'}">DMARC: ${data.dmarc.split(' ')[0]}</span>
              </div>
            </div>
            <div class="email-body-content">
              <p style="white-space:pre-line;">${data.messageBody}</p>
            </div>
          </div>
        `;

      case 'job':
        return `
          <div class="cyber-panel" style="background:#0b1120; border:1px solid #1e293b;">
            <div style="display:flex; align-items:center; gap:12px; margin-bottom:16px; border-bottom:1px solid #1e293b; padding-bottom:12px;">
              <div class="brand-icon" style="background:#0a66c2;">in</div>
              <div>
                <h4 class="inspectable-flag" style="font-size:1.05rem;">${sc.senderDisplay} <span style="font-size:0.75rem; background:#0284c7; color:#fff; padding:2px 8px; border-radius:10px;">${data.badge}</span></h4>
                <div style="font-size:0.75rem; color:#64748b;">${data.senderRole} · ${data.platform}</div>
              </div>
            </div>
            <div style="font-weight:700; margin-bottom:10px; color:#38bdf8;" class="inspectable-flag">${data.subject}</div>
            <div style="font-size:0.92rem; line-height:1.6; white-space:pre-line; color:#e2e8f0;">${data.messageBody}</div>
            ${data.hasAttachment ? `
              <div style="margin-top:20px; background:#1e293b; border:1px dashed #ef4444; border-radius:8px; padding:12px 16px; display:flex; align-items:center; justify-content:space-between;" class="inspectable-flag">
                <div style="display:flex; align-items:center; gap:10px;">
                  <span style="font-size:1.4rem;">📎</span>
                  <div>
                    <div style="font-family:var(--font-mono); font-size:0.85rem; font-weight:700; color:#ef4444;">${data.attachmentName}</div>
                    <div style="font-size:0.72rem; color:#94a3b8;">1.4 MB · Application Document</div>
                  </div>
                </div>
                <button class="cyber-btn btn-danger btn-sm" onclick="alert('SIMULATION BLOCKED: Inspect the extension (.pdf.exe) first!');">OPEN</button>
              </div>
            ` : ''}
          </div>
        `;

      case 'payment':
        return `
          <div class="device-frame-payment">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
              <span class="mono-text" style="font-size:0.8rem; color:var(--cyber-cyan);">${data.appName}</span>
              <span class="payment-direction-badge inspectable-flag">${data.direction}</span>
            </div>
            <div class="payment-amount-hero">
              <div style="font-size:0.8rem; color:var(--text-dim); text-transform:uppercase;">Amount Requested</div>
              <div class="payment-amount-val inspectable-flag">${data.amount}</div>
              <div style="font-size:0.85rem; color:var(--text-muted); margin-top:4px;">Requestor: <strong>${data.contactName}</strong></div>
            </div>
            <div style="background:var(--bg-surface-elevated); padding:16px; border-radius:var(--radius-md); font-size:0.88rem; line-height:1.5; margin-bottom:20px;">
              ${data.instruction}
            </div>
          </div>
        `;

      case 'browser':
        return `
          <div class="device-frame-scareware">
            <div class="scareware-banner inspectable-flag">
              ⚠️ ${data.warningHeader}
            </div>
            <p style="font-size:0.95rem; color:#fca5a5; line-height:1.5;">${data.subHeader}</p>
            <div class="scareware-phone inspectable-flag">
              CALL TOLL-FREE: ${data.tollFree}
            </div>
            <div style="font-size:0.8rem; color:#f87171; background:rgba(0,0,0,0.4); padding:12px; border-radius:6px;">
              ${data.alertBox}
            </div>
          </div>
        `;

      case 'chat':
        return `
          <div class="device-frame-phone">
            <div class="phone-status-bar">
              <span>9:23 PM</span>
              <div class="phone-notch"></div>
              <span>WhatsApp · 4G</span>
            </div>
            <div class="phone-app-header" style="background:#075e54;">
              <div class="phone-avatar" style="background:${data.avatarBg}">${data.avatarText}</div>
              <div class="phone-contact-info">
                <span class="phone-contact-name inspectable-flag">${data.contactName}</span>
                <span class="phone-contact-sub" style="color:#dcf8c6;">${data.contactStatus}</span>
              </div>
            </div>
            <div class="phone-chat-screen" style="background:#0b141a;">
              <div class="chat-date-pill">Today ${data.time}</div>
              ${data.messages.map(m => `
                <div class="chat-bubble bubble-received" style="background:#202c33;">
                  <div>${m.text}</div>
                  <div class="bubble-timestamp">${m.time}</div>
                </div>
              `).join('')}
            </div>
          </div>
        `;

      case 'boss':
        return `
          <div class="cyber-panel" style="background:#0a0e1a; border:2px solid var(--cyber-violet); box-shadow:0 0 24px var(--cyber-violet-glow);">
            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(168,85,247,0.3); padding-bottom:12px; margin-bottom:16px;">
              <div>
                <span class="threat-badge threat-boss">BOSS CHALLENGE: WHALING DEEPFAKE</span>
                <h3 style="font-size:1.2rem; margin-top:4px;">${data.executiveName}</h3>
              </div>
              <div class="mono-text" style="font-size:0.75rem; color:var(--cyber-crimson);">CLASSIFIED NDA</div>
            </div>
            <div style="margin-bottom:14px; font-weight:700; color:#c084fc;">${data.subject}</div>
            <div style="font-size:0.92rem; line-height:1.6; white-space:pre-line; margin-bottom:16px;">${data.messageBody}</div>
            <div style="background:rgba(168,85,247,0.1); border:1px solid var(--cyber-violet); border-radius:8px; padding:14px; margin-bottom:16px;" class="inspectable-flag">
              <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:8px;">
                <span style="font-family:var(--font-mono); font-size:0.8rem; font-weight:700; color:var(--cyber-cyan);">🎙️ ATTACHED VOICE NOTE (${data.audioDuration})</span>
                <button class="cyber-btn btn-outline btn-sm" id="btn-play-voice-memo">▶ PLAY MEMO</button>
              </div>
              <div style="font-size:0.82rem; font-style:italic; color:#e2e8f0; background:rgba(0,0,0,0.3); padding:8px 12px; border-radius:4px;">
                ${data.audioTranscript}
              </div>
            </div>
            <div style="background:rgba(0,0,0,0.3); border:1px solid rgba(255,255,255,0.1); border-radius:8px; padding:12px; display:flex; justify-content:space-between; align-items:center;">
              <span class="mono-text" style="font-size:0.8rem;">📄 ${data.attachmentName}</span>
              <span class="threat-badge threat-hard">EXPEDITED WIRE: $142,500</span>
            </div>
          </div>
        `;

      default:
        return `<div class="cyber-panel">${JSON.stringify(data)}</div>`;
    }
  }

  renderActiveClue() {
    if (this.lastInspectedKey && this.currentScenario.clues[this.lastInspectedKey]) {
      const clue = this.currentScenario.clues[this.lastInspectedKey];
      return `
        <div class="clue-reveal-box">
          <div class="clue-header-line">
            <span class="clue-title-label">🔍 ${clue.title}</span>
            <span class="clue-xp-tag">+10 INVESTIGATION XP</span>
          </div>
          <div class="clue-detail-text">${clue.detail}</div>
          <div class="ai-signal-badge">
            <strong>AI SIGNAL:</strong> ${clue.signal}
          </div>
        </div>
      `;
    }

    return `
      <div style="padding:16px; border:1px dashed var(--border-subtle); border-radius:var(--radius-md); text-align:center; color:var(--text-dim); font-size:0.85rem;">
        Click any investigation control above to analyze sender, link headers, or language indicators.
      </div>
    `;
  }

  inspectClue(key) {
    if (!this.currentScenario || !this.currentScenario.clues || !this.currentScenario.clues[key]) return;
    this.lastInspectedKey = key;
    this.discoveredClues.add(key);
    window.soundFx.playClue();
    window.appState.addClue(this.currentScenario.id);

    const countEl = this.container.querySelector('#clue-count-badge');
    if (countEl) countEl.textContent = this.discoveredClues.size;

    const btn = this.container.querySelector(`#btn-inspect-${key}`);
    if (btn) btn.classList.add('discovered');

    const clueArea = this.container.querySelector('#clue-display-area');
    if (clueArea) clueArea.innerHTML = this.renderActiveClue();
  }

  toggleHotspots() {
    this.hotspotMode = !this.hotspotMode;
    window.soundFx.playScan();
    this.renderActiveMission();
  }

  handleDecision(decision) {
    if (this.isDecisionMade) return;
    this.isDecisionMade = true;
    this.cleanUpTimer();

    const sc = this.currentScenario;
    const cluesCount = this.discoveredClues.size;
    const currentStreak = window.appState.get().streak;

    const result = window.scoringEngine.calculateMissionResult({
      userDecision: decision,
      scenario: sc,
      cluesDiscoveredCount: cluesCount,
      timeRemaining: this.timeRemaining,
      totalTime: this.totalTime,
      currentStreak: currentStreak
    });

    this.missionResult = result;

    if (result.isCorrect) {
      window.soundFx.playCorrect();
    } else {
      window.soundFx.playDanger();
    }

    window.appState.recordMissionOutcome(
      sc,
      result,
      cluesCount,
      this.timeRemaining,
      this.totalTime
    );

    this.renderActiveMission();

    setTimeout(() => {
      const outcomeEl = this.container.querySelector('#outcome-analysis-area');
      if (outcomeEl) {
        outcomeEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }

  renderOutcomeReport() {
    const sc = this.currentScenario;
    const res = this.missionResult;
    const t = (k, def) => window.i18n ? window.i18n.t(k, def) : (def || k);

    return `
      ${res.isDangerous && sc.consequence ? `
        <div class="consequence-box breach-alert-active">
          <div class="consequence-title">
            <span>🚨</span>
            <span>${sc.consequence.title}</span>
          </div>
          <p style="color:#fda4af; font-size:0.95rem;">
            You trusted this interaction. Here is what would happen in a real-world breach:
          </p>
          <ul class="simulation-step-list">
            ${sc.consequence.simulation.map((step, idx) => `
              <li class="simulation-step-item">
                <span class="sim-num">0${idx + 1}</span>
                <span>${step}</span>
              </li>
            `).join('')}
          </ul>
          <div class="risk-tags-row">
            ${sc.consequence.impacts.map(imp => `
              <span class="risk-impact-tag">⚠️ ${imp}</span>
            `).join('')}
          </div>
        </div>
      ` : ''}

      ${res.isFalsePositive ? `
        <div class="consequence-box" style="border-color:var(--cyber-amber); background:rgba(245,158,11,0.08);">
          <div class="consequence-title" style="color:var(--cyber-amber);">
            <span>⚠️ FALSE POSITIVE ALARM</span>
          </div>
          <p style="color:#fde68a; font-size:0.95rem;">
            You blocked a legitimate security alert! In real cybersecurity, excessive false alarms disrupt workflows.
          </p>
        </div>
      ` : ''}

      <!-- AI Threat Analysis Dossier -->
      <div class="ai-analysis-card">
        <div class="analysis-header-grid">
          <div class="circular-risk ${sc.riskScore >= 65 ? 'high' : sc.riskScore >= 35 ? 'suspicious' : 'safe'}">
            <span class="risk-number">${sc.riskScore}</span>
            <span class="risk-label-sub">${t('riskScoreLabel', 'RISK / 100')}</span>
          </div>

          <div>
            <div style="display:flex; align-items:center; gap:10px; margin-bottom:6px;">
              <span class="threat-badge ${sc.classification === 'HIGH-RISK SCAM' ? 'threat-hard' : sc.classification === 'SUSPICIOUS' ? 'threat-medium' : 'threat-easy'}">${sc.classification}</span>
              <span class="mono-text" style="font-size:0.8rem; color:var(--cyber-cyan);">${t('confidenceLabel', 'CONFIDENCE')}: ${sc.confidence}%</span>
            </div>
            <h3 style="font-size:1.4rem; margin-bottom:4px;">${t('attackVectorLabel', 'ATTACK VECTOR')}: ${sc.attackType}</h3>
            <p style="font-size:0.88rem; color:var(--text-muted);">${res.message}</p>
          </div>
        </div>

        <div>
          <h4 class="mono-text" style="font-size:0.85rem; color:var(--cyber-cyan); margin-bottom:10px;">${t('redFlagsIdentified', 'RED FLAGS IDENTIFIED')}</h4>
          <div class="red-flags-checklist">
            ${sc.riskFactors.map(rf => `
              <div class="red-flag-item">
                <span class="flag-icon">🚩</span>
                <span>${rf}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="analysis-why-box">
          <div class="why-heading">${t('whySuspicious', 'WHY IS THIS SUSPICIOUS? (AI EXPLANATION)')}</div>
          <div style="font-size:0.92rem; line-height:1.6; color:var(--text-main);">${sc.why}</div>
        </div>

        <div class="action-defense-box">
          <div class="action-heading">${t('recommendedAction', 'RECOMMENDED DEFENSE ACTION')}</div>
          <div style="font-size:0.92rem; font-weight:600; color:var(--cyber-emerald);">${sc.recommendedAction}</div>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-top:10px;">
          <button class="cyber-btn btn-outline" onclick="window.arenaComponent.loadScenario(window.arenaComponent.currentScenario); window.soundFx.playClick();">
            ${t('retryMission', '↺ RETRY SCENARIO')}
          </button>
          
          ${this.getNextScenarioId() ? `
            <button class="cyber-btn btn-primary" onclick="window.location.hash='#/arena/play?id=${this.getNextScenarioId()}&mode=${this.currentMode}'; window.soundFx.playClick();">
              ${t('nextMission', 'NEXT MISSION ➔')}
            </button>
          ` : `
            <button class="cyber-btn btn-emerald" onclick="window.location.hash='#/profile'; window.soundFx.playLevelUp();">
              ${t('viewDossier', '🏆 VIEW OPERATOR DOSSIER')}
            </button>
          `}
        </div>
      </div>
    `;
  }

  getNextScenarioId() {
    const scenarios = this.getAllScenarios();
    if (!this.currentScenario) return null;
    const currentIndex = scenarios.findIndex(s => s.id === this.currentScenario.id);
    if (currentIndex >= 0 && currentIndex < scenarios.length - 1) {
      return scenarios[currentIndex + 1].id;
    }
    return null;
  }

  bindStandardEvents() {
    const bindBtn = (id, fn) => {
      const el = this.container.querySelector(id);
      if (el) el.addEventListener('click', fn);
    };

    bindBtn('#btn-inspect-sender', () => this.inspectClue('sender'));
    bindBtn('#btn-inspect-link', () => this.inspectClue('link'));
    bindBtn('#btn-inspect-language', () => this.inspectClue('language'));
    bindBtn('#btn-inspect-details', () => this.inspectClue('details'));
    bindBtn('#btn-toggle-hotspots', () => this.toggleHotspots());

    bindBtn('#btn-decision-safe', () => this.handleDecision('SAFE'));
    bindBtn('#btn-decision-suspicious', () => this.handleDecision('SUSPICIOUS'));
    bindBtn('#btn-decision-scam', () => this.handleDecision('SCAM'));

    const memoBtn = this.container.querySelector('#btn-play-voice-memo');
    if (memoBtn) {
      memoBtn.addEventListener('click', () => {
        window.soundFx.playScan();
        memoBtn.textContent = '🔊 PLAYING (SYNTHESIS ARTIFACTS)...';
        setTimeout(() => {
          memoBtn.textContent = '▶ REPLAY MEMO';
        }, 3000);
      });
    }

    const flags = this.container.querySelectorAll('.inspectable-flag');
    flags.forEach(flag => {
      flag.addEventListener('click', () => {
        window.soundFx.playClue();
        this.inspectClue('details');
      });
    });
  }
}

window.ArenaView = ArenaView;
