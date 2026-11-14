"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "gsap";
import { phoneTarget } from "@/lib/phone-store";
import { velocity } from "@/lib/velocity";
import type { ScreenId } from "@/lib/content";
import PhoneScreen from "@/components/phone/PhoneScreen";
import { SCREEN_W, SCREEN_H } from "@/lib/screen";

// Phone proportions in world units.
const SW = 0.72; // glass width
const SH = (SW * SCREEN_H) / SCREEN_W; // glass height, same aspect as the DOM screen
const BEZEL = 0.028;
const W = SW + BEZEL * 2;
const H = SH + BEZEL * 2;
const D = 0.085;
const RADIUS = 0.105;
const GLASS_Z = D / 2 + 0.002;

function roundedRect(w: number, h: number, r: number) {
  const s = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  return s;
}

/**
 * CSS matrix3d that maps a w x h element onto an arbitrary quad (projective transform).
 * Corners in order: top-left, top-right, bottom-right, bottom-left.
 */
function quadMatrix(w: number, h: number, q: number[]) {
  const [x0, y0, x1, y1, x2, y2, x3, y3] = q;
  const dx1 = x1 - x2;
  const dx2 = x3 - x2;
  const dx3 = x0 - x1 + x2 - x3;
  const dy1 = y1 - y2;
  const dy2 = y3 - y2;
  const dy3 = y0 - y1 + y2 - y3;
  let g = 0;
  let hh = 0;
  if (dx3 !== 0 || dy3 !== 0) {
    const den = dx1 * dy2 - dx2 * dy1;
    g = (dx3 * dy2 - dx2 * dy3) / den;
    hh = (dx1 * dy3 - dx3 * dy1) / den;
  }
  const a = (x1 - x0 + g * x1) / w;
  const b = (x3 - x0 + hh * x3) / h;
  const d = (y1 - y0 + g * y1) / w;
  const e = (y3 - y0 + hh * y3) / h;
  return `matrix3d(${a},${d},0,${g / w},${b},${e},0,${hh / h},0,0,1,0,${x0},${y0},0,1)`;
}

/** Imperative animation state, kept outside React so per-frame writes never re-render. */
const spinState = { v: 0 };
const screenHolder: { el: HTMLDivElement | null } = { el: null };
// Per-frame scratch values.
const tmp = new THREE.Vector3();
const normal = new THREE.Vector3();
const toCam = new THREE.Vector3();
const q: number[] = new Array(8).fill(0);

const CORNERS = [
  new THREE.Vector3(-SW / 2, SH / 2, GLASS_Z),
  new THREE.Vector3(SW / 2, SH / 2, GLASS_Z),
  new THREE.Vector3(SW / 2, -SH / 2, GLASS_Z),
  new THREE.Vector3(-SW / 2, -SH / 2, GLASS_Z),
];

