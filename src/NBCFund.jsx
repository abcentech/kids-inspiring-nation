import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Loader2, CheckCircle2, MessageCircle, Globe, ShieldCheck, ArrowLeft,
  Landmark, Heart, School, Users, Trophy, BookOpen,
} from "lucide-react";
import { ROUTE_META, SITE, T, DONATION_DETAILS } from "./siteConfig.js";
import { usePageMeta } from "./usePageMeta.js";
import { submitJsonForm } from "./formSubmit.js";
import { trackEvent } from "./analytics.js";

const FUND_ENDPOINT = "https://formsubmit.co/ajax/" + SITE.operationsEmail;
const PAYSTACK_GIVE = "https://paystack.shop/pay/kin";

// USD-anchored sponsorship tiers, each with a concrete impact statement.
// A high flagship "Patron" tier anchors expectations upward.
const TIERS = [
  { key: "club", Icon: School, name: "Fund a School Club", amount: "$250", per: "one club · one term", impact: "Equips one Nation Builders Club in a school with materials, an advisor pack, and project seed support for a full term." },
  { key: "cohort", Icon: Users, name: "Sponsor a Cohort", amount: "$2,500", per: "50 builders", impact: "Trains and mentors 50 young Nation Builders through a full July→July cycle of community projects." },
  { key: "course", Icon: BookOpen, name: "Underwrite the Course", amount: "$10,000", per: "nationwide", impact: "Keeps the entire Nation Builders Course free and open for every child in Nigeria to take and share." },
  { key: "patron", Icon: Trophy, name: "Grand Finale Patron", amount: "$25,000", per: "flagship", impact: "Powers the December Conference and July Grand Finale — the national stage where builders are celebrated and scaled.", flagship: true },
];

export default function NBCFund({ dark }) {
  usePageMeta(ROUTE_META.nbcFund);
  const s = dark
    ? { bg: T.bgD, surf: T.srfD, brd: T.brdD, txt: T.d1, sub: T.d2 }
    : { bg: T.cream, surf: "#FFFFFF", brd: "rgba(11,42,27,.06)", txt: T.green, sub: T.greenM };

  const [form, setForm] = useState({ name: "", org: "", email: "", whatsapp: "", tier: "", amount: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | done | error
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await submitJsonForm(FUND_ENDPOINT, {
        _subject: "🤝 New NBC Funder Inquiry",
        Name: form.name, Organisation: form.org, Email: form.email,
        WhatsApp: form.whatsapp, Tier: form.tier, IntendedAmount: form.amount,
        Message: form.message, Source: "NBC Fund page",
      }, "NBC Funder inquiry");
      trackEvent("nbc_funder_inquiry", { tier: form.tier || "unspecified" });
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  const pickTier = (t) => { setForm((f) => ({ ...f, tier: t.name, amount: t.amount })); trackEvent("nbc_funder_tier_select", { tier: t.name }); };

  return (
    <div style={{ fontFamily: "'DM Sans',sans-serif", background: s.bg, color: s.txt, minHeight: "100vh", paddingBottom: "4rem" }}>
      {/* Hero */}
      <section style={{ background: T.greenD, color: T.cream, padding: "clamp(3.5rem,8vw,6rem) 1.25rem 3rem" }}>
        <div style={{ maxWidth: "60rem", margin: "0 auto" }}>
          <Link to="/NBC" style={{ color: T.goldL, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4, fontSize: ".82rem", marginBottom: "1.25rem" }}><ArrowLeft size={14} /> Back to NBC</Link>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, color: T.goldL, fontWeight: 800, letterSpacing: ".12em", textTransform: "uppercase", fontSize: ".78rem", marginBottom: ".9rem" }}>
            <Heart size={16} /> Fund Nation Building
          </div>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2.2rem,7vw,3.6rem)", fontWeight: 900, lineHeight: 1.05, margin: "0 0 1rem" }}>
            Invest in the character<br />of a generation.
          </h1>
          <p style={{ fontSize: "1.05rem", color: "rgba(250,249,246,.82)", maxWidth: "52ch", lineHeight: 1.6 }}>
            Your gift funds school clubs, a free national course, and a movement of young Nigerians solving real community problems — measured, documented, and celebrated each year.
          </p>
        </div>
      </section>

      {/* Tiers */}
      <section style={{ maxWidth: "68rem", margin: "0 auto", padding: "3rem 1.25rem 0" }}>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.6rem,4vw,2.2rem)", fontWeight: 900, marginBottom: ".4rem" }}>Ways to give</h2>
        <p style={{ color: s.sub, marginBottom: "2rem" }}>Each level below turns directly into measurable nation building. Pick one to pre-fill the funder form.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 250px), 1fr))", gap: "1.25rem" }}>
          {TIERS.map((t, i) => (
            <motion.button key={t.key} type="button" onClick={() => pickTier(t)}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              style={{ textAlign: "left", cursor: "pointer", background: t.flagship ? T.green : s.surf, color: t.flagship ? T.cream : s.txt,
                border: `1.5px solid ${form.tier === t.name ? T.gold : t.flagship ? T.green : s.brd}`, borderRadius: 22, padding: "1.75rem", position: "relative" }}>
              {t.flagship && <span style={{ position: "absolute", top: 14, right: 14, fontSize: ".68rem", fontWeight: 800, letterSpacing: ".08em", textTransform: "uppercase", color: T.goldL }}>Flagship</span>}
              <t.Icon size={26} color={t.flagship ? T.goldL : T.gold} />
              <div style={{ fontSize: "1.9rem", fontWeight: 900, margin: ".75rem 0 .1rem", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{t.amount}</div>
              <div style={{ fontSize: ".75rem", textTransform: "uppercase", letterSpacing: ".08em", opacity: .7, marginBottom: ".6rem" }}>{t.per}</div>
              <div style={{ fontWeight: 800, marginBottom: ".4rem" }}>{t.name}</div>
              <p style={{ fontSize: ".88rem", lineHeight: 1.55, color: t.flagship ? "rgba(250,249,246,.8)" : s.sub, margin: 0 }}>{t.impact}</p>
            </motion.button>
          ))}
        </div>
        <p style={{ color: s.sub, fontSize: ".85rem", marginTop: "1rem" }}>💡 Prefer a monthly commitment? A recurring gift of even ~40% of a one-time tier sustains the work all year — mention it in the form.</p>
      </section>

      {/* Funder form + trust column */}
      <section style={{ maxWidth: "68rem", margin: "0 auto", padding: "3rem 1.25rem 0", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", gap: "2rem", alignItems: "start" }}>
        {/* Form */}
        <div style={{ background: s.surf, border: `1px solid ${s.brd}`, borderRadius: 24, padding: "2rem" }}>
          <h3 style={{ fontSize: "1.4rem", fontWeight: 900, marginBottom: ".4rem" }}>Become a Funder</h3>
          <p style={{ color: s.sub, marginBottom: "1.5rem", fontSize: ".92rem" }}>Tell us how you'd like to give. We reply within 24 hours with next steps and, for larger gifts, an impact agreement.</p>

          {status === "done" ? (
            <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
              <CheckCircle2 size={44} color={T.ok} />
              <h4 style={{ fontSize: "1.2rem", fontWeight: 800, margin: ".75rem 0 .4rem" }}>Thank you — we've received it.</h4>
              <p style={{ color: s.sub }}>Our team will reach out shortly. For anything urgent, message us on WhatsApp.</p>
            </div>
          ) : (
            <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <Field label="Full name *"><input required value={form.name} onChange={set("name")} style={inp(s)} placeholder="Your name" /></Field>
              <Field label="Organisation (optional)"><input value={form.org} onChange={set("org")} style={inp(s)} placeholder="Company / foundation / self" /></Field>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <Field label="Email *"><input required type="email" value={form.email} onChange={set("email")} style={inp(s)} placeholder="you@email.com" /></Field>
                <Field label="WhatsApp"><input value={form.whatsapp} onChange={set("whatsapp")} style={inp(s)} placeholder="+234…" /></Field>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <Field label="Interest / tier"><input value={form.tier} onChange={set("tier")} style={inp(s)} placeholder="e.g. Sponsor a Cohort" /></Field>
                <Field label="Intended amount"><input value={form.amount} onChange={set("amount")} style={inp(s)} placeholder="e.g. $2,500 or monthly" /></Field>
              </div>
              <Field label="Message"><textarea rows={3} value={form.message} onChange={set("message")} style={{ ...inp(s), resize: "vertical" }} placeholder="What would you love your gift to power?" /></Field>
              {status === "error" && <p style={{ color: T.err, fontSize: ".85rem" }}>Something went wrong — please try again or reach us on WhatsApp.</p>}
              <button type="submit" disabled={status === "sending"} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "1rem", borderRadius: 999, border: "none", background: T.gold, color: "#14532d", fontWeight: 800, fontSize: "1rem", cursor: status === "sending" ? "wait" : "pointer" }}>
                {status === "sending" ? <><Loader2 size={18} className="animate-spin" /> Sending…</> : "Send funder inquiry"}
              </button>
            </form>
          )}
        </div>

        {/* Trust + direct rails */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div style={{ background: s.surf, border: `1px solid ${s.brd}`, borderRadius: 24, padding: "1.75rem" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, color: T.ok, fontWeight: 800, marginBottom: ".9rem" }}><ShieldCheck size={18} /> You can trust this</div>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: ".7rem", color: s.sub, fontSize: ".92rem", lineHeight: 1.5 }}>
              <li>✅ {SITE.legalName} — registered <strong style={{ color: s.txt }}>{SITE.registrationId}</strong></li>
              <li>✅ Every project is documented with monthly impact logs</li>
              <li>✅ Official channels only — <Link to="/transparency" style={{ color: T.gold, fontWeight: 700 }}>see our transparency page</Link></li>
            </ul>
          </div>

          <div style={{ background: s.surf, border: `1px solid ${s.brd}`, borderRadius: 24, padding: "1.75rem" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontWeight: 800, marginBottom: ".9rem" }}><Landmark size={18} color={T.gold} /> Give directly</div>
            <p style={{ color: s.sub, fontSize: ".9rem", marginBottom: "1rem" }}>Ready now? Give online, by bank transfer, or in USD.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: ".6rem" }}>
              <a href={PAYSTACK_GIVE} target="_blank" rel="noopener noreferrer" style={railBtn(T.gold, "#fff")}><Globe size={16} /> Give online (Paystack)</a>
              <a href={`${SITE.socials.whatsappChat}?text=Hello%20KidsInspiring%20Nation%2C%20I%20want%20to%20give%20in%20USD%20to%20the%20Nation%20Builders%20Corp.`} target="_blank" rel="noopener noreferrer" style={railBtn(T.green, "#fff")}><MessageCircle size={16} /> Give in USD (WhatsApp)</a>
            </div>
            <div style={{ marginTop: "1rem", padding: "1rem", borderRadius: 14, background: s.bg, border: `1px solid ${s.brd}`, fontSize: ".85rem", lineHeight: 1.6 }}>
              <div style={{ color: s.sub }}>Bank transfer</div>
              <div style={{ fontWeight: 800 }}>{DONATION_DETAILS.primaryAccountName}</div>
              <div>{DONATION_DETAILS.primaryBankName} · <span style={{ fontFamily: "'DM Mono',monospace", fontWeight: 800 }}>{DONATION_DETAILS.primaryAccountNumber}</span></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label style={{ display: "block" }}>
      <span style={{ display: "block", fontSize: ".72rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: ".05em", opacity: .7, marginBottom: ".4rem" }}>{label}</span>
      {children}
    </label>
  );
}

function inp(s) {
  return { width: "100%", padding: ".85rem 1rem", borderRadius: 12, border: `1.5px solid ${s.brd}`, background: s.bg, color: s.txt, fontSize: ".95rem", outline: "none", fontFamily: "inherit" };
}

function railBtn(bg, color) {
  return { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, padding: ".85rem 1.2rem", borderRadius: 999, background: bg, color, fontWeight: 700, textDecoration: "none", fontSize: ".9rem" };
}
