"use client";
import { useRef, useState, useEffect } from "react";
import Line from "../Line";
import StaggeredLogoSwitcher from "./Client_sec";

const Clients = () => {
  const imageRef = useRef(null);
  const coloredLineRef = useRef(null);
  const coloredLineRef2 = useRef(null);
  const containerRef = useRef(null);
  const logoGridRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLogoGridVisible, setIsLogoGridVisible] = useState(false);

  const logoSets = [
  { id: 1, src: "/assets/home/clients/ambience.png" },
  { id: 2, src: "/assets/home/clients/ats.png" },
  { id: 3, src: "/assets/home/clients/jindal-realty.png" },
  { id: 4, src: "/assets/home/clients/homekraft.png" },
  { id: 5, src: "/assets/home/clients/parx-laureate.png" },
  { id: 6, src: "/assets/home/clients/raheja.png" },
  { id: 7, src: "/assets/home/clients/tarc.png" },
  { id: 8, src: "/assets/home/clients/ska-orion.png" },
  { id: 9, src: "/assets/home/clients/aipl.png" },
  { id: 10, src: "/assets/home/clients/eldeco.png" },
];
    



  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsLogoGridVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (logoGridRef.current) {
      observer.observe(logoGridRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

 

  return (
    <section>
      <div className="md:pt-[50px] md:px-[35px] px-[15px] py-[60px]">
        <div className="md:flex justify-start items-end md:mb-[0]  mb-[30px] md:text-start">
          <h3 className="uppercase relative md:leading-[70px] md:text-start text-center max-h-fit leading-[normal]  md:mb-[0] mb-[15px]">
            <span className="bartino-outline tracking-[2px] 2xl:text-[72px] lg:text-[62px] md:text-[50px] text-[32px] block">
              Amazing brands,
            </span>
            <span className="font-[Oswald] md:pl-[7.5rem] block font-medium 2xl:text-[65px] text-[32px]  md:text-[50px] lg:text-[52px]">
              Amazed Clients.
              <Line
                ref={coloredLineRef}
                bgColor="bg-gtf-blue"
                left="left-[33%] lg:left-[61%]"
                top="bottom-[2%]"
              />
            </span>
          </h3>
          <p className="uppercase italic pt-[16px] md:ml-[3rem] text-center lg:text-left font-[500]">
            <span className="block">They choose to work with us.</span>
            <span className="block">We chased the WOWasaS with them.</span>
          </p>
        </div>

        <div className="overflow-hidden relative w-full md:mt-[70px] main_border_cmp border-black">
          <ul
            ref={logoGridRef}
            className="grid grid-cols-2 border-none sm:grid-cols-3 md:grid-cols-5 w-full border-[2px]"
          >
            <StaggeredLogoSwitcher logoSets={logoSets}/>
          </ul>
        </div>
      </div>

      <div
        style={{
          backgroundImage: `url("/assets/home/clients/bg.png")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="relative md:text-start text-center   md:py-[0] py-[60px]"
      >
        <h3 className="uppercase md:text-start mb-[1.5rem] text-center max-h-content max-w-content inline-block relative md:pt-[5rem] md:pl-[35px]  px-5  text-[40px] md:leading-[70px]">
          <span className="bartino-outline tracking-[2px] 2xl:text-[72px] lg:text-[62px] md:text-[50px] text-[32px]">
            {"WHY ? "}
          </span>
          <span className="font-[Oswald] font-medium 2xl:text-[72px] lg:text-[52px] md:text-[40px] text-[32px]">
            {"gtf technologies"}
          </span>
          <Line
            ref={coloredLineRef2}
            bgColor="bg-gtf-pink"
            top="top-[60%] lg:top-[83%]"
            left="left-[47%] lg:left-[61%]"
            right="right-[-2%]"
          />
        </h3>

        <div ref={containerRef}>
          <img
            ref={imageRef}
            style={{
              clipPath: isVisible
                ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
                : "polygon(0 0, 0 0, 0 93%, 0 100%)",
            }}
            src="/assets/home/clients/bg_of_client.png"
            alt="Background of client"
            className={`w-full h-[84px]   md:pb-[70px] lg:h-auto xl:object-cover transition-clip-path duration-[2000ms] ease-out ${
              isVisible ? "animate-reveal" : ""
            }`}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }
        .animated-logo {
          animation: pulse 700ms ease-in-out;
        }
      `}</style>
    </section>
  );
};

export default Clients;
