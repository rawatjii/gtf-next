"use client";
import React, { useEffect, useRef } from "react";
import ClipPathAnimation from "@/app/utils/ClipPathAnimation";
import CommonHeading1 from "@/app/utils/CommonHeading1";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CustomButton from "@/app/utils/CustomButton";

gsap.registerPlugin(ScrollTrigger);

const colors = ["#e24397", "#776b04", "#2aaee4", "#e24397", "#776b04", "#2aaee4"]

const WeDo = ({data}) => {
  const overviewDataRef = useRef(null);
  const sectionRef = useRef(null);
  const mainContentRef = useRef(null);
  const singleContentRef = useRef(null);

  useEffect(()=>{
    const ctx = gsap.context(()=>{
      ScrollTrigger.create({
        trigger:sectionRef.current,
        start:"top 50%",
        end:"bottom 100%",
        onEnter:()=>{
          gsap.to("body", {
            backgroundColor: "black",
            color: "white",
            duration: 0.6,
            ease: "power2.inOut",
          })
        },
        onLeave: () => {
          gsap.to("body", {
            backgroundColor: "white", // Reset body background to white
            color: "black", // Reset text color to black
            duration: 1, // Set duration for the color reset
          });
        },
        onEnterBack: () => {
          gsap.to("body", {
            backgroundColor: "black",
            color: "white",
            duration: 1,
          });
        },
        onLeaveBack: () => {
          gsap.to("body", {
            backgroundColor: "white",
            color: "black",
            duration: 1,
          });
        },
      });
    });

    return ()=>ctx.revert();
  }, []);

  useEffect(()=>{
    const contentCtx = gsap.context(()=>{
      const singleContents = document.querySelectorAll('.singleContent');

      singleContents.forEach((content, index)=>{
        const paras = document.querySelectorAll('.contentBox');
        const headings = document.querySelectorAll('.heading');
        

          gsap.fromTo(
            paras[index],
            {
              y:"-250px"
            },
            {
              y:"0",
              duration:1,
              ease:"power4.out",
              scrollTrigger:{
                trigger:content,
                start:"top 100%",
                end:"bottom top",
                scrub:true,
                toggleActions:"play none none reverse"
              }
            }
          ) ;

          gsap.fromTo(
            headings[index],
            {
              y:"250px"
            },
            {
              y:"0",
              duration:1,
              ease:"power4.out",
              scrollTrigger:{
                trigger:content,
                start:"top 100%",
                end:"bottom top",
                scrub:true,
                toggleActions:"play none none reverse"
              }
            }
          )

      })

      
    });

    return ()=>contentCtx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-[100px]">
      <div className="container mx-auto">
        <div ref={overviewDataRef}>
          <ClipPathAnimation reverse="false">
            <CommonHeading1 data={data.heading} className="2xl:text-[80px]" />
          </ClipPathAnimation>

          <div ref={mainContentRef} className="mt-[150px] max-w-[1200px] mx-auto text-center">
            {data.data?.map((data, idx)=>(
              <div key={idx} className="singleContent mb-[150px] ">
                <h3 className="heading text-[60px] font-medium max-w-[500px] uppercase mx-auto leading-[65px]">{data.title}</h3>
                <div className={`contentBox max-w-[500px] px-[40px] py-[40px] rounded-[15px] mt-[50px] ${idx%2 == 0 ? "ml-auto" : undefined}`} style={{
                    backgroundColor:colors?.[idx]
                  }}>
                  <div className={`paragraphs text-left text-[16px] tracking-[]` } 
                    style={{
                      display: "-webkit-box",
                      overflow: "hidden",
                      WebkitBoxOrient: "vertical",
                      textOverflow: "ellipsis",
                      WebkitLineClamp: 10,
                    }}
                  >
                    {typeof data?.desc == 'string' ? <p>{data.desc}</p> : data.desc?.map((item, itemIdx)=><p className="mb-[10px]">{item}</p>)}
                  </div>
                  <CustomButton className="bg-white text-black px-[20px] py-[10px] text-[14px] tracking-[0.5px] rounded-md">Know More</CustomButton>
                </div>
              </div>
            ))}

          </div>

        </div>
      </div>
    </section>
  );
};

export default WeDo;
