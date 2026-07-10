import { motion } from "framer-motion";
import { Camera, Images } from "lucide-react";
import { C, NBC } from "./nbcBrand.js";
import { GALLERY, GALLERY_TAG } from "./nbcGallery.js";

// A moments gallery from previous NBC seasons. Renders real photos when the
// manifest (nbcGallery.js) has entries; otherwise an elegant branded band that
// invites them — so the section always looks intentional, never broken.

export default function GalleryStrip({ dark }) {
  const has = GALLERY.length > 0;
  const txt = C.cream;

  return (
    <section style={{ background: C.green, color: txt, padding: "clamp(4rem,9vw,7rem) 0", position: "relative", overflow: "hidden" }}>
      <div aria-hidden style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 80% 10%, ${C.gold}14 0%, transparent 50%)` }} />
      <div style={{ maxWidth: "78rem", margin: "0 auto", padding: "0 clamp(1.25rem,4vw,2.5rem)", position: "relative", zIndex: 2 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 12, color: C.gold, fontWeight: 800, letterSpacing: ".16em", textTransform: "uppercase", fontSize: ".74rem", marginBottom: "1rem" }}>
          <span style={{ width: 34, height: 2, background: C.gold }} /> {GALLERY_TAG}
        </div>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: "clamp(1.9rem,5vw,3rem)", lineHeight: 1.05, margin: "0 0 .9rem", maxWidth: "22ch" }}>
          Builders, already at work.
        </h2>
        <p style={{ color: "rgba(250,249,246,.75)", fontSize: "1.05rem", lineHeight: 1.6, maxWidth: "46ch", marginBottom: "2.5rem" }}>
          Real young Nigerians, real projects, real communities — moments from the movement so far. {NBC.mandate}
        </p>

        {has ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 240px), 1fr))", gap: "1rem" }}>
            {GALLERY.map((g, i) => (
              <motion.figure key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ delay: (i % 6) * 0.05 }}
                style={{ margin: 0, borderRadius: 18, overflow: "hidden", position: "relative", gridRow: g.tall ? "span 2" : undefined, background: C.greenD, border: `1px solid ${C.gold}22` }}>
                <img src={g.src} alt={g.caption || "Nation Builders Corps"} loading="lazy" style={{ display: "block", width: "100%", height: "100%", objectFit: "cover", minHeight: 200 }} />
                {g.caption && (
                  <figcaption style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "1.5rem .9rem .8rem", fontSize: ".82rem", fontWeight: 600, color: "#fff", background: "linear-gradient(0deg, rgba(4,17,10,.85), transparent)" }}>
                    {g.caption}
                  </figcaption>
                )}
              </motion.figure>
            ))}
          </div>
        ) : (
          <div style={{ borderRadius: 24, border: `1.5px dashed ${C.gold}44`, background: `${C.gold}0a`, padding: "clamp(2.5rem,6vw,4rem) 1.5rem", textAlign: "center" }}>
            <div style={{ display: "flex", justifyContent: "center", gap: ".6rem", color: C.goldL, marginBottom: "1rem" }}>
              <Camera size={26} /><Images size={26} />
            </div>
            <p style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontSize: "1.3rem", color: C.goldL, margin: "0 0 .6rem" }}>Our story, in pictures — coming soon.</p>
            <p style={{ color: "rgba(250,249,246,.65)", maxWidth: "38rem", margin: "0 auto", lineHeight: 1.6 }}>
              We're gathering photos from previous seasons of the {GALLERY_TAG} collection. This wall will fill with the faces and projects of the movement.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
