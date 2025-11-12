"use client";
import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
// If you have the plugin file locally, adjust this path:
import { ScrambleTextPlugin } from "@/lib/gsap-bonus/ScrambleTextPlugin";
gsap.registerPlugin(ScrambleTextPlugin);

export default function MainLoader() {
  // Change just the middle word, keep “We Are … Agency”
  const words = ["Digital", "Branding", "Design", "Development"];

  const ref = useRef(null);    // the <span> that scrambles
  const tlRef = useRef(null);

  // Tuning
  const duration = 1.1;        // scramble duration per word (seconds)
  const hold = 0.6;            // pause after each reveal (seconds)
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@$%#&*";

  useLayoutEffect(() => {
    if (!ref.current) return;

    // Kill old timeline in Strict Mode remounts
    tlRef.current && tlRef.current.kill();

    const tl = gsap.timeline({ repeat: -1 });

    // Queue a tween for each word, then a short hold
    words.forEach((w) => {
      tl.to(ref.current, {
        duration,
        ease: "none",
        scrambleText: {
          text: w,              // target text
          chars,                // random character set
          speed: 0.4,           // scramble update speed
          revealDelay: 0.15,    // delay before starting to lock characters
          // tweenLength: false, // set to true if you like growing/shortening length effect
        },
      }).to({}, { duration: hold }); // small pause after reveal
    });

    tlRef.current = tl;
    return () => tl.kill();
  }, [chars, duration, hold, words]);

  return (
    <div className="fixed inset-0 h-screen w-screen bg-black/70 z-[9999] flex items-center justify-center">
      <h1 className="text-white text-[clamp(40px,9vw,100px)] uppercase font-bold tracking-wide leading-[0.85]">
        We Are{" "}
        <span ref={ref} className="text-[#e3cba7] inline-block align-baseline">
          {words[0]}
        </span>{" "}
        Agency
      </h1>
    </div>
  );
}
