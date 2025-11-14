import gsap from "gsap";
import React, { useEffect, useRef } from "react";

const ScrollText = ({scrolltext, position, className, color="white"}) => {
  const marqueeRef = useRef(null);

  // infinite marquee
  useEffect(() => {
    if (!marqueeRef.current) return;

    const el = marqueeRef.current;
    const distance = el.offsetWidth / 2;

    const tl = gsap.timeline({ repeat: -1, defaults: { ease: "none" } });

    if(position=='toLeft'){
      tl.fromTo(el, { x: 0 }, { x: -distance, duration: 100 });
    }else{
      tl.fromTo(el, { x: -distance }, { x: 0, duration: 100 });
    }

    

    // seamless loop: when the first half disappears, jump back instantly
    tl.set(el, { x: 0 });

    return () => tl.kill();
  }, [position]);

  return (
    <h2
      ref={marqueeRef}
      className={`inline-block whitespace-nowrap uppercase leading-none ${className}`}
      style={{color}}
    >
      {Array.from({ length: 4 }).map((_, i) => (
        <span key={i} className="inline-flex items-center">
          {scrolltext ? scrolltext.map((text, i)=>(
            <React.Fragment key={i}>
              {text}
              <span className={`dot h-[20px] w-[20px] inline-block mx-[50px]`} style={{ backgroundColor: color }}></span>
            </React.Fragment>
          )) : (
            <>
              Branding{" "}
              <span className={`dot h-[20px] w-[20px] inline-block mx-[50px]`} style={{ backgroundColor: color }}></span>
              Digital Marketing{" "}
              <span className={`dot h-[20px] w-[20px] inline-block mx-[50px]`} style={{ backgroundColor: color }}></span>
              Double-Digit Growth{" "}
              <span className={`dot h-[20px] w-[20px] inline-block mx-[50px]`} style={{ backgroundColor: color }}></span>
            </>
          )}

        </span>
      ))}
    </h2>
  );
};

export default ScrollText;
