"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText"; 
import Header from "../Home/Header";
import { Grid } from "@/app/utils/Grid";
import SmBox from "@/app/utils/SmBox";

  gsap.registerPlugin(ScrollTrigger, SplitText);

const DigitalBanner = () => {
  const sectionRefBanner = useRef(null);
  const titleRef = useRef(null);
  const videoContainerRef = useRef(null);
  const videoRef = useRef(null);
  const headingRef = useRef(null);
  const borderRefs = useRef([]);
  const smBoxRef = useRef(null);
  const arrowRef = useRef(null);
  const postBannerTextRef = useRef(null); 

  useEffect(() => {
    const sectionBanner = sectionRefBanner.current;
    const title = titleRef.current;
    const video = videoRef.current;
    const videoContainer = videoContainerRef.current;
    const heading = headingRef.current;
    const smBox = smBoxRef.current;
    const arrow = arrowRef.current;
    const postBannerText = postBannerTextRef.current;

    const splitHeading = new SplitText(heading, {
      type: "chars,words",
      charsClass: "char",
      wordsClass: "word"
    });

    const splitPostText = new SplitText(postBannerText, {
      type: "chars,words",
      charsClass: "char",
      wordsClass: "word"
    });
                
    gsap.set(borderRefs.current, {
      scaleX: 0,
      opacity: 1,
      transformOrigin: "left center"
    });

    gsap.set(smBox, {
      opacity: 0,
      scale: 0.8,
      transformOrigin: "center center"
    });

    gsap.set(postBannerText, {
      opacity: 0,
      y: 30
    });

    gsap.set(splitPostText.chars, {
      opacity: 0,
      y: 20,
      rotationX: -45
    });

    const tlBanner = gsap.timeline({
      defaults: { ease: "power2.out" },
    });

    tlBanner
      .to(splitHeading.chars, {
        y: 200,
        opacity: 0,
        rotationX: -90,
        transformOrigin: "0% 50% -50"
      })
      .to(
        title,                
        {
          opacity: 1,
          duration: 1,
        },
        ""
      )
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
        },
        "-=0.3"
      )
      .to(borderRefs.current, {
        duration: 0.8,
        scaleX: 1,
        stagger: 0.1,
      }, "-=0.5")
      .fromTo(videoContainer.querySelector("img"), {
        opacity: 0,
        y: "50%",
        scale: 1.2 
      }, {
        y: "0%",
        opacity: 1,
        scale: 1,
        duration: 1.2
      })
      .fromTo(smBox, {
        opacity: 0,
        scale: 0.8
      }, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.7)"
      }, "-=0.3")
      .fromTo(arrow, {
        opacity: 0,
        rotation: -45
      }, {
        opacity: 1,
        rotation: 0,
        duration: 0.5
      })
      .to(postBannerText, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "+=0.5")
      .to(splitPostText.chars, {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.6,
        stagger: {
          amount: 0.8,
          from: "start"
        },
        ease: "back.out(1.7)"
      }, "-=0.6");

    let tlcroll = gsap.timeline({
      scrollTrigger: {
        trigger: sectionBanner,
        scrub: 1,
        end:"+=80%",
        pin: true,
      },
      defaults: { ease: "power2.inOut", duration: 1 },
    });

    const createScrollTimeline = () => {
      tlcroll
        .fromTo(
          title,
          { x: "-16%", y: "0%" },
          { x: "-100%", y: "-30%" },
          0
        )
        .fromTo(
          video,
          { width: "100%", scale: 1 },
          { width: "100vw", scale: 1.1 },
          0
        )
        .fromTo(
          videoContainer,
          { width: "42vw" },
          { width: "calc(100vw - 82px)",height:'400px' },
          0
        ).fromTo(document.querySelector(".banner_parent_sec"),
            {height:"calc(100vh - 100px)"},
            {height:"50vh"},"<"
          )
        .fromTo(
          document.querySelector(".content_sec"),
          { width: "100%" },
          { width: "90%" },
          "<"
        )
        .fromTo(
          arrow,
          { width: "80px", opacity: 1 },
          { width: "0", opacity: 0 },
          0
        )
        .to(borderRefs.current, {
          scaleX: 1.2,
          yoyo: true,
          repeat: 1,
          duration: 0.5,
          ease: "power1.inOut"
        }, "<")

    };

    const smBoxHover = gsap.to(smBox, {
      scale: 1.05,
      duration: 0.3,
      paused: true,
      ease: "power2.out"
    });

    smBox.addEventListener("mouseenter", () => smBoxHover.play());
    smBox.addEventListener("mouseleave", () => smBoxHover.reverse());

    tlBanner.eventCallback("onComplete", () => {
      createScrollTimeline();
    });

    return () => {
      tlcroll?.scrollTrigger?.kill();
      tlcroll?.kill();
      tlBanner.kill();
      splitHeading.revert();
      splitPostText.revert(); 
      smBox.removeEventListener("mouseenter", () => smBoxHover.play());
      smBox.removeEventListener("mouseleave", () => smBoxHover.reverse());
      smBoxHover.kill();
    };
  }, []);

  return (
    <div ref={sectionRefBanner}>
      <Header />
      <section  className="relative banner_parent_sec w-[100%] h-[calc(100vh-100px)] border-b-[1px] border-[#000] border-dashed overflow-hidden">
        <div 
          ref={el => borderRefs.current[0] = el}
          className="border-t border-black border-dashed absolute opacity-[0] top-0 left-0 w-full h-0"
        />    
        <div className="relative w-full h-full">
          <Grid/>
          <div className="w-full h-full">
            <div 
              ref={titleRef} 
              className="flex translate-x-[-16%] py-[70px] opacity-[0] translate-y-[50%] flex-col place-items-end justify-between absolute text-end w-[60vw] left-[0] inset-0 pr-[30px]"
            >
              <h3 className="mt-[18px]">
                <span ref={headingRef} className="font-[Oswald] leading-[1.1] inline-block h-fit relative text-[120px] font-[500] tracking-[4px] leading-[normal] uppercase">
                  Digital Media<span className="lg:block"> Planning</span> 
                </span> 
              </h3>
              <div ref={smBoxRef} className="mb-[auto] mt-[35px]">
                <SmBox heading={<p>Total Job<span className="lg:block none"></span> Opening</p>} number={10} />
              </div>
            </div>      
            <div
              ref={videoContainerRef}
              className="absolute top-0 w-[42vw] right-0 h-full overflow-hidden z-0"
            >
              <div 
                ref={el => borderRefs.current[1] = el}
                className="border-l border-black border-dashed absolute left-0 top-0 h-full w-0 opacity-[0]"
              />      
              <div ref={videoRef} className="w-full">
                <img src="/assets/digital/laptop_coffee_banner.jpg" className="w-full h-[100%] object-cover object-center" alt="Laptop Banner"/>
              </div>
            </div>
          </div>
        </div>

        <div ref={arrowRef} className="mr-[auto] bottom_right_arrow opacity-0 absolute bottom-[0] left-[0]">
          <img src="/assets/aboutus/arrow_down.svg" className="mt-[auto]" height={"16"} alt="Arrow Down"/> 
        </div>
        <div>
        </div>
      </section>
      
      <section className="w-full pt-[60px] px-[30px]">
        <div className="grid grid-cols-12">
          <div className="col-span-6">  
            
          </div>
          <div className="col-span-6">
          <div ref={postBannerTextRef} className=" mx-auto">
          <h2 className="text-[32px]  font-[600] font-[oswald] text-gray-800 leading-[normal]">
            Discover innovative strategies and creative  solutions in digital media planning
          </h2>
            <p className="text-justify text-[15px] leading-[25px] text-[#5B5B5B] font-[350] opacity-1 mt-[10px]">
              We use our insight, experience, and rich industry knowledge to formulate and drive a distinct and differentiating positioning for your brand.
              We use our insight, experience, and rich industry knowledge to formulate and drive a distinct and differentiating positioning for your brand.
            </p>
        </div>
        </div>
        </div>
      </section>
    </div>
  );
};

export default DigitalBanner;