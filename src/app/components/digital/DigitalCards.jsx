"use client";
import React, { useEffect, useRef } from 'react';
import { MdArrowOutward } from 'react-icons/md';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const DigitalCards = () => {
    const titleRef = useRef(null);
    const cardsRef = useRef([]);
    const textContentRefs = useRef([]);
    const buttonRefs = useRef([]);

    useEffect(() => {
        gsap.set(textContentRefs.current, { opacity: 0, y: 30 });
        gsap.set(buttonRefs.current, { opacity: 0, y: 20 });

        gsap.fromTo(
            titleRef.current,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power3.out',
                force3D: false,
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none none',
                },
            }
        );

        gsap.fromTo(
            cardsRef.current,
            { opacity: 0, y: 100 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                stagger: 0.2,
                ease: 'power3.out',
                force3D: false,
                scrollTrigger: {
                    trigger: cardsRef.current[0]?.parentElement,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none none',
                },
                onComplete: () => {
                    gsap.set('.icons_itm', {
                        mixBlendMode: 'multiply',
                    });
                    
                    // Animate text content after cards are done
                    gsap.to(textContentRefs.current, {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.15,
                        ease: 'power2.out',
                        delay: 0.3, // Small delay after cards complete
                        onComplete: () => {
                            // Animate buttons after text content
                            gsap.to(buttonRefs.current, {
                                opacity: 1,
                                y: 0,
                                duration: 0.6,
                                stagger: 0.1,
                                ease: 'power2.out',
                                delay: 0.2,
                            });
                        }
                    });
                }
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    const handleButtonHover = (e) => {
        gsap.to(e.currentTarget, {
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out',
            force3D: false,
        });
    };

    const handleButtonHoverOut = (e) => {
        gsap.to(e.currentTarget, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out',
            force3D: false,
        });
    };

    const handleVideoHover = (e) => {
        gsap.to(e.currentTarget, {
            scale: 1.02,
            duration: 0.3,
            ease: 'power2.out',
            force3D: false,
            transformOrigin: 'center center',
        });
    };

    const handleVideoHoverOut = (e) => {
        gsap.to(e.currentTarget, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out',
            force3D: false,
            transformOrigin: 'center center',
        });
    };

    return (
        <div className='pb-[80px]'>
            <h2  ref={titleRef}  className='pb-[60px] font-[oswald] text-[24px]' >
                Executing each phase of digital planning
            </h2>
            <div className='grid grid-cols-12 gap-x-[25px] gap-y-[80px] border-[#000] pb-[80px] border-b-[1px] border-dashed'>
                {[
                    {
                        title: 'Research',
                        video: '/assets/digital/icon_digital_video.mp4',
                        desc: 'Keyword research in SEO enables you to discover and ascertain what your customers are after. The planned keyword research techniques.',
                    },
                    {
                        title: 'Online Positioning & Strategy',
                        video: '/assets/digital/icon_digital_video_2.mp4',
                        desc: "A brand must be positioned well online to be highlighted among competitors. For this, one must know the customer's genuine requirements.",
                    },
                    {
                        title: 'Brand Loyalty',
                        video: '/assets/digital/icon_digital_video_2.mp4',
                        desc: 'Each brand has an identity, regardless of whether positive or negative. A brand is developed to inspire your specific market segment.',
                    },
                    {
                        title: 'Media Planning',
                        video: '/assets/digital/icon_digital_video_3.mp4',
                        desc: "It's always important to select the right media platform for your brand or product. A combination of best media helps.",
                    },
                    {
                        title: 'Research',
                        video: '/assets/digital/icon_digital_video.mp4',
                        desc: 'Keyword research in SEO enables you to discover and ascertain what your customers are after. The planned keyword research techniques.',
                    },
                    {
                        title: 'Online Positioning & Strategy',
                        video: '/assets/digital/icon_digital_video.mp4',
                        desc: "A brand must be positioned well online to be highlighted among competitors. For this, one must know the customer's genuine requirements.",
                    },
                    {
                        title: 'Brand Loyalty',
                        video: '/assets/digital/icon_digital_video_2.mp4',
                        desc: 'Each brand has an identity, regardless of whether positive or negative. A brand is developed to inspire your specific market segment.',
                    },
                    {
                        title: 'Media Planning',
                        video: '/assets/digital/icon_digital_video_3.mp4',
                        desc: "It's always important to select the right media platform for your brand or product. A combination of best media helps.",
                    },
                ].map((item, index) => (
                    <div
                        key={index}
                        ref={(el) => (cardsRef.current[index] = el)}
                        className='col-span-3 mix-blend-multiply'
                    >
                        <div className='h-[100%] flex flex-col justify-between'>
                            <div className='bg-[#DFDFDF33] border-[1px] p-[40px] border-dashed border-[#000000] '
                            >
                                <video
                                    src={item.video}
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    className='object-cover icons_itm mb-[20px] w-full h-auto'
                                    onMouseEnter={handleVideoHover}
                                    onMouseLeave={handleVideoHoverOut}
                                    style={{ 
                                        mixBlendMode: 'multiply',
                                        backfaceVisibility: 'hidden',
                                        transform: 'translateZ(0)',
                                        willChange: 'auto'
                                    }}
                                />
                            </div>
                            <div 
                                className='content mb-[auto]'
                                ref={(el) => (textContentRefs.current[index] = el)}
                            >
                                <h3 className='font-[oswald] text-[24px] uppercase font-[500] mt-[20px]'>
                                    {item.title}
                                </h3>
                                <p className='text-[#3D3D3D] my-[15px]'>{item.desc}</p>
                            </div>
                            <div 
                                className='text-start'
                                ref={(el) => (buttonRefs.current[index] = el)}
                            >
                                <div
                                    className='flex mt-[20px] items-center justify-start cursor-pointer'
                                    onMouseEnter={handleButtonHover}
                                    onMouseLeave={handleButtonHoverOut}
                                >
                                    <p className='mr-[12px] uppercase font-[Oswald] text-[20px]'>
                                        Know More
                                    </p>
                                    <MdArrowOutward className='bg-[#ddd] ms-[12px] text-[24px]' />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DigitalCards;