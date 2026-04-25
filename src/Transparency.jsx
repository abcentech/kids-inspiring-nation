import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldCheck, BadgeCheck, Mail, Phone, ExternalLink, AlertTriangle, Lock } from "lucide-react";
import { ROUTE_META, SITE, T } from "./siteConfig.js";
import { usePageMeta } from "./usePageMeta.js";

export default function Transparency({ dark }) {
  usePageMeta(ROUTE_META.transparency);

  const bg = dark ? "#050806" : "#FAFAF5";
  const card = dark ? "rgba(255,255,255,.03)" : "#fff";
  const txt = dark ? T.cream : T.greenD;
  const sub = dark ? "rgba(253,247,236,.7)" : T.p2;
  const brd = dark ? "rgba(255,255,255,.08)" : "rgba(22,97,62,.1)";

  const blocks = [
    {
      icon: <ShieldCheck size={20} />,
      title: "Verify Official Channels",
      body:
        "For giving, only trust details published on this website and our official WhatsApp/Telegram/YouTube/Instagram handles. If you’re unsure, message the official WhatsApp number before sending a transfer.",
    },
    {
      icon: <BadgeCheck size={20} />,
      title: "Designated Accounts",
      body:
        "We publish designated Paystack–Titan account numbers (Education, Feeding, Projects, goDsHub). This reduces ambiguity and helps donors fund what they care about.",
    },
    {
      icon: <ShieldCheck size={20} />,
      title: "Receipts & Confirmation",
      body:
        "For bank transfers, donors can confirm giving via WhatsApp. For online giving (Paystack), donors receive platform confirmation and can message us if they need a ministry receipt.",
    },
  ];

  const howWeUseFunds = [
    { h: "Programme Delivery", p: "Sessions, learning materials, facilitation, and programme logistics." },
    { h: "Community Service", p: "Feeding and welfare initiatives that meet practical needs." },
    { h: "Education Support", p: "Books, scholarships, and learning tools for child development." },
    { h: "Infrastructure", p: "goDsHub development and tools that increase programme reliability." },
  ];
  const redFlags = [
    "A donation request shared outside the official website or official KidsInspiring Nation channels.",
    "Pressure to send money immediately without a matching purpose or verification path on the Give page.",
    "A personal account or unfamiliar number claiming to speak for KidsInspiring Nation.",
    "A request that avoids simple confirmation through the official WhatsApp line or Contact page.",
  ];

  return (
    <div style={{ fontFamily: "'DM Sans',sans-serif", background: bg, color: txt, minHeight: "100vh" }}>
      <section style={{ background: T.greenD, padding: "clamp(5rem,12vw,8rem) 0 clamp(3rem,7vw,5rem)", position: "relative", overflow: "hidden" }}>
        <div aria-hidden style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 80% 65% at 20% 55%, ${T.green}55, transparent 60%), radial-gradient(ellipse 50% 60% at 85% 20%, ${T.gold}18, transparent 55%)` }} />
        <div style={{ maxWidth: "74rem", margin: "0 auto", padding: "0 clamp(1.25rem,5vw,3rem)", position: "relative", zIndex: 2 }}>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".72rem", letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(253,247,236,.7)", marginBottom: "1rem" }}>
              Donor Trust · Verification · Accountability
            </div>
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2.6rem,6.5vw,4.6rem)", fontWeight: 900, lineHeight: 1, letterSpacing: "-0.035em", marginBottom: "1.25rem", color: T.cream }}>
              Transparency builds<br />
              <em style={{ fontStyle: "italic", color: T.goldL }}>trust.</em>
            </h1>
            <p style={{ fontSize: "clamp(1rem,2.2vw,1.15rem)", lineHeight: 1.75, color: "rgba(253,247,236,.72)", maxWidth: "74ch" }}>
              This page explains how to verify official KidsInspiring Nation giving channels, how designated accounts work, and how to confirm donations safely.
            </p>

            <div style={{ display: "flex", gap: ".75rem", flexWrap: "wrap", marginTop: "1.75rem" }}>
              <Link to="/give" className="gold-btn" style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", padding: ".9em 1.6em", borderRadius: 999, background: T.gold, color: "#fff", fontWeight: 900, textDecoration: "none" }}>
                Give now →
              </Link>
              <Link to="/contact?subject=donate" style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", padding: ".9em 1.6em", borderRadius: 999, border: `1.5px solid rgba(253,247,236,.32)`, color: T.cream, fontWeight: 800, textDecoration: "none" }}>
                Contact for confirmation
              </Link>
              <a href={SITE.socials.linktree} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", padding: ".9em 1.1em", borderRadius: 999, border: `1.5px solid rgba(196,136,44,.35)`, color: T.goldL, fontWeight: 800, textDecoration: "none" }}>
                <ExternalLink size={16} /> Official links
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section style={{ padding: "clamp(3rem,8vw,6rem) 0" }}>
        <div style={{ maxWidth: "74rem", margin: "0 auto", padding: "0 clamp(1.25rem,5vw,3rem)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 18rem), 1fr))", gap: "1.25rem" }}>
            {blocks.map((b) => (
              <div key={b.title} style={{ background: card, borderRadius: 22, padding: "1.5rem", border: `1px solid ${brd}` }}>
                <div style={{ width: 44, height: 44, borderRadius: 14, background: `${T.gold}12`, color: dark ? T.goldL : T.greenD, display: "grid", placeItems: "center", marginBottom: ".9rem" }}>
                  {b.icon}
                </div>
                <div style={{ fontWeight: 950, fontSize: "1.05rem", marginBottom: ".35rem" }}>{b.title}</div>
                <div style={{ color: sub, lineHeight: 1.8 }}>{b.body}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "2rem", background: card, borderRadius: 26, padding: "1.75rem", border: `1px solid ${brd}` }}>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.8rem", fontWeight: 900, marginBottom: ".6rem" }}>
              How funds are used (high level)
            </div>
            <div style={{ color: sub, lineHeight: 1.8, marginBottom: "1rem" }}>
              We allocate giving towards consistent programme delivery, community service, education support, and infrastructure that improves reliability.
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 16rem), 1fr))", gap: "1rem" }}>
              {howWeUseFunds.map((f) => (
                <div key={f.h} style={{ background: dark ? "rgba(255,255,255,.03)" : "rgba(0,0,0,.02)", borderRadius: 18, padding: "1.1rem", border: `1px solid ${brd}` }}>
                  <div style={{ fontWeight: 950, marginBottom: ".25rem" }}>{f.h}</div>
                  <div style={{ color: sub, lineHeight: 1.75 }}>{f.p}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: "2rem", background: card, borderRadius: 26, padding: "1.75rem", border: `1px solid ${brd}` }}>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.8rem", fontWeight: 900, marginBottom: ".6rem" }}>
              Contact for verification
            </div>
            <div style={{ color: sub, lineHeight: 1.8, marginBottom: "1rem" }}>
              If you ever see conflicting details, don’t guess. Verify before transferring.
            </div>
            <div style={{ display: "flex", gap: ".75rem", flexWrap: "wrap" }}>
              <a href={`mailto:${SITE.email}`} style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", padding: ".85em 1.1em", borderRadius: 14, border: `1px solid ${brd}`, textDecoration: "none", color: txt, fontWeight: 900 }}>
                <Mail size={16} /> {SITE.email}
              </a>
              <a href={SITE.socials.whatsappChat} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", padding: ".85em 1.1em", borderRadius: 14, border: `1px solid ${brd}`, textDecoration: "none", color: txt, fontWeight: 900 }}>
                <Phone size={16} /> {SITE.phone}
              </a>
              <Link to="/privacy" style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", padding: ".85em 1.1em", borderRadius: 14, border: `1px solid ${brd}`, textDecoration: "none", color: txt, fontWeight: 900 }}>
                <Lock size={16} /> Privacy policy
              </Link>
            </div>
          </div>

          <div style={{ marginTop: "2rem", background: card, borderRadius: 26, padding: "1.75rem", border: `1px solid ${brd}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: ".7rem", marginBottom: ".6rem" }}>
              <AlertTriangle size={18} color={T.gold} />
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.8rem", fontWeight: 900 }}>
                Scam red flags
              </div>
            </div>
            <div style={{ color: sub, lineHeight: 1.8, marginBottom: "1rem" }}>
              If any of these show up, pause and verify before you act.
            </div>
            <div style={{ display: "grid", gap: ".8rem" }}>
              {redFlags.map((flag) => (
                <div key={flag} style={{ background: dark ? "rgba(255,255,255,.03)" : "rgba(0,0,0,.02)", borderRadius: 18, padding: "1rem 1.1rem", border: `1px solid ${brd}`, color: sub, lineHeight: 1.7 }}>
                  {flag}
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: "2rem", background: card, borderRadius: 26, padding: "1.75rem", border: `1px solid ${brd}` }}>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.8rem", fontWeight: 900, marginBottom: ".6rem" }}>
              Donor and contact data
            </div>
            <div style={{ color: sub, lineHeight: 1.8 }}>
              We use submitted donor and contact information only for confirmation, safeguarding, communication, programme coordination, and responsible reporting. We do not sell personal data, and we limit access to operationally necessary uses. For the full public privacy guidance, visit the <Link to="/privacy" style={{ color: dark ? T.goldL : T.greenD, fontWeight: 800 }}>Privacy Policy</Link>.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
