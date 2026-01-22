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
      className: "highlightWord !font-bold",
      sibling: "/assets/home/who_we_are/line3.png",
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
      className: "highlightWord !font-bold",
      sibling: "/assets/home/who_we_are/line2.png",
      imgClass: "!h-[auto] !top-[unset] !bottom-0",
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
  const underlineRef = useRef(null);
  const overviewData = useRef(null);
  const backgroundColorRef = useRef(null);
  const imageSectionRef = useRef(null);
  const svgRefs = useRef([]);

  let hasChangedBg = false;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const container = containerRef.current;
      const images = imagesRef.current;
      const ov_data = overviewData.current;
      const bgColorRef = backgroundColorRef.current;
      const imageSection = imageSectionRef.current;
      const svg = svgRefs.current;

      if (!section || !container || !images) return;

      // Initial states for animations

      const scrollWidth = section.scrollWidth;
      const windowWidth = window.innerWidth;
      const maxTranslateX = scrollWidth - windowWidth;
      const heading = headingRef.current;
      const mainHeading = mainHeadingRef.current;
      const mainContent = mainContentRef.current;
      const underline = underlineRef.current;

      const splitInstances = textRef.current
        .filter(Boolean)
        .map(
          (ref) => new SplitText(ref, { type: "chars", charsClass: "char" })
        );
      const allChars = splitInstances.flatMap((split) => split.chars);

      gsap.set(allChars, { opacity: 0.2 });

      // mainContent
      gsap.set(ov_data, { height: "auto" });

      const whoWeAreTimeline = gsap.timeline({
        scrollTrigger: {
          id: "whoWeAreTrigger",
          trigger: container,
          start: "top 50%",
          end: "top 0",
          markers: false,
          scrub: 1,
        },
      });

      whoWeAreTimeline.to(mainContent, {
        marginTop: "0",
        scrub: 1,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          id: "whoWeAreTrigger",
          trigger: container,
          start: "top top",
          end: () => `+=1000`,
          pin: true,
          markers: false,
          scrub: 1,
          pinSpacing: true,
        },
      });

      // to(allChars, {display:'inline-block', duration:5, ease:"power2"}, "+=4").
      tl.to(allChars, {
        opacity: 1,
        duration: 0.1,
        stagger: 0.008,
        ease: "power2.out",
        immediateRender: false,
      });
      tl.to(
        svg,
        {
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
        },
        "-=1"
      );

      tl.to(
        underline,
        {
          opacity: 1,
          width: "100%",
          duration: 0.8,
        },
        "-=1.2"
      );

      ScrollTrigger.refresh();
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
                  className="relative w-[100vw] md:px-[50px] px-[15px] col-span-12 max-w-[80%] mx-auto text-white"
                >
                  <h2
                    ref={mainHeadingRef}
                    className="relative mb-[30px]  neue_font font-bold tracking-[2px] 2xl:text-[100px] md:text-[80px] text-[32px] inline-block leading-[150px]"
                  >
                    {/* left-[50%] -translate-x-1/2 */}
                    Who We Are<span className="text-[#fdda39]">?</span>
                  </h2>

                  <div className="relative mx-auto">
                    <div
                      ref={overviewData}
                      className="flex flex-col items-center space-y-2 gap-[25px] just_font"
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
                                className="just_font font-regular pr-[8px] 2xl:leading-[1.4] 2xl:text-[60px]  text-[28px] inline-block text-left"
                              >
                                {word}
                              </span>
                            ) : (
                              <span
                                key={wordIndex}
                                className={`relative just_font font-regular 2xl:leading-[1.4] 2xl:text-[60px] text-[28px] inline-block text-left ${word.className}`}
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
