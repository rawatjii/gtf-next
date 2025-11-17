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

    // === FADE IN ANIMATION (Fast, only at start) ===

    // gsap.fromTo(
    //   heading,
    //   { 
    //     opacity: 0,
    //     // transform:translateY(0),
    //   },
    //   {
    //     opacity: 1,
    //     // transform:translateY(0),
    //     duration: 0.6,
    //     ease: "none",
    //     scrollTrigger: {
    //       trigger: section,
    //       pin:heading,
    //       start: "top 50%", // Start fade earlier for snappier feel
    //       end: "top -5%",   // Complete fade quickly
    //       scrub: 1,     // Immediate, not scrubbed
          
    //     },
    //   }
    // );

    const tl = gsap.timeline({
      scrollTrigger:{
        trigger:section,
        start: "top 50%",
        end:"bottom bottom",
        // end: () => `+=${projectsContainer.offsetHeight + window.innerHeight}`,
        pin: heading,
        pinSpacing: false,
        scrub: false,               // Keep fade snappy
        markers: false,              // remove in production
        id: "our-work-pin",
        anticipatePin: 1,
        invalidateOnRefresh: true,

        onEnter: () => {
          // Scrolling DOWN → entering the section for the first time
          gsap.to(heading, { opacity: 1, duration: 0.6, ease: "none" });
        },

        onLeave: () => {
          // Scrolling DOWN → leaving the section at the bottom (onEnd)
          gsap.to(heading, { opacity: 0, duration: 0.6, ease: "none" });
        },

        onEnterBack: () => {
          // Scrolling UP → re-entering from the bottom
          gsap.to(heading, { opacity: 1, duration: 0.6, ease: "none" });
        },
    
        onLeaveBack: () => {
          // Scrolling UP → leaving towards the top
          gsap.to(heading, { opacity: 0, duration: 0.5, ease: "none" });
        },

        onRefresh: () => {
          if (ScrollTrigger.isInViewport(section)) {
            gsap.set(heading, { opacity: 1 });
          } else {
            gsap.set(heading, { opacity: 0 });
          }
        },

      }

      
    });

    // tl.fromTo(heading, 
    //   { opacity: 0 },
    //   { opacity: 1, duration: 0.6, ease: "none" }
    // );

    gsap.set(heading, { opacity: 0 });

    return () => {
      ScrollTrigger.getById("our-work-pin")?.kill();
    };
  }, [])

  return (
    <section ref={sectionRef} className="relative pb-[150px]">
      <div>
        <div ref={headingRef} className="heading z-[-1]"
         style={{
          opacity: 0,
          // transform:`translateY(-${transformValue}px)`
        }}>
          <div ref={iconsRef} className="icons flex items-center justify-center">
            <span className="icon pink">
              <img
                src="/assets/logos/pink_color.svg"
                alt="pink logo icon"
                className="img-fluid w-[40px]"
              />
            </span>
            <span className="icon yellow ml-[-10px]">
              <img
                src="/assets/logos/yellow_color.svg"
                alt="yellow logo icon"
                className="img-fluid w-[40px]"
              />
            </span>
            <span className="icon pink ml-[-10px]">
              <img
                src="/assets/logos/blue_color.svg"
                alt="blue logo icon"
                className="img-fluid w-[40px]"
              />
            </span>
          </div>

          <h3 ref={headingTxtRef} className="text-[150px] bartino-outline uppercase text-center">Our Work</h3>
        </div>

        <div ref={projectsRef} className="relative projects mt-[20vh]">
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