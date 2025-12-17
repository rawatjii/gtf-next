"use client";
import { RxHamburgerMenu } from "react-icons/rx";
import { TextPlugin } from "gsap/TextPlugin";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useSelector } from "react-redux";
import SlideTxtAn from "@/app/utils/SlideTxtAn";

gsap.registerPlugin(TextPlugin);

const mainNavItems = [
  { label: "HOME", subMenus: "We help bridge the gap in branding, digital marketing and double-digit growth." },
  {
    label: "WHO WE ARE",
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
        label: "About Us",
        href: "/aboutus",
      },
    ],
  },
  {
    label: "HOW WE WORK",
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
    label: "SERVICES",
    subMenus: [
      {
        label: "Brand Strategy",
        href: "/brand-strategy",
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
    label: "WORK",
    subMenus: [
      {
        label: "Portfolio",
        href: "/portfolio",
      },
      {
        label: "Case Studies",
        href: "/case-studies",
      },
      {
        label: "Clients",
        href: "/clients",
      },
      {
        label: "Client Testimonials",
        href: "/client-testimonials",
      },
    ],
  },
  {
    label: "HUMAN RESOURCE",
    subMenus: [
      {
        label: "Work Culture",
        href: "/work-culture",
      },
      {
        label: "Work With Us",
        href: "/work-with-us",
      },
      {
        label: "Life at GTF Technologies",
        href: "/life-at-gtf-technologies",
      },
    ],
  },
  {
    label: "CONTACT",
    subMenus: [
      {
        label: "Request for Quote",
        href: "/request-for-quote",
      },
      {
        label: "Say Hello!",
        href: "/say-hello",
      },
    ],
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
  { icon: "/assets/sidemenu/icon_facebook.svg", alt: "facebook", url: "#" },
  { icon: "/assets/sidemenu/icon_youtube.svg", alt: "youtube", url: "#" },
  { icon: "/assets/sidemenu/icon_linkedin.svg", alt: "linkedin", url: "#" },
  { icon: "/assets/sidemenu/pinterest.svg", alt: "pinterest", url: "#" },
  { icon: "/assets/sidemenu/icon_insta.svg", alt: "instagram", url: "#" },
];

const Header = () => {
  const textRef = useRef(null);
  const tlRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('HOME');
  
  const openHamenu = () => {};

  const isVideoHidden = useSelector((state) => state.home.isVideoHidden);

  return (
    <>
      <header className="fixed site-header py-[25px] md:px-[50px] px-[15px] flex justify-between items-center w-full z-[9999]">
        <img
          src={isVideoHidden ? "/assets/logo.svg" : "/assets/logo_white.svg"}
          className="h-[60px]"
          alt="logo"
        />

        {!isVideoHidden && (
          <SlideTxtAn className="text-white uppercase text-[26px]" />
        )}

        <div
          className="hamburger_menu cursor-pointer"
          onClick={() => setIsMenuOpen(true)}
        >
          <span
            className={`${
              isVideoHidden ? "bg-black" : "bg-white"
            } w-[40px] h-[2px] block my-2.5`}
          ></span>
          <span
            className={`${
              isVideoHidden ? "bg-black" : "bg-white"
            } w-[25px] h-[2px] block my-2.5`}
          ></span>
        </div>
        {/* <RxHamburgerMenu className="text-[40px] font-light text-white" onClick={() => openHamenu()} /> */}
      </header>

      {/* Fullscreen Menu */}
      <section
        className={`fixed left-0 w-full h-screen bg-black flex justify-center items-center z-[9999] transition-all duration-500 ${
          isMenuOpen ? "top-0" : "top-[-200%]"
        }`}
      >
        <img
          src="/assets/sidemenu/menu.jpg"
          className="absolute inset-0 w-full h-full object-cover opacity-70"
          alt="background"
        />

        {/* Close Button */}
        <img
          src="/assets/sidemenu/cross-svgrepo-com.svg"
          className="absolute cursor-pointer w-8 top-6 right-8 z-50"
          alt="close"
          onClick={() => setIsMenuOpen(false)}
        />

        <div className="relative w-full h-full flex flex-col justify-center p-20">
          <div className="bg-[#ffffff0f] h-full w-full px-20 grid grid-cols-12 gap-32">
            {/* Main Navigation */}
            <div className="col-span-3 my-auto">
              <ul>
                {mainNavItems.map((item) => (
                  <li key={item.label} className="mb-[15px]">
                    <button
                      className={`uppercase group font-oswald font-semibold text-3xl transition-colors inline-block relative pb-1 ${
                        activeItem === item.label
                          ? "text-white"
                          : "text-[#FFFFFF40] hover:text-white"
                      }`}
                      onClick={()=>setActiveItem(item.label)}
                    >
                      {item.label}
                      <div
                        className={`absolute bottom-0 left-0 h-1 bg-[#FDE93D] transition-all duration-300 ${
                          activeItem === item.label ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services List */}
            <div className="col-span-4 my-auto">
              <ul className="space-y-3">
                {serviceItems.map((service) => (
                  <li key={service.label}>
                    <a
                      href={service.href}
                      className="uppercase font-oswald font-semibold text-sm tracking-wider text-white hover:text-[#FDE93D] transition-colors block"
                    >
                      {service.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Video Background */}
            <div className="col-span-5 mix-blend-lighten relative">
              <video
                width="800"
                height="200"
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-1/2 -translate-y-1/2 right-0 w-[612px]'
                opacity-50 object-cover"
              >
                <source
                  src="/assets/sidemenu/particle_video.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
          </div>

          {/* Social Links */}
          <div className="absolute bottom-8 right-20 flex items-center">
            <h6 className="font-oswald text-white uppercase font-medium text-base mr-4">
              social media:
            </h6>
            <ul className="flex space-x-3">
              {socialLinks.map((social) => (
                <li key={social.alt}>
                  <a href={social.url}>
                    <img src={social.icon} alt={social.alt} className="w-6" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default Header;
