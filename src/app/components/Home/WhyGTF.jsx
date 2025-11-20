import React, { useEffect, useRef, useState } from 'react'
import Line from "../Line";

const WhyGTF = () => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
        style={{
          backgroundImage: `url("/assets/home/clients/bg.png")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="relative md:text-start text-center md:py-[0] py-[60px]"
      >
        <h3 className="bebas uppercase md:text-start mb-[1.5rem] text-center max-h-content inline-block relative md:pt-[5rem] md:pl-[35px] px-5 md:leading-[70px] tracking-[2px] 2xl:text-[72px] lg:text-[62px] md:text-[50px] text-[32px]">
          <span>WHY ? </span>
          <span className="block">gtf technologies</span>
          <Line
            bgColor="bg-gtf-pink"
            top="top-[60%] lg:top-[83%]"
            left="left-[47%] lg:left-[61%]"
            right="right-[-2%]"
          />
        </h3>

        <div ref={containerRef}>
          <img
            style={{
              clipPath: isVisible
                ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
                : "polygon(0 0, 0 0, 0 93%, 0 100%)",
            }}
            src="/assets/home/clients/bg_of_client.png"
            alt="Background of client"
            className={`w-full h-[84px] md:pb-[70px] lg:h-auto xl:object-cover transition-clip-path duration-[2000ms] ease-out ${
              isVisible ? "animate-reveal" : ""
            }`}
          />
        </div>
      </div>
  )
}

export default WhyGTF