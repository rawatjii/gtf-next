import React, { useEffect, useRef } from "react";
import Line from "../components/Line";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CommonHeading1({
  data
}) {

  const headingRef = useRef(null);

  return (
    <h2 className="neue_font font-medium relative 2xl:leading-[70px] px-[100px]  xl:leading-[70px]  leading-[35px] md:basis-[50%] max-h-fit text-[30px] xl:text-[40px] md:text-[50px] 2xl:text-[54px] z-[1] tracking-0 text-center uppercase">
      <span className="block font-light capitalize">
        {data?.light?.text}
      </span>
      <span className="block">{data?.bold?.text}</span>
    </h2>
  );
}
