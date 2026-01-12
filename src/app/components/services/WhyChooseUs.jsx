import React from "react";
import ClipPathAnimation from "@/app/utils/ClipPathAnimation";
import CommonHeading1 from "@/app/utils/CommonHeading1";


const WhyChooseUs = ({ data, className }) => {

  return (
    <section className={className}>
      <div className="container mx-auto">
        <ClipPathAnimation reverse="false">
          <CommonHeading1 data={data.heading} />
        </ClipPathAnimation>

        <ClipPathAnimation reverse="false" className="mt-[30px]">
          <p className="max-w-[1000px] mx-auto text-center text-[14px] tracking-[0.5px] text-[#5f5f5f]">
            {data.subPara}
          </p>
        </ClipPathAnimation>

        <div className="contentArea max-w-[1000px] mx-auto mt-[100px]">
          {Object.values(data?.data || {}).map((item, idx)=>(
            <div key={idx} className="grid grid-cols-2 gap-[40px] mb-[150px]">

              <div className="col-span-1 p-[50px] bg-gray-100 rounded-[10px]">
                <h4 className="text-[24px] font-medium tracking-[0.5px] leading-[30px]">{item[0].title}</h4>
                <p className="mt-[20px] text-[15px]">{item[0].para}</p>
              </div>

              <div className="col-span-1 p-[50px] bg-gray-300 rounded-[10px] translate-y-[50px]">
                <h4 className="text-[24px] font-medium tracking-[0.5px] leading-[30px]">{item[1].title}</h4>
                <p className="mt-[20px] text-[15px]">{item[1].para}</p>
              </div>

            </div>
          ))}
          

        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
