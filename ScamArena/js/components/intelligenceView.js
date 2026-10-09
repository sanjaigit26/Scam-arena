// Threat Intelligence Encyclopedia & Demographic Heatmap for Scam Arena

class IntelligenceView {
  constructor() {
    this.container = null;
  }

  mount(container) {
    this.container = container;
    this.render();
  }

  render() {
    if (!this.container) return;

    const heatmap = [
      {
        audience: "👵 Senior Citizens (60+)",
        primaryVectors: "Electricity Cutoff, Digital Arrest (CBI/Police), Pension KYC, Hospital Emergency",
        severity: "CRITICAL",
        psychology: "Urgency, fear of arrest, loss of essential utilities, isolation coercion",
        incidence: "73% of seniors face targeted phone/SMS phishing annually",
        color: "var(--cyber-crimson)"
      },
      {
        audience: "🧒 Children & Teens (<16)",
        primaryVectors: "Free Robux / Game Skins, Stranger Secret Chat, Parent's Card Quests, Trojan Mod APKs",
        severity: "HIGH",
        psychology: "Desire for game status, curiosity, peer pressure, secret-keeping manipulation",
        incidence: "1 in 5 kids encounter deceptive online game traps",
        color: "#ec4899"
      },
      {
        audience: "🎓 Students & Young Adults (17-25)",
        primaryVectors: "Telegram Part-Time Task Scams, Fake Internship Offers, Campus Money Muling, Exam Leaks",
        severity: "HIGH",
        psychology: "Financial stress, desire for fast flexible earnings, trust in modern chat platforms",
        incidence: "42% surge in task-based work-from-home fraud in 2025/2026",
        color: "var(--cyber-amber)"
      },
      {
        audience: "💼 Working Professionals",
        primaryVectors: "AI Voice Executive Whaling, Vendor Invoice Fraud, LinkedIn .pdf.exe Malware, Tax Notices",
        severity: "CRITICAL",
        psychology: "Authority bias, fear of corporate disruption, professional obligations",
        incidence: "Over $2.7B lost to Business Email Compromise (BEC) and voice synthesis",
        color: "var(--cyber-cyan)"
      }
    ];

    const intelItems = [
      {
        tag: "VECTOR 01",
        title: "Smishing & Toll-Free VoIP Impersonation",
        risk: "HIGH",
        desc: "Attackers purchase virtual VoIP numbers or rent email-to-SMS gateways to broadcast banking alerts and package fee notices. They use lookalike domains (e.g. chase-security-verify.net) with TLS certificates to mimic legitimate portals.",
        telltale: "Toll-free 833/888 numbers claiming to be financial institutions; missing customer name; 15-minute panic deadlines.",
        defense: "Never tap links in SMS. Official fraud departments operate via verified 5-digit shortcodes and allow 'YES/NO' replies."
      },
      {
        tag: "VECTOR 02",
        title: "Micro-Fee Package Redelivery Trap",
        risk: "HIGH",
        desc: "Victims receive messages about a missed postal or courier package requiring a tiny fee ($1.85 - $2.50) to update delivery details. The low dollar amount disables the victim's critical skepticism.",
        telltale: "Domains ending in .top, .cc, or unverified hyphens; asking for full card details (CVV + Billing ZIP) for a trivial redelivery.",
        defense: "Enter tracking numbers directly into the official carrier website or app. Postal services never hold mail for minor card payments."
      },
      {
        tag: "VECTOR 03",
        title: "Remote Work & Advance-Fee Equipment Fraud",
        risk: "HIGH",
        desc: "Scammers pose as recruiters on professional networks offering high hourly wages ($70–$90/hr) without live interviews. They mail counterfeit cashier's checks ($4,000+) to purchase equipment from 'approved vendors'.",
        telltale: "Double extension malware (.pdf.exe); job offers without video or in-person interviews; asking for SSN via direct message.",
        defense: "Check sender domains against corporate registries. Never cash a check to purchase equipment from an unverified external supplier."
      },
      {
        tag: "VECTOR 04",
        title: "Reverse P2P & UPI PIN Authorization Traps",
        risk: "CRITICAL",
        desc: "Marketplace buyers offer to purchase items immediately via payment apps. They generate an outgoing payment collect request, misleading the seller into believing they must enter their PIN to 'receive' the funds.",
        telltale: "Any prompt claiming you must input your 4-digit or 6-digit PIN to receive money into your bank.",
        defense: "GOLDEN RULE: Entering a PIN or biometric always debits money. Receiving money never requires a PIN."
      },
      {
        tag: "VECTOR 05",
        title: "Browser Scareware & Remote Access Boiler Rooms",
        risk: "HIGH",
        desc: "Malicious pop-ups trigger fullscreen browser locks with looping sirens and fake Windows Defender warnings claiming your machine is infected with Trojan.Spyware.Banker.",
        telltale: "Phone numbers displayed in operating system error messages; JavaScript fullscreen lockouts.",
        defense: "Operating systems never provide phone numbers on virus warnings. Terminate the browser via Task Manager (Alt+F4)."
      },
      {
        tag: "VECTOR 06",
        title: "AI Voice Cloning & Executive Whaling (2026 Threat)",
        risk: "CRITICAL",
        desc: "Attackers sample 10–30 seconds of an executive's voice from podcasts, interviews, or earnings calls, training a voice synthesis model to order urgent Friday evening wire transfers.",
        telltale: "Strict confidentiality mandates preventing consultation with finance teams; robotic cadence; tight deadlines before weekend market close.",
        defense: "Implement mandatory out-of-band dual-control verification for all wire transfers exceeding company thresholds."
      }
    ];

    this.container.innerHTML = `
      <div class="judge-container">
        <div class="scanner-header">
          <div class="threat-badge threat-hard" style="align-self:center;">CYBER THREAT INTELLIGENCE</div>
          <h1 class="scanner-title">THREAT INTELLIGENCE & HEATMAP</h1>
          <p class="scanner-subtitle">
            Curated intelligence matrix on active social engineering vectors, demographic target heatmaps, and official incident response protocols.
          </p>
        </div>

        <!-- 1. Official Cyber Crime Help & Helpline Card (India & Global) -->
        <div class="cyber-panel" style="border:2px solid var(--cyber-emerald); background:rgba(16,185,129,0.06); margin-bottom:24px;">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:14px;">
            <div style="display:flex; align-items:center; gap:10px;">
              <span style="font-size:2rem;">🚨</span>
              <div>
                <h3 style="font-size:1.25rem; color:var(--cyber-emerald); margin:0;">NATIONAL CYBER CRIME HELPLINE & EMERGENCY PROTOCOL</h3>
                <span class="mono-text" style="font-size:0.75rem; color:var(--text-dim);">GOVERNMENT OF INDIA & CITIZEN FINANCIAL CYBER FRAUD REPORTING</span>
              </div>
            </div>
            <div style="display:flex; gap:10px;">
              <a href="tel:1930" class="cyber-btn btn-emerald" style="font-size:0.9rem; padding:8px 18px;">
                📞 DIAL 1930 HELPLINE
              </a>
              <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer" class="cyber-btn btn-outline" style="font-size:0.9rem; padding:8px 18px;">
                🌐 CYBERCRIME.GOV.IN ➔
              </a>
            </div>
          </div>

          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:16px; margin-top:14px; font-size:0.86rem;">
            <div style="background:var(--bg-surface); padding:14px; border-radius:6px; border-left:3px solid var(--cyber-emerald);">
              <strong style="color:var(--cyber-emerald);">THE "GOLDEN HOUR" PRINCIPLE:</strong>
              <p style="margin-top:4px; color:var(--text-muted); line-height:1.4;">
                Report financial cyber fraud within 1-2 hours via <strong>1930</strong>. This triggers the Citizen Financial Cyber Fraud Reporting System to freeze funds at the beneficiary bank node before cash withdrawal.
              </p>
            </div>
            <div style="background:var(--bg-surface); padding:14px; border-radius:6px; border-left:3px solid var(--cyber-amber);">
              <strong style="color:var(--cyber-amber);">EMERGENCY 4-STEP ACTION CHECKLIST:</strong>
              <ol style="margin-top:4px; padding-left:18px; color:var(--text-muted); line-height:1.4;">
                <li>Dial <strong>1930</strong> or file complaint at <strong>cybercrime.gov.in</strong></li>
                <li>Call bank hotline to freeze ATM card & Netbanking</li>
                <li>Preserve SMS alerts, transaction IDs & chat logs</li>
                <li>Disconnect device from WiFi/cellular network</li>
              </ol>
            </div>
          </div>
        </div>

        <!-- 2. Demographic Threat Heatmap -->
        <div class="cyber-panel" style="margin-bottom:24px;">
          <div class="section-heading-row" style="margin-bottom:12px;">
            <div>
              <span class="threat-badge threat-boss">VULNERABILITY MATRIX</span>
              <h2 style="font-size:1.5rem; margin-top:4px;">Demographic Scam Threat Heatmap</h2>
            </div>
          </div>
          <p style="color:var(--text-muted); font-size:0.9rem; margin-bottom:18px;">
            Threat actors tailor their psychological coercion based on the victim's demographic profile, lifecycle stage, and digital habits.
          </p>

          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:16px;">
            ${heatmap.map(h => `
              <div class="cyber-panel" style="background:var(--bg-surface-elevated); border-left:4px solid ${h.color};">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                  <h4 style="font-size:1.05rem; margin:0;">${h.audience}</h4>
                  <span class="threat-badge ${h.severity === 'CRITICAL' ? 'threat-boss' : 'threat-hard'}" style="font-size:0.68rem;">${h.severity}</span>
                </div>
                <div style="font-size:0.82rem; margin-bottom:8px;">
                  <strong style="color:var(--cyber-cyan);">Primary Threat Vectors:</strong>
                  <div style="color:var(--text-main); margin-top:2px;">${h.primaryVectors}</div>
                </div>
                <div style="font-size:0.82rem; margin-bottom:8px;">
                  <strong style="color:var(--text-dim);">Psychological Exploit:</strong>
                  <div style="color:var(--text-muted); margin-top:2px;">${h.psychology}</div>
                </div>
                <div style="font-size:0.75rem; font-family:var(--font-mono); color:${h.color}; margin-top:8px; border-top:1px solid var(--border-subtle); padding-top:6px;">
                  📊 ${h.incidence}
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 3. Curated Threat Vectors Encyclopedia -->
        <div style="margin-bottom:16px;">
          <h3 style="font-size:1.3rem; margin-bottom:14px;">TACTICAL THREAT VECTOR ENCYCLOPEDIA</h3>
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:20px;">
          ${intelItems.map(item => `
            <div class="cyber-panel">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                <span class="mono-text" style="font-size:0.75rem; color:var(--cyber-cyan); font-weight:700;">${item.tag}</span>
                <span class="threat-badge ${item.risk === 'CRITICAL' ? 'threat-boss' : 'threat-hard'}">${item.risk}</span>
              </div>
              <h3 style="font-size:1.15rem; margin-bottom:8px;">${item.title}</h3>
              <p style="font-size:0.88rem; color:var(--text-muted); line-height:1.6; margin-bottom:14px;">${item.desc}</p>

              <div style="background:rgba(255,51,102,0.08); border-left:3px solid var(--cyber-crimson); padding:10px 14px; border-radius:4px; margin-bottom:10px;">
                <div style="font-family:var(--font-mono); font-size:0.72rem; color:var(--cyber-crimson); font-weight:700;">TELLTALE RED FLAGS:</div>
                <div style="font-size:0.82rem; color:var(--text-main); margin-top:2px;">${item.telltale}</div>
              </div>

              <div style="background:rgba(16,185,129,0.08); border-left:3px solid var(--cyber-emerald); padding:10px 14px; border-radius:4px;">
                <div style="font-family:var(--font-mono); font-size:0.72rem; color:var(--cyber-emerald); font-weight:700;">RECOMMENDED COUNTERMEASURE:</div>
                <div style="font-size:0.82rem; color:var(--text-main); margin-top:2px;">${item.defense}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
}

window.IntelligenceView = IntelligenceView;
