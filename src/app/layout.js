// app/layout.js
"use client";
import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "./components/Home/Header";
import Footer from "./components/Home/Footer";
import { usePathname } from "next/navigation";
import SparkleBackground from "./components/SparkleBackground";
import MainLoader from "./components/Loader/Index";
import { Provider } from "react-redux";
import { store } from "@/store";
import Cursor from "./components/Cursor";
import Spotlight from "./utils/Spotlight";

import "./globals.css";
import NoiseOverlay from "./components/NoiseOverlay";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const smootherRef = useRef(null);
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    if (!wrapperRef.current || !contentRef.current) return;

    const smoother = ScrollSmoother.create({
      wrapper: wrapperRef.current,
      content: contentRef.current,
      smooth: 3,
      normalizeScroll: false,
      // smoothTouch: 0.1, // uncomment for mobile touch smoothing
    });

    // smootherRef.current = smoother;

    // Refresh on resize
    // let resizeTimer;
    // const onResize = () => {
    //   clearTimeout(resizeTimer);
    //   resizeTimer = setTimeout(() => {
    //     ScrollTrigger.refresh();
    //   }, 150);
    // };

    // window.addEventListener("resize", onResize);

    // return () => {
    //   window.removeEventListener("resize", onResize);
    //   if (smootherRef.current) {
    //     smootherRef.current.kill();
    //     smootherRef.current = null;
    //   }
    // };
  }, []);

  return (
    <html lang="en">
      <link
        href="https://fonts.googleapis.com/css2?family=Merriweather:ital,opsz,wght@0,18..144,300..900;1,18..144,300..900&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Merriweather:ital,opsz,wght@0,18..144,300..900;1,18..144,300..900&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Merriweather:ital,opsz,wght@0,18..144,300..900;1,18..144,300..900&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap"
        rel="stylesheet"
      ></link>

      <body>
        <MainLoader />

        <Provider store={store}>
          <Header />
          <div id="smooth-wrapper" ref={wrapperRef}>
            <div id="smooth-content" ref={contentRef}>
              {/* <SparkleBackground /> */}
              {children}
              <Footer />
            </div>
          </div>
          <NoiseOverlay />
        </Provider>
        <Cursor />
        {/* <Spotlight /> */}
      </body>
    </html>
  );
}
