"use client";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";
import { MdArrowOutward } from "react-icons/md";
import Line from "../Line";

gsap.registerPlugin(ScrollTrigger, SplitText);

const dotLabels = [
  "Built to Disrupt the Ordinary", // for slide 1
  "A Task Force, Not a Team",      // for slide 2
  "Move Ahead of the Market",      // for slide 3
];

const Feature = () => {
  const textRef = useRef([]);
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const imagesRef = useRef([]);
  const headingRef = useRef(null);
  const mainHeadingRef = useRef(null);
  const mainContentRef = useRef(null);
  const timelineRef = useRef(null); // Ref for the timeline container
  const dotsRef = useRef([]); // Ref to hold dot elements

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
  const counterSecRef = useRef(null);
  const imageContentRef = useRef(null);
  const lastSlideRef = useRef(null);
  const [dotCount, setDotCount] = useState(0);
  
  
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
      const lastSlide = lastSlideRef.current;
      const counterSec = counterSecRef.current;
      const circle = circleRef.current;
      const timeline = timelineRef.current; 
      
      if (!section) return;


      // 👉 Calculate slides for dots (all children except counterSecRef)
      const slidesForDots = Array.from(section.children).filter((child)=>child !== counterSec)

      setDotCount(slidesForDots.length); // dynamically set number of dots
      
      

      const slides = [
        section.children[0],        // Slide 1
        imageContentRef.current,    // Slide 2 (your ref)
        section.children[2],        // Slide 3
      ];
  
      const imageSets = pinned.children; // 3 divs with absolute images

      const getMaxX = () => section.scrollWidth - window.innerWidth;

      const slidesScrollDistance =
        counterSec && counterSec.offsetLeft
        ? counterSec.offsetLeft
        : getMaxX();
  
      // INITIAL STATE
      // gsap.set(imageSets, { clipPath: "inset(100% -100% 0 0)", opacity: 1 });
      // gsap.set(imageSets[0], { clipPath: "inset(0% -100% 0% 0)" }); // First set visible
  
      // MAIN HORIZONTAL SCROLL
      gsap.to(section, {
        x: () => -getMaxX(),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${getMaxX() - window.innerWidth}`,
          pin: true,
          scrub: 0.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Each slide fills a segment of the bar AFTER the base 25%
            var basePercent = 25;               // base at 70% line
            var segmentSizes = [25, 25, 25];    // 3 slides → 25% each
          
            var slideProgresses = [0, 0, 0];    // store per-slide progress
          
            // Common values
            var lastRect = lastSlide.getBoundingClientRect();
            var counterSecRect = counterSec.getBoundingClientRect();
            var vw = window.innerWidth;
            var triggerPoint = vw * 0.7;        // 70% from left
            var counterTriggerPoint = vw * 0.5;
            var lastSlidePoint = -250;
          
            // -------- PER-SLIDE PROGRESS, IMAGE REVEAL, ETC. --------
            slides.forEach(function (slide, index) {
              if (!slide) return;
          
              var rect = slide.getBoundingClientRect();
          
              // Local progress for this slide based on 70% line
              var progress = 0;
              if (rect.left <= triggerPoint && rect.left >= 0) {
                // from 70% → 0% of viewport
                progress = 1 - rect.left / triggerPoint; // 0 → 1
              } else if (rect.left < 0) {
                progress = 1;
              }
              progress = gsap.utils.clamp(0, 1, progress);
              slideProgresses[index] = progress;
          
              // IMAGE CLIP REVEAL PER SLIDE (your existing logic)
              var targetSet = imageSets[index];
              var prevIndex = index === 0 ? imageSets.length - 1 : index - 1;
          
              if (targetSet) {
                gsap.set(targetSet, {
                  clipPath: "inset(0% 0% 0% 0%)",
                  zIndex: index === 0 ? 3 : index === 1 ? 2 : 1,
                });
              }
          
              var prevSet = imageSets[prevIndex];
              if (prevSet) {
                gsap.set(prevSet, {
                  clipPath: "inset(" + progress * 300 + "% 0% 0% 0%)",
                  zIndex: prevIndex === 0 ? 3 : prevIndex === 1 ? 2 : 1,
                });
              }
            });
          
            // -------- TIMELINE WIDTH FROM SLIDE PROGRESS --------
            // Start with base 25%, then add each slide's contribution
            var timelineWidth = basePercent;
          
            slideProgresses.forEach(function (p, idx) {
              var seg = segmentSizes[idx] || 0;
              timelineWidth += p * seg; // add partial fill of that segment
            });
          
            // Clamp just in case
            timelineWidth = Math.min(100, Math.max(0, timelineWidth));
          
            gsap.to(timeline, {
              width: timelineWidth + "%",
              ease: "power2.out",
            });
          
            // -------- DOTS STATE FROM SLIDE PROGRESS --------
            // Dot i becomes active as soon as slide i has some progress
            dotsRef.current.forEach(function (dot, idx) {
              if (!dot) return;
              var active = slideProgresses[idx] > 0.01;
          
              gsap.to(dot, {
                scale: active ? 1.2 : 1,
                backgroundColor: active ? "#2aaee4" : "#777679",
                duration: 0.3,
              });
            });
          
            // -------- PINNED IMAGE X SCROLL (unchanged) --------
            if (lastRect.left <= lastSlidePoint) {
              var distanceToScroll = lastSlidePoint - lastRect.left;
          
              gsap.set(pinned, {
                x: "-" + distanceToScroll + "px",
                overwrite: true,
              });
            }
          
            // -------- COUNTER + CIRCLE ANIMATIONS (unchanged) --------
            if (counterSecRect.left <= counterTriggerPoint) {
              gsap.to(circleRef.current, {
                scale: 1,
                opacity: 1,
                duration: 1.4,
                ease: "power4.out",
                transformOrigin: "center center",
              });
          
              gsap.to(lineRef.current, {
                width: "100%",
                duration: 1.6,
                ease: "power3.out",
                delay: 0.3,
              });
          
              gsap.to(counts, {
                projects: 1500,
                googleQueries: 50,
                facebookQueries: 1000,
                duration: 2.8,
                ease: "power2.out",
                snap: { projects: 1, googleQueries: 10, facebookQueries: 10 },
                onUpdate: function () {
                  setCounts({ ...counts });
                },
                delay: 0.6,
              });
            }
          }
          
          
        },
      });
  
      // Your existing image reveal code...
      // imagesRef.current.forEach((img) => {
      //   if (img) {
      //     ScrollTrigger.create({
      //       trigger: img,
      //       start: "top 90%",
      //       once: true,
      //       onEnter: () => {
      //         gsap.to(img, {
      //           opacity: 1,
      //           y: 0,
      //           clipPath: "inset(0% 0 0% 0)",
      //           duration: 1.6,
      //           ease: "power3.out",
      //         });
      //       },
      //     });
      //   }
      // });
  
    }, containerRef);
  
    return () => ctx.revert();
  }, []);

  

  useEffect(() => {
    if (dotsRef.current[0]) {
      gsap.set(dotsRef.current[0], {
        scale: 1.2,
        backgroundColor: "#4CAF50",
      });
    }
  }, [dotCount]);

  return (
    <section className="w-full relative  mix-blend-multiply overflow-hidden">
      <div ref={containerRef} className="pin-container relative">

        {/* Timeline Bar */}
        <div className="absolute w-full h-[3px] bg-gray-300 bottom-[40px]">
          {/* Timeline fill */}
          <div className="absolute left-0 w-full h-full bg-black-200"></div>
          <div ref={timelineRef} className="absolute left-0 h-full bg-[#2aaee4]" style={{ width: "0%" }} />
        </div>

        {/* Dots on Timeline */}
        <div className="absolute pointer-events-none w-full bottom-[35px]  flex items-center justify-evenly">
          {Array.from({ length: dotCount || 0 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-2 pointer-events-none"
            >
              <div
                key={index}
                ref={(el) => (dotsRef.current[index] = el)}
                className="w-[10px] h-[10px] rounded-full bg-black-200"
              />

              {/* Label */}
              <span className="absolute bottom-[20px] text-[14px] leading-tight text-gray-700 text-center px-2">
                {dotLabels[index] || `Stage ${index + 1}`}
              </span>

            </div>
            
          ))}
        </div>


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
                className="object-contain relative inline-block z-[1] w-[500px]"
                src="/assets/home/who_we_are/creative1.webp"
                alt="GTF Technologies office environment"
              />
              
            </div>
          </div>

          <div className="absolute left-0 top-0 h-full w-full">
            <div className="relative flex">
            <img
                ref={(el) => (imagesRef.current[2] = el)}
                className="object-contain relative inline-block z-[1] w-[500px]"
                src="/assets/home/who_we_are/creative2.webp"
                alt="GTF Technologies office environment"
              />
            </div>
          </div>

          <div className="absolute left-0 top-0 h-full w-full">
            <div className="relative flex">
            <img
                ref={(el) => (imagesRef.current[2] = el)}
                className="object-contain relative inline-block z-[1] w-[500px]"
                src="/assets/home/who_we_are/creative1.webp"
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

            <div ref={lastSlideRef} className="flex flex-row items-center relative pl-[13rem] min-w-[100vw] last_slide">
              <div className="basis-[100%] pr-[50px] pl-[20px]">
                <h5 className="text-[50px] mb-[1rem]  text-[50px] font-semibold">
                  Wired to help brands{" "}
                  <span className="block">move ahead of the market.</span>
                </h5>
              </div>
            </div>

            <div ref={counterSecRef} className="flex flex-row items-center relative min-w-[100vw] bg-[#f7f7f7] ml-[13rem]">
              <div className="basis-[100%]">
                <div className="flex justify-between flex-wrap">
                  <h2 className="meno_font font-bold relative capitalize 2xl:leading-[80px] px-[50px]  xl:leading-[70px]  leading-[35px] md:basis-[50%] max-h-fit text-[30px] xl:text-[40px] md:text-[50px] 2xl:text-[64px] ">
                    <span className="block">We create</span>
                    <span className="block relative pl-[100px] w-[max-content] before:absolute before:h-[3px] before:w-[80px] before:bg-[#000] before:block before:left-[0] before:top-[50%] before:translate-y-[-1/2]">
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
