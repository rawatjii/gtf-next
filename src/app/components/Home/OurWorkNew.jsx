"use client";
import { useState, useRef, useEffect, useLayoutEffect } from "react";
import Line from "../Line";
import { MdArrowOutward } from "react-icons/md";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    image:"/assets/home/projects/ekanam/thumbnail.webp",
    category:"Website | Social Media | Paid Ads",
    title:"Ekanam by Great Value Realty",
    video:"assets/home/projects/ekanam/ekanam.mp4"
  },
  {
    image:"/assets/home/projects/trump/thumbnail.jpg",
    category:"Performance Marketing | Brand Video",
    title:"Trump Towers",
    video:"assets/home/projects/trump/trump.mp4"
  },
  {
    image:"/assets/home/projects/eldeco/thumbnail.webp",
    category:"Performance Marketing | Social Media | Branding | Website",
    title:"Eldeco ",
    video:"assets/home/projects/ekayam/ekayam.mp4"
  },
  {
    image:"/assets/home/projects/anant-raj/thumbnail.webp",
    category:"Brand Refresh | Website | Social Media",
    title:"Anant Raj Limited",
    video:"assets/home/projects/anant-raj/anantraj.mp4"
  },
  {
    image:"/assets/home/projects/signature-global/thumbnail.webp",
    category:"Branding | Social Media | Paid Ads",
    title:"Signature Global Infinity Mall",
    video:"assets/home/projects/eternia/eternia.mp4"
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
  const [headingHeight, setHeadingHeight] = useState(0);

  useLayoutEffect(()=>{
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const heading = headingRef.current;
      const projectsContainer = projectsRef.current;
      const headingTxt = headingTxtRef.current;
      const icons = iconsRef.current;

      if(!section || !heading || !projectsContainer) return;

      // Force full refresh after everything is in DOM (critical for mid-page reloads)
      requestAnimationFrame(() => ScrollTrigger.refresh());

      ScrollTrigger.getAll().forEach(t => t.kill());

      setHeadingHeight(heading.offsetHeight);


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
          start: "top 15%",
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
        transform:"translateX(-50%)",
        // xPercent: -50,        // pulls it left by half its width
        // or use x: "-50vw" to move relative to viewport
        ease: "none"
      });
    });



    

    return () => ctx.revert();
  }, [])

  return (
    <section ref={sectionRef} className="border-t  border-[#ddd] relative pb-[150px] pt-[100px] bg-[#fff]">
      <div className="md:px-[50px]">
        <div ref={headingRef} className="heading relative z-[9] table "
         style={{
          left:"50%",
          transform:"translateX(100%)",
          // marginRight:0,
          opacity: 0,
          // transform:`translateY(-${transformValue}px)`
        }}>
          <div className="grid">
            {/* <div ref={iconsRef} className="icons inline-flex items-center justify-center" style={{
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
            </div> */}

            <h3 ref={headingTxtRef} className="text-[220px] neue_font uppercase inline-block w-[max-content] font-semibold text-[#141414]" style={{
              // clipPath:"inset(100% 0% 0% 0%)"
            }}>
              Our Work
            </h3>
          </div>
        </div>

        <div ref={projectsRef} className="relative projects mt-[20vh] z-[10]">
          {projects?.map((project, idx)=>(
            <div key={idx} className={`flex ${idx % 2 ? 'justify-end' : ''} ${idx === 0 ? '' : 'mt-[80px]'}`}>
              <div className="group relative h-[600px] w-[45%] overflow-hidden cursor-pointer cursor-hover">
                <div className="thumbnail absolute h-full w-full group-hover:[filter:blur(10px)] ease-in-out duration-1000">
                  <img
                    src={project.image}
                    alt="project image"
                    className={`img-fluid h-full w-full object-cover  group-hover:[transform:scale(1.2)] ease-in-out duration-1000`}
                  />
                </div>
                <div className="bg_patter absolute top-0 left-0 h-full w-full opacity-0 group-hover:[opacity:0.45] duration-1000"
                  style={{
                    backgroundImage: "url(https://framerusercontent.com/images/azWer5pvSTAicrN1Fi7O5iqZs.gif)",
                    backgroundRepeat: "repeat",
                    backgroundPosition: "left top",
                    border: '0',
                    backgroundSize: "120px auto",
                  }}  
                >
                </div>
                {/* <div className="txt absolute text-[#fff] pt-[30px] px-[30px]">
                  <h3 className="text-[30px]">{project.title}</h3>
                  <h5 className="font-medium text-[18px]">{project.category}</h5>
                </div> */}

                <div className="absolute text-white w-[93%] left-[50%] translate-x-[-50%] top-[20px]">
                  <h3 className="text-[24px]">{project.title}</h3>
                  <p className="text-[16px] tracking-[0.5px]">{project.category}</p>
                </div>

                <div className="video absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[93%] h-auto origin-top transition-clip-path duration-700 ease-in-out [clip-path:inset(0_0_100%_0)] group-hover:[clip-path:inset(0_0_0%_0)]" >
                  <video
                    src={project.video}
                    className="h-full w-full object-contain"
                    controls
                    loop
                    autoPlay
                    playsInline
                    muted
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default OurWork;