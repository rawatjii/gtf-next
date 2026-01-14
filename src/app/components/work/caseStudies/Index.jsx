"use client";
import ClipPathAnimation from "@/app/utils/ClipPathAnimation";
import CommonHeading1 from "@/app/utils/CommonHeading1";
import CustomButton from "@/app/utils/CustomButton";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const headingData = "Case Studies";

const CaseStudies = ({ className, data }) => {
  return (
    <section className={className}>
      <div className="container mx-auto">
        <ClipPathAnimation>
          <CommonHeading1
            data={headingData}
            className="text-[100px] leading-[120px]"
          />
        </ClipPathAnimation>

        <div className="grid grid-cols-3 gap-[40px] mt-[100px] max-w-[1100px] mx-auto">
          {data?.map((item, idx) => (
            <div key={idx} className="">
              <div className="relative thumbnail rounded-[20px] overflow-hidden relative">
                <div className="absolute h-full before:absolute before:content-[''] before:w-full before:h-full before:inset-0 before:bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]">
                  <Image src={item.thumbnail} width="700" height="800" alt="" className="h-full object-cover" />
                </div>
                <div className="content inset-0 p-[40px] h-[450px] flex justify-center flex-col text-center">
                  <h4 className="uppercase text-[30px] font-medium ">{item.title}</h4>
                  <p className="text-[16px]  mt-[15px]">{item.shortDesc}</p>
                  <CustomButton className="">Know More</CustomButton>
                </div>
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
