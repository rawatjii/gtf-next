import React from 'react';
import TestimonialBanner from '../components/Testimonial/TestimonialBanner';
import TestimonialCards from '../components/Testimonial/TestimonialMainCard';
const Page = () => {
    return (
        <div className="pt-[110px]">
            <TestimonialBanner/>
            <TestimonialCards/>
        </div>
    );
}

export default Page;
