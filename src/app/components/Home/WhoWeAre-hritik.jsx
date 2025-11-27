// "use client";
// import { useRef, useEffect } from "react";
// import gsap from "gsap";
// import { SplitText } from "gsap/SplitText";
// import ScrollTrigger from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger, SplitText);

// const lines = [
//   [
//     "Born",
//     " ",
//     "from",
//     " ",
//     "Gurukul",
//     " ",
//     "The",
//     " ",
//     "Foundation,",
//     " ",
//     "We",
//     " ",
//     "are",
//     " ",
//     "a",
//     " ",
//     {
//       word: "Made-in-India",
//       className: "highlightWord",
//       sibling: "/assets/home/who_we_are/line.svg",
//       imgClass: "!h-[170%] !top-[-40%]",
//     },
//     " ",
//     "company",
//     " ",
//     "shaping",
//     " ",
//     "brands",
//     " ",
//     "for",
//     " ",
//     "a",
//     " ",
//     "world",
//     " ",
//     "that",
//     " ",
//     "never",
//     " ",
//     "stands",
//     " ",
//     "still.",
//     " ",
//     "We",
//     " ",
//     "create",
//     " ",
//     "ideas",
//     " ",
//     "that",
//     " ",
//     "move",
//     " ",
//     "people",
//     " ",
//     "and",
//     " ",
//     "markets.",
//   ],
// ];

// const WhoWeAre = () => {
//   const textRef = useRef([]);
//   const sectionRef = useRef(null);
//   const containerRef = useRef(null);
//   const imagesRef = useRef([]);
//   const headingRef = useRef(null);
//   const mainHeadingRef = useRef(null);
//   const mainContentRef = useRef(null);

//   const overviewData = useRef(null);
//   const backgroundColorRef = useRef(null);
//   const imageSectionRef = useRef(null);
//   const otherSectionRef = useRef(null);
//   const svgRefs = useRef([]);
//   const pinImageRef = useRef(null);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       const container = containerRef.current;
//       const section = sectionRef.current;
//       const otherSection = otherSectionRef.current;

//       const getMaxX = () => section.scrollWidth - window.innerWidth;
//       const splits = textRef.current
//         .filter(Boolean)
//         .map((el) => new SplitText(el, { type: "chars" }));
//       const chars = splits.flatMap((s) => s.chars);

//       gsap.set(overviewData.current, { height: 0 });
//       gsap.set(chars, { opacity: 0, transform: "translateY(30px)" });

//       const whoWeAreTimeline = gsap.timeline({
//         scrollTrigger: {
//           id: "whoWeAreTrigger",
//           trigger: container,
//           start: "top 50%",
//           end: "top 0",
//           markers: false,
//           scrub: 1,
//           toggleActions: "play none none none",
//         },
//       });

//       whoWeAreTimeline.to(mainContentRef.current, {
//         marginTop: "0",
//         scrub: 1,
//       });

//       const tl = gsap
//         .timeline({
//           scrollTrigger: {
//             trigger: container.current,
//             end: "+=1000",
//             pin: true,
//             scrub: 0.5,
//             once: true,
//             anticipatePin: 1,
//             invalidateOnRefresh: true,
//           },
//           defaults: { ease: "power3.out" },
//         })
//         .to(mainHeadingRef.current, {
//           fontSize: "80px",
//           left: 0,
//           x: 0,
//           duration: 1.2,
//         })
//         .to(mainContentRef.current, { marginTop: 0, duration: 1 }, "-=0.8")
//         .to(overviewData.current, { height: "auto", duration: 0.8 }, "-=0.6")
//         .to(chars, {
//           y: 0,
//           opacity: 0.2,
//           duration: 0.6,
//           ease: "power2.out",
//         })
//         .to(svgRefs.current, { opacity: 1, stagger: 0.1, duration: 0.8 })
//         .to(chars, {
//           opacity: 1,
//           duration: 1.6,
//           stagger: 0.03,
//           ease: "power2.out",
//         })
//         .add(() => {
//           splits.forEach((s) => s.revert());
//         });

