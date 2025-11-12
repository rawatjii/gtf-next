"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import Header from "../Home/Header";
import CommonHeadingLg from "@/app/utils/CommonHeadinglg";

const ContactusBanner = () => {
  const sectionRefBanner = useRef(null);
  const videoRef = useRef(null);
  const headingRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        videoRef.current,
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5, ease: "ease.in" } 
      );

      gsap.fromTo(
        headingRef.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "ease.in", delay: 0.3 }
      );

      gsap.fromTo(
        textRef.current,
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "ease.in", delay: 0.5 }
      );
    }, sectionRefBanner);

    return () => ctx.revert();  
  }, []);

  return (  
    <div ref={sectionRefBanner}>
      <Header />
      <div className="grid grid-cols-12 border-t-[1px] border-[#000] border-dashed">
        <div className="col-span-3 m-auto">
          <div className="relative before:content-[''] before:block before:h-[300px] before:w-[100%] before:bg-[url('/assets/aboutus/right_net.png')] before:bg-no-repeat before:bg-contain before:absolute before:left-[-35px] before:z-[1] before:top-[10px]">
            <video
              ref={videoRef}
              width="800"
              height="800"
              autoPlay
              muted
              loop
              playsInline
              className="w-[85%] h-full object-cover opacity-[0] mix-blend-multiply mr-[auto]" 
            >
              <source src="/assets/contactus/contact_icon.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>      
        </div>
        <div className="col-span-8 m-auto border-l-[1px] h-[100%] py-[100px] flex flex-col justify-center px-[60px] border-[#000] border-dashed">
          <div ref={headingRef} className="opacity-[0]">
            <CommonHeadingLg heading={'Contact us'} lineColor={"bg-gtf-pink"} />
          </div>
          <p ref={textRef} className="font-[oswald]  opacity-[0]  mt-[28px] text-[18px]">
            GENERAL INQUIRIES AND TALENT APPLICATIONS
          </p>
        </div>
      </div> 
    </div>
  );
};

export default ContactusBanner;