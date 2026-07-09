import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Instagram, Youtube, Menu, X as XIcon, ArrowUpRight } from "lucide-react";
import { SITE } from "../siteConfig.js";
import { NBC, C } from "./nbcBrand.js";
import NBCEmblem from "./NBCEmblem.jsx";

// The standalone chrome for the Nation Builders Corp. Every /nbc* route renders
// with NBCNav on top and NBCFooter below (wired in App.jsx so they persist
// across NBC route changes). NBC reads as a self-contained product; the
// KidsInspiring Nation main site is referenced exactly once — the "Powered by"
// credit in the footer.

export const NAV_H = 64;

const NAV = [
  { label: "Home", to: "/NBC" },
  { label: "Course", to: "/nbc/course" },
  { label: "Tools", to: "/nbc/tools" },
  { label: "Students", to: "/nbc/students" },
  { label: "Advisors", to: "/nbc/advisors" },
  { label: "Schools", to: "/nbc/schools" },
  { label: "Fund", to: "/nbc/fund" },
];

const KIN_URL = SITE.siteUrl || "https://kidsinspiringnation.org";

function NavLinks({ pathname, onNavigate, mobile }) {
  return NAV.map(({ label, to }) => {
    const active = pathname.toLowerCase() === to.toLowerCase();
    return (
      <Link
        key={to}
        to={to}
        onClick={onNavigate}
        style={{
          fontSize: mobile ? "1rem" : ".78rem",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: ".07em",
          color: active ? C.goldL : C.cream,
          opacity: active ? 1 : 0.78,
          textDecoration: "none",
          position: "relative",
          padding: mobile ? ".2rem 0" : 0,
        }}
      >
        {label}
        {active && !mobile && (
          <span style={{ position: "absolute", left: 0, right: 0, bottom: -6, height: 2, background: C.gold, borderRadius: 2 }} />
        )}
      </Link>
    );
  });
}

