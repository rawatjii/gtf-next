import React from 'react';
import DigitalBanner from '@/app/components/digital/DigitalBanner';
import DigitalCards from '@/app/components/digital/DigitalCards';
import Portfolio from '@/app/components/work/Portfolio/Index';
import CaseStudies from '@/app/components/work/caseStudies/Index';

const bannerData={
    heading:"Showcasing Innovation and Expertise",
    para:"Explore our portfolio, where creativity and expertise come together. Each project reflects our commitment to innovation, precision, and exceeding expectations.",
}

const pageData = [
    {
        thumbnail:"/assets/work/case-studies/grandthum.webp",
        title:"Grandthum",
        shortDesc:"Project Grandthum in Greater Noida West, launched in September 2019, is a landmark office and retail one-of-a-kind IT/ITES project sprawling over approximately 23 acres of land.",
    },
    {
        thumbnail:"/assets/work/case-studies/tarc-kailasa.webp",
        title:"Tarc Kailasa",
        shortDesc:"Amidst the traditional echoes of enduring wisdom, Kailāsa became a sanctuary where even the mighty Lord Shiva found solace within Kailāsa.",
    },
    {
        thumbnail:"/assets/work/case-studies/eldeco-live-by-green.jpg",
        title:"Eldeco Live By Greens",
        shortDesc:"ELDECO Live By The Greens is a prestigious residential project that offers a serene and luxurious living experience.",
    },
    {
        thumbnail:"/assets/work/case-studies/grandthum.webp",
        title:"Eldeco Acclaim",
        shortDesc:"Eldeco Acclaim stands as the impressive second phase of the Eldeco Accolade. Encompassing 13 acres of land and catering to over 300 families, this residential complex offers 2 BHK apartments designed to enhance the quality of life.",
    },
    {
        thumbnail:"/assets/work/case-studies/grandthum.webp",
        title:"Eldeco Sidcul Industrial Plot",
        shortDesc:"Eldeco Sidcul Industrial Plot is a premium industrial project in the esteemed Sidcul area. It offers meticulously planned industrial plots equipped with world-class infrastructure and modern amenities.",
    },
    {
        thumbnail:"/assets/work/case-studies/grandthum.webp",
        title:"Eldeco Bareilly",
        shortDesc:"Eldeco Bareilly is a prestigious residential project in the vibrant city of Bareilly. Designed to offer a luxurious and comfortable lifestyle, the project features beautifully crafted apartments with contemporary architecture and top-notch amenities.",
    },
    {
        thumbnail:"/assets/work/case-studies/grandthum.webp",
        title:"ATS Khyber Range",
        shortDesc:"The ATS Khyber Range project is a comprehensive initiative to establish a state-of-the-art training facility for the Anti-Terrorism Squad (ATS) in the Khyber region. It focuses on enhancing the capabilities and preparedness of the ATS personnel to effectively counter terrorism and maintain law and order in the region.",
    },
    {
        thumbnail:"/assets/work/case-studies/grandthum.webp",
        title:"Godrej Properties NRI",
        shortDesc:"Catering to the NRI audience is in itself a great challenge. In the real estate category especially in India, there are many big sharks, and Godrej properties are among them.",
    },
];


const DigitalMarketing = () => {
    return (
        <div className='pt-[110px]'>
            <DigitalBanner data={bannerData} />
            <CaseStudies className="my-[200px]" data={pageData} />
        </div>
    );
}

export default DigitalMarketing;
