import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ROUTE_META, SITE, T } from "./siteConfig.js";
import { usePageMeta } from "./usePageMeta.js";

export default function InvestingInKidsLanding({ dark }) {
  usePageMeta({
    ...ROUTE_META.investingInKids,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: ROUTE_META.investingInKids.title,
        description: ROUTE_META.investingInKids.description,
        url: new URL(ROUTE_META.investingInKids.canonicalPath, SITE.siteUrl).toString(),
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What does investing in kids mean?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Investing in kids means building a child’s character, capability, and community responsibility so they can thrive and contribute to society over a lifetime.",
            },
          },
          {
            "@type": "Question",
            name: "How does KidsInspiring Nation invest in kids in Nigeria?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "We run consistent programmes that form values, teach skills, build service culture, and guide young Nigerians to solve real problems through nation-building projects.",
            },
          },
          {
            "@type": "Question",
            name: "How can I support the work?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "You can give, volunteer, partner, or connect a school/community to one of our programmes. Start with the Give page or Contact page.",
            },
          },
        ],
      },
    ],
  });

  const bg = dark ? "#060B08" : "#FAFAF5";
  const card = dark ? "rgba(255,255,255,.03)" : "#fff";
  const txt = dark ? T.cream : T.greenD;
  const sub = dark ? "rgba(253,247,236,.7)" : T.p2;
  const brd = dark ? "rgba(255,255,255,.08)" : "rgba(22,97,62,.1)";

  return (
    <div style={{ fontFamily: "'DM Sans',sans-serif", background: bg, color: txt, minHeight: "100vh" }}>
      <section style={{ background: dark ? "#050806" : T.warmBg, padding: "clamp(5rem,12vw,8rem) 0 clamp(3rem,7vw,5rem)", borderBottom: `1px solid ${brd}` }}>
        <div style={{ maxWidth: "74rem", margin: "0 auto", padding: "0 clamp(1.25rem,5vw,3rem)" }}>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".72rem", letterSpacing: ".16em", textTransform: "uppercase", color: dark ? "rgba(253,247,236,.65)" : T.p3, marginBottom: "1rem" }}>
              Investing in kids, nation building, Nigeria
            </div>
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2.4rem,6vw,4.2rem)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: "1.25rem" }}>
              Investing in kids is the highest-leverage investment Nigeria can make.
            </h1>
            <p style={{ fontSize: "clamp(1rem,2.1vw,1.1rem)", lineHeight: 1.8, color: sub, maxWidth: "74ch" }}>
              When children grow in character, competence, and service culture, the next decade looks different. KidsInspiring Nation exists to build that pipeline of nation builders: formed hearts, trained hands, and a responsibility mindset.
            </p>

            <div style={{ display: "flex", gap: ".75rem", flexWrap: "wrap", marginTop: "1.75rem" }}>
              <Link to="/give" className="gold-btn" style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", padding: ".9em 1.6em", borderRadius: 999, background: T.gold, color: "#fff", fontWeight: 900, textDecoration: "none" }}>
                Give to invest in kids
              </Link>
              <Link to="/contact" style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", padding: ".9em 1.6em", borderRadius: 999, border: `1.5px solid ${dark ? "rgba(253,247,236,.35)" : "rgba(22,97,62,.25)"}`, color: dark ? T.cream : T.greenD, fontWeight: 800, textDecoration: "none" }}>
                Partner / Volunteer
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section style={{ padding: "clamp(3rem,8vw,6rem) 0" }}>
        <div style={{ maxWidth: "74rem", margin: "0 auto", padding: "0 clamp(1.25rem,5vw,3rem)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 20rem), 1fr))", gap: "1.25rem" }}>
            {[
              { h: "1) Character formation", p: "Integrity, discipline, humility, perseverance. Without this, talent collapses under pressure." },
              { h: "2) Skills and competence", p: "Literacy, reasoning, leadership, and execution. Values become impact when a child can build." },
              { h: "3) Service culture", p: "Children learn to notice needs, collaborate, and serve their communities consistently." },
              { h: "4) Nation-building opportunities", p: "Structured programmes give kids a pathway to solve real problems and prove responsibility." },
            ].map((b) => (
              <div key={b.h} style={{ background: card, borderRadius: 20, padding: "1.4rem", border: `1px solid ${brd}` }}>
                <div style={{ fontWeight: 900, marginBottom: ".35rem", color: dark ? T.goldL : T.greenD }}>{b.h}</div>
                <p style={{ margin: 0, color: sub, lineHeight: 1.75 }}>{b.p}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "2rem", background: card, borderRadius: 24, border: `1px solid ${brd}`, padding: "1.75rem" }}>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.7rem", fontWeight: 900, marginBottom: ".6rem" }}>
              FAQ
            </div>
            {[
              { q: "What does investing in kids mean?", a: "Building character and competence early so a child can carry responsibility and create value for society." },
              { q: "Is KidsInspiring Nation only for “gifted” kids?", a: "No. Our programmes are for children and teenagers willing to grow. We raise goDs: potential becomes capability through training and consistency." },
              { q: "How can I support this work?", a: "Give, volunteer, partner with a school/community, or sponsor a programme stream. Start from Give or Contact." },
            ].map((f) => (
              <div key={f.q} style={{ padding: "1rem 0", borderTop: `1px solid ${brd}` }}>
                <div style={{ fontWeight: 900, marginBottom: ".35rem" }}>{f.q}</div>
                <div style={{ color: sub, lineHeight: 1.75 }}>{f.a}</div>
              </div>
            ))}

            <div style={{ display: "flex", gap: ".75rem", flexWrap: "wrap", marginTop: "1.25rem" }}>
              <Link to="/kids-inspiring" style={{ color: dark ? T.goldL : T.green, fontWeight: 900, textDecoration: "none" }}>See “Kids Inspiring” →</Link>
              <Link to="/NBC" style={{ color: dark ? T.goldL : T.green, fontWeight: 900, textDecoration: "none" }}>Explore National Builders →</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

