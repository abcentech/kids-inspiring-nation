import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ROUTE_META, SITE, T } from "./siteConfig.js";
import { usePageMeta } from "./usePageMeta.js";

export default function KidsInspiringLanding({ dark }) {
  usePageMeta({
    ...ROUTE_META.kidsInspiring,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "NGO",
      name: SITE.name,
      alternateName: SITE.legalName,
      url: SITE.siteUrl,
      email: SITE.email,
      telephone: SITE.phone,
      slogan: SITE.tagline,
      areaServed: "Nigeria",
      sameAs: Object.values(SITE.socials),
    },
  });

  const bg = dark ? "#060B08" : "#FAFAF5";
  const card = dark ? "rgba(255,255,255,.03)" : "#fff";
  const txt = dark ? T.cream : T.greenD;
  const sub = dark ? "rgba(253,247,236,.7)" : T.p2;
  const brd = dark ? "rgba(255,255,255,.08)" : "rgba(22,97,62,.1)";

  return (
    <div style={{ fontFamily: "'DM Sans',sans-serif", background: bg, color: txt, minHeight: "100vh" }}>
      <section style={{ background: T.greenD, padding: "clamp(5rem,12vw,8rem) 0 clamp(3rem,7vw,5rem)", position: "relative", overflow: "hidden" }}>
        <div aria-hidden style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 70% 60% at 15% 50%, ${T.green}55, transparent 60%), radial-gradient(ellipse 55% 55% at 85% 10%, ${T.gold}20, transparent 55%)` }} />
        <div style={{ maxWidth: "74rem", margin: "0 auto", padding: "0 clamp(1.25rem,5vw,3rem)", position: "relative", zIndex: 2 }}>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".72rem", letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(253,247,236,.7)", marginBottom: "1rem" }}>
              Kids Inspiring Nigeria
            </div>
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2.6rem,6.5vw,4.6rem)", fontWeight: 900, lineHeight: 1, letterSpacing: "-0.035em", marginBottom: "1.25rem", color: T.cream }}>
              KidsInspiring Nation is building<br />
              <em style={{ fontStyle: "italic", color: T.goldL }}>Nigeria’s next Nation Builders.</em>
            </h1>
            <p style={{ fontSize: "clamp(1rem,2.2vw,1.15rem)", lineHeight: 1.75, color: "rgba(253,247,236,.72)", maxWidth: "62ch" }}>
              We are the Kids Inspiring movement raising children and teenagers with character, skills, service, and faith so they can solve real problems and build Nigeria.
            </p>

            <div style={{ display: "flex", gap: ".75rem", flexWrap: "wrap", marginTop: "1.75rem" }}>
              <Link to="/NBC" className="gold-btn" style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", padding: ".9em 1.6em", borderRadius: 999, background: T.gold, color: "#fff", fontWeight: 800, textDecoration: "none" }}>
                Join National Builders
              </Link>
              <Link to="/give" style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", padding: ".9em 1.6em", borderRadius: 999, border: `1.5px solid rgba(253,247,236,.35)`, color: T.cream, fontWeight: 700, textDecoration: "none" }}>
                Give Support
              </Link>
              <a href={SITE.socials.linktree} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", padding: ".9em 1.2em", borderRadius: 999, border: `1.5px solid rgba(196,136,44,.35)`, color: T.goldL, fontWeight: 700, textDecoration: "none" }}>
                Official Links
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section style={{ padding: "clamp(3rem,8vw,6rem) 0" }}>
        <div style={{ maxWidth: "74rem", margin: "0 auto", padding: "0 clamp(1.25rem,5vw,3rem)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 18rem), 1fr))", gap: "1.25rem" }}>
            {[
              { t: "Character", d: "Daily and weekly rhythms that form integrity, discipline, and excellence." },
              { t: "Skills", d: "Training that grows capability: literacy, reasoning, leadership, and problem solving." },
              { t: "Service", d: "Children learn to bless their communities in practical, measurable ways." },
              { t: "Nation Building", d: "Programmes like NBC guide young Nigerians to build solutions for real problems." },
            ].map((c) => (
              <div key={c.t} style={{ background: card, borderRadius: 20, padding: "1.4rem", border: `1px solid ${brd}` }}>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.3rem", fontWeight: 900, color: dark ? T.goldL : T.greenD, marginBottom: ".35rem" }}>{c.t}</div>
                <p style={{ margin: 0, color: sub, lineHeight: 1.7 }}>{c.d}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "2.25rem", background: card, borderRadius: 24, border: `1px solid ${brd}`, padding: "1.75rem" }}>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.8rem", fontWeight: 900, marginBottom: ".6rem" }}>
              What “Kids Inspiring” means here
            </div>
            <p style={{ margin: 0, color: sub, lineHeight: 1.8, maxWidth: "78ch" }}>
              Kids inspiring is not entertainment. It is formation: children becoming trustworthy, skillful, service-minded and courageous enough to carry responsibility for their families, communities, and Nigeria.
            </p>
            <div style={{ display: "flex", gap: ".75rem", flexWrap: "wrap", marginTop: "1.25rem" }}>
              <Link to="/about" style={{ color: dark ? T.goldL : T.green, fontWeight: 800, textDecoration: "none" }}>Read our story →</Link>
              <Link to="/contact" style={{ color: dark ? T.goldL : T.green, fontWeight: 800, textDecoration: "none" }}>Contact the team →</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

