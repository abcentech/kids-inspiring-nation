import { useEffect, useRef, useState } from "react";
import { T } from "../siteConfig.js";

// "The nation we're building for" — a data visualization of the state of
// education and values in Nigeria. This is the case for why KidsInspiring
// Nation exists. Every figure below is labelled with its source and year;
// edit the FIGURES / BUDGET / GAP arrays to update the numbers in one place.
//
// NOTE FOR EDITORS: these are widely-published headline figures from the named
// institutions. Confirm the latest values before treating them as final.

const FIGURES = [
  {
    value: 18.3,
    suffix: "m",
    decimals: 1,
    label: "children out of school",
    sub: "One of the highest numbers in the world — about 1 in 3 Nigerian children.",
    source: "UNICEF Nigeria, 2024",
  },
  {
    value: 92,
    suffix: "%",
    decimals: 0,
    label: "cannot read by age 10",
    sub: "In “learning poverty” — unable to read and understand a simple text by age 10.",
    source: "World Bank, 2022",
  },
  {
    value: 62,
    suffix: "%",
    decimals: 0,
    label: "adult literacy rate",
    sub: "More than a third of adults cannot read and write fluently.",
    source: "UNESCO UIS",
  },
  {
    value: 52,
    suffix: "%",
    decimals: 0,
    label: "of northern girls out of school",
    sub: "Girls' primary net attendance in the North-East & North-West is barely 47%.",
    source: "UNICEF Nigeria",
  },
];

// Education's share of the national budget vs the international benchmark.
const BUDGET = [
  { label: "Nigeria's budget share", pct: 7.9, note: "2024 federal budget", accent: false },
  { label: "UNESCO recommended minimum", pct: 15, note: "15–20% benchmark", accent: true },
];

function useInView() {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    // IntersectionObserver handles nested scroll containers (the app scrolls
    // inside a wrapper, not the window), firing when the section enters view.
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } },
      { threshold: 0.12 }
    );
    io.observe(el);
    const vh = () => window.innerHeight || document.documentElement.clientHeight;
    const visible = () => {
      const r = el.getBoundingClientRect();
      return r.top < vh() && r.bottom > 0;
    };
    // Fire immediately if already on screen at mount.
    if (visible()) { setSeen(true); io.disconnect(); return; }
    // Safety net: catch the first scroll on any container (capture phase),
    // in case the observer doesn't fire in an unusual scroll context.
    const onScroll = () => { if (visible()) { setSeen(true); cleanup(); } };
    const cleanup = () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll, true);
    };
    window.addEventListener("scroll", onScroll, { capture: true, passive: true });
    return cleanup;
  }, [seen]);
  return [ref, seen];
}

function Counter({ value, suffix, decimals, run }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf;
    const start = performance.now();
    const dur = 1400;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      setN(value * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, value]);
  return <>{n.toFixed(decimals)}{suffix}</>;
}

