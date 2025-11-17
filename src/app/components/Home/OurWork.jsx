"use client";
import { useState, useRef, useEffect } from "react";
import Line from "../Line";
import { MdArrowOutward } from "react-icons/md";
import ScrollText from "@/app/utils/ScrollText";
import gsap from "gsap";

const scrollText = [
  "Brand Catalyst",
  "Great Story Tellers",
  "One-Stop Solution"
];

const images = [
  "/assets/home/work/work1.jpg",
  "/assets/home/work/work2.jpg",
  "/assets/home/work/work3.jpg",
];

const dataInitial = [
  {
    heading: "Brand Catalyst",
    description:
      "We don't just tell. We weave, launching a refined brand identity across online and offline platforms, leading to improved online presence, enhanced customer engagement, and increased market competitiveness",
  },
  {
    heading: "Great Story Tellers",
    description:
      "We don't just tell. We weave, launching a refined brand identity across online and offline platforms, leading to improved online presence, enhanced customer engagement, and increased market competitiveness",
  },
  {
    heading: "One-stop Solution",
    description:
      "We don't just tell. We weave, launching a refined brand identity across online and offline platforms, leading to improved online presence, enhanced customer engagement, and increased market competitiveness",
  },
];

const   OurWork = () => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const imgRefs = useRef([]);
  const coloredLineRef = useRef(null);
  const prevIdxRef = useRef(0);

  // GSAP animation: fade-out all → fade-in the selected one

  useEffect(() => {
    const prev = prevIdxRef.current;
    const next = selectedIdx;
  
    if (prev === next) return;   // same item – nothing to do
  
    const prevEl = imgRefs.current[prev];
    const nextEl = imgRefs.current[next];
    if (!prevEl || !nextEl) return;
  
    const tl = gsap.timeline();
  
    const forward = next > prev;   // top to bottom
    const backward = next < prev;  // bottom to top
  
    // ---- 1. Animate OUT the previous image ----
    if (forward) {
      // hide from TOP to BOTTOM
      tl.to(prevEl, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 1,
        ease: "power3.out",
      }, 0);
    } else if (backward) {
      // hide from BOTTOM to TOP
      tl.to(prevEl, {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        duration: 1,
        ease: "power3.out",
      }, 0);
    }
  
    // ---- 2. Animate IN the new image ----
    if (forward) {
      // reveal from BOTTOM to TOP
      gsap.set(nextEl, { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" });
      tl.to(nextEl, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1,
        ease: "power3.out",
      }, 0);
    } else if (backward) {
      // reveal from TOP to BOTTOM
      gsap.set(nextEl, { clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" });
      tl.to(nextEl, {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
        duration: 1,
        ease: "power3.out",
      }, 0);
    }
  
  }, [selectedIdx]);

  useEffect(() => {
    const first = imgRefs.current[0];
    if (first) {
      gsap.set(first, { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" });
    }
  }, []);

  // inside handleMouseEnter
  const handleMouseEnter = (idx) => {
    prevIdxRef.current = selectedIdx;    // remember old index
    setSelectedIdx(idx);
  };

  return (
    <section className="z-[2] relative pt-[100px] pb-[150px] bg-[#2aaee4] ">
      <div className="md:px-[25px] px-[15px]">
        <ScrollText scrolltext={scrollText} position="toLeft" className="mb-[80px] text-[100px] bartino-outline tracking-[13px] " color="#000" />

        <div className="section_data flex items-center gap-[150px]">
          <div className="imageBox h-[450px] w-[350px] relative overflow-hidden">
            {images.map((src, i) => (
              <div
                key={i}
                ref={(el) => (imgRefs.current[i] = el)}
                className="absolute inset-0"
                style={{
                  zIndex: images.length - i, // 3, 2, 1 → first image highest
                }}
              >
                <img
                  src={src}
                  alt={`work image ${i + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>

          <div className="contentBox flex-1">
            <ul>
              {dataInitial.map((info, idx)=>{
                const isActive = idx === selectedIdx;

                return(
                  <li
                    key={idx}
                    onMouseEnter={() => handleMouseEnter(idx)}
                    style={{
                      borderBottom:
                        idx === dataInitial.length - 1 ? "none" : "6px solid black",
                      opacity: isActive ? 1 : 0.3,
                      transition:
                        "opacity 0.6s ease-in-out, margin-bottom 0.6s ease-in-out, padding-bottom 1.5s ease-in-out",
                    }}
                    className="cursor-pointer py-[30px]"
                  >
                    <p className="2xl:text-[60px] xl:leading-[50px] lg:text-[50px] text-[30px] uppercase font-[600] font-[Oswald]">
                      {info.heading}
                    </p>

                    <div
                      className={`overflow-hidden transition-all duration-[1.5s] ease-in-out ${
                        isActive
                          ? "max-h-[300px] opacity-100"
                          : "max-h-0 opacity-0 mb-0 pb-0"
                      }`}
                    >
                      <p className="text-[16px] mt-[15px]">{info.description}</p>
                    </div>
                  </li>
                )
              })}


              {/* {data.map((info, index) => {
                return (
                  <li
                    key={index}
                    onMouseEnter={() => handleMouseEnter(index)}
                    style={{
                      borderBottom:
                        index === data.length - 1 ? "none" : "6px solid black",
                      opacity: info.show ? 1 : 0.3,
                      transition:
                        "opacity 0.6s ease-in-out, margin-bottom 0.6s ease-in-out, padding-bottom 1.5s ease-in-out",
                    }}
                    className=" cursor-pointer py-[30px]"
                  >
                    <p className="2xl:text-[60px] xl:leading-[50px] lg:text-[50px] text-[30px] uppercase font-[600] font-[Oswald]">
                      {info.heading}
                    </p>
                    <div
                      className={`overflow-hidden transition-all duration-[1.5s] ease-in-out   ${
                        info.show
                          ? "max-h-[300px] opacity-100 "
                          : "max-h-0 opacity-0 mb-0 pb-0"
                      }`}
                    >
                      <p className="text-[16px] mt-[15px]   ">{info.description}</p>
                    </div>
                  </li>
                );
              })} */}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurWork;