//       gsap.to(section, {
//         x: () => -getMaxX(),
//         ease: "none",
//         scrollTrigger: {
//           trigger: container,
//           start: "top top",
//           end: () => `+=${getMaxX() + window.innerWidth}`,
//           pin: true,
//           scrub: 1,
//           anticipatePin: 1,
//           invalidateOnRefresh: true,
//           pinType: "transform",
//           // onUpdate: (self) => {
//           //   // Check if otherSection has reached left 0 in the viewport
//           //   const rect = otherSection.getBoundingClientRect();

//           //   // If the left side of otherSection is at 0, trigger the alert
//           //   if (rect.left <= 0) {
//           //     alert('otherSection has reached left 0 in the viewport!');
//           //   }
//           // },
//         },
//       });

//       const tl2 = gsap.timeline({
//         scrollTrigger: {
//           trigger: otherSection,
//           start: () => tl.scrollTrigger.end,
//           end: "+=3000",
//           pin: true,
//           pinSpacing: true,
//           scrub: 1,
//           markers: false,
//           anticipatePin: 1,
//         },
//       });

//       // ADD THIS: Detect when otherSectionRef enters from the right
//       // if (otherSectionRef.current) {
//       //   ScrollTrigger.create({
//       //     trigger: otherSectionRef.current,
//       //     start: "left center",
//       //     // end: "right left", // optional: longer trigger zone
//       //     markers: true,
//       //     onEnter: () => {
//       //       alert("Welcome to the next chapter! Other section is now visible.");
//       //       console.log("otherSectionRef reached left:0");
//       //       // You can now safely trigger any animation here
//       //     },
//       //     // Optional: reverse behavior
//       //     onLeaveBack: () => {
//       //       console.log("Scrolled back — leaving otherSectionRef");
//       //     }
//       //   });
//       // }

//       // IMAGE REVEALS (once per image)
//       imagesRef.current.forEach((img, i) => {
//         ScrollTrigger.create({
//           trigger: img,
//           start: "top 90%",
//           once: true,
//           onEnter: () => {
//             gsap.to(img, {
//               opacity: 1,
//               y: 0,
//               clipPath: "inset(0% 0 0% 0)",
//               duration: 1.6,
//               ease: "power3.out",
//             });
//           },
//         });
//       });
//     }, containerRef);

//     return () => ctx.revert();
//   }, []);

//   // useEffect(() => {
//   //   const ctx = gsap.context(() => {
//   //     const section = sectionRef.current;
//   //     const container = containerRef.current;
//   //     const images = imagesRef.current;
//   //     const ov_data = overviewData.current;
//   //     const bgColorRef = backgroundColorRef.current;
//   //     const imageSection = imageSectionRef.current;
//   //     const svg = svgRefs.current;

//   //     const otherText = section.querySelector(".other_txt");

//   //     if (!section || !container || !images) return;

//   //     // Initial states for animations

//   //     const hides = section.querySelectorAll(".hide");
//   //     const scrollWidth = section.scrollWidth;
//   //     const windowWidth = window.innerWidth;
//   //     const maxTranslateX = scrollWidth - windowWidth;
//   //     const heading = headingRef.current;
//   //     const mainHeading = mainHeadingRef.current;
//   //     const mainContent = mainContentRef.current;

//   //     gsap.set(hides, { display: "inline-block", marginRight: "30px" });
//   //     gsap.set(otherText, { width: 0, opacity: 0, display: "inline-block" });
//   //     gsap.set(images, { opacity: 0, y: 50, clipPath: "inset(50% 0 50% 0)" });
//   //     // gsap.set(heading, { opacity: 0 });

//   //     const splitInstances = textRef.current
//   //       .filter(Boolean)
//   //       .map(
//   //         (ref) => new SplitText(ref, { type: "chars", charsClass: "char" })
//   //       );
//   //     const allChars = splitInstances.flatMap((split) => split.chars);

//   //     gsap.set(allChars, { opacity: 0, transform:"translateY(30px)" });
//   //     gsap.set(ov_data, { height: 0 });

//   //     const animatedIndices = [];

//   //     const whoWeAreTimeline = gsap.timeline({
//   //       scrollTrigger: {
//   //         id: "whoWeAreTrigger",
//   //         trigger: container,
//   //         start: "top 50%",
//   //         end: "top 0",
//   //         markers: false,
//   //         scrub: 1,
//   //         toggleActions: "play none none none",
//   //       },
//   //     });

//   //     whoWeAreTimeline.to(mainContent, {
//   //       marginTop: "0",
//   //       scrub: 1,
//   //     });

