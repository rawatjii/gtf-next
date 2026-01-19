"use client";
import { RxHamburgerMenu } from "react-icons/rx";
import { TextPlugin } from "gsap/TextPlugin";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useSelector } from "react-redux";
import SlideTxtAn from "@/app/utils/SlideTxtAn";

import {
  FaLinkedinIn,
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";
import SlideTxtAn1 from "@/app/utils/SlideTxtAn1";
import ScrambleHoverText from "@/app/utils/ScrambleHoverText";

gsap.registerPlugin(TextPlugin);

const mainNavItems = [
  {
    label: "Home",
    subMenus: null,
    href: "/",
    shortPara:"We create digital strategies that drive real growth.",
  },
  {
    label: "Who We Are",
    shortPara:"We help brands grow with clarity and purpose.",
    subMenus: [
      // {
      //   label: "Brand Strategy",
      //   href: "/brand",
      // },
      // {
      //   label: "Creative",
      //   href: "/creative",
      // },
      {
        label: "About Us",
        href: "/aboutus",
      },
    ],
  },
  {
    label: "How We Work",
    shortPara:"We work with clarity, collaboration, and a focus on results.",
    subMenus: [
      {
        label: "Digital Media Planning",
        href: "/digital",
      },
      {
        label: "Concept Content & Creative",
        href: "/concept-content-creative",
      },
    ],
  },
  {
    label: "Services",
    shortPara:"Smart services designed to drive growth and deliver results.",
    subMenus: [
      {
        label: "Brand Strategy",
        href: "/services/brand-strategy",
      },
      {
        label: "Creative",
        href: "/services/creative",
      },
      {
        label: "Communication",
        href: "/services/communication",
      },
      {
        label: "Website Design & Development",
        href: "/services/website-design-development",
      },
      {
        label: "Web & Mobile App Testing",
        href: "/services/web-mobile-testing",
      },
      {
        label: "Website's Annual Maintenance",
        href: "/services/website-annual-maintenance",
      },
      {
        label: "Search Engine Optimization",
        href: "/services/search-engine-optimization",
      },
      {
        label: "Google Ads",
        href: "/services/google-ads",
      },
      {
        label: "Display Marketing",
        href: "/services/display-marketing",
      },
      {
        label: "YouTube Marketing",
        href: "/services/youtube-marketing",
      },
      {
        label: "Social Media Optimization",
        href: "/services/social-media-optimization",
      },
      {
        label: "Social Media Marketing",
        href: "/services/social-media-marketing",
      },
      {
        label: "Online Reputation Management Marketing",
        href: "/services/online-management-marketing",
      },
    ],
  },
  {
    label: "Work",
    shortPara:"Work that speaks through impact, results, and growth.",
    subMenus: [
      {
        label: "Portfolio",
        href: "/work/portfolio",
      },
      {
        label: "Case Studies",
        href: "/work/case-studies",
      },
      {
        label: "Clients",
        href: "/work/clients",
      },
      {
        label: "Client Testimonials",
        href: "/testimonial",
      },
    ],
  },
  {
    label: "Human Resource",
    shortPara:"People-first teams built on trust, growth, and collaboration.",
    subMenus: [
      {
        label: "Work Culture",
        href: "/work-culture",
      },
      {
        label: "Work With Us",
        href: "/career",
      },
      {
        label: "Life at GTF Technologies",
        href: "/rewards",
      },
    ],
  },
  {
    label: "Contact",
    shortPara:"Let’s start a conversation that moves your brand forward.",
    subMenus: null,
    href: "/contactus",
  },
];

// Services Sub-menu Items
const serviceItems = [
  { label: "Brand Strategy", href: "/brand" },
  { label: "Creative", href: "/creative" },
  { label: "Communication", href: "/communication" },
  { label: "Website Design & Development", href: "/web-development" },
  { label: "Web & Mobile App Testing", href: "/testing" },
  { label: "Website’s Annual Maintenance", href: "/maintenance" },
  { label: "Search Engine Optimization", href: "/seo" },
  { label: "Google Ads", href: "/google-ads" },
  { label: "Display Marketing", href: "/display-marketing" },
  { label: "YouTube Marketing", href: "/youtube-marketing" },
  { label: "Social Media Optimization", href: "/smo" },
  { label: "Social Media Marketing", href: "/smm" },
  { label: "Online Reputation Management Marketing", href: "/orm" },
];

// Social Media Links
const socialLinks = [
  {
    icon: <FaLinkedinIn />,
    title: "LinkedIn",
    alt: "linkedin",
    url: "https://in.linkedin.com/company/gtftechnologies",
  },
  {
    icon: <FaXTwitter />,
    title: "Twitter",
    alt: "twitter",
    url: "https://x.com/gtfTechnologies",
  },
  {
    icon: <FaFacebookF />,
    title: "Facebook",
    alt: "facebook",
    url: "https://www.facebook.com/Gtftechnologiesindia/",
  },
  {
    icon: <FaInstagram />,
    title: "Instagram",
    alt: "instagram",
    url: "https://www.instagram.com/gtf_technologies/",
  },
  {
    icon: <FaPinterestP />,
    title: "Pinterest",
    alt: "pinterest",
    url: "https://in.pinterest.com/GTFTechnologies/",
  },
];

const videoSources = [
  "/assets/pandas/1.mp4",
  "/assets/pandas/2.mp4",
  "/assets/pandas/3.mp4",
  "/assets/pandas/1.mp4",
  "/assets/pandas/2.mp4",
  "/assets/pandas/3.mp4",
  "/assets/pandas/1.mp4",
];



const Header = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [isDefault, setIsDefault] = useState(true);
  const [isContentHide, setIsContentHide] = useState(true);
  const [loading, setLoading] = useState(false); // for window animation
  const [showText, setShowText] = useState(false); // for "One moment" text
  const submenuRefs = useRef({});
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [showHeader, setShowHeader] = useState(true);
  const [activeVideoIdx, setActiveVideoIdx] = useState(0);
  const [prevVideoIdx, setPrevVideoIdx] = useState(null);

  const headerRef = useRef(null);
  const logoRef = useRef(null);
  const headerContentRef = useRef(null);
  const navItemsRef = useRef([]);

  const videoRefs = useRef([]);
  const videoTlRef = useRef(null);
  const scrambleRefs = useRef([]);

  const logoColors = ["#f762b1", "#e6d11b", "#2aaee4"]; // replace with your exact logo colors

  const getColor = (index) => {
    // groups of 3 share same color sequence
    return logoColors[index % 3];
  };

  const toggleSubmenu = (itemLabel) => {
    setActiveItem(activeItem === itemLabel ? null : itemLabel);
    setIsDefault(false);
  };

  const handleBack = () => {
    setActiveItem(null);
    setIsDefault(true);
  };

  const toggleMenu = () => {
    setIsContentHide(!isContentHide);

    // setTimeout(() => {
    setIsMenuOpen(!isMenuOpen);
    // }, 100);

    if (!isMenuOpen) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      // When menu is closed, show the scrollbar again
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
    }
  };

  const handleLinkClick = () => {
    setLoading(true); // Trigger the animation
    setIsContentHide(!isContentHide);

    // GSAP animation for the "window" effect
    // gsap.set(windowRef.current, { zIndex: 9999 });
    // gsap.to(topRef.current, {
    //   height: "50vh",
    //   duration: 0.5,
    //   ease: "power2.inOut",
    // });
    // gsap.to(bottomRef.current, {
    //   height: "50vh",
    //   duration: 0.5,
    //   ease: "power2.inOut",
    // });

    setIsMenuOpen(false);

    document.documentElement.style.overflow = "auto";
    document.body.style.overflow = "auto";

    // setTimeout(() => {
    //   // setShowText(true);
    // }, 500);
    // setTimeout(() => {
    //   gsap.to(topRef.current, { height: "0" });
    //   gsap.to(bottomRef.current, { height: "0" });
    //   gsap.set(windowRef.current, { zIndex: 0 });
    //   setShowText(false);
    // }, 3000);
  };

  const hoverHandler = (item, index)=>{
    if(isDefault){
      setIsDefault(false);
    }
    if(!activeItem) setHoveredItem(item.label);

    // map nav index -> video index
    const nextVideoIdx = index % videoSources.length;
    animateVideoTo(nextVideoIdx);
  }

  const leaveHandler = ()=>{
    setIsDefault(true);
    setHoveredItem(null);
  }

  const animateVideoTo = (nextIdx) => {
    if (nextIdx === activeVideoIdx) return;
  
    const currentVid = videoRefs.current[activeVideoIdx];
    const nextVid = videoRefs.current[nextIdx];
    if (!currentVid || !nextVid) return;
  
    // kill previous transition timeline if running
    if (videoTlRef.current) {
      videoTlRef.current.kill();
    }
  
    // make sure next is above current
    gsap.set(nextVid, { zIndex: 3 });
    gsap.set(currentVid, { zIndex: 2 });
  
    // next starts hidden (clipped from left)
    gsap.set(nextVid, { clipPath: "inset(0% 0% 0% 100%)" });
    // current starts visible
    gsap.set(currentVid, { clipPath: "inset(0% 0% 0% 0%)" });
  
    const tl = gsap.timeline({
      defaults: {
        duration: 0.55,
        ease: "power2.inOut",
      },
      onComplete: () => {
        // after animation, keep only active visible, hide others
        videoRefs.current.forEach((v, idx) => {
          if (!v) return;
  
          gsap.set(v, {
            zIndex: idx === nextIdx ? 2 : 1,
            clipPath:
              idx === nextIdx
                ? "inset(0% 0% 0% 0%)"
                : "inset(0% 0% 0% 100%)",
          });
        });
  
        setPrevVideoIdx(activeVideoIdx);
        setActiveVideoIdx(nextIdx);
      },
    });
  
    // hide previous from right → left
    tl.to(currentVid, {
      clipPath: "inset(0% 100% 0% 0%)",
    }, 0);
  
    // show next from right → left
    tl.to(nextVid, {
      clipPath: "inset(0% 0% 0% 0%)",
    }, 0);
  
    videoTlRef.current = tl;
  };
  

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY; // Use smooth scroll value for direction
      if (prevScrollPos > currentScrollPos) {
        // Scrolling up
        setShowHeader(true);
        if (currentScrollPos !== 0) {
          gsap.set(headerRef.current, {
            background: "#fff",
            paddingTop: "15px",
            paddingBottom: "15px",
          });
          gsap.set(logoRef.current, {
            height: "50px",
          });
        } else {
          gsap.set(headerRef.current, {
            background: "transparent",
            paddingTop: "25px",
            paddingBottom: "25px",
          });
          gsap.set(logoRef.current, {
            height: "60px",
          });
        }
      } else {
        // Scrolling down
        setShowHeader(false);
      }
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  useEffect(() => {
    if (headerRef.current) {
      gsap.to(headerRef.current, {
        opacity: showHeader ? 1 : 0,
        // y: showHeader ? 0 : -100, // Slide up when hidden
        // duration: 0.3,
      });
    }
  }, [showHeader]);

  // GSAP animation for submenu
  useEffect(() => {
    if (activeItem) {
      const submenu = submenuRefs.current[activeItem];
      gsap.fromTo(
        submenu,
        { opacity: 0, x: 30 }, // Initial state: hidden and off-screen
        {
          opacity: 1,
          x: 0,
          stagger: 0.1, // Stagger each item
          duration: 0.5,
          ease: "power2.out",
        }
      );
    }
  }, [activeItem]);

  // useEffect(() => {
  //   if (!loading) {
  //     gsap.set(topRef.current, { height: "0%" });
  //     gsap.set(bottomRef.current, { height: "0%" });
  //   }
  // }, [loading]);

  useEffect(() => {
    if (isMenuOpen) {
      gsap.to(headerContentRef.current, {
        top: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      });

      gsap.fromTo(
        navItemsRef.current,
        {
          opacity: 0,
          x: -30,
        },
        {
          opacity: 1,
          x: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "power2.out",
        }
      );
    } else {
      gsap.to(headerContentRef.current, {
        top: "100px",
        opacity: 0,
        duration: 0.4,
        ease: "power2.out",
      });

      gsap.to(navItemsRef.current, {
        opacity: 0,
        x: -30,
        stagger: 0.1,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [isMenuOpen]);

  useEffect(()=>{

    videoRefs.current.forEach((vid, idx)=>{
      if(!vid) return;

      gsap.set(vid, {
        zIndex:idx===activeVideoIdx ? 2 : 1,
        clipPath: idx === activeVideoIdx
          ? "inset(0% 0% 0% 0%)" 
          : "inset(0% 0% 0% 100%)",
      })
    })

  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 site-header py-[25px] md:px-[50px] px-[15px] flex justify-between items-center w-full z-[999]"
      >
        <Link href="/">
          <img
            ref={logoRef}
            src="/assets/logo.svg"
            className="h-[60px]"
            alt="logo"
          />
        </Link>

        <div className="hamburger_menu cursor-pointer" onClick={toggleMenu}>
          <span className="bg-black w-[40px] h-[2px] block my-2.5"></span>
          <span className="bg-black w-[25px] h-[2px] block my-2.5"></span>
        </div>
      </header>

      {/* Fullscreen Menu */}
      <section
        className={`fixed bg-[#fff] w-full h-screen z-[9] transition-all duration-800 flex items-center ${
          isMenuOpen ? "visible" : " delay-500 hidden"
        }`}
      >
        {/* <div className="absolute h-full w-full bg-[#ffffff80] backdrop-blur-[10px]"></div> */}

        {/* <div className="container mx-auto px-[50px]"> */}
        <div className="relative w-full">
          {/* <img
              src="/assets/sidemenu/cross-svgrepo-com.svg"
              className="absolute cursor-pointer w-[25px] top-[20px] z-[99] right-[25px] z-99 invert"
              alt=""
              onClick={toggleMenu}
            /> */}

          <div
            ref={headerContentRef}
            className={`right relative transition-all duration-500 px-[50px]`}
          >
            <div className="relative top grid grid-cols-12">
              {" "}
              <div className="grid-item col-span-2 relative flex items-center">
                <div
                  className={` ${isContentHide ? " opacity-0" : "opacity-100"}`}
                >
                  <h5 className="mr-3 uppercase text-[13px] font-medium opacity-40 mb-[25px] tracking-[0.5px]">
                    Social Media :
                  </h5>
                  <ul className="">
                    {socialLinks?.map((link, idx) => (
                      <li
                        key={idx}
                        className="mb-[12px] text-[16px] font-light"
                      >
                        <Link href={link.url} target="_blank" className="group">
                        <SlideTxtAn1>
                          {link.title}
                        </SlideTxtAn1>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* shadow-[0_0_100px_rgba(0,0,0,0.1)]*/}
              <div className="grid-item col-span-3 relative">
                {videoSources?.map((singleVideo, videoIdx)=>(
                  <video
                  ref={(el)=>videoRefs.current[videoIdx] = el}
                  key={videoIdx}
                    autoPlay
                    muted
                    playsInline
                    loop
                    className={`absolute h-full object-contain inset-0 w-full ${videoIdx == 1 || videoIdx == 4 || videoIdx == 7 ? "bg-[#eef3ff]" : videoIdx == 2 || videoIdx == 5 ? "bg-[#f0edf3]" : "bg-[#f8f5e5]"} `}
                  >
                    <source src={singleVideo} className="" />
                  </video>
                ))}
                
              </div>

              {/* f8f5e5, eef3ff, f0edf3 */}

              {/* Parent Menu */}
              <div
                className={`grid-item col-span-7 transition-all transition-300  relative ${
                  isContentHide ? "opacity-0" : "opacity-100"
                }`}
              >
                {/* Parent Menu */}
                <div
                  className={`parent_menu h-full overflow-auto pl-[15vw] transition-all duration-300 ease-in-out
                      ${
                        activeItem
                          ? "opacity-0 invisible pointer-events-none"
                          : "opacity-100 visible pointer-events-auto"
                      }`}
                >
                  <ul className=" font-medium">
                    {mainNavItems.map((item, index) => (
                      <li
                        ref={(el) => {
                          navItemsRef.current[index] = el;
                        }}
                        key={index}
                        onMouseEnter={() => {
                          hoverHandler(item, index);
                          scrambleRefs.current[index]?.play();   // ✅ trigger from parent hover
                        }}
                        onMouseLeave={() => {
                          leaveHandler();
                          scrambleRefs.current[index]?.reset();  // ✅ reset on leave
                        }}
                        className={`group relative hover:pl-1 transition-all duration-300 ease-in-out
                           ${
                              hoveredItem === item.label
                                ? "!opacity-100 text-[40px] font-bold"
                                : isDefault
                                ? "opacity-100 text-[36px] font-normal"
                                : "!opacity-20 text-[36px] font-normal"
                            } ${
                          mainNavItems.length - 1 !== index ? "mb-[10px]" : ""
                        } `}
                      >
                        {item.subMenus ? (
                          <button
                            onClick={() => toggleSubmenu(item.label)}
                            className="text-left w-full text-black "
                          >
                            <SlideTxtAn1>
                            {item.label}
                            </SlideTxtAn1>
                            
                            <small className="block !text-[12px] !font-normal mt-[-10px]" style={{ color: getColor(index) }}><ScrambleHoverText ref={(el) => (scrambleRefs.current[index] = el)} text={item.shortPara} duration={0.7}>{item.shortPara}</ScrambleHoverText></small>
                          </button>
                        ) : (
                          <Link
                            href={item.href}
                            className=" text-left w-full text-black"
                            onClick={handleLinkClick}
                          >
                            <SlideTxtAn1>
                            {item.label}
                            </SlideTxtAn1>
                            <small className="block !text-[12px] !font-normal mt-[-10px]" style={{ color: getColor(index) }}><ScrambleHoverText ref={(el) => (scrambleRefs.current[index] = el)} text={item.shortPara} duration={0.7}>{item.shortPara}</ScrambleHoverText></small>
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Submenu */}
                <div
                  className={`sub_menus  pl-[15vw] absolute top-0 left-0 w-full transition-all duration-300 ease-in-out h-full
                      ${
                        activeItem
                          ? "opacity-100 visible pointer-events-auto"
                          : "opacity-0 invisible pointer-events-none"
                      }`}
                >
                  {/* Back Button */}
                  <button
                    onClick={handleBack}
                    className="flex items-center gap-2 mb-6 text-black text-[16px] just_font hover:opacity-70 transition-opacity"
                    aria-label="Back to main menu"
                  >
                    <span className="text-[20px] leading-none">←</span>
                    <span>Back</span>
                  </button>

                  {mainNavItems.map((item, index) => (
                    <div
                      key={index}
                      ref={(el) => (submenuRefs.current[item.label] = el)}
                      className={`transition-all duration-300 ease-in-out h-full overflow-auto ${
                        activeItem === item.label
                          ? "opacity-100 visible pointer-events-auto"
                          : "opacity-0 invisible pointer-events-none absolute top-0 left-0 w-full"
                      }`}
                    >
                        <ul>
                      {item.subMenus?.map((submenu, subIndex) => (
                          <li key={subIndex} className="group text-[22px] mb-[15px]">
                            {submenu.href ? (
                              <Link
                                href={submenu.href}
                                className="hover:ml-1 transition-all duration-300 ease-in-out hover:underline text-black"
                                onClick={handleLinkClick}
                              >
                                <SlideTxtAn1>
                                {submenu.label}
                                </SlideTxtAn1>
                              </Link>
                            ) : (
                              <span>
                                  <SlideTxtAn1>
                                  {submenu}
                              </SlideTxtAn1>
                                  </span>
                            )}
                          </li>
                      ))}
                      </ul>
                    </div>
                  ))}


                </div>
              </div>
            </div>

            {/* <img
              ref={logoRef}
              src="/assets/logo.svg"
              className={`absolute bottom-[30px] right-[40px] h-[60px] ${
                isContentHide ? " opacity-0" : "opacity-100"
              }`}
              alt="logo"
            /> */}
          </div>
        </div>
        {/* </div> */}
      </section>

      {/* <div ref={windowRef} className="fixed top-0 left-0 w-full h-screen">
        <div
          ref={topRef}
          className="absolute top-0 bg-[#efefef] h-0 w-full "
        ></div>
        <div
          ref={bottomRef}
          className="absolute bottom-0 bg-[#efefef] w-full h-0"
        ></div>
        {showText && (
          <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-white text-[20px] font-semibold">
            <video
              width="150"
              height="auto"
              autoPlay
              muted
              loop
              className="mix-blend-darken"
            >
              <source src="/assets/loader/loader.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <span className="block text-black">One moment</span>
          </div>
        )}
      </div> */}
    </>
  );
};

export default Header;
