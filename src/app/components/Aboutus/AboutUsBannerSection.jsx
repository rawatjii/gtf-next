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

    const setInitial = () => {
      const heroRect = heroSection.getBoundingClientRect();
      const shallowRect = shallowVideo.getBoundingClientRect();

      gsap.set(bannerVideo, {
        position: "absolute", // Use absolute instead of pinning
        left: 0,
        top: 0,
        zIndex: 50,
        overflow: "hidden",
        willChange: "transform, width, height",
      });

      gsap.set(bannerVideo, {
        x: shallowRect.left - heroRect.left,
        y: shallowRect.top - heroRect.top,
        width: shallowRect.width,
      });
    };

    const ctx = gsap.context(() => {
      setInitial();

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroSection,
          start: "top top",
          end: "bottom 100%",
          scrub: true,
          anticipatePin: true,
          // No pin, manually handle positioning and scaling
        },
      });

      // Animate the banner video manually with `position: fixed` for smooth scroll interaction
      tl.to(bannerVideo, {
        x: 0,
        y: "100vh", // Ensure the vertical movement is proportional
        width: "100vw",
        height: "100vh",
        borderRadius: 0,
        position: "fixed", // Keep the video fixed as the user scrolls
        top: 0,
        left: 0,
        ease: "none",
      });
    }, bannerVideoRef);

    const aboutCtx = gsap.context(()=>{
      const overviewData = document.querySelectorAll('.overview_data');
      overviewData.forEach((data, index)=>{
        gsap.fromTo(
          data,
          {
            clipPath:"inset(100% 0 0 0)",
            duration:1,
            ease:"power4.out",
          },
          {
            clipPath:"inset(0% 0 0 0)",
            scrollTrigger:{
              trigger:data,
              start:"top 80%",
              toggleActions:"play none none reverse"
            }
          },
        )
      })
    })

    return () => {
      ctx.revert();
      aboutCtx.revert();
    };
  }, []);

  return (
    <div ref={sectionRef}>
      <section
        ref={heroSectionRef}
        className="custom_banner_sec relative bg-[#e243971c] h-[200vh]"
      >
        <div className="content max-w-[80%] h-screen mx-auto flex justify-center items-center">
          <h1 className="relative mb-0 neue_font font-bold tracking-[0px] 2xl:text-[120px] md:text-[80px] text-[32px] inline-block text-center leading-[140px] uppercase text-[#111]">
            Map the journey
            <span className="flex items-center justify-center">
              before
              <div
                ref={shallowBannerVideoRef}
                className=" w-[250px] h-[140px] mx-[30px]"
              ></div>
              you
            </span>
            take the trip.
          </h1>
        </div>

        <div
          ref={bannerVideoRef}
          className="rounded rounded-[10px] overflow-hidden w-full"
          style={{
            width: "100vw",
          }}
        >
          <video
            src="/assets/aboutus/about.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="video_cursor w-full h-full object-cover"
            style={{
              width: "100vw",
            }}
            onClick={() => alert("testing")}
          />
        </div>

      </section>

      <div className="about_content mt-[150px] mb-[100px]">
        <div className="container mx-auto">
          <div className="max-w-[50%]">
            <h5 className="overview_data neue_font text-[32px] leading-[40px] tracking-[1px] mb-[30px]">We believe happy people make happy clients. We focus on ensuring our team's wellbeing is front and foremost, and as a result they always bring their A game.</h5>

            <p className="overview_data text-[15px] tracking-[0.5px] leading-[26px]">GTF Technologies incepts from "Gurukul The Foundation" is a performance-driven digital media planning company located in India's heart in New Delhi. With over 15+ years of expertise and more than 623 satisfied clients across the world, we are experts in digital media marketing and boast of our value-added services that enable a business to interact effectively.</p>
          </div>
        </div>
        
      </div>

    </div>
  );
};

export default AboutUsBannerSection;
