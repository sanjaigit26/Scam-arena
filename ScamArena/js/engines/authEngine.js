// Centralized Authentication & Session Management for Scam Arena
// Hackathon Demo Storage: Persistent multi-user isolation via localStorage

class AuthEngine {
  constructor() {
    this.STORAGE_USERS_KEY = 'scamArenaUsers';
    this.STORAGE_SESSION_KEY = 'scamArenaSession';
    this.STORAGE_CURRENT_USER_KEY = 'scamArenaUser';
    this.listeners = [];

    this.DEMO_USER = {
      id: "user_demo_alex",
      name: "Alex Morgan",
      username: "alex",
      email: "demo@scamarena.app",
      password: "Password123!",
      avatar: "🛡️",
      isDemo: true,
      createdAt: 1709900000000,
      stats: {
        xp: 850,
        level: 4,
        score: 1420,
        streak: 4,
        bestStreak: 4,
        accuracy: 92,
        missionsCompleted: 4,
        threatsDetected: 6,
        threatsMissed: 1,
        falsePositives: 0,
        cluesDiscoveredTotal: 18,
        fastResponsesCount: 4,
        safeVerifiedCount: 2,
        phishingNeutralized: 4,
        maxCluesInOneMission: 4,
        investigationPoints: 240
      },
      badges: ["first_defense", "sharp_eyes", "fast_response", "phishing_hunter"],
      completedMissions: ["mission_01", "mission_02", "mission_03", "mission_04"]
    };

    this.DEFAULT_AGENT = {
      id: "user_agent_senior",
      name: "Cyber Agent",
      username: "agent",
      email: "agent@scamarena.com",
      password: "CyberDefender2025!",
      avatar: "🛡️",
      isDemo: false,
      createdAt: 1709900000000,
      stats: {
        xp: 850,
        level: 4,
        score: 1420,
        streak: 4,
        bestStreak: 4,
        accuracy: 92,
        missionsCompleted: 4,
        threatsDetected: 6,
        threatsMissed: 1,
        falsePositives: 0,
        cluesDiscoveredTotal: 18,
        fastResponsesCount: 4,
        safeVerifiedCount: 2,
        phishingNeutralized: 4,
        maxCluesInOneMission: 4,
        investigationPoints: 240
      },
      badges: ["first_defense", "sharp_eyes", "fast_response", "phishing_hunter"],
      completedMissions: ["mission_01", "mission_02", "mission_03", "mission_04"]
    };

    this.activeUser = null;
    this.init();
  }

  init() {
    // 1. Ensure Demo User and Agent exist in the local user registry
    const users = this.getUsers();
    if (!users[this.DEMO_USER.username.toLowerCase()]) {
      users[this.DEMO_USER.username.toLowerCase()] = { ...this.DEMO_USER };
      this.saveUsers(users);
    }
    if (!users[this.DEFAULT_AGENT.username.toLowerCase()]) {
      users[this.DEFAULT_AGENT.username.toLowerCase()] = { ...this.DEFAULT_AGENT };
      this.saveUsers(users);
    }

    // 2. Restore active session if present
    try {
      const sessionToken = localStorage.getItem(this.STORAGE_SESSION_KEY);
      const savedUserStr = localStorage.getItem(this.STORAGE_CURRENT_USER_KEY);
      if (sessionToken && savedUserStr) {
        const user = JSON.parse(savedUserStr);
        // Cross-reference with database to get freshest record
        const freshUser = users[user.username.toLowerCase()] || user;
        this.activeUser = freshUser;
      }
    } catch (e) {
      console.warn("Could not restore user session:", e);
      this.logout();
    }
  }

