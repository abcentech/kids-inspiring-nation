import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { C } from "./nbcBrand.js";
import { trackEvent } from "../analytics.js";

// The 15-second series intro, looping silently in the NBC hero. Browsers only autoplay
// muted video, so it starts silent with a "Play with sound" control. Visitors who ask
// for reduced motion get the still poster and the normal controls instead.
export default function HeroReel() {
  const ref = useRef(null);
  const [muted, setMuted] = useState(true);
  const [reduce] = useState(() => typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches);

  useEffect(() => {
    const v = ref.current;
    if (!v || reduce) return;
    v.play().catch(() => { /* autoplay refused: the poster stays up */ });
  }, [reduce]);

  const toggle = () => {
    const v = ref.current; if (!v) return;
    const next = !muted;
    v.muted = next; setMuted(next);
    if (!next) { v.currentTime = 0; v.play().catch(() => {}); trackEvent("nbc_hero_reel_sound", { location: "nbc_hero" }); }
  };

  return (
    <div className="nbc-hero-reel" style={{ position: "relative", borderRadius: 22, overflow: "hidden", border: `1px solid ${C.gold}40`, boxShadow: "0 40px 80px rgba(0,0,0,.45)", background: "#0e1411" }}>
      <video ref={ref} src="/nbc/media/intro15-16x9.mp4" poster="/nbc/media/intro15-poster.jpg"
        muted={muted} loop playsInline preload="metadata" controls={reduce}
        aria-label="Building the Nigeria God Intends: 15-second series intro"
        style={{ display: "block", width: "100%", aspectRatio: "16 / 9", objectFit: "cover" }} />
      {!reduce && (
        <button type="button" onClick={toggle} aria-pressed={!muted}
          style={{ position: "absolute", left: 14, bottom: 14, display: "inline-flex", alignItems: "center", gap: ".45rem", padding: ".55rem .95rem", borderRadius: 999,
            border: "1px solid rgba(253,247,236,.35)", background: "rgba(7,20,13,.72)", color: C.cream, fontWeight: 800, fontSize: ".8rem", cursor: "pointer", backdropFilter: "blur(6px)" }}>
          {muted ? <><Volume2 size={15} /> Play with sound</> : <><VolumeX size={15} /> Mute</>}
        </button>
      )}
    </div>
  );
}
