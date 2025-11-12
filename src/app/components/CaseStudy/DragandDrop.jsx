'use client';
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';
import SvgObj from './SvgObj';
import { MdArrowOutward } from 'react-icons/md';
gsap.registerPlugin(ScrollTrigger, Draggable);

const DragBuildingComponent = () => {
    const [draggedItem, setDraggedItem] = useState(null);
    const [droppedItems, setDroppedItems] = useState([]);
    const [indexdata, setIndexdata] = useState(1);
    const containerRef = useRef(null);
    const buildingItemsRef = useRef([]);
    const dropZoneRef = useRef(null);
    const contentRef = useRef(null);
    const particleContainerRef = useRef(null);

    const buildingData = [
        { id: 1, name: 'Grandthum', bg: '#000', height: 200, classNames: 'absolute bottom-[0]', desc: 'As a company, we draw in and build up our business\'s best ability, share information, and give the best fundamental tools and resources to stay aware of today\'s fast-changing technology.' },
        { id: 2, name: 'GODREJ Property', bg: '#FF69B4', height: 150, classNames: 'absolute w-[80px] rotate-[10deg] right-[340px] bottom-[0]', desc: 'As a company, we draw in and build up our business\'s best ability, share information, and give the best fundamental tools and resources to stay aware of today\'s fast-changing technology.' },
        { id: 3, name: 'ATS Khyber Range', bg: '#2AAEE4', height: 200, classNames: 'absolute right-[280px] bottom-[0]', desc: 'As a company, we draw in and build up our business\'s best ability, share information, and give the best fundamental tools and resources to stay aware of today\'s fast-changing technology.' },
        { id: 4, name: 'Supertech Limited', bg: '#2AAEE4', height: 60, classNames: 'absolute bottom-[0] right-[50px] px-[50px]', desc: 'As a company, we draw in and build up our business\'s best ability, share information, and give the best fundamental tools and resources to stay aware of today\'s fast-changing technology.' },
        { id: 5, name: 'SUPERTECH LIMITED', bg: '#FDE93D', height: 200, classNames: 'absolute bottom-[0] w-[50px] rotate-[-30deg] w-[80px] right-[200px] px-[20px] z-[1]', desc: 'As a company, we draw in and build up our business\'s best ability, share information, and give the best fundamental tools and resources to stay aware of today\'s fast-changing technology.' },
        { id: 6, name: 'OMAXE Chandni Chowky', bg: '#FDE93D', height: 80, classNames: 'absolute bottom-[200px] w-[100px]', desc: 'As a company, we draw in and build up our business\'s best ability, share information, and give the best fundamental tools and resources to stay aware of today\'s fast-changing technology.' },
        { id: 7, name: 'OMAXE Chandni Chowky', bg: '#2AAEE4', height: 80, classNames: 'absolute bottom-[300px] rotate-[25deg] w-[100px]', desc: 'As a company, we draw in and build up our business\'s best ability, share information, and give the best fundamental tools and resources to stay aware of today\'s fast-changing technology.' },
        { id: 8, name: 'M3M Property', bg: '#FF69B4', height: 180, classNames: 'absolute bottom-[180px] left-[100px]', desc: 'As a company, we draw in and build up our business\'s best ability, share information, and give the best fundamental tools and resources to stay aware of today\'s fast-changing technology.' },
    ];

    useEffect(() => {
        const tla = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 80%',
            },
        });

        tla.fromTo(
            '.boxes_bounce li',
            { y: '-1000%', scale: 0.8, opacity: 0 },
            { 
                y: '0', 
                scale: 1, 
                opacity: 1, 
                duration: 1.2,
                stagger: 0.1,
                ease: 'ease.out(1, 0.5)'
            }
        );

        return () => {
            tla.kill();
        };
    }, []);

    useEffect(() => {
        const setupDragAndDrop = () => {
            buildingItemsRef.current.forEach((item, index) => {
                if (item && !item._draggable) {
                    item._originalX = 0;
                    item._originalY = 0;

                    const draggable = Draggable.create(item, {
                        type: 'x,y',
                        bounds: containerRef.current,
                        onDragStart: function () {
                            this.target._isDragging = true;
                            setDraggedItem(index);
                            gsap.to(this.target, {
                                scale: 1.2,
                                zIndex: 1000,
                                boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                                duration: 0.1,
                                ease: 'ease.out',
                            });
                        },
                        onDrag: function () {
                            const dropZone = dropZoneRef.current;
                            if (dropZone) {
                                const dropRect = dropZone.getBoundingClientRect();
                                const dragRect = this.target.getBoundingClientRect();

                                const isOverDrop =
                                    dragRect.left < dropRect.right &&
                                    dragRect.right > dropRect.left &&
                                    dragRect.top < dropRect.bottom &&
                                    dragRect.bottom > dropRect.top;

                                gsap.to(dropZone, {
                                    scale: isOverDrop ? 1.1 : 1,
                                    duration: 0.1,
                                });
                            }
                        },
                        onDragEnd: function () {
                            this.target._isDragging = false;
                            const dropZone = dropZoneRef.current;
                            let dropped = false;

                            if (dropZone) {
                                const dropRect = dropZone.getBoundingClientRect();
                                const dragRect = this.target.getBoundingClientRect();

                                const isOverDrop =
                                    dragRect.left < dropRect.right &&
                                    dragRect.right > dropRect.left &&
                                    dragRect.top < dropRect.bottom &&
                                    dragRect.bottom > dropRect.top;

                                if (isOverDrop) {
                                    dropped = true;
                                    setIndexdata(index);
                                    document.querySelectorAll('.bg-name')[index].style.fill = buildingData[index].bg;
                                    // animateParticles();

                                    const newDroppedItem = {
                                        ...buildingData[index],
                                        originalIndex: index,
                                        droppedAt: Date.now(),
                                    };

                                    setDroppedItems((prevDroppedItems) => {
                                        if (prevDroppedItems.length > 0) {
                                            const previousDroppedItem = prevDroppedItems[0];
                                            const previousItemElement = buildingItemsRef.current[previousDroppedItem.originalIndex];
                                           if (previousItemElement) {
                                                gsap.to(previousItemElement, {
                                                    x: 0,
                                                    y: 0,
                                                    scale:0,
                                                    opacity: 0, 
                                                    pointerEvents: 'auto',
                                                    duration: 0.01,
                                                    ease: 'ease.in',
                                                    onComplete: () => {
                                                        gsap.to(previousItemElement, {
                                                            opacity: 1, 
                                                            scale: 1,
                                                            duration: 0.5,
                                                            boxShadow:'none',
                                                            // ease: 'ease.in',
                                                        });
                                                    },
                                                });
                                            }
                                        }

                                        return [newDroppedItem];
                                    });

                                    gsap.to(this.target, {
                                        scale: 0.5,
                                        opacity: 0,
                                        duration: 0.3,
                                        ease: 'power2.in',
                                        onComplete: () => {
                                            gsap.to(this.target, {
                                                opacity: 0,
                                                pointerEvents: 'none',
                                                duration: 0.2,
                                            });
                                        },
                                    });
                                }
                            }

                            if (!dropped) {
                                gsap.to(this.target, {
                                    x: 0,
                                    y: 0,
                                    opacity: 1,
                                    scale: 1,
                                    // rotation: 0,
                                    boxShadow: 'none',
                                    duration: 0.4,
                                    ease: 'ease.out(1, 0.5)',
                                });
                            }

                            setDraggedItem(null);
                            // gsap.to(dropZone, { scale: 1, boxShadow: 'none', duration: 0.2 });
                        },
                    });

                    item._draggable = draggable[0];

                 
                }
            });
        };
        // createParticles();
        const timer = setTimeout(setupDragAndDrop, 100);
        return () => {
            clearTimeout(timer);
            buildingItemsRef.current.forEach((item) => {
                if (item) {
                    item.removeEventListener('mouseenter', null);
                    item.removeEventListener('mouseleave', null);
                }
            });
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, [indexdata]);

  
    return (
        <div className="pb-[80px]" ref={containerRef}>
            <style jsx>
            {`
                .particle {position: absolute;width: 8px;height: 8px;border-radius: 50%;pointer-events: none;}
            `}
            </style>
            <div className="flex align-items-[stretch]  min-h-[90vh] relative overflow-hidden border-b-[1px] border-[#000] border-dashed">
                <div className="shrink-[0] grow-[0] basis-[33.33%]   border-r-[1px] border-[#000] border-dashed relative flex flex-col justify-end ">
                    <div className="pt-[50px] px-4">
                        <ul className="space-y-2 boxes_bounce">
                            {buildingData.map((building, index) => (
                                <li
                                    key={building.id}
                                    ref={(el) => (buildingItemsRef.current[index] = el)}
                                    className={`font-[oswald] uppercase px-4 text-white text-xs text-center inline-flex flex-col justify-center items-center cursor-grab active:cursor-grabbing ${building.classNames} hover:brightness-110`}
                                    style={{
                                        backgroundColor: building.bg,
                                        height: `${building.height}px`,
                                        opacity: droppedItems.find((item) => item.originalIndex === index) ? 0.3 : 1,
                                    }}
                                >
                                    {building.name.split(' ').map((word, i) => (
                                        <span key={i}>{word}</span>
                                    ))}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="shrink-[0] grow-[0] basis-[28%]    relative flex items-center justify-center">
                    <div ref={dropZoneRef} className="text-center transition-all flex items-center justify-center relative">
                        <div ref={particleContainerRef} className="absolute inset-0 pointer-events-none" />
                        <div>
                            <div className="text-center">
                                <img src="/assets/casestudy/dragbox.svg" className="mx-[auto] h-[100px] mb-[20px] transform transition-transform duration-300" alt="dragbox" />
                                <div className="flex place-items-center">
                                    <img src="/assets/casestudy/pointEvent.svg" className="mr-[10px]" alt="pointevent" />
                                    <h4 className="uppercase font-[oswald] font-[500] text-lg mb-2">DRAG A PROBLEM</h4>
                                </div>
                            </div>
                            {draggedItem !== null && (
                                <p className="text-sm text-gray-600 animate-pulse">
                                    Dragging: {buildingData[draggedItem]?.name}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="shrink-[0] grow-[0] basis-[40%]    border-l-[1px] border-[#000] border-dashed relative flex items-center">
                    <div className="px-[36px] w-full" ref={contentRef}>
                        <div className="mb-8">
                            <div className='content_container'>
                            <div className="border-b-[8px] text-center border-[#000]">
                                <SvgObj />
                            </div>
                            <h3 className="font-[oswald] uppercase font-medium text-3xl mt-[30px]  mb-[5px] transition-all duration-300">
                                {buildingData[indexdata]?.name || 'No Item Selected'}
                            </h3>
                            <p className="text-[#5B5B5B] leading-relaxed transition-all mt-[20px] duration-300">
                                {buildingData[indexdata]?.desc || 'Please drag an item to the drop zone.'}
                            </p>
                            </div>
                            <div className="flex mt-[40px] items-center justify-start">
                                <a href="" className=" mr-[10px] uppercase font-[Oswald] ">View Details</a>
                                <MdArrowOutward className="bg-[#ddd]" />
                            </div>
                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DragBuildingComponent;