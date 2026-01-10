"use client";
import React, { useEffect, useRef } from "react";
import ClipPathAnimation from "@/app/utils/ClipPathAnimation";
import CommonHeading1 from "@/app/utils/CommonHeading1";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger);



const HowWeWorkOverview = ({headingData, overviewData}) => {
  const overviewDataRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const dataHeight = overviewDataRef.current.offsetHeight;
    let calculatedHeight;

    if (dataHeight) {
      calculatedHeight = (window.innerHeight - dataHeight) / 2;
      console.log("calculatedHeight", calculatedHeight);
      if (calculatedHeight > 100) {
        const ctx = gsap.context(() => {
          gsap.fromTo(
            overviewDataRef.current,
            {
              y: -calculatedHeight + 100,
            },
            {
              y: 0,
              duration: 1,
              ease: "power4.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 50%",
                end: "top 0",
                scrub: 1,
                duration: 1,
                toggleActions: "play none none reverse",
              },
            }
          );
        }, sectionRef);

        return () => ctx.revert();
      }
    }
  }, []);

  useEffect(() => {
    const tlCtx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=1000`,
          pin: true,
          scrub: 1,
          pinSpacing: true,
        },
      });

      // Split the text into individual letters and animate their opacity
      const split = new SplitText(".animated-text", {type:"chars"});
      gsap.set(split.chars, {opacity:0.3});

      tl.to(split.chars, {
        opacity:1,
        duration:0.5,
        stagger:0.05,
        ease: "power2.out",
      })

    }, sectionRef);

    return () => tlCtx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="">
      <div className="container mx-auto">
        <div
          
          className="flex items-center justify-center h-screen"
        >
          <div ref={overviewDataRef}>
            <ClipPathAnimation reverse="false">
              <CommonHeading1 data={headingData} />
            </ClipPathAnimation>

            <div className="mt-[50px] max-w-[1200px] mx-auto text-center">
              <p className="text-[50px] font-medium leading-[64px] animated-text">
                {overviewData}
                
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeWorkOverview;
