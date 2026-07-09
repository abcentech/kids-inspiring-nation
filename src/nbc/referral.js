// ─── NBC Referral Engine ──────────────────────────────────────────────────────
//
// A no-backend, invitation-based growth loop. Every builder gets a shareable
// link carrying their own Builder ID as `?ref=`. When a friend arrives on that
// link we remember who invited them (first-touch, persisted), and stamp that
// ref onto anything they submit — registration, club request, funder inquiry —
// so the human on the other end can see who's bringing people in.
//
// Nothing here needs a server: attribution rides along in the form payload and
// in the operations inbox. When a real backend lands, read these same keys.

import { trackEvent } from "../analytics.js";

const REF_STORE = "nbc_ref_v1";        // who invited THIS visitor (first-touch)
const INVITED_STORE = "nbc_invited_v1"; // how many people I've credibly invited (best-effort local)
const YEAR = 2026;

// My own Builder ID, if I've generated one (used as my ref code).
export function myRefCode() {
  try {
    const raw = localStorage.getItem("nbc_builder_v1");
    if (!raw) return null;
    return JSON.parse(raw)?.id || null;
  } catch {
    return null;
  }
}

// Capture `?ref=` on arrival. First-touch wins; never overwrite, and never
// let someone "refer" themselves. Call once on app mount.
export function captureReferral() {
  try {
    const params = new URLSearchParams(window.location.search);
    const ref = (params.get("ref") || "").trim().toUpperCase();
    if (!ref) return null;
    const mine = myRefCode();
    if (mine && ref === mine.toUpperCase()) return null; // no self-referral
    const existing = localStorage.getItem(REF_STORE);
    if (existing) return JSON.parse(existing).ref; // first-touch is sticky
    const rec = { ref, at: Date.now(), landing: window.location.pathname };
    localStorage.setItem(REF_STORE, JSON.stringify(rec));
    trackEvent("nbc_referral_landed", { ref });
    return ref;
  } catch {
    return null;
  }
}

// Who invited me (ref code) or null.
export function referredBy() {
  try {
    const raw = localStorage.getItem(REF_STORE);
    return raw ? JSON.parse(raw).ref : null;
  } catch {
    return null;
  }
}

// Fields to fold into any form submission so ops can see attribution.
export function referralFields() {
  const ref = referredBy();
  return ref ? { referred_by: ref } : {};
}

// Build a shareable link that carries my ref code. Falls back to a plain link
// (no ref) until the visitor has a Builder ID.
export function myShareLink(path = "/NBC") {
  const base = "https://nbc.kidsinspiringnation.org";
  const url = path.startsWith("http") ? path : `${base}${path}`;
  const ref = myRefCode();
  if (!ref) return url;
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}ref=${encodeURIComponent(ref)}`;
}

// Local, best-effort tally of how many invites I've sent (for milestone UI).
// This is a motivational counter, not an audited number.
export function bumpInviteCount() {
  try {
    const n = Number(localStorage.getItem(INVITED_STORE) || 0) + 1;
    localStorage.setItem(INVITED_STORE, String(n));
    return n;
  } catch {
    return 0;
  }
}

export function inviteCount() {
  try {
    return Number(localStorage.getItem(INVITED_STORE) || 0);
  } catch {
    return 0;
  }
}
