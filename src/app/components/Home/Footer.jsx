"use client";
import {
  FaFacebookF,
  FaPinterestP,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import { IoIosCall } from "react-icons/io";
import { useRef, useState, useEffect } from "react";
import Line from "../Line";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { AiOutlineYoutube } from "react-icons/ai";
import Link from "next/link";
import ScrollText from "@/app/utils/ScrollText";

const scrollText = [
  "Your next step starts here",
  "Reach out to us!",
];

const locations = [
  {
    location: "Noida (Delhi NCR)",
    address: "3rd Floor, Plot No. D5-6, Sector 3, Noida, Uttar Pradesh 201301",
    number: "(+91) 9953 91 7978",
  },
  {
    location: "Gurgaon (Delhi NCR)",
    address:
      "715-713 DLF Galleria Towers, DLF Phase- IV, Gurugram, Haryana, India- 122001",
    number: "(+91) 9953 91 7978",
  },
  {
    location: "Mumbai",
    address:
      "Teloz spaces Techniplex 2, 3rd Floor, SV Road, Malad West, Mumbai. 400104",
    number: "(+91) 9582 53 2488",
  },
  {
    location: "Pune",
    address:
      "9th floor office no. 11.16 Sadanand Business centre (SBC), Pashan Hwy Side Rd, Baner, Pune, Maharashtra 411045",
    number: "(+91) 9953 60 5303",
  },
  {
    location: "Bangalore",
    address:
      "91 Springboard indiranagar, George Thangaiah Complex, 4th Floor, Kalyan Nagar, Indira Nagar 1st Stage, Bengaluru, Karnataka 560038",
    number: "(+91) 7838 80 0248",
  },
  {
    location: "Hyderabad",
    address:
      "Awfis Vasavi MPM Ameerpet. 4th Floor, Vasavi MPM Grand, Ameerpet, Yella Reddy Guda, Hyderabad, Telangana 500073",
    number: "(+91) 7838 500 356",
  },
];

const sequence = [[1, 3], [0, 4], [2]];

const Footer = () => {
  const circleRef = useRef(null);
  const coloredLineRef = useRef(null);
  const [activeIndexes, setActiveIndexes] = useState([]);

  const footerTxtRef = useRef(null);
  const footerRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    const blinkDots = (indexes, blinks = 2, delay = 1000) => {
      return new Promise((resolve) => {
        let count = 0;
        let on = true;

        const interval = setInterval(() => {
          if (!isMounted) {
            clearInterval(interval);
            return;
          }
          setActiveIndexes(on ? indexes : []);
          on = !on;
          if (!on) count++;
          if (count >= blinks) {
            clearInterval(interval);
            setTimeout(resolve, delay);
          }
        }, delay);
      });
    };

    const runAllDotsBlink = async () => {
      while (isMounted) {
        await blinkDots([0, 1, 2, 3, 4], 2, 500);
      }
    };

    runAllDotsBlink();

    return () => {
      isMounted = false;
    };
  }, []);

  useGSAP(
    () => {
      const circle = circleRef.current;
      if (!circle) return;
      const circleAnimation = gsap.fromTo(
        circle,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 3.5,
          delay: 4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: circle,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );

      // Cleanup function
      return () => {
        if (circleAnimation.scrollTrigger) {
          circleAnimation.scrollTrigger.kill();
        }
        circleAnimation.kill();
      };
    },
    { dependencies: [] }
  );

  useGSAP(()=>{
    const img = footerTxtRef.current;
    if (!img) return;

    // Start with image fully clipped (hidden from bottom)
    gsap.set(img, {
      clipPath: "inset(100% 0 0 0)",
    })

    const tl = gsap.timeline({
      scrollTrigger:{
        trigger: footerTxtRef.current,
        start: "top bottom",
        once: true,
      }
    })

    tl.to(img, {
      clipPath: "inset(0% 0 0% 0%)",  // Reveal from bottom to top
      duration: 0.8,
      ease: "power3.out",
    })

    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
    };

  }, {dependencies:[]})


  return (
    <>
      {/* <section className="new_letter_sec  mix-blend-multiply px-[15px] lg:py-0  py-[60px]">
        <h2 className="uppercase text-[30px] inline-block font-medium  2xl:text-[65px] mb-[25px] xl:text-[40px] md:text-start lg:text-[55px] font-[Oswald]  relative md:leading-[70px]">
          subscribe to newsletter
          <Line
            ref={coloredLineRef}
            bgColor="bg-gtf-yellow"
            left="left-[52%] lg:left-[61%]"
            bottom="bottom-[0px] lg:bottom-[9px]"
          />
        </h2>
        <p className="uppercase md:leading-[37px] leading-[28px] md:text-start  font-[450] md:text-[18px] text-[14px] font-[Oswald] mt-[0px] mb-[40px] ">
          Lorem Ipsum has been the industry's standard dummy text ever since the
          1500s, when an unknown printer took a galley of type and scrambled it
          to make a type specimen book. took a galley of type and scrambled it
          to make a type specimen book.
        </p>
        <div className="md:flex justify-end z-[2] md:text-start  relative md:mt-[60px] gap-[18px] md:mb-[100px] md:mx-0 mx-auto">
          <input
            type="email"
            className="px-[20px] py-[10px] xl:w-[370px] w-[100%] md:mb-0 mb-[15px] font-[Oswald] font-[600] text-[16px] md:text-[24px] rounded-md bg-[#DFDFDF] placeholder:text-[#A1A1A1]"
            placeholder="EX.YOUR@GMAIL.COM"
          />
          <button className="bg-[black] w-[100%] lg:w-auto font-[600] uppercase font-[Oswald] rounded-md shadow-md text-white cursor-pointer  xl:text-[18px] text-[16px]  outline-none px-[2.2rem] py-[0.54rem] text-center transition-transform duration-150 ease-in-out hover:shadow-lg hover:-translate-y-1">
            Submit
          </button>
        </div>
      </section> */}
      <footer ref={footerRef} className="md:px-[35px] px-[15px] z-[2] relative pb-[25px] pt-[50px]">

        <ScrollText scrolltext={scrollText} position="toLeft" className="text-[100px] bartino font-bold tracking-[13px] mb-[100px]" color="#000" />

        <div className="grid grid-cols-12">
          <div className="col-span-3">
            <div className="logo">
              <div className="icons flex items-center">
                <span className="icon pink">
                  <img
                    src="/assets/logos/pink_color.svg"
                    alt="pink logo icon"
                    className="img-fluid w-[40px]"
                  />
                </span>
                <span className="icon yellow ml-[-10px]">
                  <img
                    src="/assets/logos/yellow_color.svg"
                    alt="yellow logo icon"
                    className="img-fluid w-[40px]"
                  />
                </span>
                <span className="icon pink ml-[-10px]">
                  <img
                    src="/assets/logos/blue_color.svg"
                    alt="blue logo icon"
                    className="img-fluid w-[40px]"
                  />
                </span>
              </div>
              <h5 className="text-[30px] font-[Oswald] font-medium">
                GTF Technologies
              </h5>
            </div>
          </div>

          <div className="col-span-9">
            <div className="grid grid-cols-12">
              {locations?.map((data, index) => (
                <div key={index} className="col-span-4 px-[30px] mb-[60px]">
                  <h4 className="font-[Oswald] text-[22px] mb-[20px]">{data.location}</h4>
                  <p className="text-[16px] mb-[5px]">
                    {data.address}
                  </p>
                  {data.number && (
                    <p className="font-[Oswald] mt-[10px]">
                      <Link href={data.number}>{data.number}</Link>
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>


        </div>

        <div className="footerTxt mt-[50px]">
          <img
            ref={footerTxtRef}
            src="/assets/footer/footer_txt.svg"
            alt="footer text"
            className="img-fluid"
            style={{clipPath: "inset(100% 0 0 0)"}}
          />
        </div>

        {/*<div className="border-y-solid mdLmt-[50px] py-[20px] lg:py-0  border-dashed flex flex-wrap md:justify-between justify-center items-center border-y-[1px] border-black">
          <div className="basis-[33%] md:block hidden text-left">
            <h4 className="font-[Oswald] uppercase text-[24px] font-bold border-r-solid border-r-black border-r-[1px] py-[2rem] border-dashed">
              Let's Have a Conversation!
            </h4>
          </div>
          <div className="md:basis-[33%] basis-[100%] text-center md:py-0">
            <h4 className="font-[Oswald] uppercase text-[20px] lg:text-[24px] font-bold border-r-solid md:border-r-black border-r-[1px] md:py-[2rem] border-dashed">
              Call Now: +91-9958-87-1603
            </h4>
          </div>
          <div className="basis-[33%] justify-end flex md:mt-[0] mt-[20px] ">
            <FaFacebookF className="text-[18px] lg:text-[22px] mr-[1.3rem]" />
            <FaPinterestP className="text-[18px] lg:text-[22px] mr-[1.3rem]" />
            <FaLinkedinIn className="text-[18px] lg:text-[22px] mr-[1.3rem]" />
            <FaInstagram className="text-[18px] lg:text-[22px] mr-[1.3rem]" />
            <AiOutlineYoutube className="text-[18px] lg:text-[22px] " />
          </div>
        </div>
        <div className="border-b-solid border-dashed   flex flex-wrap justify-between  items-stretch md:pt-0  border-b-[1px] border-black md:py-[0]">
          <div className="md:basis-[33%] basis-[100%] flex md:border-r-solid md:border-r-[1px] border-black border-dashed md:py-0 py-[20px] relative">
            <div
              ref={circleRef}
              className="md:h-[180px] md:w-[180px] h-[90px] w-[90px] left-[0%] absolute bottom-[15%] z-[-1]  bg-[#FDE93D] rounded-full mix-blend-multiply"
            ></div>
            <ul className="uppercase self-end  md:mb-[1.9rem]">
              <li className="font-[Oswald] text-[17px] mb-[0.6rem]">home</li>
              <li className="font-[Oswald] text-[17px] mb-[0.6rem]">
                about us
              </li>
              <li className="font-[Oswald] text-[17px] mb-[0.6rem]">
                services
              </li>
              <li className="font-[Oswald] text-[17px] mb-[0.6rem]">work</li>
              <li className="font-[Oswald] text-[17px] mb-[0.6rem]">
                human resources
              </li>
              <li className="font-[Oswald] text-[17px]">contact us</li>
            </ul>
          </div>
          <div className="md:basis-[33%]  basis-[100%]  md:py-[65px] py-[30px] md:pb-[43px] items-center justify-center border-r-solid md:border-r-[1px] md:border-t-[0px] border-t-[1px] border-black border-dashed relative">
            <div className="md:basis-[100%] flex mt-[2rem] justify-center relative flex-wrap">
              {dotsConfig.map((dot, index) => {
                const isActive = activeIndexes.includes(index);
                return (
                  <span
                    key={index}
                    className={`
              absolute h-[8px] w-[8px]  transition-opacity transform duration-500 ease-in-out
              ${dot.color}
              ${isActive ? "opacity-100 scale-100" : "opacity-0 scale-75"}
            `}
                    style={{
                      top: dot.top,
                      left: dot.left,
                      bottom: dot.bottom,
                    }}
                  />
                );
              })}
              <img
                src="/assets/home/map-1.png"
                className=" h-[300px] basis-[100%] md:mb-[2.5rem] mb-[20px] object-contain"
                alt="map.png"
              />
              /~ <img
              src="/assets/home/map.png"
              className="basis-[100%] h-[250px] mb-[2.5rem] object-contain"
              alt="map.png"
            /> ~/
              <img
                src="/assets/gtf-logo.png"
                className="basis-[30%] md:h-[50px] h-[35px] object-contain"
                alt="gtf-logo.png"
              />
              <img
                src="/assets/home/global-partner.png"
                className="basis-[30%] md:h-[50px] h-[35px] object-contain"
                alt="global-partner.png"
              />
              <img
                src="/assets/home/google-partner.png"
                className="basis-[30%] md:h-[50px] h-[35px] object-contain"
                alt="google-partner.png"
              />
            </div>
          </div>
          <div className="md:basis-[33%] basis-[100%] z-[1]  border-black border-dashed  flex flex-wrap md:pt-[35px] md:pb-[3rem] md:px-0 items-center justify-center   py-[30px] relative">
            <div className="md:overflow-y-scroll max-h-[450px] md:px-10    overflow-x-hidden [&::-webkit-scrollbar]:w-[2.5px]  [&::-webkit-scrollbar-track]:bg-[#DADADA] [&::-webkit-scrollbar-thumb]:bg-[#1D1A1A]">
              <ul className="uppercase ">
                <li className="mb-[45px]">
                  <span className="block font-[Oswald]">Noida (Delhi NCR)</span>
                  <span className=" block my-[16px] text-[14px] text-[#404040]">
                    3rd Floor, Plot No. D5-6, Sector 3, Noida, Uttar Pradesh
                    201301
                  </span>
                  <span className="items-center flex font-[Oswald]  ">
                    <IoIosCall className="mt-[3px] text-[22px] mr-[10px] font-[500]" />
                    (+91) 9953 91 7978
                  </span>
                </li>
                <li className="mb-[45px]">
                  <span className="block font-[Oswald]">Noida (Delhi NCR)</span>
                  <span className=" block my-[16px] text-[14px] text-[#404040]">
                    3rd Floor, Plot No. D5-6, Sector 3, Noida, Uttar Pradesh
                    201301
                  </span>
                  <span className="items-center flex font-[Oswald]  ">
                    <IoIosCall className="mt-[3px] text-[22px] mr-[10px] font-[500]" />
                    (+91) 9953 91 7978
                  </span>
                </li>
                <li className="mb-[45px]">
                  <span className="block font-[Oswald]">Noida (Delhi NCR)</span>
                  <span className=" block my-[16px] text-[14px] text-[#404040]">
                    3rd Floor, Plot No. D5-6, Sector 3, Noida, Uttar Pradesh
                    201301
                  </span>
                  <span className="items-center flex font-[Oswald]  ">
                    <IoIosCall className="mt-[3px] text-[22px] mr-[10px] font-[500]" />
                    (+91) 9953 91 7978
                  </span>
                </li>
                <li>
                  <span className="block font-[Oswald]">Noida (Delhi NCR)</span>
                  <span className=" block my-[16px] text-[14px] text-[#404040]">
                    3rd Floor, Plot No. D5-6, Sector 3, Noida, Uttar Pradesh
                    201301
                  </span>
                  <span className="items-center flex font-[Oswald]  ">
                    <IoIosCall className="mt-[3px] text-[22px] mr-[10px] font-[500]" />
                    (+91) 9953 91 7978
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>*/}
        <div className="border-t-2 border-[#ccc] basis-[100%] pt-[20px] font-[Oswald] text-[17px] mt-[20px]  flex justify-between items-center uppercase">
          <h3 className="md:text-[15px] text-[12px]">
            privacy policy | disclaimer
          </h3>
          <h3 className="md:text-[15px] text-[12px]">
            © 2025 GTF Technologies
          </h3>
        </div>
      </footer>
    </>
  );
};

export default Footer;
