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
        label: "Research",
        href: "/casestudy",
      },
      {
        label: "Digital Media Planning",
        href: "/digital",
      },
      {
        label: "Concept Content & Creative",
        href: "/digital",
      },
      {
        label: "Data Analysis & ROI",
        href: "/digital",
      },
    ],
  },
  {
    label: "Services",
    subMenus: [
      {
        label: "Brand Strategy",
        href: "/brand",
      },
      {
        label: "Creative",
        href: "/creative",
      },
      {
        label: "Communication",
        href: "/communication",
      },
      {
        label: "Website Design & Development",
        href: "/website-design-development",
      },
      {
        label: "Web & Mobile App Testing",
        href: "/web-mobile-app-testing",
      },
      {
        label: "Website's Annual Maintenance",
        href: "/web-annual-maintenance",
      },
      {
        label: "Search Engine Optimization",
        href: "/seo",
      },
      {
        label: "Google Ads",
        href: "/google-ads",
      },
      {
        label: "Display Marketing",
        href: "/display-marketing",
      },
      {
        label: "YouTube Marketing",
        href: "/youtube-marketing",
      },
      {
        label: "Social Media Optimization",
        href: "/social-media-optimization",
      },
      {
        label: "Social Media Marketing",
        href: "/social-media-marketing",
      },
      {
        label: "Online Reputation Management Marketing",
        href: "/orm-marketing",
      },
    ],
  },
  {
    label: "Work",
    subMenus: [
      {
        label: "Portfolio",
        href: "/work",
      },
      {
        label: "Case Studies",
        href: "/casestudy",
      },
      {
        label: "Clients",
        href: "/clients",
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

  const toggleSubmenu = (itemLabel) => {
    setActiveItem(activeItem === itemLabel ? null : itemLabel);
    setIsDefault(false);
  };

  const toggleMenu = () => {
    setIsContentHide(!isContentHide);

    setTimeout(() => {
      setIsMenuOpen(!isMenuOpen);
    }, 100);

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
    gsap.set(windowRef.current, { zIndex: 9999 });
    gsap.to(topRef.current, {
      height: "50vh",
      duration: 0.5,
      ease: "power2.inOut",
    });
    gsap.to(bottomRef.current, {
      height: "50vh",
      duration: 0.5,
      ease: "power2.inOut",
    });

    setTimeout(() => {
      setShowText(true);
      setIsMenuOpen(false);
    }, 500);
    setTimeout(() => {
      gsap.to(topRef.current, { height: "0" });
      gsap.to(bottomRef.current, { height: "0" });
      gsap.set(windowRef.current, { zIndex: 0 });
      setShowText(false);
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
    }, 3000);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY; // Use smooth scroll value for direction
      console.log("currentScrollPos", currentScrollPos);
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
    // Use GSAP for smooth transition when showing or hiding the header
    if (headerRef.current) {
      gsap.to(headerRef.current, {
        opacity: showHeader ? 1 : 0,
        y: showHeader ? 0 : -100, // Slide up when hidden
        duration: 0.3, // Animation duration
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

  useEffect(() => {
    if (!loading) {
      gsap.set(topRef.current, { height: "0%" });
      gsap.set(bottomRef.current, { height: "0%" });
    }
  }, [loading]);

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 site-header py-[25px] md:px-[50px] px-[15px] flex justify-between items-center w-full z-[999]"
      >
        <img
          ref={logoRef}
          src="/assets/logo.svg"
          className="h-[60px]"
          alt="logo"
        />

        <div className="hamburger_menu cursor-pointer" onClick={toggleMenu}>
          <span className="bg-black w-[40px] h-[2px] block my-2.5"></span>
          <span className="bg-black w-[25px] h-[2px] block my-2.5"></span>
        </div>
      </header>

      {/* Fullscreen Menu */}
      <section
        className={`fixed w-full h-screen z-[9999] transition-all duration-800 ${
          isMenuOpen ? "opacity-1 visible" : " delay-500 opacity-0 invisible"
        }`}
      >
        <div className="absolute h-full w-full bg-[#efeee7]"></div>

        <div className="relative grid grid-cols-12 h-full">
          <img
            src="/assets/sidemenu/cross-svgrepo-com.svg"
            class="absolute cursor-pointer w-[25px] top-[20px] z-[99] right-[25px] z-99 invert"
            alt=""
            onClick={toggleMenu}
          />

          <div className="relative left col-span-4">
            <div
              className={`transition-all duration-300 ${
                isMenuOpen ? "delay-400 opacity-1" : "opacity-0"
              }`}
            >
              <div className="clouds absolute w-full h-full overflow-hidden z-0">
                <img
                  src="/assets/header/cloud.png"
                  alt=""
                  className="absolute top-[55%] w-[80px] animate-moveCloud1"
                />

                <img
                  src="/assets/header/cloud2.png"
                  alt=""
                  className="absolute top-[45%] left-[30%] w-[100px] animate-moveCloud2"
                />
              </div>

              <img
                src="/assets/header/building_img.png"
                className={`transition-all duration-300 w-full h-[calc(100vh)] object-cover z-[9] relative`}
              />
            </div>
            {/* <div className="absolute bottom-[50px]">
              <img
                src="/assets/home/who_we_are/creative1/img1-sm.webp"
                width={400}
                className={`transition-all duration-300 ${isMenuOpen ? "delay-500 opacity-1" : "opacity-0"}`}
              />
            </div> */}
          </div>

          <div
            className={`right bg-[#fff] col-span-8 transition-all duration-500 border-l ${
              isMenuOpen ? "ml-0" : "ml-[100%]"
            }`}
          >
            <div className="relative top  pt-[100px] px-[50px] h-[calc(100%-100px)]">
              {/* Parent Menu */}
              <div
                className={`grid items-center grid-cols-2 h-full transition-all transition-300 ${
                  isContentHide ? " opacity-0" : "opacity-100"
                }`}
              >
                <div className="parent_menu">
                  <ul className="text-[40px] neue_font font-medium">
                    {mainNavItems.map((item, index) => (
                      <li
                        key={index}
                        className={`relative transition-all hover:pl-4 transition-all duration-300 ease-in-out mb-[10px] ${
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
                            className="text-left w-full"
                          >
                            {item.label}
                          </button>
                        ) : (
                          <Link
                            href={item.href}
                            className="text-left w-full"
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
                <div className="sub_menus">
                  {mainNavItems.map((item, index) => (
                    <div
                      key={index}
                      ref={(el) => (submenuRefs.current[item.label] = el)}
                      className={`pl-4 mt-2 ${
                        activeItem === item.label ? "block" : "hidden"
                      }`}
                    >
                      {activeItem === item.label &&
                        item.subMenus &&
                        item.subMenus.map((submenu, subIndex) => (
                          <ul key={subIndex}>
                            <li className="text-[18px] just_font mb-[10px]">
                              {submenu.href ? (
                                <Link
                                  href={submenu.href}
                                  className=" hover:ml-4 transition-all duration-300 ease-in-out hover:underline"
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

              <img
                ref={logoRef}
                src="/assets/logo.svg"
                className={`absolute bottom-[30px] right-[40px] h-[60px] ${
                  isContentHide ? " opacity-0" : "opacity-100"
                }`}
                alt="logo"
              />
            </div>

            <div
              className={`bottom flex h-[100px] border-t items-center justify-end px-[50px] ${
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
      </section>

      <div ref={windowRef} className="fixed top-0 left-0 w-full h-screen">
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
          // <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-white text-[20px] font-semibold z-[99999] bg-[#efefef]">
          //   {/* loader1 */}
          //   <video
          //     width="150"
          //     height="auto"
          //     autoPlay
          //     muted
          //     loop
          //     className="mix-blend-darken"
          //   >
          //     <source src="/assets/loader/page_loader1.mp4" type="video/mp4" />
          //     Your browser does not support the video tag.
          //   </video>

          //   {/* loader2 */}
          //   <video
          //     width="150"
          //     height="auto"
          //     autoPlay
          //     muted
          //     loop
          //     className="mix-blend-darken"
          //   >
          //     <source src="/assets/loader/page_loader2.mp4" type="video/mp4" />
          //     Your browser does not support the video tag.
          //   </video>

          //   {/* loader3 */}
          //   <video
          //     width="150"
          //     height="auto"
          //     autoPlay
          //     muted
          //     loop
          //     className="mix-blend-darken"
          //   >
          //     <source src="/assets/loader/page_loader3.mp4" type="video/mp4" />
          //     Your browser does not support the video tag.
          //   </video>
          // </div>
        )}
      </div>

      {/* "One moment" Text Animation */}
    </>
  );
};

export default Header;
