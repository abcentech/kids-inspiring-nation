/*
  GrowthWidgets — conversion & virality layer for KidsInspiring Nation
  ────────────────────────────────────────────────────────────────────
  Self-contained, additive components:
    • <GrowthWidgets/>      → mounts StickyJoinBar + ExitIntentCapture globally
    • <ShareRow/>           → one-tap share to WhatsApp / Telegram / FB / X / copy
    • <DailyStreakFeature/> → bold, prominent daily-streak section for the homepage

  Brand: T (theme) + SITE from siteConfig. No external services except an
  optional Brevo hosted-form URL (SITE.brevoFormUrl) for email capture.
*/
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { SITE, T } from "../siteConfig.js";
import { trackEvent } from "../analytics.js";
import { notifyHub } from "../formHub.js";
import {
  Flame, Send, MessageCircle, X, Share2, Copy, Check,
  Facebook, Sparkles, ArrowRight, CalendarCheck, Bell,
} from "lucide-react";

const WHATSAPP = SITE.socials.whatsappChannel;
const TELEGRAM = SITE.socials.telegram;

/* ── Next 8pm WAT (UTC+1) countdown ─────────────────────────────── */
function msToNextKind() {
  const now = new Date();
  // 20:00 WAT == 19:00 UTC
  const target = new Date(now);
  target.setUTCHours(19, 0, 0, 0);
  if (target.getTime() <= now.getTime()) target.setUTCDate(target.getUTCDate() + 1);
  return target.getTime() - now.getTime();
}
function fmt(ms) {
  const s = Math.max(0, Math.floor(ms / 1000));
  const h = String(Math.floor(s / 3600)).padStart(2, "0");
  const m = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
  const sec = String(s % 60).padStart(2, "0");
  return { h, m, sec, live: ms <= 0 || ms > 86_400_000 - 3_600_000 ? ms <= 60_000 : false };
}
function useKindCountdown() {
  const [ms, setMs] = useState(msToNextKind());
  useEffect(() => {
    const id = setInterval(() => setMs(msToNextKind()), 1000);
    return () => clearInterval(id);
  }, []);
  // "live" window: within 60 min after 8pm (i.e. countdown just rolled over to ~23h)
  const live = ms > 23 * 3600 * 1000;
  return { ...fmt(ms), live };
}

/* ── Sticky "Join tonight" bar (homepage, dismissible) ──────────── */
function StickyJoinBar({ dark }) {
  const { h, m, sec, live } = useKindCountdown();
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(
    () => typeof sessionStorage !== "undefined" && sessionStorage.getItem("kin_joinbar_dismissed") === "1"
  );

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHome = typeof window !== "undefined" && window.location.pathname === "/";
  if (!isHome || dismissed) return null;

  const close = () => {
    setDismissed(true);
    try { sessionStorage.setItem("kin_joinbar_dismissed", "1"); } catch { /* ignore */ }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
          role="region"
          aria-label="Join tonight's session"
          style={{
            position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 8400,
            background: "linear-gradient(100deg,#0B2A1B 0%,#14422B 60%,#0B2A1B 100%)",
            color: T.cream, borderTop: `2px solid ${T.gold}`,
            boxShadow: "0 -8px 30px rgba(0,0,0,.28)",
            padding: "10px clamp(12px,4vw,28px)",
          }}
        >
          <div style={{
            maxWidth: "74rem", margin: "0 auto", display: "flex", alignItems: "center",
            gap: "clamp(8px,2vw,18px)", flexWrap: "nowrap",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0, flex: "1 1 auto" }}>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 6, flexShrink: 0,
                background: live ? T.coral : "rgba(197,160,55,.16)", color: live ? "#fff" : T.goldL,
                fontWeight: 800, fontSize: ".7rem", letterSpacing: ".04em",
                padding: "4px 10px", borderRadius: 999, textTransform: "uppercase",
              }}>
                <Bell size={13} /> {live ? "Live now" : "Tonight 8pm WAT"}
              </span>
              <span className="kin-joinbar-text" style={{ fontWeight: 700, fontSize: "clamp(.82rem,2.4vw,.98rem)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {live
                  ? "KIND is live — join the daily devotion"
                  : <>Free daily devotion for children — starts in <b style={{ color: T.goldL, fontVariantNumeric: "tabular-nums" }}>{h}:{m}:{sec}</b></>}
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
                 onClick={() => trackEvent("joinbar_whatsapp")}
                 style={{ display: "inline-flex", alignItems: "center", gap: 7, background: T.gold, color: "#0B2A1B", fontWeight: 800, fontSize: ".88rem", padding: "9px 16px", borderRadius: 999, textDecoration: "none", whiteSpace: "nowrap" }}>
                <MessageCircle size={16} /> Join tonight
              </a>
              <a href={TELEGRAM} target="_blank" rel="noopener noreferrer" aria-label="Join on Telegram"
                 onClick={() => trackEvent("joinbar_telegram")}
                 className="kin-joinbar-tg"
                 style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,.12)", color: T.cream, fontWeight: 700, fontSize: ".85rem", padding: "9px 13px", borderRadius: 999, textDecoration: "none" }}>
                <Send size={15} />
              </a>
              <button onClick={close} aria-label="Dismiss" style={{ background: "transparent", border: "none", color: "rgba(255,255,255,.6)", cursor: "pointer", padding: 4, lineHeight: 0 }}>
                <X size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Brevo email submit (graceful no-op if not configured) ──────── */
