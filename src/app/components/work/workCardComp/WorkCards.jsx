"use client"
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const cardData = [
  { id: 1, category: 'website', title: 'S trust reality', image: '/assets/work/work_tab_1.jpg' },
  { id: 2, category: 'landing page', title: 'Great value capital', image: '/assets/work/work_tab_2.jpg' },
  { id: 3, category: 'creative', title: 'S trust reality', image: '/assets/work/work_tab_3.jpg' },
  { id: 4, category: 'logos', title: 'Great value capital', image: '/assets/work/work_tab_2.jpg' },
  { id: 5, category: 'website', title: 'S trust reality', image: '/assets/work/work_tab_1.jpg' },
  { id: 6, category: 'creative', title: 'S trust reality', image: '/assets/work/work_tab_3.jpg' },
];

const WorkCards = ({ activeTab }) => {
  const cardsRef = useRef([]);

  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      if (!card) return;
      const isVisible =
        activeTab === 'all' || card.dataset.category === activeTab;
      gsap.to(card, {
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : 20,
        duration: 0.5,
        ease: 'power2.out',
        delay: index * 0.1,
      });
    });
  }, [activeTab]);


  const filteredCards =
    activeTab === 'all'
      ? cardData
      : cardData.filter((card) => card.category === activeTab);

  return (
    <>
      {filteredCards.map((card, index) => (
        <div
          key={card.id}
          ref={(el) => (cardsRef.current[index] = el)}
          data-category={card.category}
          className="work_card col-span-4 relative"
          style={{ opacity: 0, transform: 'translateY(20px)'}}
        >
          <figure className="select_box relative">
            <img src={card.image} alt={card.title}  className='min-h-[400px] object-cover'/>
            <div className="bc_wrapper">
              <div className="left">
                <div className="t">
                  <div className="h"></div>
                  <div className="v"></div>
                </div>
                <div className="b">
                  <div className="h"></div>
                  <div className="v"></div>
                </div>
              </div>
              <div className="right">
                <div className="t">
                  <div className="h"></div>
                  <div className="v"></div>
                </div>
                <div className="b">
                  <div className="h"></div>
                  <div className="v"></div>
                </div>
              </div>
            </div>
          </figure>
          <h3 className="font-[600] flex place-items-center font-[oswald] text-[32px] uppercase mt-[30px]">
            {card.title}
            <span>
              <img
                src="/assets/work/arrow-lg.png"
                className="w-[40px] m-[auto]"
                alt="arrows image"
              />
            </span>
          </h3>
        </div>
      ))}
    </>
  );
};

export default WorkCards;