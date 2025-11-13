"use client";
import { useState, useRef } from "react";
import Line from "../Line";
import { MdArrowOutward } from "react-icons/md";
import gsap from "gsap";

const data = [
  "300 Minds",
  "06 LOCATIONS",
  "One Team"
];

const colors = [
  "#e24397",
  "#fde93d",
  "#2aaee4"
]

const LocationMap = () => {
  return (
    <section className="relative map_section py-[100px] border-t border-t-[#ccc] h-screen flex items-center justify-center">
      <div className="map h-full w-full flex items-center justify-center absolute top-0 left-0 w-full h-full opacity-50 z-[-1]">
        <img
          src="/assets/map/map.png"
          className="max-w-[700px]"
        />
      </div>

      <div className="content grid gap-[30px]">
        {data.map((item, index)=>(
          <h3 key={index} className={`text-[140px] uppercase bartino leading-[100px] text-center tracking-[1px]`} style={{ color: colors[index] }}>{item}</h3>
        ))}
      </div>
      
    </section>
  );
};

export default LocationMap;
