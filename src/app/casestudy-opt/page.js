"use client";
import React, { useEffect, useRef } from 'react';
// import CaseStudyBanner from '../compon';
import DragBuildingComponent from '../components/CaseStudy/DragandDrop';
import CaseStudyBanner from '../components/CaseStudy/CaseStudyBanner';
import { Grid } from '../utils/Grid';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ContactUs = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    const heading = headingRef.current;
    const words = heading.textContent.split(' ').filter(word => word !== '');
    heading.innerHTML = words
      .map((word, index) => {
        if ([2, 5, 7].includes(index)) {
          return `<img src="/assets/heading_${index === 2 ? 'one' : index === 5 ? 'two' : 'three'}.jpg" class="inline-block w-0 h-[100px] object-cover" alt="heading image" data-image />`;
        }
        return `<span class="inline-block text-[#E0E0E0] opacity-30" style="background: linear-gradient(to right, #000 50%, transparent 50%); background-size: 200% 100%; background-position: 100%; -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: #c4c4c4c;">${word}</span>`;
      })
      .join(' ');

    const spans = heading.querySelectorAll('span');
    const images = heading.querySelectorAll('img[data-image]');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=1500',
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    const elements = Array.from(heading.children);
    elements.forEach((element, index) => {
      if (element.tagName === 'SPAN') {
        tl.to(element, {
          backgroundPosition: '0%',
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
        });
      } else if (element.tagName === 'IMG') {
        tl.to(element, {
          width: '200px',
          duration: 0.4,
          ease: 'power2.out',
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="px-[35px]">
      <CaseStudyBanner />
      <section
        ref={sectionRef}
        className="relative w-[100%] border-y-[1px] border-[#000] border-dashed overflow-hidden"
      >
        <div className="text-center py-[100px] pt-[120px]">
          <Grid />
          <div className="relative text-center">
            <h2
              ref={headingRef}
              className="uppercase font-[500] flex-wrap justify-center gap-[10px] text-[#E0E0E0] flex place-items-center font-[oswald] relative z-[1] text-[100px]">
              We help bridge the gap in branding , digital marketing double-digit
            </h2>
          </div>
        </div>
      </section>
      <DragBuildingComponent />
    </div>
  );
};

export default ContactUs;