"use client"
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Line from '../Line';
import Header from '../Home/Header';
import SmBox from '@/app/utils/SmBox';

const WorkBanner = () => {
  const headingRef = useRef(null);
  const lineRef = useRef(null);
  const smBoxRef = useRef(null);
  const videoRef = useRef(null);
  const headingItemRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

    if (headingRef.current) {
      tl.fromTo(
        headingRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1 }
      );
    }

    if (lineRef.current) {
      tl.fromTo(
        lineRef.current,
        { opacity: 0, scaleX: 0 },
        { opacity: 1, scaleX: 1, duration: 0.8, delay: -0.2 },
        '<'
      );
    }

    if (smBoxRef.current) {
      tl.fromTo(
        smBoxRef.current,
        { opacity: 0, x: -100 },
        { opacity: 1, x: 0, duration: 0.8 },
        '-=0.5'
      );
    }

    if (videoRef.current) {
      tl.fromTo(
        videoRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1 },
        '-=0.5'
      );
    }

    if (headingItemRef.current) {
      const heading = headingItemRef.current.querySelector('h3');
      const link = headingItemRef.current.querySelector('a');
      tl.fromTo(
        [heading, link],
        { opacity: 0, x: 100 },
        { opacity: 1, x: 0, duration: 0.8, stagger: 0.2 },
        '-=0.5'
      );
    }
  }, []);

  return (
    <div>
      <Header />
      <div className="border-t-[1px] border-dashed border-[#000] py-[80px]">
        <h1
          ref={headingRef}
          className="uppercase font-[oswald] text-[180px] text-center relative"
        >
          our Work{' '}
          <Line
            ref={lineRef}
            height={'h-[30px]'}
            bgColor={'bg-gtf-blue'}
            left="xl:left-[32%] bottom-[48px]"
            bottom={'bottom-[20px]'}
          />
        </h1>
        <div className="grid grid-cols-12">
          <div className="col-span-4 my-auto ml-auto">
            <div ref={smBoxRef}>
              <SmBox
                heading={
                  <p>
                    selected case <span className="lg:block none"></span> studies
                  </p>
                }
                number={10}
              />
            </div>
          </div>
          <div className="col-span-4 m-[auto]">
            <div className="mix-blend-multiply">
              <video
                ref={videoRef}
                src="/assets/work/our_work_id.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full object-cover w-[80px]"
              ></video>
            </div>
          </div>
          <div className="col-span-4 my-auto mr-[auto]">
            <div ref={headingItemRef} className="heading_itm">
              <h3 className="font-[oswald] text-[35px]">
                Good design is a mirror
              </h3>
              <a
                href="#"
                className="flex mt-[10px] text-[#5B5B5B]"
              >
                We update you at every step
                <img
                  src="/assets/work/arrow_one.png"
                  alt="arrow"
                  className="ml-[4px] w-[25px]"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkBanner;