import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Download, Share2, Sparkles, ArrowRight, RefreshCw, Check } from "lucide-react";
import NBCEmblem from "./NBCEmblem.jsx";
import { C, PILLARS, STATES, NBC, makeBuilderId } from "./nbcBrand.js";
import { CREST_SVG, svgToImage, roundRect } from "./crestSvg.js";
import { addBuilder } from "./builderRoster.js";
import { SITE } from "../siteConfig.js";
import { trackEvent } from "../analytics.js";

const STORE = "nbc_builder_v1";
const YEAR = 2026;

export default function BuilderID() {
  const [name, setName] = useState("");
  const [stateSel, setStateSel] = useState("");
  const [pillar, setPillar] = useState(PILLARS[0].key);
  const [issued, setIssued] = useState("");
  const [saved, setSaved] = useState(false);
  const [busy, setBusy] = useState(false);
  const [shared, setShared] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORE);
      if (raw) {
        const d = JSON.parse(raw);
        setName(d.name || ""); setStateSel(d.state || ""); setPillar(d.pillar || PILLARS[0].key);
        setIssued(d.issued || ""); setSaved(true);
      }
    } catch { /* ignore */ }
  }, []);

  const id = makeBuilderId(name || "builder", YEAR);
  const pillarObj = PILLARS.find((p) => p.key === pillar) || PILLARS[0];
  const displayName = (name || "Your Name").trim();

  const monthYear = () => {
    try {
      return new Intl.DateTimeFormat("en-GB", { month: "short", year: "numeric" }).format(new Date());
    } catch { return `Jul ${YEAR}`; }
  };

  const generate = () => {
    if (!name.trim()) return;
    const stamp = issued || monthYear();
    setIssued(stamp);
    const record = { name: name.trim(), state: stateSel, pillar, issued: stamp, id };
    try { localStorage.setItem(STORE, JSON.stringify(record)); } catch { /* ignore */ }
    addBuilder({ name: name.trim(), state: stateSel || "Nigeria", pillar, id });
    trackEvent("nbc_builder_id_generated", { state: stateSel || "unknown", pillar });
    setSaved(true);
  };

  const reset = () => { setSaved(false); setShared(false); };

  // Render the card to a high-res PNG blob.
  const renderCard = async () => {
    const W = 1000, H = 630, S = 2;
    const cv = document.createElement("canvas");
    cv.width = W * S; cv.height = H * S;
    const ctx = cv.getContext("2d");
    ctx.scale(S, S);
    try { await document.fonts?.ready; } catch { /* ignore */ }

    // Background
    const bg = ctx.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0, "#0B2A1B"); bg.addColorStop(0.55, "#08200F"); bg.addColorStop(1, "#05140D");
    ctx.fillStyle = bg; roundRect(ctx, 0, 0, W, H, 40); ctx.fill();

    // Gold glow corner
    const rg = ctx.createRadialGradient(W - 120, 120, 20, W - 120, 120, 340);
    rg.addColorStop(0, "rgba(197,160,55,0.22)"); rg.addColorStop(1, "rgba(197,160,55,0)");
    ctx.fillStyle = rg; roundRect(ctx, 0, 0, W, H, 40); ctx.fill();

    // Inner gold border
    ctx.strokeStyle = "rgba(230,201,143,0.5)"; ctx.lineWidth = 2;
    roundRect(ctx, 26, 26, W - 52, H - 52, 26); ctx.stroke();

    // Crest
    try { const crest = await svgToImage(CREST_SVG); ctx.drawImage(crest, 60, 70, 150, 150); } catch { /* ignore */ }

    // Header text
    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = "#E6C98F";
    ctx.font = "800 26px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("NATION BUILDERS CORP", 240, 110);
    ctx.fillStyle = "rgba(250,249,246,0.55)";
    ctx.font = "500 20px 'DM Sans', sans-serif";
    ctx.fillText(`Class of ${YEAR}  ·  ${NBC.motto}`, 240, 142);

    // Name
    ctx.fillStyle = "#FAF9F6";
    ctx.font = "900 62px 'Playfair Display', serif";
    ctx.fillText(displayName.slice(0, 22), 60, 330);

    // ID
    ctx.fillStyle = "#E6C98F";
    ctx.font = "500 30px 'DM Mono', monospace";
    ctx.fillText(id, 62, 380);

    // Meta row
    ctx.fillStyle = "rgba(250,249,246,0.5)";
    ctx.font = "700 16px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("STATE", 62, 445);
    ctx.fillText("PILLAR", 320, 445);
    ctx.fillStyle = "#FAF9F6";
    ctx.font = "700 26px 'DM Sans', sans-serif";
    ctx.fillText(stateSel || "Nigeria", 62, 478);
    ctx.fillText(pillarObj.key, 320, 478);

    // Footer motto / signature
    ctx.strokeStyle = "rgba(230,201,143,0.25)"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(62, 540); ctx.lineTo(W - 62, 540); ctx.stroke();
    ctx.fillStyle = "rgba(250,249,246,0.6)";
    ctx.font = "italic 500 22px 'Playfair Display', serif";
    ctx.fillText("“I am a Nation Builder.”", 62, 585);
    ctx.fillStyle = "#E6C98F";
    ctx.font = "700 18px 'Plus Jakarta Sans', sans-serif";
    ctx.textAlign = "right";
    ctx.fillText("nbc.kidsinspiringnation.org", W - 62, 585);
    ctx.textAlign = "left";

    return new Promise((res) => cv.toBlob((b) => res(b), "image/png"));
  };

  const download = async () => {
    setBusy(true);
    try {
      const blob = await renderCard();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = `${id}-nation-builder.png`; a.click();
      URL.revokeObjectURL(url);
      trackEvent("nbc_builder_id_download", { id });
    } finally { setBusy(false); }
  };

  const share = async () => {
    setBusy(true);
    try {
      const blob = await renderCard();
      const file = new File([blob], `${id}.png`, { type: "image/png" });
      const text = `I just became a Nation Builder 🇳🇬 ${id}. Join me — build the Nigeria you want to see.`;
      trackEvent("nbc_builder_id_share", { id });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], text, title: "I'm a Nation Builder" });
        setShared(true);
      } else {
        await navigator.clipboard.writeText(`${text} ${SITE.siteUrl}/NBC`);
        setShared(true); setTimeout(() => setShared(false), 2200);
        await download();
      }
    } catch { /* user cancelled */ } finally { setBusy(false); }
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))", gap: "2.5rem", alignItems: "center" }}>
      {/* Controls */}
      <div>
        <AnimatePresence mode="wait">
          {!saved ? (
            <motion.div key="form" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
                <div>
                  <label style={lbl}>Your first name</label>
                  <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Amara" style={field} maxLength={22} />
                </div>
                <div>
                  <label style={lbl}>Your state</label>
                  <select value={stateSel} onChange={(e) => setStateSel(e.target.value)} style={field}>
                    <option value="">Select your state</option>
                    {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label style={lbl}>The value you'll carry</label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {PILLARS.map((p) => (
                      <button key={p.key} type="button" onClick={() => setPillar(p.key)}
                        style={{ padding: ".5rem .85rem", borderRadius: 999, cursor: "pointer", fontWeight: 700, fontSize: ".82rem",
                          border: `1.5px solid ${pillar === p.key ? C.gold : "rgba(250,249,246,.18)"}`,
                          background: pillar === p.key ? "rgba(197,160,55,.16)" : "transparent",
                          color: pillar === p.key ? C.goldL : "rgba(250,249,246,.7)" }}>
                        {p.emoji} {p.key}
                      </button>
                    ))}
                  </div>
                </div>
                <button onClick={generate} disabled={!name.trim()}
                  style={{ marginTop: ".5rem", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
                    padding: "1.1rem 2rem", borderRadius: 999, border: "none", fontWeight: 800, fontSize: "1.05rem",
                    cursor: name.trim() ? "pointer" : "not-allowed",
                    background: name.trim() ? C.gold : "rgba(250,249,246,.12)", color: name.trim() ? "#14532d" : "rgba(250,249,246,.4)" }}>
                  <Sparkles size={18} /> Generate my Builder ID
                </button>
                <p style={{ fontSize: ".8rem", color: "rgba(250,249,246,.45)", margin: 0 }}>Free · takes 30 seconds · no sign-up needed to start.</p>
              </div>
            </motion.div>
          ) : (
            <motion.div key="done" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, color: C.goldL, fontWeight: 800, letterSpacing: ".1em", textTransform: "uppercase", fontSize: ".78rem", marginBottom: ".75rem" }}>
                <Check size={16} /> You're in
              </div>
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.6rem,4vw,2.4rem)", fontWeight: 900, color: C.cream, lineHeight: 1.1, margin: "0 0 .75rem" }}>
                Welcome, Builder.<br /><span style={{ color: C.goldL }}>{id}</span>
              </h3>
              <p style={{ color: "rgba(250,249,246,.75)", lineHeight: 1.6, marginBottom: "1.5rem", maxWidth: "40ch" }}>
                Your card is ready. Share it, then take the pledge for real — register your project and start the free course.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: ".75rem" }}>
                <button onClick={share} disabled={busy} style={btn(C.gold, "#14532d")}>
                  {shared ? <><Check size={17} /> Shared</> : <><Share2 size={17} /> Share my card</>}
                </button>
                <button onClick={download} disabled={busy} style={btn("rgba(250,249,246,.1)", C.cream, true)}>
                  <Download size={17} /> {busy ? "Rendering…" : "Download"}
                </button>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "1.5rem" }}>
                <Link to="/NBC/register" style={{ color: C.goldL, fontWeight: 800, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}>Register your project <ArrowRight size={15} /></Link>
                <Link to="/nbc/course" style={{ color: "rgba(250,249,246,.7)", fontWeight: 700, textDecoration: "none" }}>Start the course</Link>
                <button onClick={reset} style={{ background: "none", border: "none", color: "rgba(250,249,246,.5)", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 5, fontSize: ".9rem" }}><RefreshCw size={13} /> Edit</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Live card preview */}
      <motion.div initial={{ opacity: 0, scale: 0.95, rotate: -1 }} whileInView={{ opacity: 1, scale: 1, rotate: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 120, damping: 16 }}>
        <div style={{ position: "relative", borderRadius: 24, padding: "1.75rem", aspectRatio: "1000 / 630",
          background: "linear-gradient(135deg, #0B2A1B 0%, #08200F 55%, #05140D 100%)",
          border: `1.5px solid rgba(230,201,143,.4)`, boxShadow: "0 30px 70px rgba(0,0,0,.45)", overflow: "hidden" }}>
          <div aria-hidden style={{ position: "absolute", top: -80, right: -60, width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle, rgba(197,160,55,.22), transparent 70%)" }} />
          <div style={{ position: "relative", display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <NBCEmblem size={64} ring={false} id="card" />
              <div>
                <div style={{ color: C.goldL, fontWeight: 800, fontSize: "clamp(.8rem,2.2vw,1rem)", letterSpacing: ".04em" }}>NATION BUILDERS CORP</div>
                <div style={{ color: "rgba(250,249,246,.55)", fontSize: "clamp(.7rem,1.8vw,.85rem)" }}>Class of {YEAR}</div>
              </div>
            </div>
            <div>
              <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, color: C.cream, fontSize: "clamp(1.5rem,5vw,2.6rem)", lineHeight: 1 }}>{displayName}</div>
              <div style={{ fontFamily: "'DM Mono',monospace", color: C.goldL, fontSize: "clamp(.9rem,2.6vw,1.25rem)", marginTop: ".35rem" }}>{id}</div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "1rem" }}>
              <div style={{ display: "flex", gap: "1.5rem" }}>
                <Meta k="State" v={stateSel || "Nigeria"} />
                <Meta k="Pillar" v={`${pillarObj.emoji} ${pillarObj.key}`} />
              </div>
              <div style={{ fontStyle: "italic", fontFamily: "'Playfair Display',serif", color: "rgba(250,249,246,.6)", fontSize: "clamp(.75rem,2vw,1rem)", textAlign: "right" }}>"I am a<br />Nation Builder."</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function Meta({ k, v }) {
  return (
    <div>
      <div style={{ color: "rgba(250,249,246,.45)", fontWeight: 800, fontSize: "clamp(.6rem,1.6vw,.72rem)", textTransform: "uppercase", letterSpacing: ".08em" }}>{k}</div>
      <div style={{ color: C.cream, fontWeight: 700, fontSize: "clamp(.8rem,2.2vw,1.05rem)" }}>{v}</div>
    </div>
  );
}

const lbl = { display: "block", fontSize: ".72rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: ".06em", color: "rgba(250,249,246,.55)", marginBottom: ".45rem" };
const field = { width: "100%", padding: ".9rem 1.1rem", borderRadius: 14, border: "1.5px solid rgba(250,249,246,.18)", background: "rgba(255,255,255,.05)", color: "#FAF9F6", fontSize: "1rem", outline: "none", fontFamily: "inherit" };
function btn(bg, color, ghost) {
  return { display: "inline-flex", alignItems: "center", gap: 8, padding: ".9rem 1.6rem", borderRadius: 999, border: ghost ? "1.5px solid rgba(250,249,246,.2)" : "none", background: bg, color, fontWeight: 800, fontSize: ".95rem", cursor: "pointer" };
}
