"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, SplitText);

const words = [
  "GTF",
  " ",
  "Technologies",
  " ",
  "is",
  " ",
  "conceptualized",
  " ",
  "from",
  " ",
  "Gurukul",
  " ",
  "The",
  " ",
  "Foundation.",
  " ",
  "We",
  " ",
  "are",
  " ",
  "a",
  " ",
  "16-year-old",
  " ",
  "branding",
  " ",
  "and",
  " ",
  "digital",
  " ",
  "media",
  " ",
  "planning",
  " ",
  "agency",
  " ",
  "headquartered",
  " ",
  "in",
  " ",
  "Noida,",
  " ",
  "Mumbai,",
  " ",
  "Pune,",
  " ",
  "and",
  " ",
  "an",
  " ",
  "upcoming",
  " ",
  "office",
  " ",
  "in",
  " ",
  "Bangalore.",
  " ",
  "GTF",
  " ",
  "Technologies",
  " ",
  "is",
  " ",
  "conceptualized",
  " ",
  "from",
  " ",
  "Gurukul",
  " ",
  "The",
  " ",
  "Foundation.",
  " ",
  "GTF",
  " ",
  "Technologies",
  " ",
  "is",
  " ",
  "conceptualized",
  " ",
  "from",
  " ",
  "Gurukul",
  " ",
  "The",
  " ",
  "Foundation.",
  " ",
];

