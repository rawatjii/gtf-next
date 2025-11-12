"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function FloatingBG() {
  const [init, setInit] = useState(false);

  // One-time engine init (runs once on mount)
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  // Particle config – same as before, tweak for your brand
  const options = useMemo(
    () => ({
      background: {
        color: { value: "transparent" }, // preserves white loader bg
      },
      fpsLimit: 120,
      interactivity: {
        detectsOn: "canvas",
        events: {
          resize: { enable: true },
        },
      },
      particles: {
        color: { value: ["#e24397", "#fde93d", "#2aaee4"] }, // your palette
        links: { enable: false },
        move: {
          enable: true,
          speed: 1.2,
          direction: "none",
          random: false,
          straight: false,
          outModes: { default: "out" },
        },
        number: {
          density: { enable: true, area: 800 },
          value: 60,
        },
        opacity: {
          value: { min: 0.1, max: 0.6 },
          animation: { enable: true, speed: 1, sync: false },
        },
        shape: { type: "circle" },
        size: {
          value: { min: 1, max: 4 },
          animation: { enable: true, speed: 2, sync: false },
        },
      },
      detectRetina: true,
    }),
    []
  );

  // Don't render until initialized
  if (!init) return null;

  return (
    <Particles
      id="tsparticles-loader"
      options={options}
      className="absolute inset-0 -z-10"
    />
  );
}