"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "../Home/Header";
import Line from "../Line";

gsap.registerPlugin(ScrollTrigger);

const BrandBannerSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const videoContainerRef = useRef(null);
  const videoRef = useRef(null);
  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const video = videoRef.current;
    const videoContainer = videoContainerRef.current;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        end: "+=80%",
				scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
      defaults: { ease: "sine", duration: 1 },
    });

    
    tl.fromTo(
      title,
      {
        x: "-16%",
        y:"0"
      },
      {
        x: "-100%",
        y:"-30%"
      },
      0
    )
      .fromTo(
        video,
        { height: "350px", width: "100%" },
        { width: "100vw" },
        0
      ) 
      .fromTo(videoContainer, { width: "42vw" }, { width: "calc(100vw - 82px)" }, 0)
      .fromTo(document.querySelector(".logo_parent"),{width:"0%",display:"none"},{width:"100%",display:"block"},"<")
      .fromTo(document.querySelector(".content_sec"),{width:"100%"},{width:"90%"},"<")
      .fromTo(document.querySelector(".logo_box"),{bottom:"-300%",right:"0"},{top:"14px",bottom:"inherit",right:'84px'},"<")
      .fromTo(document.querySelector(".bottom_right_arrow"), { width: "80px",opacity:1 }, { width: "0",opacity:0 }, 0);
    const trigger = tl.scrollTrigger;

    return () => {
      if (trigger) trigger.kill();
    };
  }, []);

  return (
    <div ref={sectionRef}>
      <Header />
      <section className="relative  w-[100%] h-[calc(100vh-100px)]  border-b-[1px] border-[#000] border-dashed  overflow-hidden">
        <div className="border-t border-black border-dashed relative w-full h-full">
          <div  className="w-full h-full">
            <div ref={titleRef}  className="flex translate-x-[-16%]  flex-col place-items-end justify-between absolute text-end w-[60vw] left-[0] inset-0">
            <h3>
              <span className="font-[Oswald] inline-block h-fit relative text-[150px] tracking-[4px] leading-[180px]  uppercase ">
           Brand  <span>Strategy  <Line bgColor={"bg-gtf-pink" } bottom={"bottom-[18px]"} callVia={true}  left="left-[48%] xl:left-[57%]"/></span> 
              </span>
            </h3>
           </div>
            <div
              ref={videoContainerRef}
              className="absolute top-0 w-[42vw] right-0 h-full border-l p-[60px] border-black border-dashed border-b-none overflow-hidden z-0"
            >
              <div className="!pb-[50px] w-full">
                <video
                  src="/assets/aboutus/about.mp4"
                  ref={videoRef}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full object-cover "
                ></video>
              </div>
              <div className="flex ml-[auto] ">
              <div className="relative inline-block logo_parent">
                  <div className="logo_box mb-[auto] absolute  right-[0] bottom-[-100%]  border-[1px] inline-block px-[20px] py-[8px] border-[#000]">
              <figure className="flex justify-center place-items-center">
                <img src="/assets/aboutus/gtf_logo.png" height={"16"} className="me-4 w-[50px] basis-[8px]" alt=""/> 
                <h4 className="font-[Oswald] leading-[22px] text-start text-[#1E251F] flex-[1] uppercase   basis-[100px] text-[12px] leading-[18px]">Our <span className="lg:block none"></span> All Service</h4>
                <strong className="text-[#1E251F] font-[Oswald] text-[22px]  ms-[20px]">13</strong>
              </figure>
            </div>
            </div>
              <div className=" pt-[0] content_sec ml-[auto]">
                <h2 className="font-[Oswald] text-[38px] mb-[20px]">
                "Purpose. Position. Promise. Personality."
                </h2>
                <p className="text-justify text-[15px] leading-[25px] text-[#5B5B5B] font-[350]">
                 We use our insight, experience, and rich industry knowledge to formulate and drive a distinct and differentiating positioning for your brand.
                  We use our insight, experience, and rich industry knowledge to formulate and drive a distinct and differentiating positioning for your brand.
                </p>
              </div>    
            </div>
            </div>
          </div>
        </div>
          <div className="mr-[auto] bottom_right_arrow absolute bottom-[0] left-[0]">
               <img src="/assets/aboutus/arrow_down.svg" className="mt-[auto]" height={"16"} alt=""/> 
            </div>
      </section>
    </div>
  );
};

export default BrandBannerSection;
