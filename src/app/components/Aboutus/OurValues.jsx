"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CommonHeading from "@/app/utils/CommonHeading";
import KnowMoreBtn from "@/app/utils/knowMoreBtn";
gsap.registerPlugin(ScrollTrigger);

const OurValuesAndMission = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    const el = imageRef.current;
    gsap.fromTo(
      el,
      {
        clipPath: "inset(0 100% 0 0)",
      },
      {
        clipPath: "inset(0 0% 0 0)",
        duration: 3.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <section className="py-[80px]  flex justify-between flex-wrap">
        <CommonHeading outlineHeading={"Integrity. Innovation."} filledHeading={"Collaboration. Excellence."} lineColor={"bg-gtf-pink"}/>
        <div className="grid grid-cols-12 relative ">
          
          <div className="col-span-6 m-[auto]">
           <p className="text-[#5B5B5B] pl-[50px]">As a company, we draw in and build up our business's best ability, share information, and give the best fundamental tools and resources to stay aware of today's fast-changing technology. We strive to continuously be the best we can be in everything we do and deliver quality work for our clients. We are trusted by our clients to convey achievements. The planning we suggest is fact-based, consultative, and strategic. We execute battles with inventiveness, creativity, and ability, with the most extreme trustworthiness. We believe in becoming an extension of the client's team.</p> 
           <div className="text-end">
           <KnowMoreBtn/>
           </div>
          </div> 
       <div className="col-span-6 mr-[auto] relative mix-blend-multiply">
        <div className="relative before:content-[''] before:block before:h-[600px] before:w-[70%] before:bg-[url('/assets/aboutus/net.png')] before:bg-no-repeat before:bg-cover before:absolute before:right-[-20px] before:z-[1] before:bottom-[-100px]">
          <video
            width="800"
            height="800"

            autoPlay
            muted
            loop
            playsInline
            className=" h-full pr-[80px] object-cover scale-x-[-1] ml-[auto]" 
          >
            <source src="/assets/aboutus/flying.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          </div>
      </div>
    </div>
  </section>
  );
};

export default OurValuesAndMission;
