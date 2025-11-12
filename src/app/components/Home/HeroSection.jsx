"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Mousewheel,
  Pagination,
  FreeMode,
  Virtual,
  Keyboard,
} from "swiper/modules";
import { createPortal } from "react-dom";
import gsap from "gsap";
import "swiper/css";
import "swiper/css/pagination";
import SparkleBackground from "../SparkleBackground";
import { HERO_DATA } from "./hero/heroData";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { robotoCondensed } from "@/app/utils/font";

gsap.registerPlugin(ScrollTrigger);

const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

const HeroSection = () => {
  const [swiperReady, setSwiperReady] = useState(false);
  const [videoCompleted, setVideoCompleted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lastActiveIndex, setLastActiveIndex] = useState(0);
  const [activeIndexes, setActiveIndexes] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLastSlide, setIsLastSlide] = useState(false);
  const swiperInstance = useRef(null);
  const headingRef = useRef(null);
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const mediaRefs = useRef([]);
  const modalRef = useRef(null);
  const sectionRef = useRef(null);
  const scrollState = useRef({ locked: false, y: 0 });
  const introPinRef = useRef(null);
  const marqueeRef = useRef(null);
  const skipBtnRef = useRef(null);
  const headerBounds = useRef({ top: 0, bottom: 0, isInside: false });

  const dotsConfig = [
    { top: "29%", left: "65%", color: "bg-gtf-blue" },
    { top: "32%", left: "70%", color: "bg-gtf-yellow" },
    { bottom: "26%", left: "65%", color: "bg-gtf-pink" },
    { bottom: "38%", left: "63%", color: "bg-[purple]" },
    { bottom: "14%", left: "67%", color: "bg-[green]" },
  ];

  const lockScroll = () => {
    if (scrollState.current.locked) return;

    const el = sectionRef.current;
    if (!el) return;

    // 1) compute absolute document offset for the section
    const sectionTopDoc = el.getBoundingClientRect().top + window.scrollY;

    // 2) snap the viewport to the section top
    window.scrollTo(0, sectionTopDoc);

    // 3) lock the body on the next frame with the correct negative doc offset
    requestAnimationFrame(() => {
      scrollState.current.locked = true;
      scrollState.current.y = window.scrollY; // remember for unlock

      // document.body.style.position = "fixed";
      // document.body.style.top = `-${sectionTopDoc}px`; // NOTE: negative + px + DOC offset
      // document.body.style.left = "0";
      // document.body.style.right = "0";
      // document.body.style.width = "100%";
      // document.body.style.overflow = "hidden";
    });
  };

  useEffect(() => {
    setMounted(true);
    setIsMobile(window.innerWidth < 768);

    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        {
          y: -50,
          opacity: 0,
          scale: 1,
          duration: 1.2,
          // ease: "back.out(1.5)",
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          // ease: "back.out(1.5)",
        }
      );
    }
  }, []); 

  useEffect(() => {
    let isMounted = true;
    const blinkDots = (indexes, blinks = 2, delay = 1000) => {
      return new Promise((resolve) => {
        let count = 0;
        let on = true;  
        const interval = setInterval(() => {
          if (!isMounted) {
            clearInterval(interval);
            return;
          }
          setActiveIndexes(on ? indexes : []);
          on = !on;
          if (!on) count++;
          if (count >= blinks) {
            clearInterval(interval);
            setTimeout(resolve, delay);
          }
        }, delay);
      });
    };

    const runAllDotsBlink = async () => {
      while (isMounted) {
        await blinkDots([0, 1, 2, 3, 4], 2, 500);
      }
    };

    runAllDotsBlink();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!sectionRef.current || !mounted) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        anticipatePin: 1,
        pinSpacing: true,
        pin: true,
        // onEnter: () => {
        //   if (!videoRef.current) return;
        //   videoRef.current.style.display = "block";
        //   document.querySelector("#smooth-content").style.overflow="hidden";

        //   videoRef.current.muted = true;
        //   videoRef.current.setAttribute("muted", "");
        //   videoRef.current.playsInline = true;
        //   videoRef.current.setAttribute("playsinline", "");
        //   videoRef.current.play?.().catch(() => {});
        // },
      },
    });
    introPinRef.current = tl.scrollTrigger;
    return () => {
      tl.scrollTrigger?.kill();
      introPinRef.current?.kill();
      // ScrollTrigger.refresh();
    };
  }, [mounted, videoCompleted, isMobile]);

  const openModal = (content) => {
    setModalContent(content);
    setModalOpen(true);
    if (modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "power3.out" }
      );
    }
  };

  const closeModal = () => {
    if (modalRef.current) {
      gsap.to(modalRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 0.4,
        ease: "power3.in",
        onComplete: () => setModalOpen(false),
      });
    } else {
      setModalOpen(false);
    }
  };

  const handleDotHover = useCallback(
    debounce(() => {
      if (headingRef.current) {
        gsap.to(headingRef.current, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.5)",
        });
      }
    }, 200),
    []
  );

  const handleDotMouseLeave = useCallback(
    debounce(() => {
      if (headingRef.current) {
        gsap.to(headingRef.current, {
          y: 50,
          opacity: 0,
          scale: 0.95,
          duration: 0.4,
          ease: "power3.in",
        });
      }
    }, 200),
    []
  );

  const handleVideoEnd = () => {
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";

    introPinRef.current?.kill();
    introPinRef.current = null;
    document.querySelector(".hide_screen").style.display = "none";

    document.querySelector(".slider_content").style.display = "flex";
    setVideoCompleted(true);

    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
      onComplete: () => {
        setSwiperReady(true);
        gsap.delayedCall(0.1, () => {
          ScrollTrigger.refresh();
        });
      },
    });

    tl.to(videoRef.current, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        if (videoRef.current) {
          gsap.set([videoRef.current, ".video_container"], { display: "none" });

          gsap.delayedCall(0.8, () => {
            const firstMedia = mediaRefs.current[0];
            if (firstMedia && "play" in firstMedia) firstMedia.play();

            mediaRefs.current.forEach((item) => {
              const parentContainer = item?.parentElement?.parentElement;
              if (parentContainer) gsap.set(parentContainer, { opacity: 1 });
            });
          });
        }
      },
    });

    tl.to(
      ".swiper-slide:first-child",
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "expo.out",
      },
      "-=0.3"
    );

    tl.fromTo(
      ".option_listing",
      { x: -50, opacity: 0, scale: 0.9 },
      { x: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out" },
      "-=0.6"
    );

    tl.fromTo(
      ".right_line",
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
      "-=0.8"
    );

    tl.fromTo(
      ".rotation_circle",
      { opacity: 0, scale: 0.8, rotate: -30 },
      { opacity: 1, scale: 1, rotate: 0, duration: 1.2, ease: "back.out(2)" },
      "-=0.7"
    );

    tl.fromTo(
      line1Ref.current,
      { width: "0%", opacity: 0, left: "17%" },
      {
        width: "25%",
        opacity: 1,
        left: "20%",
        duration: 0.8,
        ease: "power2.in",
      }
    );

    tl.fromTo(
      line2Ref.current,
      { width: "0%", opacity: 0, right: "25%" },
      {
        width: "24%",
        opacity: 1,
        right: "20%",
        duration: 0.8,
        ease: "power2.in",
      },
      "-=0.6"
    );

    tl.fromTo(
      line3Ref.current,
      { height: "0%", opacity: 0 },
      { height: "25px", opacity: 1, duration: 0.8, ease: "power2.in" },
      "-=0.6"
    );
  };

  const handleSlideClick = useCallback((info, index, event) => {
    setActiveIndex(index);
    setLastActiveIndex(index);
    if (swiperInstance.current) {
      swiperInstance.current.slideTo(index);
    }

    document.querySelectorAll(".swiper-slide").forEach((slide, i) => {
      if (slide) {
        slide.className.toggle("swiper-slide-active", i === index);
      }
    });

    if (!info.name) return;
    const isVideo =
      info.video || info.img.endsWith(".mp4") || info.img.endsWith(".webm");
    const mediaPath = `/assets/home/hero/${info.video || info.img}`;

    openModal({
      type: isVideo ? "video" : "image",
      path: mediaPath,
      title: info.name,
      index: index,
      text: info.text,
    });
  }, []);

  const handleSlideHover = useCallback(
    debounce((index) => {
      setActiveIndex(index);
      if (swiperInstance.current) {
        swiperInstance.current.slideTo(index);
      }
      document.querySelectorAll(".swiper-slide").forEach((slide, i) => {
        if (slide) {
          slide.className.toggle("swiper-slide-active", i === index);
        }
      });
    }, 200),
    []
  );

  const handleTextHover = useCallback(
    debounce((index) => {
      setActiveIndex(index);
      if (swiperInstance.current) {
        swiperInstance.current.slideTo(index);
      }
      document.querySelectorAll(".swiper-slide").forEach((slide, i) => {
        if (slide) {
          slide.className.toggle("swiper-slide-active", i === index);
        }
      });
    }, 200),
    []
  );

  const handleSlideMouseLeave = useCallback(
    debounce(() => {
      setActiveIndex(lastActiveIndex);
      if (swiperInstance.current) {
        swiperInstance.current.slideTo(lastActiveIndex);
      }
      document.querySelectorAll(".swiper-slide").forEach((slide, i) => {
        if (slide) {
          slide.className.toggle("swiper-slide-active", i === lastActiveIndex);
        }
      });
    }, 200),
    [lastActiveIndex]
  );

  // Throttled slide change handler
  const handleSlideChange = useCallback(
    debounce((swiper) => {
      const newIndex = swiper.realIndex;
      setActiveIndex(newIndex);
      setLastActiveIndex(newIndex);
      setIsLastSlide(newIndex === HERO_DATA.length - 1);
    }, 100),
    []
  );

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIsMobile();
    // handleVideoEnd();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // infinite marquee
  useEffect(() => {
    if (!marqueeRef.current) return;

    const el = marqueeRef.current;
    const distance = el.offsetWidth / 2;

    const tl = gsap.timeline({ repeat: -1, defaults: { ease: "none" } });

    tl.fromTo(el, { x: -distance }, { x: 0, duration: 100 });

    // seamless loop: when the first half disappears, jump back instantly
    tl.set(el, { x: 0 });

    return () => tl.kill();
  }, []);

  useEffect(() => {
    if (!skipBtnRef.current || videoCompleted) return;

    const btn = skipBtnRef.current;
    const header = document.querySelector(".site-header");

    if (!header) return;

    let xTo, yTo;
    const speed = 1;

    // Create smooth follow functions
    const followCursor = () => {
      xTo = gsap.quickTo(btn, "x", { duration: speed, ease: "power3.out" });
      yTo = gsap.quickTo(btn, "y", { duration: speed, ease: "power3.out" });
    };

    followCursor();

    const updateBounds = () => {
      const rect = header.getBoundingClientRect();
      headerBounds.current.top = rect.top + window.scrollY;
      headerBounds.current.bottom = rect.bottom + window.scrollY;
    };

    updateBounds();
    window.addEventListener("resize", updateBounds);
    window.addEventListener("scroll", updateBounds);

    const handleMove = (e) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      const rect = btn.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      xTo(clientX - centerX);
      yTo(clientY - centerY);

      // Check if inside header
      const isInside =
        clientY >= headerBounds.current.top &&
        clientY <= headerBounds.current.bottom;

      if (isInside && !headerBounds.current.isInside) {
        headerBounds.current.isInside = true;
        gsap.to(btn, {
          opacity: 0,
          scale: 0.5,
          y: -20,
          duration: 0.35,
          ease: "power3",
        });
      } else if (!isInside && headerBounds.current.isInside) {
        // LEAVE header
        headerBounds.current.isInside = false;
        gsap.to(btn, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.45,
          ease: "power3",
        });
      }
    };

    // Mouse & touch support
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("touchmove", handleMove);

    // Optional: subtle scale on hover
    const handleEnter = () => gsap.to(btn, { scale: 1.15, duration: 0.3 });
    const handleLeave = () => gsap.to(btn, { scale: 1, duration: 0.3 });

    btn.addEventListener("mouseenter", handleEnter);
    btn.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);

      btn.removeEventListener("mouseenter", handleEnter);
      btn.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <section
      className={`relative hero_section overflow-hidden mb-[100px] ${
        videoCompleted ? "md:px-[50px]" : "md:px-0"
      }`}
    >
      <div className="right-[20px] bottom-[30px] md:block hidden absolute ml-auto">
        <div className="flex justify-end relative">
          {dotsConfig.map((dot, index) => {
            const isActive = activeIndexes.includes(index);
            return (
              <span
                key={index}
                className={`absolute h-[5px] w-[5px] transition-opacity transform duration-500 ease-in-out ${
                  dot.color
                } ${isActive ? "opacity-100 scale-60" : "opacity-0 scale-50"}`}
                style={{
                  top: dot.top,
                  left: dot.left,
                  bottom: dot.bottom,
                }}
                onMouseEnter={index === 0 ? handleDotHover : undefined}
                onMouseLeave={index === 0 ? handleDotMouseLeave : undefined}
              />
            );
          })}
          <img
            src="/assets/home/map-1.png"
            className="h-[110px] mb-[5px]"
            alt="map.png"
          />
        </div>
        <p className="font-[Oswald] lg:w-[auto] w-[60%] ml-[auto] font-[400] text-end z-[2] text-[15px] mr-[12px] md:block hidden">
          <span className="font-medium">GTF Technologies</span> is
          conceptualized from <span className="lg:block"></span>
          <span className="font-medium"> Gurukul The Foundation</span>
        </p>
      </div>
      <div
        ref={line1Ref}
        className="mix-blend-multiply h-[10px] md:block hidden md:h-[25px] w-[80%] absolute top-[calc(56%)] bg-gtf-pink opacity-0"
      ></div>
      <div
        ref={line2Ref}
        className="mix-blend-multiply h-[10px] md:block hidden md:h-[25px] w-[80%] absolute 2xl:bottom-[135px] bottom-[85px] md:right-[-196px] bg-gtf-yellow opacity-0"
      ></div>
      <img
        src="/assets/home/hero/circle.svg"
        className="2xl:h-[450px] md:h-[300px] h-[300px] rotate-plus absolute rotation_circle 2xl:top-[40%] lg:top-[40%] bottom-[0] opacity-0 lg:left-[15%]"
        alt="Decorative circle"
      />

      <div ref={sectionRef} className="h-screen hide_screen">
        {/* {mounted && !videoCompleted && ( */}
        <div className="video_container !absolute top-0 left-0 w-full h-screen z-[9]">
          <video
            ref={videoRef}
            src="/assets/home/hero/video1.mp4"
            className="w-full h-full object-cover transition-opacity duration-500"
            autoPlay
            loop
            playsInline
            muted
            onEnded={handleVideoEnd}
          />
          {/*infite loop text animation*/}
          <div
            className="pointer-events-none left-0 w-full overflow-hidden z-[9]"
            style={{
              position: "fixed",
              top: `calc(100vh - 250px)`,
              // Fallback for JS disabled
            }}
          >
            <h2
              ref={marqueeRef}
              className="inline-block whitespace-nowrap uppercase text-[150px] font-semibold leading-none text-white"
            >
              {Array.from({ length: 4 }).map((_, i) => (
                <span key={i} className="inline-flex items-center">
                  Branding{" "}
                  <span className="dot h-[20px] w-[20px] bg-white inline-block mx-[50px]"></span>
                  Digital Marketing{" "}
                  <span className="dot h-[20px] w-[20px] bg-white inline-block mx-[50px]"></span>
                  Double-Digit Growth{" "}
                  <span className="dot h-[20px] w-[20px] bg-white inline-block mx-[50px]"></span>
                </span>
              ))}
            </h2>

            <div className="bottom text-white text-center border-t border-solid border-white mt-[40px] pt-[20px] uppercase font-medium text-[14px] tracking-[1px]">
              ( Scroll Down )
            </div>
          </div>
          
          <button
            ref={skipBtnRef}
            className="absolute z-[99] top-0 left-0  text-white uppercase tracking-[1px] text-[14px] font-medium bg-[#e24397] px-[30px] py-[14px] rounded-full"
            onClick={handleVideoEnd}
          >
            Skip Video
          </button>
        </div>
      </div>

      <div className="relative md:pt-0 z-[4] mt-[120px]">
        <div
          className={`flex justify-center ${
            videoCompleted ? "2xl:mb-[20px]" : "2xl:mb-[80px]"
          } mb-8 heading-container`}
          ref={headingRef}
          style={{ opacity: 0, transition: "transform 0.3s ease-out" }}
        >
          <h1
            className={`text-center font-[500] font-robotoCondensed text-global-color tracking-[1px]`}
          >
            <span className="md:block 2xl:text-5xl lg:text-[35px] text-[26px] 2xl:mb-[12px]">
              Branding, Digital Marketing
            </span>
            <span className="md:block 2xl:text-5xl lg:text-[35px] text-[26px]">
              and Double-Digit Growth
            </span>
          </h1>
        </div>

        <div className="flex hidden overflow-hidden slider_content justify-between flex-wrap items-stretch pt-[80px]  2xl:h-[calc(100vh-300px)] lg:h-[calc(100vh-200px)]">
          <div className="flex-[1] md:block hidden 2xl:mt-[150px] lg:mt-[80px] leading-[1px] translate-x-[-200%] right_line mb-[auto]">
            {HERO_DATA.map((_, index) => (
              <span
                key={index}
                className={`block border-b-[1px] border-[#1E251F] transition-all duration-500 mb-[4px] ${
                  index === activeIndex ? "w-[15%]" : "w-[10%]"
                }`}
              />
            ))}
          </div>

          <div
            className="md:basis-[40%] basis-[90%] m-auto md:h-[calc(100vh)] h-[calc(80vh-200px)] xl:pb-[150px] relative swiper_container"
            ref={containerRef}
          >
            <Swiper
              direction="vertical"
              slidesPerView={1}
              spaceBetween={8}
              onInit={(swiper) => {
                swiperInstance.current = swiper;
                swiper.slideTo(0);
                setTimeout(() => {
                  swiper.slides?.forEach((slide) => {
                    if (slide) slide.className.remove("swiper-slide-active");
                  });
                  swiper.slides[0]?.className.add("swiper-slide-active");
                  if (videoCompleted) setSwiperReady(true);
                }, 100);
              }}
              freeMode={{
                enabled: true,
                sticky: true,
                momentumBounce: false,
                momentumRatio: 0.5,
                momentumVelocityRatio: 0.5,
              }}
              mousewheel={{
                enabled: !isMobile || !isLastSlide,
                forceToAxis: true,
                releaseOnEdges: true,
                sensitivity: 0.3,
                thresholdDelta: 10,
              }}
              touchRatio={isMobile && isLastSlide ? 0 : 1}
              touchAngle={45}
              touchMoveStopPropagation={true}
              touchStartPreventDefault={true}
              resistanceRatio={0}
              speed={500}
              grabCursor={true}
              pagination={{ clickable: true }}
              edgeSwipeDetection={true}
              edgeSwipeThreshold={20}
              modules={[Mousewheel, Pagination, FreeMode, Virtual, Keyboard]}
              className="h-full pb-[100px] swiper_main_container"
              onSlideChange={handleSlideChange}
              onReachEnd={() => {
                if (isMobile) {
                  setIsLastSlide(true);
                }
              }}
              onProgress={(swiper, progress) => {
                if (!containerRef.current || !headingRef.current) return;
                const maxSlides = HERO_DATA.length;
                if (maxSlides === 0) return;
                const slideProgress =
                  activeIndex / maxSlides + progress / maxSlides;
                const rawYOffset = isMobile
                  ? -800 * slideProgress
                  : -1800 * slideProgress;
                const yOffset = rawYOffset === -300 ? 0 : rawYOffset;
                const scale = isMobile
                  ? 1 - 0.008 * slideProgress
                  : 1 - 0.015 * slideProgress;
                // headingRef.current.style.transform = `translate3d(0, ${yOffset}px, 0) scale3d(${scale}, ${scale}, 1)`;
              }}
              breakpoints={{
                320: {
                  slidesPerView: 3,
                  spaceBetween: 4,
                  freeMode: {
                    enabled: true,
                    sticky: true,
                    momentumBounce: false,
                    momentumRatio: 0.5,
                    momentumVelocityRatio: 0.5,
                  },
                },
                600: {
                  slidesPerView: 3,
                  spaceBetween: 6,
                  freeMode: {
                    enabled: true,
                    sticky: true,
                    momentumBounce: false,
                    momentumRatio: 0.5,
                    momentumVelocityRatio: 0.5,
                  },
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 6,
                },
                1280: {
                  slidesPerView: 3,
                  spaceBetween: 6,
                },
                1320: {
                  slidesPerView: 4,
                  spaceBetween: 6,
                },
              }}
            >
              {HERO_DATA.map((info, index) => (
                <SwiperSlide
                  key={`${info.id || info.name}-${index}`}
                  onMouseEnter={() => handleSlideHover(index)}
                  onMouseLeave={handleSlideMouseLeave}
                  style={{
                    transition: "opacity 0.4s ease-in-out",
                  }}
                  className={activeIndex === index ? "swiper-slide-active" : ""}
                >
                  <figure
                    style={{ opacity: videoCompleted ? 1 : 0 }}
                    className="h-full relative img_container cursor-pointer"
                    onClick={(e) => handleSlideClick(info, index, e)}
                  >
                    <div className="overlay_container"></div>
                    <div className="bc_wrapper">
                      <div className="left">
                        <div className="t">
                          <div className="h"></div>
                          <div className="v"></div>
                        </div>
                        <div className="b">
                          <div className="h"></div>
                          <div className="v"></div>
                        </div>
                      </div>
                      <div className="right">
                        <div className="t">
                          <div className="h"></div>
                          <div className="v"></div>
                        </div>
                        <div className="b">
                          <div className="h"></div>
                          <div className="v"></div>
                        </div>
                      </div>
                    </div>

                    {info.video ||
                    info.img.endsWith(".mp4") ||
                    info.img.endsWith(".webm") ? (
                      <video
                        ref={(el) => (mediaRefs.current[index] = el)}
                        src={`/assets/home/hero/${info.video || info.img}`}
                        className="w-full h-full z-10 object-cover transition-transform duration-500"
                        loop
                        autoPlay
                        playsInline
                        muted
                      />
                    ) : (
                      <img
                        ref={(el) => (mediaRefs.current[index] = el)}
                        src={`/assets/home/hero/${info.img}`}
                        className="w-full h-full z-10 object-cover transition-transform duration-500"
                        alt={info.name}
                      />
                    )}

                    {info.name && (
                      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <img
                          src="/assets/home/hero/full-screen.png"
                          alt="zoom_arrow"
                          height="20"
                          className="w-[22px]"
                        />
                      </div>
                    )}
                  </figure>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="flex-[1] z-[7] flex flex-col md:block hidden relative justify-between h-[100%] translate-x-[200%] option_listing mb-[auto] 2xl:mt-[80px] text-right">
            <ul className="w-auto inline-block">
              {HERO_DATA.map((info, index) => (
                <li
                  key={index}
                  onMouseEnter={() => handleTextHover(index)}
                  onMouseLeave={handleSlideMouseLeave}
                  className={`font-[Oswald] cursor-pointer 2xl:text-lg md:!text-[16px] !text-[12px] uppercase font-semibold text-right transition-all duration-500 2xl:mb-1 ${
                    index === activeIndex ? "text-black" : "text-[#b5b6b2]"
                  }`}
                >
                  {info.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <button className="bg-[#1E251F] md:hidden block flex gap-[5px] font-[700] relative z-[999] justify-center mt-[15px] place-items-center text-white px-4 py-[2px] font-[500] w-[calc(100%-74px)]  font-[oswald] m-auto before:content-[''] before:absolute before:h-[166px] before:w-[100%] before:bottom-[148px] before:bg-[transparent] ">
        MEET NOW
        <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
          <path
            d="M20.6277 14.7276L12.0208 23.3345L10.6066 21.9203L19.2135 13.3134L11.6277 13.3134L11.6277 11.3137H22.6274V22.3135L20.6277 22.3135V14.7276Z"
            fill="white"
          />
        </svg>
      </button>
      <div className="lines absolute right-[0] bottom-[26%] md:hidden block">
        <div className="mix-blend-multiply h-[6px] w-[40px] bg-gtf-pink"></div>
        <div className="mix-blend-multiply my-[4px] h-[6px] w-[40px] bg-gtf-yellow"></div>
        <div className="mix-blend-multiply h-[6px] w-[40px] bg-gtf-blue"></div>
      </div>

      {/*infite loop text animation*/}
      {/* {createPortal(
        <div
          className="pointer-events-none left-0 w-full overflow-hidden z-[9]"
          style={{
            position: "fixed",
            top: `calc(100vh - 170px)`,
            // Fallback for JS disabled
          }}
        >
          <h2
            ref={marqueeRef}
            className="inline-block whitespace-nowrap uppercase text-[150px] font-semibold leading-none text-white"
          >
            {Array.from({ length: 4 }).map((_, i) => (
              <span key={i} className="inline-flex items-center">
                Branding{" "}
                <span className="dot h-[20px] w-[20px] bg-white inline-block mx-[50px]"></span>
                Digital Marketing{" "}
                <span className="dot h-[20px] w-[20px] bg-white inline-block mx-[50px]"></span>
                Double-Digit Growth{" "}
                <span className="dot h-[20px] w-[20px] bg-white inline-block mx-[50px]"></span>
              </span>
            ))}
          </h2>
        </div>,
        document.body
      )} */}

      {mounted &&
        modalOpen &&
        modalContent &&
        createPortal(
          <div
            className="fixed sparkle_modal inset-0 overflow-y-scroll z-[10000] bg-[#fff] justify-center bg-black/80 transition-opacity duration-300"
            onClick={closeModal}
          >
            <div className="relative flex flex-col items-center pt-[50px]">
              <div className="relative z-[4] flex justify-center md:w-[calc(100vw-299px)] w-[calc(100vw-60px)] md:h-[auto] h-[calc(100vh-120px)]">
                <div
                  ref={modalRef}
                  className="relative md:h-[auto] h-full py-[4px]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="relative md:h-[auto] h-full md:p-0 p-2">
                    {modalContent.type === "video" ? (
                      <video
                        className="w-full h-full object-cover"
                        src={modalContent.path}
                        controls
                        loop
                        autoPlay
                        playsInline
                      />
                    ) : (
                      <img
                        src={modalContent.path}
                        className="w-full max-h-[80vh] object-contain"
                        alt={modalContent.title}
                      />
                    )}
                  </div>
                </div>
              </div>
              <SparkleBackground />
              <button
                onClick={closeModal}
                className="absolute md:top-[10px] top-[8px] md:right-4 right-[36px] z-50 bg-white/90 hover:bg-white rounded-full p-2 transition-all duration-200"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div className="before_line absolute top-[0] md:left-[140px] left-[25px] h-full w-[2px] border-s-[1px] border-dashed border-[#000]"></div>
              <div className="before_line absolute top-[52px] w-full h-[2px] border-b-[1px] border-dashed border-[#000]"></div>
              <div className="before_line mt-[-4px] w-full h-[2px] border-b-[1px] border-dashed border-[#000]"></div>
              <div className="before_line h-full top-[0] w-[2px] absolute md:right-[140px] right-[25px] border-s-[1px] border-dashed border-[#000]"></div>
              <div className="modal_container md:block md:w-[calc(100vw-299px)] w-[calc(100vw-50px)] px-5 text-start py-[20px] mx-auto">
                <h2 className="font-[700] font-[oswald] uppercase tracking-[-1px] text-[25px] md:text-[35px]">
                  {modalContent.title}
                </h2>
                <div className="border-[#000] pt-[20px]">
                  <h4 className="font-[700]   font-[oswald]  uppercase tracking-[-1px]  mb-[18px] text-[20px]">
                    Project one
                  </h4>
                  <p className="mb-3">{modalContent.text}</p>
                  <p className="mb-3">{modalContent.text}</p>
                  <p className="mb-3">{modalContent.text}</p>
                  <p className="mb-3">{modalContent.text}</p>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
      <div className="">
        <div
          ref={line3Ref}
          className="w-[calc(35%)] m-auto h-[2px] md:block hidden z-[99] relative bg-gtf-blue opacity-1"
        ></div>
      </div>
    </section>
  );
};

export default HeroSection;
