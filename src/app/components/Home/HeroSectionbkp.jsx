"use client";
import { useState, useRef, useEffect } from "react";
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
// import HeroSectionSlider from "./hero/HeroSectionSlider";
const HeroSection = () => {
  const [swiperReady, setSwiperReady] = useState(false);
  const [videoCompleted, setVideoCompleted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeIndexes, setActiveIndexes] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [mounted, setMounted] = useState(false);

  const [isMobile, setIsMobile] = useState(false);

  const swiperInstance = useRef(null);
  const headingRef = useRef(null);
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const mediaRefs = useRef([]);
  const modalRef = useRef(null);

  const dotsConfig = [
    { top: "29%", left: "65%", color: "bg-gtf-blue" },
    { top: "32%", left: "70%", color: "bg-gtf-yellow" },
    { bottom: "26%", left: "65%", color: "bg-gtf-pink " },
    { bottom: "38%", left: "63%", color: "bg-[purple]" },
    { bottom: "14%", left: "67%", color: "bg-[green]" },
  ];

  useEffect(() => {
    setMounted(true);
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
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    if (modalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [modalOpen]);

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

  const handleVideoEnd = () => {
    setVideoCompleted(true);
    const tl = gsap.timeline({
      onComplete: () => setSwiperReady(true),
    });

    tl.to(videoRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
      onComplete: () => {
        if (videoRef.current) {
          videoRef.current.style.display = "none";
          setTimeout(() => {
            const firstMedia = mediaRefs.current[0];
            if (firstMedia && "play" in firstMedia) firstMedia.play();
            mediaRefs.current.forEach((item) => {
              if (
                item &&
                item.parentElement &&
                item.parentElement.parentElement
              ) {
                item.parentElement.parentElement.style.opacity = 1;
              }
            });
          }, 800);
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
      headingRef.current,
      { y: 50, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "back.out(1.5)" },
      "-=0.8"
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

  const handleMediaClick = (info, index) => {
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
  };

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  return (
    <section className="relative hero_section overflow-hidden md:px-[25px] px-[15px]">
      {mounted &&
        createPortal(
          <div className="video_container">
            <video
              ref={videoRef}
              src="/assets/home/hero/main_video.mp4"
              className="w-full h-full z-[9999] object-cover fixed top-0 left-0 transition-opacity duration-500"
              autoPlay
              playsInline
              muted
              onEnded={handleVideoEnd}
            />
          </div>,
          document.body
        )}
      <div className="right-[20px] bottom-[30px]    md:block hidden absolute ml-auto">
        <div className="flex justify-end relative">
          {dotsConfig.map((dot, index) => {
            const isActive = activeIndexes.includes(index);
            return (
              <span
                key={index}
                className={`absolute h-[5px] w-[5px] transition-opacity transform duration-500 ease-in-out ${
                  dot.color
                } ${isActive ? "opacity-100 scale-60" : "opacity-0 scale-50"}`}
                style={{ top: dot.top, left: dot.left, bottom: dot.bottom }}
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
          conceptualized from
          <span className="lg:block"></span>
          <span className="font-medium"> Gurukul The Foundation</span>
        </p>
      </div>

      <div
        ref={line1Ref}
        className="mix-blend-multiply h-[10px]  md:block hidden md:h-[25px] w-[80%] absolute top-[calc(56%)] bg-gtf-pink opacity-0"
      ></div>
      <div
        ref={line2Ref}
        className="mix-blend-multiply h-[10px]   md:block hidden  md:h-[25px] w-[80%] absolute 2xl:bottom-[135px] bottom-[85px] md:right-[-196px] bg-gtf-yellow opacity-0"
      ></div>

      <img
        src="/assets/home/hero/circle.svg"
        className="2xl:h-[450px] md:h-[300px] h-[300px] rotate-plus absolute rotation_circle 2xl:top-[46%] lg:top-[40%]  bottom-[0] opacity-0 lg:left-[15%]"
        alt="Decorative circle"
      />

      <div className="2xl:h-[calc(100vh-130px)] lg:h-[calc(100vh-100px)]   relative md:pt-[0]   z-[4]">
        <div
          className="flex justify-center 2xl:mb-10  mb-8 heading-container"
          ref={headingRef}
          style={{ opacity: 0 }}
        >
          <h1 className="uppercase text-center  font-bold font-[Oswald] text-global-color tracking-[1px]">
            <span className="md:block  2xl:text-5xl lg:text-[35px] text-[26px] 2xl:mb-[12px]">
              Branding, Digital Marketing
            </span>
            <span className="md:block 2xl:text-5xl lg:text-[35px] text-[26px]">
              and Double-Digit Growth
            </span>
          </h1>
        </div>

        <div className="flex justify-between flex-wrap items-stretch">
          <div className="flex-[1] md:block hidden  2xl:mt-[150px] lg:mt-[80px] leading-[1px] translate-x-[-200%] right_line mb-[auto]">
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
            className="md:basis-[40%] basis-[90%] m-auto md:h-[calc(100vh)]  h-[calc(80vh-200px)]  xl:pb-[150px] relative swiper_container"
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
                  swiper.slides.forEach((slide) => {
                    if (slide) slide.classList.remove("swiper-slide-active");
                  });
                  if (videoCompleted) setSwiperReady(true);
                }, 100);
              }}
              freeMode={{ 
                enabled: true, 
                sticky: true,
                momentumBounce: false,
                momentumRatio: 0,
                momentumVelocityRatio: 0
              }}
              mousewheel={{
                forceToAxis: true,
                releaseOnEdges: true,
                sensitivity: 0.5,
                thresholdDelta: 0,
              }}
              touchRatio={1}
              touchAngle={45}
              touchMoveStopPropagation={true}
              touchStartPreventDefault={true}
              resistanceRatio={0}
              speed={300}
              grabCursor={true}
              pagination={{ clickable: true }}
              edgeSwipeDetection={true}
              edgeSwipeThreshold={0}             
              modules={[Mousewheel, Pagination, FreeMode, Virtual, Keyboard]}
              className="h-full pb-[100px] swiper_main_container"
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
               onProgress={(swiper, progress) => {
            if (progress === 1) {
              window.scrollBy({
                top: 100, // Scroll down 100px
                behavior: 'smooth'
              });
            }
  
  // Continue with your existing animation logic
  if (!containerRef.current || !headingRef.current) return;
  const isMobile = window.innerWidth < 768;
  const yOffset = isMobile ? -1000 * progress : -2200 * progress;
  const scale = isMobile
    ? 1 - 0.01 * progress
    : 1 - 0.02 * progress;
    
  if (swiper.realIndex === 0) {
    headingRef.current.style.transform = `translate3d(0, ${yOffset}px, 0px) scale3d(${scale}, ${scale}, 1)`;
  }
}}
              breakpoints={{
                320: {
                  slidesPerView: 3,
                  spaceBetween: 4,
                  freeMode: {
                    enabled: true,
                    sticky: true,
                    momentumBounce: false,
                    momentumRatio: 0,
                    momentumVelocityRatio: 0
                  }
                },
                600: {
                  // Large mobile
                  slidesPerView: 3,
                  spaceBetween: 6,
                  freeMode: {
                    enabled: true,
                    sticky: true,
                    momentumBounce: false,
                    momentumRatio: 0,
                    momentumVelocityRatio: 0
                  }
                },
                768: {
                  // Tablets
                  slidesPerView: 3,
                  spaceBetween: 6,
                },
                1280: {
                  // Tablets
                  slidesPerView: 3,
                  spaceBetween: 6,
                },
                1320: {
                  // Tablets
                  slidesPerView: 4,
                  spaceBetween: 6,
                },
              }}
            >
              {HERO_DATA.map((info, index) => (
                <SwiperSlide
                  key={`${info.id || info.name}-${index}`}
                  onMouseEnter={(e) => {
                    document
                      .querySelectorAll(".swiper-slide")
                      .forEach((slide) => {
                        if (slide)
                          slide.classList.remove("swiper-slide-active");
                      });
                    e.currentTarget.classList.add("swiper-slide-active");
                  }}
                  style={{
                    opacity: index !== 0 ? 0 : 1,
                    transition: "opacity 0.4s ease-in-out",
                  }}
                  className={activeIndex === index ? "swiper-slide-active" : ""}
                >
                  <figure
                    style={{ opacity: videoCompleted ? 1 : 0 }}
                    className="h-full relative img_container cursor-pointer"
                    onClick={() => handleMediaClick(info, index)}
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
                      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity duration-300 z-20">
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

             {/* <HeroSectionSlider videoCompleted={videoCompleted}/> */}
          </div>

          <div className="flex-[1] z-[7] flex flex-col  md:block hidden relative justify-between h-[100%] translate-x-[200%] option_listing mb-[auto]  2xl:mt-[80px]">
            <ul>
              {HERO_DATA.map((info, index) => (
                <li
                  key={index}
                  onClick={() => {
                    if (swiperInstance.current)
                      swiperInstance.current.slideTo(index);
                  }}
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

      <button className="bg-[#1E251F] md:hidden block flex gap-[5px] font-[700] relative z-[999] justify-center mt-[15px] place-items-center text-white px-4 py-[2px] font-[500] w-[calc(100%-74px)] font-[oswald] m-auto">
        MEET NOW{" "}
        <svg
          width="34"
          height="34"
          viewBox="0 0 34 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.6277 14.7276L12.0208 23.3345L10.6066 21.9203L19.2135 13.3134L11.6277 13.3134L11.6277 11.3137H22.6274V22.3135L20.6277 22.3135V14.7276Z"
            fill="white"
          />
        </svg>
      </button>
      <div className="lines absolute right-[0] bottom-[26%] md:hidden block">
        <div className="mix-blend-multiply h-[6px] w-[40px] bg-gtf-pink"></div>
        <div className="mix-blend-multiply my-[4px] h-[6px] w-[40px]  bg-gtf-yellow"></div>
        <div className="mix-blend-multiply  h-[6px] w-[40px] bg-gtf-blue "></div>
      </div>
      {mounted &&
        modalOpen &&
        modalContent &&
        createPortal(
          <div
            className="fixed sparkle_modal inset-0 overflow-y-scroll z-[10000] bg-[#fff] justify-center bg-black/80 transition-opacity duration-300"
            onClick={closeModal}
          >
            <div className="relative flex flex-col items-center pt-[50px]">
              <div className="relative z-[4] flex justify-center  md:w-[calc(100vw-299px)] w-[calc(100vw-60px)]  md:h-[auto] h-[calc(100vh-120px)]">
                <div
                  ref={modalRef}
                  className="relative md:h-[auto] h-full  py-[4px]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="relative  md:h-[auto] h-full md:p-0 p-2">
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
              <div className="before_line absolute top-[52px]   w-full h-[2px]  border-b-[1px] border-dashed border-[#000]"></div>

              <div className="before_line mt-[-4px]  w-full h-[2px]  border-b-[1px] border-dashed border-[#000]"></div>
              <div className="before_line h-full  top-[0]  w-[2px] absolute md:right-[140px] right-[25px]  border-s-[1px] border-dashed border-[#000]"></div>
              <div className="modal_container md:block  md:w-[calc(100vw-299px)] w-[calc(100vw-50px)] px-5 text-start py-[20px] mx-auto">
                <h2 className="font-[700] uppercase tracking-[-1px] text-[25px]  md:text-[35px]">
                  {modalContent.title}
                </h2>
                
                <div className="border-[#000] pt-[20px]">
                  <h4 class="font-[700] uppercase tracking-[-1px]  text-[20px]">
                    Project one
                  </h4>
                  <p>{modalContent.text}</p>
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
