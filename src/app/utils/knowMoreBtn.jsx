import React from 'react';
import { MdArrowOutward } from 'react-icons/md';
export default function KnowMoreBtn({btn_class}) {
  return (
        <div className="flex mt-[20px] items-center justify-end">
            <p className=" mr-[10px] uppercase font-[Oswald] ">Know More</p>
            <MdArrowOutward className={`bg-[#ddd] ${btn_class}`} />
        </div>
  )
}
