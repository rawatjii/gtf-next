"use client";
import { useState, useRef, useEffect } from "react";
import Line from "../Line";
import { MdArrowOutward } from "react-icons/md";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    image:"/assets/home/projects/project1.webp",
  },
  {
    image:"/assets/home/projects/project2.webp",
  },
  {
    image:"/assets/home/projects/project3.webp",
  },
  {
    image:"/assets/home/projects/project4.webp",
  },
]

const OurWork = () => {
  const transformValue = '250';

  // refs for the elements we will animate
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const iconsRef = useRef(null);
  const projectsRef = useRef(null);
  const headingTxtRef = useRef(null);

  useEffect(()=>{
    const section = sectionRef.current;
    const heading = headingRef.current;
    const projectsContainer = projectsRef.current;
    const headingTxt = headingTxtRef.current;
    const icons = iconsRef.current;

    if(!section || !heading || !projectsContainer) return;

    // Measure height AFTER images are loaded (important!)
    const refreshHeight = () => {
      ScrollTrigger.refresh();
    };

    // Ensure images are loaded before calculating height
    const images = projectsContainer.querySelectorAll("img");
    let loadedCount = 0;

    const totalImages = images.length;

    const onImageLoad = ()=>{
      loadedCount++;
      if(loadedCount === totalImages){
        ScrollTrigger.refresh();
      }
    };

    if (totalImages === 0) {
      ScrollTrigger.refresh();
    }else{
      images.forEach((img)=>{
        if(img.complete){
          onImageLoad();
        }else{
          img.addEventListener("load", onImageLoad);
        }
      })
    }


    const tl = gsap.timeline({
      scrollTrigger:{
        trigger:section,
        start: "top 30%",
        end:"bottom bottom",
        // end: () => `+=${projectsContainer.offsetHeight + window.innerHeight}`,
        pin: heading,
        pinSpacing: false,
        scrub: false,               // Keep fade snappy
        markers: false,              // remove in production
        id: "our-work-pin1",
        anticipatePin: 1,
        invalidateOnRefresh: true,

      }
    });

    const tl1 = gsap.timeline({
      scrollTrigger:{
        trigger:section,
        start:"top 50%",
        end:"top 10%",
        pinSpacing:false,
        scrub:1,
      }
    })

    tl1.to(heading, {
      opacity:1,
      xPercent: -50,        // pulls it left by half its width
      // or use x: "-50vw" to move relative to viewport
      ease: "none"
    });

    return () => {
      ScrollTrigger.getById("our-work-pin")?.kill();
      ScrollTrigger.getById("our-work-pin1")?.kill();
    };
  }, [])

  return (
    <section ref={sectionRef} className="relative pb-[150px] pt-[100px] bg-[#f7f7f7]">
      <div>
        <div ref={headingRef} className="heading relative z-[9] table ml-auto"
         style={{
          marginRight:0,
          opacity: 0,
          // transform:`translateY(-${transformValue}px)`
        }}>
          <div className="grid">
            <div ref={iconsRef} className="icons inline-flex items-center justify-center" style={{
              // clipPath:"inset(100% 0% 0% 0%)"
            }}>
              <span className="icon pink">
                <img
                  src="/assets/logos/pink_color.svg"
                  alt="pink logo icon"
                  className="img-fluid w-[60px]"
                />
              </span>
              <span className="icon yellow ml-[-10px]">
                <img
                  src="/assets/logos/yellow_color.svg"
                  alt="yellow logo icon"
                  className="img-fluid w-[60px]"
                />
              </span>
              <span className="icon pink ml-[-10px]">
                <img
                  src="/assets/logos/blue_color.svg"
                  alt="blue logo icon"
                  className="img-fluid w-[60px]"
                />
              </span>
            </div>

            <h3 ref={headingTxtRef} className="text-[250px] bebas uppercase inline-block" style={{
              // clipPath:"inset(100% 0% 0% 0%)"
            }}>
              Our Work
            </h3>
          </div>
        </div>

        <div ref={projectsRef} className="relative projects mt-[20vh] z-[10]">
          {projects?.map((project, idx)=>(
            <div key={idx}>
              <img
                src={project.image}
                alt="project image"
                className={`img-fluid w-[45%] ${idx % 2 ? 'ml-auto' : ''}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurWork;