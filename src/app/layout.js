// app/layout.js
"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "./components/Home/Header";
import Footer from "./components/Home/Footer";
import { usePathname } from "next/navigation";
import MainLoader from "./components/Loader/Index";

gsap.registerPlugin(ScrollSmoother,ScrollTrigger );

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  
  useEffect(() => {

    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 3,
      normalizeScroll:false
    });

    
    // Refresh on resize
    
  }, []);

  return (
    <html lang="en">
      <body>
      <MainLoader />
        <div id="smooth-wrapper">
          <div id="smooth-content">
          {isHome && <Header />}
            {children}
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}