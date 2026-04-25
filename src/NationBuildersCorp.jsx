import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { T } from "./siteConfig.js";

function money(n) {
  try {
    return "₦" + Number(n).toLocaleString("en-NG");
  } catch {
    return "₦" + n;
  }
}

export default function NationBuildersCorp({ dark }) {
  const bg = dark ? "#050806" : T.bg;
  const surf = dark ? "rgba(255,255,255,.03)" : "#fff";
  const brd = dark ? "rgba(255,255,255,.08)" : "rgba(22,97,62,.10)";
  const p1 = dark ? T.cream : T.greenD;
  const p2 = dark ? "rgba(253,247,236,.65)" : T.p2;

  const ladder = [
    { year: 2021, label: "Star Award (rote → rigour)", amount: 11917, note: "Our first cash reward for academic rigour and consistency." },
    { year: 2022, label: "Scale", amount: 119119, note: "We raised the bar and expanded the reach." },
    { year: 2023, label: "Growth", amount: 357119, note: "Rewarded excellence with larger stakes." },
    { year: 2024, label: "Momentum", amount: 528119, note: "The arm matured beyond the classroom." },
    { year: 2026, label: "Community Impact", amount: 1190000, note: "Individual or group that makes a difference in their community." },
  ];

  return (
    <div style={{ fontFamily: "'DM Sans',sans-serif", background: bg, color: p1, overflowX: "hidden" }}>
      {/* HERO */}
      <section style={{ background: T.greenD, padding: "clamp(5rem,12vw,8.5rem) 0 clamp(2.5rem,6vw,4rem)", position: "relative", overflow: "hidden" }}>
        <div aria-hidden style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 80% 70% at 18% 55%, ${T.gold}20 0%, transparent 60%), radial-gradient(ellipse 60% 70% at 84% 18%, ${T.coral}18, transparent 58%)` }} />
        <div aria-hidden style={{ position: "absolute", right: "-0.05em", top: "52%", transform: "translateY(-50%)", fontSize: "clamp(10rem,32vw,34rem)", lineHeight: 1, color: "transparent", WebkitTextStroke: "1px rgba(196,136,44,.06)", fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontWeight: 900, userSelect: "none", pointerEvents: "none" }}>NBC</div>

        <div style={{ maxWidth: "74rem", margin: "0 auto", padding: "0 clamp(1.25rem,5vw,3rem)", position: "relative", zIndex: 2 }}>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
            <div style={{ fontSize: ".75rem", fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: T.goldL, marginBottom: ".85rem", display: "flex", alignItems: "center", gap: ".75rem" }}>
              <span style={{ width: "2.25rem", height: "1.5px", background: T.gold, display: "block" }} />
              Nation Building Arm
            </div>
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(3rem,7.8vw,5.5rem)", fontWeight: 900, color: T.cream, letterSpacing: "-0.04em", lineHeight: 0.94, marginBottom: "1.2rem" }}>
              Psalm 119<br />
              <em style={{ fontStyle: "italic", color: T.goldL }}>→ Nation Builders Corp</em>
            </h1>
            <p style={{ fontSize: "clamp(1rem,2.4vw,1.2rem)", color: "rgba(253,247,236,.72)", lineHeight: 1.78, maxWidth: "62ch", marginBottom: "1.6rem" }}>
              We started in 2021 by rewarding academic rigour and memorisation consistency with a small cash “Star Award” (about ₦11,900). Over the years, that simple spark evolved into a nation-building arm: children and teenagers building real solutions for their communities.
            </p>

            <div style={{ display: "flex", gap: ".8rem", flexWrap: "wrap" }}>
              <Link to="/NBC" className="gold-btn" style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", padding: ".95em 1.3em", borderRadius: 999, background: T.gold, color: "#fff", fontWeight: 900, textDecoration: "none" }}>
                Explore the NBC page →
              </Link>
              <Link to="/NBC/register" style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", padding: ".95em 1.25em", borderRadius: 999, border: "1.5px solid rgba(253,247,236,.28)", color: T.cream, fontWeight: 900, textDecoration: "none" }}>
                Register for NBC →
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STORY */}
      <section style={{ padding: "clamp(3.5rem,8vw,6rem) 0", background: bg }}>
        <div style={{ maxWidth: "74rem", margin: "0 auto", padding: "0 clamp(1.25rem,5vw,3rem)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 22rem), 1fr))", gap: "1.25rem", alignItems: "start" }}>
            <div style={{ background: surf, border: `1px solid ${brd}`, borderRadius: 22, padding: "1.6rem" }}>
              <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".72rem", letterSpacing: ".14em", textTransform: "uppercase", color: dark ? "rgba(253,247,236,.55)" : T.p3, marginBottom: ".75rem" }}>
                First Principles
              </div>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.8rem", fontWeight: 900, letterSpacing: "-0.02em", marginBottom: ".6rem" }}>
                Reward what you want to reproduce.
              </div>
              <p style={{ color: p2, lineHeight: 1.75, margin: 0 }}>
                We began by rewarding discipline (showing up, memorising, consistency). Then we realised Nigeria needs more than knowledge: it needs builders. So the arm matured into community impact — with real stakes, real projects, and measurable difference.
              </p>
            </div>

            <div style={{ background: surf, border: `1px solid ${brd}`, borderRadius: 22, padding: "1.6rem" }}>
              <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".72rem", letterSpacing: ".14em", textTransform: "uppercase", color: dark ? "rgba(253,247,236,.55)" : T.p3, marginBottom: ".75rem" }}>
                What Changed
              </div>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.8rem", fontWeight: 900, letterSpacing: "-0.02em", marginBottom: ".6rem" }}>
                From rote to responsibility.
              </div>
              <p style={{ color: p2, lineHeight: 1.75, margin: 0 }}>
                The Psalm 119 roots remain, but the output evolved: values, resourcefulness, service, and leadership. Nation Builders Corp is where a young person’s faith and skills become visible service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRIZE LADDER */}
      <section style={{ padding: "clamp(3.5rem,8vw,6rem) 0", background: dark ? "#050505" : T.warmBg }}>
        <div style={{ maxWidth: "74rem", margin: "0 auto", padding: "0 clamp(1.25rem,5vw,3rem)" }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "1.2rem" }}>
            <div>
              <div style={{ fontSize: ".75rem", fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: T.gold, marginBottom: ".45rem" }}>
                Cash Prizes (Not Student Counts)
              </div>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,4.2vw,3rem)", fontWeight: 900, letterSpacing: "-0.03em", color: p1, lineHeight: 1.1, margin: 0 }}>
                The growth, year by year
              </h2>
            </div>
            <Link to="/NBC" style={{ color: dark ? T.goldL : T.green, fontWeight: 900, textDecoration: "none" }}>
              See NBC details →
            </Link>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 17rem), 1fr))", gap: "1rem" }}>
            {ladder.map((x) => (
              <div key={x.year} style={{ background: dark ? "rgba(255,255,255,.03)" : "#fff", border: `1px solid ${brd}`, borderRadius: 18, padding: "1.25rem" }}>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "1rem" }}>
                  <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".75rem", letterSpacing: ".14em", textTransform: "uppercase", color: dark ? "rgba(253,247,236,.55)" : T.p3 }}>
                    {x.year}
                  </div>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.4rem", fontWeight: 900, color: T.gold, letterSpacing: "-0.02em" }}>
                    {money(x.amount)}
                  </div>
                </div>
                <div style={{ marginTop: ".4rem", fontWeight: 900, color: p1 }}>{x.label}</div>
                <div style={{ marginTop: ".35rem", color: p2, lineHeight: 1.6, fontSize: ".92rem" }}>{x.note}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "1.2rem", color: dark ? "rgba(253,247,236,.6)" : T.p2, fontSize: ".92rem", lineHeight: 1.7 }}>
            In 2026, the focus is explicit: an individual or group that can make a measurable difference in their community — and document it with evidence.
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "clamp(3.5rem,8vw,6rem) 0", background: T.greenD }}>
        <div style={{ maxWidth: "74rem", margin: "0 auto", padding: "0 clamp(1.25rem,5vw,3rem)", textAlign: "center" }}>
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,4.6vw,3.2rem)", fontWeight: 900, color: T.cream, letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: ".9rem" }}>
            Build Something That Helps People.
          </div>
          <p style={{ color: "rgba(253,247,236,.7)", maxWidth: "62ch", margin: "0 auto 1.6rem", lineHeight: 1.75 }}>
            Nation Builders Corp sits inside the NBC programme experience. If you’re new, start with the NBC page to understand how it works, then register.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: ".8rem", flexWrap: "wrap" }}>
            <Link to="/NBC" className="gold-btn" style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", padding: ".95em 1.4em", borderRadius: 999, background: T.gold, color: "#fff", fontWeight: 900, textDecoration: "none" }}>
              Open NBC →
            </Link>
            <Link to="/NBC/register" style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", padding: ".95em 1.35em", borderRadius: 999, border: "1.5px solid rgba(253,247,236,.28)", color: T.cream, fontWeight: 900, textDecoration: "none" }}>
              Register →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
