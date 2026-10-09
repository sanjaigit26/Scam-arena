// SCAMMER CHAT DUEL ENGINE
// Dialogue runner, Trust Shield (100%), Scammer Pressure (0-100%), and Tactic Exposure Engine

class DuelEngine {
  constructor() {
    this.scripts = window.DUEL_SCRIPTS || [];
    this.currentScenario = null;
    this.currentStep = null;
    this.trustShield = 100;
    this.scammerPressure = 20;
    this.chatHistory = [];
    this.tacticsExposed = [];
    this.mistakesCount = 0;
    this.startTime = null;
    this.endTime = null;
    this.status = 'IDLE'; // IDLE | TYPING | ACTIVE | WON | LOST
    this.listeners = [];
    this.aiMode = false; // Optional LLM toggle, disabled by default
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(fn => {
      try { fn(this.getState()); } catch (e) { console.error(e); }
    });
  }

  getState() {
    return {
      scenario: this.currentScenario,
      step: this.currentStep,
      trustShield: this.trustShield,
      scammerPressure: this.scammerPressure,
      chatHistory: this.chatHistory,
      tacticsExposed: this.tacticsExposed,
      mistakesCount: this.mistakesCount,
      status: this.status,
      durationSeconds: this.startTime ? Math.round(((this.endTime || Date.now()) - this.startTime) / 1000) : 0,
      aiMode: this.aiMode
    };
  }

  setAiMode(enabled) {
    this.aiMode = !!enabled;
    this.notify();
  }

  startDuel(scenarioId = "duel_bank") {
    const sc = (window.DUEL_SCRIPTS || []).find(s => s.id === scenarioId) || (window.DUEL_SCRIPTS || [])[0];
    if (!sc) return;

    this.currentScenario = sc;
    this.currentStep = sc.steps[0];
    this.trustShield = 100;
    this.scammerPressure = sc.initialPressure || 25;
    this.chatHistory = [];
    this.tacticsExposed = [];
    this.mistakesCount = 0;
    this.startTime = Date.now();
    this.endTime = null;
    this.status = 'TYPING';

    this.notify();

    // Initial scammer message with typing delay
    setTimeout(() => {
      const lang = window.i18n ? window.i18n.getLanguage() : 'en';
      const text = this.currentStep.scammerText[lang] || this.currentStep.scammerText.en;
      this.chatHistory.push({
        sender: 'scammer',
        name: sc.scammerName[lang] || sc.scammerName.en,
        avatar: sc.avatar,
        text: text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        tacticTag: this.currentStep.tacticI18n ? (this.currentStep.tacticI18n[lang] || this.currentStep.tacticI18n.en) : this.currentStep.tactic
      });
      this.status = 'ACTIVE';
      window.soundFx.playScan();
      this.notify();
    }, 700);
  }

  chooseReply(replyIndex) {
    if (this.status !== 'ACTIVE' || !this.currentStep || !this.currentStep.replies) return;
    const reply = this.currentStep.replies[replyIndex];
    if (!reply) return;

    this.processReply(reply);
  }

  processCustomText(text) {
    if (this.status !== 'ACTIVE' || !text.trim() || !this.currentStep) return;

    const lower = text.toLowerCase();
    // Keyword matching for safe vs risky words
    const safeKeywords = ['official', 'card', 'bank', 'branch', 'police', 'report', '1930', 'refuse', 'never', 'adult', 'parent', 'fake', 'scam', 'no', 'nahi', 'illai', 'mat'];
    const riskyKeywords = ['otp', 'password', 'pin', 'yes', 'sent', 'send', 'agree', 'paise', 'bheja', 'anupuren'];

    let isSafe = safeKeywords.some(k => lower.includes(k));
    let isRisky = riskyKeywords.some(k => lower.includes(k));

    if (isSafe && !isRisky) {
      // Find a good reply from current step or craft one
      const goodReply = this.currentStep.replies.find(r => r.type === 'good') || this.currentStep.replies[0];
      this.processReply({
        ...goodReply,
        text: { en: text, ta: text, hi: text }
      });
    } else if (isRisky) {
      const badReply = this.currentStep.replies.find(r => r.type === 'bad') || this.currentStep.replies[0];
      this.processReply({
        ...badReply,
        text: { en: text, ta: text, hi: text }
      });
    } else {
      // Default to first available reply
      const defaultReply = this.currentStep.replies[0];
      this.processReply({
        ...defaultReply,
        text: { en: text, ta: text, hi: text }
      });
    }
  }

