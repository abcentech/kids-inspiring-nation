import { Fragment, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { getWall, WALL_EVENT } from "./builderRoster.js";
import { PILLARS, STATES, C } from "./nbcBrand.js";

const emojiFor = (p) => PILLARS.find((x) => x.key === p)?.emoji || "⭐";

// A real builder: the visitor's own card, gold.
function BuilderChip({ b }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: ".7rem", padding: ".7rem 1.1rem", borderRadius: 16, whiteSpace: "nowrap",
      background: "rgba(197,160,55,.18)", border: `1px solid ${C.gold}` }}>
      <span style={{ fontSize: "1.1rem" }}>{emojiFor(b.pillar)}</span>
      <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.2 }}>
        <span style={{ fontWeight: 800, color: C.goldL, fontSize: ".95rem" }}>
          {b.name}<span style={{ marginLeft: 6, fontSize: ".68rem", background: C.gold, color: "#14532d", padding: "1px 7px", borderRadius: 999, verticalAlign: "middle" }}>YOU</span>
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 3, color: "rgba(250,249,246,.6)", fontSize: ".72rem", fontFamily: "'DM Mono',monospace" }}>
          <MapPin size={10} /> {b.state} · {b.id}
        </span>
      </span>
    </div>
  );
}

// An open seat: one per state. Honest about being empty, and an invitation to fill it.
function SeatChip({ state, taken }) {
  return (
    <a href="#join" style={{ display: "inline-flex", alignItems: "center", gap: ".6rem", padding: ".7rem 1.1rem", borderRadius: 16, whiteSpace: "nowrap", textDecoration: "none",
      background: taken ? "rgba(197,160,55,.10)" : "transparent", border: `1px dashed ${taken ? C.gold : "rgba(230,201,143,.28)"}` }}>
      <MapPin size={14} color={taken ? C.goldL : "rgba(250,249,246,.45)"} />
      <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.2 }}>
        <span style={{ fontWeight: 800, color: taken ? C.goldL : C.cream, fontSize: ".92rem" }}>{state}</span>
        <span style={{ color: "rgba(250,249,246,.5)", fontSize: ".7rem", fontFamily: "'DM Mono',monospace", letterSpacing: ".04em" }}>
          {taken ? "YOUR SEAT" : "SEAT OPEN · CLAIM IT"}
        </span>
      </span>
    </a>
  );
}

function Row({ children, reverse }) {
  return (
    <div style={{ display: "flex", overflow: "hidden", maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)", WebkitMaskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)" }}>
      <motion.div
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        style={{ display: "flex", gap: ".75rem", paddingRight: ".75rem", flexShrink: 0 }}>
        <Fragment key="a">{children}</Fragment><Fragment key="b">{children}</Fragment>
      </motion.div>
    </div>
  );
}

export default function WallOfBuilders() {
  const [wall, setWall] = useState(() => getWall());
  useEffect(() => {
    const on = () => setWall(getWall());
    window.addEventListener(WALL_EVENT, on);
    return () => window.removeEventListener(WALL_EVENT, on);
  }, []);
  const me = wall[0];
  const mid = Math.ceil(STATES.length / 2);
  const seat = (s) => <SeatChip key={s} state={s} taken={!!me && me.state === s} />;

  return (
    <section id="wall" style={{ background: C.greenD, color: C.cream, padding: "clamp(4rem,9vw,7rem) 0", position: "relative", overflow: "hidden", borderTop: `1px solid ${C.gold}18` }}>
      <div style={{ maxWidth: "74rem", margin: "0 auto", padding: "0 clamp(1.25rem,4vw,2.5rem)" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, color: C.goldL, fontWeight: 800, letterSpacing: ".14em", textTransform: "uppercase", fontSize: ".76rem", marginBottom: "1rem" }}>
            <span style={{ width: 34, height: 2, background: C.gold }} /> The Wall of Builders
          </div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.9rem,5vw,3rem)", fontWeight: 900, lineHeight: 1.05 }}>
            Every state has a seat. Claim yours.
          </h2>
          <p style={{ color: "rgba(250,249,246,.65)", fontSize: "1.02rem", marginTop: ".6rem", maxWidth: "56ch", marginInline: "auto" }}>
            {me
              ? <>You're on the wall, {me.name}. Now bring a friend from another state, and fill another seat.</>
              : <>This wall only shows builders who have actually taken the oath. No invented names. Take it in 30 seconds and your name goes up.</>}
          </p>
        </motion.div>
        {me && <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}><BuilderChip b={me} /></div>}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: ".75rem" }}>
        <Row>{STATES.slice(0, mid).map(seat)}</Row>
        <Row reverse>{STATES.slice(mid).map(seat)}</Row>
      </div>
      <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
        <a href="#join" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: ".9rem 2rem", borderRadius: 999, background: C.gold, color: "#14532d", fontWeight: 800, textDecoration: "none" }}>
          {me ? "Update my Builder ID" : "Take the oath and claim a seat"}
        </a>
      </div>
    </section>
  );
}
