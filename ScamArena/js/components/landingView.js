// Landing Page Component for Scam Arena with Impact, Explainable AI Demo, SDGs, and Comparison Table

class LandingView {
  constructor() {
    this.container = null;
    this.unsubscribeI18n = null;
    this.demoText = "URGENT: Electricity power will be disconnected at 9:30 PM tonight due to unpaid bill! Call nodal officer at +91-9876543210 immediately to pay.";
    this.demoResult = null;
  }

  mount(container) {
    this.container = container;
    this.analyzeDemo(this.demoText);
    this.render();

    if (window.i18n) {
      this.unsubscribeI18n = window.i18n.subscribe(() => this.render());
    }
  }

  unmount() {
    if (this.unsubscribeI18n) {
      this.unsubscribeI18n();
      this.unsubscribeI18n = null;
    }
  }

  analyzeDemo(text) {
    this.demoText = text;
    if (window.riskEngine) {
      this.demoResult = window.riskEngine.analyze(text);
    }
  }

  render() {
    if (!this.container) return;
    const t = (k, def) => window.i18n ? window.i18n.t(k, def) : (def || k);
    const result = this.demoResult || { score: 92, level: "HIGH", label: "HIGH RISK", flags: [], reasoning: "Severe urgency detected along with unverified personal number." };

    const presets = [
      {
        id: "power",
        label: "⚡ Electricity Disconnection",
        text: "URGENT: Electricity power will be disconnected at 9:30 PM tonight due to unpaid bill! Call nodal officer at +91-9876543210 immediately to pay."
      },
      {
        id: "lottery",
        label: "🎁 KBC ₹25 Lakh Lottery",
        text: "Congratulations! Your mobile number won ₹25,00,000 in KBC Lucky Draw 2026. Deposit ₹4,999 registration fee to SBI account to release cheque immediately."
      },
      {
        id: "kyc",
        label: "🏦 Bank KYC / PAN Blocked",
        text: "Dear SBI User, Your YONO account will be blocked today due to pending KYC verification. Download and install support APK immediately: http://sbi-kyc-update.apk"
      },
      {
        id: "kids",
        label: "🎮 Free 10,000 Robux / Game Gems",
        text: "Hey! Want 10,000 free Robux instantly? Just send me the 6-digit OTP code that was just sent to your parent's phone number! Keep it secret!"
      }
    ];

    this.container.innerHTML = `
      <div class="landing-page-wrapper">
        <!-- Hero Section -->
        <section class="cyber-hero-section">
          <div class="hero-badge-tag">
            <span class="threat-badge threat-boss">AI-POWERED CYBERSECURITY DEFENSE</span>
          </div>

          <h1 class="hero-glitch-title">
            SCAM <span style="color:var(--cyber-cyan)">ARENA</span>
          </h1>

          <p class="hero-motto">
            ${t('brandTagline', 'Detect. Decide. Defend.')}
          </p>

          <h2 class="hero-challenge-tag">
            "${t('heroChallenge', 'Can you spot the scam before it\'s too late?')}"
          </h2>

          <p class="hero-description">
            ${t('heroDescription', 'An AI-powered interactive platform that trains people to recognize digital scams before they become victims. Built to replace passive cybersecurity slides with high-stakes simulated operations.')}
          </p>

          <!-- Core Experience Flow Diagram -->
          <div class="hero-flow-diagram">
            <div class="flow-step-box">
              <span class="flow-icon">📩</span>
              <span class="flow-name">${t('flowMsg', 'MESSAGE')}</span>
              <span class="flow-sub">SMS / Email / DM</span>
            </div>
            <div class="flow-arrow">➔</div>
            <div class="flow-step-box active-ai">
              <span class="flow-icon">🤖</span>
              <span class="flow-name">${t('flowAI', 'AI ANALYSIS')}</span>
              <span class="flow-sub">Signal Extraction</span>
            </div>
            <div class="flow-arrow">➔</div>
            <div class="flow-step-box threat-alert">
              <span class="flow-icon">⚠️</span>
              <span class="flow-name">${t('flowThreat', 'THREAT DETECTION')}</span>
              <span class="flow-sub">Risk Score & Flags</span>
            </div>
            <div class="flow-arrow">➔</div>
            <div class="flow-step-box human-decision">
              <span class="flow-icon">🛡️</span>
              <span class="flow-name">${t('flowHuman', 'HUMAN DECISION')}</span>
              <span class="flow-sub">Investigate & Defend</span>
            </div>
          </div>

          <!-- Hero Action CTAs -->
          <div class="hero-cta-group">
            <a href="#/arena" class="cyber-btn btn-primary btn-lg" onclick="window.soundFx.playClick()">
              <span>⚡ ${t('btnEnterArena', 'ENTER THE ARENA')}</span>
            </a>
            <a href="#/duel" class="cyber-btn btn-danger btn-lg" onclick="window.soundFx.playClick()">
              <span>⚔️ ${t('btnChatDuel', 'SCAMMER CHAT DUEL')}</span>
            </a>
            <a href="#/scan" class="cyber-btn btn-outline btn-lg" onclick="window.soundFx.playClick()">
              <span>🔍 ${t('btnScanMsg', 'SCAN A MESSAGE')}</span>
            </a>
            <a href="#/demo" class="cyber-btn btn-amber btn-lg" onclick="window.soundFx.playClick()">
              <span>🏆 ${t('btnJudgeDemo', 'JUDGE CHALLENGE')}</span>
            </a>
          </div>
        </section>

        <!-- Live Cyber Ticker -->
        <div class="cyber-ticker-bar">
          <div class="ticker-label">LIVE THREAT RADAR 2026:</div>
          <div class="ticker-scroll-content">
            <span>🚨 Banking Smishing Surge: VoIP lookalike portals targeting mobile banking users</span>
            <span>·</span>
            <span>⚠️ Advance-Fee Job Scam: .pdf.exe malware concealed in remote onboarding packets</span>
            <span>·</span>
            <span>💸 Reverse P2P QR Scam: Attackers requesting PIN to 'receive' marketplace refunds</span>
            <span>·</span>
            <span>🎙️ AI Voice Whaling: Synthesized C-suite audio orders urgent escrow transfers</span>
            <span>·</span>
            <span>👵 Senior Coercion: Electricity bill cutoff threats surging over SMS</span>
          </div>
        </div>

        <!-- 1. Real-World Impact Stats Section -->
        <section class="cyber-panel" style="margin: 24px 0;">
          <div class="section-heading-row" style="margin-bottom: 8px;">
            <div>
              <span class="threat-badge threat-hard">GLOBAL FRAUD CRISIS</span>
              <h2 style="font-size:1.8rem; margin-top:6px;">The Human Cost of Digital Scams</h2>
            </div>
          </div>
          <p style="color:var(--text-muted); font-size:0.95rem; max-width:800px; line-height:1.6;">
            Digital scams are no longer isolated email spams—they are engineered psychological operations exploiting urgency, fear, and trust across every generation.
          </p>

          <div class="impact-stats-grid">
            <div class="impact-stat-card">
              <span class="impact-num">$1.03T</span>
              <span class="impact-lbl">Lost globally to cyber scams and digital social engineering annually (GASA 2025/2026).</span>
            </div>
            <div class="impact-stat-card">
              <span class="impact-num" style="color:var(--cyber-amber);">73%</span>
              <span class="impact-lbl">Of senior citizens target-victimized report experiencing high stress and financial vulnerability.</span>
            </div>
            <div class="impact-stat-card">
              <span class="impact-num" style="color:var(--cyber-crimson);">1 in 5</span>
              <span class="impact-lbl">Children under 16 encounter deceptive traps through gaming currencies and social chat.</span>
            </div>
            <div class="impact-stat-card">
              <span class="impact-num" style="color:var(--cyber-emerald);">85%</span>
              <span class="impact-lbl">Of individuals fail to recognize conversational AI social engineering without simulation training.</span>
            </div>
          </div>
        </section>

        <!-- 2. Interactive Explainable AI Live Demo Box -->
        <section class="cyber-panel" style="margin: 24px 0; border-color:var(--cyber-cyan); box-shadow:0 0 25px rgba(0,229,255,0.15);">
          <div class="section-heading-row" style="margin-bottom: 12px;">
            <div>
              <span class="threat-badge threat-boss">INTERACTIVE LIVE DEMO</span>
              <h2 style="font-size:1.8rem; margin-top:6px;">Explainable AI Threat Detection</h2>
            </div>
            <span class="threat-badge threat-easy" style="font-size:0.75rem;">100% CLIENT-SIDE & OFFLINE</span>
          </div>
          <p style="color:var(--text-muted); font-size:0.92rem; margin-bottom:16px;">
            Click any trigger sample or edit text below to observe real-time deterministic heuristic extraction and transparent explainability:
          </p>

          <!-- Preset trigger buttons -->
          <div style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:14px;">
            ${presets.map(p => `
              <button class="cyber-btn btn-ghost btn-sm demo-preset-btn ${this.demoText === p.text ? 'active' : ''}" data-text="${encodeURIComponent(p.text)}" style="font-size:0.8rem; padding:6px 12px; border:1px solid var(--border-subtle);">
                ${p.label}
              </button>
            `).join('')}
          </div>

          <!-- Live Textarea + Scan button -->
          <div style="display:flex; flex-direction:column; gap:12px; margin-bottom:20px;">
            <textarea id="live-demo-input" class="scanner-textarea" rows="3" style="font-size:0.95rem; line-height:1.5;">${this.demoText}</textarea>
            <div style="display:flex; justify-content:flex-end;">
              <button id="btn-run-demo-eval" class="cyber-btn btn-primary btn-sm">
                🔍 RUN EXPLAINABLE AI SCAN ➔
              </button>
            </div>
          </div>

          <!-- Dynamic Live Evaluation Telemetry -->
          <div style="background:var(--bg-surface); border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:20px; display:grid; grid-template-columns:220px 1fr; gap:20px;">
            <!-- Left Score Gauge -->
            <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; border-right:1px solid var(--border-subtle); padding-right:16px; text-align:center;">
              <span class="mono-text" style="font-size:0.75rem; color:var(--text-dim);">THREAT INDEX</span>
              <div style="font-size:3rem; font-family:var(--font-heading); font-weight:900; color:${result.score > 70 ? 'var(--cyber-crimson)' : result.score > 35 ? 'var(--cyber-amber)' : 'var(--cyber-emerald)'};">
                ${result.score}/100
              </div>
              <span class="threat-badge ${result.score > 70 ? 'threat-boss' : result.score > 35 ? 'threat-medium' : 'threat-easy'}" style="margin-top:6px;">
                ${result.label || (result.score > 70 ? 'HIGH RISK' : result.score > 35 ? 'SUSPICIOUS' : 'SAFE')}
              </span>
            </div>

            <!-- Right Heuristics & Explainability -->
            <div>
              <div style="font-weight:700; font-size:0.95rem; margin-bottom:8px; color:var(--cyber-cyan);">
                EXPLAINABLE AI REASONING:
              </div>
              <p style="font-size:0.9rem; color:var(--text-main); line-height:1.5; margin-bottom:12px;">
                ${result.reasoning || "Analyzed pattern against psychological coercion heuristics, known spoofing patterns, and unverified contact identifiers."}
              </p>

              <!-- Extracted Flags -->
              <div style="display:flex; flex-wrap:wrap; gap:6px; margin-bottom:12px;">
                ${(result.flags && result.flags.length > 0 ? result.flags : ['URGENCY_COERCION', 'UNVERIFIED_SENDER']).map(f => `
                  <span class="ai-signal-badge" style="font-size:0.72rem; padding:3px 8px;">
                    ⚠️ ${typeof f === 'string' ? f : f.name || f.type || 'SUSPICIOUS_PATTERN'}
                  </span>
                `).join('')}
              </div>

              <!-- Recommended Defense Action -->
              <div style="background:rgba(16,185,129,0.08); border-left:3px solid var(--cyber-emerald); padding:8px 12px; border-radius:4px; font-size:0.85rem;">
                <strong style="color:var(--cyber-emerald);">RECOMMENDED DEFENSE:</strong> ${result.action || "Do not reply, do not dial the number, and verify directly through the official provider portal or bill."}
              </div>
            </div>
          </div>
        </section>

        <!-- 3. Tailored Protection Across Audiences -->
        <section class="cyber-panel" style="margin: 24px 0;">
          <div class="section-heading-row" style="margin-bottom: 8px;">
            <div>
              <span class="threat-badge threat-medium">MULTI-GENERATIONAL DEFENSE</span>
              <h2 style="font-size:1.8rem; margin-top:6px;">Protection Tailored For Every Citizen</h2>
            </div>
          </div>
          <p style="color:var(--text-muted); font-size:0.95rem; max-width:800px; line-height:1.6;">
            A one-size-fits-all training fails. Scam Arena provides custom game modes designed for vulnerable demographics.
          </p>

          <div class="who-we-protect-grid">
            <!-- Standard Arena -->
            <div class="protect-card" style="border-top:3px solid var(--cyber-cyan);">
              <div class="protect-icon">🛡️</div>
              <h3 style="font-size:1.15rem;">Standard Arena</h3>
              <p style="font-size:0.85rem; color:var(--text-muted); line-height:1.5;">
                High-stakes simulated operations across SMS, Email, QR codes, remote work recruitment, and fake banking portals.
              </p>
              <a href="#/arena" class="cyber-btn btn-outline btn-sm" style="margin-top:auto;">PLAY ARENA ➔</a>
            </div>

            <!-- Scammer Chat Duel -->
            <div class="protect-card" style="border-top:3px solid var(--cyber-crimson);">
              <div class="protect-icon">⚔️</div>
              <h3 style="font-size:1.15rem;">Scammer Chat Duel</h3>
              <p style="font-size:0.85rem; color:var(--text-muted); line-height:1.5;">
                Engage in live interactive conversation against deceptive scammers. Maintain your Trust Shield while withstanding manipulative tactics!
              </p>
              <a href="#/duel" class="cyber-btn btn-danger btn-sm" style="margin-top:auto;">ENTER DUEL ➔</a>
            </div>

            <!-- Senior Shield -->
            <div class="protect-card" style="border-top:3px solid #38bdf8;">
              <div class="protect-icon">👵</div>
              <h3 style="font-size:1.15rem;">Senior Shield Mode</h3>
              <p style="font-size:0.85rem; color:var(--text-muted); line-height:1.5;">
                Enlarged high-contrast UI, native Web Speech read-aloud support, and clear, empowering "Remember This" rules for elderly users.
              </p>
              <a href="#/arena" class="cyber-btn btn-outline btn-sm" style="margin-top:auto;" onclick="window.soundFx.playClick(); setTimeout(()=>{ const b=document.querySelector('[data-mode=\"senior\"]'); if(b) b.click(); }, 100);">LAUNCH SHIELD ➔</a>
            </div>

            <!-- Kid Guardian -->
            <div class="protect-card" style="border-top:3px solid #ec4899;">
              <div class="protect-icon">🧒</div>
              <h3 style="font-size:1.15rem;">Kid Guardian Mode</h3>
              <p style="font-size:0.85rem; color:var(--text-muted); line-height:1.5;">
                Animated mascot "Guardy", star stickers (⭐⭐⭐), positive coaching, and foundational rules: "Never share OTP & tell a trusted adult."
              </p>
              <a href="#/arena" class="cyber-btn btn-outline btn-sm" style="margin-top:auto;" onclick="window.soundFx.playClick(); setTimeout(()=>{ const b=document.querySelector('[data-mode=\"kid\"]'); if(b) b.click(); }, 100);">LAUNCH GUARDIAN ➔</a>
            </div>
          </div>
        </section>

        <!-- 4. Why Scam Arena is Different - Comparison Table -->
        <section class="cyber-panel" style="margin: 24px 0;">
          <div class="section-heading-row" style="margin-bottom: 8px;">
            <div>
              <span class="threat-badge threat-boss">COMPARATIVE ANALYSIS</span>
              <h2 style="font-size:1.8rem; margin-top:6px;">Why Scam Arena is Different</h2>
            </div>
          </div>
          <p style="color:var(--text-muted); font-size:0.95rem; max-width:800px; line-height:1.6; margin-bottom:18px;">
            Traditional cybersecurity training is boring, compliance-driven, and ineffective against dynamic social engineering.
          </p>

          <div class="comparison-table-wrapper">
            <table class="comparison-table">
              <thead>
                <tr>
                  <th>CAPABILITY / METRIC</th>
                  <th>TRADITIONAL TESTS</th>
                  <th>STATIC SLIDES</th>
                  <th style="color:var(--cyber-cyan); font-weight:800;">SCAM ARENA</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Interactive Adversarial Duel</strong></td>
                  <td><span class="table-cross">✗ None</span></td>
                  <td><span class="table-cross">✗ None</span></td>
                  <td><span class="table-check">✓ Live Chat Duel (/duel)</span></td>
                </tr>
                <tr>
                  <td><strong>Explainable AI Heuristics</strong></td>
                  <td><span class="table-cross">✗ Pass / Fail Only</span></td>
                  <td><span class="table-cross">✗ Bullet points</span></td>
                  <td><span class="table-check">✓ Real-Time Signals & Reasoning</span></td>
                </tr>
                <tr>
                  <td><strong>Audience Specific Modes</strong></td>
                  <td><span class="table-cross">✗ Corporate Only</span></td>
                  <td><span class="table-cross">✗ Generic</span></td>
                  <td><span class="table-check">✓ Senior Shield & Kid Guardian</span></td>
                </tr>
                <tr>
                  <td><strong>Zero-Trust Offline Operation</strong></td>
                  <td><span class="table-cross">✗ Cloud SaaS Only</span></td>
                  <td><span class="table-cross">✗ LMS Login Required</span></td>
                  <td><span class="table-check">✓ 100% Client-Side Private</span></td>
                </tr>
                <tr>
                  <td><strong>Native Multilingual (தமிழ் / हिन्दी)</strong></td>
                  <td><span class="table-cross">✗ English Only</span></td>
                  <td><span class="table-cross">✗ Infrequent</span></td>
                  <td><span class="table-check">✓ Native i18n & Speech Synthesis</span></td>
                </tr>
                <tr>
                  <td><strong>Consequence Simulation</strong></td>
                  <td><span class="table-cross">✗ Generic Failure Page</span></td>
                  <td><span class="table-cross">✗ Text Only</span></td>
                  <td><span class="table-check">✓ Visual Step-by-Step Breach</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- 5. UN Sustainable Development Goals (SDG) Alignment -->
        <section class="cyber-panel" style="margin: 24px 0;">
          <div class="section-heading-row" style="margin-bottom: 8px;">
            <div>
              <span class="threat-badge threat-easy">GLOBAL IMPACT</span>
              <h2 style="font-size:1.8rem; margin-top:6px;">UN Sustainable Development Goals (SDG)</h2>
            </div>
          </div>
          <p style="color:var(--text-muted); font-size:0.95rem; max-width:800px; line-height:1.6;">
            Scam Arena actively advances key United Nations Sustainable Development Goals by democratizing cybersecurity hygiene:
          </p>

          <div class="sdg-grid">
            <div class="sdg-card">
              <div class="sdg-icon">🎓</div>
              <div>
                <h4 style="font-size:1.15rem; color:#f59e0b; margin-bottom:4px;">SDG 4: Quality Education</h4>
                <p style="font-size:0.88rem; color:var(--text-muted); line-height:1.5;">
                  Delivers free, equitable, and inclusive digital defense education. Replaces expensive corporate training with gamified digital literacy for seniors, kids, and students worldwide.
                </p>
              </div>
            </div>

            <div class="sdg-card">
              <div class="sdg-icon">💡</div>
              <div>
                <h4 style="font-size:1.15rem; color:#3b82f6; margin-bottom:4px;">SDG 9: Industry, Innovation & Infrastructure</h4>
                <p style="font-size:0.88rem; color:var(--text-muted); line-height:1.5;">
                  Pioneers innovative, privacy-first, client-side explainable AI architectures. Operates without transmitting sensitive citizen inputs or personal conversations to third-party cloud servers.
                </p>
              </div>
            </div>

            <div class="sdg-card">
              <div class="sdg-icon">🏙️</div>
              <div>
                <h4 style="font-size:1.15rem; color:#10b981; margin-bottom:4px;">SDG 11: Sustainable Cities & Communities</h4>
                <p style="font-size:0.88rem; color:var(--text-muted); line-height:1.5;">
                  Safeguards vulnerable local communities and senior citizens against debilitating financial fraud, preserving economic stability and communal trust across rapidly digitizing societies.
                </p>
              </div>
            </div>

            <div class="sdg-card">
              <div class="sdg-icon">⚖️</div>
              <div>
                <h4 style="font-size:1.15rem; color:#8b5cf6; margin-bottom:4px;">SDG 16: Peace, Justice & Strong Institutions</h4>
                <p style="font-size:0.88rem; color:var(--text-muted); line-height:1.5;">
                  Integrates direct threat reporting pathways to official institutional cybercrime response systems (including India's National Cyber Crime Helpline 1930 & cybercrime.gov.in).
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- Mission Roster Preview -->
        <section class="roster-preview-section" style="margin-top: 24px;">
          <div class="section-heading-row">
            <div>
              <span class="threat-badge threat-medium">MISSION BRIEFINGS</span>
              <h2 style="font-size:1.8rem; margin-top:6px;">10 Scenario Campaigns Available</h2>
            </div>
            <a href="#/arena" class="cyber-btn btn-outline btn-sm">VIEW ALL MISSIONS →</a>
          </div>

          <div class="scenarios-carousel-grid">
            ${(window.SCENARIOS || []).slice(0, 4).map(sc => `
              <div class="cyber-panel mission-preview-card" onclick="window.location.hash='#/arena/play?id=${sc.id}'; window.soundFx.playClick();">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                  <span class="threat-badge ${sc.threatLevel === 'EASY' ? 'threat-easy' : sc.threatLevel === 'MEDIUM' ? 'threat-medium' : sc.threatLevel === 'HARD' ? 'threat-hard' : 'threat-boss'}">${sc.threatLevel}</span>
                  <span class="mono-text" style="font-size:0.75rem; color:var(--cyber-cyan);">${sc.category}</span>
                </div>
                <h4 style="font-size:1.1rem; margin-bottom:4px;">${sc.title}</h4>
                <p style="font-size:0.82rem; color:var(--text-muted); margin-bottom:14px;">${sc.subtitle}</p>
                <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--border-subtle); padding-top:10px;">
                  <span style="font-size:0.75rem; color:var(--text-dim); font-family:var(--font-mono);">OBJ: ${sc.interfaceType.toUpperCase()}</span>
                  <span style="font-size:0.82rem; color:var(--cyber-cyan); font-weight:700;">LAUNCH ➔</span>
                </div>
              </div>
            `).join('')}
          </div>
        </section>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    // Preset buttons
    const presetBtns = this.container.querySelectorAll('.demo-preset-btn');
    presetBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        window.soundFx.playClick();
        const rawText = decodeURIComponent(e.currentTarget.getAttribute('data-text'));
        this.analyzeDemo(rawText);
        this.render();
      });
    });

    // Run Demo Scan button
    const runBtn = this.container.querySelector('#btn-run-demo-eval');
    if (runBtn) {
      runBtn.addEventListener('click', () => {
        window.soundFx.playClick();
        const input = this.container.querySelector('#live-demo-input');
        if (input && input.value) {
          this.analyzeDemo(input.value);
          this.render();
        }
      });
    }
  }
}

window.LandingView = LandingView;
