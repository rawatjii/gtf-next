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
      className="relative text-center py-[100px]"
    >
      <h3 className="neue_font font-bold uppercase mb-[1.5rem] md:text-left text-center max-h-content inline-block relative md:pl-[35px] px-5 md:leading-[70px] tracking-[2px] 2xl:text-[72px] lg:text-[62px] md:text-[50px] text-[32px] relative z-0">
        <span>WHY </span>
        <span className="block">gtf technologies ?</span>
        <Line
          bgColor="bg-gtf-pink"
          top="lg:bottom-[0]"
          left="left-[47%] lg:left-[61%]"
          right="right-[-2%]"
          className="test"
        />
      </h3>

      <div ref={containerRef} className="flex justify-center mt-[80px]">
        <video
          width="300"
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
          width="300"
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
          width="300"
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
