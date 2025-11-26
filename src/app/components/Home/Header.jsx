"use client"
import { RxHamburgerMenu } from "react-icons/rx";
import { TextPlugin } from 'gsap/TextPlugin';
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useSelector } from "react-redux";
import SlideTxtAn from "@/app/utils/SlideTxtAn";

gsap.registerPlugin(TextPlugin);

const Header = () => {
  const textRef = useRef(null);
  const tlRef = useRef(null);
  const openHamenu = () => {};

  const isVideoHidden = useSelector((state)=>state.home.isVideoHidden)

  return (
    <>
      <header className="fixed site-header py-[25px] md:px-[50px] px-[15px] flex justify-between items-center w-full z-[9]">
        <img src={isVideoHidden ? '/assets/logo.svg' : '/assets/logo_white.svg'} className="h-[60px]" alt="logo" />

        {!isVideoHidden && <SlideTxtAn className="text-white uppercase text-[26px]" />}

        <div className="hamburger_menu cursor-pointer"  onClick={() => openHamenu()}>
          <span className={`${isVideoHidden ? 'bg-black' : 'bg-white'} w-[40px] h-[2px] block my-2.5`}></span>
          <span className={`${isVideoHidden ? 'bg-black' : 'bg-white'} w-[25px] h-[2px] block my-2.5`}></span>
        </div>
        {/* <RxHamburgerMenu className="text-[40px] font-light text-white" onClick={() => openHamenu()} /> */}
      </header>
 
    </>
  );
};

export default Header;