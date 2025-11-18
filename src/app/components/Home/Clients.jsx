"use client";
import { useRef, useState, useEffect } from "react";
import Line from "../Line";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";

const Clients = () => {
  const imageRef = useRef(null);
  const coloredLineRef = useRef(null);
  const coloredLineRef2 = useRef(null);
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const logoSets = [
    { id: 1, src: "/assets/home/clients/ambience.png", alt: "Ambience" },
    { id: 2, src: "/assets/home/clients/ats.png", alt: "ATS" },
    { id: 3, src: "/assets/home/clients/jindal-realty.png", alt: "Jindal Realty" },
    { id: 4, src: "/assets/home/clients/homekraft.png", alt: "Homekraft" },
    { id: 5, src: "/assets/home/clients/parx-laureate.png", alt: "Parx Laureate" },
    { id: 6, src: "/assets/home/clients/raheja.png", alt: "Raheja" },
    { id: 7, src: "/assets/home/clients/tarc.png", alt: "Tarc" },
    { id: 8, src: "/assets/home/clients/ska-orion.png", alt: "SKA Orion" },
    { id: 9, src: "/assets/home/clients/aipl.png", alt: "AIPL" },
    { id: 10, src: "/assets/home/clients/eldeco.png", alt: "Eldeco" },
    { id: 1, src: "/assets/home/clients/ambience.png", alt: "Ambience" },
    { id: 2, src: "/assets/home/clients/ats.png", alt: "ATS" },
    { id: 3, src: "/assets/home/clients/jindal-realty.png", alt: "Jindal Realty" },
    { id: 4, src: "/assets/home/clients/homekraft.png", alt: "Homekraft" },
    { id: 5, src: "/assets/home/clients/parx-laureate.png", alt: "Parx Laureate" },
    { id: 6, src: "/assets/home/clients/raheja.png", alt: "Raheja" },
    { id: 7, src: "/assets/home/clients/tarc.png", alt: "Tarc" },
    { id: 8, src: "/assets/home/clients/ska-orion.png", alt: "SKA Orion" },
    { id: 9, src: "/assets/home/clients/aipl.png", alt: "AIPL" },
    { id: 10, src: "/assets/home/clients/eldeco.png", alt: "Eldeco" },
  ];

  // Duplicate logos for seamless infinite loop
  const duplicatedLogos = [...logoSets, ...logoSets];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section>
      <div  className="bg-[#fde93d] pt-[100px]">
        <div className="md:px-[35px] px-[15px] md:flex justify-start items-end md:mb-[0] mb-[30px] md:text-start">
          <h3 className="bebas uppercase relative md:leading-[70px] text-center md:text-start max-h-fit leading-[normal] md:mb-[0] mb-[15px] tracking-[2px] 2xl:text-[72px] lg:text-[62px] md:text-[50px] text-[32px] ">
            <span className="block">
              Amazing brands,
            </span>
            <span className="md:pl-[7.5rem] block mt-[10px]">
              Amazed Clients.
              <Line
                ref={coloredLineRef}
                bgColor="bg-gtf-blue"
                left="left-[33%] lg:left-[61%]"
                top="bottom-[2%]"
              />
            </span>
          </h3>
          <p className="uppercase italic pt-[16px] md:ml-[3rem] text-center lg:text-left font-[500] montserrat">
            <span className="block">They choose to work with us.</span>
            <span className="block">We chased the WOWasaS with them.</span>
          </p>
        </div>

        {/* Dual Infinite Swiper Sliders */}
        <div className="overflow-hidden relative w-full md:mt-[140px] main_border_cmp border-black pb-[120px]">
          {/* First Row - Slides Left */}
          <Swiper
            modules={[Autoplay]}
            spaceBetween={30}
            slidesPerView={2}
            breakpoints={{
              640: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 5 },
              1280: { slidesPerView: 6 },
            }}
            loop={true}
            loopedSlides={duplicatedLogos.length}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              reverseDirection: false,
            }}
            speed={8000} // Smooth continuous scroll
            allowTouchMove={false}
            freeMode={{ enabled: true, momentum: false }}
            centeredSlides={true}
            className="w-full infinite_swiper"
          >
            {duplicatedLogos.map((logo, index) => (
              <SwiperSlide key={`${logo.id}-${index}`}>
                <div className="flex items-center justify-center h-[150px] px-6 hover:grayscale transition-all duration-300 bg-[#fff]">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={130}
                    height={100}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Second Row - Slides Right (opposite direction) */}
          <Swiper
            modules={[Autoplay]}
            spaceBetween={30}
            slidesPerView={2}
            breakpoints={{
              640: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 5 },
              1280: { slidesPerView: 6 },
            }}
            loop="true"
            autoplay={{
              delay: 0,
              // disableOnInteraction: false,
              reverseDirection: true,
            }}
            speed={8000}
            allowTouchMove={false}
            // freeMode={{ enabled: true, }}
            centeredSlides={true}
            className="w-full mt-[30px] infinite_swiper"
          >
            {duplicatedLogos.map((logo, index) => (
              <SwiperSlide key={`${logo.id}-reverse-${index}`}>
                <div className="flex items-center justify-center h-[150px] px-6  hover:grayscale transition-all duration-300 bg-[#fff]">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={130}
                    height={100}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Rest of your section (Why GTF, reveal image, etc.) */}
      <div
        style={{
          backgroundImage: `url("/assets/home/clients/bg.png")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="relative md:text-start text-center md:py-[0] py-[60px]"
      >
        <h3 className="bebas uppercase md:text-start mb-[1.5rem] text-center max-h-content inline-block relative md:pt-[5rem] md:pl-[35px] px-5 md:leading-[70px] tracking-[2px] 2xl:text-[72px] lg:text-[62px] md:text-[50px] text-[32px]">
          <span className="">
            {"WHY ? "}
          </span>
          <span className="block">
            {"gtf technologies"}
          </span>
          <Line
            ref={coloredLineRef2}
            bgColor="bg-gtf-pink"
            top="top-[60%] lg:top-[83%]"
            left="left-[47%] lg:left-[61%]"
            right="right-[-2%]"
          />
        </h3>

        <div ref={containerRef}>
          <img
            ref={imageRef}
            style={{
              clipPath: isVisible
                ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
                : "polygon(0 0, 0 0, 0 93%, 0 100%)",
            }}
            src="/assets/home/clients/bg_of_client.png"
            alt="Background of client"
            className={`w-full h-[84px] md:pb-[70px] lg:h-auto xl:object-cover transition-clip-path duration-[2000ms] ease-out ${
              isVisible ? "animate-reveal" : ""
            }`}
          />
        </div>
      </div>
    </section>
  );
};

export default Clients;