//   //     // ONE-TIME TEXT REVEAL (Never reverses!)

//   //     const revealTrigger = ScrollTrigger.create({
//   //       trigger: container,
//   //       start: "top top",
//   //       once: true,
//   //       onEnter:()=>{
//   //         gsap.timeline()
//   //         .to(mainHeading, {
//   //           fontSize: "80px",
//   //           left: 0,
//   //           x: 0,
//   //           duration: 1.2,
//   //           ease: "power3.out"
//   //         })
//   //         .to(mainContent, { marginTop: 0, duration: 1 }, "-=0.8")
//   //         .to(ov_data, { height: "auto", duration: 0.8 }, "-=0.6")
//   //         .to(allChars, { y: 0, opacity: 0.2, duration: 0.6 }, "-=0.4")
//   //         .to(svg, { opacity: 1, stagger: 0.1, duration: 0.8 }, "-=0.4")
//   //         .to(allChars, {
//   //           opacity: 1,
//   //           duration: 1.6,
//   //           stagger: { each: 0.03, from: "start" },
//   //           ease: "power2.out"
//   //         }, "-=1.2");
//   //       }
//   //     })

//   //     // const tl = gsap.timeline({
//   //     //   scrollTrigger: {
//   //     //     id: "whoWeAreTrigger",
//   //     //     trigger: container,
//   //     //     start: "top top",
//   //     //     end: () => `+=${maxTranslateX + window.innerWidth}`,
//   //     //     pin: true,
//   //     //     markers: false,
//   //     //     scrub: true,
//   //     //     toggleActions: "play none none none",
//   //     //     pinSpacing: true,
//   //     //   },
//   //     // })

//   //     // tl.to(
//   //     //   mainHeading,
//   //     //   {
//   //     //     fontSize: "80px",
//   //     //     left: "0",
//   //     //     transform: "translateX(0)",
//   //     //     duration: 0.1,
//   //     //     // scrub:1,
//   //     //     // ease: "power2",
//   //     //   },
//   //     //   "+=0.1"
//   //     // )

//   //     // tl.to(heading, {
//   //     //   autoAlpha: 1,
//   //     //   duration: 0.2,
//   //     //   ease: "power2",
//   //     // });

//   //     // tl.to(
//   //     //   hides,
//   //     //   {
//   //     //     autoAlpha: 0,
//   //     //     duration: 0.1,
//   //     //     stagger: 0.05,
//   //     //     ease: "power2",
//   //     //   },
//   //     //   "+=0.05"
//   //     // )
//   //       // .to(
//   //       //   hides,
//   //       //   {
//   //       //     width: 0,
//   //       //     marginRight: 0,
//   //       //     duration: 0.05,
//   //       //     ease: "power2",
//   //       //   },
//   //       //   "+=0.05"
//   //       // )
//   //       // .to(
//   //       //   otherText,
//   //       //   { marginLeft: "25px", opacity: 1, width: "auto", duration: 0.2 },
//   //       //   "+=0.05"
//   //       // )
//   //       // to(allChars, {display:'inline-block', duration:5, ease:"power2"}, "+=4").
//   //       // .to(
//   //       //   ov_data,
//   //       //   { height: "auto", duration: 0.1, ease: "power2" },
//   //       //   "+=0.05"
//   //       // )
//   //       // to(heading, {left:0, transform:"unset", lineHeight:'70px', fontSize:'60px', duration:0.2, ease:"power2"}, "+=0.5").
//   //       // .to(heading, { autoAlpha: 0, duration: 0.1, ease: "power2" })
//   //       // .to(allChars, {y:0, opacity: 0.2, duration: 0.2, ease: "power2" }, "-=0.1")
//   //       // .to(svg, {
//   //       //   opacity: 1,
//   //       //   stagger: 0.1,
//   //       //   duration: 0.8
//   //       // }, "-=0.6")
//   //       // .to(allChars, {
//   //       //   opacity: 1,
//   //       //   duration: 1.6,
//   //       //   stagger: { each: 0.03, from: "start" },
//   //       //   ease: "power2.out"
//   //       // }, "-=1.2");
//   //       // This is the key: a NON-scrubbed nested timeline for the reveal
//   //       // .add(()=>{
//   //       //   gsap.timeline()
//   //       //   .to(svg, {
//   //       //     opacity:1,
//   //       //     stagger:0.1,
//   //       //     // duration:0.2,
//   //       //     ease:"none",
//   //       //   })
//   //       //   .to(allChars, {
//   //       //     opacity: 1,
//   //       //     duration: 5,
//   //       //     stagger: {
//   //       //       each:0.05,
//   //       //       from: "start"
//   //       //     },
//   //       //     ease: "power2.out",
//   //       //   }, "-=0.4")
//   //       // })

