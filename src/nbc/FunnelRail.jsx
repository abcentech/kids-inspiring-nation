import { useEffect, useState } from "react";
import { C } from "./nbcBrand.js";

// Sticky funnel progress rail for the NBC home page. One dot per "act"; the
// active act is tracked with an IntersectionObserver over the #act-N anchors
// (same pattern as NigeriaEducationViz). Desktop only — hidden ≤900px.

export const FUNNEL_ACTS = [
  { id: "act-1", label: "Start" },
  { id: "act-2", label: "The Problem" },
  { id: "act-3", label: "The Belief" },
  { id: "act-4", label: "The Method" },
  { id: "act-5", label: "The Proof" },
  { id: "act-6", label: "Become a Builder" },
  { id: "act-7", label: "Join Us" },
];

export default function FunnelRail() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const els = FUNNEL_ACTS.map((a) => document.getElementById(a.id)).filter(Boolean);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to the top of the viewport that is intersecting.
        const visible = entries.filter((e) => e.isIntersecting);
        if (!visible.length) return;
        const top = visible.reduce((a, b) => (a.boundingClientRect.top < b.boundingClientRect.top ? a : b));
        const idx = FUNNEL_ACTS.findIndex((a) => a.id === top.target.id);
        if (idx !== -1) setActive(idx);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const go = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  return (
    <>
      <nav
        className="nbc-funnel-rail"
        aria-label="Page sections"
        style={{
          position: "fixed",
          top: "50%",
          right: "clamp(1rem, 2.5vw, 2.25rem)",
          transform: "translateY(-50%)",
          zIndex: 150,
          flexDirection: "column",
          gap: ".9rem",
          fontFamily: "'DM Sans',sans-serif",
        }}
      >
        {FUNNEL_ACTS.map((a, i) => {
          const on = i === active;
          return (
            <button
              key={a.id}
              onClick={() => go(a.id)}
              aria-label={a.label}
              aria-current={on ? "true" : undefined}
              className="nbc-rail-item"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: ".65rem",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            >
              <span
                className="nbc-rail-label"
                style={{
                  fontSize: ".72rem",
                  fontWeight: 700,
                  letterSpacing: ".02em",
                  color: on ? C.goldL : "rgba(250,249,246,.55)",
                  whiteSpace: "nowrap",
                  opacity: 0,
                  transform: "translateX(6px)",
                  transition: "opacity .25s, transform .25s, color .25s",
                }}
              >
                {String(i + 1).padStart(2, "0")} · {a.label}
              </span>
              <span
                style={{
                  flexShrink: 0,
                  width: on ? 12 : 8,
                  height: on ? 12 : 8,
                  borderRadius: "50%",
                  background: on ? C.gold : "rgba(250,249,246,.3)",
                  boxShadow: on ? `0 0 0 4px ${C.gold}2e` : "none",
                  transition: "all .25s",
                }}
              />
            </button>
          );
        })}
      </nav>
      <style>{`
        .nbc-funnel-rail { display: none; }
        @media (min-width: 900px) { .nbc-funnel-rail { display: flex; } }
        .nbc-rail-item:hover .nbc-rail-label,
        .nbc-rail-item[aria-current="true"] .nbc-rail-label { opacity: 1; transform: translateX(0); }
      `}</style>
    </>
  );
}
