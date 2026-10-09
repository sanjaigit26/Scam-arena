// Scoring and Streak Multiplier Engine for Scam Arena

class ScoringEngine {
  constructor() {
    this.BASE_POINTS = {
      correctDetection: 100,
      correctAction: 100,
      clueDiscovered: 10,
      falsePositive: -40,
      missedScam: -100,
      dangerousAction: -75
    };
  }

  getMultiplier(streak) {
    if (streak >= 6) return 2.0;
    if (streak >= 4) return 1.5;
    if (streak >= 2) return 1.2;
    return 1.0;
  }

  calculateMissionResult({
    userDecision,
    scenario,
    cluesDiscoveredCount = 0,
    timeRemaining = 0,
    totalTime = 0,
    currentStreak = 0
  }) {
    const isScam = scenario.correctDecision === "SCAM";
    const isSafe = scenario.correctDecision === "SAFE";
    const isUserScam = userDecision === "SCAM";
    const isUserSafe = userDecision === "SAFE";
    const isUserSuspicious = userDecision === "SUSPICIOUS";

    let isCorrect = false;
    let isDangerous = false;
    let isFalsePositive = false;
    let isMissedScam = false;
    let pointsDelta = 0;
    let xpDelta = 0;
    let message = "";

    // Evaluation logic
    if (isScam) {
      if (isUserScam) {
        isCorrect = true;
        message = "THREAT NEUTRALIZED! Perfect detection.";
      } else if (isUserSuspicious) {
        isCorrect = true;
        message = "SUSPICION CONFIRMED. Cautious defense.";
      } else {
        // User marked SAFE when it was a SCAM!
        isDangerous = true;
        isMissedScam = true;
        message = "CRITICAL BREACH! You trusted a high-risk scam.";
      }
    } else if (isSafe) {
      if (isUserSafe) {
        isCorrect = true;
        message = "SAFE COMMUNICATION VERIFIED. Avoided false alarm.";
      } else if (isUserSuspicious) {
        isCorrect = true;
        message = "CAUTIOUS AUDIT: Prudent verification.";
      } else {
        // User marked SCAM on safe email
        isFalsePositive = true;
        message = "FALSE POSITIVE: You blocked a legitimate service alert.";
      }
    }

    const multiplier = this.getMultiplier(currentStreak);

    if (isCorrect) {
      let base = this.BASE_POINTS.correctDetection + this.BASE_POINTS.correctAction;
      if (userDecision === "SUSPICIOUS" && isScam) {
        base = Math.round(base * 0.75); // slight deduction for hesitation
      }
      
      // Speed bonus if mission had timer and answered quickly
      let speedBonus = 0;
      if (totalTime > 0 && timeRemaining > 0) {
        const ratio = timeRemaining / totalTime;
        if (ratio > 0.5) speedBonus = Math.round(50 * ratio);
      }

      const investigationBonus = cluesDiscoveredCount * this.BASE_POINTS.clueDiscovered;
      pointsDelta = Math.round((base + speedBonus + investigationBonus) * multiplier);
      xpDelta = Math.round((120 + speedBonus + investigationBonus) * multiplier);
    } else {
      if (isDangerous) {
        pointsDelta = this.BASE_POINTS.missedScam + this.BASE_POINTS.dangerousAction; // -175
        xpDelta = 10; // pity XP for learning from failure
      } else if (isFalsePositive) {
        pointsDelta = this.BASE_POINTS.falsePositive; // -40
        xpDelta = 25;
      }
    }

    return {
      isCorrect,
      isDangerous,
      isFalsePositive,
      isMissedScam,
      pointsDelta,
      xpDelta,
      multiplier,
      cluesBonus: cluesDiscoveredCount * this.BASE_POINTS.clueDiscovered,
      speedBonus: isCorrect && totalTime > 0 ? Math.round(50 * (timeRemaining / totalTime)) : 0,
      message
    };
  }
}

window.scoringEngine = new ScoringEngine();
