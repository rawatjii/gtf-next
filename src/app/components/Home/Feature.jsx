"use client";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";
import { MdArrowOutward } from "react-icons/md";
import SparkleBackground from "../../components/SparkleBackground";
import Line from "../Line";

gsap.registerPlugin(ScrollTrigger, SplitText);

// const dotLabels = [
//   "Brand Strategy",
//   "Performance Marketing",
//   "Website Development",
//   "Social Media Marketing",
//   "Search Engine Optimization",
// ];

const dotLabels = [
  {
    title: "Brand Strategy",
    video: "/assets/home/who_we_are/pandas/1.mp4",
  },
  {
    title: "Performance Marketing",
    video: "/assets/home/who_we_are/pandas/2.mp4",
  },
  {
    title: "Website Development",
    video: "/assets/home/who_we_are/pandas/3.mp4",
  },
  {
    title: "Social Media Marketing",
    video: "/assets/home/who_we_are/pandas/1.mp4",
  },
  {
    title: "Search Engine Optimization",
    video: "/assets/home/who_we_are/pandas/2.mp4",
  },
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
  const timelineGroupRef = useRef();

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
  const pandaRef = useRef(null);

  const [dotCount, setDotCount] = useState(0);
  const [activeDotIndex, setActiveDotIndex] = useState(0); // Track active dot

  const [counts, setCounts] = useState({
    projects: 0,
    googleQueries: 0,
    facebookQueries: 0,
  });

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const pinTriggerRef = useRef(null);
  const isScrollingRef = useRef(false);
  const isPinnedRef = useRef(false);


  // Handle scroll function
  const handleScroll = (event) => {
    if ( !isPinnedRef.current) return; // Check if scrolling is allowed

    isScrollingRef.current = true; // Prevent multiple scroll triggers

    const slides = Array.from(sectionRef.current.children); // Get all slides
    const slideWidth = slides[0]?.offsetWidth || 0; // Get width of each slide

    let newSlideIndex = currentSlideIndex;

    if (event.deltaY > 0) {
      // Scroll down, move to the next slide
      newSlideIndex = Math.min(currentSlideIndex + 1, slides.length - 1);
    } else if (event.deltaY < 0) {
      // Scroll up, move to the previous slide
      newSlideIndex = Math.max(currentSlideIndex - 1, 0);
    }

    // Scroll to the new slide with animation
    gsap.to(sectionRef.current, {
      x: -newSlideIndex * slideWidth,
      duration: 1, // Animation duration
      ease: "power3.out", // Smooth easing
      onComplete: () => {
        setCurrentSlideIndex(newSlideIndex); // Update the slide index
        isScrollingRef.current = false; // Reset scrolling flag
      },
    });
  };

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;

    // Initialize ScrollTrigger to pin the section
    pinTriggerRef.current = ScrollTrigger.create({
      trigger: container,
      start: "top top", // Start when the container hits the top
      pin: true, // Pin the container
      scrub: 0.2, // Smooth scroll scrubbing
      markers: false, // Optional: Enable markers for debugging
      onEnter: () => {
        isPinnedRef.current = true; // Mark as pinned when the section is pinned
      },
      onLeave: () => {
        isPinnedRef.current = false; // Mark as unpinned when leaving the pinned area
      },
    });

    // Add the scroll event listener
    window.addEventListener("wheel", handleScroll);

    // Cleanup the event listener and ScrollTrigger on component unmount
    return () => {
      window.removeEventListener("wheel", handleScroll);
      if (pinTriggerRef.current) {
        pinTriggerRef.current.kill(); // Kill ScrollTrigger instance on cleanup
      }
    };
  }, [currentSlideIndex])

  return (
    <>
      <section className="w-full relative  mix-blend-multiply border-t border-gray-300">

        <div ref={containerRef} className="pin-container relative">
          <img
            src="/assets/home/netblob.png"
            alt="Years of Expertise"
            className="absolute md:h-[auto] h-[100%] w-[80vw] translate-y-[10vh] translate-x-[30%] md:block hidden right-[0%] left-[unset] opacity-70"
          />

          <div ref={timelineGroupRef}>
            {/* Timeline Bar */}
            <div className="absolute w-full h-[3px] bg-gray-300 bottom-[38px]">
              {/* Timeline fill */}
              <div className="absolute left-0 w-full h-full bg-black-200"></div>
              <div ref={timelineRef} className="absolute left-0 h-full bg-[#e24397]" style={{ width: "0%" }} />
            </div>

            {/* Dots on Timeline */}
            <div className="absolute pointer-events-none w-full bottom-[35px]  flex items-center justify-evenly">
              {Array.from({ length: dotCount || 0 }).map((_, index) => (
                <div
                  key={index}
                  className="relative flex flex-col items-center gap-2 pointer-events-none"
                >
                  {/* "#e24397" : "#777679" */}
                  <div
                    key={index}
                    ref={(el) => (dotsRef.current[index] = el)}
                    className={`w-[8px] h-[8px] rounded-full  ${activeDotIndex === index ? 'scale-130 bg-[#e24397]' : 'bg-[#777679]'}`}
                  />

                  {/* Show panda video when active */}
                  {/* <div className={`absolute top-[-90px] w-[50px]  transition-all duration-300 ease-in-out ${activeDotIndex === index ? 'opacity-1' : 'opacity-0'}`}>
                    <video
                      src={dotLabels[index].video}
                      autoPlay
                      loop
                      muted
                      className="w-[50px] h-[50px]"
                    />
                  </div> */}

                  {/* Label */}
                  <span className={`absolute bottom-[20px] text-[16px] leading-tight text-gray-700 text-center px-2 just_font transition-all duration-300 ease-in-out  w-[max-content] ${activeDotIndex === index ? 'text-[18px] font-semibold tracking-[-1px]' : ''}`}>
                    {dotLabels[index]?.title || `Stage ${index + 1}`}
                  </span>

                </div>

              ))}
            </div>
          </div>

          {/* <div ref={pandaRef} className="fixed left-0 w-[50%] top-[45%] -translate-y-1/2 bg-[#fff] p-[10px] z-[9] h-[500px] pl-[100px] flex items-center">
              <div className="relative w-[400px] h-full">
                {dotLabels.map((dot, index) => (
                  <video
                    key={index}
                    autoPlay
                    loop
                    muted
                    className={`absolute inset-0 h-full transition-transform duration-300 ${activeDotIndex === index ? 'opacity-100 translate-x-[0px]' : 'opacity-0 translate-x-[100px]'}`}
                    // style={{
                    //   display: activeDotIndex === index ? 'block' : 'none', // Hide non-active pandas
                    // }}
                  >
                    <source
                      src={dot.video}
                    />
                  </video>
                ))}
              </div>
          </div>   */}

          {/* left-1/2  -translate-x-1/2 */}

          <div
            ref={pinImageRef}
            className="fixed w-[fit-content] z-[9] before:absolute before:content-[''] before:w-[calc(100%+300px)] before:right-0 before:h-full before:bg-white"
            style={{
              height: "500px",
              width: "500px",
            }}
          >
            <div className="absolute left-0 top-0 h-full w-full">
              <div className="relative flex justify-center h-full">
                <img
                  ref={(el) => (imagesRef.current[0] = el)}
                  className="object-contain relative inline-block z-[1] w-full h-full "
                  src="/assets/home/who_we_are/creative1/img1-sm.webp"
                  alt="GTF Technologies office environment"
                />

              </div>
            </div>

            <div className="absolute left-0 top-0 h-full w-full">
              <div className="relative flex justify-center h-full">
                <img
                  ref={(el) => (imagesRef.current[1] = el)}
                  className="object-contain relative inline-block z-[1] w-full h-full "
                  src="/assets/home/who_we_are/creative2/img1-sm.webp"
                  alt="GTF Technologies office environment"
                />
              </div>
            </div>

            <div className="absolute left-0 top-0 h-full w-full">
              <div className="relative flex justify-center h-full">
                <img
                  ref={(el) => (imagesRef.current[2] = el)}
                  className="object-contain relative inline-block z-[1] w-full h-full "
                  src="/assets/home/who_we_are/creative1/img1-sm.webp"
                  alt="GTF Technologies office environment"
                />
              </div>
            </div>

            <div className="absolute left-0 top-0 h-full w-full">
              <div className="relative flex justify-center h-full">
                <img
                  ref={(el) => (imagesRef.current[1] = el)}
                  className="object-contain relative inline-block z-[1] w-full h-full "
                  src="/assets/home/who_we_are/creative2/img1-sm.webp"
                  alt="GTF Technologies office environment"
                />

              </div>
            </div>

            <div className="absolute left-0 top-0 h-full w-full">
              <div className="relative flex justify-center h-full">
                <img
                  ref={(el) => (imagesRef.current[4] = el)}
                  className="object-contain relative inline-block z-[1] w-full h-full "
                  src="/assets/home/who_we_are/creative1/img1-sm.webp"
                  alt="GTF Technologies office environment"
                />
              </div>
            </div>

            <div className="absolute left-0 top-0 h-full w-full">
              <div className="relative flex justify-center h-full">
                <img
                  ref={(el) => (imagesRef.current[4] = el)}
                  className="object-contain relative inline-block z-[1] w-full h-full "
                  src="/assets/home/who_we_are/creative1/img1-sm.webp"
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

              <div className="flex flex-row items-center relative w-[calc((100vw))] pl-[700px]">
                <div className="basis-[100%] flex items-center gap-[50px]">
                  <video
                    autoPlay
                    loop
                    muted
                    className={`w-[400px] transition-transform duration-300`}
                  >
                    <source
                      src="/assets/home/who_we_are/pandas/1.mp4"
                    />
                  </video>
                  <h3 className="neue_font uppercase text-[50px] font-bold mb-[1rem] font-[600] w-[max-content]">
                    Built to Disrupt <span className="block">the Ordinary.</span>
                  </h3>
                </div>
              </div>

              <div
                ref={imageContentRef}
                className="flex flex-row items-center relative w-[calc((100vw))]  pl-[700px]"
              >
                <div className="basis-[100%] flex items-center gap-[50px]">
                  <video
                    autoPlay
                    loop
                    muted
                    className={`w-[400px] transition-transform duration-300`}
                  >
                    <source
                      src="/assets/home/who_we_are/pandas/2.mp4"
                    />
                  </video>
                  <h5 className="neue_font text-[34px] mb-[1rem] font-[600]">
                    Not a Team.{" "}
                    <span className="block text-[50px] uppercase font-bold">
                      A task force.{" "}
                    </span>
                  </h5>
                </div>
              </div>

              <div
                ref={imageContentRef}
                className="flex flex-row items-center relative w-[calc((100vw))]  pl-[700px]"
              >
                <div className="basis-[100%] flex items-center gap-[50px]">
                  <video
                    autoPlay
                    loop
                    muted
                    className={`w-[400px] transition-transform duration-300`}
                  >
                    <source
                      src="/assets/home/who_we_are/pandas/3.mp4"
                    />
                  </video>
                  <h5 className="neue_font text-[34px] mb-[1rem] font-[600]">
                    Engineered to turn.{" "}
                    <span className="block text-[50px] uppercase font-bold">
                      clicks into conviction.{" "}
                    </span>
                  </h5>
                </div>
              </div>

              <div
                ref={imageContentRef}
                className="flex flex-row items-center relative w-[calc((100vw))]  pl-[700px]"
              >
                <div className="basis-[100%] flex items-center gap-[50px]">
                  <video
                    autoPlay
                    loop
                    muted
                    className={`w-[400px] transition-transform duration-300`}
                  >
                    <source
                      src="/assets/home/who_we_are/pandas/1.mp4"
                    />
                  </video>
                  <h5 className="neue_font text-[34px] mb-[1rem] font-[600]">
                    Designed to make noise{" "}
                    <span className="block text-[50px] uppercase font-bold">
                      impossible to ignore.{" "}
                    </span>
                  </h5>
                </div>
              </div>

              <div ref={lastSlideRef} className="flex flex-row items-center relative last_slide w-[calc((100vw/2))] pl-[700px]">
                <div className="basis-[100%] flex items-center gap-[50px]">
                  <video
                    autoPlay
                    loop
                    muted
                    className={`w-[400px] transition-transform duration-300`}
                  >
                    <source
                      src="/assets/home/who_we_are/pandas/2.mp4"
                    />
                  </video>
                  <h5 className="neue_font text-[50px] mb-[1rem]  text-[50px] font-semibold leading-[60px]">
                    Wired to help brands{" "}
                    <span className="block">move ahead of the market.</span>
                  </h5>
                </div>
              </div>


            </div>
          </div>
        </div>
        {/* <div  ref={backgroundColorRef} className="absolute top-0 left-0 w-full h-full"></div> */}
      </section>
      {/* <SparkleBackground /> */}
    </>
  );
};

export default Feature;
