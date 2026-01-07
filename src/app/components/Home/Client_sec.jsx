import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const totalSlots = 10;
const batchSize = 2;
const interval = 2000;

export default function StaggeredLogoSwitcher({logoSets}) {
  const [visibleIndexes, setVisibleIndexes] = useState(
    Array.from({ length: totalSlots }, (_, i) => i)
  );
  const breakpoint = 640;
  const [fadeOutIndexes, setFadeOutIndexes] = useState([]);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  useEffect(()=>{
    const gridItems = document.querySelectorAll('.grid-item');

    gridItems.forEach((item, index)=>{
      gsap.fromTo(
        item,
        {
          opacity:0,
          y:100
        },
        {
          opacity:1,
          y:0,
          duration:1,
          ease:"power4.out",
          scrollTrigger:{
            trigger:item,
            start:"top 80%",
            toggleActions:"play none none reverse"
          }
        }
      )
    })
  })

  // useEffect(() => {
  //   let batch = 0;
  //   const switchLogos = () => {
  //     const indexesToSwitch = [];
  //     for (let i = batch; i < totalSlots; i += batchSize) {
  //       indexesToSwitch.push(i);
  //     }
  //     setFadeOutIndexes(indexesToSwitch);
  //     setTimeout(() => {
  //       setVisibleIndexes((prev) =>
  //         prev.map((v, i) =>
  //           indexesToSwitch.includes(i) ? (v + batchSize) % logoSets.length : v
  //         )
  //       );
  //       setFadeOutIndexes([]);
  //     }, 400);
  //     batch = (batch + 1) % batchSize;
  //   };

  //   const timer = setInterval(switchLogos, interval);
  //   return () => clearInterval(timer);
  // }, []);

  return(
    <div className="grid grid-cols-5 gap-[30px] max-w-[1100px] mx-auto">
      <div
        className={`grid-item relative pt-[40px] pb-[70px] px-[30px] text-center rounded-[15px] overflow-hidden col-start-1 col-end-2 row-start-3 row-end-6`}
        style={{
          background: "linear-gradient(0deg, hsla(0, 0%, 100%, .04), hsla(0, 0%, 100%, .04)), linear-gradient(210.1deg, rgb(255 235 62 / 15%), rgba(31, 117, 255, 0) 77.12%)",
        }}
      >
        <div className="w-full h-full absolute left-0 top-0" style={{
          background:"linear-gradient(41.06deg,rgba(0,91,255,0) 50%,#c8dbff)",
          mask:"linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          
        }}></div>
        <h6 className="mb-[20px] neue_font text-[15px] tracking-[0.5px]">{logoSets[0].title}</h6>
        <p className="text-[15px]">{logoSets[0].txt}</p>
        <img
          src={logoSets[0].src}
          alt={`logo`}
          className={`absolute bottom-[-5px] left-[-20px] w-[150px] object-contain transition-opacity duration-1000 opacity-30`}
        />
      </div>

      <div
        className={`grid-item relative pt-[40px] pb-[70px] px-[30px] text-center rounded-[15px] overflow-hidden col-start-2 col-end-3 row-start-2 row-end-5`}
        style={{
          background: "linear-gradient(0deg, hsla(0, 0%, 100%, .04), hsla(0, 0%, 100%, .04)), linear-gradient(210.1deg, rgb(255 235 62 / 15%), rgba(31, 117, 255, 0) 77.12%)"
        }}
      >
        <h6 className="mb-[20px] neue_font text-[15px] tracking-[0.5px]">{logoSets[1].title}</h6>
        <p className="text-[15px]">{logoSets[1].txt}</p>
        <img
          src={logoSets[1].src}
          alt={`logo`}
          className={`absolute bottom-[-5px] left-[-20px] w-[150px] object-contain transition-opacity duration-1000 opacity-30`}
        />
      </div>

      <div
        className={`grid-item relative pt-[40px] pb-[70px] px-[30px] text-center rounded-[15px] overflow-hidden col-start-3 col-end-4 row-start-3 row-end-6`}
        style={{
          background: "linear-gradient(0deg, hsla(0, 0%, 100%, .04), hsla(0, 0%, 100%, .04)), linear-gradient(210.1deg, rgb(255 235 62 / 15%), rgba(31, 117, 255, 0) 77.12%)"
        }}
      >
        <h6 className="mb-[20px] neue_font text-[15px] tracking-[0.5px]">{logoSets[2].title}</h6>
        <p className="text-[15px]">{logoSets[2].txt}</p>
        <img
          src={logoSets[2].src}
          alt={`logo`}
          className={`absolute bottom-[-5px] left-[-20px] w-[180px] object-contain transition-opacity duration-1000 opacity-30`}
        />
      </div>

      <div
        className={`grid-item relative pt-[40px] pb-[70px] px-[30px] text-center rounded-[15px] overflow-hidden col-start-4 col-end-5 row-start-1 row-end-4`}
        style={{
          background: "linear-gradient(0deg, hsla(0, 0%, 100%, .04), hsla(0, 0%, 100%, .04)), linear-gradient(210.1deg, rgb(255 235 62 / 15%), rgba(31, 117, 255, 0) 77.12%)"
        }}
      >
        <h6 className="mb-[20px] neue_font text-[15px] tracking-[0.5px]">{logoSets[3].title}</h6>
        <p className="text-[15px]">{logoSets[3].txt}</p>
        <img
          src={logoSets[3].src}
          alt={`logo`}
          className={`absolute bottom-[-5px] left-[-20px] w-[150px] object-contain transition-opacity duration-1000 opacity-30`}
        />
      </div>

      <div
        className={`grid-item relative pt-[40px] pb-[70px] px-[30px] text-center rounded-[15px] overflow-hidden col-start-5 col-end-6 row-start-3 row-end-6`}
        style={{
          background: "linear-gradient(0deg, hsla(0, 0%, 100%, .04), hsla(0, 0%, 100%, .04)), linear-gradient(210.1deg, rgb(255 235 62 / 15%), rgba(31, 117, 255, 0) 77.12%)"
        }}
      >
        <h6 className="mb-[20px] neue_font text-[15px] tracking-[0.5px]">{logoSets[4].title}</h6>
        <p className="text-[15px]">{logoSets[4].txt}</p>
        <img
          src={logoSets[4].src}
          alt={`logo`}
          className={`absolute bottom-[-5px] left-[-20px] w-[150px] object-contain transition-opacity duration-1000 opacity-30`}
        />
      </div>

      <div
        className={`grid-item relative pt-[40px] pb-[70px] px-[30px] text-center rounded-[15px] overflow-hidden col-start-1 col-end-2 row-start-6 row-end-9 `}
        style={{
          background: "linear-gradient(0deg, hsla(0, 0%, 100%, .04), hsla(0, 0%, 100%, .04)), linear-gradient(210.1deg, rgb(255 235 62 / 15%), rgba(31, 117, 255, 0) 77.12%)"
        }}
      >
        <h6 className="mb-[20px] neue_font text-[15px] tracking-[0.5px]">{logoSets[5].title}</h6>
        <p className="text-[15px]">{logoSets[5].txt}</p>
        <img
          src={logoSets[5].src}
          alt={`logo`}
          className={`absolute bottom-[-5px] left-[-20px] w-[150px] object-contain transition-opacity duration-1000 opacity-30`}
        />
      </div>

      <div
        className={`grid-item relative pt-[40px] pb-[70px] px-[30px] text-center rounded-[15px] overflow-hidden col-start-2 col-end-3 row-start-5 row-end-8`}
        style={{
          background: "linear-gradient(0deg, hsla(0, 0%, 100%, .04), hsla(0, 0%, 100%, .04)), linear-gradient(210.1deg, rgb(255 235 62 / 15%), rgba(31, 117, 255, 0) 77.12%)"
        }}
      >
        <h6 className="mb-[20px] neue_font text-[15px] tracking-[0.5px]">{logoSets[6].title}</h6>
        <p className="text-[15px]">{logoSets[6].txt}</p>
        <img
          src={logoSets[6].src}
          alt={`logo`}
          className={`absolute bottom-[-5px] left-[-20px] w-[150px] object-contain transition-opacity duration-1000 opacity-30`}
        />
      </div>

      <div
        className={`grid-item relative pt-[40px] pb-[70px] px-[30px] text-center rounded-[15px] overflow-hidden col-start-3 col-end-4 row-start-6 row-end-9`}
        style={{
          background: "linear-gradient(0deg, hsla(0, 0%, 100%, .04), hsla(0, 0%, 100%, .04)), linear-gradient(210.1deg, rgb(255 235 62 / 15%), rgba(31, 117, 255, 0) 77.12%)"
        }}
      >
        <h6 className="mb-[20px] neue_font text-[15px] tracking-[0.5px]">{logoSets[7].title}</h6>
        <p className="text-[15px]">{logoSets[7].txt}</p>
        <img
          src={logoSets[7].src}
          alt={`logo`}
          className={`absolute bottom-[-5px] left-[-20px] w-[180px] object-contain transition-opacity duration-1000 opacity-30`}
        />
      </div>

      <div
        className={`grid-item relative pt-[40px] pb-[70px] px-[30px] text-center rounded-[15px] overflow-hidden col-start-4 col-end-5 row-start-4 row-end-7`}
        style={{
          background: "linear-gradient(0deg, hsla(0, 0%, 100%, .04), hsla(0, 0%, 100%, .04)), linear-gradient(210.1deg, rgb(255 235 62 / 15%), rgba(31, 117, 255, 0) 77.12%)"
        }}
      >
        <h6 className="mb-[20px] neue_font text-[15px] tracking-[0.5px]">{logoSets[8].title}</h6>
        <p className="text-[15px]">{logoSets[8].txt}</p>
        <img
          src={logoSets[8].src}
          alt={`logo`}
          className={`absolute bottom-[-5px] left-[-20px] w-[150px] object-contain transition-opacity duration-1000 opacity-30`}
        />
      </div>

      <div
        className={`grid-item relative pt-[40px] pb-[70px] px-[30px] text-center rounded-[15px] overflow-hidden col-start-5 col-end-6 row-start-6 row-end-9`}
        style={{
          background: "linear-gradient(0deg, hsla(0, 0%, 100%, .04), hsla(0, 0%, 100%, .04)), linear-gradient(210.1deg, rgb(255 235 62 / 15%), rgba(31, 117, 255, 0) 77.12%)"
        }}
      >
        <h6 className="mb-[20px] neue_font text-[15px] tracking-[0.5px]">{logoSets[9].title}</h6>
        <p className="text-[15px]">{logoSets[9].txt}</p>
        <img
          src={logoSets[9].src}
          alt={`logo`}
          className={`absolute bottom-[-5px] left-[-20px] w-[150px] object-contain transition-opacity duration-1000 opacity-30`}
        />
      </div>

    </div>
  )

  // return visibleIndexes.map((logoIndex, i) => {
  //   const isFifth = i === 4;
  //   const isTenth = i === 9;
  //   const addRightBorder = isFifth || isTenth;
  //   const addBottomBorder = i >= 5;

  //   return (
  //     <div className="grid grid-cols-5">
  //       <li
  //         key={i}
  //         className={`flex justify-center items-center lg:border-dashed lg:border-[#000] py-[20px] listing_card
  //         ${addRightBorder ? "lg:border-r-[1px]" : "!border-r-[0px]"}
  //         ${addBottomBorder ? "lg:border-b-[1px]" : "!border-b-[0px]"}
  //       `}
  //       >
  //         <img
  //           src={logoSets[logoIndex].src}
  //           alt={`logo-${i}`}
  //           className={`w-[100px] object-contain transition-opacity duration-1000 ${
  //             fadeOutIndexes.includes(i) ? "opacity-0" : "opacity-100"
  //           }`}
  //         />
  //       </div>
  //     </div>
  //   );
  // });
}
