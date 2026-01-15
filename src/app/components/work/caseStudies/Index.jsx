"use client";
import ClipPathAnimation from "@/app/utils/ClipPathAnimation";
import CommonHeading1 from "@/app/utils/CommonHeading1";
import CustomButton from "@/app/utils/CustomButton";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const headingData = "Case Studies";

gsap.registerPlugin(ScrollTrigger);

// Define your colors
const colors = [
  "e24397", // First color
  "d0bb0a", // Second color
  "2aaee4", // Third color
];

const Thumbnail = styled.div`
  position:absolute;
  height:100%;
  width:100%;

  &::before{
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color:${(props)=>`#${props.bgColor}70`}
  }
`;

const StyledCustomButton = styled(CustomButton)`
  background-color: ${(props) => `#${props.bgColor}`};
  color: white;
  border-radius: 100px;
  padding: 10px 30px;
  text-transform: uppercase;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.5px;
`;

const CaseStudies = ({ className, data }) => {
  const headingRef = useRef(null);
  const sectionRef = useRef(null);
  

  useEffect(()=>{
    gsap.context(()=>{

      const scrollTrigger = ScrollTrigger.create({
        trigger: sectionRef.current, // Container where items are located
        start: "top top", // Pin when the top of the container hits the top of the viewport
        end: "bottom 80%", // Pin duration, you can adjust this based on your content
        pin: headingRef.current, // Pin the heading element
        pinSpacing: false, // Optional, to remove extra space after pinning
        scrub: true, // Scrubbing effect, so it syncs with scrolling
      });

      return () => {
        // Clean up ScrollTrigger
        scrollTrigger.kill();
      };

    }, headingRef);
  }, []);

  return (
    <section ref={sectionRef} className={` ${className}  `}>
      <div className="container mx-auto">
        <div className="h-screen flex items-center justify-center">
          <div ref={headingRef} className="heading">
            <ClipPathAnimation reverse="false">
              <CommonHeading1
                data={headingData}
                className="text-[100px] leading-[120px]"
              />
            </ClipPathAnimation>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-[40px] max-w-[1100px] mx-auto">
          {data?.map((item, idx) => {
            // Add rotation styles for first and third elements
            const rotateStyle =
              idx % 3 === 0
                ? { transform: "rotate(-10deg)" }
                : idx % 3 === 2
                ? { transform: "rotate(10deg)" }
                : {};


            return <div key={idx} className="mb-[200px]" style={rotateStyle}>
              <div className="relative rounded-[20px] overflow-hidden relative">
                <Thumbnail bgColor={colors[idx%3]}>
                  <Image
                    src={item.thumbnail}
                    width="700"
                    height="800"
                    alt=""
                    className="h-full object-cover"
                  />
                </Thumbnail>
                <div className="content relative inset-0 p-[40px] h-[450px] flex justify-center items-center flex-col text-center">
                  <h4 className="uppercase text-[34px] font-medium text-white leading-[40px]">
                    {item.title}
                  </h4>
                  {/* <p className="text-[16px]  mt-[15px]">{item.shortDesc}</p> */}
                  <StyledCustomButton bgColor={colors[idx % 3]}>
                    Know More
                  </StyledCustomButton>
                  {/* <CustomButton className={` rounded-[100px] px-[30px] py-[10px] uppercase text-[13px] font-medium tracking-[0.5px]`}
                    style={{
                      backgroundColor: `#${colors[idx % 3]}`,
                    }}
                  >Know More</CustomButton> */}
                  
                </div>
              </div>
            </div>
          })}
        </div>


      </div>
    </section>
  );
};

export default CaseStudies;
