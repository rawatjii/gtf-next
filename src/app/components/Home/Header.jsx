"use client"
import { RxHamburgerMenu } from "react-icons/rx";
import { TextPlugin } from 'gsap/TextPlugin';
import { useEffect, useRef } from "react";
import gsap from "gsap";

gsap.registerPlugin(TextPlugin);


const Header = () => {
  const textRef = useRef(null);
  const tlRef = useRef(null);
  const openHamenu = () => {};

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
    <>
      <header className="fixed site-header py-[25px] md:px-[50px] px-[15px] flex justify-between items-center w-full z-[9]">
        <img src="/assets/logo_white.svg" className="h-[60px]" alt="logo" />

        <h4 className="text-white text-[16px] uppercase tracking-[2px]">We Are <span ref={textRef} className="inline-block font-bold" /> Agency</h4>
        

        <div className="hamburger_menu cursor-pointer"  onClick={() => openHamenu()}>
          <span className="bg-white w-[40px] h-[2px] block my-2.5"></span>
          <span className="bg-white w-[25px] h-[2px] block my-2.5"></span>
        </div>
        {/* <RxHamburgerMenu className="text-[40px] font-light text-white" onClick={() => openHamenu()} /> */}
      </header>
 
    </>
  );
};

export default Header;