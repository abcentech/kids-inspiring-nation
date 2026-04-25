const STORAGE_KEY = "kin_daily_v1";
const USER_KEY = "kin_user_id_v1";

export function getLagosDateKey(date = new Date()) {
  // Stable "day boundary" for Nigeria audience regardless of device timezone.
  // Format: YYYY-MM-DD
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Africa/Lagos",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const y = parts.find(p => p.type === "year")?.value;
  const m = parts.find(p => p.type === "month")?.value;
  const d = parts.find(p => p.type === "day")?.value;
  return `${y}-${m}-${d}`;
}

function safeParse(json, fallback) {
  try {
    return JSON.parse(json);
  } catch {
    return fallback;
  }
}

export function getOrCreateUserId() {
  const existing = localStorage.getItem(USER_KEY);
  if (existing) return existing;
  const id = `KIN-${Math.random().toString(16).slice(2)}${Date.now().toString(16)}`.toUpperCase();
  localStorage.setItem(USER_KEY, id);
  return id;
}

export function readDailyState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  const state = raw ? safeParse(raw, null) : null;
  if (!state || typeof state !== "object") {
    return {
      lastCheckinDateKey: null,
      streak: 0,
      bestStreak: 0,
      totalCheckins: 0,
      lastPromptId: null,
      lastChoice: null,
      watch: { dateKey: null, promptId: null, watchedSeconds: 0, unlocked: false },
    };
  }
  return {
    lastCheckinDateKey: state.lastCheckinDateKey ?? null,
    streak: Number(state.streak || 0),
    bestStreak: Number(state.bestStreak || 0),
    totalCheckins: Number(state.totalCheckins || 0),
    lastPromptId: state.lastPromptId ?? null,
    lastChoice: state.lastChoice ?? null,
    watch: {
      dateKey: state.watch?.dateKey ?? null,
      promptId: state.watch?.promptId ?? null,
      watchedSeconds: Number(state.watch?.watchedSeconds || 0),
      unlocked: Boolean(state.watch?.unlocked),
    },
  };
}

export function writeDailyState(next) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

export function computeNextStreak(prev, todayKey) {
  if (!prev?.lastCheckinDateKey) {
    return { streak: 1, bestStreak: Math.max(prev?.bestStreak || 0, 1), alreadyCheckedIn: false };
  }

  if (prev.lastCheckinDateKey === todayKey) {
    return { streak: prev.streak || 0, bestStreak: prev.bestStreak || 0, alreadyCheckedIn: true };
  }

  // Compare to "yesterday" in Lagos time.
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yKey = getLagosDateKey(yesterday);

  const nextStreak = prev.lastCheckinDateKey === yKey ? (prev.streak || 0) + 1 : 1;
  const nextBest = Math.max(prev.bestStreak || 0, nextStreak);
  return { streak: nextStreak, bestStreak: nextBest, alreadyCheckedIn: false };
}
