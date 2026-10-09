// Badge & Achievement Engine for Scam Arena

class BadgeEngine {
  constructor() {
    this.BADGES = [
      {
        id: "first_defense",
        title: "FIRST DEFENSE",
        description: "Successfully neutralized your first scam mission.",
        icon: "🛡️",
        rarity: "COMMON"
      },
      {
        id: "sharp_eyes",
        title: "SHARP EYES",
        description: "Discovered all 4 investigation clues in a single mission.",
        icon: "👁️",
        rarity: "UNCOMMON"
      },
      {
        id: "fast_response",
        title: "FAST RESPONSE",
        description: "Neutralized a high-urgency threat with more than 10 seconds remaining.",
        icon: "⚡",
        rarity: "RARE"
      },
      {
        id: "phishing_hunter",
        title: "PHISHING HUNTER",
        description: "Neutralized 5 phishing or smishing attacks.",
        icon: "🎣",
        rarity: "RARE"
      },
      {
        id: "sentinel_shield",
        title: "SENTINEL SHIELD",
        description: "Correctly validated a legitimate alert without triggering a false alarm.",
        icon: "💠",
        rarity: "EPIC"
      },
      {
        id: "scam_hunter",
        title: "SCAM HUNTER",
        description: "Maintained a streak of 4 or higher with over 80% accuracy.",
        icon: "🎯",
        rarity: "EPIC"
      },
      {
        id: "cyber_guardian",
        title: "CYBER GUARDIAN",
        description: "Mastered all Arena missions and reached Sentinel or Cyber Guardian status.",
        icon: "👑",
        rarity: "LEGENDARY"
      }
    ];
  }

  getAllBadges() {
    return this.BADGES;
  }

  checkNewBadges(stats, unlockedIds = []) {
    const newlyUnlocked = [];

    const unlock = (id) => {
      if (!unlockedIds.includes(id)) {
        const badge = this.BADGES.find(b => b.id === id);
        if (badge) {
          newlyUnlocked.push(badge);
          unlockedIds.push(id);
        }
      }
    };

    // 1. First Defense
    if (stats.missionsCompleted >= 1 && stats.threatsDetected >= 1) {
      unlock("first_defense");
    }

    // 2. Sharp Eyes
    if (stats.maxCluesInOneMission >= 4) {
      unlock("sharp_eyes");
    }

    // 3. Fast Response
    if (stats.fastResponsesCount >= 1) {
      unlock("fast_response");
    }

    // 4. Phishing Hunter
    if (stats.phishingNeutralized >= 4) {
      unlock("phishing_hunter");
    }

    // 5. Sentinel Shield (Safe verified)
    if (stats.safeVerifiedCount >= 1) {
      unlock("sentinel_shield");
    }

    // 6. Scam Hunter
    if (stats.streak >= 4 && stats.accuracy >= 80) {
      unlock("scam_hunter");
    }

    // 7. Cyber Guardian
    if (stats.level >= 6 || (stats.missionsCompleted >= 8 && stats.accuracy >= 80)) {
      unlock("cyber_guardian");
    }

    return {
      newlyUnlocked,
      allUnlockedIds: unlockedIds
    };
  }
}

window.badgeEngine = new BadgeEngine();
