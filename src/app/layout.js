// app/layout.js
"use client";
import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "./components/Home/Header";
import Footer from "./components/Home/Footer";
import { usePathname } from "next/navigation";
import MainLoader from "./components/Loader/Index";

gsap.registerPlugin(ScrollTrigger,ScrollSmoother );

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const smootherRef = useRef(null);
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);
  

  useLayoutEffect(() => {
    if(!wrapperRef.current || !contentRef.current) return;

    const smoother = ScrollSmoother.create({
      wrapper: wrapperRef.current,
      content: contentRef.current,
      smooth: 3,
      normalizeScroll:false,
      // smoothTouch: 0.1, // uncomment for mobile touch smoothing
    });

    smootherRef.current = smoother;
    
    // Refresh on resize
    let resizeTimer;
    const onResize = ()=>{
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(()=>{
        ScrollTrigger.refresh();
      }, 150)
    }

    window.addEventListener('resize', onResize);

    return()=>{
      window.removeEventListener("resize", onResize);
      if(smootherRef.current){
        smootherRef.current.kill();
        smootherRef.current = null;
      }
    }
    
  }, []);



  return (
    <html lang="en">
      <body>
      <MainLoader />
        <div id="smooth-wrapper" ref={wrapperRef}>
          <div id="smooth-content" ref={contentRef}>
          {isHome && <Header />}
            {children}
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}