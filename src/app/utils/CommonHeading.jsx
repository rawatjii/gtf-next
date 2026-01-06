import React, { useEffect, useRef } from "react";
import Line from "../components/Line";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CommonHeading({
  outlineHeading,
  filledHeading,
  lineColor,
  pl,
  className,
  outlineClass,
  solidClass
}) {

  const headingRef = useRef(null);

  // useEffect(()=>{
  //   gsap.set(headingRef.current, {
  //     clipPath:"inset(100% 0 0 0)"
  //   })

  //   ScrollTrigger.create({
  //     trigger:headingRef.current,
  //     start:"top 85%",
  //     onEnter:()=>{
  //       gsap.to(headingRef.current, {
  //         clipPath: "inset(0% 0 0 0)",
  //         duration: 1,
  //         ease: "power3.out",
  //       })
  //     },
  //     onLeave: () => {
  //       // Optional: Add an animation to hide the heading when leaving the viewport
  //       gsap.to(headingRef.current, {
  //         clipPath: "inset(100% 0 0 0)", // Hide the heading again
  //         duration: 1,
  //         ease: "power3.out",
  //       });
  //     },
  //   })
  // }, []);

  return (
    <h3
      ref={headingRef}
      className={`uppercase pb-[60px] inline-block md:text-start text-center  relative md:leading-[70px] md:px-0 px-[15px] ${className}`}
    >
      <span className={`bartino-outline tracking-[4px] 2xl:text-[72px] md:text-start  lg:text-[60px] md:text-[50px] text-[32px] block ${outlineClass}`}>
        {outlineHeading}
      </span>
      <span
        className={`neue_font relative block font-medium md:text-start lg:text-[66px] md:text-[50px] text-[32px] ${
          pl ? `md:pl-[7rem]` : "md:pl-[14rem]"
        } ${solidClass}`}
      >
        {filledHeading}
        <Line bgColor={lineColor} left="left-[48%] xl:left-[61%]" />
      </span>
    </h3>
  );
}
