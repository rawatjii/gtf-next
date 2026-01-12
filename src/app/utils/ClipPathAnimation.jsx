"use client"
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ClipPathAnimation = ({children, reverse, className}) => {
  const anRef = useRef(null);

  useEffect(()=>{
    gsap.set(anRef.current,{
      clipPath:"inset(100% 0 0 0)"
    })

    ScrollTrigger.create({
      trigger:anRef.current,
      start:"top 90%",
      onEnter:()=>{
        gsap.to(anRef.current, {
          clipPath: "inset(0% 0 0 0)",
          duration: 1,
          ease: "power3.out",
        })
      },
      onLeave: () => {
        // Optional: Add an animation to hide the heading when leaving the viewport
        gsap.to(anRef.current, {
          clipPath: reverse ? "inset(0 0 0 0)" : "inset(100% 0 0 0)", // Hide the heading again
          duration: 1,
          ease: "power3.out",
        });
      },
      onEnterBack:()=>{
        gsap.to(anRef.current, {
          clipPath: "inset(0% 0 0 0)",
          duration: 1,
          ease: "power3.out",
        })
      },
      onLeaveBack:()=>{
        gsap.to(anRef.current, {
          clipPath: "inset(100% 0 0 0)", // Hide the heading again
          duration: 1,
          ease: "power3.out",
        });
      }
    })
  },[])

  return (
    <div ref={anRef} className={`${className}`}>
      {children}
    </div>
  )
}

export default ClipPathAnimation