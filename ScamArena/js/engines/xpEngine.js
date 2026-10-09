// XP & Level Progression Engine for Scam Arena

class XpEngine {
  constructor() {
    this.LEVEL_TIERS = [
      { level: 1, title: "ROOKIE", minXp: 0, maxXp: 250, badge: "🛡️" },
      { level: 2, title: "SCOUT", minXp: 250, maxXp: 600, badge: "🔍" },
      { level: 3, title: "DETECTOR", minXp: 600, maxXp: 1100, badge: "⚡" },
      { level: 4, title: "ANALYST", minXp: 1100, maxXp: 1800, badge: "🧠" },
      { level: 5, title: "HUNTER", minXp: 1800, maxXp: 2700, badge: "🎯" },
      { level: 6, title: "SENTINEL", minXp: 2700, maxXp: 3800, badge: "💠" },
      { level: 7, title: "CYBER GUARDIAN", minXp: 3800, maxXp: 5500, badge: "👑" }
    ];
  }

  getLevelInfo(totalXp) {
    const xp = Math.max(0, totalXp);
    for (let i = this.LEVEL_TIERS.length - 1; i >= 0; i--) {
      const tier = this.LEVEL_TIERS[i];
      if (xp >= tier.minXp) {
        const span = tier.maxXp - tier.minXp;
        const currentInTier = xp - tier.minXp;
        const percent = tier.level === 7 ? 100 : Math.min(100, Math.floor((currentInTier / span) * 100));
        const needed = tier.level === 7 ? 0 : Math.max(0, tier.maxXp - xp);
        
        return {
          level: tier.level,
          title: tier.title,
          badge: tier.badge,
          currentXp: xp,
          tierMin: tier.minXp,
          tierMax: tier.maxXp,
          percent,
          neededForNext: needed
        };
      }
    }

    return this.LEVEL_TIERS[0];
  }

  didLevelUp(oldXp, newXp) {
    const oldTier = this.getLevelInfo(oldXp);
    const newTier = this.getLevelInfo(newXp);
    return newTier.level > oldTier.level ? newTier : null;
  }
}

window.xpEngine = new XpEngine();
