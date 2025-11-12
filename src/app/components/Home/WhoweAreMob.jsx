"use client";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/dist/SplitText";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// Import required Swiper modules
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Register plugins only on client side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

const words = [
  "GTF",
  " ",
  "Technologies",
  " ",
  "is",
  " ",
  "conceptualized",
  " ",
  "from",
  " ",
  "Gurukul",
  " ",
  "The",
  " ",
  "Foundation.",
  " ",
  "We",
  " ",
  "are",
  " ",
  "a",
  " ",
  "16-year-old",
  " ",
  "branding",
  " ",
  "and",
  " ",
  "digital",
  " ",
  "media",
  " ",
  "planning",
  " ",
  "agency",
  " ",
  "headquartered",
  " ",
  "in",
  " ",
  "Noida,",
  " ",
  "Mumbai,",
  " ",
  "Pune,",
  " ",
  "and",
  " ",
  "an",
  " ",
  "upcoming",
  " ",
  "office",
  " ",
  "in",
  " ",
  "Bangalore.",
  " ",
  "GTF",
  " ",
  "Technologies",
  " ",
  "is",
  " ",
  "conceptualized",
  " ",
  "from",
  " ",
  "Gurukul",
  " ",
  "The",
  " ",
  "Foundation.",
  " ",
  "GTF",
  " ",
  "Technologies",
  " ",
  "is",
  " ",
  "conceptualized",
  " ",
  "from",
  " ",
  "Gurukul",
  " ",
  "The",
  " ",
  "Foundation.",
  " ",
];

const WhoWeAreMob = () => {
  const textContainerRef = useRef(null);
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const imagesRef = useRef([]);
  const swiperRef = useRef(null);

  const sliderImages = [
    {
      image: "/assets/home/who_we_are/thumb1.webp",
      content: (
        <div className="w-full mt-4">
          <h3 className="font-[Oswald] md:text-[44px] text-[25px] mb-[1rem] font-bold">
            WHEN UNKNOWN PRINTER <br /> TOOK A GALLERY
          </h3>
          <p className="font-[Oswald] font-[400] md:text-[28px] text-[24px] normal-case md:mb-[1rem]">
            Make a type specimen book
          </p>
          <p className="text-[16px] leading-[23px] mt-[30px]">
            <span className="block mb-[8px] capitalize">
              When an unknown printer took a gallery of type and scrambled it to
            </span>
            <span className="block capitalize mb-[20px]">
              make a type specimen book. It has survived not only five centuries
            </span>
          </p>
        </div>
      ),
    },

    {
      image: "/assets/home/who_we_are/thumb1.webp",
      content: (
        <div className="w-full mt-4">
          <h3 className="font-[Oswald] md:text-[44px] text-[25px] mb-[1rem] font-bold">
            WHEN UNKNOWN PRINTER <br /> TOOK A GALLERY
          </h3>
          <p className="font-[Oswald] font-[400] md:text-[28px] text-[24px] normal-case md:mb-[1rem]">
            Make a type specimen book
          </p>
          <p className="text-[16px] leading-[23px] mt-[30px]">
            <span className="block mb-[8px] capitalize">
              When an unknown printer took a gallery of type and scrambled it to
            </span>
            <span className="block capitalize mb-[20px]">
              make a type specimen book. It has survived not only five centuries
            </span>
          </p>
        </div>
      ),
    },
    {
      image: "/assets/home/who_we_are/thumb1.webp",
      content: (
        <div className="w-full mt-4">
          <h3 className="font-[Oswald] md:text-[44px] text-[25px] mb-[1rem] font-bold">
            WHEN UNKNOWN PRINTER <br /> TOOK A GALLERY
          </h3>
          <p className="font-[Oswald] font-[400] md:text-[28px] text-[24px] normal-case md:mb-[1rem]">
            Make a type specimen book
          </p>
          <p className="text-[16px] leading-[23px] mt-[30px]">
            <span className="block mb-[8px] capitalize">
              When an unknown printer took a gallery of type and scrambled it to
            </span>
            <span className="block capitalize mb-[20px]">
              make a type specimen book. It has survived not only five centuries
            </span>
          </p>
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (typeof window === "undefined") return;

    const section = sectionRef.current;
    const container = containerRef.current;
    const textContainer = textContainerRef.current;

    if (!section || !container || !textContainer) {
      console.warn("Required elements not found");
      return;
    }

    let splitText;
    let chars;

    try {
      // Text animation
      splitText = new SplitText(textContainer, { type: "chars" });
      chars = splitText.chars;

      const tl = gsap.timeline({
        scrollTrigger: {
          id: "whoWeAreTrigger",
          trigger: container,
          start: "top top",
          end: "+=300",
          pin: true,
          scrub: 1,
          // pinSpacing: true,
          ease: "none",
         
        },
      });

      tl.fromTo(
        chars,
        { opacity: 0.2, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: "none",
        }
      );

      // Image reveal animations
      imagesRef.current.forEach((image, index) => {
        if (image) {
          gsap.fromTo(
            image,
            {
              opacity: 0,
              y: 50,
              clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
            },
            {
              opacity: 1,
              y: 0,
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
              duration: 1.2,
              delay: index * 0.2 + 0.3,
              ease: "power3.out",
              scrollTrigger: {
                trigger: image,
                start: "top bottom-=100",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });
    } catch (error) {
      console.error("Animation setup error:", error);
    }

    return () => {
      const mainTrigger = ScrollTrigger.getById("whoWeAreTrigger");
      if (mainTrigger) mainTrigger.kill();

      if (splitText && typeof splitText.revert === "function") {
        splitText.revert();
      }

      ScrollTrigger.getAll().forEach((trigger) => {
        if (
          trigger.trigger === container ||
          imagesRef.current.includes(trigger.trigger)
        ) {
          trigger.kill();
        }
      });

      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <section
      className="flex md:flex-row flex-col uppercase main-container-scroll no-scrollbar relative"
      id="whoWeAreTrigger"
      ref={containerRef}
    >
      <div
        className="main-container-scroll md:flex md:flex-row flex-col flex will-change-transform"
        ref={sectionRef}
      >
        <div className="flex flex-row bg-gtf-pink justify-between  md:py-0 py-[60px] px-[15px]">
          <div className="flex gap-[40px]">
            <div className="col-span-12 md:pt-[20px] md:px-[35px]">
              <h2 className="font-[Oswald] font-mediu m mb-[15px] md:text-[40px] text-[20px] text-left">
                Who We Are?
              </h2>
              <div
                ref={textContainerRef}
                className="text-container tracking-[-2px]"
              >
                {words.map((word, index) => (
                  <span
                    key={index}
                    className="font-[Oswald] pr-[4px]  tracking-[-1px] font-[700] text-[26px] inline-block"
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="md:pl-[13rem] md:px-0 px-[15px]" ref={containerRef}>
          <div className="md:px-[0] slider_item md:pt-[0] mt-[20px]">
            <div className="slide_arrow flex justify-end mb-[20px]">
              <div className="swiper-button-prev-new  w-[40px] h-[40px] rounded-full flex items-center justify-center after:text-[16px] after:content-['']  z-10 left-[-15px]">
                <span className="text-black text-[35px]">←</span>
              </div>
              <div className="swiper-button-next-new  w-[40px] h-[40px] rounded-full flex items-center justify-center after:text-[16px] after:content-['']  z-10 right-[-15px]">
                <span className="text-black text-[35px]">→</span>
              </div>
            </div>
            <div className="relative overflow-hidden">
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={10}
                slidesPerView={1}
                navigation={{
                  nextEl: ".swiper-button-next-new",
                  prevEl: ".swiper-button-prev-new",
                }}
                pagination={{
                  clickable: true,
                  el: ".swiper-pagination",
                }}
                loop={true}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                }}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                className="w-full"
              >
                {sliderImages.map((slide, index) => (
                  <SwiperSlide key={index} className="w-full">
                    <div className="flex flex-col md:flex-row">
                      <div className="w-full">
                        {slide.content && (
                          <div className="w-full mb-[15px]">
                            {slide.content}
                          </div>
                        )}
                        <img
                          ref={(el) => (imagesRef.current[index] = el)}
                          className="object-cover w-full h-full border-[4px] border-solid border-black"
                          src={slide.image}
                          alt={`Slide ${index + 1}`}
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}

                <div className="swiper-pagination absolute bottom-[-25px]"></div>
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAreMob;
