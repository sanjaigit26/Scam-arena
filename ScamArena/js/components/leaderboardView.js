// Leaderboard Component for Scam Arena

class LeaderboardView {
  constructor() {
    this.container = null;
  }

  mount(container) {
    this.container = container;
    this.render();
  }

  render() {
    if (!this.container) return;

    const state = window.appState.get();
    const lvlInfo = window.xpEngine.getLevelInfo(state.xp);
    const userAccuracy = window.appState.getAccuracy();

    // Simulated benchmark cyber defenders
    const benchmarkPlayers = [
      { name: "ZeroDaySlayer", level: "LVL 7 · CYBER GUARDIAN", score: 4850, accuracy: "98%", streak: 14, isUser: false },
      { name: "CryptoSentinel", level: "LVL 6 · SENTINEL", score: 3920, accuracy: "95%", streak: 11, isUser: false },
      { name: "PhishNet_AI", level: "LVL 6 · SENTINEL", score: 3410, accuracy: "92%", streak: 9, isUser: false },
      { name: "CyberHawk_22", level: "LVL 5 · HUNTER", score: 2680, accuracy: "89%", streak: 7, isUser: false },
      { name: "VanceInterceptor", level: "LVL 4 · ANALYST", score: 1840, accuracy: "86%", streak: 5, isUser: false },
      { name: "BlueTeamAlpha", level: "LVL 3 · DETECTOR", score: 1120, accuracy: "81%", streak: 3, isUser: false },
      { name: "SecScout_Dev", level: "LVL 2 · SCOUT", score: 540, accuracy: "75%", streak: 2, isUser: false }
    ];

    // Insert current player
    const userEntry = {
      name: `${state.playerName} (YOU)`,
      level: `LVL ${lvlInfo.level} · ${lvlInfo.title}`,
      score: state.score,
      accuracy: `${userAccuracy}%`,
      streak: state.streak,
      isUser: true
    };

    const allPlayers = [...benchmarkPlayers, userEntry].sort((a, b) => b.score - a.score);

    this.container.innerHTML = `
      <div class="judge-container">
        <div class="scanner-header">
          <div class="threat-badge threat-boss" style="align-self:center;">GLOBAL CYBER DEFENSE LEADERBOARD</div>
          <h1 class="scanner-title">HALL OF GUARDIANS</h1>
          <p class="scanner-subtitle">
            Live rankings of digital threat detectors across the Scam Arena Global Defense Network.
          </p>
        </div>

        <div class="cyber-panel" style="padding:0; overflow:hidden;">
          <div style="overflow-x:auto;">
            <table style="width:100%; border-collapse:collapse; text-align:left; font-size:0.9rem;">
              <thead>
                <tr style="background:var(--bg-surface-elevated); border-bottom:1px solid var(--border-subtle); color:var(--text-dim); font-family:var(--font-mono); font-size:0.75rem; text-transform:uppercase;">
                  <th style="padding:16px 20px;">Rank</th>
                  <th style="padding:16px 20px;">Operator</th>
                  <th style="padding:16px 20px;">Rank & Level</th>
                  <th style="padding:16px 20px;">Score</th>
                  <th style="padding:16px 20px;">Accuracy</th>
                  <th style="padding:16px 20px;">Streak</th>
                </tr>
              </thead>
              <tbody>
                ${allPlayers.map((p, idx) => {
                  const rank = idx + 1;
                  const rankBadge = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : `#${rank}`;
                  
                  return `
                    <tr style="border-bottom:1px solid var(--border-subtle); background:${p.isUser ? 'rgba(0, 229, 255, 0.08)' : 'transparent'}; border-left:${p.isUser ? '4px solid var(--cyber-cyan)' : '4px solid transparent'};">
                      <td style="padding:16px 20px; font-family:var(--font-mono); font-weight:800; font-size:1.05rem; color:${rank <= 3 ? 'var(--cyber-amber)' : 'var(--text-dim)'};">
                        ${rankBadge}
                      </td>
                      <td style="padding:16px 20px; font-weight:700; color:${p.isUser ? 'var(--cyber-cyan)' : 'var(--text-main)'};">
                        ${p.name}
                      </td>
                      <td style="padding:16px 20px; font-family:var(--font-mono); font-size:0.8rem; color:var(--text-muted);">
                        ${p.level}
                      </td>
                      <td style="padding:16px 20px; font-family:var(--font-mono); font-weight:800; color:var(--cyber-cyan);">
                        ${p.score} PTS
                      </td>
                      <td style="padding:16px 20px; font-family:var(--font-mono); font-weight:700; color:var(--cyber-emerald);">
                        ${p.accuracy}
                      </td>
                      <td style="padding:16px 20px; font-family:var(--font-mono); font-weight:700; color:${p.streak >= 4 ? 'var(--cyber-crimson)' : 'var(--text-main)'};">
                        ${p.streak > 0 ? `🔥 ${p.streak}` : '0'}
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }
}

window.LeaderboardView = LeaderboardView;