//   //       // HORIZONTAL SCROLL (Reverses normally — smooth scrub)

//   //       // const horizontalTrigger = ScrollTrigger.create({
//   //       //   trigger: container,
//   //       //   start: "top top",
//   //       //   end: () => `+=${maxTranslateX + window.innerWidth}`,
//   //       //   pin: true,
//   //       //   scrub: true,                    // Smooth + reverses naturally
//   //       //   anticipatePin: 1,
//   //       //   invalidateOnRefresh: true,
//   //       //   onUpdate: (self) => {
//   //       //     const progress = self.progress;
//   //       //     gsap.to(section, {
//   //       //       x: -maxTranslateX * progress,
//   //       //       ease: "none",
//   //       //       overwrite: "auto"
//   //       //     });

//   //       //     // Image reveal on enter (only once per image)
//   //       //     imagesRef.current.forEach((img, i) => {
//   //       //       if (animatedImages.has(i)) return;
//   //       //       const rect = img.getBoundingClientRect();
//   //       //       if (rect.right > 0 && rect.left < winWidth) {
//   //       //         gsap.to(img, {
//   //       //           opacity: 1,
//   //       //           y: 0,
//   //       //           clipPath: "inset(0% 0 0% 0)",
//   //       //           duration: 1.4,
//   //       //           ease: "power3.out"
//   //       //         });
//   //       //         animatedImages.add(i);
//   //       //       }
//   //       //     });
//   //       //   }
//   //       // })

//   //       // Image reveals (trigger once when in view)

//   //       // .to(section, {
//   //       //   x: -maxTranslateX,
//   //       //   // ease: "power4",
//   //       //   ease: "none",
//   //       //   duration: 1,
//   //       //   onUpdate: function (x) {
//   //       //     images.forEach((image, index) => {
//   //       //       if (animatedIndices.includes(index)) return;
//   //       //       const rect = image.getBoundingClientRect();
//   //       //       if (rect.right > 0 && rect.left < window.innerWidth) {
//   //       //         gsap.to(image, {
//   //       //           opacity: 1,
//   //       //           y: 0,
//   //       //           clipPath: "inset(0% 0 0% 0)",
//   //       //           duration: 2,
//   //       //           delay: 0.3,
//   //       //           ease: "power3.out",
//   //       //           overwrite: true,
//   //       //           onStart: () => {
//   //       //             gsap.set(image, {
//   //       //               y: -200,
//   //       //               clipPath: "polygon(54% 100%, 0% 100%, 100% 100%)",
//   //       //             });
//   //       //           },
//   //       //         });
//   //       //         animatedIndices.push(index);
//   //       //       }
//   //       //     });
//   //       //   },
//   //       //   onComplete: () => ScrollTrigger.refresh(),
//   //       // });

//   //     // gsap.to("body", {

//   //     //   scrollTrigger: {
//   //     //     trigger: bgColorRef,
//   //     //     start: "top 50%", // Trigger when bgColorRef reaches 50% of the viewport height
//   //     //     end: "bottom top",
//   //     //     scrub: true, // Smooth transition while scrolling
//   //     //     markers: true, // Set to false when you're ready to go live
//   //     //     onEnter: () => {
//   //     //       document.querySelector('body').style.backgroundColor='#d93f92',
//   //     //       document.querySelector('body').style.trasition = '0.4s all'
//   //     //     },
//   //     //     onLeave: () => {
//   //     //       // Optional: Revert the color if needed
//   //     //       gsap.to("body", { backgroundColor: "transparent" });
//   //     //     },
//   //     //   },
//   //     // });

//   //     ScrollTrigger.refresh();
//   //   }, containerRef);

//   //   return () => ctx.revert();

