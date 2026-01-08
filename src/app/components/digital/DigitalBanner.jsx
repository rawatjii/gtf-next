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
  const videoSecRef = useRef(null);
  const headingRef = useRef(null);
  const borderRefs = useRef([]);
  const smBoxRef = useRef(null);
  const arrowRef = useRef(null);
  const postBannerTextRef = useRef(null); 


  // digital media planning
  useEffect(()=>{
    const videoSec = videoSecRef.current;
    const video = videoRef.current;

    const ctx = gsap.context(()=>{
      
      // gsap.set(
      //   video,
      //   {
      //     width:"50%",
      //     borderRadius:"10px"
      //   }
      // );

      gsap.fromTo(
        video,
        {
          scaleX: 0.5,
          scaleY: 0.5, // Start with scaling on both axes (X and Y)
          transformOrigin: "right top", // Start scaling from the top-right corner
          borderRadius:"15px"
        },
        {
          scaleX: 1,
          scaleY: 1, // Scale to 100% width and height
          borderRadius: 0,

          scrollTrigger: {
            trigger: videoSec,
            start: "top 50%",
            end: "top 10%",
            scrub: 1,
            toggleActions: "play none none reverse",
          }
        }
      );
      
    }, videoSec);

    return()=>ctx.revert();
  }, []);


  return (
    <section ref={sectionRefBanner} className="pt-[50px]">
      <div className="container mx-auto">
        <div className="main_content">
          <h1 className="text-[60px] uppercase font-semibold max-w-[60%] leading-[70px]">Blending Creativity with the Essentials</h1>
          <p className="mt-[40px] max-w-[450px]">We use the art of storytelling to deliver content and messaging in an experiential way, all underpinned with unique strategic insights.</p>

          <div ref={videoSecRef} className="video_section mt-[100px]">
            <video ref={videoRef} autoPlay muted loop>
              <source src="/assets/digital/digital-media.mp4" />
            </video>
          </div>
        </div>
      </div>
      
      
      
    </section>
  );
};

export default DigitalBanner;