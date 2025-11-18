import gsap from 'gsap';
import React, { forwardRef, useEffect, useRef } from 'react';

const SlideTxtAn = forwardRef(({ className, spanClass }, ref) => {
  const textRef = useRef(null);
  const tlRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = ['Digital', 'Branding', 'Design', 'Development'];
      const colors = ['#e24397', '#fde93d', '#2aaee4', '#fde93d']; // 4 colors to match 4 words

      // Initial state
      if (textRef.current) {
        textRef.current.textContent = words[0];
        textRef.current.style.color = colors[0];
      }

      const master = gsap.timeline({ repeat: -1 });

      words.forEach((word, i) => {
        const nextIndex = (i + 1) % words.length;
        const nextWord = words[nextIndex];
        const nextColor = colors[nextIndex];

        master
          // Step 1: Current word slides up and fades out
          .to(textRef.current, {
            y: -30,
            opacity: 0,
            duration: 0.5,
            ease: 'power2.in',
          }, '+=2') // 2-second pause before transition

          // Step 2: Instantly change text + color + reset position
          .set(textRef.current, {
            text: nextWord,
            color: nextColor,
            y: 30,
            opacity: 0,
          })

          // Step 3: New word slides in from bottom and fades in
          .to(textRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out',
          });
      });

      tlRef.current = master;
    });

    return () => ctx.revert();
  }, []);

  return (
    <h4 ref={ref} className={`text-[16px] tracking-[2px] uppercase ${className}`}>
      We Are{' '}
      <span
        ref={textRef}
        className={`inline-block font-bold ${spanClass}`}
        style={{ display: 'inline-block' }} // important for transforms
      />{' '}
      Agency
    </h4>
  );
});

export default SlideTxtAn;