"use client";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { MdArrowOutward } from "react-icons/md";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../../globals.css";
import Line from "../Line";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Expertise = () => {
  const circleRef = useRef(null);
  const lineRef = useRef(null);
  const coloredLineRef = useRef(null);
  const counterRef = useRef(null);
  const hasAnimated = useRef(false);
  const sectionRef = useRef(null);
  const [counts, setCounts] = useState({
    projects: 0,
    googleQueries: 0,
    facebookQueries: 0,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;

          const targets = {
            projects: { value: 0 },
            googleQueries: { value: 0 },
            facebookQueries: { value: 0 },
          };

          const duration = 2;

          gsap.to(targets.projects, {
            value: 1500,
            duration,
            ease: "power2.out",
            onUpdate: () =>
              setCounts((prev) => ({
                ...prev,
                projects: Math.floor(targets.projects.value),
              })),
          });

          gsap.to(targets.googleQueries, {
            value: 50,
            duration,

            ease: "power2.out",
            onUpdate: () =>
              setCounts((prev) => ({
                ...prev,
                googleQueries: Math.floor(targets.googleQueries.value),
              })),
          });

          gsap.to(targets.facebookQueries, {
            value: 1000,
            duration,
            ease: "power2.out",
            onUpdate: () =>
              setCounts((prev) => ({
                ...prev,
                facebookQueries: Math.floor(targets.facebookQueries.value),
              })),
          });

          gsap.to(counterRef.current, { opacity: 1, duration: 0.5 });

          observer.unobserve(counterRef.current);
        }
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
      ScrollTrigger.refresh();
    };
  }, []);

  useGSAP(
    () => {
      const circle = circleRef.current;
      const line = lineRef.current;
      if (!circle || !line) return;

      const circleAnimation = gsap.fromTo(
        circle,
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "ease.in",
          scrollTrigger: {
            trigger: circle,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none none",
            once: true,
          },
          onComplete: () => {
            gsap.fromTo(
              line,
              { width: "0%" },
              {
                width: "100%",
                duration: 0.6,
                ease: "ease.in",
              }
            );
          },
        }
      );

      return () => {
        if (circleAnimation.scrollTrigger) {
          circleAnimation.scrollTrigger.kill();
          ScrollTrigger.refresh();
        }
        circleAnimation.kill();
        ScrollTrigger.refresh();
      };
    },
    { dependencies: [] }
  );

  // useEffect(()=>{
  //   if(!sectionRef.current) return;

  //   const scrollTrigger = ScrollTrigger.create({
  //     trigger:sectionRef.current,
  //     start:"top bottom",
  //     end:"bottom top",
  //     onEnter:()=>{
  //       // Change body background color when section enters the 50% viewport mark
  //       document.body.style.backgroundColor = "#ddd";
  //     },
  //     onLeaveBack: () => {
  //       // Reset body background color when scrolling back up
  //       document.body.style.backgroundColor = "";
  //     },
  //   });

  //   return ()=>{
  //     scrollTrigger.kill();
  //   }
  // }, [])
  //
  return (
    <section
      ref={sectionRef}
      className="md:py-[150px] py-[60px] px-[15px] lg:px-[50px] bg-[#f7f7f7]"
      id="experties_sec"
    >
      <div className="flex justify-between flex-wrap">
        <h2 className="meno_font font-bold relative capitalize 2xl:leading-[80px]  xl:leading-[70px]  leading-[35px] md:basis-[50%] max-h-fit text-[30px] xl:text-[40px] md:text-[50px] 2xl:text-[64px] ">
          <span className="block">We create</span>
          <span className="block relative">what others only imagine.</span>
          <Line
            ref={coloredLineRef}
            left={"xl:left-[25%] left-[50%] 2xl:left-[37%]"}
            bgColor="bg-gtf-pink"
          />
        </h2>
        <div className="md:basis-[35%] border-b-[1px] border-b-solid border-b-[#666666] md:pb-[50px] pb-[35px] montserrat">
          <p className="text-[16px] font-[400] md:mt-0 mt-[20px] tracking-[0.5px]">
            GTF Technologies, born from Gurukul The Foundation and built in
            India, brings 17 years + of absolute mastery in branding and digital
            media.
          </p>
          <div className="flex mt-[50px] items-center">
            <p className=" mr-[10px] uppercase bebas tracking-[0.5px]">
              meet now
            </p>
            <MdArrowOutward className="bg-[#ddd]" />
          </div>
        </div>
      </div>
      <div className="flex justify-between flex-wrap relative md:pt-[0] pt-[30px]">
        <div className="md:basis-[60%] basis-[100%] relative">
          {/* 1 */}
          <div ref={lineRef} className="relative w-0 top-[46%] left-[29%]">
            {/* top */}
            <div className="origin-left md:block hidden  rotate-[-15.5deg] h-[1px] w-[75%] border-dashed border-b-[1px] border-black  absolute bottom-0 "></div>
            <div className="origin-left md:block hidden rotate-[-12deg] h-[1px] w-[73%] border-dashed border-b-[1px] border-black  absolute bottom-[0px]"></div>

            {/* middle */}
            <div className="h-[1px] md:block hidden w-[70%] border-dashed border-b-[1px] border-black origin-left rotate-[1.4deg] absolute  "></div>
            <div className="h-[1px] md:block hidden w-[70%] border-dashed border-b-[1px] border-black  absolute origin-left rotate-[-2deg] "></div>

            {/* third */}
            <div className="h-[1px] md:block hidden w-[73%] origin-left rotate-[12deg] border-dashed border-b-[1px] border-black  absolute  "></div>
            <div className="h-[1px] md:block hidden w-[75%] origin-left rotate-[16deg] border-dashed border-b-[1px] border-black  absolute  "></div>
          </div>
          <div
            ref={circleRef}
            className="md:h-[250px] md:w-[250px] h-[120px] w-[120px] md:left-[8%]  md:top-[21%] bg-[#FDE93D] mix-blend-multiply md:relative absolute rounded-full"
          ></div>
          <img
            src="/assets/home/netblob.png"
            alt="Years of Expertise"
            className="absolute md:w-[70%] md:h-[auto] h-[250px] w-[100%] opacity-[.9] md:translate-y-[-50%] md:top-[55%] md:left-[-10%] left-[70%]  md:block hidden left-[0%] md:translate-x-0  top-[-52px] "
          />
          <p className="md:absolute bottom-[50px] left-[0]  md:text-start ">
            <span className="bebas text-[35px] 2xl:text-[75px] lg:text-[65px] font-medium me-0 me-[10px] md:">
              17 +
            </span>
            <br />
            <span className="bebas md:leading-[76px] 2xl:text-[70px] text-[35px] lg:text-[60px] tracking-[2px] uppercase">
              Years Of <br className="md:block hidden" /> Expertise
            </span>
          </p>
        </div>
        <div className="md:basis-[35%] md:pt-[38px] pt-[30px]">
          <p className="uppercase flex flex-col md:justify-start justify-center mb-[30px] md:mb-[65px]">
            <span
              ref={counterRef}
              className="bebas text-[30px] md:text-start 2xl:text-[40px] lg:text-[36px] "
            >
              {counts.projects} +
            </span>
            <span className="text-[14px] font-[400] tracking-wide montserrat font-medium">
              PROJECTS DONE
            </span>
          </p>
          <p className="uppercase flex flex-col md:justify-start justify-center mb-[30px] md:mb-[65px]">
            <span className="bebas text-[30px] md:text-start 2xl:text-[40px] lg:text-[36px] ">
              {counts.googleQueries} k +
            </span>
            <span className="text-[14px] font-[400] tracking-wide montserrat font-medium">
              Queries generated from Google per month
            </span>
          </p>
          <p className="uppercase flex flex-col md:justify-start justify-center mb-[30px] md:mb-[65px]">
            <span className="bebas text-[30px] md:text-start 2xl:text-[40px] lg:text-[36px] ">
              {counts.facebookQueries} k +
            </span>
            <span className="text-[14px] font-[400] tracking-wide montserrat font-medium">
              Queries generated from Facebook & Instagram per month
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};
export default Expertise;
