"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Mousewheel,
  Pagination,
  FreeMode,
  Virtual,
  Keyboard,
} from "swiper/modules";
import { createPortal } from "react-dom";
import gsap from "gsap";
import "swiper/css";
import "swiper/css/pagination";
import SparkleBackground from "../SparkleBackground";
import { HERO_DATA } from "./hero/heroData";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { robotoCondensed } from "@/app/utils/font";
import { useDispatch } from "react-redux";
import { hideVideo } from "@/slices/homeSlice";
import SlideTxtAn from "@/app/utils/SlideTxtAn";

gsap.registerPlugin(ScrollTrigger);

const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

const data = [
  "300 Minds",
  "06 LOCATIONS",
  "One Team"
];

const colors = [
  "#2aaee4",
  "#fde93d",
  "#e24397"
]

const HeroSection = () => {
  const [swiperReady, setSwiperReady] = useState(false);
  const [videoCompleted, setVideoCompleted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lastActiveIndex, setLastActiveIndex] = useState(0);
  const [activeIndexes, setActiveIndexes] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLastSlide, setIsLastSlide] = useState(false);
  const swiperInstance = useRef(null);
  const headingRef = useRef(null);
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const mediaRefs = useRef([]);
  const modalRef = useRef(null);
  const sectionRef = useRef(null);
  const mainSectionRef = useRef(null);
  const scrollState = useRef({ locked: false, y: 0 });
  const introPinRef = useRef(null);
  const marqueeRef = useRef(null);
  const skipBtnRef = useRef(null);
  const headerBounds = useRef({ top: 0, bottom: 0, isInside: false });
  const slideTxtAnRef = useRef(null);
  const mapRef = useRef(null);
  const dataRef = useRef(null);
  const countersRef = useRef([]);
  const zoomTextRef = useRef(null);
  const bgZoomColorRef = useRef(null);
  

  const dispatch =  useDispatch();

  const dotsConfig = [
    { top: "29%", left: "65%", color: "bg-gtf-blue" },
    { top: "32%", left: "70%", color: "bg-gtf-yellow" },
    { bottom: "26%", left: "65%", color: "bg-gtf-pink" },
    { bottom: "38%", left: "63%", color: "bg-[purple]" },
    { bottom: "14%", left: "67%", color: "bg-[green]" },
  ];

  const lockScroll = () => {
    if (scrollState.current.locked) return;

    const el = sectionRef.current;
    if (!el) return;

    // 1) compute absolute document offset for the section
    const sectionTopDoc = el.getBoundingClientRect().top + window.scrollY;

    // 2) snap the viewport to the section top
    window.scrollTo(0, sectionTopDoc);

    // 3) lock the body on the next frame with the correct negative doc offset
    requestAnimationFrame(() => {
      scrollState.current.locked = true;
      scrollState.current.y = window.scrollY; // remember for unlock

      // document.body.style.position = "fixed";
      // document.body.style.top = `-${sectionTopDoc}px`; // NOTE: negative + px + DOC offset
      // document.body.style.left = "0";
      // document.body.style.right = "0";
      // document.body.style.width = "100%";
      // document.body.style.overflow = "hidden";
    });
  };

  useEffect(() => {
    setMounted(true);
    setIsMobile(window.innerWidth < 768);

    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        {
          y: -50,
          opacity: 0,
          scale: 1,
          duration: 1.2,
          // ease: "back.out(1.5)",
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          // ease: "back.out(1.5)",
        }
      );
    }
  }, []); 


  useEffect(() => {
    if (!mounted) return;

    const glow = document.getElementById("rotating-pink-glow");

    gsap.to(glow, {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: "none",
    });
  }, [mounted]);

  useEffect(() => {
    setMounted(true);
  }, []);





  useEffect(() => {
    if (!sectionRef.current || !mounted) return;

    let hasScrolledPastHero = window.scrollY > window.innerHeight * 0.5;
    let initialLoad = true;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        anticipatePin: 1,
        pinSpacing: true,
        pin: true,
        onEnter:()=>{
          // Only lock scroll on initial load AND if user hasn't scrolled past
          if(initialLoad && !hasScrolledPastHero){
            document.body.style.overflow = 'hidden'
          }
          initialLoad = false;
        },
        onLeave:()=>{
          document.body.style.overflow = '';
        },
        onEnterBack: () => {
          // If user scrolls back up, re-lock (optional)
          if (!hasScrolledPastHero) {
            document.body.style.overflow = 'hidden';
          }
        },
        onLeaveBack: () => {
          document.body.style.overflow = '';
        },
        // onEnter: () => {
        //   if (!videoRef.current) return;
        //   videoRef.current.style.display = "block";
        //   document.querySelector("#smooth-content").style.overflow="hidden";

        //   videoRef.current.muted = true;
        //   videoRef.current.setAttribute("muted", "");
        //   videoRef.current.playsInline = true;
        //   videoRef.current.setAttribute("playsinline", "");
        //   videoRef.current.play?.().catch(() => {});
        // },
      },
    });



    introPinRef.current = tl.scrollTrigger;

    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.8) {
        hasScrolledPastHero = true;
        document.body.style.overflow = 'auto';
      }
    };
 
    window.addEventListener('scroll', handleScroll);


    return () => {
      tl.scrollTrigger?.kill();
      introPinRef.current?.kill();
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = 'auto';
    };
  }, [mounted, videoCompleted, isMobile]);

  useEffect(()=>{
    if(!mainSectionRef.current || !mounted || !videoCompleted) return;

    // Wait until everything is rendered and video is done
    const zoomTl = gsap.timeline({
      scrollTrigger:{
        trigger:mainSectionRef.current,
        start:"top top",
        end: "+=120%",
        pin:true,
        pinSpacing:true,
        scrub:2,
        anticipatePin:1,
        id:"hero-zoom",

      }
    });

    // start counter
    function startCounters() {
      countersRef.current.forEach((el) => {
        if (!el) return;
        const target = parseInt(el.dataset.target, 10);
        if (isNaN(target)) return; // ← Skip "One Team" completely

        const pad = target < 10;

        gsap.to(el, {
          innerText: target,
          duration: 4.5,
          ease: "power2.out",
          snap: { innerText: 1 },
          onUpdate: () => {
            const val = Math.round(el.innerText);
            el.innerText = pad ? val.toString().padStart(2, "0") : val;
          },
          onComplete: () => {
            const suffix = el.nextElementSibling;
            if (suffix?.classList.contains("suffix")) {
              gsap.to(suffix, { opacity: 1, duration: 0.8 });
            }
          },
        });
      });

      gsap.to(".text-only", {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.2,
        delay: 0.3,
      });

      
      setTimeout(()=>{
        document.documentElement.style.overflow = "auto";
        document.body.style.overflow = "auto";
      }, 5000)
    }

    startCounters();

    gsap.delayedCall(5.5, ()=>{
      if(!zoomTextRef.current || !bgZoomColorRef.current) return;

      zoomTl.to(
        zoomTextRef.current,
        {
          scale:25,
          ease:'none',
        },
      );

      // zoomTl.to(
      //   bgZoomColorRef.current,
      //   {
      //     opacity:1,
      //     // transformX:'0',
      //     // top:0,
      //     // transform:"auto",
      //     // left:0,
      //   },
      //   "-=0.51"
      // );
  
      zoomTl.to(
        bgZoomColorRef.current,
        {
          top:0,
          height:"100%",
          // transformX:'0',
          // top:0,
          // transform:"auto",
          // left:0,
        },
        "-=0.50"
      );
  
      zoomTl.to(
        bgZoomColorRef.current,
        {
          transform:"translateX(0)",
          left:"0",
          width:"100%",
          // scale:'10'
        },
      );

      ScrollTrigger.refresh();
    })

  }, [mounted, videoCompleted])

  const closeModal = () => {
    if (modalRef.current) {
      gsap.to(modalRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 0.4,
        ease: "power3.in",
        onComplete: () => setModalOpen(false),
      });
    } else {
      setModalOpen(false);
    }
  };


  const handleVideoEnd = () => {
    dispatch(hideVideo())



    if (introPinRef.current) {
      introPinRef.current.kill();
      introPinRef.current = null;
    }

    document.querySelector(".hide_screen").style.display = "none";
    document.querySelector(".slider_content").style.display = "flex";
    
    setVideoCompleted(true);

    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
      onComplete: () => {
        setSwiperReady(true);
        gsap.delayedCall(0.1, () => {
          ScrollTrigger.refresh();
        });
      },
    });

    tl.to(videoRef.current, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        if (videoRef.current) {
          gsap.set([videoRef.current, ".video_container"], { display: "none" });

          gsap.delayedCall(0.8, () => {
            const firstMedia = mediaRefs.current[0];
            if (firstMedia && "play" in firstMedia) firstMedia.play();

            mediaRefs.current.forEach((item) => {
              const parentContainer = item?.parentElement?.parentElement;
              if (parentContainer) gsap.set(parentContainer, { opacity: 1 });
            });
          });
        }
      },
    });

    tl.fromTo(
      slideTxtAnRef.current,
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1.4,
        ease: "power4.out",
      },
      "-=0.2"
    );

    tl.fromTo(
      mapRef.current,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 0.4,
        ease: "power3.in",
      },
      "-=1.2"
    )

    tl.fromTo(
      dataRef.current,
      {
        opacity: 0,
        y:20,
      },
      {
        opacity: 1,
        y:0,
        duration: 0.4,
        ease: "power3.in",
        onComplete: () => {
          // Optional: small delay so user sees the fade-in first
          gsap.delayedCall(0.3, () => {
            // Counter will auto-start via IntersectionObserver
          });
        },
      },
      "-=0.8"
    )



  };

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIsMobile();
    // handleVideoEnd();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // infinite marquee
  useEffect(() => {
    if (!marqueeRef.current) return;

    const el = marqueeRef.current;
    const distance = el.offsetWidth / 2;

    const tl = gsap.timeline({ repeat: -1, defaults: { ease: "none" } });

    tl.fromTo(el, { x: -distance }, { x: 0, duration: 100 });

    // seamless loop: when the first half disappears, jump back instantly
    tl.set(el, { x: 0 });

    return () => tl.kill();
  }, []);

  useEffect(() => {
    if (!skipBtnRef.current || videoCompleted) return;

    const btn = skipBtnRef.current;
    const header = document.querySelector(".site-header");

    if (!header) return;

    let xTo, yTo;
    const speed = 1;

    // Create smooth follow functions
    const followCursor = () => {
      xTo = gsap.quickTo(btn, "x", { duration: speed, ease: "power3.out" });
      yTo = gsap.quickTo(btn, "y", { duration: speed, ease: "power3.out" });
    };

    followCursor();

    const updateBounds = () => {
      const rect = header.getBoundingClientRect();
      headerBounds.current.top = rect.top + window.scrollY;
      headerBounds.current.bottom = rect.bottom + window.scrollY;
    };

    updateBounds();
    window.addEventListener("resize", updateBounds);
    window.addEventListener("scroll", updateBounds);

    const handleMove = (e) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      const rect = btn.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      xTo(clientX - centerX);
      yTo(clientY - centerY);

      // Check if inside header
      const isInside =
        clientY >= headerBounds.current.top &&
        clientY <= headerBounds.current.bottom;

      if (isInside && !headerBounds.current.isInside) {
        headerBounds.current.isInside = true;
        gsap.to(btn, {
          opacity: 0,
          scale: 0.5,
          y: -20,
          duration: 0.35,
          ease: "power3",
        });
      } else if (!isInside && headerBounds.current.isInside) {
        // LEAVE header
        headerBounds.current.isInside = false;
        gsap.to(btn, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.45,
          ease: "power3",
        });
      }
    };

    // Mouse & touch support
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("touchmove", handleMove);

    // Optional: subtle scale on hover
    const handleEnter = () => gsap.to(btn, { scale: 1.15, duration: 0.3 });
    const handleLeave = () => gsap.to(btn, { scale: 1, duration: 0.3 });

    btn.addEventListener("mouseenter", handleEnter);
    btn.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);

      btn.removeEventListener("mouseenter", handleEnter);
      btn.removeEventListener("mouseleave", handleLeave);
    };
  }, []);



  useEffect(() => {
    if (!dataRef.current || !videoCompleted) return;
  
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(dataRef.current);
  
    
  
    return () => observer.disconnect();
  }, [videoCompleted]);

  
  return (
    <section
      ref={mainSectionRef}
      className={`relative hero_section overflow-hidden bg-[#faf9f6] ${
        videoCompleted ? "md:px-[50px]" : "md:px-0"
      }`}
    >


      {/* Pink Edge Glow – Infinite rotation around the viewport (finally visible!) */}
  <div 
    className="absolute -inset-[100px] h-full animate-gradient-rotation" 
    id="rotating-pink-glow"
    style={{
      background: `linear-gradient(90deg,
        #e24397 10%,
        transparent 50%,
        transparent 70%,
        transparent 100%
      )`,
      backgroundSize: "100% 100%",   // Large enough to move fully across screen
      filter: "blur(90px)",
      opacity: 0.25,
    }}
  />

    {/* <div ref={bgZoomColorRef} className="bg_color_zoom bg-[#e24397] absolute h-full w-0 left-0 top-0 z-[9]"
    ></div> */}



      <div ref={sectionRef} className="h-screen hide_screen">
        {/* {mounted && !videoCompleted && ( */}
        <div className="video_container !absolute top-0 left-0 w-full h-screen z-[9]">
          <video
            ref={videoRef}
            src="/assets/home/hero/video1.mp4"
            className="w-full h-full object-cover transition-opacity duration-500"
            autoPlay
            // loop
            playsInline
            muted
            onEnded={handleVideoEnd}
          />
          
          {/*infite loop text animation*/}
          <div
            className="pointer-events-none left-0 w-full overflow-hidden z-[9]"
            style={{
              position: "fixed",
              top: `calc(100vh - 250px)`,
              // Fallback for JS disabled
            }}
          >
            <h2
              ref={marqueeRef}
              className="inline-block whitespace-nowrap uppercase text-[150px] font-semibold leading-none text-white"
            >
              {Array.from({ length: 4 }).map((_, i) => (
                <span key={i} className="inline-flex items-center">
                  Branding{" "}
                  <span className="dot h-[20px] w-[20px] bg-white inline-block mx-[50px]"></span>
                  Digital Marketing{" "}
                  <span className="dot h-[20px] w-[20px] bg-white inline-block mx-[50px]"></span>
                  Double-Digit Growth{" "}
                  <span className="dot h-[20px] w-[20px] bg-white inline-block mx-[50px]"></span>
                </span>
              ))}
            </h2>

            <div className="bottom text-white text-center border-t border-solid border-white mt-[40px] pt-[20px] uppercase font-medium text-[14px] tracking-[1px]">
              ( Scroll Down )
            </div>
          </div>
          
          <button
            ref={skipBtnRef}
            className="absolute z-[99] top-0 left-0  text-white uppercase tracking-[1px] text-[14px] font-medium bg-[#e24397] px-[30px] py-[14px] rounded-full"
            onClick={handleVideoEnd}
          >
            Skip Video
          </button>
        </div>
      </div>

      <div className="relative md:pt-0 z-[4] mt-[120px]">
        
        <SlideTxtAn
          ref={slideTxtAnRef}
          className="text-center text-[80px] bebas font-medium text-global-color tracking-[7px]" spanClass="font-bold tracking-[7px]" />

        <div className="flex hidden overflow-hidden slider_content justify-center flex-wrap items-center">

          <div className="map h-full w-full flex items-center justify-center top-0 left-0 w-full h-full opacity-50 z-[-1]">
            <img
              ref={mapRef}
              src="/assets/map/map.png"
              className="max-w-[700px]"
            />
          </div>

          <div ref={dataRef} className="absolute content grid gap-[30px] opacity-0">
            {data.map((item, index) => {
              const match = item.match(/^(\d+)\s*(.+)?$/); // Extract number + suffix
              const hasNumber = match && match[1];
              const numberValue = hasNumber ? parseInt(match[1], 10) : null;
              const suffix = match && match[2] ? match[2].trim() : item; // "Minds", "Locations", or full "One Team"


              return (
                <h3
                  key={index}
                  ref={index === 2 ? zoomTextRef : null}
                  className={`text-[140px] uppercase bartino leading-[100px] text-center tracking-[10px] font-bold text-[#000] ${index === 2 ? 'z-[9]' : undefined}`}
                  style={{ color: colors[index] }}
                >
                  {hasNumber ? (
                    <div className="relative">
                      <span
                        ref={(el) => (countersRef.current[index] = el)}
                        className="counter inline-block"
                        data-target={numberValue}
                      >
                        00
                      </span>
                      <span className="ml-4 suffix transition-opacity">
                        {suffix}
                      </span>
                      {/* {index === 2 && 
                        (
                          <span ref={bgZoomColorRef} className="absolute fill_color bg-[#e24397] h-[0px] w-[0px] top-[50%] left-[47%] translate-x-[-50%] block"
                            // style={{
                            //   opacity:0,
                            // }}
                          ></span>
                        )
                      } */}
                    </div>
                  ) : (
                    <div className="relative">
                      <span className="text-only inline-block translate-y-10">
                        {suffix}
                      </span>

                      <span ref={bgZoomColorRef} className="absolute fill_color bg-[#e24397] h-[0px] w-[0px] top-[50%] left-[50%] translate-x-[-50%] block"></span>
                    </div>
                    
                  )}

                </h3>
              );
            })}
          </div>

          
        </div>
      </div>
      <button className="bg-[#1E251F] md:hidden block flex gap-[5px] font-[700] relative z-[999] justify-center mt-[15px] place-items-center text-white px-4 py-[2px] font-[500] w-[calc(100%-74px)]  font-[oswald] m-auto before:content-[''] before:absolute before:h-[166px] before:w-[100%] before:bottom-[148px] before:bg-[transparent] ">
        MEET NOW
        <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
          <path
            d="M20.6277 14.7276L12.0208 23.3345L10.6066 21.9203L19.2135 13.3134L11.6277 13.3134L11.6277 11.3137H22.6274V22.3135L20.6277 22.3135V14.7276Z"
            fill="white"
          />
        </svg>
      </button>
      <div className="lines absolute right-[0] bottom-[26%] md:hidden block">
        <div className="mix-blend-multiply h-[6px] w-[40px] bg-gtf-pink"></div>
        <div className="mix-blend-multiply my-[4px] h-[6px] w-[40px] bg-gtf-yellow"></div>
        <div className="mix-blend-multiply h-[6px] w-[40px] bg-gtf-blue"></div>
      </div>

      
      {mounted &&
        modalOpen &&
        modalContent &&
        createPortal(
          <div
            className="fixed sparkle_modal inset-0 overflow-y-scroll z-[10000] bg-[#fff] justify-center bg-black/80 transition-opacity duration-300"
            onClick={closeModal}
          >
            <div className="relative flex flex-col items-center pt-[50px]">
              <div className="relative z-[4] flex justify-center md:w-[calc(100vw-299px)] w-[calc(100vw-60px)] md:h-[auto] h-[calc(100vh-120px)]">
                <div
                  ref={modalRef}
                  className="relative md:h-[auto] h-full py-[4px]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="relative md:h-[auto] h-full md:p-0 p-2">
                    {modalContent.type === "video" ? (
                      <video
                        className="w-full h-full object-cover"
                        src={modalContent.path}
                        controls
                        loop
                        autoPlay
                        playsInline
                      />
                    ) : (
                      <img
                        src={modalContent.path}
                        className="w-full max-h-[80vh] object-contain"
                        alt={modalContent.title}
                      />
                    )}
                  </div>
                </div>
              </div>
              <SparkleBackground />
              <button
                onClick={closeModal}
                className="absolute md:top-[10px] top-[8px] md:right-4 right-[36px] z-50 bg-white/90 hover:bg-white rounded-full p-2 transition-all duration-200"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div className="before_line absolute top-[0] md:left-[140px] left-[25px] h-full w-[2px] border-s-[1px] border-dashed border-[#000]"></div>
              <div className="before_line absolute top-[52px] w-full h-[2px] border-b-[1px] border-dashed border-[#000]"></div>
              <div className="before_line mt-[-4px] w-full h-[2px] border-b-[1px] border-dashed border-[#000]"></div>
              <div className="before_line h-full top-[0] w-[2px] absolute md:right-[140px] right-[25px] border-s-[1px] border-dashed border-[#000]"></div>
              <div className="modal_container md:block md:w-[calc(100vw-299px)] w-[calc(100vw-50px)] px-5 text-start py-[20px] mx-auto">
                <h2 className="font-[700] font-[oswald] uppercase tracking-[-1px] text-[25px] md:text-[35px]">
                  {modalContent.title}
                </h2>
                <div className="border-[#000] pt-[20px]">
                  <h4 className="font-[700]   font-[oswald]  uppercase tracking-[-1px]  mb-[18px] text-[20px]">
                    Project one
                  </h4>
                  <p className="mb-3">{modalContent.text}</p>
                  <p className="mb-3">{modalContent.text}</p>
                  <p className="mb-3">{modalContent.text}</p>
                  <p className="mb-3">{modalContent.text}</p>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
      
    </section>
  );
};

export default HeroSection;