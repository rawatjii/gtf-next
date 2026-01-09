"use client";
import React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CommonHeading from "@/app/utils/CommonHeading";
import CustomButton from "@/app/utils/CustomButton";
gsap.registerPlugin(ScrollTrigger);

const OurMission = () => {

  return (
    <section className="py-[80px] border-y-[1px] border-[#000] border-dashed relative">
        <div className="grid grid-cols-12">
           <div className="col-span-5 mr-[auto] relative mix-blend-multiply">
             <div className="relative before:content-[''] before:block before:h-[550px] before:w-[100%] before:bg-[url('/assets/aboutus/right_net.png')] before:bg-no-repeat before:bg-cover before:absolute before:left-[-35px] before:z-[1] before:top-[10px]">
          <video
            width="800"
            height="800"
            autoPlay
            muted
            loop
            playsInline
            className="w-[100%] h-full object-cover  ml-[auto]" 
          >
            <source src="/assets/aboutus/mission.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>      
      </div>

          <div className="col-span-7 m-[auto]">
          <CommonHeading outlineHeading={"Our Mission"} filledHeading={"Our goal"} lineColor={"bg-gtf-blue"}/>
          <div className="pr-[50px]">
        <p className="text-end text-[#5B5B5B] ">Our mission is to innovate, prepare, and provide versatile, user-friendly, productive, and comprehensive digital marketing solutions to present and future digital marketing industry requirements. At Milestone, we endeavour to enable our clients to make a convincing digital presence to give inventive and influential coordinated digital marketing planning, helping our customers develop their organizations and understand their digital marketing goals. We believe that incredible work originates from a pure heart and innovative mind.</p> 
        <div className="text-end mt-4">
        <CustomButton/>
           </div>
           </div>
          </div> 
      
       </div>
      
    </section>
  );
};

export default OurMission;
