import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TestimonialCardsComp = () => {
    const cardsRef = useRef([]);
    const containerRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(
            containerRef.current,
            { scale: 0.8, opacity: 0.7 },
            {
                scale: 1,
                opacity: 1,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 90%',
                    end: 'top 30%',
                    scrub: false,
                    toggleActions: 'play none none reverse',
                },
            }
        );

        cardsRef.current.forEach((card, index) => {
            gsap.fromTo(
                card,
                { scale: 0.8, opacity: 0.7 },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 0.6,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                        end: 'top 15%',
                        scrub: false,
                        toggleActions: 'play none none reverse',
                    },
                }
            );
        });

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    const TestimonialCard = () => {
        const cardRef = useRef(null);

        useEffect(() => {
            cardsRef.current.push(cardRef.current);
            return () => {
                cardsRef.current = cardsRef.current.filter((ref) => ref !== cardRef.current);
            };
        }, []);

        return (
            <div
                ref={cardRef}
                className="bg-white flex border-[1px] px-[30px] py-[35px] border-dashed border-[#2AAEE4] mb-[35px]"
            >
                <figure className="grow-[0] shrink-[0] basis-[15%] my-[auto]">
                    <img src="/assets/testimonial/avatar.png" alt="avatar" />
                </figure>
                <div className="mx-[35px]">
                    <h5 className="font-[oswald] text-[34px] font-[500] uppercase">
                        Sanchit Bhutani
                        <span className="text-[#2AAEE4] text-[24px]"> ｛Bhutani Groups｝</span>
                    </h5>
                    <p className="text-[#3D3D3D] mt-[15px]">
                        It’s always important to select the right media platform for your brand or product.
                        A combination of best media helps. It’s always important to select the right media
                        platform for your brand or product. A combination of best media helps.
                    </p>
                </div>
                <div className="mix-blend-multiply m-[auto]">
                    <video
                        src="/assets/testimonial/quote.mp4"
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="object-cover m-auto w-[280px]"
                    ></video>
                </div>
            </div>
        );
    };

    return (
        <div
            ref={containerRef}
            className="max-w-[900px] max-h-[500px] isolate relative scrollbar-hide overflow-y-scroll m-[auto]"
        >
            <TestimonialCard />
            <TestimonialCard />
            <TestimonialCard />
            <TestimonialCard />
            <TestimonialCard />
        </div>
    );
};

export default TestimonialCardsComp;