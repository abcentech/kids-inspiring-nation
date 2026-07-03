// Wall of Builders roster.
// A seeded set of builders gives the wall life from day one; the visitor's own
// entry (from generating a Builder ID) is stored locally and shown as "you".
// When a real backend exists, swap SEED for a fetch — the component reads from here.

import { makeBuilderId } from "./nbcBrand.js";

const STORE = "nbc_wall_v1";

// Representative names across regions. First-name only (these are minors).
const RAW = [
  ["Amara", "Anambra", "Service"], ["Ibrahim", "Kano", "Discipline"], ["Chidera", "Imo", "Excellence"],
  ["Fatima", "Sokoto", "Integrity"], ["Tunde", "Lagos", "Wisdom"], ["Zainab", "Kaduna", "Justice"],
  ["Emeka", "Enugu", "Perseverance"], ["Aisha", "Borno", "Humility"], ["Ope", "Ogun", "Service"],
  ["Nnamdi", "Abia", "Excellence"], ["Halima", "Bauchi", "Integrity"], ["Seyi", "Oyo", "Discipline"],
  ["Blessing", "Rivers", "Service"], ["Yusuf", "Katsina", "Wisdom"], ["Ada", "Ebonyi", "Justice"],
  ["Musa", "Niger", "Perseverance"], ["Ngozi", "Delta", "Humility"], ["Kunle", "Osun", "Excellence"],
  ["Rukayat", "Kwara", "Integrity"], ["Ifeanyi", "Enugu", "Discipline"], ["Maryam", "Gombe", "Service"],
  ["David", "Plateau", "Wisdom"], ["Chioma", "Anambra", "Justice"], ["Sadiq", "Jigawa", "Perseverance"],
  ["Temi", "Ekiti", "Humility"], ["Grace", "Benue", "Excellence"], ["Bashir", "Yobe", "Integrity"],
  ["Uche", "Imo", "Service"], ["Funke", "Lagos", "Discipline"], ["Aliyu", "Zamfara", "Wisdom"],
];

export const SEED = RAW.map(([name, state, pillar]) => ({
  name, state, pillar, id: makeBuilderId(name + state), you: false,
}));

export function getMyBuilder() {
  try {
    const raw = localStorage.getItem("nbc_builder_v1");
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

// Persist an extra local entry so the visitor keeps appearing on the wall.
export function addBuilder(rec) {
  try {
    localStorage.setItem(STORE, JSON.stringify({ ...rec, you: true }));
  } catch { /* ignore */ }
}

// The full wall: the visitor first (if present), then the seed.
export function getWall() {
  const mine = (() => { try { const r = localStorage.getItem(STORE); return r ? JSON.parse(r) : getMyBuilder(); } catch { return getMyBuilder(); } })();
  if (mine && mine.name) {
    return [{ name: mine.name, state: mine.state || "Nigeria", pillar: mine.pillar || "Service", id: mine.id || makeBuilderId(mine.name), you: true }, ...SEED];
  }
  return SEED;
}
