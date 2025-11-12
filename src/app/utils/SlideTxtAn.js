import gsap from 'gsap';
import React, { useEffect, useRef } from 'react'

const SlideTxtAn = ({className, spanClass}) => {
  const textRef = useRef(null);
  const tlRef = useRef(null);

  useEffect(()=>{
    const ctx = gsap.context(()=>{
      const staticText = 'we are ';
      const words = ['Digital', 'Branding', 'Design', 'Development'];

      // start with the first phrase
      if (textRef.current) {
        textRef.current.textContent = `${words[0]}`;
      }

      const master = gsap.timeline({repeat:"-1"});

      words.forEach((word, i)=>{
        const nextWord =  words[(i + 1)% words.length];

        // current word moves UP and fades out
        master
          .to(textRef.current, {
            y: -30,
            opacity: 0,
            duration: 0.4,
            ease: 'power2.in',
          }, '+=2') // 2 s pause before each change (adjust as you like)

          // ---- step B: instantly change text to the next word ----
          .set(textRef.current, {
            text: `${nextWord}`,
            y: 30,
            opacity: 0,
          })

          // ---- step C: next word comes from BOTTOM and fades in ----
          .to(textRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.4,
            ease: 'power2.out',
          });
      })

      tlRef.current = master;

    });

    return () => ctx.revert();
  }, [])

  return (
    <h4 className={`text-[16px] tracking-[2px] ${className}`}>
      We Are <span ref={textRef} className={`inline-block font-bold ${spanClass}`} /> Agency
    </h4>
  )
}

export default SlideTxtAn