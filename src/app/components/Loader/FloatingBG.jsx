"use client";

import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, useGLTF, Preload, Environment } from "@react-three/drei";
import * as THREE from "three";

export default function FloatingBG() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent rendering on server (SSR)
  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 5, 5]} intensity={1.5} />
          <directionalLight position={[-5, 5, -5]} intensity={0.7} />

          {/* Optional nice reflections (uncomment if you want) */}
          {/* <Environment preset="city" /> */}

          {/* Floating animated model */}
          <Float
            speed={1.4}
            rotationIntensity={0.4}
            floatIntensity={0.8}
          >
            <Model url="assets/models/cubes.glb" scale={2.2} />
          </Float>

          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}

// Separate component that loads the GLB
function Model({ url, scale = 1 }) {
  const { scene } = useGLTF(url);

  // Fix washed-out colors by forcing sRGB (common GLB issue)
  React.useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        const mesh = child;
        if (mesh.material && mesh.material.isMeshStandardMaterial) {
          mesh.material.colorSpace = THREE.SRGBColorSpace;
          mesh.material.needsUpdate = true;
        }
      }
    });
  }, [scene]);

  return <primitive object={scene} scale={scale} />;
}

// Preload the model so it's ready instantly
Model.preload = (url) => useGLTF.preload(url);