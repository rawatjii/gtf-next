"use client";
import { useState, useRef } from "react";
import Line from "../Line";
import { MdArrowOutward } from "react-icons/md";
import gsap from "gsap";

const WhoWeAreNew = () => {
  const transformValue = '300';

  return (
    <section className="relative h-screen flex items-center justify-center">
      <div>
        <div className=""
         style={{
          transform:`translateY(-${transformValue}px)`
        }}>
          <div className="icons flex items-center justify-center">
            <span className="icon pink">
              <img
                src="/assets/logos/pink_color.svg"
                alt="pink logo icon"
                className="img-fluid w-[40px]"
              />
            </span>
            <span className="icon yellow ml-[-10px]">
              <img
                src="/assets/logos/yellow_color.svg"
                alt="yellow logo icon"
                className="img-fluid w-[40px]"
              />
            </span>
            <span className="icon pink ml-[-10px]">
              <img
                src="/assets/logos/blue_color.svg"
                alt="blue logo icon"
                className="img-fluid w-[40px]"
              />
            </span>
          </div>

          <h3 className="text-[100px] bartino-outline uppercase">Who We Are</h3>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAreNew;
