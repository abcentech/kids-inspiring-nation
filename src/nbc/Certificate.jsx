import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Award, Download, Share2, Check, Camera, X } from "lucide-react";
import NBCEmblem from "./NBCEmblem.jsx";
import { CREST_SVG, svgToImage, roundRect } from "./crestSvg.js";
import { C, NBC } from "./nbcBrand.js";
import { getMyBuilder } from "./builderRoster.js";
import { SITE } from "../siteConfig.js";
import { trackEvent } from "../analytics.js";

// A shareable certificate minted with the same crest engine as the Builder ID.
// `achievement` is the line under the name, e.g. "has completed the Nation Builders Course".
// Square-crop an uploaded photo to a small JPEG data-URL so it stays light.
function fileToSquareDataUrl(file, size = 320) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const side = Math.min(img.width, img.height);
      const sx = (img.width - side) / 2, sy = (img.height - side) / 2;
      const cv = document.createElement("canvas");
      cv.width = size; cv.height = size;
      cv.getContext("2d").drawImage(img, sx, sy, side, side, 0, 0, size, size);
      URL.revokeObjectURL(url);
      resolve(cv.toDataURL("image/jpeg", 0.85));
    };
    img.onerror = reject;
    img.src = url;
  });
}

export default function Certificate({ achievement = "has completed the Nation Builders Course", eventName = "course_complete" }) {
  const me = getMyBuilder();
  const [name, setName] = useState(me?.name || "");
  const [photo, setPhoto] = useState(me?.photo || "");
  const [busy, setBusy] = useState(false);
  const [shared, setShared] = useState(false);
  const fileRef = useRef(null);
  const who = (name || "Your Name").trim();

  const onPhoto = async (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    try { setPhoto(await fileToSquareDataUrl(f)); } catch { /* ignore */ }
    e.target.value = "";
  };

  const dateStr = () => {
    try { return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(new Date()); }
    catch { return "July 2026"; }
  };

  const render = async () => {
    const W = 1400, H = 990, S = 2;
    const cv = document.createElement("canvas");
    cv.width = W * S; cv.height = H * S;
    const ctx = cv.getContext("2d");
    ctx.scale(S, S);
    try { await document.fonts?.ready; } catch { /* ignore */ }

    // Parchment background
    ctx.fillStyle = "#FAF9F6"; ctx.fillRect(0, 0, W, H);
    const glow = ctx.createRadialGradient(W / 2, 150, 40, W / 2, 150, 700);
    glow.addColorStop(0, "rgba(197,160,55,0.10)"); glow.addColorStop(1, "rgba(197,160,55,0)");
    ctx.fillStyle = glow; ctx.fillRect(0, 0, W, H);

    // Double border
    ctx.strokeStyle = C.green; ctx.lineWidth = 6; roundRect(ctx, 34, 34, W - 68, H - 68, 18); ctx.stroke();
    ctx.strokeStyle = C.gold; ctx.lineWidth = 2; roundRect(ctx, 50, 50, W - 100, H - 100, 12); ctx.stroke();

    // Crest
    try { const crest = await svgToImage(CREST_SVG); ctx.drawImage(crest, W / 2 - 70, 78, 140, 140); } catch { /* ignore */ }

    ctx.textAlign = "center";
    ctx.fillStyle = C.goldD;
    ctx.font = "800 24px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("NATION BUILDERS CORPS", W / 2, 258);

    ctx.fillStyle = C.green;
    ctx.font = "900 58px 'Playfair Display', serif";
    ctx.fillText("Certificate of Nation Building", W / 2, 330);

    // Portrait (optional) — gold-ringed circle between the title and the name
    let y = { certifies: 420, name: 500, rule: 522, achievement: 578, motto: 660 };
    if (photo) {
      y = { certifies: 528, name: 600, rule: 622, achievement: 668, motto: 738 };
      try {
        const img = await new Promise((res, rej) => { const im = new Image(); im.onload = () => res(im); im.onerror = rej; im.src = photo; });
        const cx = W / 2, cy = 435, r = 62;
        ctx.save();
        ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.clip();
        ctx.drawImage(img, cx - r, cy - r, r * 2, r * 2);
        ctx.restore();
        ctx.strokeStyle = C.gold; ctx.lineWidth = 4;
        ctx.beginPath(); ctx.arc(cx, cy, r + 3, 0, Math.PI * 2); ctx.stroke();
      } catch { /* photo failed to load; layout already shifted, still fine */ }
    }

    ctx.fillStyle = "#3D4F46";
    ctx.font = "400 22px 'DM Sans', sans-serif";
    ctx.fillText("This certifies that", W / 2, y.certifies);

    // Name
    ctx.fillStyle = C.green;
    ctx.font = "900 74px 'Playfair Display', serif";
    ctx.fillText(who.slice(0, 26), W / 2, y.name);
    // Underline flourish
    const nw = Math.min(ctx.measureText(who).width + 80, W - 200);
    ctx.strokeStyle = C.gold; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(W / 2 - nw / 2, y.rule); ctx.lineTo(W / 2 + nw / 2, y.rule); ctx.stroke();

    ctx.fillStyle = "#3D4F46";
    ctx.font = "400 26px 'DM Sans', sans-serif";
    ctx.fillText(achievement, W / 2, y.achievement);

    ctx.fillStyle = C.greenM;
    ctx.font = "italic 500 28px 'Playfair Display', serif";
    ctx.fillText("“" + NBC.motto + "”", W / 2, y.motto);

    // Footer signatures
    ctx.textAlign = "left";
    ctx.strokeStyle = "rgba(11,42,27,0.25)"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(180, 830); ctx.lineTo(500, 830); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(W - 500, 830); ctx.lineTo(W - 180, 830); ctx.stroke();
    ctx.fillStyle = C.green; ctx.font = "700 20px 'DM Sans', sans-serif";
    ctx.fillText(dateStr(), 180, 862);
    ctx.textAlign = "right";
    ctx.fillText(SITE.name, W - 180, 862);
    ctx.textAlign = "left";
    ctx.fillStyle = "#8A9991"; ctx.font = "500 15px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("Date", 180, 885);
    ctx.textAlign = "right";
    ctx.fillText(`${SITE.registrationId}`, W - 180, 885);
    ctx.textAlign = "left";

    return new Promise((res) => cv.toBlob((b) => res(b), "image/png"));
  };

  const download = async () => {
    if (!name.trim()) return;
    setBusy(true);
    try {
      const blob = await render();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = `nation-builder-certificate.png`; a.click();
      URL.revokeObjectURL(url);
      trackEvent("nbc_certificate_download", { eventName });
    } finally { setBusy(false); }
  };

  const share = async () => {
    if (!name.trim()) return;
    setBusy(true);
    try {
      const blob = await render();
      const file = new File([blob], "certificate.png", { type: "image/png" });
      const text = `I earned my Nation Builders certificate 🇳🇬 — building the Nigeria I want to see.`;
      trackEvent("nbc_certificate_share", { eventName });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], text, title: "Nation Builder Certificate" });
        setShared(true);
      } else {
        await navigator.clipboard.writeText(`${text} ${SITE.siteUrl}/NBC`);
        setShared(true); setTimeout(() => setShared(false), 2200);
        await download();
      }
    } catch { /* cancelled */ } finally { setBusy(false); }
  };

  return (
    <div style={{ background: "linear-gradient(135deg, #0B2A1B, #05140D)", borderRadius: 28, padding: "clamp(1.5rem,4vw,2.5rem)", border: `1px solid rgba(230,201,143,.2)`, color: C.cream }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "2rem", alignItems: "center" }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, color: C.goldL, fontWeight: 800, letterSpacing: ".1em", textTransform: "uppercase", fontSize: ".76rem", marginBottom: ".75rem" }}>
            <Award size={16} /> You earned this
          </div>
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.6rem,4vw,2.2rem)", fontWeight: 900, lineHeight: 1.1, margin: "0 0 .75rem" }}>Your certificate is ready.</h3>
          <p style={{ color: "rgba(250,249,246,.72)", lineHeight: 1.6, marginBottom: "1.25rem", maxWidth: "38ch" }}>Put your name on it, then download or share your proof of nation building.</p>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" maxLength={26}
            style={{ width: "100%", padding: ".85rem 1.1rem", borderRadius: 14, border: "1.5px solid rgba(250,249,246,.18)", background: "rgba(255,255,255,.05)", color: C.cream, fontSize: "1rem", outline: "none", marginBottom: ".85rem", fontFamily: "inherit" }} />
          {/* Photo upload */}
          <input ref={fileRef} type="file" accept="image/*" onChange={onPhoto} style={{ display: "none" }} />
          <div style={{ display: "flex", alignItems: "center", gap: ".75rem", marginBottom: "1rem" }}>
            {photo ? (
              <>
                <img src={photo} alt="Your portrait" style={{ width: 46, height: 46, borderRadius: 999, objectFit: "cover", border: `2px solid ${C.gold}` }} />
                <button type="button" onClick={() => fileRef.current?.click()} style={{ background: "none", border: "none", color: C.goldL, fontWeight: 700, fontSize: ".85rem", cursor: "pointer", padding: 0 }}>Change photo</button>
                <button type="button" onClick={() => setPhoto("")} aria-label="Remove photo" style={{ background: "none", border: "none", color: "rgba(250,249,246,.6)", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 4, fontSize: ".85rem", padding: 0 }}><X size={14} /> Remove</button>
              </>
            ) : (
              <button type="button" onClick={() => fileRef.current?.click()}
                style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: ".7rem 1.2rem", borderRadius: 999, border: "1.5px dashed rgba(250,249,246,.3)", background: "none", color: C.cream, fontWeight: 700, fontSize: ".85rem", cursor: "pointer" }}>
                <Camera size={16} /> Add your photo (optional)
              </button>
            )}
          </div>
          <div style={{ display: "flex", gap: ".75rem", flexWrap: "wrap" }}>
            <button onClick={share} disabled={busy || !name.trim()} style={btn(C.gold, "#14532d")}>{shared ? <><Check size={17} /> Shared</> : <><Share2 size={17} /> Share</>}</button>
            <button onClick={download} disabled={busy || !name.trim()} style={btn("rgba(250,249,246,.1)", C.cream, true)}><Download size={17} /> {busy ? "Rendering…" : "Download"}</button>
          </div>
        </div>

        {/* Preview */}
        <div style={{ background: "#FAF9F6", color: C.green, borderRadius: 16, padding: "clamp(1.25rem,4vw,2rem)", textAlign: "center", border: `4px double ${C.gold}`, aspectRatio: "1400 / 990", display: "flex", flexDirection: "column", justifyContent: "center", gap: ".4rem" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: ".2rem" }}><NBCEmblem size={54} id="cert" /></div>
          <div style={{ color: C.goldD, fontWeight: 800, fontSize: "clamp(.6rem,1.6vw,.8rem)", letterSpacing: ".06em" }}>NATION BUILDERS CORPS</div>
          <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: "clamp(1rem,3vw,1.5rem)" }}>Certificate of Nation Building</div>
          {photo && <img src={photo} alt="" style={{ width: "clamp(38px,9vw,56px)", height: "clamp(38px,9vw,56px)", borderRadius: 999, objectFit: "cover", border: `2px solid ${C.gold}`, margin: "0 auto" }} />}
          <div style={{ color: "#3D4F46", fontSize: "clamp(.6rem,1.6vw,.8rem)" }}>This certifies that</div>
          <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: "clamp(1.3rem,4.2vw,2.1rem)", color: C.green }}>{who}</div>
          <div style={{ color: "#3D4F46", fontSize: "clamp(.62rem,1.7vw,.85rem)", maxWidth: "36ch", margin: "0 auto" }}>{achievement}</div>
          <div style={{ fontStyle: "italic", fontFamily: "'Playfair Display',serif", color: C.greenM, fontSize: "clamp(.65rem,1.8vw,.9rem)", marginTop: ".2rem" }}>“{NBC.motto}”</div>
        </div>
      </div>
    </div>
  );
}

function btn(bg, color, ghost) {
  return { display: "inline-flex", alignItems: "center", gap: 8, padding: ".9rem 1.6rem", borderRadius: 999, border: ghost ? "1.5px solid rgba(250,249,246,.2)" : "none", background: bg, color, fontWeight: 800, fontSize: ".95rem", cursor: "pointer" };
}
