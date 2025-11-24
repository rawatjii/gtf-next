"use client"

import Image from "next/image";

const LogoItem = ({ logo }) => (
  <div className="flex items-center justify-center h-[150px] bg-white hover:grayscale transition-all duration-300 rounded-lg shadow-sm">
    <Image
      src={logo.src}
      alt={logo.alt}
      width={180}
      height={100}
      className="max-w-full max-h-full object-contain p-4"
    />
  </div>
);

export default LogoItem;