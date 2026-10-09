// Central Reactive State Store for Scam Arena

class StateManager {
  constructor() {
    this.STORAGE_KEY = 'scamarena_user_profile_v2';
    this.listeners = [];
    this.state = this.getInitialState();
    this.loadState();
  }

  getInitialState() {
    return {
      playerName: "Operator",
      theme: "dark",
      soundEnabled: true,
      xp: 120, // Starting Rookie XP
      score: 0,
      streak: 0,
      bestStreak: 0,
      missionsCompleted: 0,
      threatsDetected: 0,
      threatsMissed: 0,
      falsePositives: 0,
      cluesDiscoveredTotal: 0,
      fastResponsesCount: 0,
      safeVerifiedCount: 0,
      phishingNeutralized: 0,
      maxCluesInOneMission: 0,
      completedMissionIds: [],
      unlockedBadges: [],
      currentMissionIndex: 0,
      judgeChallenge: {
        active: false,
        scenarioIds: ["mission_01", "mission_03", "mission_08", "mission_10"],
        currentIndex: 0,
        results: [],
        startedAt: null
      }
    };
  }

  loadState() {
    try {
      if (window.authEngine && window.authEngine.isAuthenticated()) {
        const user = window.authEngine.currentUser();
        if (user) {
          this.loadUserProgress(user, false);
          return;
        }
      }

      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        this.state = { ...this.getInitialState(), ...parsed };
      }
    } catch (e) {
      console.warn("Could not load state from localStorage:", e);
    }
  }

  saveState() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.state));
      // Automatically synchronize with AuthEngine for per-user isolation
      if (window.authEngine && window.authEngine.isAuthenticated()) {
        window.authEngine.updateUserStats(this.state);
      }
    } catch (e) {
      console.warn("Could not save state to localStorage:", e);
    }
    this.notify();
  }

  loadUserProgress(user, triggerNotify = true) {
    if (!user) return;
    const stats = user.stats || {};
    this.state = {
      ...this.getInitialState(),
      playerName: user.name || "Operator",
      xp: stats.xp ?? 120,
      score: stats.score ?? 0,
      streak: stats.streak ?? 0,
      bestStreak: stats.bestStreak ?? 0,
      missionsCompleted: stats.missionsCompleted ?? (user.completedMissions ? user.completedMissions.length : 0),
      threatsDetected: stats.threatsDetected ?? 0,
      threatsMissed: stats.threatsMissed ?? 0,
      falsePositives: stats.falsePositives ?? 0,
      cluesDiscoveredTotal: stats.cluesDiscoveredTotal ?? 0,
      fastResponsesCount: stats.fastResponsesCount ?? 0,
      safeVerifiedCount: stats.safeVerifiedCount ?? 0,
      phishingNeutralized: stats.phishingNeutralized ?? 0,
      maxCluesInOneMission: stats.maxCluesInOneMission ?? 0,
      completedMissionIds: user.completedMissions ? [...user.completedMissions] : [],
      unlockedBadges: user.badges ? [...user.badges] : [],
      theme: this.state.theme || "dark",
      soundEnabled: this.state.soundEnabled !== false
    };

    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {}

    if (triggerNotify) {
      this.notify();
    }
  }

  clearUserProgress() {
    this.state = this.getInitialState();
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (e) {}
    this.notify();
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(fn => {
      try { fn(this.state); } catch(err) { console.error(err); }
    });
  }

  get() {
    return this.state;
  }

  getAccuracy() {
    const totalDecisions = this.state.threatsDetected + this.state.threatsMissed + this.state.falsePositives;
    if (totalDecisions === 0) return 100;
    return Math.round((this.state.threatsDetected / totalDecisions) * 100);
  }

  getSecurityRating() {
    const accuracy = this.getAccuracy();
    const missions = this.state.missionsCompleted;
    if (missions >= 6 && accuracy >= 85) return "CYBER GUARDIAN";
    if (missions >= 4 && accuracy >= 75) return "SECURITY SENTINEL";
    if (missions >= 2 && accuracy >= 60) return "SCAM SCOUT";
    return "RECRUIT IN TRAINING";
  }

  addClue(missionId) {
    this.state.cluesDiscoveredTotal += 1;
    this.saveState();
  }

  recordMissionOutcome(scenario, result, cluesCount, timeRemaining, totalTime) {
    const oldXp = this.state.xp;
    const correctAns = (scenario.correctAnswer || scenario.correctDecision || "SCAM").toUpperCase();
    const catStr = typeof scenario.category === 'object' 
      ? (scenario.category.en || '').toLowerCase() 
      : String(scenario.category || '').toLowerCase();

    if (result.isCorrect) {
      this.state.threatsDetected += correctAns === "SCAM" ? 1 : 0;
      if (correctAns === "SAFE") {
        this.state.safeVerifiedCount += 1;
      }
      this.state.streak += 1;
      if (this.state.streak > this.state.bestStreak) {
        this.state.bestStreak = this.state.streak;
      }
      if (catStr.includes("phish") || catStr.includes("smish")) {
        this.state.phishingNeutralized += 1;
      }
      if (totalTime > 0 && timeRemaining >= 10) {
        this.state.fastResponsesCount += 1;
      }
    } else {
      this.state.streak = 0; // Streak broken!
      if (result.isFalsePositive) {
        this.state.falsePositives += 1;
      } else {
        this.state.threatsMissed += 1;
      }
    }

    this.state.score = Math.max(0, this.state.score + (result.pointsDelta || 0));
    this.state.xp = Math.max(0, this.state.xp + (result.xpDelta !== undefined ? result.xpDelta : (result.isCorrect ? 100 : 0)));
    this.state.missionsCompleted += 1;
    this.state.cluesDiscoveredTotal += cluesCount;
    if (cluesCount > this.state.maxCluesInOneMission) {
      this.state.maxCluesInOneMission = cluesCount;
    }

    if (!this.state.completedMissionIds.includes(scenario.id)) {
      this.state.completedMissionIds.push(scenario.id);
    }

    // Check level up
    const levelUpData = window.xpEngine.didLevelUp(oldXp, this.state.xp);
    if (levelUpData) {
      window.soundFx.playLevelUp();
    }

    // Check badges
    const currentStats = {
      missionsCompleted: this.state.missionsCompleted,
      threatsDetected: this.state.threatsDetected,
      maxCluesInOneMission: this.state.maxCluesInOneMission,
      fastResponsesCount: this.state.fastResponsesCount,
      phishingNeutralized: this.state.phishingNeutralized,
      safeVerifiedCount: this.state.safeVerifiedCount,
      streak: this.state.streak,
      accuracy: this.getAccuracy(),
      level: window.xpEngine.getLevelInfo(this.state.xp).level
    };

    const badgeCheck = window.badgeEngine.checkNewBadges(currentStats, [...this.state.unlockedBadges]);
    if (badgeCheck.newlyUnlocked.length > 0) {
      this.state.unlockedBadges = badgeCheck.allUnlockedIds;
      badgeCheck.newlyUnlocked.forEach(b => {
        window.soundFx.playBadge();
      });
    }

    this.saveState();

    return {
      levelUp: levelUpData,
      newBadges: badgeCheck.newlyUnlocked
    };
  }

  setTheme(theme) {
    this.state.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    this.saveState();
  }

  toggleTheme() {
    const next = this.state.theme === 'dark' ? 'light' : 'dark';
    this.setTheme(next);
  }

  resetAll() {
    this.state = this.getInitialState();
    localStorage.removeItem(this.STORAGE_KEY);
    this.saveState();
  }

  loadPreset(presetName) {
    if (presetName === 'rookie') {
      this.resetAll();
    } else if (presetName === 'hunter') {
      this.state.xp = 2100;
      this.state.score = 1450;
      this.state.missionsCompleted = 5;
      this.state.threatsDetected = 5;
      this.state.threatsMissed = 0;
      this.state.streak = 5;
      this.state.bestStreak = 5;
      this.state.phishingNeutralized = 4;
      this.state.unlockedBadges = ["first_defense", "sharp_eyes", "fast_response", "phishing_hunter"];
      this.saveState();
    } else if (presetName === 'guardian') {
      this.state.xp = 4200;
      this.state.score = 3100;
      this.state.missionsCompleted = 9;
      this.state.threatsDetected = 9;
      this.state.threatsMissed = 0;
      this.state.streak = 9;
      this.state.bestStreak = 9;
      this.state.safeVerifiedCount = 1;
      this.state.phishingNeutralized = 5;
      this.state.unlockedBadges = ["first_defense", "sharp_eyes", "fast_response", "phishing_hunter", "sentinel_shield", "scam_hunter", "cyber_guardian"];
      this.saveState();
    }
  }
}

window.appState = new StateManager();