const WhoWeAre = () => {
  const textRef = useRef([]);
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const imagesRef = useRef([]);
  const headingRef = useRef(null);
  const overviewData = useRef(null);
  const backgroundColorRef = useRef(null);

  useEffect(() => {

    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const container = containerRef.current;
      const images = imagesRef.current;
      const ov_data = overviewData.current;
      const bgColorRef = backgroundColorRef.current;
      
      const otherText = section.querySelector(".other_txt");

      if (!section || !container || !images) return;

      // Initial states for animations

      const hides = section.querySelectorAll(".hide");
      const scrollWidth = section.scrollWidth;
      const windowWidth = window.innerWidth;
      const maxTranslateX = scrollWidth - windowWidth;
      const heading = headingRef.current;

      gsap.set(hides, { display: "inline-block", marginRight: "30px" });
      gsap.set(otherText, { width: 0, opacity: 0, display: "inline-block" });
      gsap.set(images, {opacity: 0, y: 50, clipPath: "inset(50% 0 50% 0)",});
      

      const splitInstances = textRef.current
        .filter(Boolean)
        .map((ref) => new SplitText(ref, { type: "chars" }));
      const allChars = splitInstances.flatMap((split) => split.chars);

      
      gsap.set(allChars, {opacity:0});
      gsap.set(ov_data, {height:0});
      

      const animatedIndices = [];

      const tl = gsap.timeline({
        scrollTrigger: {
          id: "whoWeAreTrigger",
          trigger: container,
          start: "top top",
          end: () => `+=${maxTranslateX * 8 + 100}`,
          pin: true,
          markers:false,
          scrub: 1,
          pinSpacing: true,
        },  
      });

      tl.to(hides, {
        autoAlpha:0,
        duration:0.2,
        stagger:0.05,
        ease:"power2"
      }, "+=0.5").
      to(hides, {
        width: 0,
        marginRight:0,
        duration: 0.3,
        ease:"power2"
      },  "+=0.2").
      to(otherText, { marginLeft:'25px', opacity: 1, width: "auto", duration: 0.2 }, "+=0.5").
      // to(allChars, {display:'inline-block', duration:5, ease:"power2"}, "+=4").
      to(ov_data, {height:'auto', duration:0.2, ease:"power2"}, "+=0.3").
      to(heading, {left:0, transform:"unset", lineHeight:'70px', fontSize:'60px', duration:0.2, ease:"power2"}, "+=0.5").
      to(heading, {autoAlpha:0, duration:0.2, ease:"power2"}).
      to(allChars, {opacity:0.2, duration:0.2, ease:"power2"}, "-=0.3").
      to(allChars, {opacity: 1, scrub: 0.5, stagger: 0.08, ease: "none"}, "+=0.5")
      .to(
        section,
        {
          x: -maxTranslateX,
          ease: "power1.out",
          duration: 6, 
          onUpdate: function () {
            images.forEach((image, index) => {
              if (animatedIndices.includes(index)) return;
              const rect = image.getBoundingClientRect();
              if (rect.right > 0 && rect.left < window.innerWidth) {
                gsap.to(image, {
                  opacity: 1,
                  y: 0,
                  clipPath: "inset(0% 0 0% 0)",
                  duration: 2,
                  delay: 0.3,
                  ease: "power3.out",
                  overwrite: true,
                  onStart: () => {
                    gsap.set(image, {
                      y: -200,
                      clipPath: "polygon(54% 100%, 0% 100%, 100% 100%)",
                    });
                  },
                });
                animatedIndices.push(index);
              }
            });
          },
          onComplete: () => ScrollTrigger.refresh(),
        },
        "-=1.5"
      );

      // gsap.to("body", {

      //   scrollTrigger: {
      //     trigger: bgColorRef,
      //     start: "top 50%", // Trigger when bgColorRef reaches 50% of the viewport height
      //     end: "bottom top",
      //     scrub: true, // Smooth transition while scrolling
      //     markers: true, // Set to false when you're ready to go live
      //     onEnter: () => {
      //       document.querySelector('body').style.backgroundColor='#d93f92',
      //       document.querySelector('body').style.trasition = '0.4s all'
      //     },
      //     onLeave: () => {
      //       // Optional: Revert the color if needed
      //       gsap.to("body", { backgroundColor: "transparent" });
      //     },
      //   },
      // });

      ScrollTrigger.refresh();
    }, containerRef);


    return () => ctx.revert();
    
    // Cleanup function
    // return () => {
    //   ScrollTrigger.refresh();
    //   const mainTrigger = ScrollTrigger.getById("whoWeAreTrigger");
    //   mainTrigger?.kill();
    //   tl.kill();
    //   splitInstances.forEach((split) => split.revert());
    //   ScrollTrigger.refresh();
    //   images.forEach((image) => {
    //     if (image.parentNode) image.parentNode.style.overflow = "";
    //   });
    // };
  }, []); 

  
  return (
    <section className="w-full relative  mix-blend-multiply overflow-hidden">
      <div ref={containerRef} className="pin-container">
        <section className="flex flex-row  uppercase h-screen  main-container-scroll no-scrollbar min-w-[430vw] relative">
          <div
            ref={sectionRef} 
            className="main-container-scroll  no-scrollbar flex h-screen will-change-transform"
            style={{
              display: "flex",
              width: "fit-content",
              willChange: "transform",
            }}
          >
            {/* Left Text Section */}
            <div className="flex flex-row bg-gtf-pink justify-between h-full  min-w-[100vw]">
              <div className="grid grid-cols-12 items-center  gap-[40px]">
                <div className="w-[100vw]  col-span-12 pt-[20px] px-[35PX]">
                  <h2 className="mb-[50px] text-center bartino-outline tracking-[2px] 2xl:text-[50px] lg:text-[62px] md:text-[50px] text-[32px] block">
                    Who We Are?
                  </h2>
                  <div className="relative">

                  <h4 ref={headingRef} className="font-[Oswald] js-title text-center text-[70px] font-bold absolute left-[50%] -translate-x-[50%] w-[max-content]">G<span className="hide">urukul </span>T<span className="hide">he </span>F<span className="hide" >oundation </span><span className="other_txt">Technologies</span></h4>

                  <div ref={overviewData}>
                  {words.map((word, index) => (
                    <p
                      ref={(el) => (textRef.current[index] = el)}
                      key={index}
                      className="font-[Oswald] pr-[8px] 2xl:leading-[1.2] lg:leading-[1.4] tracking-[-2.5px] font-[700] 2xl:text-[60px] xl:text-[48px] text-[32px] inline-block"
                    >
                      {word}
                    </p>
                  ))}
                  </div>
                  </div>
                </div>
              </div>
            </div>
            {/* First Image Section */}
            <div className="flex flex-row items-center relative pl-[13rem]">
              <img
                ref={(el) => (imagesRef.current[0] = el)}
                className=" xl:h-[390px] 2xl:h-auto object-cover inline-block ml-[4rem] mr-[1rem] mt-[2.5rem] w-[365px] border-[4px] border-solid !rotate-[-6deg] border-black"
                src="/assets/home/who_we_are/img1.webp"
                alt="Team member working on a project"
              />
              <img
                ref={(el) => (imagesRef.current[1] = el)}
                className=" xl:h-[480px] 2xl:h-auto object-cover inline-block w-[365px] mr-[10rem] border-[4px] border-solid border-black"
                src="/assets/home/who_we_are/img2.webp"
                alt="Creative brainstorming session"
              />
              <div className="basis-[100%] pr-[50px] pl-[20px]">
                <h3 className="font-[Oswald] text-[70px] mb-[1rem] font-[600]">
                  CHORDIA'S
                </h3>
                <p className="text-[16px] tracking-[0.5px] leading-[23px]">
                  When an unknown printer took a gallery of type and scrambled
                  it to
                </p>
              </div>
              <img
                ref={(el) => (imagesRef.current[2] = el)}
                className="object-cover relative top-[-20px] 2xl:h-auto inline-block top-[-70px]  right-[-90px] !rotate-[-5deg]  z-[1] xl:h-[360px] w-[365px] border-[4px] border-solid border-black"
                src="/assets/home/who_we_are/absolute_img.webp"
                alt="GTF Technologies office environment"
              />
              <img
                ref={(el) => (imagesRef.current[3] = el)}
                className=" object-cover inline-block w-[365px] 2xl:h-auto xl:h-[480px] border-[4px] border-solid border-black"
                src="/assets/home/who_we_are/img3.webp"
                alt="GTF Technologies office environment"
              />
            </div>
            <div className="flex flex-row lg:pl-[13rem] pr-[2rem]  items-center ">
              <div className="w-[850px] mr-[11rem]">
                <h3 className="font-[Oswald] xl:text-[35px] 2xl:text-[44px] mb-[1rem] font-bold">
                  WHEN UNKNOWN PRINTER <br /> TOOK A GALLERY
                </h3>
                <p className="font-[Oswald]  font-[400] xl:text-[25px] 2xl-text-[28px] mb-[1rem]">
                  MAKE A TYPE SPECIMEN BOOK
                </p>
                <p className="xl:text-[13px] 2xl:text-[16px]  leading-[23px] text-right mt-[30px] ">
                  <span className="block">
                    When an unknown printer took a gallery of type and scrambled
                    it to
                  </span>
                  <span className="block">
                    make a type specimen book. It has survived not only five
                    centuries
                  </span>
                </p>
              </div>
              <img
                className=" object-cover inline-block 2xl:h-auto mt-[2.3rem] mr-[1.35rem] w-[365px] border-[4px] border-solid rotate-[-6deg] border-black"
                ref={(el) => (imagesRef.current[3] = el)}
                src="/assets/home/who_we_are/img4.webp"
                alt="Digital media planning in action"
              />
              <img
                ref={(el) => (imagesRef.current[4] = el)}
                className=" object-cover inline-block 2xl:h-auto w-[365px] mr-[4rem] border-[4px] border-solid border-black"
                src="/assets/home/who_we_are/thumb1.webp"
                alt="Branding project showcase"
              />
            </div>
          </div>
        </section>
      </div>
      {/* <div  ref={backgroundColorRef} className="absolute top-0 left-0 w-full h-full"></div> */}
    </section>
  );
};

export default WhoWeAre;
