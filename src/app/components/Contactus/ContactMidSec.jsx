import React from 'react';
import { Grid } from '@/app/utils/Grid';

const ContactMidSec = () => {
    return (
          <section className="relative w-[100%] border-y-[1px] border-[#000] border-dashed overflow-hidden">
               <div className="text-center  py-[100px] pt-[120px]">
                 <Grid />
                   <div className="relative">
                     <h2 className="uppercase font-[500]  font-[oswald] relative z-[1] text-[70px] tracking-[1.2]">
                       We’re ready to listen
                      </h2>
                        <div className='circle h-[140px] w-[140px] bg-[#FDE93D] rounded-[50%]  translate-x-[-1/2] top-[-14px] absolute left-[calc(44%-2px)] z-[-1] '></div>
                   </div>
                   <p className="font-[oswald] mt-[30px] text-[18px] leading-[1.8]">
                     Ready to Start with Impossible? Get in touch with the <span className='lg:block'></span> team below.
                   </p>
               </div>
             </section>
    );
}

export default ContactMidSec;
