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


  return (
    <section ref={sectionRefBanner} className="pt-[50px]">
      <div className="container mx-auto">
        <div className="main_content">
          <h1 className="text-[60px] uppercase font-semibold max-w-[60%] leading-[70px]">Blending Creativity with the Essentials</h1>
          <p>We use the art of storytelling to deliver content and messaging in an experiential way, all underpinned with unique strategic insights.</p>
        </div>
      </div>
      
      
      <div className="w-full pt-[60px] px-[30px]">
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
      </div>
    </section>
  );
};

export default DigitalBanner;