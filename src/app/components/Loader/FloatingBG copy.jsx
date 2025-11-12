"use client";
import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, Billboard, Preload } from "@react-three/drei";
import * as THREE from "three";

/** One floating 3D box with glass-like reflections */
function FloatingBox({
  size = 1.2,  // Set square size (both width and height)
  position = [0, 0, 0], 
  float = 1.2, 
  rotate = 0.4, 
  speed = 1.1, 
  depth = 0.3,  // Z-depth (thickness)
}) {
  // Random rotation for each box to create a 3D card effect
  const randomRotationX = Math.PI * 2;  // Random X-axis rotation (360°)
  const randomRotationY = Math.PI * 2;  // Random Y-axis rotation (360°)
  const randomRotationZ = Math.PI * 2;  // Random Z-axis rotation (360°)

  // Colors to choose from for each floating box
  const colors = ["#e24397", "#fde93d", "#2aaee4"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)]; // Randomly select a color

  return (
    <Float speed={speed} floatIntensity={float} rotationIntensity={rotate}>
      <Billboard position={position}>
        <mesh
         position={position}
          rotation={[randomRotationX, randomRotationY, randomRotationZ]}  // Apply random rotations
          castShadow
          receiveShadow
        >
          {/* Use boxGeometry to create 3D square boxes (Width, Height, Depth) */}
          <boxGeometry args={[size, size, depth]} />  {/* Width, Height, Depth */}
          
          {/* Apply the random color to the box */}
          <meshStandardMaterial
            color={randomColor}  // Use random color
            metalness={0.6}       // High metalness to simulate reflection (glass effect)
            roughness={0.2}       // Low roughness to allow reflections
            opacity={1}
            transparent={true}
            shadowBias={-0.001}   // Helps with smoother shadow rendering
            envMapIntensity={1.2}   // Adjust this to control the intensity of the reflection
          />
        </mesh>
      </Billboard>
    </Float>
  );
}

/** Fullscreen background canvas with floating 3D boxes */
export default function FloatingBG() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null; // prevent SSR rendering

  const items = [
    { pos: [-2.4, 1.1, 0], f: 1.8, r: 0.5, s: 1.0, depth: 0.3 },
    { pos: [2.1, 0.6, 0], f: 1.4, r: 0.6, s: 0.9, depth: 0.3 },
    { pos: [-0.2, -1.0, 0], f: 1.6, r: 0.4, s: 1.2, depth: 0.3 },
    { pos: [1.3, -0.8, 0], f: 1.3, r: 0.5, s: 1.0, depth: 0.3 },
  ];

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas gl={{ alpha: true, antialias: true }} camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 2]}>
        {/* Add lighting and shadows */}
        <ambientLight intensity={1} /> {/* Soft ambient light */}
        
        {/* Directional light centered around the scene to evenly illuminate all objects */}
        <directionalLight
          position={[-2, 0, 5]}   // Light source at the center
          intensity={1}           // Light intensity
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />

        <Suspense fallback={null}>
          {items.map((it, i) => (
            <FloatingBox
              key={i}
              position={it.pos}
              float={it.f}
              rotate={it.r}
              speed={it.s}
              depth={it.depth}  // Pass depth to create thickness
              size={1.2}        // Set fixed square size for all boxes
            />
          ))}
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
