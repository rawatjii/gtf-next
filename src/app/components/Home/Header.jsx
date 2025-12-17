"use client";
import { RxHamburgerMenu } from "react-icons/rx";
import { TextPlugin } from "gsap/TextPlugin";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useSelector } from "react-redux";
import SlideTxtAn from "@/app/utils/SlideTxtAn";

import { FaLinkedinIn, FaFacebookF, FaInstagram, FaPinterestP } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

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
          onClick={() => setIsMenuOpen(!isMenuOpen)}
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
        className={`fixed w-full h-screen z-[999] transition-all duration-300 ${
          isMenuOpen ? "opacity-1 visible" : "opacity-0 invisible"
        }`}
      >
        <div className=" absolute h-full w-full opacity-[0.8] before:bg-[#e24397] before:absolute before:h-full before:w-full"></div>

        <div className="relative grid grid-cols-12 h-full">
          <div className="left col-span-4"></div>
          <div className="right bg-[#fff] col-span-8">
            <div className="top grid grid-cols-2 pt-[100px] items-center px-[50px]">
              <div>
                <ul className="text-[60px] neue_font font-semibold">
                  <li>Home</li>
                  <li>Who We Are</li>
                  <li>Who We Are</li>
                  <li>Who We Are</li>
                  <li>Who We Are</li>
                </ul>
              </div>

              <div>
                <ul>
                  <li>Home</li>
                  <li>Who We Are</li>
                  <li>Who We Are</li>
                  <li>Who We Are</li>
                  <li>Who We Are</li>
                </ul>
              </div>
            </div>

            <div className="bottom">
              <h5>Social Media:</h5>
              <ul>
                <li>
                  <a href="">
                    <FaLinkedinIn />
                  </a>
                </li>

                <li>
                  <a href="">
                  <FaXTwitter />
                  </a>
                </li>

                <li>
                  <a href="">
                  <FaFacebookF />
                  </a>
                </li>

                <li>
                  <a href="">
                  <FaInstagram />
                  </a>
                </li>

                <li>
                  <a href="">
                  <FaPinterestP />
                  </a>
                </li>

              </ul>
            </div>
          </div>
        </div>

        {/* <img
          src="/assets/sidemenu/menu.jpg"
          className="absolute inset-0 w-full h-full object-cover opacity-70"
          alt="background"
        /> */}

        {/* Close Button */}
        {/* <img
          src="/assets/sidemenu/cross-svgrepo-com.svg"
          className="absolute cursor-pointer w-8 top-6 right-8 z-50 invert"
          alt="close"
          onClick={() => setIsMenuOpen(false)}
        /> */}

        <div className="relative w-full h-full flex flex-col justify-center p-20">
          
        </div>
      </section>
    </>
  );
};

export default Header;