//   //   // Cleanup function
//   //   // return () => {
//   //   //   ScrollTrigger.refresh();
//   //   //   const mainTrigger = ScrollTrigger.getById("whoWeAreTrigger");
//   //   //   mainTrigger?.kill();
//   //   //   tl.kill();
//   //   //   splitInstances.forEach((split) => split.revert());
//   //   //   ScrollTrigger.refresh();
//   //   //   images.forEach((image) => {
//   //   //     if (image.parentNode) image.parentNode.style.overflow = "";
//   //   //   });
//   //   // };
//   // }, []);

//   return (
//     <section className="w-full relative  mix-blend-multiply overflow-hidden">
//       <div ref={containerRef} className="pin-container">
//         <div className="flex flex-row h-screen  main-container-scroll no-scrollbar relative">
//           <div
//             ref={sectionRef}
//             className="main-container-scroll  no-scrollbar flex h-screen will-change-transform"
//             style={{
//               display: "flex",
//               // width: "fit-content",
//               willChange: "transform",
//             }}
//           >
//             {/* bg-gtf-pink */}
//             <div className="first_slide flex flex-row justify-between h-full bg-[#e24397] min-w-[100vw]">
//               <div className="grid items-center grid-cols-12 gap-[40px]">
//                 <div
//                   ref={mainContentRef}
//                   className="relative w-[100vw] md:px-[50px] px-[15px] col-span-12 max-w-[80%] mx-auto mt-[-50vh] text-white"
//                 >
//                   <h2
//                     ref={mainHeadingRef}
//                     className="relative mb-[30px] uppercase bebas tracking-[2px] 2xl:text-[140px] md:text-[80px] text-[32px] inline-block left-[50%] -translate-x-1/2 leading-[150px]"
//                   >
//                     Who We Are?
//                   </h2>

//                   <div className="relative mx-auto">
//                     <div
//                       ref={overviewData}
//                       className="flex flex-col items-center space-y-2 gap-[25px]"
//                     >
//                       {lines.map((line, lineIndex) => (
//                         <div
//                           key={lineIndex}
//                           ref={(el) => (textRef.current[lineIndex] = el)} // One ref per line
//                           className="flex flex-wrap justify-left text-left"
//                         >
//                           {line.map((word, wordIndex) =>
//                             typeof word === "string" ? (
//                               <span
//                                 key={wordIndex}
//                                 className="montserrat font-medium pr-[8px] 2xl:leading-[1.4] tracking-[-2.5px] 2xl:text-[60px]  text-[32px] inline-block text-left"
//                               >
//                                 {word}
//                               </span>
//                             ) : (
//                               <span
//                                 key={wordIndex}
//                                 className={`relative montserrat font-medium px-[40px]  2xl:leading-[1.4] tracking-[-2.5px] 2xl:text-[60px] text-[32px] inline-block text-left ${word.className}`}
//                               >
//                                 {word.word}
//                                 <img
//                                   ref={(el) =>
//                                     (svgRefs.current[wordIndex] = el)
//                                   }
//                                   src={word.sibling}
//                                   className={`absolute w-full h-full inset-0 ${word.imgClass}`}
//                                   style={{
//                                     opacity: "0",
//                                   }}
//                                 />
//                               </span>
//                             )
//                           )}
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* First Image Section */}

//             <div ref={otherSectionRef} className="flex sec_cont">
//               <div
//                 ref={imageSectionRef}
//                 className="flex items-center relative pl-[13rem] min-w-[calc(100vw-13rem)]"
//               >
//                 <div className="pr-[50px] pl-[20px]">
//                   <h3 className="montserrrat uppercase text-[50px] font-bold mb-[1rem] font-[600] w-[max-content]">
//                     Built to Disrupt <span className="block">the Ordinary</span>
//                   </h3>
//                 </div>

//                 <div ref={pinImageRef}>
//                   <img
//                     ref={(el) => (imagesRef.current[2] = el)}
//                     className="object-cover relative top-[-20px] 2xl:h-auto inline-block top-[-70px]  right-[-90px] !rotate-[-5deg]  z-[1] xl:h-[360px] w-[365px] border-[4px] border-solid border-black"
//                     src="/assets/home/who_we_are/creative2/img1-sm.webp"
//                     alt="GTF Technologies office environment"
//                   />
//                   <img
//                     ref={(el) => (imagesRef.current[3] = el)}
//                     className=" object-cover inline-block w-[365px] 2xl:h-auto xl:h-[480px] border-[4px] border-solid border-black"
//                     src="/assets/home/who_we_are/creative2/img1.webp"
//                     alt="GTF Technologies office environment"
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="aboolute hidden">
//               <div className="flex flex-row items-center relative pl-[13rem] min-w-[calc(100vw-13rem)]">
//                 <div className="basis-[100%] pr-[50px] pl-[20px]">
//                   <h5 className="montserrat text-[34px] mb-[1rem] font-[600]">
//                     Not a Team.{" "}
//                     <span className="block text-[50px] uppercase font-bold">
//                       A task force{" "}
//                     </span>
//                   </h5>
//                 </div>

