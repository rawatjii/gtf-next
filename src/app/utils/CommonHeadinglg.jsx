import React from 'react';
import Line from '../components/Line';

export default function CommonHeadingLg({heading,lineColor,pl}) {
  return (
            <h1 className="uppercase pb-[60px] inline-block uppercase font-[oswald] md:text-start text-center tracking-[2px] 2xl:text-[160px]   xl:text-[140px]  relative md:leading-[70px] md:px-0 px-[15px]">
                {heading}
                <Line bgColor={lineColor} left="left-[48%]  xl:left-[60%]" height="h-[30px]"  bottom={'bottom-[10px]'} />
            </h1>
  )
}
