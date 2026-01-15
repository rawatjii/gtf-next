"use client";
import ClipPathAnimation from "@/app/utils/ClipPathAnimation";
import CommonHeading1 from "@/app/utils/CommonHeading1";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const headingData = {
  light: {
    text: "Crafting Ideas into",
    class: "",
  },
  bold: {
    text: "Impactful Realities",
    class: "",
  },
};

const Portfolio = ({ className, data }) => {
  const [categories, setCategories] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    const getFilteredCategories = (data) => {
      let tempCategories = [];
      return data?.map((singleData) => {
        if(!tempCategories.includes(singleData.category)){
          tempCategories.push(singleData.category);
          return tempCategories;
        }
      });
    };

    if (data?.length > 0) {
      setCategories(...getFilteredCategories(data));
      setFilteredData(data);
    }
  }, [data]);

  const tabHandler = (tab)=>{
    setActiveCategory(tab);
    if(tab == 'all'){
      setFilteredData(data);
    }else{
      const returnData = data.filter((item)=>item.category == tab);
      setFilteredData(returnData);
    }
  }

  return (
    <section className={className}>
      <div className="container mx-auto">
        <ClipPathAnimation reverse="false">
          <CommonHeading1 data={headingData} />
        </ClipPathAnimation>

        <ClipPathAnimation reverse="false">
          <p className="text-center text-[15px] leading-[25px] text-[#5B5B5B] font-[350] opacity-1 mt-[30px] max-w-[800px] mx-auto">
            Step into a world where bold ideas transform into impactful designs.
            Our portfolio is a reflection of creativity, innovation, and the art
            of turning concepts into unforgettable experiences. Each project tells
            a story of passion, precision, and a relentless pursuit of excellence.
          </p>
        </ClipPathAnimation>

        <div className="portfolio_data mt-[100px] max-w-[1200px] mx-auto">
          <ul className="flex items-center gap-[40px] justify-center">
            <li className="relative before:absolute before:content-['/'] before:right-[-25px] before:text-[#ddd] before:w-[11px]">
              <button className={`uppercase ${activeCategory=='all' ? 'font-bold' : 'font-normal'}`} onClick={()=>tabHandler("all")}>All</button>
            </li>
            {categories.map((category, idx) => (
              <li key={idx} className={`relative ${idx > 0 && 'before:absolute before:content-["/"] before:left-[-25px] before:text-[#ddd] before:w-[11px]'} ${activeCategory==category ? 'font-bold' : 'font-normal'}`}>
                <button className="uppercase" onClick={()=>tabHandler(category)}>{category}</button>
              </li>
            ))}
          </ul>

          <div className="grid grid-cols-2 mt-[80px] gap-[50px]">
            {filteredData?.map((item, index)=>(
              <div>
                <div className="h-[350px] rounded-[10px] overflow-hidden mb-[15px]">
                  <Link href="" className="cursor-hover">
                    <Image
                      src={item.thumbnail}
                      width="866"
                      height="486"
                      className="object-cover h-full"
                      alt=""
                    />
                  </Link>
                </div>
                <h4 className="text-[20px]">
                  <Link href="" className="">
                    {item.title}
                  </Link>
                </h4>
                <p className="mt-[10px] text-[14px] tracking-[0.2px] text-[#3d3d3d]">
                  {item.shortDes}
                </p>
                <ul className="flex gap-[10px] mt-[15px]">
                  {item?.types.map((it)=>(
                    <li className="text-[12px] px-[14px] py-[6px] border rounded-[100px] text-[#333]">{it}</li>
                  ))}
                </ul>
              </div>
            ))}

          </div>


        </div>


      </div>
    </section>
  );
};

export default Portfolio;
