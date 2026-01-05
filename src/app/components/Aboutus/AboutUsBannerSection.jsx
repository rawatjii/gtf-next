"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "../Home/Header";

gsap.registerPlugin(ScrollTrigger);

const AboutUsBannerSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const videoContainerRef = useRef(null);
  const videoRef = useRef(null);
  const bannerVideoRef = useRef(null);
  const heroSectionRef = useRef(null);
  const shallowBannerVideoRef = useRef(null);

  useEffect(() => {
    if (!bannerVideoRef.current || !shallowBannerVideoRef.current) return;

    const heroSection = heroSectionRef.current;
    const bannerVideo = bannerVideoRef.current;
    const shallowVideo = shallowBannerVideoRef.current;

    const setInitial = ()=>{
      const heroRect = heroSection.getBoundingClientRect();
      const shallowRect = shallowVideo.getBoundingClientRect();

      gsap.set(bannerVideo, {
        position:"absolute",
        left:0,
        top:0,
        zIndex:50,
        overflow:"hidden",
        willChange:"transform, width, height",
      })

      gsap.set(bannerVideo, {
        x: shallowRect.left,
        y: shallowRect.top,
        width:shallowRect.width,
      });
    }

    const ctx = gsap.context(() => {
      setInitial();

      const tl = gsap.timeline({
        scrollTrigger:{
          trigger:heroSection.current,
          start:"top top",
          end:"bottom bottom",
          scrub:true,
          pin:true,
          markers:true,
          anticipatePin:true,
        }
      });

      tl.to(bannerVideo, {
        x:0,
        y:"100vh",
        width: "100vw",
        height: "100vh",
        borderRadius: 0,
        ease: "none",
      })

    }, bannerVideoRef);


  }, []);

  return (
    <div ref={sectionRef}>
      <section ref={heroSectionRef} className="relative bg-[#e243971c] h-[200vh]">
          <div className="content max-w-[80%] h-screen mx-auto flex justify-center items-center">
            <h1 className="relative mb-0 neue_font font-bold tracking-[0px] 2xl:text-[120px] md:text-[80px] text-[32px] inline-block text-center leading-[140px] uppercase text-[#111]">
              Map the journey
              <span className="flex items-center justify-center">
                before
                <div
                  ref={shallowBannerVideoRef}
                  className=" w-[250px] h-[140px] mx-[30px]"
                >
                </div>
                you
              </span>
              take the trip.
            </h1>
          </div>

        <div ref={bannerVideoRef} className="rounded rounded-[10px] overflow-hidden w-full" >
          <video
            src="/assets/aboutus/about.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      <div className="h-screen"></div>

      <section className="relative  w-[100%] h-[calc(100vh-100px)]  border-b-[1px] border-[#000] border-dashed  overflow-hidden">
        <div className="border-t border-black border-dashed relative w-full h-full">
          <div className="w-full h-full">
            <div
              ref={titleRef}
              className="flex  flex-col place-items-end justify-between absolute text-center w-[60vw] left-[0] inset-0"
            >
              <h3>
                <span className="neue_font inline-block h-fit relative text-[350px] font-medium">
                  About
                </span>
              </h3>
            </div>

            <div
              ref={videoContainerRef}
              className="absolute top-0  right-0 h-full border-l p-[60px] border-black border-dashed border-b-none overflow-hidden z-0"
            >
              <div className="!pb-[32px] w-full">
                <video
                  src="/assets/aboutus/about.mp4"
                  ref={videoRef}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full object-cover"
                ></video>
              </div>
              <div className="flex ml-[auto] ">
                <div className="relative inline-block logo_parent">
                  <div className="logo_box mb-[auto] absolute  right-[0] bottom-[-100%]  border-[1px] inline-block px-[20px] py-[8px] border-[#000]">
                    <figure className="flex justify-center place-items-center">
                      <img
                        src="/assets/aboutus/gtf_logo.png"
                        height={"16"}
                        className="me-4 w-[50px] basis-[8px]"
                        alt=""
                      />
                      <h4 className="font-[Oswald] leading-[22px] text-start text-[#1E251F] flex-[1] uppercase   basis-[100px] text-[12px] leading-[16px]">
                        Yours of <span className="lg:block none"></span>{" "}
                        original work
                      </h4>
                      <strong className="text-[#1E251F] font-[Oswald] text-[22px]  ms-[20px]">
                        17
                      </strong>
                    </figure>
                  </div>
                </div>
                <div className=" pt-[0] content_sec ml-[auto]">
                  <h2 className="font-[Oswald] text-[38px] mb-[20px]">
                    WHO WE ARE ?
                  </h2>
                  <p className="text-justify text-[15px] leading-[25px] text-[#5B5B5B] font-[350]">
                    GTF Technologies incepts from "Gurukul The Foundation" is a
                    performance-driven digital media planning company located in
                    India's heart in New Delhi. With over 15+ years of expertise
                    and more than 623 satisfied clients across the world, we are
                    experts in digital media marketing and boast of our
                    value-added services that enable a business to interact
                    effectively.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mr-[auto] bottom_right_arrow absolute bottom-[0] left-[0]">
          <img
            src="/assets/aboutus/arrow_down.svg"
            className="mt-[auto]"
            height={"16"}
            alt=""
          />
        </div>
      </section>
    </div>
  );
};

export default AboutUsBannerSection;
