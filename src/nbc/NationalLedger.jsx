import { motion } from "framer-motion";
import { useCountUp } from "./useCountUp.js";
import { MOVEMENT, STATES, C } from "./nbcBrand.js";

function Stat({ item }) {
  const [ref, display] = useCountUp(item.value, { decimals: item.suffix === "M" ? 0 : 0 });
  return (
    <div ref={ref} style={{ textAlign: "center" }}>
      <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 900, color: C.goldL, fontSize: "clamp(2.6rem,7vw,4.2rem)", lineHeight: 1, letterSpacing: "-0.02em" }}>
        {item.prefix || ""}{display}{item.suffix || ""}
      </div>
      <div style={{ color: C.cream, fontWeight: 800, marginTop: ".6rem", fontSize: "1.05rem" }}>{item.label}</div>
      <div style={{ color: "rgba(250,249,246,.5)", fontSize: ".85rem", marginTop: ".2rem" }}>{item.sub}</div>
    </div>
  );
}

export default function NationalLedger() {
  return (
    <section id="movement" style={{ background: C.greenD, color: C.cream, padding: "clamp(4rem,9vw,7rem) 0", position: "relative", overflow: "hidden" }}>
      <div aria-hidden style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 50% 0%, ${C.gold}14, transparent 55%)` }} />
      <div style={{ maxWidth: "74rem", margin: "0 auto", padding: "0 2rem", position: "relative" }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, color: C.goldL, fontWeight: 800, letterSpacing: ".14em", textTransform: "uppercase", fontSize: ".78rem", marginBottom: "1rem" }}>
            <span style={{ width: 34, height: 2, background: C.gold }} /> The Movement
          </div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,5.5vw,3.4rem)", fontWeight: 900, lineHeight: 1.05 }}>
            One nation, built by its youth.
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 180px), 1fr))", gap: "2.5rem 1rem", marginBottom: "4rem" }}>
          {MOVEMENT.map((m) => <Stat key={m.key} item={m} />)}
        </div>

        {/* States presence grid */}
        <div style={{ maxWidth: "56rem", margin: "0 auto", textAlign: "center" }}>
          <p style={{ color: "rgba(250,249,246,.6)", fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", fontSize: ".78rem", marginBottom: "1.5rem" }}>Open across all 36 states + FCT</p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: ".5rem" }}>
            {STATES.map((s, i) => (
              <motion.span key={s} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: (i % 12) * 0.03 }}
                style={{ padding: ".4rem .8rem", borderRadius: 999, fontSize: ".82rem", fontWeight: 600,
                  border: `1px solid rgba(230,201,143,.22)`, background: "rgba(197,160,55,.08)", color: "rgba(250,249,246,.82)" }}>
                {s}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
