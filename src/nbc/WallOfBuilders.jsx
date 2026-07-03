import { useMemo } from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { getWall } from "./builderRoster.js";
import { PILLARS, C } from "./nbcBrand.js";

const emojiFor = (p) => PILLARS.find((x) => x.key === p)?.emoji || "⭐";

function Chip({ b }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: ".7rem", padding: ".7rem 1.1rem", borderRadius: 16, whiteSpace: "nowrap",
      background: b.you ? "rgba(197,160,55,.18)" : "rgba(255,255,255,.05)",
      border: `1px solid ${b.you ? C.gold : "rgba(230,201,143,.16)"}` }}>
      <span style={{ fontSize: "1.1rem" }}>{emojiFor(b.pillar)}</span>
      <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.2 }}>
        <span style={{ fontWeight: 800, color: b.you ? C.goldL : C.cream, fontSize: ".95rem" }}>
          {b.name}{b.you && <span style={{ marginLeft: 6, fontSize: ".68rem", background: C.gold, color: "#14532d", padding: "1px 7px", borderRadius: 999, verticalAlign: "middle" }}>YOU</span>}
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 3, color: "rgba(250,249,246,.5)", fontSize: ".72rem", fontFamily: "'DM Mono',monospace" }}>
          <MapPin size={10} /> {b.state} · {b.id}
        </span>
      </span>
    </div>
  );
}

function Row({ items, reverse }) {
  const doubled = [...items, ...items];
  return (
    <div style={{ display: "flex", overflow: "hidden", maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)", WebkitMaskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)" }}>
      <motion.div
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        style={{ display: "flex", gap: ".75rem", paddingRight: ".75rem", flexShrink: 0 }}>
        {doubled.map((b, i) => <Chip key={i} b={b} />)}
      </motion.div>
    </div>
  );
}

export default function WallOfBuilders() {
  const wall = useMemo(() => getWall(), []);
  const mid = Math.ceil(wall.length / 2);
  const top = wall.slice(0, mid);
  const bottom = wall.slice(mid).concat(wall.slice(0, Math.max(0, 6 - (wall.length - mid))));

  return (
    <section id="wall" style={{ background: C.greenD, color: C.cream, padding: "clamp(4rem,9vw,7rem) 0", position: "relative", overflow: "hidden", borderTop: `1px solid ${C.gold}18` }}>
      <div style={{ maxWidth: "74rem", margin: "0 auto", padding: "0 clamp(1.25rem,4vw,2.5rem)" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, color: C.goldL, fontWeight: 800, letterSpacing: ".14em", textTransform: "uppercase", fontSize: ".76rem", marginBottom: "1rem" }}>
            <span style={{ width: 34, height: 2, background: C.gold }} /> The Wall of Builders
          </div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.9rem,5vw,3rem)", fontWeight: 900, lineHeight: 1.05 }}>
            You're in good company.
          </h2>
          <p style={{ color: "rgba(250,249,246,.6)", fontSize: "1.02rem", marginTop: ".6rem" }}>Young Nigerians who've taken the oath. Add your name in 30 seconds.</p>
        </motion.div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: ".75rem" }}>
        <Row items={top} />
        <Row items={bottom} reverse />
      </div>
      <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
        <a href="#join" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: ".9rem 2rem", borderRadius: 999, background: C.gold, color: "#14532d", fontWeight: 800, textDecoration: "none" }}>
          Add your name to the wall
        </a>
      </div>
    </section>
  );
}
