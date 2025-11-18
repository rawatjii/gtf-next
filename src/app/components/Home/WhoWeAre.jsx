"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, SplitText);

const lines = [
  [
    "Born",
    " ",
    "from",
    " ",
    "Gurukul",
    " ",
    "The",
    " ",
    "Foundation,",
    " ",
    "We",
    " ",
    "are",
    " ",
    "a",
    " ",
    "Made-in-India",
    " ",
    "company",
    " ",
    "shaping",
    " ",
    "brands",
    " ",
    "for",
    " ",
    "a",
    " ",
    "world",
    " ",
    "that",
    " ",
    "never",
    " ",
    "stands",
    " ",
    "still.",
    " ",
    "We",
    " ",
    "create",
    " ",
    "ideas",
    " ",
    "that",
    " ",
    "move",
    " ",
    "people",
    " ",
    "and",
    " ",
    "markets.",
]
];

const WhoWeAre = () => {
  const textRef = useRef([]);
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const imagesRef = useRef([]);
  const headingRef = useRef(null);
  const mainHeadingRef = useRef(null);
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
      const mainHeading = mainHeadingRef.current;

      gsap.set(hides, { display: "inline-block", marginRight: "30px" });
      gsap.set(otherText, { width: 0, opacity: 0, display: "inline-block" });
      gsap.set(images, { opacity: 0, y: 50, clipPath: "inset(50% 0 50% 0)" });
      gsap.set(heading, {opacity:0, })
      

      const splitInstances = textRef.current
        .filter(Boolean)
        .map(
          (ref) => new SplitText(ref, { type: "chars", charsClass: "char" })
        );
      const allChars = splitInstances.flatMap((split) => split.chars);

      gsap.set(allChars, { opacity: 0 });
      gsap.set(ov_data, { height: 0 });

      const animatedIndices = [];

      const tl = gsap.timeline({
        scrollTrigger: {
          id: "whoWeAreTrigger",
          trigger: container,
          start: "top top",
          end: () => `+=${maxTranslateX * 5 + 100}`,
          pin: true,
          markers: false,
          scrub: 1,
          pinSpacing: true,
        },
      });

      tl.to(
        mainHeading,
        {
          fontSize:"80px",
          left:'0',
          transform:'translateX(0)',
          duration:0.1,
          // scrub:1,
          // ease: "power2",
        },
        "+=0.1"
      )

      tl.to(
        heading,
        {
          autoAlpha:1,
          duration: 0.2,
          ease: "power2",
        }
      )

      tl.to(
        hides,
        {
          autoAlpha: 0,
          duration: 0.1,
          stagger: 0.05,
          ease: "power2",
        },
        "+=0.05"
      )
        .to(
          hides,
          {
            width: 0,
            marginRight: 0,
            duration: 0.05,
            ease: "power2",
          },
          "+=0.05"
        )
        .to(
          otherText,
          { marginLeft: "25px", opacity: 1, width: "auto", duration: 0.2 },
          "+=0.05"
        )
        // to(allChars, {display:'inline-block', duration:5, ease:"power2"}, "+=4").
        .to(ov_data, { height: "auto", duration: 0.1, ease: "power2" }, "+=0.05")
        // to(heading, {left:0, transform:"unset", lineHeight:'70px', fontSize:'60px', duration:0.2, ease:"power2"}, "+=0.5").
        .to(heading, { autoAlpha: 0, duration: 0.1, ease: "power2" })
        .to(allChars, { opacity: 0.2, duration: 0.2, ease: "power2" }, "-=0.1")
        .to(allChars, {
          opacity: 1,
          duration: 0.02,
          stagger: 0.008,
          ease: "power2.out",
          immediateRender: false,
        })
        .to(section, {
          x: -maxTranslateX,
          // ease: "power4",
          duration: 1,
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
        });

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
        <div className="flex flex-row h-screen  main-container-scroll no-scrollbar min-w-[430vw] relative">
          <div
            ref={sectionRef}
            className="main-container-scroll  no-scrollbar flex h-screen will-change-transform"
            style={{
              display: "flex",
              // width: "fit-content",
              willChange: "transform",
            }}
          >
            {/* Left Text Section */}
            {/* bg-gtf-pink */}
            <div className="flex flex-row justify-between h-full bg-gtf-pink min-w-[100vw]"> 
              <div className="grid grid-cols-12 items-center  gap-[40px]">

                <div className="w-[100vw] md:px-[50px] px-[15px] col-span-12 pt-[20px] max-w-[80%] mx-auto">
                  <h2 ref={mainHeadingRef} className="relative mb-[30px] uppercase bebas tracking-[2px] 2xl:text-[140px] md:text-[80px] text-[32px] inline-block left-[50%] -translate-x-1/2">
                    Who We Are?
                  </h2>

                  <div className="relative mx-auto">
                    <h4
                      ref={headingRef}
                      className="montserrat uppercase js-title text-[40px] font-bold absolute w-[max-content]"
                      style={{
                        opacity:0,
                      }}
                    >
                      G<span className="hide">urukul </span>T
                      <span className="hide">he </span>F
                      <span className="hide">oundation </span>
                      <span className="other_txt">Technologies</span>
                    </h4>

                    <div
                      ref={overviewData}
                      className="flex flex-col items-center space-y-2 gap-[25px]"
                    >
                      {lines.map((line, lineIndex) => (
                        <div
                          key={lineIndex}
                          ref={(el) => (textRef.current[lineIndex] = el)} // One ref per line
                          className="flex flex-wrap justify-left text-left"
                        >
                          {line.map((word, wordIndex) => (
                            <span
                              key={wordIndex}
                              className="montserrat font-medium pr-[8px] 2xl:leading-[1.2] lg:leading-[1.4] tracking-[-2.5px] 2xl:text-[40px] xl:text-[48px] text-[32px] inline-block text-left"
                            >
                              {word}
                            </span>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>
            {/* First Image Section */}

            <div className="flex items-center relative pl-[13rem] min-w-[fit-content]">
              <div className="pr-[50px] pl-[20px]">
                <h3 className="montserrrat uppercase text-[50px] font-bold mb-[1rem] font-[600] w-[max-content]">
                Built to Disrupt <span className="block">the Ordinary</span>
                </h3>
              </div>

              <div>
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
            </div>

            <div className="flex flex-row items-center relative pl-[13rem] min-w-[fit-content]">
              <div className="basis-[100%] pr-[50px] pl-[20px]">
                <h5 className="montserrat text-[34px] mb-[1rem] font-[600]">
                Not a Team. <span className="block text-[50px] uppercase font-bold">A task force </span>
                </h5>
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

            <div className="flex flex-row items-center relative pl-[13rem] min-w-[fit-content]">
              <div className="basis-[100%] pr-[50px] pl-[20px]">
                <h5 className="text-[50px] mb-[1rem]  text-[50px] font-semibold">
                Wired to help brands <span className="block">move ahead of the market.</span>
                </h5>
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

          </div>
        </div>
      </div>
      {/* <div  ref={backgroundColorRef} className="absolute top-0 left-0 w-full h-full"></div> */}
    </section>
  );
};

export default WhoWeAre;