export function NBCNav() {
  const { pathname } = useLocation();
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 24);
    h();
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => { setMenu(false); }, [pathname]);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menu]);

  const close = () => setMenu(false);
  const navBg = scrolled ? "rgba(5,20,13,.86)" : "rgba(5,20,13,.55)";

  return (
    <>
      <nav
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, height: NAV_H,
          background: navBg, backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)",
          borderBottom: `1px solid ${scrolled ? `${C.gold}22` : "transparent"}`, transition: "background .3s, border-color .3s",
          fontFamily: "'DM Sans',sans-serif",
        }}
      >
        <div style={{ maxWidth: "80rem", height: "100%", margin: "0 auto", padding: "0 clamp(1.1rem,4vw,2.5rem)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
          <Link to="/NBC" onClick={close} style={{ display: "flex", alignItems: "center", gap: ".6rem", textDecoration: "none", flexShrink: 0 }}>
            <NBCEmblem size={36} ring={false} id="shell-nav" />
            <span style={{ fontWeight: 800, fontSize: ".92rem", color: C.cream, fontFamily: "'Plus Jakarta Sans',sans-serif", letterSpacing: "-.01em", whiteSpace: "nowrap" }}>
              Nation Builders Corp
            </span>
          </Link>

          <div className="nbc-desktop" style={{ alignItems: "center", gap: "1.5rem" }}>
            <NavLinks pathname={pathname} />
            <span style={{ width: 1, height: 20, background: `${C.cream}22` }} />
            <a href={SITE.nbcSocials?.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ color: C.cream, opacity: 0.78, display: "grid" }}><Instagram size={17} /></a>
            <a href={SITE.nbcSocials?.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" style={{ color: C.cream, opacity: 0.78, display: "grid" }}><Youtube size={17} /></a>
            <Link to="/NBC#join" style={{ padding: ".5rem 1.35rem", borderRadius: 999, background: C.gold, color: C.greenD, fontWeight: 800, fontSize: ".78rem", textDecoration: "none", whiteSpace: "nowrap" }}>Join</Link>
          </div>

          <button className="nbc-mobile" onClick={() => setMenu((m) => !m)} aria-label="Menu" style={{ color: C.cream, background: "none", border: "none", cursor: "pointer", display: "grid" }}>
            {menu ? <XIcon size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menu && (
          <motion.div
            className="nbc-mobile"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: "fixed", inset: 0, top: NAV_H, zIndex: 190, background: "rgba(5,20,13,.98)", backdropFilter: "blur(20px)", padding: "2rem clamp(1.5rem,6vw,3rem)", fontFamily: "'DM Sans',sans-serif" }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "1.4rem" }}>
              <NavLinks pathname={pathname} onNavigate={close} mobile />
              <Link to="/NBC#join" onClick={close} style={{ marginTop: ".5rem", padding: ".9rem", borderRadius: 999, background: C.gold, color: C.greenD, fontWeight: 800, textAlign: "center", textDecoration: "none" }}>Join the Corps</Link>
              <div style={{ display: "flex", gap: "1rem", marginTop: ".5rem" }}>
                <a href={SITE.nbcSocials?.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ color: C.cream, opacity: 0.8 }}><Instagram size={22} /></a>
                <a href={SITE.nbcSocials?.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" style={{ color: C.cream, opacity: 0.8 }}><Youtube size={22} /></a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .nbc-desktop { display: none; }
        .nbc-mobile { display: grid; }
        @media (min-width: 900px) {
          .nbc-desktop { display: flex; }
          .nbc-mobile { display: none !important; }
        }
      `}</style>
    </>
  );
}

export function NBCFooter() {
  return (
    <footer style={{ background: C.greenD, color: C.cream, padding: "clamp(3rem,7vw,5rem) 0 2.5rem", borderTop: `1px solid ${C.gold}22`, fontFamily: "'DM Sans',sans-serif" }}>
      <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 clamp(1.25rem,4vw,2.5rem)", textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}><NBCEmblem size={72} id="shell-footer" /></div>
        <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: "1.4rem" }}>Nation Builders Corp</div>
        <p style={{ color: "rgba(250,249,246,.6)", marginBottom: ".9rem", fontStyle: "italic" }}>{NBC.motto}</p>
        <p style={{ color: C.goldL, fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontWeight: 700, fontSize: "1.05rem", letterSpacing: ".01em", marginBottom: "1.5rem" }}>{NBC.mandate}</p>

        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginBottom: "2rem" }}>
          <a href={SITE.nbcSocials?.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ width: 46, height: 46, borderRadius: 999, display: "grid", placeItems: "center", background: "rgba(228,64,95,.15)", color: "#E4405F" }}><Instagram size={20} /></a>
          <a href={SITE.nbcSocials?.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" style={{ width: 46, height: 46, borderRadius: 999, display: "grid", placeItems: "center", background: "rgba(255,0,0,.12)", color: "#FF4040" }}><Youtube size={20} /></a>
        </div>

        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "1.25rem 1.5rem", fontSize: ".85rem", color: "rgba(250,249,246,.7)" }}>
          <Link to="/NBC/register" style={{ color: "inherit", textDecoration: "none" }}>Join</Link>
          <Link to="/nbc/course" style={{ color: "inherit", textDecoration: "none" }}>Course</Link>
          <Link to="/nbc/tools" style={{ color: "inherit", textDecoration: "none" }}>Builder Tools</Link>
          <Link to="/nbc/students" style={{ color: "inherit", textDecoration: "none" }}>For Students</Link>
          <Link to="/nbc/advisors" style={{ color: "inherit", textDecoration: "none" }}>For Advisors</Link>
          <Link to="/nbc/schools" style={{ color: "inherit", textDecoration: "none" }}>For Schools</Link>
          <Link to="/nbc/fund" style={{ color: "inherit", textDecoration: "none" }}>Fund</Link>
        </div>

        {/* The single reference back to the KidsInspiring Nation main site. */}
        <div style={{ marginTop: "2.25rem", paddingTop: "1.75rem", borderTop: `1px solid ${C.cream}12` }}>
          <a href={KIN_URL} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: ".4rem", color: "rgba(250,249,246,.55)", fontSize: ".78rem", textDecoration: "none" }}>
            A programme of {SITE.name} <ArrowUpRight size={13} />
          </a>
          <p style={{ color: "rgba(250,249,246,.35)", fontSize: ".72rem", marginTop: ".5rem" }}>{SITE.registrationId} · © {SITE.name}</p>
        </div>
      </div>
    </footer>
  );
}

// Convenience wrapper (nav + content + footer) for any standalone use.
export default function NBCShell({ children }) {
  return (
    <div style={{ background: C.greenD, color: C.cream, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <NBCNav />
      <main style={{ flex: 1, paddingTop: NAV_H }}>{children}</main>
      <NBCFooter />
    </div>
  );
}