export async function submitBrevo(email, formUrl) {
  const url = formUrl || SITE.brevoFormUrl;
  if (!url) return { ok: false, reason: "unconfigured" };
  try {
    const body = new URLSearchParams();
    body.append("EMAIL", email);
    await fetch(url, { method: "POST", mode: "no-cors", body });
    // no-cors → opaque response; assume accepted (Brevo double opt-in confirms by email)
    return { ok: true };
  } catch {
    return { ok: false, reason: "network" };
  }
}

/* ── Exit-intent + delayed email capture (once per visitor) ─────── */
function ExitIntentCapture({ dark }) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [state, setState] = useState("idle"); // idle | loading | done | error
  const firedRef = useRef(false);

  const alreadyDone = () => {
    try { return localStorage.getItem("kin_capture_done") === "1"; } catch { return false; }
  };
  const trigger = useCallback(() => {
    if (firedRef.current || alreadyDone()) return;
    firedRef.current = true;
    setOpen(true);
    trackEvent("capture_shown");
  }, []);

  useEffect(() => {
    if (alreadyDone()) return;
    const onLeave = (e) => { if (e.clientY <= 0) trigger(); };
    const timer = setTimeout(trigger, 35000);
    document.addEventListener("mouseout", onLeave);
    return () => { clearTimeout(timer); document.removeEventListener("mouseout", onLeave); };
  }, [trigger]);

  const close = () => {
    setOpen(false);
    try { localStorage.setItem("kin_capture_done", "1"); } catch { /* ignore */ }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { setState("error"); return; }
    setState("loading");
    const res = await submitBrevo(email);
    notifyHub("KIN-websignups", { Email: email });
    trackEvent("capture_submit", { configured: !!SITE.brevoFormUrl });
    try { localStorage.setItem("kin_capture_done", "1"); } catch { /* ignore */ }
    setState(res.ok || res.reason === "unconfigured" ? "done" : "error");
  };

  if (!open) return null;
  return (
    <div role="dialog" aria-modal="true" aria-label="Get tonight's session link"
      style={{ position: "fixed", inset: 0, zIndex: 9200, display: "grid", placeItems: "center", padding: 16, background: "rgba(5,12,8,.62)", backdropFilter: "blur(4px)" }}
      onClick={close}>
      <motion.div
        initial={{ scale: .92, opacity: 0, y: 14 }} animate={{ scale: 1, opacity: 1, y: 0 }}
        onClick={(e) => e.stopPropagation()}
        style={{ width: "min(440px,100%)", background: dark ? "#0D1A12" : "#fff", color: dark ? T.cream : T.greenD, borderRadius: 22, overflow: "hidden", boxShadow: "0 30px 80px rgba(0,0,0,.4)", border: `1px solid ${dark ? "rgba(197,160,55,.18)" : "rgba(11,42,27,.08)"}` }}>
        <div style={{ background: "linear-gradient(135deg,#0B2A1B,#14422B)", padding: "22px 24px", color: T.cream }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontWeight: 800, fontSize: ".72rem", letterSpacing: ".06em", textTransform: "uppercase", color: T.goldL }}>
              <Sparkles size={14} /> Free · Daily · Online
            </span>
            <button onClick={close} aria-label="Close" style={{ background: "transparent", border: "none", color: "rgba(255,255,255,.65)", cursor: "pointer", lineHeight: 0 }}><X size={20} /></button>
          </div>
          <h3 style={{ margin: ".6rem 0 .3rem", fontSize: "1.45rem", lineHeight: 1.15 }}>
            Don’t let your child miss tonight.
          </h3>
          <p style={{ margin: 0, color: "rgba(253,247,236,.8)", fontSize: ".92rem", lineHeight: 1.5 }}>
            Get the link to our free 8pm devotion and a weekly note for parents raising children of character.
          </p>
        </div>
        <div style={{ padding: "20px 24px 24px" }}>
          {state === "done" ? (
            <div style={{ textAlign: "center" }}>
              <div style={{ width: 52, height: 52, borderRadius: 999, background: "rgba(45,158,83,.14)", color: "#2D9E53", display: "grid", placeItems: "center", margin: "4px auto 12px" }}><Check size={26} /></div>
              <p style={{ fontWeight: 700, margin: "0 0 14px" }}>You’re in. Check your inbox to confirm.</p>
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" onClick={close}
                 style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#25D366", color: "#fff", fontWeight: 800, padding: "11px 20px", borderRadius: 999, textDecoration: "none" }}>
                <MessageCircle size={17} /> Join the WhatsApp channel
              </a>
            </div>
          ) : (
            <form onSubmit={onSubmit}>
              <input
                type="email" inputMode="email" required value={email}
                onChange={(e) => { setEmail(e.target.value); if (state === "error") setState("idle"); }}
                placeholder="you@email.com"
                aria-label="Email address"
                style={{ width: "100%", boxSizing: "border-box", padding: "13px 15px", borderRadius: 12, fontSize: "1rem",
                  border: `1.5px solid ${state === "error" ? T.coral : dark ? "rgba(255,255,255,.16)" : "rgba(11,42,27,.16)"}`,
                  background: dark ? "rgba(255,255,255,.04)" : "#fff", color: dark ? T.cream : T.greenD, outline: "none" }}
              />
              {state === "error" && <p style={{ color: T.coral, fontSize: ".8rem", margin: "7px 2px 0" }}>Please enter a valid email address.</p>}
              <button type="submit" disabled={state === "loading"}
                style={{ width: "100%", marginTop: 12, padding: "13px", borderRadius: 12, border: "none", cursor: "pointer",
                  background: T.gold, color: "#0B2A1B", fontWeight: 800, fontSize: "1rem", opacity: state === "loading" ? .7 : 1 }}>
                {state === "loading" ? "Sending…" : "Send me tonight’s link →"}
              </button>
              <button type="button" onClick={close} style={{ display: "block", margin: "10px auto 0", background: "transparent", border: "none", color: dark ? T.d3 : T.p3, fontSize: ".82rem", cursor: "pointer" }}>
                No thanks
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}

/* ── Public: global widgets ─────────────────────────────────────── */
export default function GrowthWidgets({ dark }) {
  return (
    <>
      <StickyJoinBar dark={dark} />
      <ExitIntentCapture dark={dark} />
    </>
  );
}

/* ── Public: share / referral row ───────────────────────────────── */
const SHARE_TEXT = "KidsInspiring Nation — a Nigerian movement raising children of character, purpose & skill. Free daily devotion at 8pm WAT 🌍";
export function ShareRow({ dark, url = SITE.siteUrl, text = SHARE_TEXT, compact = false }) {
  const [copied, setCopied] = useState(false);
  const enc = encodeURIComponent;
  const links = [
    { key: "wa", label: "WhatsApp", color: "#25D366", Icon: MessageCircle, href: `https://wa.me/?text=${enc(text + " " + url)}` },
    { key: "tg", label: "Telegram", color: "#0088CC", Icon: Send, href: `https://t.me/share/url?url=${enc(url)}&text=${enc(text)}` },
    { key: "fb", label: "Facebook", color: "#1877F2", Icon: Facebook, href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}` },
    { key: "x", label: "X", color: "#111", Icon: X, href: `https://twitter.com/intent/tweet?text=${enc(text)}&url=${enc(url)}` },
  ];
  const copy = async () => {
    try { await navigator.clipboard.writeText(url); setCopied(true); trackEvent("share_copy"); setTimeout(() => setCopied(false), 1800); } catch { /* ignore */ }
  };
  return (
    <div style={{ display: "flex", alignItems: "center", gap: compact ? 8 : 10, flexWrap: "wrap", justifyContent: "center" }}>
      {!compact && (
        <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontWeight: 800, color: dark ? T.cream : T.greenD, fontSize: ".95rem" }}>
          <Share2 size={17} /> Spread the movement
        </span>
      )}
      {links.map(({ key, label, color, Icon, href }) => (
        <a key={key} href={href} target="_blank" rel="noopener noreferrer" aria-label={`Share on ${label}`}
           onClick={() => trackEvent("share_click", { network: key })}
           style={{ width: 44, height: 44, borderRadius: 999, display: "grid", placeItems: "center", background: color, color: "#fff", textDecoration: "none", boxShadow: "0 4px 14px rgba(0,0,0,.14)" }}
           title={`Share on ${label}`}>
          <Icon size={19} strokeWidth={2.2} />
        </a>
      ))}
      <button onClick={copy} aria-label="Copy link"
        style={{ height: 44, padding: "0 16px", borderRadius: 999, display: "inline-flex", alignItems: "center", gap: 8, cursor: "pointer",
          background: dark ? "rgba(255,255,255,.07)" : "#fff", color: dark ? T.cream : T.greenD,
          border: `1.5px solid ${dark ? "rgba(255,255,255,.14)" : "rgba(11,42,27,.12)"}`, fontWeight: 700, fontSize: ".9rem" }}>
        {copied ? <><Check size={17} color="#2D9E53" /> Copied</> : <><Copy size={16} /> Copy link</>}
      </button>
    </div>
  );
}

