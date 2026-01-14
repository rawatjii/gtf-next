"use client";
import React, { useEffect, useRef } from "react";
import ClipPathAnimation from "@/app/utils/ClipPathAnimation";
import CommonHeading1 from "@/app/utils/CommonHeading1";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WhyChooseUs = ({ data, className }) => {
  const contentRef = useRef([]);
  const leftContentRef = useRef([]);
  const rightContentRef = useRef([]);

  // Reset refs to ensure proper handling
  contentRef.current = [];
  leftContentRef.current = [];
  rightContentRef.current = [];

  useEffect(()=>{

    const ctx = gsap.context(()=>{
      Object.values(data?.data || {}).forEach((item, idx)=>{
        ScrollTrigger.create({
          trigger:contentRef.current[idx],
          start:"top 80%",
          onEnter:()=>{
            gsap.to(leftContentRef.current[idx], {
              x:"30px",
              duration:0.4,
              ease:"Power4.out"
            });
            gsap.to(rightContentRef.current[idx], {
              x:"-30px",
              duration:0.4,
              ease:"Power4.out"
            });
          },
          onEnterBack:()=>{
            gsap.to(leftContentRef.current[idx], {
              x:"0",
              duration:0.4,
              ease:"Power4.out"
            });
            gsap.to(rightContentRef.current[idx], {
              x:"0",
              duration:0.4,
              ease:"Power4.out"
            });
          }
        })
      })
    });

    return()=>ctx.revert();

  }, [])

  return (
    <section className={className}>
      <div className="container mx-auto">
        <ClipPathAnimation reverse="false">
          <CommonHeading1 data={data.heading} />
        </ClipPathAnimation>

        <ClipPathAnimation reverse="false" className="mt-[30px]">
          <p className="max-w-[1000px] mx-auto text-center text-[14px] tracking-[0.5px] text-[#8d8d8d]">
            {data.subPara}
          </p>
        </ClipPathAnimation>

        <div className="contentArea max-w-[1000px] mx-auto mt-[100px]">
          {Object.values(data?.data || {}).map((item, idx)=>(
            <div ref={(el)=>contentRef.current.push(el)} key={idx} className="grid grid-cols-2 gap-[40px] mb-[150px]">

              <div ref={(el)=>leftContentRef.current.push(el)} className="col-span-1 p-[50px] rounded-[10px] relative">
                <div className="bordered_div absolute pointer-none inset-0 "
                  style={{
                    background: 'linear-gradient(255.64deg, #e24397 5.01%, rgba(31, 117, 255, 0) 50%), linear-gradient(123.03deg, hsla(0, 0%, 100%, .2) 17.01%, hsla(0, 0%, 100%, 0) 50%)',
                    borderRadius: '15px',
                    boxSizing: 'border-box',
                    inset: '0',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'destination-out',
                    maskComposite: 'destination-out',
                    padding: '1px',
                    pointerEvents: 'none',
                    position: 'absolute',
                    zIndex: 2,
                  }}
                ></div>
                <h4 className="text-[26px] font-medium tracking-[0.5px] leading-[30px]">{item[0].title}</h4>
                <p className="mt-[20px] text-[15px]">{item[0].para}</p>
              </div>

              <div ref={(el) => rightContentRef.current.push(el)} className="col-span-1 p-[50px] rounded-[10px] translate-y-[50px]"
                style={{
                  background: "linear-gradient(108.01deg, #e24397 -21.5%, #9f0958)"
                }}
              >
                <h4 className="text-[26px] font-medium tracking-[0.5px] leading-[30px]">{item[1].title}</h4>
                <p className="mt-[20px] text-[15px]">{item[1].para}</p>
              </div>

            </div>
          ))}
          

        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
