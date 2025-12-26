"use client";
import { useRef, useEffect } from "react";
import Header from "../Home/Header";
import { Grid } from "@/app/utils/Grid";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SmBox from "@/app/utils/SmBox";

gsap.registerPlugin(ScrollTrigger);

const CareerBanner = () => {
  const sectionRefBanner = useRef(null);
  const marqueeRef = useRef(null);
  const logoBoxRef = useRef(null);
  const descriptionRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      logoBoxRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRefBanner.current,
          start: "top 80%",
          end: "top 50%",
          scrub: false,
          toggleActions: "play none none none",
        },
      }
    );
       gsap.fromTo(
      descriptionRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRefBanner.current,
          start: "top 80%",
          end: "top 50%",
          scrub: false,
          toggleActions: "play none none none",
        },
      }
    );

    gsap.fromTo(
      marqueeRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.2,
        scrollTrigger: {
          trigger: sectionRefBanner.current,
          start: "top 80%",
          end: "top 50%",
          scrub: false,
          toggleActions: "play none none none",
        },
      }
    );

   
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={sectionRefBanner}>
      {/* <Header /> */}
      <section className="relative w-[100%] border-y-[1px] border-[#000] border-dashed overflow-hidden">
        <div className="grid grid-cols-12 pt-[40px] pb-[60px]">
          <Grid />
          <div className="col-span-4 m-[auto]">
              <SmBox heading={<p>Total <span className="lg:block none"></span> Job Opening</p>} number={10} logoBoxRef={logoBoxRef}/>
          </div>
          <div className="col-span-4">
            <div className="relative overflow-hidden">
              <h1 ref={marqueeRef} className="uppercase flex font-[oswald] text-[170px]">
                Career
              </h1>
            </div>
          </div>
          <div className="col-span-4 m-[auto]">
            <p
              className="font-[oswald] text-[20px] uppercase font-[500]"
              ref={descriptionRef}
            >Your career is your business,<span className="lg:block"></span> manage it as a boss.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CareerBanner;