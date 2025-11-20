"use client";
import { useRef, useState, useEffect } from "react";
import Line from "../Line";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Grid } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/grid";

const Clients = () => {

  // Your original 10 logos (you can add more if you want)
  const baseLogos = [
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

  // Duplicate enough times to fill the grid + seamless loop
  const logos = [...baseLogos, ...baseLogos, ...baseLogos, ...baseLogos]; // 40 items → safe for infinite scroll


  return (
    <section className="bg-[#fde93d] py-[100px] relative">
        <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-[9] md:px-[35px] px-[15px] md:flex justify-start items-end md:mb-[0] mb-[30px] md:text-start">
          <h3 className="bebas uppercase relative md:leading-[70px] text-center md:text-start max-h-fit leading-[normal] md:mb-[0] mb-[15px] tracking-[2px] 2xl:text-[72px] lg:text-[62px] md:text-[50px] text-[32px]">
            <span className="block">Amazing brands,</span>
            <span className="md:pl-[7.5rem] block mt-[10px]">
              Amazed Clients.
              <Line
                bgColor="bg-gtf-blue"
                left="left-[33%] lg:left-[61%]"
                top="bottom-[2%]"
              />
            </span>
          </h3>
          {/* <p className="uppercase italic pt-[16px] md:ml-[3rem] text-center lg:text-left font-[500] montserrat">
            <span className="block">They choose to work with us.</span>
            <span className="block">We chased the WOWasaS with them.</span>
          </p> */}
        </div>

        {/* 4×6 Grid Infinite Slider */}
        <div className="overflow-hidden relative w-full main_border_cmp border-black">
          <Swiper
            modules={[Autoplay, Grid]}
            grid={{
              rows: 4,           // 4 rows vertically
              fill: "row",       // Important: fills row by row
            }}
            slidesPerView={6}    // 6 columns horizontally
            spaceBetween={30}
            loop={true}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
            }}
            speed={10000}        // Adjust speed for smooth feel (10 seconds per full cycle)
            allowTouchMove={false}
            freeMode={{ enabled: true, momentum: false }}
            className="w-full h-full infinite_swiper" // Adjust height based on your logo size (4 rows × ~150px + spacing)
          >
            {logos.map((logo, index) => (
              <SwiperSlide key={`${logo.id}-${index}`}>
                <div className="flex items-center justify-center h-[150px] bg-white hover:grayscale transition-all duration-300 rounded-lg shadow-sm">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={180}
                    height={100}
                    className="max-w-full max-h-full object-contain p-4"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      
    </section>
  );
};

export default Clients;