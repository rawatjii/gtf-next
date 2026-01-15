"use client";
import ClipPathAnimation from "@/app/utils/ClipPathAnimation";
import CommonHeading1 from "@/app/utils/CommonHeading1";
import CustomButton from "@/app/utils/CustomButton";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import StaggeredLogoSwitcher from "../../Home/Client_sec";

const headingData = "Our Clients";

gsap.registerPlugin(ScrollTrigger);

const logoSets = [
  {
    
    src: "https://gtftechnologies.com/images/clients/emaar.png",
  },
  {
    
    src: "https://gtftechnologies.com/images/clients/aipl.png",
  },
  {
    
    src: "https://gtftechnologies.com/images/clients/skytech.png",
  },
  {
    
    src: "https://gtftechnologies.com/images/clients/eon.png",
  },
  {
    
    src: "https://gtftechnologies.com/images/clients/pyramid.png",
  },
  {
    
    src: "https://gtftechnologies.com/images/clients/jprime.png",
  },
  {
    
    src: "https://gtftechnologies.com/images/clients/chordia.png",
  },
  {
    
    src: "https://gtftechnologies.com/images/clients/fortune_group.png",
  },
  {
    
    src: "https://gtftechnologies.com/images/clients/nawah.png",
  },
  {
    
    src: "https://gtftechnologies.com/images/clients/ashwin-sheth.png",
  },
  {
    
    src: "https://gtftechnologies.com/images/clients/range.png",
  },
  {
    
    src: "https://gtftechnologies.com/images/clients/mvn.png",
  },
  {
    
    src: "https://gtftechnologies.com/images/clients/client23.png",
  },
];

const Clients = ({ className, data }) => {
  const headingRef = useRef(null);
  const sectionRef = useRef(null);

  return (
    <section ref={sectionRef} className={` ${className}  `}>
      <div className="container mx-auto">
        <div ref={headingRef} className="heading">
          <ClipPathAnimation reverse="false">
            <CommonHeading1
              data={headingData}
              className="text-[100px] leading-[120px]"
            />
          </ClipPathAnimation>
        </div>

        <div className="overflow-hidden relative w-full main_border_cmp border-black mt-[50px]">
          {/* <ul
            className="grid grid-cols-2 border-none sm:grid-cols-3 md:grid-cols-5 w-full border-[2px]"
          > */}
          <StaggeredLogoSwitcher logoSets={logoSets} type="client" />
          {/* </ul> */}
        </div>
      </div>
    </section>
  );
};

export default Clients;
