"use client";

import { useEffect, useRef } from "react";

export default function NoiseOverlay({
  zIndex = 9999,
  intervalMs = 100,
  alpha = 12,
  patternCount = 8,
  disableBelowWidth = 1024,
  className = "",
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Disable on smaller screens
    if (window.innerWidth <= disableBelowWidth) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width, height, imageData, buf32;
    const noisePatterns = [];
    let rafId;

    const generateNoisePatterns = () => {
      noisePatterns.length = 0;
      for (let p = 0; p < patternCount; p++) {
        const pattern = new Uint32Array(buf32.length);
        for (let i = 0; i < pattern.length; i++) {
          const gray = (Math.random() * 256) | 0;
          pattern[i] =
            (alpha << 24) | (gray << 16) | (gray << 8) | gray;
        }
        noisePatterns.push(pattern);
      }
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";

      imageData = ctx.createImageData(canvas.width, canvas.height);
      buf32 = new Uint32Array(imageData.data.buffer);

      generateNoisePatterns();
    };

    let currentPattern = 0;
    const updateNoise = () => {
      if (document.hidden) return;
      buf32.set(noisePatterns[currentPattern]);
      currentPattern = (currentPattern + 1) % noisePatterns.length;
      ctx.putImageData(imageData, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    let lastUpdate = 0;
    const loop = (time) => {
      if (!lastUpdate) lastUpdate = time;
      if (time - lastUpdate > intervalMs) {
        updateNoise();
        lastUpdate = time;
      }
      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafId);
    };
  }, [alpha, intervalMs, patternCount, disableBelowWidth]);

  return (
    <div
      className={`fixed inset-0 noise-overlay ${className}`}
      aria-hidden="true"
      style={{ zIndex }}
    >
      <canvas ref={canvasRef} />

      <style jsx>{`
        .noise-overlay {
          position: fixed;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          overflow: hidden;
        }

        .noise-overlay canvas {
          display: block;
          width: 100%;
          height: 100%;
          pointer-events: none;
          image-rendering: pixelated;
        }

        /* Disable on mobile & tablet */
        @media (max-width: 1024px) and (orientation: landscape),
          (max-width: 768px) {
          .noise-overlay {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
