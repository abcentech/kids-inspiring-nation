// Wall of Builders roster.
// The wall shows only builders who have actually taken the oath. There is no seeded list
// of names: a movement that teaches integrity cannot open its proof section with invented
// children. Until a shared backend exists, the only real entry a browser knows about is
// the visitor's own (saved when they generate a Builder ID); every other state is shown
// as an open seat. When a backend exists, merge its entries in getWall().

import { makeBuilderId } from "./nbcBrand.js";

const STORE = "nbc_wall_v1";
export const WALL_EVENT = "nbc:wall";

export function getMyBuilder() {
  try {
    const raw = localStorage.getItem("nbc_builder_v1");
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

// Persist the visitor's entry so they keep appearing on the wall, and tell the wall.
export function addBuilder(rec) {
  try {
    localStorage.setItem(STORE, JSON.stringify({ ...rec, you: true }));
  } catch { /* ignore */ }
  try { window.dispatchEvent(new Event(WALL_EVENT)); } catch { /* ignore */ }
}

// Real entries only: the visitor, if they have taken the oath in this browser.
export function getWall() {
  const mine = (() => { try { const r = localStorage.getItem(STORE); return r ? JSON.parse(r) : getMyBuilder(); } catch { return getMyBuilder(); } })();
  if (mine && mine.name) {
    return [{ name: mine.name, state: mine.state || "Nigeria", pillar: mine.pillar || "Service", id: mine.id || makeBuilderId(mine.name), you: true }];
  }
  return [];
}
