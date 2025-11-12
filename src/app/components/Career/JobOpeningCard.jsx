"use client"
import React, { useEffect, useRef } from 'react';
import { MdArrowOutward } from 'react-icons/md';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function JobOpeningCard() {
  const cardRefs = useRef([]); 
  const buttonRefs = useRef([]);
  const listItemRefs = useRef([]);

  const addToRefs = (el, refArray) => {
    if (el && !refArray.current.includes(el)) {
      refArray.current.push(el);
    }
  };

  useEffect(() => {
    cardRefs.current.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            end: 'top 50%',
            scrub: false,
            toggleActions: 'play none none none',
          },
        }
      );
    });

    buttonRefs.current.forEach((button) => {
      button.addEventListener('mouseenter', () => {
        gsap.to(button, {
          scale: 1.05,
          duration: 0.3,
          ease: 'power2.out',
        });
      });
      button.addEventListener('mouseleave', () => {
        gsap.to(button, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
        });
      });
    });

    listItemRefs.current.forEach((list) => {
      gsap.fromTo(
        list.children,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: {
          trigger: list,
          start: 'top 80%',
          end: 'top 50%',
          scrub: false,
          toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => {
      buttonRefs.current.forEach((button) => {
        button.removeEventListener('mouseenter', () => {});
        button.removeEventListener('mouseleave', () => {});
      });
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const renderJobCard = () => (
    <div
      className="job_card_item bg-[#DFDFDF33] p-[50px] mb-[50px] border-[1px] border-[#1E251F] border-dashed"
      ref={(el) => addToRefs(el, cardRefs)}
    >
      <div className="flex justify-between">
        <div>
          <h3 className="text-[32px] font-[oswald] font-[500] uppercase">Graphic Designer</h3>
          <ul className="listing_container p-0 flex mt-[15px]">
            <li className="flex">
              <img
                className="me-[6px]"
                src="/assets/career/bi_briefcase-fill.svg"
                alt="Briefcase"
              />
              <span className="text-[#5B5B5B]">Minimum 3 Years</span>
            </li>
            <li className="flex ms-4">
              <img
                className="me-[6px]"
                src="/assets/career/mdi_location.svg"
                alt="Location"
              />
              <span className="text-[#5B5B5B]">Noida</span>
            </li>
          </ul>
        </div>
        <span className="inline-block mt-[14px] font-[oswald] font-[500] uppercase">
          4 month ago
        </span>
      </div>
      <div className="grid grid-cols-12 mt-[50px]">
        <div className="col-span-5">
          <h4 className="font-[500] uppercase text-[24px] font-[oswald] mb-[30px]">
            Required Candidate profile
          </h4>
          <p className="text-[#5B5B5B]">
            We are seeking a talented Graphic Designer to join our team and help us elevate
            our visual storytelling.
          </p>
          <div className="flex place-items-center btn_container mt-[50px]">
            <button
              className="bg-[black] w-[100%] lg:w-auto font-[600] uppercase font-[Oswald] rounded-md shadow-md text-white cursor-pointer xl:text-[18px] text-[16px] outline-none px-[2.2rem] py-[0.54rem] text-center transition-transform duration-150 ease-in-out hover:shadow-lg hover:-translate-y-1"
              ref={(el) => addToRefs(el, buttonRefs)}
            >
              Apply Now
            </button>
            <a href="#">
              <div
                className="flex items-center justify-end ps-[30px]"
                ref={(el) => addToRefs(el, buttonRefs)}
              >
                <p className="mr-[10px] uppercase font-[Oswald] text-[18px]">
                  VIEW DETAILS
                </p>
                <MdArrowOutward className="bg-[#ddd]" />
              </div>
            </a>
          </div>
        </div>
        <div className="col-span-2"></div>
        <div className="col-span-5">
          <h4 className="font-[500] uppercase text-[24px] font-[oswald] mb-[30px]">
            Key Responsibilities:
          </h4>
          <ul
            className="m-0 max-h-[100px] overflow-y-scroll [&::-webkit-scrollbar]:w-[2.5px] [&::-webkit-scrollbar-track]:bg-[#DADADA] [&::-webkit-scrollbar-thumb]:bg-[#1D1A1A]"
            ref={(el) => addToRefs(el, listItemRefs)}
          >
            <li className="mb-[18px] text-[#5B5B5B] flex before:grow-[0] before:shrink-[0] before:basis-[12px] before:mt-[10px] before:mr-[18px] before:content-[''] before:h-[12px] before:w-[16px] before:bg-[#000] before:block">
              Conceptualize and create engaging visuals for digital campaigns, websites, and
              social media platforms.
            </li>
            <li className="text-[#5B5B5B] flex before:grow-[0] before:shrink-[0] before:basis-[12px] before:mt-[10px] before:mr-[18px] before:content-[''] before:h-[12px] before:w-[16px] before:bg-[#000] before:block">
              Leverage AI-powered tools to enhance the design process and create innovative
              artwork.
            </li>
             <li className="mb-[18px] text-[#5B5B5B] flex before:grow-[0] before:shrink-[0] before:basis-[12px] before:mt-[10px] before:mr-[18px] before:content-[''] before:h-[12px] before:w-[16px] before:bg-[#000] before:block">
              Conceptualize and create engaging visuals for digital campaigns, websites, and
              social media platforms.
            </li>
            <li className="text-[#5B5B5B] flex before:grow-[0] before:shrink-[0] before:basis-[12px] before:mt-[10px] before:mr-[18px] before:content-[''] before:h-[12px] before:w-[16px] before:bg-[#000] before:block">
              Leverage AI-powered tools to enhance the design process and create innovative
              artwork.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {renderJobCard()}
      {renderJobCard()}
      {renderJobCard()}
      {renderJobCard()}
    </>
  );
}