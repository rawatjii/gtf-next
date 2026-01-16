import React, { useEffect, useRef, useState } from "react";
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
      className="relative py-[100px] px-[50px]"
    >
      <h3 className="neue_font font-bold uppercase mb-[1.5rem] md:text-left text-center max-h-content inline-block relative md:leading-[160px] tracking-[2px] lg:text-[100px] md:text-[50px] text-[32px] relative z-0">
        <span className="block text-[80px] font-normal leading-[100px]">WHY </span>
        <span className="block text-[150px]">GTF </span>
        <span className="block text-[150px]">technologies ?</span>
        <Line
          bgColor="bg-gtf-pink"
          top="lg:bottom-[0]"
          left="left-[47%] lg:left-[61%]"
          right="right-[-2%]"
          className="test"
        />
      </h3>

      <div ref={containerRef} className=" absolute flex justify-center right-[15vw] top-[60px]">
        <video
          width="250"
          height="auto"
          autoPlay
          muted
          loop
          playsInline
          className="mix-blend-darken"
        >
          <source src="/assets/loader/page_loader1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* loader2 */}
        <video
          width="250"
          height="auto"
          autoPlay
          muted
          loop
          playsInline
          className="mix-blend-darken"
        >
          <source src="/assets/loader/page_loader2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* loader3 */}
        <video
          width="250"
          height="auto"
          autoPlay
          muted
          loop
          playsInline
          className="mix-blend-darken"
        >
          <source src="/assets/loader/page_loader3.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default WhyGTF;
