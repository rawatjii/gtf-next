// components/HorizontalPinScroll.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalPinScroll() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const slides = [
    { color: 'from-indigo-900 to-purple-900', title: 'Slide One' },
    { color: 'from-purple-900 to-pink-900',   title: 'Slide Two' },
    { color: 'from-pink-900 to-red-900',      title: 'Slide Three' },
    { color: 'from-red-900 to-orange-900',    title: 'Slide Four' },
    // add more objects here if needed
  ];

  const totalSlides = slides.length;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !containerRef.current) return;

    const totalWidth = window.innerWidth * (totalSlides - 1);

    // Pin the whole section
    ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: () => `+=${totalWidth * 1.5}`, // longer scroll range = more wheel sensitivity
      pin: true,
      pinSpacing: true,
      // markers: true, // for debugging
    });

    // Prevent native scroll while pinned → we handle it manually
    const preventDefault = (e) => {
      if (ScrollTrigger.isInViewport(section, true)) {
        e.preventDefault();
      }
    };

    window.addEventListener('wheel', preventDefault, { passive: false });

    const onWheel = (e) => {
      if (!ScrollTrigger.isInViewport(section, true) || isAnimating) return;

      const delta = e.deltaY > 0 ? 1 : -1; // down = next, up = prev

      setCurrentIndex((prev) => {
        const next = prev + delta;
        if (next < 0 || next >= totalSlides) return prev; // clamp

        // animate only if index actually changes
        if (next !== prev) {
          setIsAnimating(true);
          gsap.to(containerRef.current, {
            x: -next * window.innerWidth,
            duration: 0.6,
            ease: 'power2.out',
            onComplete: () => setIsAnimating(false),
          });
        }

        return next;
      });
    };

    window.addEventListener('wheel', onWheel, { passive: false });

    // Cleanup
    return () => {
      window.removeEventListener('wheel', preventDefault);
      window.removeEventListener('wheel', onWheel);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [isAnimating, totalSlides]);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-gray-950"
    >
      <div
        ref={containerRef}
        className="absolute top-0 left-0 flex h-full will-change-transform"
        style={{ transform: `translateX(-${currentIndex * 100}vw)` }}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`flex h-full w-screen flex-shrink-0 items-center justify-center bg-gradient-to-r ${slide.color}`}
          >
            <h1 className="text-6xl md:text-8xl font-bold text-white">
              {slide.title}
            </h1>

            {/* Optional: show current slide number */}
            <div className="absolute bottom-10 right-10 text-white/60 text-2xl">
              {i + 1} / {totalSlides}
            </div>
          </div>
        ))}
      </div>

      {/* Hint when at first/last slide */}
      {currentIndex === 0 && (
        <div className="pointer-events-none absolute bottom-12 left-1/2 z-20 -translate-x-1/2 text-white/70 text-xl animate-pulse">
          scroll down →
        </div>
      )}
      {currentIndex === totalSlides - 1 && (
        <div className="pointer-events-none absolute bottom-12 left-1/2 z-20 -translate-x-1/2 text-white/70 text-xl animate-pulse">
          ↑ scroll up
        </div>
      )}
    </section>
  );
}