  getUsers() {
    try {
      const raw = localStorage.getItem(this.STORAGE_USERS_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      console.warn("Could not read users registry:", e);
      return {};
    }
  }

  saveUsers(users) {
    try {
      localStorage.setItem(this.STORAGE_USERS_KEY, JSON.stringify(users));
    } catch (e) {
      console.warn("Could not save users registry:", e);
    }
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(fn => {
      try { fn(this.activeUser); } catch (e) { console.error(e); }
    });
  }

  isAuthenticated() {
    return this.activeUser !== null;
  }

  currentUser() {
    return this.activeUser;
  }

  register({ name, username, email, password, avatar }) {
    const errors = {};

    // Validate fields
    const trimmedName = (name || '').trim();
    const trimmedUsername = (username || '').trim().toLowerCase();
    const trimmedEmail = (email || '').trim().toLowerCase();
    const chosenAvatar = avatar || '🛡️';

    if (!trimmedName) {
      errors.name = 'Full Name is required.';
    }

    if (!trimmedUsername) {
      errors.username = 'Username is required.';
    } else if (trimmedUsername.length < 3) {
      errors.username = 'Username must be at least 3 characters.';
    } else if (!/^[a-zA-Z0-9_-]+$/.test(trimmedUsername)) {
      errors.username = 'Username can only contain letters, numbers, hyphens, and underscores.';
    }

    if (!trimmedEmail) {
      errors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      errors.email = 'Please enter a valid email address.';
    }

    if (!password) {
      errors.password = 'Password is required.';
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters.';
    }

    if (Object.keys(errors).length > 0) {
      return { success: false, errors };
    }

    const users = this.getUsers();

    // Check unique username
    if (users[trimmedUsername]) {
      return { success: false, errors: { username: 'This username is already taken. Please choose another.' } };
    }

    // Check unique email
    const emailExists = Object.values(users).some(u => u.email && u.email.toLowerCase() === trimmedEmail);
    if (emailExists) {
      return { success: false, errors: { email: 'An account with this email address already exists.' } };
    }

    // Create user profile
    const newUser = {
      id: `user_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: trimmedName,
      username: trimmedUsername,
      email: trimmedEmail,
      password: password, // Demo/hackathon local storage only
      avatar: chosenAvatar,
      isDemo: false,
      createdAt: Date.now(),
      stats: {
        xp: 120, // Rookie starting XP
        level: 1,
        score: 0,
        streak: 0,
        bestStreak: 0,
        accuracy: 100,
        threatsDetected: 0,
        threatsMissed: 0,
        falsePositives: 0,
        cluesDiscoveredTotal: 0,
        fastResponsesCount: 0,
        safeVerifiedCount: 0,
        phishingNeutralized: 0,
        maxCluesInOneMission: 0,
        investigationPoints: 0
      },
      badges: [],
      completedMissions: []
    };

    users[trimmedUsername] = newUser;
    this.saveUsers(users);

    // Auto login
    this.setSession(newUser);
    return { success: true, user: newUser };
  }

  login(usernameOrEmail, password) {
    const identifier = (usernameOrEmail || '').trim().toLowerCase();
    if (!identifier) {
      return { success: false, error: 'Please enter your username or email.' };
    }
    if (!password) {
      return { success: false, error: 'Please enter your password.' };
    }

    const users = this.getUsers();
    let foundUser = users[identifier];

    if (!foundUser) {
      // Try searching by email
      foundUser = Object.values(users).find(u => u.email && u.email.toLowerCase() === identifier);
    }

    if (!foundUser) {
      return { success: false, error: 'No operator account found with this username or email.' };
    }

    if (foundUser.password !== password) {
      return { success: false, error: 'Incorrect password. Please verify and try again.' };
    }

    this.setSession(foundUser);
    return { success: true, user: foundUser };
  }

  loginAsDemo() {
    const users = this.getUsers();
    // Ensure demo user is present
    let demoUser = users[this.DEMO_USER.username.toLowerCase()];
    if (!demoUser) {
      demoUser = { ...this.DEMO_USER };
      users[demoUser.username.toLowerCase()] = demoUser;
      this.saveUsers(users);
    }

    this.setSession(demoUser);
    return { success: true, user: demoUser };
  }

  setSession(user) {
    this.activeUser = user;
    const sessionToken = `session_${user.id}_${Date.now()}`;
    try {
      localStorage.setItem(this.STORAGE_SESSION_KEY, sessionToken);
      localStorage.setItem(this.STORAGE_CURRENT_USER_KEY, JSON.stringify(user));
    } catch (e) {
      console.warn("Could not save session to localStorage:", e);
    }

    // Sync game state to load this user's profile
    if (window.appState && typeof window.appState.loadUserProgress === 'function') {
      window.appState.loadUserProgress(user);
    }

    this.notify();
  }

  logout() {
    // If an active user exists, sync state to registry before destroying session
    if (this.activeUser && window.appState) {
      this.updateUserStats(window.appState.get());
    }

    this.activeUser = null;
    try {
      localStorage.removeItem(this.STORAGE_SESSION_KEY);
      localStorage.removeItem(this.STORAGE_CURRENT_USER_KEY);
    } catch (e) {
      console.warn("Could not clear session:", e);
    }

    if (window.appState && typeof window.appState.clearUserProgress === 'function') {
      window.appState.clearUserProgress();
    }

    this.notify();
  }

  updateUser(updates) {
    if (!this.activeUser) return;
    this.activeUser = { ...this.activeUser, ...updates };

    const users = this.getUsers();
    users[this.activeUser.username.toLowerCase()] = this.activeUser;
    this.saveUsers(users);

    try {
      localStorage.setItem(this.STORAGE_CURRENT_USER_KEY, JSON.stringify(this.activeUser));
    } catch (e) {
      console.warn("Could not persist updated user:", e);
    }

    this.notify();
  }

  updateUserStats(gameState) {
    if (!this.activeUser) return;
    const users = this.getUsers();
    const uname = this.activeUser.username.toLowerCase();

    const updatedUser = {
      ...this.activeUser,
      stats: {
        xp: gameState.xp ?? this.activeUser.stats.xp,
        level: (window.xpEngine && typeof window.xpEngine.getLevelInfo === 'function') 
          ? window.xpEngine.getLevelInfo(gameState.xp).level 
          : (this.activeUser.stats.level || 1),
        score: gameState.score ?? this.activeUser.stats.score,
        streak: gameState.streak ?? this.activeUser.stats.streak,
        bestStreak: gameState.bestStreak ?? this.activeUser.stats.bestStreak,
        accuracy: (window.appState && typeof window.appState.getAccuracy === 'function') 
          ? window.appState.getAccuracy() 
          : 100,
        missionsCompleted: gameState.missionsCompleted ?? (gameState.completedMissionIds ? gameState.completedMissionIds.length : (this.activeUser.stats.missionsCompleted || 0)),
        threatsDetected: gameState.threatsDetected ?? this.activeUser.stats.threatsDetected,
        threatsMissed: gameState.threatsMissed ?? this.activeUser.stats.threatsMissed,
        falsePositives: gameState.falsePositives ?? this.activeUser.stats.falsePositives,
        cluesDiscoveredTotal: gameState.cluesDiscoveredTotal ?? this.activeUser.stats.cluesDiscoveredTotal,
        fastResponsesCount: gameState.fastResponsesCount ?? this.activeUser.stats.fastResponsesCount,
        safeVerifiedCount: gameState.safeVerifiedCount ?? this.activeUser.stats.safeVerifiedCount,
        phishingNeutralized: gameState.phishingNeutralized ?? this.activeUser.stats.phishingNeutralized,
        maxCluesInOneMission: gameState.maxCluesInOneMission ?? this.activeUser.stats.maxCluesInOneMission,
        investigationPoints: (gameState.cluesDiscoveredTotal || 0) * 15
      },
      badges: gameState.unlockedBadges || this.activeUser.badges || [],
      completedMissions: gameState.completedMissionIds || this.activeUser.completedMissions || []
    };

    this.activeUser = updatedUser;
    users[uname] = updatedUser;
    this.saveUsers(users);

    try {
      localStorage.setItem(this.STORAGE_CURRENT_USER_KEY, JSON.stringify(updatedUser));
    } catch (e) {
      console.warn("Could not update session cache:", e);
    }
  }
}

window.authEngine = new AuthEngine();
