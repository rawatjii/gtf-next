"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, FreeMode, Virtual, Keyboard } from "swiper/modules";
import { createPortal } from "react-dom";
import gsap from "gsap";
import "swiper/css";
import SparkleBackground from "../SparkleBackground";
import { HERO_DATA } from "./hero/heroData";
import { robotoCondensed } from "@/app/utils/font";
import SlideTxtAn from "@/app/utils/SlideTxtAn";
import Line from "../Line";

const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

const Locationmap = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lastActiveIndex, setLastActiveIndex] = useState(0);
  const [activeIndexes, setActiveIndexes] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const swiperInstance = useRef(null);
  const headingRef = useRef(null);
  const containerRef = useRef(null);
  const mediaRefs = useRef([]);
  const modalRef = useRef(null);
  const marqueeRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const coloredLineRef = useRef(null);

  const dotsConfig = [
    { top: "29%", left: "65%", color: "bg-gtf-blue" },
    { top: "32%", left: "70%", color: "bg-gtf-yellow" },
    { bottom: "26%", left: "65%", color: "bg-gtf-pink" },
    { bottom: "38%", left: "63%", color: "bg-[purple]" },
    { bottom: "14%", left: "67%", color: "bg-[green]" },
  ];

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Blinking dots animation
  useEffect(() => {
    let isMounted = true;
    const blinkDots = async () => {
      while (isMounted) {
        await new Promise((resolve) => {
          let count = 0;
          let on = true;
          const interval = setInterval(() => {
            if (!isMounted) {
              clearInterval(interval);
              return;
            }
            setActiveIndexes(on ? [0, 1, 2, 3, 4] : []);
            on = !on;
            if (!on) count++;
            if (count >= 2) {
              clearInterval(interval);
              setTimeout(resolve, 1000);
            }
          }, 500);
        });
      }
    };
    blinkDots();
    return () => (isMounted = false);
  }, []);

  // Infinite marquee
  useEffect(() => {
    if (!marqueeRef.current) return;
    const el = marqueeRef.current;
    const distance = el.offsetWidth / 2;
    const tl = gsap.timeline({ repeat: -1, defaults: { ease: "none" } });
    tl.fromTo(el, { x: -distance }, { x: 0, duration: 100 });
    tl.set(el, { x: 0 });
    return () => tl.kill();
  }, []);

  // Initial entrance animations (lines, heading, etc.)
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      headingRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2 }
    );

    tl.to(".swiper-slide:first-child", { opacity: 1, scale: 1, duration: 1 }, "-=0.8");
    tl.fromTo(".option_listing", { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 1 }, "-=0.8");
    tl.fromTo(".right_line", { x: 100, opacity: 0 }, { x: 0, opacity: 1, duration: 1 }, "-=0.8");
    tl.fromTo(".rotation_circle", { opacity: 0, scale: 0.8, rotate: -30 }, { opacity: 1, scale: 1, rotate: 0, duration: 1.2 }, "-=0.8");

    // Lines
    tl.fromTo(line1Ref.current, { width: "0%", opacity: 0 }, { width: "25%", opacity: 1, duration: 0.8 }, "-=1");
    tl.fromTo(line2Ref.current, { width: "0%", opacity: 0 }, { width: "24%", opacity: 1, duration: 0.8 }, "-=0.8");
    tl.fromTo(line3Ref.current, { height: "0%", opacity: 0 }, { height: "25px", opacity: 1, duration: 0.8 }, "-=0.8");
  }, []);

  // Modal handlers
  const openModal = (content) => {
    setModalContent(content);
    setModalOpen(true);
    gsap.fromTo(modalRef.current, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5 });
  };

  const closeModal = () => {
    gsap.to(modalRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 0.4,
      onComplete: () => setModalOpen(false),
    });
  };

  // Hover & click handlers
  const handleSlideClick = useCallback((info, index) => {
    if (!info.name) return;
    const isVideo = info.video || /\.(mp4|webm)$/.test(info.img);
    const path = `/assets/home/hero/${info.video || info.img}`;

    openModal({
      type: isVideo ? "video" : "image",
      path,
      title: info.name,
      text: info.text,
    });
  }, []);

  const handleHover = useCallback(
    debounce((index) => {
      setActiveIndex(index);
      swiperInstance.current?.slideTo(index);
    }, 100),
    []
  );

  const handleMouseLeave = useCallback(
    debounce(() => {
      setActiveIndex(lastActiveIndex);
      swiperInstance.current?.slideTo(lastActiveIndex);
    }, 100),
    [lastActiveIndex]
  );

  const handleSlideChange = useCallback((swiper) => {
    const idx = swiper.realIndex;
    setActiveIndex(idx);
    setLastActiveIndex(idx);
  }, []);

  return (
    <section className="relative hero_section overflow-hidden pb-[100px] pt-[50px] md:px-[50px]">
      {/* Decorative Elements */}
      <div className="right-[20px] bottom-[30px] md:block hidden absolute">
        {/* <div className="flex justify-end relative">
          {dotsConfig.map((dot, i) => (
            <span
              key={i}
              className={`absolute h-1 w-1 rounded-full transition-all duration-500 ${
                activeIndexes.includes(i) ? "opacity-100 scale-150" : "opacity-30 scale-100"
              } ${dot.color}`}
              style={{ top: dot.top, left: dot.left, bottom: dot.bottom }}
            />
          ))}
          <img src="/assets/home/map-1.png" className="h-[110px] mb-[5px]" alt="map" />
        </div> */}
        <p className="font-[Oswald] text-end text-[15px] mr-[12px] mt-2">
          <span className="font-medium">GTF Technologies</span> is conceptualized from{" "}
          <span className="font-medium block">Gurukul The Foundation</span>
        </p>
      </div>

      {/* Lines */}
      <div ref={line1Ref} className="mix-blend-multiply h-[25px] hidden md:block w-[25%] absolute top-[56%] left-[20%] bg-gtf-pink opacity-0" />
      <div ref={line2Ref} className="mix-blend-multiply h-[25px] hidden md:block w-[24%] absolute bottom-[20%] right-[20%] bg-gtf-yellow opacity-0" />
      <div ref={line3Ref} className="hidden md:block w-[35%] mx-auto h-[2px] bg-gtf-blue opacity-0 bottom-[80px] left-[50%] -translate-x-1/2 absolute" />

      <img
        src="/assets/home/hero/circle.svg"
        className="rotation_circle opacity-0 absolute 2xl:h-[450px] md:h-[300px] h-[300px] lg:left-[8%] top-[40%]"
        alt="circle"
      />

        <h2 className="relative uppercase 2xl:leading-[70px]  xl:leading-[56px]  leading-[35px] md:basis-[50%] max-h-fit table mx-auto text-center mb-[50px]">
          <span className="bartino-outline tracking-[2px] text-[30px] xl:text-[50px]  md:text-[50px] 2xl:text-[72px] block">
            Branding, Digital Marketing
          </span>
          <span className="font-[Oswald] block font-medium text-[30px] xl:text-[48px] md:text-[50px] 2xl:text-[65px]">
            And Double-Digit Growth
          </span>
          <Line
            ref={coloredLineRef}
            left={"xl:left-[25%] left-[50%] 2xl:left-[37%]"}
            bgColor="bg-gtf-pink"
          />
        </h2>

      {/* Slider + Text List */}
      <div className="flex justify-between items-stretch pt-[80px] pb-[60px] 2xl:h-[calc(100vh-300px)] lg:h-[calc(100vh-200px)] overflow-hidden">
        {/* Left decorative lines */}
        <div className="flex-1 hidden md:block right_line translate-x-[-200%]">
          <div className="h-full">
            {HERO_DATA.map((_, i) => (
              <span
                key={i}
                className={`block border-b border-b-[3px] border-[#575757] mb-[6px] transition-all duration-500 ${
                  i === activeIndex ? "w-[20%]" : "w-[10%]"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Swiper */}
        <div ref={containerRef} className="md:basis-[55%] basis-[90%] m-auto h-[80vh] relative h-full">
          <Swiper
            direction="vertical"
            slidesPerView={isMobile ? 3 : 2}
            spaceBetween={8}
            freeMode={{ enabled: true, sticky: true, momentumBounce: false }}
            mousewheel={{ enabled: true, forceToAxis: true }}
            grabCursor
            modules={[Mousewheel, FreeMode, Virtual, Keyboard]}
            onSwiper={(s) => (swiperInstance.current = s)}
            onSlideChange={handleSlideChange}
            className="h-full"
          >
            {HERO_DATA.map((info, i) => (
              <SwiperSlide
                key={i}
                onMouseEnter={() => handleHover(i)}
                onMouseLeave={handleMouseLeave}
                className={activeIndex === i ? "swiper-slide-active" : ""}
              >
                <figure
                  className="relative cursor-pointer img_container overflow-hidden"
                  onClick={() => handleSlideClick(info, i)}
                >
                  {info.video || /\.(mp4|webm)$/.test(info.img) ? (
                    <video
                      ref={(el) => (mediaRefs.current[i] = el)}
                      src={`/assets/home/hero/${info.video || info.img}`}
                      className="w-full h-full object-cover"
                      loop
                      autoPlay
                      muted
                      playsInline
                    />
                  ) : (
                    <img
                      src={`/assets/home/hero/${info.img}`}
                      className="w-full h-full object-cover"
                      alt={info.name}
                    />
                  )}
                  {info.name && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity">
                      <img src="/assets/home/hero/full-screen.png" alt="zoom" className="w-6" />
                    </div>
                  )}
                </figure>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Right text list */}
        <div className="flex-1 hidden md:flex flex-col justify-start option_listing translate-x-[200%] text-right">
          <ul>
            {HERO_DATA.map((info, i) => (
              <li
                key={i}
                onMouseEnter={() => handleHover(i)}
                onMouseLeave={handleMouseLeave}
                className={`font-[Oswald] uppercase  cursor-pointer transition-colors mb-[8px]  text-base ${
                  i === activeIndex ? "text-black font-semibold 2xl:text-[22px] mb-[14px]" : "text-[#b5b6b2] 2xl:text-[18px]"
                } `}
              >
                {info.name}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile CTA */}
      <button className="md:hidden block bg-[#1E251F] text-white font-[Oswald] font-bold uppercase mx-auto mt-6 px-8 py-3 rounded-full flex items-center gap-2">
        Meet Now
        <svg width="34" height="34" viewBox="0 0 34 34" fill="white">
          <path d="M20.6277 14.7276L12.0208 23.3345L10.6066 21.9203L19.2135 13.3134L11.6277 13.3134L11.6277 11.3137H22.6274V22.3135L20.6277 22.3135V14.7276Z" />
        </svg>
      </button>

      {/* Modal */}
      {modalOpen &&
        createPortal(
          <div className="fixed inset-0 bg-black/80 z-[10000] flex items-center justify-center" onClick={closeModal}>
            <div ref={modalRef} className="relative max-w-5xl w-full p-8" onClick={(e) => e.stopPropagation()}>
              {modalContent.type === "video" ? (
                <video src={modalContent.path} controls autoPlay loop className="w-full" />
              ) : (
                <img src={modalContent.path} alt={modalContent.title} className="w-full max-h-[80vh] object-contain" />
              )}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 bg-white rounded-full p-2 hover:scale-110 transition"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <SparkleBackground />
          </div>,
          document.body
        )}
    </section>
  );
};

export default Locationmap;