import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Home, Camera, Images } from "lucide-react";
import { GALLERY_PHOTOS, GALLERY_TAGS } from "./galleryData.js";
import { ROUTE_META, T } from "./siteConfig.js";
import { usePageMeta } from "./usePageMeta.js";

export default function Gallery({ dark }) {
  usePageMeta(ROUTE_META.gallery);
  const [activeTag, setActiveTag] = useState("All");
  const [lightbox, setLightbox] = useState(null); // index into filtered

  const bg = dark ? "#050505" : "#FAFAF5";
  const card = dark ? "#0E0E0F" : "#fff";
  const txt = dark ? "#F5F5F7" : T.greenD;
  const sub = dark ? "#98989D" : T.p2;
  const brd = dark ? "rgba(255,255,255,.07)" : "rgba(22,97,62,.09)";

  const filtered = activeTag === "All" ? GALLERY_PHOTOS : GALLERY_PHOTOS.filter(p => p.tag === activeTag);

  const navigate = useCallback((dir) => {
    setLightbox(prev => {
      const next = prev + dir;
      if (next < 0) return filtered.length - 1;
      if (next >= filtered.length) return 0;
      return next;
    });
  }, [filtered.length]);

  const current = lightbox !== null ? filtered[lightbox] : null;

  useEffect(() => {
    if (lightbox === null) return undefined;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowLeft") navigate(-1);
      if (e.key === "ArrowRight") navigate(1);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [lightbox, navigate]);

  return (
    <div style={{ fontFamily: "'DM Sans',sans-serif", background: bg, minHeight: "100vh", color: txt }}>
      {/* Header */}
      <div style={{
        background: `linear-gradient(155deg, ${T.greenD} 0%, #050E07 60%, ${T.greenD} 100%)`,
        padding: "5rem 0 4rem",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* glow */}
        <div style={{ position: "absolute", top: "-30%", right: "-10%", width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle, ${T.gold}25, transparent 65%)`, pointerEvents: "none" }} />
        <div aria-hidden style={{ position: "absolute", right: "-.05em", bottom: "-.15em", fontSize: "clamp(10rem,35vw,20rem)", color: "transparent", WebkitTextStroke: "1px rgba(232,185,84,.04)", fontFamily: "'Playfair Display',serif", fontWeight: 900, fontStyle: "italic", lineHeight: 1, userSelect: "none", pointerEvents: "none" }}>KIN</div>

        <div style={{ maxWidth: "74rem", margin: "0 auto", padding: "0 clamp(1.25rem,5vw,3rem)", position: "relative", zIndex: 2 }}>
          <div style={{ display: "flex", alignItems: "center", gap: ".75rem", marginBottom: "1rem" }}>
            <Camera size={22} color={T.goldL} strokeWidth={1.5} />
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: ".75rem", fontWeight: 600, color: T.goldL, letterSpacing: ".15em", textTransform: "uppercase" }}>KIN Photo Gallery</span>
          </div>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2.5rem,8vw,5rem)", fontWeight: 900, color: T.cream, letterSpacing: "-0.03em", lineHeight: .95, marginBottom: "1rem" }}>
            Memories of<br /><em style={{ fontStyle: "italic", color: T.goldL }}>a Nation Rising.</em>
          </h1>
          <p style={{ fontSize: "clamp(.95rem,2vw,1.1rem)", color: "rgba(253,247,236,.65)", maxWidth: "52ch", lineHeight: 1.7 }}>
            Every photo tells the story of a goD stepping into their destiny — from Character sessions to Community feeding, from concerts to consecration.
          </p>
        </div>
      </div>

      {/* Filter tabs */}
      <div style={{ background: dark ? "#0A0A0A" : "#fff", borderBottom: `1px solid ${brd}`, position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: "74rem", margin: "0 auto", padding: "0 clamp(1.25rem,5vw,3rem)", display: "flex", alignItems: "center", gap: ".5rem", overflowX: "auto", paddingTop: ".75rem", paddingBottom: ".75rem" }}>
          {GALLERY_TAGS.map(tag => (
            <button key={tag} onClick={() => setActiveTag(tag)} style={{
              padding: ".5em 1.2em", borderRadius: 999, fontSize: ".78rem", fontWeight: 700,
              background: activeTag === tag ? T.gold : dark ? "rgba(255,255,255,.07)" : "rgba(22,97,62,.06)",
              color: activeTag === tag ? "#fff" : sub,
              border: activeTag === tag ? "none" : `1px solid ${brd}`,
              cursor: "pointer", whiteSpace: "nowrap", transition: "all .2s",
              letterSpacing: ".03em",
            }}>
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div style={{ maxWidth: "74rem", margin: "0 auto", padding: "3rem clamp(1.25rem,5vw,3rem)" }}>
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "6rem 0", color: sub }}>
            <Images size={48} style={{ marginBottom: "1rem", opacity: .4 }} />
            <p style={{ fontSize: "1.1rem" }}>No photos for this category yet.</p>
          </div>
        )}
        <motion.div layout style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))", gap: "1.2rem" }}>
          <AnimatePresence mode="popLayout">
            {filtered.map((photo, idx) => (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, scale: .95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: .9 }}
                transition={{ duration: .22 }}
                onClick={() => setLightbox(idx)}
                style={{
                  borderRadius: 18,
                  overflow: "hidden",
                  border: `1px solid ${brd}`,
                  cursor: "pointer",
                  boxShadow: dark ? "0 4px 20px rgba(0,0,0,.5)" : "0 4px 16px rgba(10,28,18,.08)",
                  transition: "transform .22s, box-shadow .22s",
                }}
                whileHover={{ y: -6, boxShadow: dark ? "0 16px 48px rgba(0,0,0,.6)" : "0 16px 40px rgba(10,28,18,.14)" }}
              >
                {/* Photo or placeholder */}
                <div style={{ height: 220, background: photo.src ? undefined : photo.gradient, position: "relative", overflow: "hidden" }}>
                  {photo.src
                    ? <img src={photo.src} alt={photo.caption} width={photo.width} height={photo.height} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    : (
                      <div style={{ width: "100%", height: "100%", display: "grid", placeItems: "center", position: "relative" }}>
                        <div aria-hidden style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,.4) 100%)" }} />
                        <div style={{ position: "relative", zIndex: 2, color: "#fff", opacity: 0.85 }}><photo.icon size={64} strokeWidth={1.5} /></div>
                      </div>
                    )
                  }
                  {/* Tag badge */}
                  <div style={{ position: "absolute", top: 12, left: 12, background: "rgba(0,0,0,.45)", backdropFilter: "blur(8px)", borderRadius: 999, padding: ".25em .75em", fontSize: ".68rem", fontWeight: 700, color: "#fff", letterSpacing: ".08em", textTransform: "uppercase" }}>
                    {photo.tag}
                  </div>
                </div>
                {/* Caption */}
                <div style={{ padding: "1rem 1.25rem", background: card }}>
                  <p style={{ fontSize: ".9rem", fontWeight: 600, color: txt, lineHeight: 1.45, marginBottom: ".3rem" }}>{photo.caption}</p>
                  <span style={{ fontFamily: "'DM Mono',monospace", fontSize: ".68rem", color: sub, letterSpacing: ".04em" }}>{photo.date}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <div style={{ marginTop: "3rem", background: dark ? "rgba(255,255,255,.03)" : "rgba(22,97,62,.04)", border: `1px solid ${T.gold}33`, borderRadius: 16, padding: "1.5rem 2rem", display: "flex", alignItems: "center", gap: "1rem" }}>
          <Camera size={20} color={T.gold} strokeWidth={1.5} style={{ flexShrink: 0 }} />
          <div>
            <div style={{ fontWeight: 700, color: txt, fontSize: ".9rem", marginBottom: ".25rem" }}>Captured Moments Across the Nation</div>
            <div style={{ fontSize: ".82rem", color: sub, lineHeight: 1.5 }}>
              This gallery is curated from recent programmes, worship moments, service projects, and nation-building milestones across KidsInspiring Nation.
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {current && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="Photo preview"
            style={{ position: "fixed", inset: 0, zIndex: 9000, background: "rgba(0,0,0,.92)", backdropFilter: "blur(16px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}
            onClick={e => { if (e.target === e.currentTarget) setLightbox(null); }}
          >
            <button autoFocus onClick={() => setLightbox(null)} aria-label="Close preview" style={{ position: "absolute", top: 20, right: 20, width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.15)", display: "grid", placeItems: "center", color: "#fff", cursor: "pointer" }}>
              <X size={18} strokeWidth={2} />
            </button>
            <button onClick={() => navigate(-1)} aria-label="Previous photo" style={{ position: "absolute", left: 20, top: "50%", transform: "translateY(-50%)", width: 48, height: 48, borderRadius: "50%", background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.15)", display: "grid", placeItems: "center", color: "#fff", cursor: "pointer" }}>
              <ChevronLeft size={22} />
            </button>
            <button onClick={() => navigate(1)} aria-label="Next photo" style={{ position: "absolute", right: 20, top: "50%", transform: "translateY(-50%)", width: 48, height: 48, borderRadius: "50%", background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.15)", display: "grid", placeItems: "center", color: "#fff", cursor: "pointer" }}>
              <ChevronRight size={22} />
            </button>
            <motion.div
              key={lightbox}
              initial={{ scale: .9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: .9, opacity: 0 }}
              style={{ maxWidth: 700, width: "100%", borderRadius: 24, overflow: "hidden", boxShadow: "0 40px 100px rgba(0,0,0,.8)" }}
            >
              <div style={{ height: 420, background: current.gradient, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {current.src
                  ? <img src={current.src} alt={current.caption} width={current.width} height={current.height} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  : <div style={{ color: "#fff", opacity: 0.95 }}><current.icon size={130} strokeWidth={1.5} /></div>
                }
              </div>
              <div style={{ padding: "1.5rem 2rem", background: "#111" }}>
                <div style={{ display: "flex", alignItems: "center", gap: ".75rem", marginBottom: ".5rem" }}>
                  <span style={{ background: T.gold, color: "#fff", borderRadius: 999, padding: ".2em .75em", fontSize: ".7rem", fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase" }}>{current.tag}</span>
                  <span style={{ fontFamily: "'DM Mono',monospace", fontSize: ".7rem", color: "rgba(255,255,255,.4)" }}>{current.date}</span>
                </div>
                <p style={{ color: "rgba(255,255,255,.85)", fontSize: "1rem", fontWeight: 600, lineHeight: 1.5 }}>{current.caption}</p>
                <p style={{ color: "rgba(255,255,255,.35)", fontSize: ".75rem", marginTop: ".5rem" }}>{lightbox + 1} / {filtered.length}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
