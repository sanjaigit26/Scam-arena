// Scan & Detect Component for Scam Arena

class ScanView {
  constructor() {
    this.container = null;
    this.isScanning = false;
    this.scanResult = null;
    this.pipelineStep = 0;
  }

  mount(container) {
    this.container = container;
    this.render();
  }

  render() {
    if (!this.container) return;

    const presets = [
      {
        title: "IRS Tax Arrest Threat",
        text: "INTERNAL REVENUE SERVICE NOTICE: An arrest warrant has been issued in your name for outstanding federal tax discrepancies. Contact Officer Vance at +1-888-294-0192 immediately to remit $1,450 via MoneyGram to avoid federal custody."
      },
      {
        title: "FedEx Package Fee",
        text: "FedEx: Your shipment #FX-920194 is on hold due to missing customs payment of $2.40. Update your credit card and delivery address within 24 hours: https://fedex-express-delivery.top/update"
      },
      {
        title: "Grandchild Jail Emergency",
        text: "Hi Grandma, it's Alex. Please keep this secret and strictly confidential. I was in a car accident and I'm at the county precinct. The bail bond is $2,000 cash. Please wire it to Western Union Agent Miller right now so they let me out."
      },
      {
        title: "Crypto Arbitrage Bot",
        text: "VIP Community: Quantum Arbitrage AI generates guaranteed daily returns of 25% by exploiting DEX slippage. Limited to first 50 depositors. Connect Web3 wallet to approve smart contract: https://arbitrage-dex-yields.finance"
      },
      {
        title: "Legitimate Zoom Invite (Safe)",
        text: "Alex has invited you to a scheduled Zoom meeting: Q4 Engineering Sync on October 8, 2026, at 2:00 PM Pacific Time. Join Zoom Meeting: https://zoom.us/j/9201948201?pwd=securePassCode"
      }
    ];

    this.container.innerHTML = `
      <div class="scanner-container">
        <div class="scanner-header">
          <div style="display:flex; justify-content:center; gap:8px; align-items:center; flex-wrap:wrap; margin-bottom:8px;">
            <span class="threat-badge threat-easy">AI THREAT INTELLIGENCE</span>
            <span class="threat-badge" style="background:rgba(0,229,255,0.15); border:1px solid var(--cyber-cyan); color:var(--cyber-cyan); font-weight:800;">⚡ AI Engine: Deterministic (LLM-ready)</span>
          </div>
          <h1 class="scanner-title">SCAN & DETECT</h1>
          <p class="scanner-subtitle">
            Paste any suspicious SMS, email, direct message, or payment request. The engine scans for psychological coercion, credential harvesting, and domain spoofing patterns with zero cloud leakage.
          </p>
        </div>

        <!-- Architectural telemetry banner -->
        <div style="background:rgba(0,229,255,0.04); border:1px solid rgba(0,229,255,0.2); border-radius:6px; padding:10px 16px; margin-bottom:16px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; font-size:0.8rem; font-family:var(--font-mono);">
          <div>
            <strong style="color:var(--cyber-cyan);">ENGINE TELEMETRY:</strong> Deterministic Heuristic Pipeline · Zero-latency Client-side NLP · Plug-and-Play LLM Adapter
          </div>
          <span style="color:var(--cyber-emerald); font-weight:700;">● 100% OFFLINE & ZERO PRIVACY LEAKAGE</span>
        </div>

        <!-- Preset Test Prompts -->
        <div class="scanner-presets-wrapper">
          <span class="presets-label">QUICK TEST PRESETS (CLICK TO LOAD):</span>
          <div class="presets-chips">
            ${presets.map((p, idx) => `
              <button class="preset-chip-btn" data-preset-idx="${idx}">
                ⚡ ${p.title}
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Input Area -->
        <div class="scanner-input-box">
          <textarea class="scanner-textarea" id="scan-input" placeholder="Paste suspicious message text, SMS, or email contents here..."></textarea>
          
          <div class="scanner-input-footer">
            <span class="char-counter" id="char-count">0 characters</span>
            <div style="display:flex; gap:10px;">
              <button class="cyber-btn btn-ghost btn-sm" id="btn-clear-scan">CLEAR</button>
              <button class="cyber-btn btn-primary btn-sm" id="btn-run-scan" ${this.isScanning ? 'disabled' : ''}>
                <span>${this.isScanning ? '⚡ SCANNING...' : '🔍 RUN AI SCAN'}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- 5-Step Animated Scanning Pipeline -->
        ${this.isScanning ? `
          <div class="scanner-pipeline">
            <div class="pipeline-title">
              <span>🤖</span>
              <span>AI SCAN TELEMETRY IN PROGRESS...</span>
            </div>
            <div class="pipeline-steps-list">
              <div class="pipeline-step ${this.pipelineStep >= 1 ? (this.pipelineStep === 1 ? 'active' : 'completed') : ''}">
                <div class="step-indicator">${this.pipelineStep > 1 ? '✓' : '1'}</div>
                <span>1. READING MESSAGE</span>
              </div>
              <div class="pipeline-step ${this.pipelineStep >= 2 ? (this.pipelineStep === 2 ? 'active' : 'completed') : ''}">
                <div class="step-indicator">${this.pipelineStep > 2 ? '✓' : '2'}</div>
                <span>2. EXTRACTING SIGNALS</span>
              </div>
              <div class="pipeline-step ${this.pipelineStep >= 3 ? (this.pipelineStep === 3 ? 'active' : 'completed') : ''}">
                <div class="step-indicator">${this.pipelineStep > 3 ? '✓' : '3'}</div>
                <span>3. CHECKING PATTERNS</span>
              </div>
              <div class="pipeline-step ${this.pipelineStep >= 4 ? (this.pipelineStep === 4 ? 'active' : 'completed') : ''}">
                <div class="step-indicator">${this.pipelineStep > 4 ? '✓' : '4'}</div>
                <span>4. CALCULATING RISK</span>
              </div>
              <div class="pipeline-step ${this.pipelineStep >= 5 ? 'completed' : ''}">
                <div class="step-indicator">${this.pipelineStep >= 5 ? '✓' : '5'}</div>
                <span>5. GENERATING EXPLANATION</span>
              </div>
            </div>
          </div>
        ` : ''}

        <!-- Scan Result Area -->
        ${this.scanResult && !this.isScanning ? this.renderScanResult() : ''}
      </div>
    `;

    this.bindEvents(presets);
  }

  renderScanResult() {
    const res = this.scanResult;

    return `
      <div class="scan-result-wrapper">
        <div class="ai-analysis-card">
          <div class="analysis-header-grid">
            <div class="circular-risk ${res.score >= 65 ? 'high' : res.score >= 35 ? 'suspicious' : 'safe'}">
              <span class="risk-number">${res.score}</span>
              <span class="risk-label-sub">RISK / 100</span>
            </div>

            <div>
              <div style="display:flex; align-items:center; gap:10px; margin-bottom:6px;">
                <span class="threat-badge ${res.classification === 'HIGH-RISK SCAM' ? 'threat-hard' : res.classification === 'SUSPICIOUS' ? 'threat-medium' : 'threat-easy'}">
                  ${res.classification}
                </span>
                <span class="mono-text" style="font-size:0.8rem; color:var(--cyber-cyan);">CONFIDENCE: ${res.confidence}%</span>
              </div>
              <h3 style="font-size:1.4rem; margin-bottom:4px;">CLASSIFICATION: ${res.attackType}</h3>
              <p style="font-size:0.88rem; color:var(--text-muted);">
                ${res.score >= 65 ? 'High probability of fraudulent or malicious intent detected.' : res.score >= 35 ? 'Moderate risk indicators present. Exercise caution.' : 'Low risk profile. Standard verification applies.'}
              </p>
            </div>
          </div>

          <!-- Red Flags Identified -->
          ${res.flags.length > 0 ? `
            <div>
              <h4 class="mono-text" style="font-size:0.85rem; color:var(--cyber-cyan); margin-bottom:10px;">RISK FACTORS DETECTED</h4>
              <div class="red-flags-checklist">
                ${res.flags.map(f => `
                  <div class="red-flag-item">
                    <span class="flag-icon">🚩</span>
                    <span>${f}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : `
            <div class="red-flag-item" style="border-left-color:var(--cyber-emerald);">
              <span class="flag-icon" style="color:var(--cyber-emerald)">✓</span>
              <span>No known scam patterns or coercion triggers detected in this message.</span>
            </div>
          `}

          <!-- Why Explanation -->
          <div class="analysis-why-box">
            <div class="why-heading">EXPLAINABLE ANALYSIS (WHY?)</div>
            <div style="font-size:0.92rem; line-height:1.6; color:var(--text-main);">${res.why}</div>
          </div>

          <!-- Recommended Action -->
          <div class="action-defense-box">
            <div class="action-heading">RECOMMENDED ACTION</div>
            <div style="font-size:0.92rem; font-weight:600; color:var(--cyber-emerald);">${res.recommendedAction}</div>
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; margin-top:12px;">
            <button class="cyber-btn btn-outline btn-sm" id="btn-scan-another">
              ↺ SCAN ANOTHER MESSAGE
            </button>
            <a href="#/arena" class="cyber-btn btn-primary btn-sm">
              PRACTICE IN SCAM ARENA ➔
            </a>
          </div>
        </div>
      </div>
    `;
  }

  bindEvents(presets) {
    const textarea = this.container.querySelector('#scan-input');
    const charCount = this.container.querySelector('#char-count');
    const runBtn = this.container.querySelector('#btn-run-scan');
    const clearBtn = this.container.querySelector('#btn-clear-scan');

    if (textarea && charCount) {
      textarea.addEventListener('input', () => {
        charCount.textContent = `${textarea.value.length} characters`;
      });
    }

    if (clearBtn && textarea) {
      clearBtn.addEventListener('click', () => {
        textarea.value = '';
        if (charCount) charCount.textContent = '0 characters';
        this.scanResult = null;
        this.render();
      });
    }

    if (runBtn && textarea) {
      runBtn.addEventListener('click', () => {
        const text = textarea.value.trim();
        if (!text) {
          alert('Please enter or paste a message to analyze.');
          return;
        }
        this.executeScanPipeline(text);
      });
    }

    // Preset button clicks
    const presetBtns = this.container.querySelectorAll('.preset-chip-btn');
    presetBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-preset-idx'), 10);
        if (presets[idx] && textarea) {
          window.soundFx.playClick();
          textarea.value = presets[idx].text;
          if (charCount) charCount.textContent = `${textarea.value.length} characters`;
        }
      });
    });

    const scanAnother = this.container.querySelector('#btn-scan-another');
    if (scanAnother) {
      scanAnother.addEventListener('click', () => {
        this.scanResult = null;
        this.render();
      });
    }
  }

  executeScanPipeline(text) {
    this.isScanning = true;
    this.pipelineStep = 1;
    window.soundFx.playScan();
    this.render();

    const advance = (step, delay) => {
      return new Promise(resolve => {
        setTimeout(() => {
          this.pipelineStep = step;
          window.soundFx.playScan();
          this.render();
          resolve();
        }, delay);
      });
    };

    advance(2, 350)
      .then(() => advance(3, 350))
      .then(() => advance(4, 350))
      .then(() => advance(5, 350))
      .then(() => {
        setTimeout(() => {
          this.scanResult = window.riskEngine.analyzeText(text);
          this.isScanning = false;
          if (this.scanResult.score >= 65) {
            window.soundFx.playDanger();
          } else {
            window.soundFx.playCorrect();
          }
          this.render();
        }, 300);
      });
  }
}

window.ScanView = ScanView;
