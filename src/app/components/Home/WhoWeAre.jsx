"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, SplitText);

const lines = [
  [
    "Born",
    " ",
    "from",
    " ",
    "Gurukul",
    " ",
    "The",
    " ",
    "Foundation,",
    " ",
    "We",
    " ",
    "are",
    " ",
    "a",
    " ",
    {
      word: "Made-in-India",
      className: "highlightWord",
      sibling: "/assets/home/who_we_are/line.png",
      imgClass: "!h-[170%] !top-[-40%]",
    },
    " ",
    "company",
    " ",
    "shaping",
    " ",
    "brands",
    " ",
    "for",
    " ",
    "a",
    " ",
    "world",
    " ",
    "that",
    " ",
    "never",
    " ",
    "stands",
    " ",
    "still.",
    " ",
    "We",
    " ",
    "create",
    " ",
    {
      word: "ideas",
      className: "highlightWord word_underline",
      sibling: null,
      imgClass: "!h-[170%] !top-[-20%]",
    },
    " ",
    "that",
    " ",
    "move",
    " ",
    "people",
    " ",
    "and",
    " ",
    "markets.",
  ],
];

const WhoWeAre = () => {
  const textRef = useRef([]);
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const mainHeadingRef = useRef(null);
  const mainContentRef = useRef(null);

  const overviewData = useRef(null);
  const svgRefs = useRef([]);
  const circleRef = useRef(null);
  const lineRef = useRef(null);
  const underlineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const circle = circleRef.current;
      const underline = underlineRef.current;

      const splits = textRef.current
        .filter(Boolean)
        .map((el) => new SplitText(el, { type: "chars" }));
      const chars = splits.flatMap((s) => s.chars);

      gsap.set(overviewData.current, { height: 0 });
      gsap.set(chars, { opacity: 0, transform: "translateY(30px)" });
      gsap.set(circle, {
        scale: 0,
        opacity: 0,
        transformOrigin: "center center",
      });

      // Animation for Heading and Text
      const whoWeAreTimeline = gsap.timeline({ paused: true });

      whoWeAreTimeline.to(mainHeadingRef.current, {
        fontSize: "80px",
        left: 0,
        x: 0,
        duration: 0.2,
        ease: "power3.out",
      });

      whoWeAreTimeline.to(mainContentRef.current, {
        marginTop: 0,
        duration: 0.2,
      });
      whoWeAreTimeline.to(overviewData.current, {
        height: "auto",
        duration: 0.8,
      });
      whoWeAreTimeline.to(chars, {
        y: 0,
        opacity: 0.2,
        duration: 0.6,
        ease: "power2.out",
      });

      whoWeAreTimeline.to(svgRefs.current, {
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
      });
      whoWeAreTimeline.to(underline, {
        opacity: 1,
        width: "100%",
        duration: 0.8,
      });

      whoWeAreTimeline.to(
        chars,
        {
          opacity: 1,
          duration: 1.6,
          stagger: 0.03,
          ease: "power2.out",
        },
        "-=0.2"
      );

      // First ScrollTrigger for Heading and Text Animation at 50%
      ScrollTrigger.create({
        id: "whoWeAreAnim",
        trigger: container,
        start: "top 50%", // Trigger at 50% from the top
        once: true, // Play only once
        onEnter: () => {
          whoWeAreTimeline.play();
        },
      });

      // Second ScrollTrigger for Pinning at 0% from the top
      ScrollTrigger.create({
        id: "whoWeArePin",
        trigger: container,
        start: "top top", // Pin section when the top of container reaches the top of the viewport
        end: "+=1500", // Stay pinned for 1500px scroll distance
        pin: true, // Pin the section
        pinSpacing: true, // Allow space for the pinned section
        scrub: false, // Time-based animation, not scrub
        anticipatePin: 1,
        markers: false, // Disable markers
        invalidateOnRefresh: true, // Force recalculation on window resize or refresh
        onEnter: () => {
          // Apply the transform-based pinning to avoid top/left shift
          gsap.set(container, { 
            transform: "translate3d(0, 0, 0)", // Use transform instead of top/left
          });
        },
        onLeaveBack: () => {
          // Optionally add logic when the section unpins (e.g., revert styles or actions)
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full relative overflow-hidden">
      <div ref={containerRef} className="relative">
        <div
          className="relative"
        >
          <h2
            ref={mainHeadingRef}
            className="relative mb-[30px] uppercase baskervville_font tracking-[2px] 2xl:text-[100px] md:text-[80px] text-[32px] inline-block leading-[150px]"
          >
            Who We Are?
          </h2>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
