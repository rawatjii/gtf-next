"use client";
import React, { useEffect, useRef } from "react";
import ClipPathAnimation from "@/app/utils/ClipPathAnimation";
import CommonHeading1 from "@/app/utils/CommonHeading1";
import HorizontalScroll from "@/app/utils/HorizontalScroll";


const Services = ({ data, className }) => {

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

        <HorizontalScroll data={data.data} className="mt-[80px]" />
      </div>
    </section>
  );
};

export default Services;
