"use client"
import React, { useEffect } from 'react';
import TestimonialCardsComp from './TestimonialCardsComp';
import { gsap } from 'gsap';

const TestimonialMainCard = () => {
    useEffect(() => {
        gsap.fromTo(
            '.animate-scrollText',
            {
                scale: 0.8,
                opacity: 0,
            },
            {
                scale: 1,
                opacity: 1,
                duration: 1,
                stagger: 0.2,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.testimonial_main_card',
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                },
            }
        );
    }, []);

    return (
        <div>
            <div className='bg-[#000] font-[oswald] py-[3px] text-[#fff] mb-[8px] pl-[35px] animate-fadeIn delay-100'></div>
            <div className='bg-[#000] font-[oswald] py-[5px] text-[#fff] mb-[8px] pl-[35px] animate-fadeIn delay-200'></div>
            <div className='bg-[#000] font-[oswald] py-[10px] text-[#fff] mb-[8px] pl-[35px] animate-fadeIn delay-300'></div>
            <div className='bg-[#000] font-[oswald] py-[15px] text-[#fff] mb-[8px] pl-[35px] animate-fadeIn delay-400'></div>
            <h2 className='bg-[#000] font-[oswald] py-[10px] text-[28px] text-[#fff] mb-[8px] pl-[35px] animate-fadeIn delay-500'>
                Lorem Ipsum has been the industry's standard.
            </h2>
            <div className='testimonial_main_card mix-blend-multiply relative bg-[url("/assets/testimonial/testimonial-banner.jpg")] bg-[cover] py-[120px] mb-[80px]'>
                <div className='overlay_container absolute bg-[#2aaee4de] top-0 left-0 h-[100%] w-[100%] z-1'></div>
                <div className='opacity-[0.05] absolute bg-[#2aaee4c2] top-0 left-0 h-[100%] w-[100%] overflow-hidden'>
                    <div className='animate-scrollText'>
                        <h4 className='text-[54px] font-[600] relative leading-[normal] uppercase whitespace-nowrap font-[Oswald] text-transparent [-webkit-text-stroke:2px_black]'>
                            good vibes.good vibes.good vibes.good vibes.good vibes.vibes.good vibes.good vibes.
                        </h4>
                        <h4 className='text-[54px] font-[600] relative uppercase whitespace-nowrap font-[oswald] text-white'>
                            good vibes.good vibes.good vibes.good vibes.good vibes.vibes.good vibes.good vibes.
                        </h4>
                    </div>
                    <div className='animate-scrollText delay-1000'>
                        <h4 className='text-[54px] font-[600] relative leading-[normal] uppercase whitespace-nowrap font-[Oswald] text-transparent [-webkit-text-stroke:2px_black]'>
                            good vibes.good vibes.good vibes.good vibes.good vibes.vibes.good vibes.good vibes.
                        </h4>
                        <h4 className='text-[54px] font-[600] relative uppercase whitespace-nowrap font-[oswald] text-white'>
                            good vibes.good vibes.good vibes.good vibes.good vibes.vibes.good vibes.good vibes.
                        </h4>
                    </div>
                    <div className='animate-scrollText delay-2000'>
                        <h4 className='text-[54px] font-[600] relative leading-[normal] uppercase whitespace-nowrap font-[Oswald] text-transparent [-webkit-text-stroke:2px_black]'>
                            good vibes.good vibes.good vibes.good vibes.good vibes.vibes.good vibes.good vibes.
                        </h4>
                        <h4 className='text-[54px] font-[600] relative uppercase whitespace-nowrap font-[oswald] text-white'>
                            good vibes.good vibes.good vibes.good vibes.good vibes.vibes.good vibes.good vibes.
                        </h4>
                    </div>
                    <div className='animate-scrollText delay-3000'>
                        <h4 className='text-[54px] font-[600] relative leading-[normal] uppercase whitespace-nowrap font-[Oswald] text-transparent [-webkit-text-stroke:2px_black]'>
                            good vibes.good vibes.good vibes.good vibes.good vibes.vibes.good vibes.good vibes.
                        </h4>
                        <h4 className='text-[54px] font-[600] relative uppercase whitespace-nowrap font-[oswald] text-white'>
                            good vibes.good vibes.good vibes.good vibes.good vibes.vibes.good vibes.good vibes.
                        </h4>
                    </div>
                    <div className='animate-scrollText delay-4000'>
                        <h4 className='text-[54px] font-[600] relative leading-[normal] uppercase whitespace-nowrap font-[Oswald] text-transparent [-webkit-text-stroke:2px_black]'>
                            good vibes.good vibes.good vibes.good vibes.good vibes.vibes.good vibes.good vibes.
                        </h4>
                    </div>
                    <div className='animate-scrollText delay-2000'>
                        <h4 className='text-[54px] font-[600] relative leading-[normal] uppercase whitespace-nowrap font-[Oswald] text-transparent [-webkit-text-stroke:2px_black]'>
                            good vibes.good vibes.good vibes.good vibes.good vibes.vibes.good vibes.good vibes.
                        </h4>
                        <h4 className='text-[54px] font-[600] relative uppercase whitespace-nowrap font-[oswald] text-white'>
                            good vibes.good vibes.good vibes.good vibes.good vibes.vibes.good vibes.good vibes.
                        </h4>
                    </div>
                    <div className='animate-scrollText delay-3000'>
                        <h4 className='text-[54px] font-[600] relative leading-[normal] uppercase whitespace-nowrap font-[Oswald] text-transparent [-webkit-text-stroke:2px_black]'>
                            good vibes.good vibes.good vibes.good vibes.good vibes.vibes.good vibes.good vibes.
                        </h4>
                        <h4 className='text-[54px] font-[600] relative uppercase whitespace-nowrap font-[oswald] text-white'>
                            good vibes.good vibes.good vibes.good vibes.good vibes.vibes.good vibes.good vibes.
                        </h4>
                    </div>
                    <div className='animate-scrollText delay-4000'>
                        <h4 className='text-[54px] font-[600] relative leading-[normal] uppercase whitespace-nowrap font-[Oswald] text-transparent [-webkit-text-stroke:2px_black]'>
                            good vibes.good vibes.good vibes.good vibes.good vibes.vibes.good vibes.good vibes.
                        </h4>
                    </div>
                </div>
                <div className='relative animate-slideInUp'>
                    <TestimonialCardsComp />
                </div>
                <div className='video-container relative text-center animate-pulseSlow'>
                    <div className='mix-blend-multiply m-[auto]'>
                        <video
                            src="/assets/testimonial/fivestarImage.mp4"
                            autoPlay
                            muted
                            loop
                            playsInline
                            className='object-cover m-auto w-[210px]'
                        ></video>
                    </div>
                    <div className='text-center animate-fadeIn delay-600'>
                        <p className='uppercase text-white font-[oswald] font-[500]'>
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an{' '}
                            <span className='lg:block'></span> unknown printer took a galley of type and scrambled{' '} 
                            <span className='lg:block'></span> it to make a type specimen book.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestimonialMainCard;