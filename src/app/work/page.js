import React from 'react';
import WorkBanner from '../components/work/WorkBanner';
import WorkMidSec from '../components/work/WorkMidSec';
import WorkCat from '../components/work/WorkCat';
const   Work = () => {
    return (
        <div className="px-[35px]">
           <WorkBanner/>
           <WorkMidSec/>
           <WorkCat/>
        </div>
    );
}

export default  Work;
