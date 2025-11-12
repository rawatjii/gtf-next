import React from 'react';
import { Grid } from '@/app/utils/Grid';

const CaseStudyMidSec = () => {
    return (
          <section className="relative w-[100%] border-y-[1px] border-[#000] border-dashed overflow-hidden">
               <div className="text-center  py-[100px] pt-[120px]">
                 <Grid />
                   <div className="relative">
                     <h2 className="uppercase font-[500]  font-[oswald] relative z-[1] text-[70px] tracking-[1.2]">
                      select a problem
                    </h2>
                   </div>
                   <p className="mt-[30px] text-[18px] text-[#5B5B5B]">
                     As a company, we draw in and build up our business's best ability, share information, and give the 
                     <span className='lg:block'></span>
                      best fundamental tools and resources to stay aware of today's fast-changing technology. 
                   </p>
               </div>
             </section> 
    );
}

export default CaseStudyMidSec;
