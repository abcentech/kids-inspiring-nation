import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { C } from "../nbcBrand.js";

// A lightweight WebGL rendering of the NBC crest: an extruded gold shield with
// a rising star and three ascending pillars, slowly rotating and floating.
// Lazy-loaded and only mounted on capable devices (see Crest3D.jsx) — mobile /
// reduced-motion / no-WebGL users get the flat SVG emblem instead.

function shieldShape() {
  const s = new THREE.Shape();
  s.moveTo(0, 1.283);
  s.lineTo(0.933, 0.95);
  s.lineTo(0.933, 0.05);
  s.bezierCurveTo(0.933, -0.55, 0.533, -0.983, 0, -1.283);
  s.bezierCurveTo(-0.533, -0.983, -0.933, -0.55, -0.933, 0.05);
  s.lineTo(-0.933, 0.95);
  s.closePath();
  return s;
}

function starShape(outer = 0.32, inner = 0.14, points = 5) {
  const s = new THREE.Shape();
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = (Math.PI / points) * i - Math.PI / 2;
    const x = Math.cos(a) * r;
    const y = Math.sin(a) * r;
    i === 0 ? s.moveTo(x, y) : s.lineTo(x, y);
  }
  s.closePath();
  return s;
}

function Crest() {
  const group = useRef();
  const shieldGeo = useMemo(() => new THREE.ExtrudeGeometry(shieldShape(), { depth: 0.22, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.04, bevelSegments: 3 }), []);
  const starGeo = useMemo(() => new THREE.ExtrudeGeometry(starShape(), { depth: 0.12, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.02, bevelSegments: 2 }), []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y = Math.sin(t * 0.35) * 0.5;
      group.current.rotation.x = Math.sin(t * 0.25) * 0.08 - 0.04;
      group.current.position.y = Math.sin(t * 0.6) * 0.06;
    }
  });

  const gold = new THREE.Color(C.gold);
  const goldL = new THREE.Color(C.goldL);
  const green = new THREE.Color(C.greenD);

  return (
    <group ref={group} scale={1.15}>
      {/* Shield face */}
      <mesh geometry={shieldGeo} castShadow>
        <meshStandardMaterial color={green} metalness={0.35} roughness={0.5} />
      </mesh>
      {/* Gold rim (slightly larger, behind) */}
      <mesh geometry={shieldGeo} scale={1.06} position={[0, 0, -0.06]}>
        <meshStandardMaterial color={gold} metalness={0.9} roughness={0.25} />
      </mesh>
      {/* Star */}
      <mesh geometry={starGeo} position={[0, 0.62, 0.2]}>
        <meshStandardMaterial color={goldL} metalness={0.95} roughness={0.2} emissive={gold} emissiveIntensity={0.15} />
      </mesh>
      {/* Three ascending pillars */}
      {[[-0.26, 0.26], [0, 0.34], [0.26, 0.42]].map(([x, h], i) => (
        <mesh key={i} position={[x, -0.15 + h / 2, 0.2]}>
          <boxGeometry args={[0.14, h, 0.12]} />
          <meshStandardMaterial color={gold} metalness={0.9} roughness={0.25} />
        </mesh>
      ))}
    </group>
  );
}

export default function CrestScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.2], fov: 42 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 4, 5]} intensity={1.5} />
      <directionalLight position={[-4, -2, 2]} intensity={0.5} color={C.goldL} />
      <Crest />
    </Canvas>
  );
}
