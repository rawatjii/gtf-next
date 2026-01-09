import React, { forwardRef } from "react";
import { MdArrowOutward } from "react-icons/md";

const CustomButton = forwardRef(({ btn_class, children, className, type }, ref) => {
  return (
    <button
      ref={ref}
      className={`shadow-[0px_4px_10px_rgba(0,0,0,0.15)] flex mt-[40px] items-center justify-center ${className} ${
        type == "fill"
          ? "bg-[#e24397] text-white px-[20px] py-[10px] rounded-[5px]"
          : undefined
      }`}
    >
      {children}
      {/* <p className=" mr-[10px] uppercase font-[Oswald] ">Know More</p> */}
      <MdArrowOutward
        size={18}
        className={`ml-[10px] ${
          type == "fill" ? "text-white" : undefined
        } ${btn_class}`}
      />
    </button>
  );
});

export default CustomButton;
