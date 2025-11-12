import React from 'react';
import { MdArrowOutward } from 'react-icons/md';
export default function KnowMoreBtn() {
  return (
        <div className="flex mt-[20px] items-center justify-end">
            <p className=" mr-[10px] uppercase font-[Oswald] ">Know More</p>
            <MdArrowOutward className="bg-[#ddd]" />
        </div>
  )
}
