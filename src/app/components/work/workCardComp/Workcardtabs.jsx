"use client";
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Workcardtabs = ({ activeTab, setActiveTab }) => {
  const tabsRef = useRef([]);
  const blobRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const activeTabElement = tabsRef.current.find(
      (tab) => tab.dataset.category === activeTab
    );
    if (activeTabElement && blobRef.current) {
      const { offsetLeft, offsetTop } = activeTabElement;
      gsap.to(blobRef.current, {
        x: offsetLeft - 8,
        y: offsetTop - 35,
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  }, [activeTab]);

  useEffect(() => {
    gsap.from(tabsRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.1,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%', 
        toggleActions: 'play none none none',
      },
    });

    gsap.from(blobRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.8,
      ease: 'elastic.out(1, 0.5)',
      delay: 0.5, 
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });
  }, []);

  const handleTabClick = (category) => {
    setActiveTab(category);
    tabsRef.current.forEach((tab) => {
      gsap.to(tab, {
        opacity: tab.dataset.category === category ? 1 : 0.5,
        duration: 0.3,
        ease: 'power1.out',
      });
    });
  };

  const categories = ['all', 'website', 'landing page', 'creative', 'logos'];

  return (
    <ul ref={containerRef} className="flex justify-center border-b-[1px] border-dashed border-[#000] py-[80px] relative">
      <div
        ref={blobRef}
        className="circle-blob absolute top-[-1px] left-[-8px] h-[100px] w-[100px] bg-yellow-400 rounded-[50%] z-0"
      ></div>
      {categories.map((category, index) => (
        <li
          key={category}
          ref={(el) => (tabsRef.current[index] = el)}
          data-category={category}
          className={`font-[oswald] mr-[30px] uppercase font-[600] text-[20px] relative z-[1] cursor-pointer ${
            activeTab === category ? 'opacity-100 border-b-[2px] border-[#000]' : 'opacity-50'
          }`}
          onClick={() => handleTabClick(category)}
        >
          {category}
        </li>
      ))}
    </ul>
  );
};

export default Workcardtabs;