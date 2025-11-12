"use client"
import React from 'react'
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);


export default function Accordion() {
  const sectionRefBanner = useRef(null);
useEffect(() => {
  const sectionVar = sectionRefBanner.current;
  const accordionItems = document.querySelectorAll(".accordion_item");
  
  if (!sectionVar || accordionItems.length === 0) return;
  
  const numberOfItems = accordionItems.length;
  const itemHeight = 100;
  const dynamicEnd = `+=${numberOfItems * itemHeight}px`;
  
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: document.querySelector("#brandAccordion"),
      start: "top 50%",
      end: dynamicEnd,
      scrub: 2, 
    },
    defaults: { 
      ease: "ease.in", 
      duration: 2 
    },
  });

  const accordionData = Array.from(accordionItems).map(item => ({
    borderLine: item.querySelector(".border_line"),
    border_line2: item.querySelector(".border_line2"),
    mainContent: item.querySelector(".main_content"),
    paragraph: item.querySelector(".text-content"),
    iconItem: item.querySelector(".icons_itm")
  }));

  accordionData.forEach((elements, index) => {
    const { borderLine, mainContent, paragraph, iconItem, border_line2 } = elements;
    
    if (!borderLine || !mainContent) return;
    
    const startTrigger = `top+=${index * 210} center`;
    const endTrigger = `top+=${(index + 1) * 180} center`;
    
    const scrollTriggerConfig = {
      trigger: sectionVar,
      start: startTrigger,
      end: endTrigger,
      scrub: 1.5,
      marker:true
    };

    const startPosition = index === 0 ? 0 : "-=0.2";
    
    tl.fromTo(
      borderLine,
      { 
        width: "60%",
      },
      {
        width: "100%",
        ease: "ease.in",
        scrollTrigger: scrollTriggerConfig
      },
      startPosition
    );
    
    tl.fromTo(
      border_line2,
      { 
        width: "60%",
      },
      {
        width: "100%",
        ease: "ease.in",
        scrollTrigger: scrollTriggerConfig
      },
      "<0.1" 
    );

    tl.fromTo(
      mainContent,
      { 
        width: "60%",
        paddingTop: "20px",
        paddingBottom: "20px",  
        opacity: 0.7,
        scale: 0.98,
        y: 10
      },
      {
        width: "60%",
        paddingTop: "80px",
        paddingBottom: "75px",
        opacity: 1,
        scale: 1,
        y: 0,
     
        ease: "ease.in",
        scrollTrigger: scrollTriggerConfig
      },
      "<0.15" 
    );

    if (paragraph) {
      tl.fromTo(
        paragraph,
        {
          opacity: 0,
         display:"none",
          paddingTop: '0',
        },
        {
          opacity: 1,
          paddingTop: '15px',
          display:"block",
          ease: "ease.in", 
          scrollTrigger: scrollTriggerConfig
        },
        "<0.2" 
      );
    }

    if (iconItem) {
      tl.fromTo(
        iconItem,
        {
          display: "none",
          opacity: 0,
          scale: 0.3,
          transformOrigin:"center center"
        },
        {
          display: "block",
          opacity: 1,
          scale: 1,
            transformOrigin:"center center",
          ease: "ease.in", 
          scrollTrigger: scrollTriggerConfig
        },
        "<0.25" 
      );
    }
  });



  const trigger = tl.scrollTrigger;
  
  return () => {
    if (trigger) trigger.kill();
  };
}, ["accordion"]);
  return (
    <div className='accordion_main_sec pb-[80px] relative  mix-blend-multiply' id="brandAccordion" ref={sectionRefBanner}>
      <div className='accordion_item  relative overflow-hidden align-items-center ml-[auto]'>
           <div className='h-[2px] bg-[#000] w-[calc(60% - 10px)] hidden relative z-[6]  ml-[auto] border_line border-[#000]'></div>
           <div className='flex relative main_content   justify-start py-[20px] w-[70%] ml-[auto]'>
               <video src="/assets/brand/brand_audit_icon.mp4" autoPlay
                  muted
                  loop
                  playsInline
                  className="w-[320px] z-[-1] absolute top-[2%] left-[-308px] object-cover icons_itm"
                ></video>
            <div className='accordion_content text-start'>
            <h4 className='font-[oswald] font-[500] uppercase grow-[1] shrink-[1] leading-[normal] text-[38px]'>Brand Audits</h4>
            <p className='opacity-[0] text-content text-[#5B5B5B] leading-[30px]'>GTF Technologies will conduct a comprehensive audit of the client’s core assets, identifying those areas that can be leveraged to create opportunity and form a compelling brand positioning.</p>
            </div>
        </div>
      
           <div className='h-[2px] bg-[#000] w-[calc(60% - 10px)] relative  ml-[auto] mt-[16px] border_line2 border-[#000]'></div>

      </div>
      <div className='accordion_item  relative overflow-hidden align-items-center ml-[auto]  '>
           <div className='h-[2px] bg-[#000] w-[calc(60% - 10px)] hidden relative z-[6]  ml-[auto] border_line border-[#000]'></div>
           <div className='flex relative main_content   justify-start py-[20px] w-[70%] ml-[auto]'>
            <video
                  src="/assets/brand/brand_audit_icon.mp4" 
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-[320px] z-[-1] absolute top-[2%] left-[-308px] object-cover icons_itm"
                ></video>
            <div className='accordion_content text-start'>
            <h4 className='font-[oswald] font-[500] uppercase grow-[1] shrink-[1] leading-[normal] text-[38px]'>Competitor Research And Analysis</h4>
            <p className='opacity-[0] text-content text-[#5B5B5B] leading-[30px]'>GTF Technologies will conduct a comprehensive audit of the client’s core assets, identifying those areas that can be leveraged to create opportunity and form a compelling brand positioning.</p>
            </div>
        </div>
      
           <div className='h-[2px] bg-[#000] w-[calc(60% - 10px)] relative  ml-[auto] mt-[16px] border_line2 border-[#000]'></div>

      </div>
      <div className='accordion_item  relative overflow-hidden align-items-center ml-[auto]  '>
           <div className='h-[2px] bg-[#000] w-[calc(60% - 10px)] hidden relative z-[6]  ml-[auto] border_line border-[#000]'></div>
           <div className='flex relative main_content   justify-start py-[20px] w-[70%] ml-[auto]'>
          <video
                  src="/assets/brand/brand_audit_icon.mp4" 
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-[320px] z-[-1] absolute top-[2%] left-[-308px] object-cover icons_itm"
                ></video>
            <div className='accordion_content text-start'>
            <h4 className='font-[oswald] font-[500] uppercase grow-[1] shrink-[1] leading-[normal] text-[38px]'>Consumer And Target Segmentation Analysis</h4>
            <p className='opacity-[0] text-content text-[#5B5B5B] leading-[30px]'>GTF Technologies will conduct a comprehensive audit of the client’s core assets, identifying those areas that can be leveraged to create opportunity and form a compelling brand positioning.</p>
            </div>
        </div>
      
           <div className='h-[2px] bg-[#000] w-[calc(60% - 10px)] relative  ml-[auto] mt-[16px] border_line2 border-[#000]'></div>

      </div>
      <div className='accordion_item  relative overflow-hidden align-items-center ml-[auto]  '>
           <div className='h-[2px] bg-[#000] w-[calc(60% - 10px)] hidden relative z-[6]  ml-[auto] border_line border-[#000]'></div>
           <div className='flex relative main_content   justify-start py-[20px] w-[70%] ml-[auto]'>
              <video
                  src="/assets/brand/brand_audit_icon.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-[320px] z-[-1] absolute top-[2%] left-[-308px] object-cover icons_itm"
                ></video>
            <div className='accordion_content text-start'>
            <h4 className='font-[oswald] font-[500] uppercase grow-[1] shrink-[1] leading-[normal] text-[38px]'>Brand Creation</h4>
            <p className='opacity-[0] text-content text-[#5B5B5B] leading-[30px]'>GTF Technologies will conduct a comprehensive audit of the client’s core assets, identifying those areas that can be leveraged to create opportunity and form a compelling brand positioning.</p>
            </div>
        </div>
      
           <div className='h-[2px] bg-[#000] w-[calc(60% - 10px)] relative  ml-[auto] mt-[16px] border_line2 border-[#000]'></div>

      </div>
      <div className='accordion_item  relative overflow-hidden align-items-center ml-[auto]  '>
           <div className='h-[2px] bg-[#000] w-[calc(60% - 10px)] hidden relative z-[6]  ml-[auto] border_line border-[#000]'></div>
           <div className='flex relative main_content   justify-start py-[20px] w-[70%] ml-[auto]'>
          <video
                  src="/assets/brand/brand_audit_icon.mp4"
                  
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-[320px] z-[-1] absolute top-[2%] left-[-308px] object-cover icons_itm"
                ></video>
            <div className='accordion_content text-start'>
            <h4 className='font-[oswald] font-[500] uppercase grow-[1] shrink-[1] leading-[normal] text-[38px]'>Brand Culture And Concept Development</h4>
            <p className='opacity-[0] text-content text-[#5B5B5B] leading-[30px]'>GTF Technologies will conduct a comprehensive audit of the client’s core assets, identifying those areas that can be leveraged to create opportunity and form a compelling brand positioning.</p>
            </div>
        </div>
      
           <div className='h-[2px] bg-[#000] w-[calc(60% - 10px)] relative  ml-[auto] mt-[16px] border_line2 border-[#000]'></div>

      </div>
      


    </div>
  )
}
