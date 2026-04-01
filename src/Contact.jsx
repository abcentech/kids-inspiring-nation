/*
  KidsInspiring Nation — Contact Page
  Google Sheets form integration + Social links

  ──────────────────────────────────────────────────────
  GOOGLE SHEETS SETUP — DO THIS ONCE:
  1. Create a new Google Spreadsheet
  2. Go to Extensions > Apps Script
  3. Delete all default code and paste the script below
  4. Click "Deploy" > "New deployment" > Type: "Web app"
     - Execute as: Me
     - Who has access: Anyone
  5. Click Deploy, copy the Web App URL
  6. Paste it as the value of GOOGLE_SCRIPT_URL below

  APPS SCRIPT CODE (paste into Apps Script editor):
  ─────────────────────────────────────────────────────
  function doPost(e) {
    var lock = LockService.getPublicLock();
    lock.tryLock(10000);
    try {
      var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
      var data = JSON.parse(e.postData.contents);
      sheet.appendRow([
        new Date(),
        data.name  || '',
        data.email || '',
        data.phone || '',
        data.subject || '',
        data.message || '',
        data.type || ''
      ]);
      lock.releaseLock();
      return ContentService
        .createTextOutput(JSON.stringify({ result: 'success' }))
        .setMimeType(ContentService.MimeType.JSON);
    } catch(err) {
      lock.releaseLock();
      return ContentService
        .createTextOutput(JSON.stringify({ result: 'error', error: err.toString() }))
        .setMimeType(ContentService.MimeType.JSON);
    }
  }
  function doGet(e) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  ──────────────────────────────────────────────────────
*/

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MessageCircle, Send, ExternalLink, Youtube, Instagram, CheckCircle2, AlertCircle, Loader } from "lucide-react";

// ─── GOOGLE SCRIPT URL — Replace with your deployed Apps Script URL ──────────
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/YOUR_SCRIPT_ID_HERE/exec";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const T = {
  green: "#16613E", greenD: "#0D3D26", greenM: "#2C4A35",
  gold: "#C4882C", goldL: "#E8B954", goldD: "#9A6620",
  coral: "#D94F30", cream: "#FDF7EC", warmBg: "#F5EFE3",
  p1: "#1D1D1F", p2: "#6E6E73", p3: "#AEAEB2",
  ok: "#34C759", err: "#FF3B30",
};

const SUBJECTS = [
  { value: "join", label: "Join a Programme", icon: "👑" },
  { value: "child", label: "Register a Child", icon: "🌱" },
  { value: "donate", label: "Give / Donate", icon: "💛" },
  { value: "partner", label: "Partner / Collaborate", icon: "🤝" },
  { value: "volunteer", label: "Volunteer (CST)", icon: "🕊️" },
  { value: "media", label: "Media / Press", icon: "🎥" },
  { value: "general", label: "General Enquiry", icon: "💬" },
];

const SOCIALS = [
  { label: "WhatsApp Channel", href: "https://whatsapp.com/channel/0029Va8XnCuGE56c4SMaT41w", icon: MessageCircle, color: "#25D366", bg: "rgba(37,211,102,.1)" },
  { label: "Telegram", href: "https://t.me/KidsInspiring", icon: Send, color: "#0088CC", bg: "rgba(0,136,204,.1)" },
  { label: "YouTube", href: "https://youtube.com/@KidsInspiringNation", icon: Youtube, color: "#FF0000", bg: "rgba(255,0,0,.08)" },
  { label: "Instagram", href: "https://instagram.com/KidsInspiringNation", icon: Instagram, color: "#E4405F", bg: "rgba(228,64,95,.1)" },
  { label: "Linktree", href: "https://linktr.ee/KidsInspiringNation", icon: ExternalLink, color: T.gold, bg: "rgba(196,136,44,.1)" },
];

