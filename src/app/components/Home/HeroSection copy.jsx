"use client";
import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Pagination } from "swiper/modules";
import gsap from "gsap";
import "swiper/css";
import "swiper/css/pagination";
import { createPortal } from "react-dom";

const data = [
  { name: "Brand Strategy", img: "1.jpg", id: "brand_strategy" },
  { name: "Website Design & Development", id: "website_development", img: "5.jpg" },
  { name: "Paid Ads", id: "paid_ads", img: "3.jpg", video: "video_2.mp4" },
  { name: "Search Engine Optimization", id: "seo", img: "branding.mp4" },
  { name: "Social Media Marketing", id: "social", img: "2.jpg" },
];

const HeroSection = () => {
  const [showLines, setShowLines] = useState(false);
  const [swiperReady, setSwiperReady] = useState(false);
  const [videoCompleted, setVideoCompleted] = useState(false);
  const [expandedSlide, setExpandedSlide] = useState(null);
  const swiperInstance = useRef(null);
  const videoRef = useRef(null);
  const imageRef = useRef(null);
  const headingRef = useRef(null);
  const containerRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const expandedMediaRef = useRef(null); 
  const mediaRefs = useRef([]); 
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (swiperReady && videoCompleted) {
      gsap.fromTo(
        line1Ref.current,
        { width: "0%", opacity: 0, left: "17%" },
        { width: "25%", opacity: 1, left: "17%", duration: 1.5, ease: "power2.in" }
      );
      gsap.fromTo(
        line2Ref.current,
        { width: "0%", opacity: 0, right: "25%" },
        { width: "24%", opacity: 1, right: "25%", duration: 1.5, ease: "power2.in", delay: 0.2 }
      );
      gsap.fromTo(
        line3Ref.current,
        { height: "0%", opacity: 0 },
        { height: "30px", opacity: 1, duration: 1.6, ease: "power2.in", delay: 0.2 }
      );
      setShowLines(true);
    }
  }, [swiperReady, videoCompleted]);

  const handleVideoEnd = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        setVideoCompleted(true);
        videoRef.current.style.display = "none";
      },
    });
    tl.to(videoRef.current, { opacity: 0, duration: 1, ease: "power2.out" })
      .to(imageRef.current, { opacity: 1, duration: 0 }, "-=1")
      .fromTo(
        imageRef.current,
        { scale: 10, opacity: 1 },
        { scale: 1, duration: 1.5, ease: "power2.out" }
      );
  };

  const handleSlideClick = (index) => {
    if (index === activeIndex) {
      if (expandedSlide === index) {
        const media = mediaRefs.current[index];
        const rect = media.getBoundingClientRect();
        gsap.to(expandedMediaRef.current, {
          width: rect.width,
          height: rect.height,
          top: rect.top,
          left: rect.left,
          opacity: 0,
          duration: 0.5,
          ease: "power2.inOut",
          onComplete: () => setExpandedSlide(null),
        });
      } else {
        setExpandedSlide(index);
      }
    }
  };

  useEffect(() => {
    if (expandedSlide !== null && expandedMediaRef.current && mediaRefs.current[expandedSlide]) {
      const media = mediaRefs.current[expandedSlide];
      const rect = media.getBoundingClientRect();
      gsap.fromTo(
        expandedMediaRef.current,
        {
          width: rect.width,
          height: rect.height,
          top: rect.top,
          left: rect.left,
          opacity: 1,
        },
        {
          width: "100vw",
          height: "100vh",
          top: 0,
          left: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.inOut",
        }
      );
    }
  }, [expandedSlide]);

  const renderExpandedMedia = () => {
    if (expandedSlide === null) return null;

    const info = data[expandedSlide];
    return createPortal(
      <div
        className="fixed top-0 left-0 w-[100vw] h-[100vh] z-[10000] flex items-center justify-center"
        onClick={() => handleSlideClick(expandedSlide)}
      >
        {info.img.endsWith(".mp4") || info.img.endsWith(".webm") ? (
          <video
            ref={expandedMediaRef}
            src={`/assets/home/hero/${info.img}`}
            className="object-cover"
            autoPlay
            loop
            muted
          />
        ) : (
          <img
            ref={expandedMediaRef}
            src={`/assets/home/hero/${info.img}`}
            className="object-cover"
            alt={info.name}
          />
        )}
      </div>,
      document.body
    );
  };

  return (
    <section className="relative">
      <video
        ref={videoRef}
        src={`/assets/home/hero/branding.mp4`}
        className="w-full h-screen z-[9999] object-cover fixed top-0 left-0"
        autoPlay
        muted
        loop={false}
        onEnded={handleVideoEnd}
      />
      <div className="custom_container" style={{ opacity: videoCompleted ? 1 : 0 }}>
        <div className="flex justify-center mb-10 heading-container" ref={headingRef}>
          <h1 className="uppercase text-center text-5xl font-bold font-[Oswald] text-global-color tracking-[1px]">
            <span className="block mb-[7px]">Branding, Digital Marketing</span>
            <span className="block">and Double-Digit Growth</span>
          </h1>
        </div>
        <div className="flex justify-between relative flex-wrap items-center">
          <img
            src="/assets/home/hero/circle.svg"
            className="h-[450px] rotate-plus absolute top-[30%] opacity-[0.6] left-[10%]"
            alt="plus"
          />
          <div className="basis-[14%] mt-[220px] mb-[auto]">
            {data.map((_, index) => (
              <span
                key={index}
                className={`block border-b-[1px] border-black transition-all duration-500 ${
                  index === activeIndex ? "w-[20%]" : "w-[15%]"
                } mb-[3px]`}
              />
            ))}
          </div>
          {swiperReady && (
            <>
              <div
                ref={line1Ref}
                className="h-[30px] w-[80%] absolute top-[420px] z-[-9999] bg-gtf-pink opacity-0"
              ></div>
              <div
                ref={line2Ref}
                className="h-[30px] w-[80%] absolute bottom-[125px] right-[-196px] bg-gtf-yellow opacity-0"
              ></div>
              <div
                ref={line3Ref}
                className="w-[41.56%] h-[30px] left-[28.6%] bottom-[20px] z-[999] absolute bg-gtf-blue opacity-0"
              ></div>
            </>
          )}
          <div
            className="basis-[40%] h-[calc(100vh-60px)] translate-y-[-10%] relative swiper_container"
            ref={containerRef}
          >
            <Swiper
              direction="vertical"
              centeredSlides={true}
              slidesPerView={3.8}
              onSwiper={(swiper) => {
                swiperInstance.current = swiper;
                swiper.slideTo(0);
                if (videoCompleted) {
                  setTimeout(() => setSwiperReady(true), 500);
                }
              }}
              freeMode={{ enabled: true, sticky: true }}
              mousewheel={{
                forceToAxis: true,
                releaseOnEdges: true,
                sensitivity: 0.5,
                thresholdDelta: 0,
              }}
              pagination={{ clickable: true }}
              modules={[Mousewheel, Pagination]}
              className="h-full"
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
              onProgress={(swiper, progress) => {
                if (!containerRef.current || !headingRef.current) return;
                let yOffset = -2000 * progress;
                let containerOffset = Math.max(0, -100 * (progress - 0.2));
                if (progress >= 0.8 && progress <= 0.9) {
                  containerOffset = 156;
                }
                let scale = 1 - 0.02 * progress;
                if (swiper.realIndex === 0) {
                  headingRef.current.style.transform = `translate3d(-50%, ${yOffset}px, 0px) scale3d(${scale}, ${scale}, 1)`;
                }
                if (swiper.realIndex === 0) {
                  if (progress > 0.2) {
                    containerRef.current.style.transform = `translate3d(0px, ${containerOffset}px, 0px)`;
                  } else {
                    containerRef.current.style.transform = `translateY(-10%)`;
                  }
                }
              }}
            >
              {data.map((info, index) => (
                <SwiperSlide
                  key={index + info.name}
                  className={activeIndex === index ? "swiper-slide-active" : ""}
                  onClick={() => handleSlideClick(index)}
                >
                  <figure className="h-[100%] relative img_container">
                    <div className="overlay_container"></div>
                    <div className="bc_wrapper">
                      <div className="left">
                        <div className="t"><div className="h"></div><div className="v"></div></div>
                        <div className="b"><div className="h"></div><div className="v"></div></div>
                      </div>
                      <div className="right">
                        <div className="t"><div className="h"></div><div className="v"></div></div>
                        <div className="b"><div className="h"></div><div className="v"></div></div>
                      </div>
                    </div>
                    {info.img.endsWith(".mp4") || info.img.endsWith(".webm") ? (
                      <video
                        ref={(el) => (mediaRefs.current[index] = el)}
                        src={`/assets/home/hero/${info.img}`}
                        className="w-full h-[100%] z-[9999] object-cover transition-all duration-500"
                        autoPlay
                        loop
                        muted
                      />
                    ) : (
                      <img
                        ref={(el) => (mediaRefs.current[index] = el)}
                        src={`/assets/home/hero/${info.img}`}
                        className="w-full h-[100%] z-[9999] object-cover transition-all duration-500"
                        alt={info.name}
                      />
                    )}
                  </figure>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="flex flex-col relative justify-between option_listing mb-[auto] mt-[200px]">
            <ul className="basis-[22%] mt-[40px]">
              {data.map((info, index) => (
                <li
                  key={index}
                  onClick={() => swiperInstance.current?.slideToLoop(index)}
                  className={`font-[Oswald] cursor-pointer text-lg uppercase font-semibold text-right transition-all duration-500 mb-1 ${
                    index === activeIndex ? "text-black" : "text-[#b5b6b2]"
                  }`}
                >
                  {info.name}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex absolute bottom-[30px] right-0 w-[280px] items-center text-[14px]">
            <p className="font-[Oswald] font-[400] text-end text-[14px] mr-[12px]">
              <span className="font-medium">GTF Technologies</span> is conceptualized from
              <span className="font-medium"> Gurukul The Foundation</span>
            </p>
            <img
              src="/assets/home/hero/map.png"
              className="h-[60px] object-contain w-[140px]"
              alt="map"
            />
          </div>
        </div>
      </div>

      {renderExpandedMedia()}
    </section>
  );
};

export default HeroSection;