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
      sibling: "/assets/home/who_we_are/line.svg",
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
    "ideas",
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

const Feature = () => {
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
  const imageContentRef = useRef(null);
  const [counts, setCounts] = useState({
    projects: 0,
    googleQueries: 0,
    facebookQueries: 0,
  });



  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const section = sectionRef.current;
      const pinned = pinImageRef.current;
      const slides = [
        section.children[0],        // Slide 1
        imageContentRef.current,    // Slide 2 (your ref)
        section.children[2],        // Slide 3
      ];

      const imageSets = pinned.children; // 3 divs with absolute images

      const getMaxX = () => section.scrollWidth - window.innerWidth;

      gsap.set(imageSets, { clipPath: "inset(100% 0 0 0)", opacity: 1 });
      gsap.set(imageSets[0], { clipPath: "inset(0% 0 0% 0)" });

      const splits = textRef.current
        .filter(Boolean)
        .map((el) => new SplitText(el, { type: "chars" }));
      const chars = splits.flatMap((s) => s.chars);

      gsap.set(overviewData.current, { height: 0 });
      gsap.set(chars, { opacity: 0, transform: "translateY(30px)" });
      // gsap.set(circle, {
      //   scale: 0,
      //   opacity: 0,
      //   transformOrigin: "center center",
      // });

      const whoWeAreTimeline = gsap.timeline({
        scrollTrigger: {
          id: "whoWeAreTrigger",
          trigger: container,
          start: "top 50%",
          end: "top 0",
          markers: false,
          scrub: 1,
          toggleActions: "play none none none",
        },
      });

      whoWeAreTimeline.to(mainContentRef.current, {
        marginTop: "0",
        scrub: 1,
      });

      let tl = gsap.timeline();

      // REVERSIBLE HORIZONTAL SCROLL
      gsap.to(section, {
        x: () => -getMaxX(),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${getMaxX() + window.innerWidth}`,
          pin: true,
          scrub: 1,
          // markers:true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          pinType: "transform",
          onUpdate: (self) => {
            const imageContent = imageContentRef.current;
            const pinned = pinImageRef.current;
            if (!imageContent || !pinned) return;

            const rect = imageContent.getBoundingClientRect();
            const vw = window.innerWidth;

            // Start animation when section is at 70% from left
            const startX = vw * 0.30;   // 70vw
            const endX   = 0;           // 0px → section aligned to left edge

            let localProgress = 0;

            // Only run when we're in the 70vw → 0 range
            if (rect.left <= startX && rect.left >= endX) {
              // Perfect linear mapping: 70vw → 0 = progress 0 → 1
              localProgress = (startX - rect.left) / (startX - endX);
            }
            else if (rect.left < endX) {
              localProgress = 1; // Lock at final position
            }
            // Before 70vw → no movement
            // After 0 → stays centered

            localProgress = gsap.utils.clamp(0, 1, localProgress);

            // Optional: smooth easing (highly recommended)
            const easedProgress = gsap.parseEase("power2.out")(localProgress);

            gsap.set(pinned, {
              x: 50 * (1 - easedProgress) + "vw",   // 100 → 0 (off-right → center)
              opacity: easedProgress,
              scale: 0.94 + (0.06 * easedProgress),
              overwrite: true,
            });
          },
        },
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
    <section className="w-full relative  mix-blend-multiply overflow-hidden">
      <div ref={containerRef} className="pin-container relative">
        <div
          ref={pinImageRef}
          className="fixed top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[fit-content] z-[9]"
          style={{
            left: "50vw", // Start from center of viewport
            x: "50vw", // GSAP starts it 50vw to the right → off-screen
            height: "500px",
            width: "500px"
          }}
        >
          <div className="absolute left-0 top-0 h-full w-full">
            <div className="relative flex">
              <img
                ref={(el) => (imagesRef.current[2] = el)}
                className="object-contain relative top-[-20px] inline-block top-[-70px]  right-[-90px] !rotate-[-5deg]  z-[1] xl:h-[360px] w-[365px] border-[4px] border-solid border-black"
                src="/assets/home/who_we_are/creative2/img1-sm.webp"
                alt="GTF Technologies office environment"
              />
              <img
                ref={(el) => (imagesRef.current[3] = el)}
                className=" object-contain inline-block w-[365px] xl:h-[480px] border-[4px] border-solid border-black"
                src="/assets/home/who_we_are/creative2/img1.webp"
                alt="GTF Technologies office environment"
              />
            </div>
          </div>

          <div className="absolute left-0 top-0 h-full w-full">
            <div className="relative flex">
              <img
                ref={(el) => (imagesRef.current[2] = el)}
                className="object-contain relative top-[-20px] inline-block top-[-70px]  right-[-90px] !rotate-[-5deg]  z-[1] xl:h-[360px] w-[365px] border-[4px] border-solid border-black"
                src="/assets/home/who_we_are/absolute_img.webp"
                alt="GTF Technologies office environment"
              />
              <img
                ref={(el) => (imagesRef.current[3] = el)}
                className=" object-contain inline-block w-[365px] xl:h-[480px] border-[4px] border-solid border-black"
                src="/assets/home/who_we_are/img3.webp"
                alt="GTF Technologies office environment"
              />
            </div>
          </div>

          <div className="absolute left-0 top-0 h-full w-full">
            <div className="relative flex">
            <img
                ref={(el) => (imagesRef.current[2] = el)}
                className="object-contain relative top-[-20px] inline-block top-[-70px]  right-[-90px] !rotate-[-5deg]  z-[1] xl:h-[360px] w-[365px] border-[4px] border-solid border-black"
                src="/assets/home/who_we_are/creative2/img1-sm.webp"
                alt="GTF Technologies office environment"
              />
              <img
                ref={(el) => (imagesRef.current[3] = el)}
                className=" object-contain inline-block w-[365px] xl:h-[480px] border-[4px] border-solid border-black"
                src="/assets/home/who_we_are/creative2/img1.webp"
                alt="GTF Technologies office environment"
              />
            </div>
          </div>
        </div>

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
            {/* First Image Section */}

            <div className="flex flex-row items-center relative pl-[13rem] min-w-[calc(100vw-13rem)]">
              <div className="basis-[100%] pr-[50px] pl-[20px]">
                <h3 className="montserrrat uppercase text-[50px] font-bold mb-[1rem] font-[600] w-[max-content]">
                  Built to Disrupt <span className="block">the Ordinary</span>
                </h3>
              </div>
            </div>

            <div
              ref={imageContentRef}
              className="flex flex-row items-center relative pl-[13rem] min-w-[calc(100vw-13rem)]"
            >
              <div className="basis-[100%] pr-[50px] pl-[20px]">
                <h5 className="montserrat text-[34px] mb-[1rem] font-[600]">
                  Not a Team.{" "}
                  <span className="block text-[50px] uppercase font-bold">
                    A task force{" "}
                  </span>
                </h5>
              </div>
            </div>

            <div className="flex flex-row items-center relative pl-[13rem] min-w-[100vw]">
              <div className="basis-[100%] pr-[50px] pl-[20px]">
                <h5 className="text-[50px] mb-[1rem]  text-[50px] font-semibold">
                  Wired to help brands{" "}
                  <span className="block">move ahead of the market.</span>
                </h5>
              </div>
            </div>

            <div className="flex flex-row items-center relative min-w-[100vw] bg-[#f7f7f7] last_slide ml-[13rem]">
              <div className="basis-[100%]">
                <div className="flex justify-between flex-wrap">
                  <h2 className="meno_font font-bold relative capitalize 2xl:leading-[80px] px-[50px]  xl:leading-[70px]  leading-[35px] md:basis-[50%] max-h-fit text-[30px] xl:text-[40px] md:text-[50px] 2xl:text-[64px] ">
                    <span className="block">We create</span>
                    <span className="block relative">
                      what others only imagine.
                    </span>
                    <Line
                      ref={coloredLineRef}
                      left={"xl:left-[25%] left-[50%] 2xl:left-[37%]"}
                      bgColor="bg-gtf-pink"
                    />
                  </h2>
                  {/* <div className="md:basis-[35%] border-b-[1px] border-b-solid border-b-[#666666] md:pb-[50px] pb-[35px] montserrat">
                    <p className="text-[16px] font-[400] md:mt-0 mt-[20px] tracking-[0.5px]">
                      GTF Technologies, born from Gurukul The Foundation and built in
                      India, brings 17 years + of absolute mastery in branding and digital
                      media.
                    </p>
                    <div className="flex mt-[50px] items-center">
                      <p className=" mr-[10px] uppercase bebas tracking-[0.5px]">
                        meet now
                      </p>
                      <MdArrowOutward className="bg-[#ddd]" />
                    </div>
                  </div> */}
                </div>
                <div className="flex justify-between flex-wrap relative md:pt-[0] pt-[30px]">
                  <div className="md:basis-[60%] basis-[100%] relative px-[50px]">
                    {/* 1 */}
                    <div
                      ref={lineRef}
                      className="relative w-0 top-[46%] left-[29%]"
                    >
                      {/* top */}
                      <div className="origin-left md:block hidden  rotate-[-15.5deg] h-[1px] w-[75%] border-dashed border-b-[1px] border-black  absolute bottom-0 "></div>
                      <div className="origin-left md:block hidden rotate-[-12deg] h-[1px] w-[73%] border-dashed border-b-[1px] border-black  absolute bottom-[0px]"></div>

                      {/* middle */}
                      <div className="h-[1px] md:block hidden w-[70%] border-dashed border-b-[1px] border-black origin-left rotate-[1.4deg] absolute  "></div>
                      <div className="h-[1px] md:block hidden w-[70%] border-dashed border-b-[1px] border-black  absolute origin-left rotate-[-2deg] "></div>

                      {/* third */}
                      <div className="h-[1px] md:block hidden w-[73%] origin-left rotate-[12deg] border-dashed border-b-[1px] border-black  absolute  "></div>
                      <div className="h-[1px] md:block hidden w-[75%] origin-left rotate-[16deg] border-dashed border-b-[1px] border-black  absolute  "></div>
                    </div>
                    <div
                      ref={circleRef}
                      className="md:h-[250px] md:w-[250px] h-[120px] w-[120px] md:left-[8%]  md:top-[21%] bg-[#FDE93D] mix-blend-multiply md:relative absolute rounded-full"
                    ></div>
                    <img
                      src="/assets/home/netblob.png"
                      alt="Years of Expertise"
                      className="absolute md:w-[70%] md:h-[auto] h-[250px] w-[100%] opacity-[.9] md:translate-y-[-50%] md:top-[55%]  md:block hidden left-[0%]  top-[-52px] "
                    />
                    <p className="md:absolute bottom-[50px] left-[0]  md:text-start  px-[50px]">
                      <span className="bebas text-[35px] 2xl:text-[75px] lg:text-[65px] font-medium me-0 me-[10px] md:">
                        17 +
                      </span>
                      <br />
                      <span className="bebas md:leading-[76px] 2xl:text-[70px] text-[35px] lg:text-[60px] tracking-[2px] uppercase">
                        Years Of <br className="md:block hidden" /> Expertise
                      </span>
                    </p>
                  </div>
                  <div className="md:basis-[35%] md:pt-[38px] pt-[30px]">
                    <p className="uppercase flex flex-col md:justify-start justify-center mb-[30px] md:mb-[65px]">
                      <span
                        ref={counterRef}
                        className="bebas text-[30px] md:text-start 2xl:text-[40px] lg:text-[36px] "
                      >
                        {counts.projects} +
                      </span>
                      <span className="text-[14px] font-[400] tracking-wide montserrat font-medium">
                        PROJECTS DONE
                      </span>
                    </p>
                    <p className="uppercase flex flex-col md:justify-start justify-center mb-[30px] md:mb-[65px]">
                      <span className="bebas text-[30px] md:text-start 2xl:text-[40px] lg:text-[36px] ">
                        {counts.googleQueries} k +
                      </span>
                      <span className="text-[14px] font-[400] tracking-wide montserrat font-medium">
                        Queries generated from Google per month
                      </span>
                    </p>
                    <p className="uppercase flex flex-col md:justify-start justify-center mb-[30px] md:mb-[65px]">
                      <span className="bebas text-[30px] md:text-start 2xl:text-[40px] lg:text-[36px] ">
                        {counts.facebookQueries} k +
                      </span>
                      <span className="text-[14px] font-[400] tracking-wide montserrat font-medium">
                        Queries generated from Facebook & Instagram per month
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div  ref={backgroundColorRef} className="absolute top-0 left-0 w-full h-full"></div> */}
    </section>
  );
};

export default Feature;
