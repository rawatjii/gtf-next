"use client";
import { useRef, useState, useEffect } from "react";
import Line from "../Line";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Grid } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/grid";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LogoItem from "@/app/utils/LogoItem";

gsap.registerPlugin(ScrollTrigger);

const isMobile = "(max-width: 767px)";
const isTablet = "(min-width: 768px) and (max-width: 1023px)";
const isLaptop = "(min-width: 1201px) and (max-width: 1500px)";
const isDesktop = "(min-width: 1501px)";

const Clients = () => {
  const sectionRef = useRef(null);
  const titleWrapperRef = useRef(null); // wrapper to control position
  const titleRef = useRef(null);
  const sliderRef = useRef(null);
  const [gridRows, setGridRows] = useState(4);

  // Your original 10 logos (you can add more if you want)
  const baseLogos = [
    { id: 1, src: "/assets/home/clients/emaar.png", alt: "Emaar" },
    { id: 2, src: "/assets/home/clients/tarc.png", alt: "Tarc" },
    { id: 3, src: "/assets/home/clients/ambience.png", alt: "Ambience" },
    { id: 4, src: "/assets/home/clients/eldeco.png", alt: "Eldeco" },
    { id: 5, src: "/assets/home/clients/omaxe.png", alt: "Omaxe" },
    {
      id: 6,
      src: "/assets/home/clients/jindal-realty.png",
      alt: "Jindal Realty",
    },
    { id: 7, src: "/assets/home/clients/raheja.png", alt: "Raheja" },
    { id: 8, src: "/assets/home/clients/ashwin-seth.png", alt: "Ashwin Sheth" },
    { id: 9, src: "/assets/home/clients/group108.png", alt: "Group 108" },
    { id: 10, src: "/assets/home/clients/ska-orion.png", alt: "Ska Orion" },
    {
      id: 11,
      src: "/assets/home/clients/parx-laureate.png",
      alt: "Parx Laureate",
    },
    { id: 12, src: "/assets/home/clients/pyramid.png", alt: "Pyramid" },
    { id: 13, src: "/assets/home/clients/aipl.png", alt: "AIPL" },
    { id: 14, src: "/assets/home/clients/dn-homes.png", alt: "DN Homes" },
    { id: 15, src: "/assets/home/clients/chordia.png", alt: "Chordia" },
    {
      id: 16,
      src: "/assets/home/clients/central-park.png",
      alt: "Central Park",
    },
    {
      id: 17,
      src: "/assets/home/clients/trump-towers.png",
      alt: "Trump Towers",
    },
    { id: 18, src: "/assets/home/clients/anant-raj.png", alt: "Anant Raj" },
    {
      id: 19,
      src: "/assets/home/clients/ats-homekraft.png",
      alt: "ATS Homekraft",
    },
    { id: 20, src: "/assets/home/clients/tdi.png", alt: "TDI" },
    { id: 22, src: "/assets/home/clients/rubberwala.png", alt: "Rubberwala" },
    {
      id: 22,
      src: "/assets/home/clients/prateek-group.png",
      alt: "prateek-group",
    },
  ];

  // Duplicate enough times to fill the grid + seamless loop
  const logos = [...baseLogos, ...baseLogos, ...baseLogos, ...baseLogos]; // 40 items → safe for infinite scroll

  const updateGridRows = () => {
    if (window.matchMedia(isMobile).matches) {
      setGridRows(2);
    } else if (window.matchMedia(isLaptop).matches) {
      setGridRows(3);
    } else if (window.matchMedia(isDesktop).matches) {
      setGridRows(4);
    } else {
      setGridRows(4);
    }
  };

  // Update grid rows when the screen size changes
  useEffect(() => {
    updateGridRows();
    window.addEventListener("resize", updateGridRows);

    return () => {
      window.removeEventListener("resize", updateGridRows);
    };
  }, []);

  useEffect(() => {
    const titleWrapper = titleWrapperRef.current;
    const title = titleRef.current;
    const slider = sliderRef.current;
    const section = sectionRef.current;

    if (!section || !title || !slider) return;

    // Start from center (no transform)
    gsap.set(title, {
      yPercent: -50,
      top: "50%",
    });

    // Use gsap.matchMedia() for responsive animations
    let mm = gsap.matchMedia();

    mm.add(
      {
        isMobile: "(max-width:767px)",
        isTablet: "(min-width:768px) and (max-width:1023px)",
        isLaptop: "(min-width:1201px) and (max-width:1500px)",
        isDesktop: "(min-width:1501px)",
      },
      (context) => {
        let { isMobile, isTablet, isLaptop, isDesktop } = context.conditions;

        const config = {
          fontSize: isMobile
            ? "42px" // or whatever you want on mobile after animation
            : isTablet
            ? "60px"
            : isLaptop
            ? "70px"
            : isDesktop
            ? "70px" // xl/2xl can go even larger if needed
            : "0",

          lineHeight: isMobile
            ? "48px"
            : isLaptop
            ? "110px"
            : isDesktop
            ? "120px"
            : "100px",

          gridRows: isMobile ? "2" : isLaptop ? "3" : isDesktop ? "4" : "4",
        };

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=1200",
            pin: true, // ← Pin the WRAPPER, not the title directly (more reliable)
            scrub: 1,
            anticipatePin: 1,
            markers: false,
            // anticipatePin: 1,     // Optional: smoother pinning on iOS
          },
        });

        tl.to(title, {
          yPercent: 0,
          fontSize: config.fontSize,
          lineHeight: config.lineHeight,
          top: 0, // Moves from -50 → 0 (perfectly smooth)
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=300",
            scrub: 1,
          },
        });

        // Cleanup on revert (when resizing)
        return () => {
          tl.kill();
        };
      }
    );

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className=" bg-[#f5f5f5] relative h-screen md:mb-[0] mb-[30px] flex items-center"
    >
      <div
        ref={titleWrapperRef}
        className="absolute md:px-[35px] px-[15px] z-[9] md:flex justify-center md:text-start w-full h-full"
      >
        <h3
          ref={titleRef}
          className="neue_font font-bold uppercase relative md:leading-[136px] text-center md:text-start max-h-fit leading-[normal] md:mb-[0] mb-[15px] tracking-[2px] 2xl:text-[100px] xl:text-[70px] md:text-[50px] text-[32px] text-[#e3b320]"
          style={{
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <span className="block">Our Clients</span>
          {/* <span className="md:pl-[7.5rem] block mt-[10px]">
            UNSTOPPABLE IMPACT.
              <Line
                bgColor="bg-gtf-blue"
                left="left-[33%] lg:left-[61%]"
                top="bottom-[2%]"
              />
            </span> */}
        </h3>

        {/* <p className="uppercase italic pt-[16px] md:ml-[3rem] text-center lg:text-left font-[500] montserrat">
            <span className="block">They choose to work with us.</span>
            <span className="block">We chased the WOWasaS with them.</span>
          </p> */}
      </div>

      {/* 4×6 Grid Infinite Slider */}
      <div
        ref={sliderRef}
        className="overflow-hidden relative w-full"
      >
        <div className="animate-marquee flex">
          {/* Generate 2 full sets for seamless loop */}
          {[...Array(6)].map((_, setIndex) => (
            <div key={setIndex} className="flex shrink-0">
              {/* Generate 6 columns dynamically */}
              {[...Array(6)].map((_, colIndex) => (
                <div
                  key={colIndex}
                  className={`grid grid-rows-${gridRows} ${
                    gridRows === 3 ? "gap-4 mx-2" : "gap-8 mx-4"
                  } `} // mx-4 = horizontal spacing between columns
                >
                  {/* Each column gets 4 logos, vertically */}
                  {[...Array(gridRows)].map((_, rowIndex) => {
                    const logoIndex =
                      setIndex * (6 * gridRows) +
                      colIndex * gridRows +
                      rowIndex;
                    const logo = logos[logoIndex % logos.length]; // Safe wrap-around

                    return (
                      <div
                        key={`${setIndex}-${colIndex}-${rowIndex}`}
                        className="flex items-center justify-center h-[150px] bg-[#fff] hover:grayscale transition-all duration-300 rounded-lg border border-[#eaeaea]"
                      >
                        <Image
                          src={logo.src}
                          alt={logo.alt}
                          width={180}
                          height={100}
                          className="max-w-full max-h-full object-contain p-4"
                        />
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;
