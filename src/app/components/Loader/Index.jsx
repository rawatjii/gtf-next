"use client";
import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrambleTextPlugin } from "@/lib/gsap-bonus/ScrambleTextPlugin";
import dynamic from "next/dynamic";

gsap.registerPlugin(ScrambleTextPlugin);

const FloatingBG = dynamic(() => import("./FloatingBG"), { ssr: false });

export default function MainLoader() {
  const words = ["Marketing", "Branding", "Creative", "Digital"];

  // Text color per word (replace with your brand palette)
  const wordColors = ["#e24397", "#fde93d", "#2aaee4"];

  const textRef = useRef(null); // scrambled word
  const tlRef = useRef(null);
  const loaderRef = useRef(null);

  // Tuning
  const duration = 0.5; // scramble per word
  const hold = 1; // pause after each reveal
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  useLayoutEffect(() => {
    if (!loaderRef.current) return;

    // tlRef.current && tlRef.current.kill();

    // Set initial text color
    // gsap.set(textRef.current, { color: wordColors[0] });

    // const tl = gsap.timeline({ repeat: -1 });

    // words.forEach((w, i) => {
    //   tl.to(textRef.current, {
    //     duration,
    //     ease: "none",
    //     scrambleText: {
    //       text: w,
    //       chars,
    //       speed: 0.4,
    //       revealDelay: 0.05,
    //     },
    //     onStart: () => {
    //       // Animate ONLY the word color (parent background stays unchanged)
    //       gsap.to(textRef.current, {
    //         color: wordColors[i % wordColors.length],
    //         duration: 0.6,
    //         ease: "power2.inOut",
    //       });
    //     },
    //   }).to({}, { duration: hold });
    // });

    // tlRef.current = tl;

    // fade out loader animation
    const hideTimeout = setTimeout(() => {
      gsap.to(loaderRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.set(loaderRef.current, { display: "none" }); // remove loader after finish fade effect
        },
      });
    }, 3500);

    return () => {
      clearTimeout(hideTimeout);
      // tl.kill();
    };
  }, [words, wordColors, chars, duration, hold]);

  return (
    <>
      {/* 3D floating background layer */}

      <div
        ref={loaderRef}
        className="fixed inset-0 h-screen w-screen bg-[#f9f9f9] z-[999999] flex items-center justify-center"
      >
        <video width="250" height="auto" autoPlay muted loop className="mix-blend-darken">
          <source src="/assets/loader/loader.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* <FloatingBG />
        <h1 className="text-black text-opacity-70 text-[clamp(20px,9vw,30px)] font-normal tracking-[1px] uppercase">
          We Are{" "}
          <span
            ref={textRef}
            className="inline-block align-baseline font-medium"
          >
            {words[0]}
          </span>{" "}
          Agency
        </h1> */}
      </div>
    </>
  );
}
