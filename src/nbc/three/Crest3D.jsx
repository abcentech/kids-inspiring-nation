import { Suspense, lazy, useEffect, useState } from "react";
import NBCEmblem from "../NBCEmblem.jsx";

const CrestScene = lazy(() => import("./CrestScene.jsx"));

// Decides once, on the client, whether this device should run the WebGL crest.
// Low-end phones, metered connections, reduced-motion users and anything
// without WebGL get the flat SVG emblem — no download of three.js at all.
function canRender3D() {
  if (typeof window === "undefined") return false;
  try {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return false;
    if (window.innerWidth < 900) return false; // phones/tablets → SVG
    if (navigator.connection?.saveData) return false;
    if ((navigator.deviceMemory ?? 8) < 4) return false;
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    return !!gl;
  } catch {
    return false;
  }
}

// Renders the 3D crest on capable devices, the SVG emblem otherwise. Sized to a
// square `size` box so there's no layout shift when the scene loads.
export default function Crest3D({ size = 420, glow = true, emblemId = "crest3d" }) {
  const [use3D, setUse3D] = useState(false);
  useEffect(() => { setUse3D(canRender3D()); }, []);

  const fallback = (
    <div style={{ display: "grid", placeItems: "center", width: size, height: size }}>
      <NBCEmblem size={Math.round(size * 0.86)} glow={glow} id={emblemId} />
    </div>
  );

  if (!use3D) return fallback;

  return (
    <div style={{ width: size, height: size }}>
      <Suspense fallback={fallback}>
        <CrestScene />
      </Suspense>
    </div>
  );
}
