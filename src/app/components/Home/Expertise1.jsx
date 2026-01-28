"use client";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Feature = () => {
  const [isPinned, setIsPinned] = useState(false);
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const swiperRef = useRef(null);
  const scrollingRef = useRef(false);

  const handleWheel = (event) => {
    if (!isPinned || scrollingRef.current) return;

    scrollingRef.current = true;

    if (event.deltaY > 0) {
      // Scroll down, move to the next slide
      if (swiperRef.current.swiper) {
        swiperRef.current.swiper.slideNext();
      }
    } else if (event.deltaY < 0) {
      // Scroll up, move to the previous slide
      if (swiperRef.current.swiper) {
        swiperRef.current.swiper.slidePrev();
      }
    }

    // Reset scrolling flag after the animation completes
    setTimeout(() => {
      scrollingRef.current = false;
    }, 200); // Timeout should match the swiper slide transition time
  };

  useEffect(() => {
    const updateEndValue = () => {
      const totalSlides = swiperRef.current.swiper.slides.length;
      const slideHeight = swiperRef.current.swiper.slides[0].offsetHeight;
      const totalHeight = slideHeight * totalSlides;
      return `+=${totalHeight}`; // Dynamically set end value based on total height of slides
    };

    // Pin the container when scrolling
    const pinTrigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top", // Start when the container hits the top of the viewport
      end: updateEndValue, // Dynamically calculate the end value based on slides
      pin: true, // Pin the container
      scrub: 0.2, // Smooth scroll scrubbing
      markers: true, // Optional: Add markers for testing
      anticipatePin: 1,
      onEnter: () => {
        setIsPinned(true);
      },
      onLeave: () => {
        setIsPinned(false);
      },
    });

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      pinTrigger.kill(); // Cleanup the ScrollTrigger instance
    };
  }, [isPinned]);

  return (
    <section className="w-full relative mix-blend-multiply border-t border-gray-300">
      <div ref={containerRef} className="pin-container relative">
        <Swiper
          ref={swiperRef}
          spaceBetween={50}
          slidesPerView={1}
          loop={false}
          mousewheel={false}
        >
          <SwiperSlide>
            <div className="flex flex-row items-center justify-center w-full">
              <video autoPlay loop muted className="w-[400px] transition-transform duration-300">
                <source src="/assets/home/who_we_are/pandas/1.mp4" />
              </video>
              <h3 className="neue_font uppercase text-[50px] font-bold mb-[1rem] font-[600] w-[max-content]">
                Built to Disrupt <span className="block">the Ordinary.</span>
              </h3>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="flex flex-row items-center justify-center w-full">
              <video autoPlay loop muted className="w-[400px] transition-transform duration-300">
                <source src="/assets/home/who_we_are/pandas/2.mp4" />
              </video>
              <h5 className="neue_font text-[34px] mb-[1rem] font-[600]">
                Not a Team.{" "}
                <span className="block text-[50px] uppercase font-bold">A task force. </span>
              </h5>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="flex flex-row items-center justify-center w-full">
              <video autoPlay loop muted className="w-[400px] transition-transform duration-300">
                <source src="/assets/home/who_we_are/pandas/3.mp4" />
              </video>
              <h5 className="neue_font text-[34px] mb-[1rem] font-[600]">
                Engineered to turn.{" "}
                <span className="block text-[50px] uppercase font-bold">clicks into conviction. </span>
              </h5>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="flex flex-row items-center justify-center w-full">
              <video autoPlay loop muted className="w-[400px] transition-transform duration-300">
                <source src="/assets/home/who_we_are/pandas/1.mp4" />
              </video>
              <h5 className="neue_font text-[34px] mb-[1rem] font-[600]">
                Designed to make noise{" "}
                <span className="block text-[50px] uppercase font-bold">impossible to ignore. </span>
              </h5>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default Feature;
