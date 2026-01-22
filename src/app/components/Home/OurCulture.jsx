"use client"
import React, { useEffect, useRef } from "react";
import Line from "../Line";
import {gsap} from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const OurCulture = () => {
  const sectionRef = useRef(null);
  const buttonRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(()=>{
    const ctx = gsap.context(()=>{

      const tl = gsap.timeline({paused:true});
      const tl2 = gsap.timeline({paused:true});
      
      tl.to(textRef.current, {
        clipPath:"inset(0% 0 0 0)",
        duration:2,
        ease:"power3.out"
      })

      tl.to(buttonRef.current,{
        autoAlpha:1,
        transform:"translateY(0)",
        ease:"power3.out"
      }, "-=1.5")

      tl2.to(imageRef.current, {
        transform:"scale(1)",
        duration:1,
        ease:"power2.out"
      })

      ScrollTrigger.create({
        trigger:sectionRef.current,
        start:"top 50%",
        onEnter: () => tl.restart(),
        onEnterBack: () => tl.progress(1),
        onLeave: () => tl.progress(1),
        onLeaveBack: () => tl.reverse(),
      })

      ScrollTrigger.create({
        trigger:sectionRef.current,
        start:"top 80%",
        onEnter: () => tl2.restart(),
        onEnterBack: () => tl2.progress(1),
        onLeave: () => tl2.progress(1),
        onLeaveBack: () => tl2.reverse(),
      })

      return () => ctx.revert();

    }, sectionRef)

  }, [])

  return (
    <section ref={sectionRef} className="relative our_culture_section min-h-screen flex flex-col items-center justify-center">
      <div className="gifs">
        <img src="/assets/home/culture/gif1.gif" className="absolute left-[10vw] top-[23%] w-[180px] h-[180px] z-[1]" />
        <img src="/assets/home/culture/gif2.gif" className="absolute right-[12vw] top-[23%] w-[180px] h-[180px] z-[1]" />
        <img src="/assets/home/culture/gif3.gif" className="absolute right-[10vw] top-[50%] w-[180px] h-[180px] z-[1]" />
      </div>

      <div className="absolute w-full h-full left-0 top-0 before:absolute before:h-full before:w-full before:bg-[#000] before:opacity-50">
        <img
          ref={imageRef}
          src="/assets/culture/culture_bg.webp"
          className=" w-full h-full left-0 top-0 object-cover"
          style={{
            transform:"scale(1.2)"
          }}
        />
        {/* <img
          src="/assets/culture/question.gif"
          className="absolute"
        /> */}
      </div>
      <h3 ref={textRef} className="neue_font text-white font-bold uppercase md:text-start mb-[1.5rem] text-center max-h-content inline-block relative md:pt-[5rem] md:pl-[35px] px-5 md:leading-[70px] tracking-[2px] 2xl:text-[72px] lg:text-[62px] md:text-[50px] text-[32px] relative z-0"  style={{ clipPath: "inset(100% 0 0 0)" }}>
        <span>Our Culture</span>
        {/* <span className="block">Culture</span> */}
        <Line
          bgColor="bg-gtf-pink"
          top="lg:bottom-[0]"
          left="left-[47%] lg:left-[61%]"
          right="right-[-2%]"
          className="test"
        />
      </h3>
      <div className="block">
        <button ref={buttonRef} className="mt-[50px] bg-[white] w-[100%] lg:w-auto font-[600] uppercase just_font rounded-md shadow-md cursor-pointer xl:text-[18px] text-[16px] outline-none px-[3rem]  py-[0.8rem] text-center transition-transform hover:shadow-lg hover:-translate-y-1 tracking-[1px]" style={{opacity:0, transform:"translateY(10px)"}}>
            Visit Page
        </button>
      </div>
    </section>
  );
};

export default OurCulture;
