"use client";

import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LenisProvider({ children }) {
  const lenisRef = useRef(null);
  const rafIdRef = useRef(null);

  useEffect(() => {
    // 1) init lenis
    const lenis = new Lenis({
      duration: 1.1,          // feel
      smoothWheel: true,
      smoothTouch: false,
      gestureDirection: "vertical",
      // easing: (t) => 1 - Math.pow(1 - t, 3), // optional custom easing
    });
    lenisRef.current = lenis;

    // 2) tie Lenis to GSAP ScrollTrigger
    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const raf = (time) => {
      lenis.raf(time);
      // Important: keep ST in sync each frame
      ScrollTrigger.update();
      rafIdRef.current = requestAnimationFrame(raf);
    };
    rafIdRef.current = requestAnimationFrame(raf);

    // 3) refresh ST after first tick so pins calc with smooth scroller
    setTimeout(() => ScrollTrigger.refresh(), 0);

    return () => {
      cancelAnimationFrame(rafIdRef.current);
      lenis.off("scroll", onScroll);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Expose helper methods to window if you want to stop() on modals/intro video:
  // window.lenis?.stop(); window.lenis?.start();
  useEffect(() => {
    if (lenisRef.current) window.lenis = lenisRef.current;
    return () => { if (window.lenis) delete window.lenis; };
  }, []);

  return children;
}