//                 {/* <img
//                   ref={(el) => (imagesRef.current[2] = el)}
//                   className="object-cover relative top-[-20px] 2xl:h-auto inline-block top-[-70px]  right-[-90px] !rotate-[-5deg]  z-[1] xl:h-[360px] w-[365px] border-[4px] border-solid border-black"
//                   src="/assets/home/who_we_are/absolute_img.webp"
//                   alt="GTF Technologies office environment"
//                 />
//                 <img
//                   ref={(el) => (imagesRef.current[3] = el)}
//                   className=" object-cover inline-block w-[365px] 2xl:h-auto xl:h-[480px] border-[4px] border-solid border-black"
//                   src="/assets/home/who_we_are/img3.webp"
//                   alt="GTF Technologies office environment"
//                 /> */}
//               </div>

//               <div className="flex flex-row items-center relative pl-[13rem] min-w-[100vw]">
//                 <div className="basis-[100%] pr-[50px] pl-[20px]">
//                   <h5 className="text-[50px] mb-[1rem]  text-[50px] font-semibold">
//                     Wired to help brands{" "}
//                     <span className="block">move ahead of the market.</span>
//                   </h5>
//                 </div>

//                 {/* <img
//                     ref={(el) => (imagesRef.current[2] = el)}
//                     className="object-cover relative top-[-20px] 2xl:h-auto inline-block top-[-70px]  right-[-90px] !rotate-[-5deg]  z-[1] xl:h-[360px] w-[365px] border-[4px] border-solid border-black"
//                     src="/assets/home/who_we_are/creative1/img1-sm.webp"
//                     alt="GTF Technologies office environment"
//                   />
//                   <img
//                     ref={(el) => (imagesRef.current[3] = el)}
//                     className=" object-cover inline-block w-[365px] 2xl:h-auto xl:h-[480px] border-[4px] border-solid border-black"
//                     src="/assets/home/who_we_are/creative1/img1.webp"
//                     alt="GTF Technologies office environment"
//                   /> */}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* <div  ref={backgroundColorRef} className="absolute top-0 left-0 w-full h-full"></div> */}
//     </section>
//   );
// };

// export default WhoWeAre;


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
  ],
];

