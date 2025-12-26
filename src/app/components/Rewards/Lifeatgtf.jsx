import React from "react";
import GallerySlider from "./GallerySliderAnimation";

export default function Lifeatgtf() {
  return (
    <section className="py-[80px] mb-[80px] border-b-[1px] border-dashed border-[#000]">
      <div className="grid grid-cols-12 border-b-[1px] border-dashed border-[#000] pb-[80px] px-[80px]">
        <div className="col-span-6 ">
          <h2 className="font-[oswald] font-[600] uppercase text-[50px]">
            Life At <span className="lg:block hidden"></span> GTF Technologies
          </h2>
        </div>
        <div className="col-span-6 mix-blend-multiply">
          <div className="flex place-items-center">
            <video
              src="/assets/rewards/badge_icon.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-[100px]"
            ></video>
            <h3 className="font-[oswald] uppercase font-[600] text-[20px]">
              Work with fun is our work ethics that keeps attrition{" "}
              <span className="lg:block hidden"></span> rate negligible.
            </h3>
          </div>
        </div>
      </div>
      <GallerySlider />
    </section>
  );
}
