"use client";
import React, { useEffect, useImperativeHandle, useRef, forwardRef } from "react";
import gsap from "gsap";

const ScrambleHoverText = forwardRef(function ScrambleHoverText(
  { text = "Hover Me", duration = 1.6, className = "" },
  ref
) {
  const elRef = useRef(null);
  const originalRef = useRef(text);
  const tweenRef = useRef(null);

  useEffect(() => {
    originalRef.current = text;
    if (elRef.current) elRef.current.textContent = text;
  }, [text]);

  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const randomChar = () => chars[Math.floor(Math.random() * chars.length)];

  const randomCharDifferent = (avoidChar) => {
    // If avoidChar is space, keep it a space (optional, looks nicer)
    if (avoidChar === " ") return " ";
  
    let c = avoidChar;
    while (c === avoidChar) {
      c = chars[Math.floor(Math.random() * chars.length)];
    }
    return c;
  };

  const play = () => {
    const el = elRef.current;
    if (!el) return;

    if (tweenRef.current) tweenRef.current.kill();

    const original = originalRef.current;
    const state = { p: 0 };

    tweenRef.current = gsap.to(state, {
      p: original.length,
      duration,              // ✅ slower by default
      ease: "none",
      overwrite: true,
      onStart: () => {
        // ✅ instantly show a fully scrambled string (no delay / no original flash)
        let out = "";
        for (let i = 0; i < original.length; i++) {
          out += randomCharDifferent(original[i]);
        }
        el.textContent = out;
      },
      onUpdate: () => {
        const locked = Math.floor(state.p);
        let out = "";
  
        for (let i = 0; i < original.length; i++) {
          if (i < locked) out += original[i];
          else out += randomCharDifferent(original[i]); // ✅ never same as original
        }
  
        el.textContent = out;
      },
      onComplete: () => {
        el.textContent = original;
      },
    });
  };

  const reset = () => {
    const el = elRef.current;
    if (!el) return;
    if (tweenRef.current) tweenRef.current.kill();
    el.textContent = originalRef.current;
  };

  useImperativeHandle(ref, () => ({ play, reset }), []);

  return (
    <span
      ref={elRef}
      className={className}
      style={{ display: "inline-block" }}
    />
  );
});

export default ScrambleHoverText;