export default function NigeriaEducationViz({ dark }) {
  const [ref, seen] = useInView();
  const cream = "rgba(250,249,246,.72)";

  return (
    <section
      ref={ref}
      style={{
        background: T.greenD,
        color: T.cream,
        padding: "clamp(4rem,10vw,7rem) 0",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'DM Sans',sans-serif",
      }}
    >
      {/* subtle glow */}
      <div style={{ position: "absolute", top: "-20%", right: "-10%", width: "40rem", height: "40rem", background: `radial-gradient(circle, ${T.gold}18, transparent 70%)`, pointerEvents: "none" }} />

      <div style={{ maxWidth: "74rem", margin: "0 auto", padding: "0 clamp(1.25rem,5vw,3rem)", position: "relative" }}>
        <div style={{ fontSize: ".76rem", fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: T.goldL, marginBottom: "1rem", display: "flex", alignItems: "center", gap: ".75rem" }}>
          The nation we're building for
          <span style={{ display: "block", height: "1.5px", background: `${T.gold}66`, flex: 1, maxWidth: "4rem" }} />
        </div>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,5vw,3.2rem)", fontWeight: 900, letterSpacing: "-.025em", lineHeight: 1.1, marginBottom: "1rem", maxWidth: "20ch" }}>
          A generation is being left behind.
        </h2>
        <p style={{ fontSize: "clamp(1rem,2vw,1.15rem)", color: cream, lineHeight: 1.75, maxWidth: "60ch", marginBottom: "clamp(2.5rem,6vw,4rem)" }}>
          Nigeria carries the largest out-of-school population on earth, and even those in class too often leave without the reading, character, or civic grounding to build a nation. This is the gap we exist to close.
        </p>

        {/* Stat grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,15rem),1fr))", gap: "clamp(1rem,3vw,1.5rem)", marginBottom: "clamp(2.5rem,6vw,4rem)" }}>
          {FIGURES.map((f) => (
            <div key={f.label} style={{ background: "rgba(250,249,246,.04)", border: `1px solid ${T.gold}22`, borderRadius: 18, padding: "clamp(1.4rem,3vw,1.8rem)", display: "flex", flexDirection: "column", gap: ".4rem" }}>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2.4rem,6vw,3.4rem)", fontWeight: 900, color: T.goldL, lineHeight: 1 }}>
                <Counter value={f.value} suffix={f.suffix} decimals={f.decimals} run={seen} />
              </div>
              <div style={{ fontWeight: 800, fontSize: "1rem", color: T.cream }}>{f.label}</div>
              <div style={{ fontSize: ".85rem", color: cream, lineHeight: 1.55, flex: 1 }}>{f.sub}</div>
              <div style={{ fontSize: ".7rem", color: "rgba(250,249,246,.4)", marginTop: ".3rem", letterSpacing: ".02em" }}>Source: {f.source}</div>
            </div>
          ))}
        </div>

        {/* Budget bars */}
        <div style={{ background: "rgba(250,249,246,.04)", border: `1px solid ${T.gold}22`, borderRadius: 18, padding: "clamp(1.6rem,4vw,2.4rem)" }}>
          <div style={{ fontWeight: 800, fontSize: "1.05rem", marginBottom: ".4rem" }}>What Nigeria spends on education</div>
          <div style={{ fontSize: ".85rem", color: cream, marginBottom: "1.6rem" }}>
            Share of the national budget — measured against the UNESCO-recommended minimum.
          </div>
          {BUDGET.map((b) => {
            const w = seen ? `${(b.pct / 20) * 100}%` : "0%";
            return (
              <div key={b.label} style={{ marginBottom: "1.1rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: ".4rem", flexWrap: "wrap", gap: ".3rem" }}>
                  <span style={{ fontSize: ".9rem", fontWeight: 700, color: b.accent ? T.goldL : T.cream }}>{b.label}</span>
                  <span style={{ fontSize: ".78rem", color: "rgba(250,249,246,.45)" }}>{b.note}</span>
                </div>
                <div style={{ background: "rgba(250,249,246,.08)", borderRadius: 999, height: 14, overflow: "hidden" }}>
                  <div style={{ width: w, height: "100%", borderRadius: 999, background: b.accent ? `linear-gradient(90deg, ${T.gold}, ${T.goldL})` : "rgba(250,249,246,.35)", transition: "width 1.3s cubic-bezier(.22,1,.36,1)" }} />
                </div>
                <div style={{ textAlign: "right", fontSize: ".8rem", fontWeight: 800, color: b.accent ? T.goldL : T.cream, marginTop: ".25rem" }}>{b.pct}%</div>
              </div>
            );
          })}
          <div style={{ fontSize: ".7rem", color: "rgba(250,249,246,.4)", marginTop: ".6rem" }}>
            Sources: Federal budget 2024; UNESCO Education 2030 benchmark.
          </div>
        </div>

        {/* Values framing */}
        <div style={{ marginTop: "clamp(2rem,5vw,3rem)", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,18rem),1fr))", gap: "1.25rem", alignItems: "stretch" }}>
          <div style={{ background: `linear-gradient(135deg, ${T.gold}1a, transparent)`, border: `1px solid ${T.gold}33`, borderRadius: 18, padding: "clamp(1.5rem,4vw,2rem)" }}>
            <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: "1.3rem", color: T.goldL, marginBottom: ".6rem" }}>
              It isn't only a learning crisis — it's a values crisis.
            </div>
            <p style={{ fontSize: ".92rem", color: cream, lineHeight: 1.7, margin: 0 }}>
              Test scores measure part of the gap. The rest is character: integrity, service, and a sense of purpose. Nigeria consistently ranks among the countries where citizens name corruption a top national problem — a signal that raising children of <strong style={{ color: T.cream }}>character</strong>, not just credentials, is nation-building work.
            </p>
          </div>
          <div style={{ background: "rgba(250,249,246,.04)", border: `1px solid ${T.gold}22`, borderRadius: 18, padding: "clamp(1.5rem,4vw,2rem)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ fontWeight: 800, fontSize: "1.05rem", marginBottom: ".6rem", color: T.cream }}>Our answer</div>
            <p style={{ fontSize: ".92rem", color: cream, lineHeight: 1.7, margin: 0 }}>
              We raise <strong style={{ color: T.goldL }}>GoDs — Geniuses with divine purpose</strong> — pairing academic excellence with daily character formation, so the next generation is equipped to build the nation these numbers describe.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
