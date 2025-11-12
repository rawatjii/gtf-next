import React from 'react';
import CaseStudyBanner from '../components/CaseStudy/CaseStudyBanner';
import CaseStudyMidSec from '../components/CaseStudy/CaseStudyMidSec';
import DragBuildingComponent from '../components/CaseStudy/DragandDrop';
const ContactUs = () => {   
    
    return (
        <div className='px-[35px]'>
            <CaseStudyBanner/>
            <CaseStudyMidSec/>
            <DragBuildingComponent/>
        </div>
    );
}

export default ContactUs;
