import { motion } from "framer-motion";
import { Play, Gamepad2, Youtube } from "lucide-react";
import { SITE } from "../siteConfig.js";
import { C } from "./nbcBrand.js";
import { trackEvent } from "../analytics.js";

// Watch & Play: the 30-day animated series "Building the Nigeria God Intends" and the
// Lightrun game (a static page at /play/). The trailer is self-hosted so it plays without
// a YouTube embed; the portrait cut is served to portrait screens.
const PORTRAIT = "(orientation: portrait) and (max-width: 640px)";
const EPISODES = [
  ["02", "Given Back", "Honesty"], ["07", "Nnewi", "Diligence"], ["13", "She Said No", "Courage"],
  ["16", "Of the Masses", "Justice"], ["19", "Twenty Pounds", "Perseverance"], ["30", "All of Them", "All of us"],
];

export default function WatchPlay() {
  // Phones held upright get the vertical cut and its own poster.
  const portrait = typeof window !== "undefined" && !!window.matchMedia?.(PORTRAIT).matches;
  return (
    <section id="watch" aria-label="Watch the series and play the game" style={{ padding: "clamp(4.5rem,10vw,8rem) 0", background: C.greenD, color: C.cream, position: "relative", overflow: "hidden", borderTop: `1px solid ${C.gold}22` }}>
      <div style={{ maxWidth: "78rem", margin: "0 auto", padding: "0 clamp(1.25rem,4vw,2.5rem)" }}>
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ maxWidth: "46rem", marginBottom: "2.5rem" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, color: C.goldL, fontWeight: 800, letterSpacing: ".14em", textTransform: "uppercase", fontSize: ".76rem", marginBottom: "1rem" }}>
            <span style={{ width: 34, height: 2, background: C.gold }} /> New · Watch &amp; play
          </div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,5.4vw,3.4rem)", fontWeight: 900, lineHeight: 1.02, letterSpacing: "-0.02em" }}>
            Building the Nigeria <em style={{ color: C.goldL }}>God Intends.</em>
          </h2>
          <p style={{ color: "rgba(253,247,236,.72)", fontSize: "1.1rem", lineHeight: 1.7, marginTop: ".9rem" }}>
            A 30-day animated series of true Nigerian stories: the woman who gave the money back, the doctor who said no,
            the market that burned and rose again. One episode a day, each ending on a verse. Watch it with your family, then
            talk about it at your club meeting.
          </p>
        </motion.div>

        <div className="nbc-watch-grid" style={{ display: "grid", gap: "1.5rem", alignItems: "start" }}>
          {/* Trailer */}
          <div style={{ minWidth: 0 }}>
            <div style={{ borderRadius: 22, overflow: "hidden", border: `1px solid ${C.gold}33`, background: "#0e1411", boxShadow: "0 30px 60px rgba(0,0,0,.35)" }}>
              <video key={portrait ? "v" : "h"} controls playsInline preload="none" poster={portrait ? "/nbc/media/trailer-poster-9x16.jpg" : "/nbc/media/trailer-poster.jpg"}
                onPlay={() => trackEvent("nbc_trailer_play", { location: "nbc_watch" })}
                className="nbc-trailer-video" style={{ display: "block", width: "100%", background: "#0e1411" }}>
                <source src={portrait ? "/nbc/media/trailer-9x16.mp4" : "/nbc/media/trailer-16x9.mp4"} type="video/mp4" />
              </video>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: ".6rem", marginTop: "1rem" }}>
              {EPISODES.map(([d, t, v]) => (
                <span key={d} style={{ display: "inline-flex", alignItems: "baseline", gap: ".45rem", padding: ".45rem .8rem", borderRadius: 999, background: "rgba(255,255,255,.06)", border: "1px solid rgba(230,201,143,.18)", fontSize: ".82rem" }}>
                  <b style={{ fontFamily: "'DM Mono',monospace", color: C.goldL }}>DAY {d}</b> {t} <span style={{ color: "rgba(253,247,236,.5)" }}>· {v}</span>
                </span>
              ))}
            </div>
            <a href={SITE.nbcSocials?.youtube} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("nbc_youtube_click", { location: "nbc_watch" })}
              style={{ display: "inline-flex", alignItems: "center", gap: ".55rem", marginTop: "1.25rem", padding: ".9rem 1.6rem", borderRadius: 999, background: C.gold, color: "#14532d", fontWeight: 800, textDecoration: "none" }}>
              <Youtube size={18} /> Watch the series on YouTube
            </a>
          </div>

          {/* Game */}
          <motion.a href="/play/" onClick={() => trackEvent("nbc_game_open", { location: "nbc_watch" })} whileHover={{ y: -6 }}
            style={{ display: "flex", flexDirection: "column", borderRadius: 22, overflow: "hidden", textDecoration: "none", color: C.cream, background: "#07140d", border: `1px solid ${C.gold}44`, minWidth: 0 }}>
            <div style={{ position: "relative", aspectRatio: "16 / 10", overflow: "hidden" }}>
              <img src="/nbc/media/game-shot.jpg" alt="Nation Builders: Lightrun gameplay, the Eagle flying down a neon avenue of towers" loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              <span style={{ position: "absolute", left: 14, top: 14, padding: ".3rem .7rem", borderRadius: 999, background: C.gold, color: "#14532d", fontWeight: 900, fontSize: ".72rem", letterSpacing: ".1em" }}>FREE GAME</span>
            </div>
            <div style={{ padding: "1.4rem 1.4rem 1.6rem", display: "flex", flexDirection: "column", gap: ".6rem", flex: 1 }}>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.6rem", fontWeight: 900, lineHeight: 1.1 }}>Nation Builders: Lightrun</div>
              <p style={{ margin: 0, color: "rgba(253,247,236,.7)", lineHeight: 1.6, flex: 1 }}>
                Fly through 30 cities, one for each episode. Blast the corruption, collect the virtues, beat each boss,
                and finish by taking the Nation Builder's pledge.
              </p>
              <span style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", fontWeight: 800, color: C.goldL }}>
                <Gamepad2 size={18} /> Play now, in your browser <Play size={14} fill="currentColor" />
              </span>
            </div>
          </motion.a>
        </div>
      </div>
      <style>{`.nbc-watch-grid{grid-template-columns:minmax(0,2fr) minmax(0,1fr)} .nbc-trailer-video{aspect-ratio:16/9}
@media (max-width: 900px){.nbc-watch-grid{grid-template-columns:minmax(0,1fr)}}
@media (orientation: portrait) and (max-width: 640px){.nbc-trailer-video{aspect-ratio:9/16}}`}</style>
    </section>
  );
}