const WhoWeAre = () => {
  const textRef = useRef([]);
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const imagesRef = useRef([]);
  const headingRef = useRef(null);
  const mainHeadingRef = useRef(null);
  const mainContentRef = useRef(null);
  const rightHeading=useRef(null);
  const overviewData = useRef(null);
  const backgroundColorRef = useRef(null);
  const imageSectionRef = useRef(null);

  let hasChangedBg = false;
  let tl = "";
  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const container = containerRef.current;
      const images = imagesRef.current;
      const ov_data = overviewData.current;
      const bgColorRef = backgroundColorRef.current;
      const imageSection = imageSectionRef.current;

      const otherText = section.querySelector(".other_txt");

      if (!section || !container || !images) return;

      // Initial states for animations

      const hides = section.querySelectorAll(".hide");
      const scrollWidth = section.scrollWidth;
      const windowWidth = window.innerWidth;
      const maxTranslateX = scrollWidth - windowWidth;
      const heading = headingRef.current;
      const mainHeading = mainHeadingRef.current;
      const mainContent = mainContentRef.current;

      // gsap.set(hides, { display: "inline-block", marginRight: "30px" });
      // gsap.set(otherText, { width: 0, opacity: 0, display: "inline-block" });
      // gsap.set(images, { opacity: 0, y: 50, clipPath: "inset(50% 0 50% 0)" });
      // gsap.set(heading, { opacity: 0 });

      const splitInstances = textRef.current
        .filter(Boolean)
        .map(
          (ref) => new SplitText(ref, { type: "chars", charsClass: "char" })
        );
      const allChars = splitInstances.flatMap((split) => split.chars);

      gsap.set(allChars, { opacity: 0 });
      gsap.set(ov_data, { height: 0 });

      const animatedIndices = [];

      tl = gsap.timeline({
        scrollTrigger: {
          id: "whoWeAreTrigger",
          trigger: container,
          start: "top top",
          end: () => `+=${maxTranslateX + window.innerWidth + 100 + 2000}`,
          pin: true,
          scrub: false,
          markers: false,
          scrub: 1,
          once:true,
          pinSpacing: true,
        },
      });

      tl.to(
        mainHeading,
        {
          fontSize: "80px",
          left: "0",
          transform: "translateX(0)",
          duration: 0.1,
        },
        "+=0.1"
      );

      tl.to(heading, {
        autoAlpha: 1,
        duration: 0.2,
        ease: "power2",
      });

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
        .to(
          ov_data,
          { height: "auto", duration: 0.1, ease: "power2" },
          "+=0.05"
        )
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
          ease: "none",
          duration: 1,
          onUpdate: function (x) {
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
          onComplete: () => {
            ScrollTrigger.refresh();
          },
        });

      ScrollTrigger.refresh();
    }, containerRef);
    const absoluteDiv = document.querySelector("#absolute_dev");

    const tl2 = gsap
      .timeline({
        scrollTrigger: {
          id: "whoWeAreReveal",
          trigger: containerRef.current,
          start: () => tl.scrollTrigger.end,
          end: "+=3000",
          pin: true,
          pinSpacing: true,
          scrub: 1,
          markers: false,
          anticipatePin: 1,
        },
      })
      .to(rightHeading.current, {
        x: "-150%",
        duration: 1.5,
        ease: "power3.out",
      },">")
      .to(absoluteDiv, {
        x: "0%",
        duration: 1.5,
        ease: "power3.out",
      },">")

      
      // .to(heading, { autoAlpha: 0, y: -100, duration: 1 }, "+=0")
      // // // // .to(heading, { autoAlpha: 0, y: -100, duration: 1 }, "+=0.5")
      // // // // .to(
      // // // //   allChars,
      // // // //   { opacity: 0, y: -30, stagger: 0.02, duration: 0.8 },
      // // // //   "-=0.8"
      // // // // )
      // // // // .to(
      // // // //   images,
      // // // //   {
      // // // //     opacity: 1,
      // // // //     y: 0,
      // // // //     clipPath: "inset(0% 0% 0% 0%)",
      // // // //     duration: 1.5,
      // // // //     stagger: 0.3,
      // // // //     ease: "power3.out",
      // // // //   },
      // // // //   "-=0.5"
      // // // // )
      // // // .to(
      // // //   ov_data,
      // // //   {
      // // //     backgroundColor: "rgba(0,0,0,0.8)",
      // // //     padding: "60px",
      // // //     duration: 1,
      // // //   },
      // //   "-=1"
      // )
      .from(
        ".final-cta, .extra-content",
        {
          opacity: 0,
          y: 100,
          stagger: 0.2,
          duration: 1.2,
        },
        "-=0.8"
      );
    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full relative  mix-blend-multiply overflow-hidden">
      <div ref={containerRef} className="pin-container">
        <div className="flex flex-row h-screen   no-scrollbar min-w-[430vw] relative">
          <div
            ref={sectionRef}
            className="main-container-scroll  no-scrollbar flex h-screen will-change-transform"
            style={{
              display: "flex",
              // width: "fit-content",
              willChange: "transform",
            }}
          >
            {/* bg-gtf-pink */}
            <div className="flex flex-row justify-between h-full bg-[#e24397] min-w-[100vw]">
              <div className="grid items-center grid-cols-12 gap-[40px]">
                <div
                  ref={mainContentRef}
                  className="relative w-[100vw] md:px-[50px] px-[15px] col-span-12 max-w-[80%] mx-auto mt-[-50vh]"
                >
                  <h2
                    ref={mainHeadingRef}
                    className="relative mb-[30px] uppercase bebas tracking-[2px] 2xl:text-[140px] md:text-[80px] text-[32px] inline-block left-[50%] -translate-x-1/2 leading-[150px]"
                  >
                    Who We Are?
                  </h2>

                  <div className="relative mx-auto">
                    <h4
                      ref={headingRef}
                      className="montserrat uppercase js-title text-[40px] font-bold absolute w-[max-content]"
                      style={{
                        opacity: 0,
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

            <div
              ref={imageSectionRef}
              className="flex items-center relative pl-[13rem] min-w-[calc(100vw)]"
            >
              <div ref={rightHeading} className="pr-[50px] pl-[20px]">
                <h3 className="montserrrat uppercase text-[50px] font-bold mb-[1rem] font-[600] w-[max-content]">
                  Built to Disrupt <span className="block">the Ordinary</span>
                </h3>
              </div>

              <div>
                <div className="cat1">
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
                <div className="cat1">
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
                <div className="cat1">
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
        </div>
        <div
          id="absolute_dev"
          className="absolute w-full flex items-center  h-full top-[0] translate-x-[200%]"
        >
          <div className="flex flex-row  items-center  relative pl-[13rem] h-full min-w-[calc(100vw-13rem)]">
            <div className="basis-[100%] pr-[50px] pl-[20px]">
              <h5 className="montserrat text-[34px] mb-[1rem] font-[600]">
                Not a Team.{" "}
                <span className="block text-[50px] uppercase font-bold">
                  A task force{" "}
                </span>
              </h5>
            </div>
          </div>

     
        </div>
        <div
          id="absolute_dev"
          className="absolute w-full flex items-center  h-full top-[0] translate-x-[200%]"
        >
          <div className="flex flex-row  items-center  relative pl-[13rem] h-full min-w-[calc(100vw-13rem)]">
            <div className="basis-[100%] pr-[50px] pl-[20px]">
              <h5 className="montserrat text-[34px] mb-[1rem] font-[600]">
                Not a Team.{" "}
                <span className="block text-[50px] uppercase font-bold">
                  A task force{" "}
                </span>
              </h5>
            </div>
          </div>

     
        </div>
        <div
          id="absolute_dev"
          className="absolute w-full flex items-center  h-full top-[0] translate-x-[200%]"
        >
          <div className="flex flex-row  items-center  relative pl-[13rem] h-full min-w-[calc(100vw-13rem)]">
            <div className="basis-[100%] pr-[50px] pl-[20px]">
              <h5 className="montserrat text-[34px] mb-[1rem] font-[600]">
                Not a Team.{" "}
                <span className="block text-[50px] uppercase font-bold">
                  A task force{" "}
                </span>
              </h5>
            </div>
          </div>

     
        </div>
        <div
          id="absolute_dev"
          className="absolute w-full flex items-center  h-full top-[0] translate-x-[200%]"
        >
          <div className="flex flex-row  items-center  relative pl-[13rem] h-full min-w-[calc(100vw-13rem)]">
            <div className="basis-[100%] pr-[50px] pl-[20px]">
              <h5 className="montserrat text-[34px] mb-[1rem] font-[600]">
                Not a Team.{" "}
                <span className="block text-[50px] uppercase font-bold">
                  A task force{" "}
                </span>
              </h5>
            </div>
          </div>

     
        </div>
        <div
          id="absolute_dev"
          className="absolute w-full flex items-center  h-full top-[0] translate-x-[200%]"
        >
          <div className="flex flex-row  items-center  relative pl-[13rem] h-full min-w-[calc(100vw-13rem)]">
            <div className="basis-[100%] pr-[50px] pl-[20px]">
              <h5 className="montserrat text-[34px] mb-[1rem] font-[600]">
                Not a Team.{" "}
                <span className="block text-[50px] uppercase font-bold">
                  A task force{" "}
                </span>
              </h5>
            </div>
          </div>

     
        </div>
        <div
          id="absolute_dev"
          className="absolute w-full flex items-center  h-full top-[0] translate-x-[200%]"
        >
          <div className="flex flex-row  items-center  relative pl-[13rem] h-full min-w-[calc(100vw-13rem)]">
            <div className="basis-[100%] pr-[50px] pl-[20px]">
              <h5 className="montserrat text-[34px] mb-[1rem] font-[600]">
                Not a Team.{" "}
                <span className="block text-[50px] uppercase font-bold">
                  A task force{" "}
                </span>
              </h5>
            </div>
          </div>

     
        </div>  
      </div>
    </section>
  );
};

export default WhoWeAre;