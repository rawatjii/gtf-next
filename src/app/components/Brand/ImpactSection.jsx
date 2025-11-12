import React from 'react';
import { Grid } from '@/app/utils/Grid';
export default function ImpactSection() {

  
  return (
    <section>
      <div className="relative px-[35px] py-[80px] border-b-[1px] border-dashed border-[#000]">
        <Grid/>
        <div className="grid grid-cols-12 mix-blend-mutliply relative gap-4">
          <div className="col-span-12 md:col-span-2 relative">
            <h2 className="uppercase text-[30px] font-medium 2xl:text-[65px] xl:text-[40px] lg:text-[55px] md:text-start font-[Oswald] md:leading-[80px] mb-[25px] ">
              Shaping Perception for Lasting Impact
            </h2>
            <div className='bg-[#FDE93D] h-[180px] w-[180px]  rounded-[50%]   absolute bottom-[140px] z-[-1] right-[-82px]'></div>
          </div>
          <div className="hidden md:block md:col-span-2"></div>

          <div className="col-span-12 md:col-span-7 mix-blend-multiply">
            <div className="flex flex-col">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-auto object-cover md:ml-auto max-w-[800px]"
              >
                <source src="/assets/brand/kitevideo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              <div className="flex items-start mt-[30px]">
                <img
                  src="/assets/brand/icon_star_filled.svg"
                  alt="Star Icon"
                  className="h-[50px] w-[50px] mr-[60px]"
                />
                <p>
                  We use our insight, experience, and rich industry knowledge to
                  formulate and drive a distinct and differentiating positioning for
                  your brand. We uncover your brand's core—the heart or soul of who
                  you are and how you want to be perceived!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}