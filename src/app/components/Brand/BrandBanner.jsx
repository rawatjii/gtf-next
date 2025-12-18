"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText"; 
import Header from "../Home/Header";
import Line from "../Line";

gsap.registerPlugin(ScrollTrigger, SplitText);

const BrandBannerSection = () => {
  const sectionRefBanner = useRef(null);
  const titleRef = useRef(null);
  const videoContainerRef = useRef(null);
  const videoRef = useRef(null);
  const headingRef = useRef(null);
  const borderRefs = useRef([]);  

 useEffect(() => {
  const sectionBanner = sectionRefBanner.current;
  const title = titleRef.current;
  const video = videoRef.current;
  const videoContainer = videoContainerRef.current;
  const heading = headingRef.current;

  const splitHeading = new SplitText(heading, {
    type: "chars,words",
    charsClass: "char",
    wordsClass: "word"
  });
              
  gsap.set(borderRefs.current, {
    scaleX: 0,
    opacity: 1,
    transformOrigin: "left center"
  });

  const tlBanner = gsap.timeline({
    defaults: { ease: "ease.in" },
  });


  tlBanner.to(splitHeading.chars, {
    y: 200,
    opacity: 0,
    rotationX: -90,
    transformOrigin: "0% 50% -50"
  }).to(
      title,                
      {
        opacity: 1,
        duration: 1,
        ease: "power2.out"
      },
      ""
    )
  
  tlBanner
    .to(splitHeading.chars, {
      duration: 0.8,
      y: 0,
      opacity: 1,
      rotationX: 0,
      stagger: {
        amount: 0.6,
        from: "start"
      }
    })
    .to(
      title,                
      {
        y: "0",
        duration: 1,
        ease: "power2.out"
      },
      "-=0.3"
    )
    .to(borderRefs.current, {
      duration: 0.8,
      scaleX: 1,
      stagger: 0.1,
      ease: "power2.out"
    }, "-=0.5")
    .fromTo(videoContainer.querySelector("video"), {
      opacity: 0,
      y: "50%"
    }, {
      y: "0%",
      opacity: 1
    })
    .fromTo(videoContainer.querySelector("h2"), {
      opacity: 0,
      y: "100%"
    }, {
      y: "0%",
      opacity: 1,
    })
    .fromTo(videoContainer.querySelector("p"), {
      y: "100%",
      opacity: 0,
    }, {
      y: 0,
      opacity: 1,
    })
    .fromTo(document.querySelector(".bottom_right_arrow"), {
      opacity: 0
    }, {
      opacity: 1
    });

  let tlcroll = gsap.timeline({
      scrollTrigger: {
        trigger: sectionBanner,
        scrub: 1,
        pin: true,
        // anticipatePin: 1,
        // markers:true
      },
      defaults: { ease: "ease.in", duration: 1 },
    });

  
  const createScrollTimeline = () => {
    tlcroll.fromTo(
      title,
      { x: "-16%", y: "0%" },
      { x: "-100%", y: "-30%" },
      0
    )
    .fromTo(
      video,
      { height: "350px", width: "100%" },
      { width: "100vw" },
      0
    )
    .fromTo(
      videoContainer,
      { width: "42vw" },
      { width: "calc(100vw - 82px)" },
      0
    )
    .fromTo(
      document.querySelector(".logo_parent"),
      { width: "0%", display: "none" },
      { width: "100%", display: "block" },
      "<"
    )
    .fromTo(
      document.querySelector(".content_sec"),
      { width: "100%" },
      { width: "90%" },
      "<"
    )
    .fromTo(
      document.querySelector(".logo_box"),
      { bottom: "-300%", right: "0" },
      { top: "14px", bottom: "inherit", right: "84px" },
      0.2
    )
    .fromTo(
      document.querySelector(".bottom_right_arrow"),
      { width: "80px", opacity: 1 },
      { width: "0", opacity: 0 },
      0
    );
  };

  tlBanner.eventCallback("onComplete", () => {
    createScrollTimeline();
  });



  // Cleanup
  return () => {
    tlcroll?.scrollTrigger?.kill();
    tlcroll?.kill();
    tlBanner.kill();
    splitHeading.revert();
  };
}, []);

  return (
    <div ref={sectionRefBanner}>
      {/* <Header /> */}
      <section className="relative w-[100%] h-[calc(100vh-100px)] border-b-[1px] border-[#000] border-dashed overflow-hidden">
        <div 
          ref={el => borderRefs.current[0] = el}
          className="border-t border-black border-dashed absolute opacity-[0] top-0 left-0 w-full h-0"
        />
        
        <div className="relative w-full h-full">
          <div className="w-full h-full">
            <div 
              ref={titleRef} 
              className="flex translate-x-[-16%]  opacity-[0] translate-y-[50%] flex-col place-items-end justify-between absolute text-end w-[60vw] left-[0] inset-0"
            >
              <h3 className="mt-[18px]">
                <span ref={headingRef} className="font-[Oswald] inline-block h-fit relative text-[150px] tracking-[4px] leading-[180px] uppercase">
                  Brand  <span className="lg:block">Strategy <Line bgColor={"bg-gtf-pink"} bottom={"bottom-[18px]"} callVia={true} left="left-[48%] xl:left-[57%]"/></span> 
                </span> 
              </h3>
            </div>
            
            <div
              ref={videoContainerRef}
              className="absolute top-0 w-[42vw] right-0 h-full p-[60px] overflow-hidden z-0"
            >
              <div 
                ref={el => borderRefs.current[1] = el}
                className="border-l border-black border-dashed absolute left-0 top-0 h-full w-0 opacity-[0]"
              />
              <div className="!pb-[50px] w-full">
                <video
                  src="/assets/aboutus/about.mp4"
                  ref={videoRef}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full object-cover opacity-0"
                />
              </div>
              
              <div className="flex ml-[auto]">
                <div className="relative inline-block logo_parent">
                  <div className="logo_box mb-[auto] absolute right-[0] bottom-[-300%] border-[1px] inline-block px-[20px] py-[8px] border-[#000]">
                    <figure className="flex justify-center place-items-center">
                      <img src="/assets/aboutus/gtf_logo.png" height={"16"} className="me-4 w-[50px] basis-[8px]" alt=""/> 
                      <h4 className="font-[Oswald] leading-[22px] text-start text-[#1E251F] flex-[1] uppercase basis-[100px] text-[12px] leading-[18px]">
                        Our <span className="lg:block none"></span> All Service
                      </h4>
                      <strong className="text-[#1E251F] font-[Oswald] text-[22px] ms-[20px]">13</strong>
                    </figure>
                  </div>
                </div>
                
                <div className="pt-[0] content_sec ml-[auto]">
                  <h2 className="font-[Oswald] text-[38px] mb-[20px] opacity-0">
                    "Purpose. Position. Promise. Personality."
                  </h2>
                  <p className="text-justify text-[15px] leading-[25px] text-[#5B5B5B] font-[350] opacity-0">
                    We use our insight, experience, and rich industry knowledge to formulate and drive a distinct and differentiating positioning for your brand.
                    We use our insight, experience, and rich industry knowledge to formulate and drive a distinct and differentiating positioning for your brand.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mr-[auto] bottom_right_arrow opacity-0 absolute bottom-[0] left-[0]">
          <img src="/assets/aboutus/arrow_down.svg" className="mt-[auto]" height={"16"} alt=""/> 
        </div>
      </section>
    </div>
  );
};

export default BrandBannerSection;