"use client"
import React, { useEffect, useRef } from 'react';
import JobOpeningCard from './JobOpeningCard';
import Line from '../Line';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function JobOpening() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 50%',
          scrub: false,
          toggleActions: 'play none none none',
        },
      }
    );

    gsap.fromTo(
      descriptionRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 50%',
          scrub: false,
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      className="p-[80px] mb-[80px] border-b-[1px] border-dashed border-[#000] "
      ref={sectionRef}
    >
      <div className="grid grid-cols-12 pb-[80px]">
        <div className="col-span-6">
          <h2
            className="uppercase relative text-[80px] font-[600] font-[oswald]"
            ref={titleRef}
          >
            Job Openings
            <Line
              bgColor={'bg-[#E24397]'}
              left="xl:left-[24%]"
              bottom={'bottom-[20px]'}
            />
          </h2>
        </div>
        <div className="col-span-6 m-[auto]">
          <p
            className="uppercase font-[oswald] font-[500] text-[24px]"
            ref={descriptionRef}
          >
            Ready for your next challenge? See which roles we’re
            <span className="lg:block"></span> hiring for right now.
          </p>
        </div>
      </div>
      <div className="job_card_main">
        <JobOpeningCard />
      </div>
    </section>
  );
}