function Phone() {
  const group = useRef<THREE.Group>(null);
  const { viewport, camera, size } = useThree();
  const glassShape = useMemo(() => roundedRect(SW, SH, RADIUS - BEZEL * 0.6), []);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    const k = 1 - Math.pow(0.0025, delta); // frame-rate independent ease

    const tx = (phoneTarget.x * viewport.width) / 2;
    const ty = (phoneTarget.y * viewport.height) / 2 + Math.sin(t * 1.1) * 0.035;
    const ts = phoneTarget.visible ? phoneTarget.scale : 0.0001;
    const drop = phoneTarget.visible ? 0 : -viewport.height * 0.7;

    g.position.x += (tx - g.position.x) * k;
    g.position.y += (ty + drop - g.position.y) * k;
    g.scale.setScalar(g.scale.x + (ts - g.scale.x) * k);

    // Idle sway, a tilt that follows scroll speed, and the screen-change spin.
    const tilt = velocity.norm * 0.35 * velocity.direction;
    const rx = phoneTarget.rotX + tilt + Math.sin(t * 0.8) * 0.02;
    const ry = phoneTarget.rotY + Math.sin(t * 0.6) * 0.05 + spinState.v;
    g.rotation.x += (rx - g.rotation.x) * k;
    g.rotation.y += (ry - g.rotation.y) * Math.min(1, k * 2.4);
    g.rotation.z += (phoneTarget.rotZ - g.rotation.z) * k;
    g.updateMatrixWorld();

    // Pin the DOM screen onto the projected glass corners.
    const el = screenHolder.el;
    if (!el) return;
    for (let i = 0; i < 4; i++) {
      tmp.copy(CORNERS[i]).applyMatrix4(g.matrixWorld).project(camera);
      q[i * 2] = ((tmp.x + 1) / 2) * size.width;
      q[i * 2 + 1] = ((1 - tmp.y) / 2) * size.height;
    }
    normal.set(0, 0, 1).transformDirection(g.matrixWorld);
    toCam.copy(camera.position).sub(g.position).normalize();
    const facing = normal.dot(toCam);
    const opacity = Math.max(0, Math.min(1, (facing - 0.12) * 5)) * Math.min(1, g.scale.x * 4);
    el.style.opacity = opacity.toFixed(3);
    if (opacity > 0) el.style.transform = quadMatrix(SCREEN_W, SCREEN_H, q);
  });

  return (
    <group ref={group} position={[viewport.width / 4, 0, 0]} scale={0.0001}>
      <RoundedBox args={[W, H, D]} radius={RADIUS} smoothness={8} bevelSegments={6} creaseAngle={0.4}>
        <meshPhysicalMaterial color="#26262b" metalness={0.92} roughness={0.28} clearcoat={1} clearcoatRoughness={0.15} />
      </RoundedBox>

      <mesh position={[0, 0, D / 2 + 0.0008]}>
        <shapeGeometry args={[glassShape, 24]} />
        <meshPhysicalMaterial color="#050506" roughness={0.08} metalness={0.2} clearcoat={1} />
      </mesh>

      <group position={[-W / 2 + 0.2, H / 2 - 0.2, -D / 2 - 0.012]}>
        <RoundedBox args={[0.3, 0.3, 0.025]} radius={0.07} smoothness={6}>
          <meshPhysicalMaterial color="#2e2e34" metalness={0.8} roughness={0.35} />
        </RoundedBox>
        {[
          [-0.065, 0.065],
          [-0.065, -0.065],
          [0.07, 0],
        ].map(([x, y], i) => (
          <mesh key={i} position={[x, y, -0.018]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 0.02, 32]} />
            <meshPhysicalMaterial color="#0b0b0e" metalness={0.5} roughness={0.1} clearcoat={1} />
          </mesh>
        ))}
      </group>

      <mesh position={[W / 2 + 0.004, 0.25, 0]}>
        <boxGeometry args={[0.012, 0.22, 0.03]} />
        <meshStandardMaterial color="#2a2a30" metalness={0.9} roughness={0.3} />
      </mesh>
      {[0.38, 0.18].map((y) => (
        <mesh key={y} position={[-W / 2 - 0.004, y, 0]}>
          <boxGeometry args={[0.012, 0.13, 0.03]} />
          <meshStandardMaterial color="#2a2a30" metalness={0.9} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

/** Fixed, full-screen WebGL layer holding the travelling phone. Desktop only. */
export default function PhoneScene() {
  const [screen, setScreen] = useState<ScreenId>(phoneTarget.screen);

  // Flip the phone a full turn whenever a section asks for a new screen; swap mid-turn.
  useEffect(() => {
    let shown = phoneTarget.screen;
    let timer = 0;
    const check = window.setInterval(() => {
      if (phoneTarget.screen === shown) return;
      shown = phoneTarget.screen;
      const next = shown;
      gsap.to(spinState, { v: spinState.v + Math.PI * 2, duration: 1.15, ease: "power3.inOut" });
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setScreen(next), 480);
    }, 100);
    return () => {
      window.clearInterval(check);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 6], fov: 30 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ position: "absolute", inset: 0 }}
      >
        <ambientLight intensity={0.35} />
        <directionalLight position={[3, 4, 5]} intensity={1.4} />
        <Environment resolution={256}>
          <Lightformer form="rect" intensity={3} position={[0, 4, 3]} scale={[8, 2, 1]} />
          <Lightformer form="rect" intensity={2} position={[-5, 0, 2]} rotation-y={Math.PI / 2} scale={[6, 1.2, 1]} />
          <Lightformer form="rect" intensity={1.6} position={[5, -1, 2]} rotation-y={-Math.PI / 2} scale={[6, 1.2, 1]} />
          <Lightformer form="ring" color="#ff5b2e" intensity={1.2} position={[2, -3, -4]} scale={3} />
        </Environment>
        <Phone />
      </Canvas>

      {/* The real DOM screen, projected onto the glass every frame */}
      <div
        ref={(el) => {
          screenHolder.el = el;
        }}
        className="absolute left-0 top-0 origin-top-left overflow-hidden will-change-transform"
        style={{ width: SCREEN_W, height: SCREEN_H, borderRadius: 46, opacity: 0 }}
      >
        <PhoneScreen id={screen} />
      </div>
    </div>
  );
}
