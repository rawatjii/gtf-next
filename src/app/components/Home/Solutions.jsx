"use client";
import { useState, useRef } from "react";
import Line from "../Line";
import { MdArrowOutward } from "react-icons/md";
import gsap from "gsap";

const services = [
  "Brand Strategy",
  "Communication",
  "Annual Maintenance of Website",
  "Paid Ads",
  "YouTube Marketing",
  "Social Media Marketing",
  "Creative",
  "Website Design and Development",
  "Search Engine Optimization",
  "Display Marketing",
  "Social Media Optimization",
  "Online Reputation Management Marketing",
];

const serviceImages = {
  "Brand Strategy": "/assets/home/work/work1.jpg",
  "Communication": "/assets/home/work/work2.jpg",
  "Annual Maintenance of Website": "/assets/home/work/work3.jpg",
  "Paid Ads": "/assets/home/work/work1.jpg",
  "YouTube Marketing": "/assets/home/work/work2.jpg",
  "Social Media Marketing": "/assets/home/work/work3.jpg",
  "Creative": "/assets/home/work/work1.jpg",
  "Website Design and Development": "/assets/home/work/work2.jpg",
  "Search Engine Optimization": "/assets/home/work/work3.jpg",
  "Display Marketing": "/assets/home/work/work1.jpg",
  "Social Media Optimization": "/assets/home/work/work2.jpg",
  "Online Reputation Management Marketing": "/assets/home/work/work3.jpg",
};


const Solutions = () => {
  const [hoveredService, setHoveredService] = useState(null);
  const coloredLineRef = useRef(null);
  const imgRef = useRef(null);
  const cursorRef = useRef(null);
  const tl = useRef(null);

  const handleMouseEnter = (service)=>{
    setHoveredService(service);
    // tl.current?.restart();
  }

  const handleMouseMove = (e)=>{
    if(!cursorRef.current) return;

    gsap.to(cursorRef.current, {
      x:e.clientX + 15,
      y:e.clientY + 15,
      duration:0.6,
      ease:"power3.out",
    })
  }

  return (
    <section className="mix-blend-multiply">

      <div className="md:pt-[90px] md:pb-[50px] py-[60px] md:text-start text-center md:px-[35px] px-[15px]">
        <h3 className="uppercase relative md:text-start md:text-start text-center inline-block md:leading-[70px] leading-[normal]">
          <span className="bartino-outline tracking-[2px] lg:text-[60px] 2xl:text-[72px]  md:text-[50px] text-[32px] block">
            the solutions you need
          </span>
          <span className="font-[Oswald] md:pl-[7.5rem] block font-medium xl:text-[60px] 2xl:text-[65px] md:text-[50px] text-[32px]">
            tailored for success.
          </span>
          <Line
            ref={coloredLineRef}
            bgColor="bg-gtf-blue"
            left="left-[48%] lg:left-[61%]"
          />{" "}
        </h3>

        
        <ul className="border-t-[2px] flex justify-between items-center flex-wrap md:mt-[90px] mt-[25px] pt-[30px] border-dotted border-black"
          onMouseMove={handleMouseMove}
        >
          {services.map((serv) => {
            return (
              <li
                key={serv}
                className="md:pb-[15px] py-[12px] md:basis-[48%] basis-[100%] flex justify-between border-b-[1px] border-black border-b-bottom border-solid md:mb-[20px] items-center"
                onMouseEnter={()=>handleMouseEnter(serv)}
              >
                <span className="font-medium uppercase font-[Oswald] md:text-[20px] text-[18px]">
                  {serv}
                </span>
                <span>
                  <MdArrowOutward className="text-[26px] font-[300]" />
                </span>
              </li>
            );
          })}
        </ul>

        {/* ── Floating image (200×200) ── */}
        <div
          ref={cursorRef}
          className="fixed top-0 left-0 w-[200px] h-[200px] pointer-events-none z-50 hidden md:block"
          style={{ transform: "translate(-50%, -50%)" }}
        >
          <img
            ref={imgRef}
            src={hoveredService ? serviceImages[hoveredService] : undefined}
            alt={hoveredService ?? ""}
            className="w-full h-full object-cover rounded-lg shadow-2xl"
            style={{ opacity: 0 }} // GSAP handles opacity
          />
        </div>

      </div>
    </section>
  );
};

export default Solutions;
