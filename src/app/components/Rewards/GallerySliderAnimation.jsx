'use client';

import React, { useState, useEffect } from 'react';
import GalleryItemSlider from './GallerSlider';
export default function GallerySlider() {
  const [activeSection, setActiveSection] = useState('employee');

 const scrollSpy = (elementId) => {
  if (!elementId) return;

  const element = document.getElementById(elementId);
  if (element) {
    const offsetTop = element.getBoundingClientRect().top + window.scrollY - 320;
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth',
    });
  } else {
    console.warn(`Element with ID "${elementId}" not found.`);
  }
};
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['employee', 'workAnniversary', 'birthday', 'diwali', 'holi'];
      const scrollPosition = window.scrollY + 400; 
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { id: 'employee', label: 'Employee Of The Month' },
    { id: 'workAnniversary', label: 'Work Anniversary' },
    { id: 'birthday', label: 'Birthday' },
    { id: 'diwali', label: 'Diwali' },
    { id: 'holi', label: 'Holi' }
  ];

  return (
    <div className='grid grid-cols-12 mt-[105px] px-[80px]'>
      <div className='col-span-3'>
        <figure>
          <img src="/assets/rewards/slidemain_1.jpg" className='w-[calc(75%+10px)] h-auto object-cover p-[10px] border-[1px] border-dashed p-[10px] border-[#1E251F] !filter-none' alt="Gallery item 1"/>
          <figcaption className='font-[Oswald] mt-4 text-start font-[500] uppercase text-lg'>June 25</figcaption>
        </figure>
        <figure className='mt-[160px]'>
          <img src="/assets/rewards/slidemain_2.jpg"  className='w-[calc(75%+10px)] h-auto object-cover p-[10px] border-[1px] border-dashed p-[10px] border-[#1E251F] !filter-none' a alt="Gallery item 2"/>
          <figcaption className='font-[Oswald] mt-4 text-start font-[500] uppercase text-lg'>June 25</figcaption>
        </figure>
        <figure className='mt-[160px]'>
          <img src="/assets/rewards/slidemain_1.jpg" className='w-[calc(75%+10px)] h-auto object-cover p-[10px] border-[1px] border-dashed p-[10px] border-[#1E251F] !filter-none' alt="Gallery item 3"/>
          <figcaption className='font-[Oswald] mt-4 text-start font-[500] uppercase text-lg'>June 25</figcaption>
        </figure>
        <figure className='mt-[160px]'>
          <img src="/assets/rewards/slidemain_2.jpg"  className='w-[calc(75%+10px)] h-auto object-cover p-[10px]border-[1px] border-dashed p-[10px] border-[#1E251F] !filter-none' a alt="Gallery item 4"/>
          <figcaption className='font-[Oswald] mt-4 text-start font-[500] uppercase text-lg'>June 25</figcaption>
        </figure>
        <figure className='mt-[160px]'>
          <img src="/assets/rewards/slidemain_1.jpg" className='w-[calc(75%+10px)] h-auto object-cover  p-[10px] border-[1px] border-dashed p-[10px] border-[#1E251F] !filter-none' alt="Gallery item 5"/>
          <figcaption className='font-[Oswald] mt-4 text-start font-[500] uppercase text-lg'>June 25</figcaption>
        </figure>
      </div>
 
      <div className='col-span-4'>
        <ul className='sticky relative  px-[60px] top-[250px]'>
          {menuItems.map((item) => (
           <li 
            key={item.id}
            className={`font-[oswald] text-[20px]  font-[500] cursor-pointer transition-colors mb-[5px] flex items-center gap-3 ${
              activeSection === item.id 
                ? 'text-[#1E251F]' 
                : 'text-[#1E251F59] hover:text-[#1E251F]'
            }`}
            onClick={() => scrollSpy(item.id)}>
          {item.label}
          {activeSection === item.id && (
            <svg 
              className='absolute right-[60px]' 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M19.0006 21L19.0006 3.00004C19 2.81779 18.9498 2.63916 18.8552 2.48336C18.7607 2.32756 18.6254 2.20049 18.464 2.11584C18.3027 2.03119 18.1212 1.99215 17.9393 2.00293C17.7574 2.01372 17.5818 2.07391 17.4316 2.17704L4.43159 11.177C3.89259 11.55 3.89259 12.448 4.43159 12.822L17.4316 21.822C17.5815 21.9262 17.7572 21.9873 17.9394 21.9987C18.1216 22.01 18.3035 21.9713 18.4652 21.8865C18.6269 21.8018 18.7623 21.6744 18.8567 21.5181C18.9511 21.3618 19.0009 21.1826 19.0006 21Z" 
                fill="#1E1E1E"
              />
            </svg>
          )}
        </li>
          ))}
        </ul>
      </div>
      
      <div className='col-span-5'>
        <div id="employee">
          <GalleryItemSlider slider={1}/>
        </div>
        
        <div className='mt-[100px]' id="workAnniversary">
          <GalleryItemSlider  slider={2}/>
        </div>
        
        <div className='mt-[100px]' id="birthday">
          <GalleryItemSlider  slider={3}/>
        </div>
        
        <div className='mt-[100px]' id="diwali">
          <GalleryItemSlider  slider={4}/>
        </div>
        
        <div className='mt-[100px]' id="holi">
          <GalleryItemSlider  slider={5}/>
        </div>
      </div>
    </div>
  );
}