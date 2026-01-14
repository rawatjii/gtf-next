"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const DigitalBanner = ({data}) => {
  const sectionRefBanner = useRef(null);
  const videoRef = useRef(null);
  const videoSecRef = useRef(null);
  const mainTxt = useRef(null); 
  const mainHeadingRef = useRef(null);
  const mainParaRef = useRef(null);

  const [mainTextDataHeight, setMainTextDataHeight] = useState(0)


  // digital media planning
  useEffect(()=>{
    const videoSec = videoSecRef.current;
    const video = videoRef.current;
  
    const mainTextData = mainTxt.current;

    if(mainTextData){
      setMainTextDataHeight(mainTextData.offsetHeight);
    }

    const ctx = gsap.context(()=>{
      
      gsap.set(
        mainTextData,
        {
          
        }
      );

      gsap.set(video, {
        top:"400px",
        position:"relative",
      })

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


  useEffect(() => {
    const videoSec = videoSecRef.current;
    const video = videoRef.current;
    
    // Only run the gsap set if the height has been updated
    if(mainTextDataHeight>0){
      const mainTextData = mainTxt.current;

      // Calculate the top position properly
      const topPosition = window.innerHeight-mainTextDataHeight-200;

      const ctx1 = gsap.context(()=>{
        gsap.set(
          mainTextData,
          {
            position:"relative",
            top:topPosition
          }
        );

        // Initial hidden state for heading
        gsap.set(mainHeadingRef.current,{
          opacity:0,
          y:50,
        });

        gsap.set(mainParaRef.current,{
          opacity:0,
          y:50,
        });

        // After 2 seconds, show heading with animation
        gsap.delayedCall(1, ()=>{

          gsap.to(mainHeadingRef.current, {
            opacity:1,
            y:0,
            duration:1,
            ease:"power4.out",
            stagger:0.02,
            onStart:()=>{
              // Split the text into individual letters for staggered animation
              const splitText = new SplitText(mainHeadingRef.current, {
                type:"chars"
              });

              gsap.from(splitText.chars, {
                opacity:0,
                y:50,
                duration:1,
                stagger:0.01,
                ease: "power4.out",
              })

            }
          });

        });

        // After 1.5 seconds, reset mainTextData to top: 0
        gsap.delayedCall(1.5, ()=>{
          gsap.to(mainParaRef.current, {
            opacity:1,
            y:0,
            duration:1,
            ease:"power4.out",
          })
        });

        // After 1.5 seconds, reset mainTextData to top: 0
        gsap.delayedCall(2.5, () => {
          gsap.to(mainTextData, {
            top: 0, // Reset position to default top (top: 0)
            duration: 1,
            ease: "power4.out",
          });
        });

        // Slide up animation for content below video after the reset
        gsap.delayedCall(2.8, () => {
          gsap.to(video, {
            top: 0, // Example slide-up animation
            duration: 1,
            ease: "power4.out",
          });
        });
  
      }, mainTextData);

      return()=>ctx1.revert();
    }

  }, [mainTextDataHeight]);


  return (
    <section ref={sectionRefBanner} className="pt-[50px]">
      <div className="container mx-auto">
        <div className="main_content">
          <div ref={mainTxt} className="main_headings">
            <h1 ref={mainHeadingRef} className="text-[60px] uppercase font-semibold max-w-[60%] leading-[70px]">{data?.heading || "Blending Creativity with the Essentials"}</h1>
            <p ref={mainParaRef} className="mt-[40px] max-w-[450px]">{data?.para || "We use the art of storytelling to deliver content and messaging in an experiential way, all underpinned with unique strategic insights."}</p>
          </div>

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