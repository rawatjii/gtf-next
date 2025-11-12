"use client";
import { useRef } from "react";
import Line from "../Line";
import Contactform from "../Contactform";
const Contact = () => {
  const coloredLineRef = useRef(null);
  return (
    <section className="md:mb-[100px]">
      <div style={{backgroundImage: `url("/assets/home/clients/bg.png")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }} className="relative md:mt-[1rem]">
        <h3 className="uppercase md:pt-[5rem] py-[60px] inline-block md:pl-[35px] md:text-start text-center  relative md:leading-[70px] md:px-0 px-[15px]">
          <span className="bartino-outline tracking-[2px] 2xl:text-[72px] md:text-start  lg:text-[60px] md:text-[50px] text-[32px] block">
            tell us about your project 
          </span>
          <span className="font-[Oswald] relative md:pl-[15.1rem] block font-medium  md:text-start 2xl:text-[72px] lg:text-[60px] md:text-[50px] text-[32px]">
            ideas or just say hello.
            <Line
              ref={coloredLineRef}
              bgColor="bg-gtf-pink"
              left="left-[48%] xl:left-[61%]"
            />
          </span>
        </h3>
      </div>
      <div className="bg-[#2AAEE4] md:px-[35px] px-[15px]  z-[2] mix-blend-multiply ">
      <Contactform/>
      </div>
  
    </section>
  );
};

export default Contact;
