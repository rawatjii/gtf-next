import React from 'react';
import Line from '../components/Line';

export default function CommonHeading({outlineHeading,filledHeading,lineColor,pl}) {
  return (
            <h3 className="uppercase pb-[60px] inline-block md:text-start text-center  relative md:leading-[70px] md:px-0 px-[15px]">
                <span className="bartino-outline tracking-[2px] 2xl:text-[72px] md:text-start  lg:text-[60px] md:text-[50px] text-[32px] block">
               {outlineHeading}
                </span>
             <span   className={`font-[Oswald] relative block font-medium md:text-start 2xl:text-[72px] lg:text-[60px] md:text-[50px] text-[32px] ${
                  pl ? `md:pl-[7rem]` : 'md:pl-[14rem]'
                }`}
              >
                {filledHeading}
                <Line bgColor={lineColor}
                    left="left-[48%] xl:left-[61%]"
                />
                </span>
            </h3>
  )
}
