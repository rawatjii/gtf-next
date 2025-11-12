"use client";
import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function GalleryItemSlider({slider}) {
  const images = [
    { src: "/assets/rewards/gallery_1.jpg", date: "June 25" },
    { src: "/assets/rewards/gallery_2.jpg", date: "June 25" },
    { src: "/assets/rewards/gallery_3.jpg", date: "June 25" },
    { src: "/assets/rewards/gallery_1.jpg", date: "June 25" },
    { src: "/assets/rewards/gallery_2.jpg", date: "June 25" },
    { src: "/assets/rewards/gallery_3.jpg", date: "June 25" },
    { src: "/assets/rewards/gallery_1.jpg", date: "June 25" },
    { src: "/assets/rewards/gallery_2.jpg", date: "June 25" },
    { src: "/assets/rewards/gallery_3.jpg", date: "June 25" },
  ];

  const imagesPerView = 2;

  return (
    <div className="relative overflow-hidden w-full max-w-3xl mx-auto">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={10}
        slidesPerView={imagesPerView}
        navigation={{
          prevEl: `.swiper-button-prev-${slider}`,
          nextEl: `.swiper-button-next-${slider}`,
        }}
        pagination={{ clickable: true }}
        className="mySwiper"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <figure className="px-2">
              <img
                src={image.src}
                alt={`Gallery item ${index + 1}`}
                className="w-full h-auto object-cover border-[1px] border-dashed p-[10px] border-[#1E251F] !filter-none"
              />
              <figcaption className="font-[Oswald] mt-4 text-start font-[500] uppercase text-lg">
                {image.date}
              </figcaption>
            </figure>
          </SwiperSlide>
        ))}
      </Swiper>

     <div className='flex mt-[0]'>
      <button
        className={`swiper-button-prev-${slider} !static after:hidden  text-3xl !text-black p-2 z-10`}
      >
        ←
      </button>
      <button
        className={`swiper-button-next-${slider} !static after:hidden text-3xl !text-black p-2 z-10`}
      >
        →
      </button>
      </div>
    </div>
  );
}