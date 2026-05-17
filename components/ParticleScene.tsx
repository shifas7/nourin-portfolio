"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 320;

// Generate positions and colors statically outside the component to ensure render purity
const { positions, colors } = (() => {
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const colors = new Float32Array(PARTICLE_COUNT * 3);

  const warmColors = [
    [0.29, 0.2, 0.16], // espresso
    [0.85, 0.76, 0.69], // cream
    [0.95, 0.91, 0.87], // ivory
    [0.95, 0.87, 0.8], // beige
  ];

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 4;

    const c = warmColors[Math.floor(Math.random() * warmColors.length)];
    colors[i * 3] = c[0];
    colors[i * 3 + 1] = c[1];
    colors[i * 3 + 2] = c[2];
  }
  return { positions, colors };
})();

function Particles() {
  const meshRef = useRef<THREE.Points>(null);
  const geomRef = useRef<THREE.BufferGeometry>(null);
  
  // Keep a clean CPU snapshot of home positions for deflection calculations
  const homePositions = useRef<Float32Array | null>(null);

  useEffect(() => {
    homePositions.current = new Float32Array(positions);
  }, []);

  useFrame((state) => {
    if (!meshRef.current || !geomRef.current || !homePositions.current) return;
    
    const t = state.clock.elapsedTime;
    
    // Smooth orbital rotation of the whole cloud
    meshRef.current.rotation.y = t * 0.012;
    meshRef.current.rotation.x = Math.sin(t * 0.008) * 0.04;

    const posAttr = geomRef.current.attributes.position as THREE.BufferAttribute;
    const array = posAttr.array as Float32Array;

    // Convert mouse coordinates ([-1, 1]) to scale fitting camera position [0, 0, 5]
    const mouseX = state.pointer.x * 4.2;
    const mouseY = state.pointer.y * 2.8;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const idx = i * 3;
      
      const homeX = homePositions.current[idx];
      const homeY = homePositions.current[idx + 1];
      const homeZ = homePositions.current[idx + 2];

      // Calculate distance between mouse and current particle position in XY space
      const dx = mouseX - homeX;
      const dy = mouseY - homeY;
      const distSq = dx * dx + dy * dy;
      const dist = Math.sqrt(distSq);

      const forceFieldRadius = 1.3;

      if (dist < forceFieldRadius) {
        // Push particle away with exponential spring decline
        const force = (forceFieldRadius - dist) / forceFieldRadius;
        const pushX = (dx / dist) * force * -0.5;
        const pushY = (dy / dist) * force * -0.5;

        // Animate coordinates smoothly
        array[idx] = THREE.MathUtils.lerp(array[idx], homeX + pushX, 0.1);
        array[idx + 1] = THREE.MathUtils.lerp(array[idx + 1], homeY + pushY, 0.1);
      } else {
        // Return home smoothly in the absence of cursor force
        array[idx] = THREE.MathUtils.lerp(array[idx], homeX, 0.06);
        array[idx + 1] = THREE.MathUtils.lerp(array[idx + 1], homeY, 0.06);
      }

      // Continuous breathing waves on Z coordinate
      array[idx + 2] = homeZ + Math.sin(t * 0.45 + homeX) * 0.15;
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry ref={geomRef}>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        vertexColors
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export default function ParticleScene() {
  // Disable dynamic ThreeJS particle canvas on extremely low power devices or reduced-motion options
  if (typeof globalThis !== "undefined") {
    const prefersReduced = globalThis.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const lowPower =
      typeof navigator !== "undefined" &&
      "hardwareConcurrency" in navigator &&
      navigator.hardwareConcurrency <= 2;
    if (prefersReduced || lowPower) return null;
  }

  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
        dpr={[1, 1.5]}
      >
        <Particles />
      </Canvas>
    </div>
  );
}
