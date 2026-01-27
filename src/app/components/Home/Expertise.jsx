"use client";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { MdArrowOutward } from "react-icons/md";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../../globals.css";
import Line from "../Line";

gsap.registerPlugin(ScrollTrigger);

const Expertise = () => {
  const circleRef = useRef(null);
  const lineRef = useRef(null);
  const coloredLineRef = useRef(null);
  const counterRef = useRef(null);
  const hasAnimated = useRef(false);
  const counterSecRef = useRef(null);
  const [counts, setCounts] = useState({
    projects: 0,
    googleQueries: 0,
    facebookQueries: 0,
  });

  useEffect(()=>{
    const obj = { projects: 0, googleQueries: 0, facebookQueries: 0 };

    const ctx = gsap.context(()=>{
      gsap.to(obj, {
        projects: 1500,
        googleQueries: 50,
        facebookQueries: 1000,
        ease:"power2.out",
        duration:2.8,
        onUpdate:()=>{
          setCounts({
            projects:Math.floor(obj.projects),
            googleQueries: Math.floor(obj.googleQueries),
          facebookQueries: Math.floor(obj.facebookQueries),
          })
        },
        scrollTrigger:{
          trigger:counterSecRef.current,
          start:"top 50%",
        }
      })
    }, counterSecRef);

    const lineContext = gsap.context(()=>{
      gsap.to(lineRef.current, {
        width:"100%",
        duration: 1.6,
        ease: "power3.out",
        delay: 0.3,
        scrollTrigger:{
          trigger:counterSecRef.current,
          start:"top 50%",
        }
      })
    });

    const circleContext = gsap.context(()=>{
      gsap.fromTo(circleRef.current, 
        {
          scale:0,
          opacity:0,
        },
        {
        scale: 1,
        opacity: 1,
        duration: 1.4,
        ease: "power4.out",
        scrollTrigger:{
          trigger:counterSecRef.current,
          start:"top 50%",
        }
      })
    });

    return()=>{
      ctx.revert()
      lineContext.revert();
      circleContext.revert();
    };

  }, [])

  return (
    <div ref={counterSecRef} className="flex flex-row items-center relative w-[100vw] overflow-hidden py-[150px]">
      <div className="basis-[100%]">
        <div className="flex justify-between flex-wrap">
          <h2 className="neue_font font-medium relative capitalize 2xl:leading-[80px] px-[100px]  xl:leading-[70px]  leading-[35px] md:basis-[50%] max-h-fit text-[30px] xl:text-[40px] md:text-[50px] 2xl:text-[64px] z-[1] tracking-0 mb-[80px]">
            <span className="block">We create</span>
            <span className="block relative pl-[100px] w-[max-content] before:absolute before:h-[3px] before:w-[80px] before:bg-[#000] before:block before:left-[0] before:top-[50%] before:translate-y-[-1/2]">
              what others only imagine.
            </span>
            <Line
              ref={coloredLineRef}
              left={"xl:left-[25%] left-[50%] 2xl:left-[37%]"}
              bgColor="bg-gtf-pink"
            />
          </h2>
          {/* <div className="md:basis-[35%] border-b-[1px] border-b-solid border-b-[#666666] md:pb-[50px] pb-[35px] montserrat">
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
                  </div> */}
        </div>
        <div className="flex justify-between flex-wrap relative md:pt-[0] pt-[30px] px-[100px]">
          <div className="md:basis-[60%] basis-[100%] relative">
            {/* 1 */}
            {/* <img
                        src="/assets/home/netblob.png"
                        alt="Years of Expertise"
                        className="absolute md:h-[auto] h-[100%] w-[100%] md:translate-y-[-50%] translate-x-[-50%] md:block hidden left-[0%] z-index: [1px]"
                      /> */}
            <div
              ref={lineRef}
              className="relative w-0 top-[50%] left-[29%] z-[1]"
            >
              {/* top */}
              <div className="origin-left md:block hidden  rotate-[-14deg] h-[1px] w-[75%] border-dashed border-b-[1px] border-black  absolute bottom-0 "></div>
              <div className="origin-left md:block hidden rotate-[-12deg] h-[1px] w-[75%] border-dashed border-b-[1px] border-black  absolute bottom-[0px]"></div>

              {/* middle */}
              <div className="h-[1px] md:block hidden w-[73%] border-dashed border-b-[1px] border-black origin-left rotate-[0deg] absolute  "></div>
              <div className="h-[1px] md:block hidden w-[73%] border-dashed border-b-[1px] border-black  absolute origin-left rotate-[-3deg] "></div>

              {/* third */}
              <div className="h-[1px] md:block hidden w-[75%] origin-left rotate-[10deg] border-dashed border-b-[1px] border-black  absolute  "></div>
              <div className="h-[1px] md:block hidden w-[75%] origin-left rotate-[12deg] border-dashed border-b-[1px] border-black  absolute  "></div>
            </div>
            <div
              ref={circleRef}
              className="md:h-[250px] md:w-[250px] h-[120px] w-[120px] md:left-[8%]  md:top-[50%] bg-[#FDE93D] translate-y-[-50%] md:relative absolute rounded-full"
            ></div>

            <p className="md:absolute bottom-[50px] left-[0]  md:text-start  px-[50px] z-[9]">
              <span className="neue_font text-[35px] 2xl:text-[75px] lg:text-[65px] font-medium me-0 me-[10px] md:">
                17 +
              </span>
              <br />
              <span className="neue_font md:leading-[60px] 2xl:text-[50px] text-[35px] lg:text-[50px] tracking-[2px] font-medium">
                Years Of <br className="md:block hidden" /> Expertise
              </span>
            </p>
          </div>
          <div className="md:basis-[40%] pl-[60px] flex flex-wrap gap-[100px]">
            <p className="flex items-center md:justify-start justify-center">
              <span
                ref={counterRef}
                className="just_font text-[30px] md:text-start 2xl:text-[50px] lg:text-[36px] font-semibold text-[#e34090] w-[200px] leading-[30px]"
              >
                {counts.projects}+
              </span>
              <span className="text-[22px] font-[400] tracking-wide just_font">
                Projects Done
              </span>
            </p>
            <p className="flex items-center md:justify-start justify-center">
              <span className="just_font text-[30px] md:text-start 2xl:text-[50px] lg:text-[36px] font-semibold text-[#e3b320] w-[200px]">
                {counts.googleQueries}k+
              </span>
              <span className="text-[22px] font-[400] tracking-wide just_font">
                Queries generated from Google per month
              </span>
            </p>
            <p className="flex items-center md:justify-start justify-center">
              <span className="just_font text-[30px] md:text-start 2xl:text-[50px] lg:text-[36px] font-semibold text-[#2999cd] w-[200px]">
                {counts.facebookQueries}k+
              </span>
              <span className="text-[22px] font-[400] tracking-wide just_font flex-1">
                Queries generated from Facebook & Instagram per month
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Expertise;
