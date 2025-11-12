import { useEffect, useState } from "react";



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

  useEffect(() => {
    let batch = 0;
    const switchLogos = () => {
      const indexesToSwitch = [];
      for (let i = batch; i < totalSlots; i += batchSize) {
        indexesToSwitch.push(i);
      }
      setFadeOutIndexes(indexesToSwitch);
      setTimeout(() => {
        setVisibleIndexes((prev) =>
          prev.map((v, i) =>
            indexesToSwitch.includes(i) ? (v + batchSize) % logoSets.length : v
          )
        );
        setFadeOutIndexes([]);
      }, 400);
      batch = (batch + 1) % batchSize;
    };

    const timer = setInterval(switchLogos, interval);
    return () => clearInterval(timer);
  }, []);

  return visibleIndexes.map((logoIndex, i) => {
    const isFifth = i === 4;
    const isTenth = i === 9;
    const addRightBorder = isFifth || isTenth;
    const addBottomBorder = i >= 5;

    return (
      <li
        key={i}
        className={`flex justify-center items-center lg:border-dashed lg:border-[#000] py-[20px] listing_card
        ${addRightBorder ? "lg:border-r-[1px]" : "!border-r-[0px]"}
        ${addBottomBorder ? "lg:border-b-[1px]" : "!border-b-[0px]"}
      `}
      >
        <img
          src={logoSets[logoIndex].src}
          alt={`logo-${i}`}
          className={`w-[100px] h-[100px] object-contain transition-opacity duration-1000 ${
            fadeOutIndexes.includes(i) ? "opacity-0" : "opacity-100"
          }`}
        />
      </li>
    );
  });
}
