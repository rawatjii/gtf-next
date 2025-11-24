"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Line from "../Line";
import Contactform from "../Contactform";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const imgRef = useRef(null);
  const coloredLineRef = useRef(null);
  const span1Ref = useRef(null);
  const span2Ref = useRef(null);
  const animationRef = useRef(null); // Store the GSAP timeline
  const buttonRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(()=>{
      // image animation
      gsap.set(imgRef.current, {scale:1.2, transformOrigin:"center center", immediateRender: true,});

      // clip path animation
      gsap.set([span1Ref.current, span2Ref.current], {
        clipPath: "inset(100% 0 0 0)",
        immediateRender: true,
      });

      gsap.set(buttonRef.current, {autoAlpha:0, transform:"translateY(10px)", immediateRender:true})

      const tl = gsap.timeline({ paused: true });

      // Image scale down
      tl.to(imgRef.current, {
        scale:1,
        duration:0.5,
        ease:"power2.out"
      }, 0);

      // Span 1: reveal from bottom
      tl.to(span1Ref.current, {
        clipPath: "inset(0% 0 0 0)",
        duration: 1,
        ease: "power3.out",
      }, 0.3); // Start 0.3s after image

      // Span 2: reveal with stagger
      tl.to(span2Ref.current, {
        clipPath: "inset(0% 0 0 0)",
        duration: 1,
        ease: "power3.out",
      }, 0.6); // 0.3s after span1 → total stagger 0.3s

      tl.to(buttonRef.current,{
        autoAlpha:1,
        transform:"translateY(0)",
        ease:"power2.out"
      })

      // === 4. ScrollTrigger: Play every time ===
      ScrollTrigger.create({
        trigger:sectionRef.current,
        start:"top 90%",
        onEnter: () => tl.restart(),
        onEnterBack: () => tl.progress(1),
        onLeave: () => tl.progress(1),
        onLeaveBack: () => tl.reverse(),
        // markers:true,
      })

      return () => ctx.revert();
    }, sectionRef)

  }, []);

  return (
    <section ref={sectionRef} className="text-center relative overflow-hidden">
      {/* Animated Background Image */}
      <img
        ref={imgRef}
        src="/assets/contactus/say_hello_bg.jpg"
        className="absolute w-full h-full object-cover top-0 left-0  z-[-1]"
        alt="Contact background"
        style={{
          scale: 1.2, // Inline initial scale
          transformOrigin: "center center",
        }}
      />

      <img
        src="/assets/home/clients/bg.png"
        className="absolute top-0 left-0 z-[-1] opacity-30"
      />

      <div
        // style={{
        //   backgroundImage: `url("/assets/home/clients/bg.png")`,
        //   backgroundRepeat: "no-repeat",
        //   backgroundSize: "cover",
        //   backgroundPosition: "center",
        // }}
        className="relative md:mt-[1rem] md:pt-[5rem] py-[60px] md:px-0 px-[15px] z-[9]"
      >
        <div className="block">
          <h3 className="bebas uppercase inline-block md:pl-[35px] md:text-start text-center relative md:leading-[70px] text-white tracking-[2px] 2xl:text-[72px] md:text-start lg:text-[60px] md:text-[50px] text-[32px] ">
            <span ref={span1Ref} className=" block" style={{ clipPath: "inset(100% 0 0 0)" }}>
            Start the Conversation
            </span>
            <span ref={span2Ref} className="relative md:pl-[15.1rem] block md:text-start mt-[10px]" style={{ clipPath: "inset(100% 0 0 0)" }}>
            That Changes Everything.
              <Line
                ref={coloredLineRef}
                bgColor="bg-gtf-pink"
                left="left-[48%] xl:left-[61%]"
              />
            </span>
          </h3>
        </div>

        <button ref={buttonRef} className="mt-[50px] bg-[white] w-[100%] lg:w-auto font-[600] uppercase font-[Oswald] rounded-md shadow-md  cursor-pointer xl:text-[18px] text-[16px] outline-none px-[3rem] py-[0.8rem] text-center transition-transform duration-150 ease-in-out hover:shadow-lg hover:-translate-y-1 tracking-[1px]" style={{opacity:0, transform:"translateY(10px)"}}>
          Submit
        </button>
      </div>

      {/* Uncomment when needed */}
      {/* <div className="bg-[#2AAEE4] md:px-[35px] px-[15px] z-[2] mix-blend-multiply">
        <Contactform />
      </div> */}
    </section>
  );
};

export default Contact;