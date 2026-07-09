import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { T } from "../../siteConfig.js";
import { C } from "../nbcBrand.js";
import { NAV_H } from "../NBCShell.jsx";

// Shared building blocks for the audience hubs (Students / Advisors / Schools).
// Everything here is themeable via the `dark` prop and leans on lightweight
// CSS 3D (mouse-tilt cards) — no heavy dependency.

export const surfaces = (dark) =>
  dark
    ? { bg: T.bgD, surf: T.srfD, brd: T.brdD, txt: T.d1, sub: T.d2 }
    : { bg: T.cream, surf: "#FFFFFF", brd: "rgba(11,42,27,.07)", txt: T.green, sub: T.greenM };

export const WRAP = { maxWidth: "72rem", margin: "0 auto", padding: "0 clamp(1.25rem,4vw,2.5rem)" };

export const Eyebrow = ({ children, center }) => (
  <div style={{ display: "inline-flex", alignItems: "center", gap: 12, color: C.gold, fontWeight: 800, letterSpacing: ".16em", textTransform: "uppercase", fontSize: ".74rem", justifyContent: center ? "center" : "flex-start" }}>
    <span style={{ width: 34, height: 2, background: C.gold }} /> {children}
  </div>
);

// Dark, branded hero that sits flush under the fixed shell nav.
export function HubHero({ eyebrow, title, accent, sub, children }) {
  return (
    <section style={{ background: C.greenD, color: C.cream, position: "relative", overflow: "hidden", padding: `${NAV_H + 48}px 0 clamp(3rem,7vw,5rem)` }}>
      <div aria-hidden style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 15% 20%, ${C.gold}18 0%, transparent 45%), radial-gradient(circle at 85% 80%, ${C.green}66 0%, transparent 55%), linear-gradient(160deg, ${C.greenD} 0%, ${C.greenM} 60%, ${C.greenD} 100%)` }} />
      <div style={{ ...WRAP, position: "relative", zIndex: 2 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} style={{ maxWidth: "48rem" }}>
          <div style={{ marginBottom: "1.4rem" }}><Eyebrow>{eyebrow}</Eyebrow></div>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: "clamp(2.3rem,6.5vw,4rem)", lineHeight: 1.02, letterSpacing: "-.02em", margin: 0 }}>
            {title} {accent && <em style={{ color: C.goldL, fontStyle: "italic" }}>{accent}</em>}
          </h1>
          {sub && <p style={{ color: "rgba(250,249,246,.82)", fontSize: "clamp(1rem,2.2vw,1.2rem)", lineHeight: 1.6, marginTop: "1.4rem", maxWidth: "38rem" }}>{sub}</p>}
          {children && <div style={{ marginTop: "2rem", display: "flex", flexWrap: "wrap", gap: ".8rem" }}>{children}</div>}
        </motion.div>
      </div>
    </section>
  );
}

export const btnGold = { display: "inline-flex", alignItems: "center", gap: ".5rem", padding: ".85rem 1.6rem", borderRadius: 999, background: C.gold, color: C.greenD, fontWeight: 800, fontSize: ".92rem", textDecoration: "none" };
export const btnGhost = { display: "inline-flex", alignItems: "center", gap: ".5rem", padding: ".85rem 1.6rem", borderRadius: 999, background: "transparent", color: C.cream, fontWeight: 700, fontSize: ".92rem", textDecoration: "none", border: `1px solid ${C.cream}33` };

export function CTA({ to, href, children, ghost }) {
  const style = ghost ? btnGhost : btnGold;
  if (to) return <Link to={to} style={style}>{children} <ArrowRight size={16} /></Link>;
  return <a href={href} target={href?.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" style={style}>{children} <ArrowRight size={16} /></a>;
}

export function Section({ children, dark, alt, id }) {
  const s = surfaces(dark);
  return (
    <section id={id} style={{ background: alt ? (dark ? "#050806" : "#F4F2EC") : s.bg, color: s.txt, padding: "clamp(3.5rem,8vw,6rem) 0", borderTop: `1px solid ${s.brd}` }}>
      <div style={WRAP}>{children}</div>
    </section>
  );
}

export function SectionHead({ eyebrow, title, sub, dark, center }) {
  const s = surfaces(dark);
  return (
    <div style={{ textAlign: center ? "center" : "left", marginBottom: "2.5rem", maxWidth: center ? "42rem" : "none", marginInline: center ? "auto" : undefined }}>
      {eyebrow && <div style={{ marginBottom: ".9rem", display: "flex", justifyContent: center ? "center" : "flex-start" }}><Eyebrow center={center}>{eyebrow}</Eyebrow></div>}
      <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: "clamp(1.7rem,4.5vw,2.6rem)", lineHeight: 1.08, color: s.txt, margin: 0 }}>{title}</h2>
      {sub && <p style={{ color: s.sub, fontSize: "1.02rem", lineHeight: 1.6, marginTop: ".9rem" }}>{sub}</p>}
    </div>
  );
}

// Lightweight CSS-3D card that tilts toward the pointer. Degrades to a static
// card on touch (no pointer) — no library, cheap on low-end devices.
export function TiltCard({ children, dark, style, glow }) {
  const s = surfaces(dark);
  const ref = useRef(null);
  const [t, setT] = useState({ rx: 0, ry: 0, active: false });

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setT({ rx: -py * 8, ry: px * 8, active: true });
  };
  const reset = () => setT({ rx: 0, ry: 0, active: false });

  return (
    <div style={{ perspective: 900 }}>
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={reset}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5 }}
        style={{
          background: s.surf,
          border: `1px solid ${t.active ? `${C.gold}55` : s.brd}`,
          borderRadius: 20,
          padding: "1.6rem",
          transformStyle: "preserve-3d",
          transform: `rotateX(${t.rx}deg) rotateY(${t.ry}deg)`,
          boxShadow: t.active ? `0 22px 50px -20px ${glow || C.green}55` : "0 8px 24px -18px rgba(0,0,0,.4)",
          transition: "border-color .25s, box-shadow .25s",
          height: "100%",
          ...style,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export const grid = (min = 260) => ({ display: "grid", gridTemplateColumns: `repeat(auto-fit, minmax(${min}px, 1fr))`, gap: "1.25rem" });
