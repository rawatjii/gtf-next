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

gsap.registerPlugin(TextPlugin);

const mainNavItems = [
  {
    label: "Home",
    subMenus: null,
    href: "/",
  },
  {
    label: "Who We Are",
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
    alt: "linkedin",
    url: "https://in.linkedin.com/company/gtftechnologies",
  },
  {
    icon: <FaXTwitter />,
    alt: "twitter",
    url: "https://x.com/gtfTechnologies",
  },
  {
    icon: <FaFacebookF />,
    alt: "facebook",
    url: "https://www.facebook.com/Gtftechnologiesindia/",
  },
  {
    icon: <FaInstagram />,
    alt: "instagram",
    url: "https://www.instagram.com/gtf_technologies/",
  },
  {
    icon: <FaPinterestP />,
    alt: "pinterest",
    url: "https://in.pinterest.com/GTFTechnologies/",
  },
];

const videoSources = [
  "/assets/header/video1.mp4",
  "/assets/header/video2.mp4",
  "/assets/header/video3.mp4",
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [isDefault, setIsDefault] = useState(true);
  const [isContentHide, setIsContentHide] = useState(true);
  const [loading, setLoading] = useState(false); // for window animation
  const [showText, setShowText] = useState(false); // for "One moment" text
  const submenuRefs = useRef({});
  const topRef = useRef(null);
  const bottomRef = useRef(null);
  const windowRef = useRef(null);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [showHeader, setShowHeader] = useState(true);
  const headerRef = useRef(null);
  const logoRef = useRef(null);
  const headerContentRef = useRef(null);
  const navItemsRef = useRef([]);

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
      gsap.to(
        headerContentRef.current,
        {
          top: 0,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        }
      );

      gsap.fromTo(
        navItemsRef.current,
        {
          opacity:0,
          x:-30,
        },
        {
          opacity:1,
          x:0,
          stagger:0.1,
          duration:0.5,
          ease:"power2.out",
        }
      )
    }else{
      gsap.to(
        headerContentRef.current,
        {
          top: "100px",
          opacity: 0,
          duration: 0.4,
          ease: "power2.out",
        }
      )

      gsap.to(
        navItemsRef.current,
        {
          opacity:0,
          x:-30,
          stagger:0.1,
          duration:0.5,
          ease:"power2.out",
        }
      )
    }
  }, [isMenuOpen]);

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
        className={`fixed w-full h-screen z-[9999] transition-all duration-800 flex items-center ${
          isMenuOpen ? "opacity-1 visible" : " delay-500 opacity-0 invisible"
        }`}
      >
        <div className="absolute h-full w-full bg-[#ffffff80] backdrop-blur-[10px]"></div>

        <div className="container mx-auto px-[50px]">
          <div className="relative">
            <img
              src="/assets/sidemenu/cross-svgrepo-com.svg"
              className="absolute cursor-pointer w-[25px] top-[20px] z-[99] right-[25px] z-99 invert"
              alt=""
              onClick={toggleMenu}
            />

            <div
              ref={headerContentRef}
              className={`right relative transition-all duration-500 top-[100px]`}
            >
              <div className="relative top  bg-[#fff] grid grid-cols-12 rounded-[30px] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.1)]">
                {/* Parent Menu */}
                <div
                  className={`grid-item col-span-7 transition-all transition-300 max-h-[calc(100vh-300px)] relative ${
                    isContentHide ? "opacity-0" : "opacity-100"
                  }`}
                >
                  {/* Parent Menu */}
                  <div
                    className={`parent_menu h-full overflow-auto px-[80px] py-[50px] transition-all duration-300 ease-in-out
                      ${activeItem ? "opacity-0 invisible pointer-events-none" : "opacity-100 visible pointer-events-auto"}`}
                  >
                    <ul className="text-[40px] neue_font font-medium">
                      {mainNavItems.map((item, index) => (
                        <li
                          ref={(el) => {
                            navItemsRef.current[index] = el;
                          }}
                          key={index}
                          className={`relative hover:pl-4 transition-all duration-300 ease-in-out ${
                            mainNavItems.length - 1 !== index ? "mb-[20px]" : ""
                          } ${
                            activeItem === item.label
                              ? "opacity-100 pl-4"
                              : isDefault
                              ? "opacity-100"
                              : "opacity-20"
                          }`}
                        >
                          {item.subMenus ? (
                            <button
                              onClick={() => toggleSubmenu(item.label)}
                              className="text-left w-full text-black font-normal"
                            >
                              {item.label}
                            </button>
                          ) : (
                            <Link
                              href={item.href}
                              className="text-left w-full text-black font-normal"
                              onClick={handleLinkClick}
                            >
                              {item.label}
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Submenu */}
                  <div
                    className={`sub_menus h-full overflow-auto px-[80px] py-[50px] absolute top-0 left-0 w-full transition-all duration-300 ease-in-out
                      ${activeItem ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none"}`}
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
                        className={`transition-all duration-300 ease-in-out ${
                          activeItem === item.label
                            ? "opacity-100 visible pointer-events-auto"
                            : "opacity-0 invisible pointer-events-none absolute top-0 left-0 w-full"
                        }`}
                      >
                        {item.subMenus?.map((submenu, subIndex) => (
                          <ul key={subIndex}>
                            <li className="text-[24px] just_font mb-[15px]">
                              {submenu.href ? (
                                <Link
                                  href={submenu.href}
                                  className="hover:ml-4 transition-all duration-300 ease-in-out hover:underline text-black"
                                  onClick={handleLinkClick}
                                >
                                  {submenu.label}
                                </Link>
                              ) : (
                                <span>{submenu}</span>
                              )}
                            </li>
                          </ul>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>


                <div className="grid-item col-span-5 relative">
                  <video
                    autoPlay
                    muted
                    playsInline
                    loop
                    className="h-full object-cover absolute inset-0 w-full"
                  >
                    <source src="/assets/header/video1.mp4" className="" />
                  </video>
                </div>
              </div>

              <img
                ref={logoRef}
                src="/assets/logo.svg"
                className={`absolute bottom-[30px] right-[40px] h-[60px] ${
                  isContentHide ? " opacity-0" : "opacity-100"
                }`}
                alt="logo"
              />

              <div
                className={`bottom flex h-[100px] items-center justify-end px-[50px] ${
                  isContentHide ? " opacity-0" : "opacity-100"
                }`}
              >
                <h5 className="mr-3 uppercase text-[14px] font-medium">
                  Social Media :
                </h5>
                <ul className="flex gap-3">
                  {socialLinks?.map((link, idx) => (
                    <li key={idx}>
                      <Link href={link.url} target="_blank">
                        {link.icon}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
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