// ─── MAIN CONTACT PAGE ────────────────────────────────────────────────────────
export default function Contact({ dark }) {
  const bg     = dark ? "#0A1C12" : "#FAFAF5";
  const card   = dark ? "#0E1A12" : "#fff";
  const txt    = dark ? T.cream   : T.greenD;
  const sub    = dark ? "rgba(253,247,236,.6)" : T.p2;
  const brd    = dark ? "rgba(255,255,255,.08)" : "rgba(22,97,62,.1)";
  const inp    = dark ? "#112D1C" : "#F5EFE3";

  const [form, setForm]         = useState({ name: "", email: "", phone: "", subject: "general", message: "" });
  const [status, setStatus]     = useState("idle"); // idle | submitting | success | error
  const [touched, setTouched]   = useState({});

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const touch = k => setTouched(t => ({ ...t, [k]: true }));

  const valid = {
    name:    form.name.trim().length >= 2,
    email:   /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email),
    message: form.message.trim().length >= 10,
  };
  const canSubmit = valid.name && valid.email && valid.message && status !== "submitting";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) { setTouched({ name: true, email: true, message: true }); return; }
    setStatus("submitting");
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, type: "contact_form", timestamp: new Date().toISOString() }),
      });
      setStatus("success");
      setForm({ name: "", email: "", phone: "", subject: "general", message: "" });
      setTouched({});
    } catch {
      setStatus("error");
    }
  };

  const fieldStyle = (key) => ({
    width: "100%",
    padding: ".75rem 1rem",
    borderRadius: 12,
    background: inp,
    border: `1.5px solid ${touched[key] && !valid[key] ? T.err : touched[key] && valid[key] ? T.ok : brd}`,
    color: txt,
    fontSize: ".95rem",
    fontFamily: "'DM Sans',sans-serif",
    outline: "none",
    transition: "border .2s",
    boxSizing: "border-box",
  });

  return (
    <div style={{ fontFamily: "'DM Sans',sans-serif", background: bg, color: txt, overflowX: "hidden" }}>

      {/* ─── HERO ─── */}
      <section style={{ background: T.greenD, padding: "clamp(5rem,12vw,9rem) 0 clamp(3rem,7vw,5rem)", position: "relative", overflow: "hidden" }}>
        <div aria-hidden style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 75% 65% at 20% 55%, ${T.green}45, transparent 55%), radial-gradient(ellipse 50% 60% at 80% 20%, ${T.gold}18, transparent 52%)` }} />
        <div style={{ maxWidth: "74rem", margin: "0 auto", padding: "0 clamp(1.25rem,5vw,3rem)", position: "relative", zIndex: 2 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65 }}>
            <div style={{ fontSize: ".76rem", fontWeight: 500, letterSpacing: ".12em", textTransform: "uppercase", color: T.goldL, marginBottom: "1rem", display: "flex", alignItems: "center", gap: ".75rem" }}>
              <span style={{ width: "2rem", height: "1.5px", background: T.gold, display: "block" }} />
              Get In Touch
            </div>
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(3rem,8vw,5.5rem)", fontWeight: 900, color: T.cream, letterSpacing: "-0.035em", lineHeight: .95, marginBottom: "1.25rem" }}>
              Let's Build<br />
              <em style={{ fontStyle: "italic", color: T.goldL }}>Together</em>
            </h1>
            <p style={{ fontSize: "clamp(1rem,2.2vw,1.1rem)", color: "rgba(253,247,236,.7)", lineHeight: 1.72, maxWidth: "46ch" }}>
              Whether you want to join a programme, register a child, partner with us, or simply say hello — we'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── MAIN CONTENT ─── */}
      <section style={{ padding: "clamp(4rem,10vw,7rem) 0" }}>
        <div style={{ maxWidth: "74rem", margin: "0 auto", padding: "0 clamp(1.25rem,5vw,3rem)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 28rem), 1fr))", gap: "clamp(2rem,6vw,4rem)", alignItems: "start" }}>

            {/* ── CONTACT FORM ── */}
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65 }}>
              <div style={{ background: card, borderRadius: 24, padding: "clamp(1.75rem,5vw,2.5rem)", border: `1px solid ${brd}`, boxShadow: dark ? "0 2px 12px rgba(0,0,0,.4)" : "0 8px 40px rgba(10,28,18,.08)" }}>
                <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.75rem", fontWeight: 900, color: dark ? T.cream : T.greenD, letterSpacing: "-0.02em", marginBottom: ".4rem" }}>
                  Send a Message
                </h2>
                <p style={{ fontSize: ".88rem", color: sub, marginBottom: "2rem" }}>
                  We'll respond within 24 hours via email.
                </p>

                <AnimatePresence mode="wait">
                  {status === "success" ? (
                    <motion.div key="success" initial={{ opacity: 0, scale: .95 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: "center", padding: "2.5rem 1rem" }}>
                      <CheckCircle2 size={52} color={T.ok} strokeWidth={1.5} style={{ margin: "0 auto 1rem" }} />
                      <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.4rem", fontWeight: 700, color: dark ? T.cream : T.greenD, marginBottom: ".5rem" }}>Message Received!</div>
                      <p style={{ fontSize: ".9rem", color: sub, lineHeight: 1.65, marginBottom: "1.5rem" }}>
                        Thank you for reaching out to KidsInspiring Nation. We'll get back to you within 24 hours.
                      </p>
                      <button onClick={() => setStatus("idle")} style={{ padding: ".7em 2em", borderRadius: 999, background: T.green, color: "#fff", fontWeight: 600, fontSize: ".85rem", border: "none", cursor: "pointer" }}>
                        Send Another Message
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form key="form" onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
                      {/* Subject selector */}
                      <div>
                        <label style={{ display: "block", fontSize: ".8rem", fontWeight: 600, color: dark ? "rgba(253,247,236,.7)" : T.greenM, marginBottom: ".5rem", letterSpacing: ".02em" }}>
                          How can we help? *
                        </label>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 9rem), 1fr))", gap: ".5rem" }}>
                          {SUBJECTS.map(s => (
                            <button key={s.value} type="button" onClick={() => set("subject", s.value)}
                              style={{
                                padding: ".55rem .7rem",
                                borderRadius: 10,
                                background: form.subject === s.value ? (dark ? "rgba(22,97,62,.25)" : "rgba(22,97,62,.1)") : inp,
                                border: `1.5px solid ${form.subject === s.value ? T.green : brd}`,
                                color: form.subject === s.value ? (dark ? T.goldL : T.green) : sub,
                                fontSize: ".75rem",
                                fontWeight: form.subject === s.value ? 700 : 400,
                                cursor: "pointer",
                                textAlign: "left",
                                transition: "all .2s",
                                display: "flex",
                                alignItems: "center",
                                gap: ".4rem",
                              }}>
                              <span>{s.icon}</span> {s.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Name */}
                      <div>
                        <label style={{ display: "block", fontSize: ".8rem", fontWeight: 600, color: dark ? "rgba(253,247,236,.7)" : T.greenM, marginBottom: ".4rem" }}>Full Name *</label>
                        <input
                          type="text"
                          placeholder="e.g. Talia Adejola"
                          value={form.name}
                          onChange={e => set("name", e.target.value)}
                          onBlur={() => touch("name")}
                          style={fieldStyle("name")}
                          id="contact-name"
                        />
                        {touched.name && !valid.name && <p style={{ fontSize: ".73rem", color: T.err, marginTop: ".3rem" }}>Please enter your full name</p>}
                      </div>

                      {/* Email + Phone row */}
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".75rem" }}>
                        <div>
                          <label style={{ display: "block", fontSize: ".8rem", fontWeight: 600, color: dark ? "rgba(253,247,236,.7)" : T.greenM, marginBottom: ".4rem" }}>Email Address *</label>
                          <input
                            type="email"
                            placeholder="you@example.com"
                            value={form.email}
                            onChange={e => set("email", e.target.value)}
                            onBlur={() => touch("email")}
                            style={fieldStyle("email")}
                            id="contact-email"
                          />
                          {touched.email && !valid.email && <p style={{ fontSize: ".73rem", color: T.err, marginTop: ".3rem" }}>Valid email required</p>}
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: ".8rem", fontWeight: 600, color: dark ? "rgba(253,247,236,.7)" : T.greenM, marginBottom: ".4rem" }}>Phone (optional)</label>
                          <input
                            type="tel"
                            placeholder="+234 800 000 0000"
                            value={form.phone}
                            onChange={e => set("phone", e.target.value)}
                            style={fieldStyle("phone")}
                            id="contact-phone"
                          />
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <label style={{ display: "block", fontSize: ".8rem", fontWeight: 600, color: dark ? "rgba(253,247,236,.7)" : T.greenM, marginBottom: ".4rem" }}>Your Message *</label>
                        <textarea
                          rows={5}
                          placeholder="Tell us how we can serve you..."
                          value={form.message}
                          onChange={e => set("message", e.target.value)}
                          onBlur={() => touch("message")}
                          style={{ ...fieldStyle("message"), resize: "vertical", minHeight: 120 }}
                          id="contact-message"
                        />
                        {touched.message && !valid.message && <p style={{ fontSize: ".73rem", color: T.err, marginTop: ".3rem" }}>Please enter a message (min 10 chars)</p>}
                      </div>

                      {status === "error" && (
                        <div style={{ display: "flex", alignItems: "center", gap: ".6rem", padding: ".75rem 1rem", borderRadius: 10, background: "rgba(255,59,48,.08)", border: "1px solid rgba(255,59,48,.2)" }}>
                          <AlertCircle size={16} color={T.err} strokeWidth={2} />
                          <span style={{ fontSize: ".83rem", color: T.err }}>Something went wrong. Please try emailing us directly.</span>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={status === "submitting"}
                        style={{
                          padding: ".9em 2.4em",
                          borderRadius: 999,
                          background: canSubmit ? T.green : (dark ? "rgba(255,255,255,.08)" : "rgba(0,0,0,.08)"),
                          color: canSubmit ? "#fff" : sub,
                          fontWeight: 700,
                          fontSize: "1rem",
                          border: "none",
                          cursor: canSubmit ? "pointer" : "default",
                          fontFamily: "'Plus Jakarta Sans',sans-serif",
                          transition: "all .2s",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: ".5rem",
                          filter: "none",
                        }}
                        onMouseEnter={e => { if (canSubmit) e.currentTarget.style.filter = "brightness(.88)"; }}
                        onMouseLeave={e => { e.currentTarget.style.filter = "none"; }}
                        id="contact-submit"
                      >
                        {status === "submitting"
                          ? <><Loader size={16} strokeWidth={2} style={{ animation: "spin 1s linear infinite" }} /> Sending...</>
                          : "Send Message →"}
                      </button>
                      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

                      <p style={{ fontSize: ".72rem", color: dark ? "rgba(253,247,236,.35)" : T.p3, textAlign: "center", lineHeight: 1.5 }}>
                        Your message is stored securely in our Google Sheets database and used solely for responding to your enquiry. NDPR compliant.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* ── CONTACT INFO SIDEBAR ── */}
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65, delay: .12 }} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

              {/* Direct contacts */}
              <div style={{ background: card, borderRadius: 24, padding: "1.75rem", border: `1px solid ${brd}`, boxShadow: dark ? "0 2px 12px rgba(0,0,0,.3)" : "0 4px 20px rgba(10,28,18,.06)" }}>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.3rem", fontWeight: 700, color: dark ? T.cream : T.greenD, marginBottom: "1.25rem" }}>
                  Direct Contact
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: ".75rem" }}>
                  <a href="mailto:KidsinspiringNation@gmail.com"
                    style={{ display: "flex", alignItems: "center", gap: ".85rem", padding: ".9rem 1rem", borderRadius: 14, background: dark ? "rgba(255,255,255,.04)" : "rgba(22,97,62,.04)", border: `1px solid ${brd}`, textDecoration: "none", transition: "background .15s" }}
                    onMouseEnter={e => e.currentTarget.style.background = dark ? "rgba(255,255,255,.08)" : "rgba(22,97,62,.08)"}
                    onMouseLeave={e => e.currentTarget.style.background = dark ? "rgba(255,255,255,.04)" : "rgba(22,97,62,.04)"}>
                    <div style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(22,97,62,.12)", display: "grid", placeItems: "center", color: T.green, flexShrink: 0 }}>
                      <Mail size={16} strokeWidth={1.5} />
                    </div>
                    <div>
                      <div style={{ fontSize: ".82rem", fontWeight: 600, color: dark ? T.cream : T.greenD }}>Email Us</div>
                      <div style={{ fontSize: ".75rem", color: sub }}>KidsinspiringNation@gmail.com</div>
                    </div>
                  </a>

                  <a href="https://whatsapp.com/channel/0029Va8XnCuGE56c4SMaT41w" target="_blank" rel="noopener"
                    style={{ display: "flex", alignItems: "center", gap: ".85rem", padding: ".9rem 1rem", borderRadius: 14, background: dark ? "rgba(255,255,255,.04)" : "rgba(37,211,102,.04)", border: `1px solid ${brd}`, textDecoration: "none", transition: "background .15s" }}
                    onMouseEnter={e => e.currentTarget.style.background = dark ? "rgba(255,255,255,.08)" : "rgba(37,211,102,.09)"}
                    onMouseLeave={e => e.currentTarget.style.background = dark ? "rgba(255,255,255,.04)" : "rgba(37,211,102,.04)"}>
                    <div style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(37,211,102,.12)", display: "grid", placeItems: "center", color: "#25D366", flexShrink: 0 }}>
                      <MessageCircle size={16} strokeWidth={1.5} />
                    </div>
                    <div>
                      <div style={{ fontSize: ".82rem", fontWeight: 600, color: dark ? T.cream : T.greenD }}>WhatsApp Channel</div>
                      <div style={{ fontSize: ".75rem", color: sub }}>Join KIND daily at 8pm WAT</div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Social channels */}
              <div style={{ background: card, borderRadius: 24, padding: "1.75rem", border: `1px solid ${brd}`, boxShadow: dark ? "0 2px 12px rgba(0,0,0,.3)" : "0 4px 20px rgba(10,28,18,.06)" }}>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.3rem", fontWeight: 700, color: dark ? T.cream : T.greenD, marginBottom: "1.25rem" }}>
                  Follow Us
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: ".6rem" }}>
                  {SOCIALS.map(s => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener"
                      style={{ display: "flex", alignItems: "center", gap: ".75rem", padding: ".7rem .9rem", borderRadius: 12, background: dark ? "rgba(255,255,255,.03)" : s.bg, border: `1px solid ${brd}`, textDecoration: "none", transition: "all .2s" }}
                      onMouseEnter={e => e.currentTarget.style.background = dark ? "rgba(255,255,255,.07)" : s.bg.replace(".1", ".18").replace(".08", ".14")}
                      onMouseLeave={e => e.currentTarget.style.background = dark ? "rgba(255,255,255,.03)" : s.bg}>
                      <s.icon size={16} strokeWidth={1.5} color={s.color} />
                      <span style={{ fontSize: ".85rem", fontWeight: 500, color: dark ? T.cream : T.greenD }}>{s.label}</span>
                      <ExternalLink size={11} strokeWidth={1.5} style={{ marginLeft: "auto", color: sub }} />
                    </a>
                  ))}
                </div>
              </div>

              {/* NGO Details */}
              <div style={{ background: T.greenD, borderRadius: 24, padding: "1.75rem" }}>
                <div style={{ fontSize: ".7rem", fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", color: "rgba(253,247,236,.45)", marginBottom: "1rem" }}>NGO Registration</div>
                <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "1rem", fontWeight: 700, color: T.cream, marginBottom: ".2rem" }}>goDs Global KidsInspiring</div>
                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".85rem", color: T.goldL, marginBottom: ".75rem" }}>IT No. 6980735</div>
                <p style={{ fontSize: ".8rem", color: "rgba(253,247,236,.5)", lineHeight: 1.65 }}>
                  Registered Nigerian NGO. NDPR compliant. All data processed in accordance with the Nigeria Data Protection Regulation 2019.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