/* ── Public: prominent Daily Streak feature section ─────────────── */
export function DailyStreakFeature({ dark }) {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  return (
    <section aria-label="Daily streak" style={{ padding: "clamp(2.5rem,6vw,4.5rem) clamp(1.25rem,5vw,3rem)" }}>
      <div style={{ maxWidth: "70rem", margin: "0 auto" }}>
        <div style={{
          position: "relative", overflow: "hidden", borderRadius: 28,
          background: "linear-gradient(135deg,#0B2A1B 0%,#10331F 48%,#14422B 100%)",
          color: T.cream, padding: "clamp(1.75rem,5vw,3rem)",
          boxShadow: "0 24px 60px rgba(11,42,27,.28)", border: `1px solid rgba(197,160,55,.22)`,
        }}>
          <div aria-hidden style={{ position: "absolute", top: -60, right: -40, width: 220, height: 220, borderRadius: "50%", background: "radial-gradient(circle,rgba(197,160,55,.22),transparent 70%)" }} />
          <div style={{ position: "relative", display: "grid", gridTemplateColumns: "1fr", gap: "1.5rem" }}>
            <div>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(197,160,55,.16)", color: T.goldL, fontWeight: 800, fontSize: ".72rem", letterSpacing: ".06em", textTransform: "uppercase", padding: "6px 13px", borderRadius: 999 }}>
                <Flame size={14} /> 60 seconds a day
              </span>
              <h2 style={{ fontSize: "clamp(1.7rem,4.6vw,2.6rem)", lineHeight: 1.1, margin: ".85rem 0 .6rem", fontWeight: 800 }}>
                Build a daily streak.<br />Watch character compound.
              </h2>
              <p style={{ color: "rgba(253,247,236,.82)", fontSize: "clamp(.98rem,2.4vw,1.1rem)", lineHeight: 1.6, maxWidth: "44ch", margin: 0 }}>
                One short prompt every day — integrity, service, discipline, excellence. Tiny actions, repeated, are how geniuses are formed. Start your streak in under a minute.
              </p>
            </div>

            {/* Streak visual */}
            <div style={{ display: "flex", alignItems: "center", gap: "clamp(8px,2.5vw,16px)", flexWrap: "wrap" }}>
              {days.map((d, i) => {
                const active = i < 5;
                return (
                  <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                    <div style={{
                      width: "clamp(40px,11vw,56px)", height: "clamp(40px,11vw,56px)", borderRadius: 16,
                      display: "grid", placeItems: "center",
                      background: active ? "linear-gradient(160deg,#C5A037,#E6C98F)" : "rgba(255,255,255,.06)",
                      color: active ? "#0B2A1B" : "rgba(253,247,236,.4)",
                      border: active ? "none" : "1px dashed rgba(253,247,236,.18)",
                      boxShadow: active ? "0 6px 18px rgba(197,160,55,.3)" : "none",
                    }}>
                      {active ? <Flame size={22} /> : <CalendarCheck size={20} />}
                    </div>
                    <span style={{ fontSize: ".72rem", fontWeight: 700, color: "rgba(253,247,236,.55)" }}>{d}</span>
                  </div>
                );
              })}
              <div style={{ marginLeft: "auto", textAlign: "right" }}>
                <div style={{ fontSize: "clamp(1.8rem,6vw,2.6rem)", fontWeight: 900, color: T.goldL, lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>5🔥</div>
                <div style={{ fontSize: ".74rem", fontWeight: 700, letterSpacing: ".04em", textTransform: "uppercase", color: "rgba(253,247,236,.5)" }}>day streak</div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link to="/daily" onClick={() => trackEvent("streak_cta")}
                style={{ display: "inline-flex", alignItems: "center", gap: 9, background: T.gold, color: "#0B2A1B", fontWeight: 800, fontSize: "1rem", padding: "13px 24px", borderRadius: 999, textDecoration: "none" }}>
                Start your streak <ArrowRight size={18} />
              </Link>
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "rgba(255,255,255,.1)", color: T.cream, fontWeight: 700, fontSize: "1rem", padding: "13px 22px", borderRadius: 999, textDecoration: "none", border: "1px solid rgba(253,247,236,.18)" }}>
                <Bell size={17} /> Get daily reminders
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
