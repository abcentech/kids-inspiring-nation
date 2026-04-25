// Keep prompts simple, values-driven, and easy to answer in under 60 seconds.
// If you add prompts, keep IDs stable so past check-ins remain interpretable.
// videoUrl MUST be a direct video link (e.g. https://youtu.be/VIDEO_ID), NOT a channel URL.

export const DAILY_PROMPTS = [
  {
    id: "integrity-1",
    title: "Integrity",
    question: "You found money on the ground in school. What should a Nation Builder do?",
    options: ["Keep it quietly", "Ask around and return it / submit to a teacher", "Spend it fast so no one knows"],
    correctIndex: 1,
    explain: "Nation Builders lead with integrity. Small honesty becomes big trust.",
    videoUrl: "https://www.youtube.com/watch?v=Xg6Vpur4glA&t=209s",
    videoTitle: "The #2 Law of Habits: Make Success Irresistible (Want It!)",
    requiredWatchSeconds: 90,
    startSeconds: 209,
  },
  {
    id: "service-1",
    title: "Service",
    question: "Your street is dirty. What is the best first move?",
    options: ["Complain online", "Start a small cleanup with 1–2 people and document it", "Wait for government"],
    correctIndex: 1,
    explain: "Builders start with what they have, where they are, and prove impact.",
    videoUrl: "https://www.youtube.com/watch?v=Xg6Vpur4glA&t=209s",
    videoTitle: "The #2 Law of Habits: Make Success Irresistible (Want It!)",
    requiredWatchSeconds: 90,
    startSeconds: 209,
  },
  {
    id: "discipline-1",
    title: "Discipline",
    question: "You missed your plan today. What should you do tonight?",
    options: ["Give up for the week", "Reset: plan tomorrow + one small action now", "Blame your schedule"],
    correctIndex: 1,
    explain: "Consistency is built by quick resets, not perfect days.",
    videoUrl: "https://www.youtube.com/watch?v=Xg6Vpur4glA&t=209s",
    videoTitle: "The #2 Law of Habits: Make Success Irresistible (Want It!)",
    requiredWatchSeconds: 90,
    startSeconds: 209,
  },
  {
    id: "courage-1",
    title: "Courage",
    question: "People laugh when you propose a good idea. What do you do?",
    options: ["Quit", "Explain clearly, then build a small prototype", "Argue and insult them"],
    correctIndex: 1,
    explain: "Courage looks like calm action. Build proof, not noise.",
    videoUrl: "https://www.youtube.com/watch?v=Xg6Vpur4glA&t=209s",
    videoTitle: "The #2 Law of Habits: Make Success Irresistible (Want It!)",
    requiredWatchSeconds: 90,
    startSeconds: 209,
  },
  {
    id: "excellence-1",
    title: "Excellence",
    question: "You can do a task quickly or well. What is the builder’s choice?",
    options: ["Fast only", "Well, then fast", "Never finish"],
    correctIndex: 1,
    explain: "Excellence becomes speed over time. Quality first, then scale.",
    videoUrl: "https://www.youtube.com/watch?v=Xg6Vpur4glA&t=209s",
    videoTitle: "The #2 Law of Habits: Make Success Irresistible (Want It!)",
    requiredWatchSeconds: 90,
    startSeconds: 209,
  },
  {
    id: "teamwork-1",
    title: "Teamwork",
    question: "Your team disagrees. What’s the best path?",
    options: ["Force your idea", "Agree on the goal, test options, choose by evidence", "Stop talking"],
    correctIndex: 1,
    explain: "Builders unify around purpose and decide with evidence.",
    videoUrl: "https://www.youtube.com/watch?v=Xg6Vpur4glA&t=209s",
    videoTitle: "The #2 Law of Habits: Make Success Irresistible (Want It!)",
    requiredWatchSeconds: 90,
    startSeconds: 209,
  },
];

export function promptForDateKey(dateKey) {
  // Simple deterministic hash
  let h = 0;
  for (let i = 0; i < dateKey.length; i++) h = (h * 31 + dateKey.charCodeAt(i)) >>> 0;
  return DAILY_PROMPTS[h % DAILY_PROMPTS.length];
}

export function normalisePrompt(p) {
  if (!p) return null;
  const options = Array.isArray(p.options)
    ? p.options
    : [p.optionA, p.optionB, p.optionC, p.optionD].filter(Boolean).map((s) => String(s).trim());

  const correctIndex = p.correctIndex !== undefined ? Number(p.correctIndex) : Number(p.correct_index);
  const requiredWatchSeconds = p.requiredWatchSeconds !== undefined
    ? Number(p.requiredWatchSeconds)
    : (p.required_watch_seconds !== undefined ? Number(p.required_watch_seconds) : null);
  const startSeconds = p.startSeconds !== undefined
    ? Number(p.startSeconds)
    : (p.start_seconds !== undefined ? Number(p.start_seconds) : null);

  return {
    id: String(p.id || "").trim() || null,
    title: String(p.title || "").trim() || "Today",
    question: String(p.question || "").trim() || "",
    options,
    correctIndex: Number.isFinite(correctIndex) ? correctIndex : 0,
    explain: String(p.explain || p.explanation || "").trim() || "",
    videoUrl: p.videoUrl ? String(p.videoUrl).trim() : (p.video_url ? String(p.video_url).trim() : null),
    videoTitle: p.videoTitle ? String(p.videoTitle).trim() : (p.video_title ? String(p.video_title).trim() : null),
    dateKey: p.dateKey ? String(p.dateKey).trim() : (p.date_key ? String(p.date_key).trim() : null),
    requiredWatchSeconds: Number.isFinite(requiredWatchSeconds) ? requiredWatchSeconds : null,
    startSeconds: Number.isFinite(startSeconds) ? startSeconds : null,
  };
}
