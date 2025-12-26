"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import Header from "../Home/Header";
import { Grid } from "@/app/utils/Grid";

const Rewardsbanner = () => {
  const sectionRefBanner = useRef(null);
  const marqueeRef = useRef(null);

  useEffect(() => {
    let tween = gsap
      .to(".marquee__part", {
        xPercent: -100,
        repeat: -1,
        duration: 10,
        ease: "linear",
      })
      .totalProgress(0.5);

    gsap.set(".marquee__inner", { xPercent: -50 });
  });
  return (
    <div ref={sectionRefBanner}>
      {/* <Header /> */}
      <section className="relative w-[100%] border-y-[1px] border-[#000] border-dashed overflow-hidden">
        <Grid />
        <div className="relative !overflow-hidden pt-[40px] pb-[60px]">
          <h1
            ref={marqueeRef}
            className="uppercase flex font-[oswald] text-[180px] whitespace-nowrap inline-block"
          >
            <span className="marquee__part ml-[20px]">
              rewards & recognition.
            </span>
            <span className="marquee__part ml-[20px]">
              rewards & recognition.
            </span>
            <span className="marquee__part ml-[20px]">
              rewards & recognition.
            </span>
            <span className="marquee__part ml-[20px]">
              rewards & recognition.
            </span>
            <span className="marquee__part ml-[20px]">
              rewards & recognition.
            </span>
            <span className="marquee__part ml-[20px]">
              rewards & recognition.
            </span>
          </h1>
        </div>
      </section>
    </div>
  );
};

export default Rewardsbanner;
