import React from 'react';
import InnerHero from '../utils/InnerHero';
import HowWeWorkOverview from '../components/HowWeWork/Overview';
import WeDo from '../components/HowWeWork/WeDo';

const pageData = {
    heading:"Blending Creativity with the Essentials",
    overview:"We use the art of storytelling to deliver content and messaging in an experiential way, all underpinned with unique strategic insights.",
    videoUrl:"/assets/digital/digital-media.mp4",
}

const ConceptContentCreative = () => {
    return (
        <div className='pt-[110px]'>
            <InnerHero data={pageData} videoType="full" videoPosition="static" contentClass="py-[100px]" />

            {/* overview section */}
            <section>
                <HowWeWorkOverview />
                <WeDo />
            </section>
        </div>
    );
}

export default ConceptContentCreative;
