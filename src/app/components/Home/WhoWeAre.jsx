"use client";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";
import { MdArrowOutward } from "react-icons/md";
import Line from "../Line";

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
  const imagesRef = useRef([]);
  const headingRef = useRef(null);
  const mainHeadingRef = useRef(null);
  const mainContentRef = useRef(null);

  const overviewData = useRef(null);
  const backgroundColorRef = useRef(null);
  const imageSectionRef = useRef(null);
  const otherSectionRef = useRef(null);
  const svgRefs = useRef([]);
  const pinImageRef = useRef(null);

  const circleRef = useRef(null);
  const lineRef = useRef(null);
  const coloredLineRef = useRef(null);
  const counterRef = useRef(null);
  const underlineRef = useRef(null);
  const [counts, setCounts] = useState({
    projects: 0,
    googleQueries: 0,
    facebookQueries: 0,
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const section = sectionRef.current;
      const otherSection = otherSectionRef.current;
      const circle = circleRef.current;
      const underline = underlineRef.current;

      const getMaxX = () => section.scrollWidth - window.innerWidth;
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

      const whoWeAreTimeline = gsap.timeline({ paused: true });

      // whoWeAreTimeline.to(mainContentRef.current, {
      //   marginTop: "0",
      //   scrub: 1,
      // })

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

      ScrollTrigger.create({
        id: "whoWeAreAnim",
        trigger: container,
        start: "top 50%", // same logic as before
        once: true, // play only once
        onEnter: () => {
          whoWeAreTimeline.play();
        },
      });

      let hasPinnedOnce = false;

      ScrollTrigger.create({
        id: "whoWeArePin",
        trigger: container,
        start: "top top",
        end: () => "+=1500",
        // tweak 400 → 500 / 600 if you want it to stay pinned longer/shorter
        pin: true,
        pinSpacing: true,
        scrub: false, // we want time-based animation, not scrub
        anticipatePin: 1,
        markers: false,
        
      });

      // IMAGE REVEALS (once per image)
      imagesRef.current.forEach((img, i) => {
        ScrollTrigger.create({
          trigger: img,
          start: "top 90%",
          once: true,
          onEnter: () => {
            gsap.to(img, {
              opacity: 1,
              y: 0,
              clipPath: "inset(0% 0 0% 0)",
              duration: 1.6,
              ease: "power3.out",
            });
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full relative mt-[-100px]">
      <div ref={containerRef} className="pin-container">
        <div className="flex flex-row h-screen  main-container-scroll no-scrollbar relative">
          <div
            ref={sectionRef}
            className="main-container-scroll  no-scrollbar flex h-screen will-change-transform"
            style={{
              display: "flex",
              // width: "fit-content",
              willChange: "transform",
            }}
          >
            {/* bg-gtf-pink */}
            <div className="first_slide flex flex-row justify-between h-full bg-[#e24397] min-w-[100vw]">
              <div className="grid items-center grid-cols-12 gap-[40px]">
                <div
                  ref={mainContentRef}
                  className="relative w-[100vw] md:px-[50px] px-[15px] col-span-12 max-w-[80%] mx-auto mt-[-50vh]"
                >
                  <h2
                    ref={mainHeadingRef}
                    className="relative mb-[30px] uppercase baskervville_font tracking-[2px] 2xl:text-[100px] md:text-[80px] text-[32px] inline-block leading-[150px]"
                  >
                    {/* left-[50%] -translate-x-1/2 */}
                    Who We Are?
                  </h2>

                  <div className="relative mx-auto">
                    <div
                      ref={overviewData}
                      className="flex flex-col items-center space-y-2 gap-[25px]"
                    >
                      {lines.map((line, lineIndex) => (
                        <div
                          key={lineIndex}
                          ref={(el) => (textRef.current[lineIndex] = el)} // One ref per line
                          className="flex flex-wrap justify-left text-left"
                        >
                          {line.map((word, wordIndex) =>
                            typeof word === "string" ? (
                              <span
                                key={wordIndex}
                                className="montserrat font-medium pr-[8px] 2xl:leading-[1.4] tracking-[-2.5px] 2xl:text-[60px]  text-[32px] inline-block text-left"
                              >
                                {word}
                              </span>
                            ) : (
                              <span
                                key={wordIndex}
                                className={`relative montserrat font-medium 2xl:leading-[1.4] tracking-[-2.5px] 2xl:text-[60px] text-[32px] inline-block text-left`}
                              >
                                {word.word}
                                {word.sibling ? (
                                  <img
                                    ref={(el) =>
                                      (svgRefs.current[wordIndex] = el)
                                    }
                                    src={word.sibling}
                                    className={`absolute w-full h-full inset-0 ${word.imgClass}`}
                                    style={{
                                      opacity: "0",
                                    }}
                                  />
                                ) : (
                                  <span
                                    ref={underlineRef}
                                    className="line absolute h-[4px] w-full bg-[#fff] left-0 bottom-[15px]"
                                    style={{
                                      width: 0,
                                      opacity: 0,
                                    }}
                                  ></span>
                                )}
                              </span>
                            )
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;