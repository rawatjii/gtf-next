"use client"
import Header from '../Home/Header';
import React, { useEffect, useRef } from 'react';
import Line from '../Line';
import { gsap } from 'gsap';

const TestimonialBanner = () => {
    const headerRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(
            headerRef.current,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
        );
        gsap.fromTo(
            textRef.current.children,
            { opacity: 0, y: 20 },
            { 
                opacity: 1, 
                y: 0, 
                duration: 0.8, 
                stagger: 0.2, 
                ease: 'power2.out',
                delay: 0.3 
            }
        );
    }, []);

    return (
        <>
            <Header />
            <div className='border-t-[1px] px-[35px] border-[#000] border-dashed py-[100px]'>
                <h1 
                    ref={headerRef}
                    className="uppercase inline-block font-[oswald] md:text-start text-center tracking-[2px] 2xl:text-[80px] xl:text-[80px] font-[500] relative md:leading-[70px] md:px-0 px-[15px]"
                >
                    Client Testimonial
                    <Line 
                        bgColor={"bg-gtf-pink"} 
                        left="left-[48%] xl:left-[60%]" 
                        height="h-[30px]" 
                        bottom={'bottom-[-10px]'} 
                    />
                </h1>
                <div className='w-[40%] ml-[auto]' ref={textRef}>
                    <p className='text-[#3D3D3D] capitalize'>
                        It’s always important to select the right media 
                        <span className='lg:block'></span> 
                        platform for your brand or product. A 
                        <span className='lg:block'></span> 
                        combination of best media helps.
                    </p>
                </div>
            </div>
        </>
    );
}

export default TestimonialBanner;