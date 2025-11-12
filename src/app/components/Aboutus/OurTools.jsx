"use client";
import StaggeredLogoSwitcher from "../Home/Client_sec";
import CommonHeading from "@/app/utils/CommonHeading";

const OurTools = () => {
  const logoSets = [
  { id: 1, src: "/assets/aboutus/tools_1.svg" },
  { id: 2, src: "/assets/aboutus/tools_2.svg" },
  { id: 3, src: "/assets/aboutus/tools_3.svg" },
  { id: 4, src: "/assets/aboutus/tools_4.svg" },
  { id: 5, src: "/assets/aboutus/tools_5.svg" },
  { id: 6, src: "/assets/aboutus/tools_6.svg" },
  { id: 7, src: "/assets/aboutus/tools_7.svg" },
  { id: 8, src: "/assets/aboutus/tools_8.svg" },
  { id: 9, src: "/assets/aboutus/tools_9.svg" },
  { id: 10, src: "/assets/aboutus/tools_10.svg" },
];

  
  return (
    <section>
      <div className="tools_sec py-[80px] mb-[80px]">
        <div className="md:flex justify-start items-end md:mb-[0]  mb-[30px] md:text-start">
          <CommonHeading outlineHeading={"why?"} filledHeading={"Our Tools"} lineColor={"bg-gtf-yellow"} pl={"7.1"}/>
          <p className="uppercase italic pt-[16px] md:ml-[3rem] text-center pb-[60px] lg:text-left font-[500]">
            <span className="block">We are in partnership with top brands and</span>
            <span className="block">certified for performance and quality</span>
          </p>
        </div>
        <div className="overflow-hidden relative w-full main_border_cmp border-black">
          <ul
            className="grid grid-cols-2 border-none sm:grid-cols-3 md:grid-cols-5 w-full border-[2px]"
          >
            <StaggeredLogoSwitcher  logoSets={logoSets}/>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default OurTools;
