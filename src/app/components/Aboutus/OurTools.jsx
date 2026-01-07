"use client";
import { useEffect, useRef } from "react";
import StaggeredLogoSwitcher from "../Home/Client_sec";
import CommonHeading from "@/app/utils/CommonHeading";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const OurTools = () => {
  const imageRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = imageRef.current;
    const section = sectionRef.current;

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

    // Animation for background color change
    ScrollTrigger.create({
      trigger: section,
      start: "top 50%",
      end: "bottom 50%",
      // markers:true,
      onEnter: () => {
        gsap.to("body", {
          backgroundColor: "black",
          color: "white",
          duration: 0.6,
          ease: "power2.inOut",
        });
      },
      onLeave: () => {
        gsap.to("body", {
          backgroundColor: "white", // Reset body background to white
          color: "black", // Reset text color to black
          duration: 1, // Set duration for the color reset
        });
      },
      onEnterBack: () => {
        gsap.to("body", {
          backgroundColor: "black",
          color: "white",
          duration: 1,
        });
      },
      onLeaveBack: () => {
        gsap.to("body", {
          backgroundColor: "white",
          color: "black",
          duration: 1,
        });
      },
    });
  }, []);

  const logoSets = [
    {
      id: 1,
      title:"Google Analytics",
      txt:"We leverage Google Analytics to optimize performance and drive results.",
      src: "/assets/aboutus/google_analytics.svg"
     },
     {
      id: 2,
      title:"Google Adwords",
      txt:"We harness the power of Google Ads to drive targeted traffic and maximize ROI.",
      src: "/assets/aboutus/google_adwords.svg"
     },
     {
      id: 3,
      title:"Think with Google",
      txt:"We leverage insights from Think with Google to drive data-backed strategies and stay ahead of trends.",
      src: "/assets/aboutus/think-with-google.svg"
     },
     {
      id: 4,
      title:"Google Developers",
      txt:"We utilize Google Developers tools to build, innovate, and optimize seamless digital experiences.",
      src: "/assets/aboutus/google_developers.svg"
     },
     {
      id: 5,
      title:"Facebook",
      txt:"We connect brands with their audience on Facebook through targeted, engaging campaigns.",
      src: "/assets/aboutus/facebook.svg"
     },
     {
      id: 6,
      title:"LinkedIn",
      txt:"We leverage LinkedIn to build professional networks, foster brand trust, and drive business growth.",
      src: "/assets/aboutus/linkedin.svg"
     },
     {
      id: 7,
      title:"Youtube",
      txt:"We create engaging video content on YouTube to increase brand visibility and audience connection.",
      src: "/assets/aboutus/youtube.svg"
     },
     {
      id: 8,
      title:"Yahoo",
      txt:"We optimize targeted campaigns on Yahoo to reach a broad audience and enhance brand awareness.",
      src: "/assets/aboutus/yahoo.svg"
     },
     {
      id: 9,
      title:"Twitter",
      txt:"We use Twitter to spark conversations, amplify brand presence, and drive real-time engagement.",
      src: "/assets/aboutus/twitter.svg"
     },
     {
      id: 10,
      title:"Instagram",
      txt:"We craft visually stunning content on Instagram to engage audiences and build brand loyalty.",
      src: "/assets/aboutus/instagram.svg"
     },
  ];

  
  return (
    <section ref={sectionRef} className=" py-[80px] pb-[80px]">
      <div className="container mx-auto">
        <div className="flex justify-center items-end md:mb-[0] mb-[30px]">
          <CommonHeading outlineHeading={"why?"} filledHeading={"Our Tools"} lineColor={"bg-gtf-yellow"} outlineClass="!text-center" solidClass="!pl-0"/>
          {/* <p className="uppercase italic pt-[16px] md:ml-[3rem] text-center pb-[60px] lg:text-left font-[500]">
            <span className="block">We are in partnership with top brands and</span>
            <span className="block">certified for performance and quality</span>
          </p> */}
        </div>
        <div className="overflow-hidden relative w-full main_border_cmp border-black mt-[50px]">
          {/* <ul
            className="grid grid-cols-2 border-none sm:grid-cols-3 md:grid-cols-5 w-full border-[2px]"
          > */}
            <StaggeredLogoSwitcher logoSets={logoSets}/>
          {/* </ul> */}
        </div>
      </div>
    </section>
  );
};

export default OurTools;