  processReply(reply) {
    const lang = window.i18n ? window.i18n.getLanguage() : 'en';
    const playerText = reply.text[lang] || reply.text.en;

    // Add player reply to chat
    this.chatHistory.push({
      sender: 'player',
      text: playerText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    // Apply shield and pressure deltas
    this.trustShield = Math.max(0, Math.min(100, this.trustShield + (reply.shieldDelta || 0)));
    this.scammerPressure = Math.max(0, Math.min(100, this.scammerPressure + (reply.pressureDelta || 0)));

    if (reply.tacticExposed && !this.tacticsExposed.includes(reply.tacticExposed)) {
      this.tacticsExposed.push(reply.tacticExposed);
      window.soundFx.playClue();
    }

    if (reply.type === 'bad') {
      this.mistakesCount += 1;
      window.soundFx.playDanger();
    } else if (reply.type === 'good') {
      window.soundFx.playCorrect();
    }

    // Add feedback banner in chat
    if (reply.feedback) {
      this.chatHistory.push({
        sender: 'system',
        type: reply.type,
        text: reply.feedback[lang] || reply.feedback.en,
        tacticTag: reply.tacticExposed
      });
    }

    // Check win/lose conditions
    if (this.trustShield <= 0) {
      this.triggerOutcome('LOSE');
      return;
    }

    // Advance to next step
    const nextStepId = reply.nextStep;
    const nextStep = this.currentScenario.steps.find(s => s.id === nextStepId);

    if (!nextStep || nextStep.isTerminal) {
      const outcome = (nextStep && nextStep.outcome) || (this.scammerPressure <= 20 || reply.type === 'good' ? 'WIN' : 'LOSE');
      this.triggerOutcome(outcome, nextStep);
    } else {
      this.currentStep = nextStep;
      this.status = 'TYPING';
      this.notify();

      setTimeout(() => {
        const scammerMsg = nextStep.scammerText[lang] || nextStep.scammerText.en;
        this.chatHistory.push({
          sender: 'scammer',
          name: this.currentScenario.scammerName[lang] || this.currentScenario.scammerName.en,
          avatar: this.currentScenario.avatar,
          text: scammerMsg,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          tacticTag: nextStep.tacticI18n ? (nextStep.tacticI18n[lang] || nextStep.tacticI18n.en) : nextStep.tactic
        });
        this.status = 'ACTIVE';
        window.soundFx.playScan();
        this.notify();
      }, 900);
    }
  }

  triggerOutcome(outcome, terminalStep = null) {
    this.endTime = Date.now();
    this.status = outcome === 'WIN' ? 'WON' : 'LOST';

    const lang = window.i18n ? window.i18n.getLanguage() : 'en';

    if (terminalStep) {
      this.chatHistory.push({
        sender: 'scammer',
        name: this.currentScenario.scammerName[lang] || this.currentScenario.scammerName.en,
        avatar: this.currentScenario.avatar,
        text: terminalStep.scammerText[lang] || terminalStep.scammerText.en,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isTerminal: true
      });
    }

    if (outcome === 'WIN') {
      window.soundFx.playLevelUp();
      const earnedXp = 150 + (this.tacticsExposed.length * 25);
      const earnedScore = 200 + this.trustShield;

      if (window.appState) {
        const s = window.appState.get();
        s.xp += earnedXp;
        s.score += earnedScore;
        s.streak += 1;
        if (s.streak > s.bestStreak) s.bestStreak = s.streak;
        s.threatsDetected += 1;

        // Check new duel badges
        if (this.trustShield === 100 && !s.unlockedBadges.includes('unbreakable_shield')) {
          s.unlockedBadges.push('unbreakable_shield');
          window.soundFx.playBadge();
        }
        if (this.tacticsExposed.length >= 3 && !s.unlockedBadges.includes('smooth_talker')) {
          s.unlockedBadges.push('smooth_talker');
          window.soundFx.playBadge();
        }
        window.appState.saveState();
      }
    } else {
      window.soundFx.playDanger();
      if (window.appState) {
        const s = window.appState.get();
        s.streak = 0;
        s.threatsMissed += 1;
        s.xp += 20; // Pity XP
        window.appState.saveState();
      }
    }

    this.notify();
  }
}

window.duelEngine = new DuelEngine();
