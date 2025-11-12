"use client";
import { useEffect } from "react";
import { Grid } from "@/app/utils/Grid";
import CommonHeading from "@/app/utils/CommonHeading";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WorkMidSec = () => {
  useEffect(() => {
    gsap.from(".heading-container", {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".heading-container",
        start: "top 80%", 
        toggleActions: "play none none none", 
      },
    });

    gsap.from(".text-container", {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power2.out",
      delay: 0.3,
      scrollTrigger: {
        trigger: ".text-container",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  }, []);

  return (
    <section className="relative w-[100%] border-y-[1px] border-[#000] border-dashed overflow-hidden">
      <Grid />
      <div className="grid grid-cols-12 px-[6px]">
        <div className="col-span-6">
          <div className="heading-container relative overflow-hidden pt-[80px] pb-[20px]">
            <CommonHeading
              outlineHeading={"Website &"}
              filledHeading={"Landing Pages."}
              lineColor={"bg-gtf-pink"}
              pl={"7.1"}
            />
          </div>
        </div>
        <div className="text-container col-span-6 my-[auto] mr-[auto]">
          <em className="font-[500] uppercase">
            We are in partnership with top <span className="lg:block"></span> brands and certified for
            performance
          </em>
        </div>
      </div>
    </section>
  );
};

export default WorkMidSec;