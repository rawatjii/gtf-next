"use client";
import React, { useEffect, useRef, useState } from "react";
import ClipPathAnimation from "./ClipPathAnimation";
import CommonHeading1 from "./CommonHeading1";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HorizontalScroll = ({ data, className }) => {
  const scrollRef = useRef(null);
  const mainDivRef = useRef(null);
  const iconRef = useRef(null);

  const getX = () => {
    return -(scrollRef.current.scrollWidth - mainDivRef.current.offsetWidth);
  };

  useEffect(() => {
    const scrollCtx = gsap.context(() => {
      gsap.to(scrollRef.current, {
        x: () => getX(),
        ease: "none",
        scrollTrigger: {
          trigger: scrollRef.current,
          start: "center center",
          end: `+=800`,
          pin: true,
          scrub: 1,
        },
      });
    }, scrollRef);

    return () => scrollCtx.revert();
  }, []);

  useEffect(() => {
    const body = document.body;
    const icons = mainDivRef.current.querySelectorAll(".service-icon");

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: mainDivRef.current,
        start: "top 100%",
        end: "bottom 90%",
        onEnter: () => {
          gsap.to(body, {
            backgroundColor: "black",
            color: "white",
            duration: 0.6,
            ease: "power2.inOut",
          });
          gsap.to(icons, {
            filter: "invert(1)",
            duration: 0.3,
            overwrite: "auto",
          });
        },
        onLeave: () => {
          gsap.to(body, {
            backgroundColor: "white", // Reset body background to white
            color: "black", // Reset text color to black
            duration: 1, // Set duration for the color reset
          });

          gsap.to(icons, {
            filter: "invert(0)",
            duration: 0.3,
            overwrite: "auto",
          });
        },
        onEnterBack: () => {
          gsap.to(body, {
            backgroundColor: "black",
            color: "white",
            duration: 1,
          });
          gsap.to(icons, {
            filter: "invert(1)",
            duration: 0.3,
            overwrite: "auto",
          });
        },
        onLeaveBack: () => {
          gsap.to(body, {
            backgroundColor: "white",
            color: "black",
            duration: 1,
          });
          gsap.to(icons, {
            filter: "invert(0)",
            duration: 0.3,
            overwrite: "auto",
          });
        },
      });
    }, mainDivRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div ref={mainDivRef} className={className}>
      <div ref={scrollRef} className="horizontalScrollData inline-flex">
        {data?.map((item, idx) => (
          <div key={idx} className="relative w-[500px] py-[40px] px-[70px]">
            {idx < data.length - 1 && (
              <span
                class="absolute top-0 right-0 h-full w-px 
                  bg-[linear-gradient(180deg,hsla(0,0%,85%,0),#d9d9d9_50%,hsla(0,0%,85%,0))]"
              />
            )}

            <Image
              className="service-icon"
              src={item.icon}
              width={50}
              height={50}
            />
            <h4 className="uppercase font-medium tracking-[0.5px] text-[20px] mt-[20px]">
              {item.title}
            </h4>
            <p className="mt-[15px] text-[15px] text-[#3d3d3d]">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalScroll;
