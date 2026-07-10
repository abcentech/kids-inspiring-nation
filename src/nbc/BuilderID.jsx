import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Download, Share2, Sparkles, ArrowRight, RefreshCw, Check, Camera, User } from "lucide-react";
import NBCEmblem from "./NBCEmblem.jsx";
import { C, PILLARS, STATES, NBC, makeBuilderId } from "./nbcBrand.js";
import { CREST_SVG, svgToImage, roundRect } from "./crestSvg.js";
import { addBuilder } from "./builderRoster.js";
import { myShareLink, bumpInviteCount, inviteCount } from "./referral.js";
import { trackEvent } from "../analytics.js";

const STORE = "nbc_builder_v1";
const YEAR = 2026;
const PHOTO_SIZE = 320; // stored square, downscaled client-side before it ever touches localStorage

// Downscale + center-crop a File to a square JPEG data URL so we never store
// a multi-megabyte phone photo in localStorage.
function fileToSquareDataUrl(file, size = PHOTO_SIZE) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      img.onerror = reject;
      img.onload = () => {
        const side = Math.min(img.width, img.height);
        const sx = (img.width - side) / 2;
        const sy = (img.height - side) / 2;
        const cv = document.createElement("canvas");
        cv.width = size; cv.height = size;
        const ctx = cv.getContext("2d");
        ctx.drawImage(img, sx, sy, side, side, 0, 0, size, size);
        resolve(cv.toDataURL("image/jpeg", 0.86));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

export default function BuilderID() {
  const [name, setName] = useState("");
  const [stateSel, setStateSel] = useState("");
  const [pillar, setPillar] = useState(PILLARS[0].key);
  const [photo, setPhoto] = useState("");
  const [issued, setIssued] = useState("");
  const [saved, setSaved] = useState(false);
  const [busy, setBusy] = useState(false);
  const [shared, setShared] = useState(false);
  const [invites, setInvites] = useState(0);
  const fileRef = useRef(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORE);
      if (raw) {
        const d = JSON.parse(raw);
        setName(d.name || ""); setStateSel(d.state || ""); setPillar(d.pillar || PILLARS[0].key);
        setPhoto(d.photo || ""); setIssued(d.issued || ""); setSaved(true);
      }
    } catch { /* ignore */ }
    setInvites(inviteCount());
  }, []);

  const id = makeBuilderId(name || "builder", YEAR);
  const pillarObj = PILLARS.find((p) => p.key === pillar) || PILLARS[0];
  const displayName = (name || "Your Name").trim();

  const monthYear = () => {
    try {
      return new Intl.DateTimeFormat("en-GB", { month: "short", year: "numeric" }).format(new Date());
    } catch { return `Jul ${YEAR}`; }
  };

  const pickPhoto = () => fileRef.current?.click();
  const onPhotoChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await fileToSquareDataUrl(file);
      setPhoto(dataUrl);
    } catch { /* ignore bad file */ }
  };

  const generate = () => {
    if (!name.trim()) return;
    const stamp = issued || monthYear();
    setIssued(stamp);
    const record = { name: name.trim(), state: stateSel, pillar, photo, issued: stamp, id };
    try { localStorage.setItem(STORE, JSON.stringify(record)); } catch { /* ignore */ }
    addBuilder({ name: name.trim(), state: stateSel || "Nigeria", pillar, id });
    trackEvent("nbc_builder_id_generated", { state: stateSel || "unknown", pillar, hasPhoto: !!photo });
    setSaved(true);
  };

  const reset = () => { setSaved(false); setShared(false); };

  // Render the card to a high-res PNG blob — same layout as the live preview.
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

    // Header: crest + wordmark
    try { const crest = await svgToImage(CREST_SVG); ctx.drawImage(crest, 60, 56, 72, 72); } catch { /* ignore */ }
    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = "#E6C98F";
    ctx.font = "800 24px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("NATION BUILDERS CORPS", 148, 84);
    ctx.fillStyle = "rgba(250,249,246,0.55)";
    ctx.font = "500 17px 'DM Sans', sans-serif";
    ctx.fillText(`Class of ${YEAR}  ·  ${NBC.motto}`, 148, 110);

    // Photo — circular, or a placeholder disc with the initial
    const px = 60, py = 168, pd = 168, pr = pd / 2;
    ctx.save();
    ctx.beginPath(); ctx.arc(px + pr, py + pr, pr, 0, Math.PI * 2); ctx.closePath(); ctx.clip();
    if (photo) {
      try {
        const img = await loadRasterImage(photo);
        ctx.drawImage(img, px, py, pd, pd);
      } catch {
        ctx.fillStyle = "#0F3322"; ctx.fillRect(px, py, pd, pd);
      }
    } else {
      ctx.fillStyle = "#0F3322"; ctx.fillRect(px, py, pd, pd);
    }
    ctx.restore();
    ctx.strokeStyle = "rgba(230,201,143,0.55)"; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.arc(px + pr, py + pr, pr, 0, Math.PI * 2); ctx.stroke();
    if (!photo) {
      ctx.fillStyle = "#E6C98F";
      ctx.font = "900 64px 'Playfair Display', serif";
      ctx.textAlign = "center";
      ctx.fillText(displayName.charAt(0).toUpperCase(), px + pr, py + pr + 22);
      ctx.textAlign = "left";
    }

    // Name + ID, to the right of the photo
    const tx = px + pd + 40;
    ctx.fillStyle = "#FAF9F6";
    ctx.font = "900 48px 'Playfair Display', serif";
    ctx.fillText(displayName.slice(0, 20), tx, 240);
    ctx.fillStyle = "#E6C98F";
    ctx.font = "500 26px 'DM Mono', monospace";
    ctx.fillText(id, tx, 282);

    // Meta row under photo/name block
    ctx.fillStyle = "rgba(250,249,246,0.5)";
    ctx.font = "700 15px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("STATE", tx, 320);
    ctx.fillText("PILLAR", tx + 240, 320);
    ctx.fillStyle = "#FAF9F6";
    ctx.font = "700 22px 'DM Sans', sans-serif";
    ctx.fillText(stateSel || "Nigeria", tx, 350);
    ctx.fillText(pillarObj.key, tx + 240, 350);

    // Footer motto / signature
    ctx.strokeStyle = "rgba(230,201,143,0.25)"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(60, 500); ctx.lineTo(W - 60, 500); ctx.stroke();
    ctx.fillStyle = "rgba(250,249,246,0.6)";
    ctx.font = "italic 500 22px 'Playfair Display', serif";
    ctx.fillText("“I am a Nation Builder.”", 60, 550);
    ctx.fillStyle = "#E6C98F";
    ctx.font = "700 18px 'Plus Jakarta Sans', sans-serif";
    ctx.textAlign = "right";
    ctx.fillText("nbc.kidsinspiringnation.org", W - 60, 550);
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
      const link = myShareLink("/NBC"); // carries my Builder ID as ?ref=
      const text = `I just became a Nation Builder 🇳🇬 ${id}. Join me — build the Nigeria you want to see. ${link}`;
      trackEvent("nbc_builder_id_share", { id });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], text, title: "I'm a Nation Builder", url: link });
        bumpInviteCount(); setInvites(inviteCount());
        setShared(true);
      } else {
        await navigator.clipboard.writeText(text);
        bumpInviteCount(); setInvites(inviteCount());
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
                {/* Photo picker */}
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <input ref={fileRef} type="file" accept="image/*" onChange={onPhotoChange} style={{ display: "none" }} />
                  <button type="button" onClick={pickPhoto}
                    style={{ width: 72, height: 72, borderRadius: "50%", flexShrink: 0, position: "relative", overflow: "hidden",
                      border: `2px solid ${photo ? C.gold : "rgba(250,249,246,.25)"}`, background: "rgba(255,255,255,.05)",
                      display: "grid", placeItems: "center", cursor: "pointer", padding: 0 }}>
                    {photo ? (
                      <img src={photo} alt="Your photo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <User size={28} color="rgba(250,249,246,.4)" />
                    )}
                    <div style={{ position: "absolute", bottom: 0, insetInline: 0, background: "rgba(5,20,13,.75)", display: "grid", placeItems: "center", padding: "3px 0" }}>
                      <Camera size={12} color={C.goldL} />
                    </div>
                  </button>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: ".92rem", color: "#FAF9F6" }}>Add your photo</div>
                    <div style={{ fontSize: ".78rem", color: "rgba(250,249,246,.5)" }}>Optional — makes your card feel real.</div>
                  </div>
                </div>
                <div>
                  <label style={lbl}>Your first name</label>
                  <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Amara" style={field} maxLength={22} />
                </div>
                <div>
                  <label style={lbl}>Your state <span style={{ fontWeight: 400, color: "rgba(250,249,246,.4)" }}>(optional)</span></label>
                  <select value={stateSel} onChange={(e) => setStateSel(e.target.value)} style={field}>
                    <option value="">Select your state</option>
                    {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label style={lbl}>The value you'll carry <span style={{ fontWeight: 400, color: "rgba(250,249,246,.4)" }}>(optional)</span></label>
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
                <p style={{ fontSize: ".8rem", color: "rgba(250,249,246,.45)", margin: 0 }}>Free · takes 30 seconds · only your name is required.</p>
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
              {invites > 0 && (
                <p style={{ marginTop: ".9rem", fontSize: ".85rem", color: C.goldL, fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 6 }}>
                  <Sparkles size={14} /> You've invited {invites} {invites === 1 ? "builder" : "builders"} so far — the movement grows with you.
                </p>
              )}
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
        <div style={{ position: "relative", borderRadius: 24, padding: "1.6rem", aspectRatio: "1000 / 630",
          background: "linear-gradient(135deg, #0B2A1B 0%, #08200F 55%, #05140D 100%)",
          border: `1.5px solid rgba(230,201,143,.4)`, boxShadow: "0 30px 70px rgba(0,0,0,.45)", overflow: "hidden" }}>
          <div aria-hidden style={{ position: "absolute", top: -80, right: -60, width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle, rgba(197,160,55,.22), transparent 70%)" }} />
          <div style={{ position: "relative", display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between" }}>
            {/* Header: crest + wordmark */}
            <div style={{ display: "flex", alignItems: "center", gap: ".7rem" }}>
              <NBCEmblem size={40} ring={false} id="card" />
              <div>
                <div style={{ color: C.goldL, fontWeight: 800, fontSize: "clamp(.68rem,1.8vw,.85rem)", letterSpacing: ".04em" }}>NATION BUILDERS CORPS</div>
                <div style={{ color: "rgba(250,249,246,.5)", fontSize: "clamp(.6rem,1.5vw,.72rem)" }}>Class of {YEAR}</div>
              </div>
            </div>

            {/* Photo + name/id row */}
            <div style={{ display: "flex", alignItems: "center", gap: "1.1rem" }}>
              <div style={{ width: "clamp(56px,16vw,88px)", height: "clamp(56px,16vw,88px)", borderRadius: "50%", flexShrink: 0, overflow: "hidden",
                border: `2px solid ${C.gold}88`, background: "#0F3322", display: "grid", placeItems: "center" }}>
                {photo ? (
                  <img src={photo} alt={displayName} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <span style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: "clamp(1.4rem,4vw,2rem)", color: C.goldL }}>
                    {displayName.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, color: C.cream, fontSize: "clamp(1.25rem,4.4vw,2.1rem)", lineHeight: 1.05, wordBreak: "break-word" }}>{displayName}</div>
                <div style={{ fontFamily: "'DM Mono',monospace", color: C.goldL, fontSize: "clamp(.8rem,2.2vw,1.05rem)", marginTop: ".25rem" }}>{id}</div>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "1rem" }}>
              <div style={{ display: "flex", gap: "1.5rem" }}>
                <Meta k="State" v={stateSel || "Nigeria"} />
                <Meta k="Pillar" v={`${pillarObj.emoji} ${pillarObj.key}`} />
              </div>
              <div style={{ fontStyle: "italic", fontFamily: "'Playfair Display',serif", color: "rgba(250,249,246,.6)", fontSize: "clamp(.7rem,1.8vw,.9rem)", textAlign: "right" }}>"I am a<br />Nation Builder."</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function loadRasterImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
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
