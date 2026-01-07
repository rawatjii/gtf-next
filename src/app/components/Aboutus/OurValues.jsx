"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CommonHeading from "@/app/utils/CommonHeading";
import KnowMoreBtn from "@/app/utils/knowMoreBtn";
gsap.registerPlugin(ScrollTrigger);

const pageData = [
  {
    headings: {
      outline: "Integrity. Innovation.",
      fill: "Excellence.",
    },
    para: "As a company, we draw in and build up our business's best ability, share information, and give the best fundamental tools and resources to stay aware of today's fast-changing technology. We strive to continuously be the best we can be in everything we do and deliver quality work for our clients. We are trusted by our clients to convey achievements. The planning we suggest is fact-based, consultative, and strategic. We execute battles with inventiveness, creativity, and ability, with the most extreme trustworthiness. We believe in becoming an extension of the client's team.",
    video: "/assets/aboutus/flying.mp4",
  },
  {
    headings: {
      outline: "Our Mission",
      fill: "Our Goal",
    },
    para: "Our mission is to innovate, prepare, and provide versatile, user-friendly, productive, and comprehensive digital marketing solutions to present and future digital marketing industry requirements. At Milestone, we endeavour to enable our clients to make a convincing digital presence to give inventive and influential coordinated digital marketing planning, helping our customers develop their organizations and understand their digital marketing goals. We believe that incredible work originates from a pure heart and innovative mind.",
    video: "/assets/aboutus/mission.mp4",
  },
];

const OurValuesAndMission = () => {
  const imageRef = useRef(null);
  const sectionRef = useRef(null);

  // useEffect(() => {
  //   const el = imageRef.current;
  //   const section = sectionRef.current;

  //   gsap.fromTo(
  //     el,
  //     {
  //       clipPath: "inset(0 100% 0 0)",
  //     },
  //     {
  //       clipPath: "inset(0 0% 0 0)",
  //       duration: 3.5,
  //       ease: "power3.out",
  //       scrollTrigger: {
  //         trigger: el,
  //         start: "top 80%",
  //         toggleActions: "play none none reverse",
  //       },
  //     }
  //   );

  //   // Animation for background color change
  //   ScrollTrigger.create({
  //     trigger: section,
  //     start: "top 50%",
  //     end: "bottom 50%",
  //     // markers:true,
  //     onEnter: () => {
  //       gsap.to("body", {
  //         backgroundColor: "black",
  //         color: "white",
  //         duration: 0.6,
  //         ease: "power2.inOut",
  //       });
  //     },
  //     onLeave: () => {
  //       gsap.to("body", {
  //         backgroundColor: "white", // Reset body background to white
  //         color: "black", // Reset text color to black
  //         duration: 1, // Set duration for the color reset
  //       });
  //     },
  //     onEnterBack: () => {
  //       gsap.to("body", {
  //         backgroundColor: "black",
  //         color: "white",
  //         duration: 1,
  //       });
  //     },
  //     onLeaveBack: () => {
  //       gsap.to("body", {
  //         backgroundColor: "white",
  //         color: "black",
  //         duration: 1,
  //       });
  //     },
  //   });
  // }, []);

  return (
    <section
      ref={sectionRef}
      className="py-[80px]  flex justify-between flex-wrap"
    >
      <div className="container mx-auto">
        {pageData.map((data, idx) => (
          <div className={`grid grid-cols-12 relative gap-[120px] ${idx < pageData.length-1 ? "mb-[100px]" : ""}`}>
              <div
                className={`col-span-6 mr-[auto] relative mix-blend-multiply w-full ${
                  idx % 2 !== 0 ? "order-2" : ""
                } `}
              >
                <div className={`h-full w-full relative before:content-[''] before:block before:h-[600px] before:w-[70%] before:bg-[url('/assets/aboutus/net.png')] before:bg-no-repeat before:bg-cover before:absolute ${idx % 2 !== 0 ? "before:right-[-20%]" : "before:left-[-40%]"} before:z-[1] before:bottom-[-100px]`}>
                  <video
                  fill
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover scale-x-[-1]"
                  >
                    <source src={data.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>

              <div className="col-span-6 m-[auto]">
                <CommonHeading
                  outlineHeading={data.headings.outline}
                  filledHeading={data.headings.fill}
                  lineColor={"bg-gtf-pink"}
                  className=""
                  outlineClass="2xl:!text-[55px] 2xl:tracking-[2px] leading-[55px]"
                  solidClass="2xl:!text-[50px] 2xl:tracking-[2px] leading-[55px]"
                />
                <p className="text-[#888]">
                  {data.para}
                </p>
                <div className="text-end mt-[30px]">
                  <KnowMoreBtn btn_class="text-black" />
                </div>
              </div>
          </div>
        ))}

      </div>
    </section>
  );
};

export default OurValuesAndMission;
