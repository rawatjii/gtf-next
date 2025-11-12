"use client";
import React, { Suspense, useEffect, useState, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, Preload, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

const boxes = [
  { position: [2, -1.5, -1], color: "#e24397", opacity: 0.7 },
  { position: [-3.5, 1.5, 0], color: "#fde93d", opacity: 0.7 },
  { position: [3, 2, -1], color: "#2aaee4", opacity: 0.7 },
  { position: [1, 1, -4], color: "#fde93d", opacity: 0.3 },
  { position: [-3, -1.8, -4], color: "#2aaee4", opacity: 0.3 },
  { position: [12, -3, -10], color: "#2aaee4", opacity: 0.1, radius: 0.1 },
  { position: [-8, 0, -10], color: "#e24397", opacity: 0.1, radius: 0.1 },
];

/** Re-usable rounded box with Float animation */
function Box({ position, color, opacity, radius = 0.05 }) {
  // One material per box – memoised to avoid recreation on every render
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color,
        transparent: true,
        opacity,
        metalness: 0.05,
        roughness: 0.1,
      }),
    [color, opacity]
  );

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.6}>
      <mesh position={position}>
        <RoundedBox args={[1, 1, 0.3]} radius={radius} smoothness={2}>
          <primitive attach="material" object={material} />
        </RoundedBox>
      </mesh>
    </Float>
  );
}

/** Full-screen background with floating boxes */
export default function FloatingBG() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null; // avoid SSR

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas
        gl={{ alpha: true, antialias: true }}
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          {/* Lights – one ambient + one directional (centered) */}
          <ambientLight intensity={1} />
          <directionalLight
            position={[-2, 0, 5]}
            intensity={1}
            castShadow
            shadow-mapSize={[1024, 1024]}
          />

          {/* Render all boxes from the data array */}
          {boxes.map((b, i) => (
            <Box key={i} {...b} />
          ))}

          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}