import React from 'react';
import DigitalBanner from '@/app/components/digital/DigitalBanner';
import DigitalCards from '@/app/components/digital/DigitalCards';
import Portfolio from '@/app/components/work/Portfolio/Index';

const bannerData={
    heading:"Showcasing Innovation and Expertise",
    para:"Explore our portfolio, where creativity and expertise come together. Each project reflects our commitment to innovation, precision, and exceeding expectations.",
}

const projectsData = [
    {
        id:1,
        category:"saas",
        thumbnail:"/assets/work/portfolio/nextdeavor.jpg",
        title:"Nextdeavor - Effective HRMS",
        shortDes:"With a user-focused interface, we developed a seamless HRMS for Nextdeavor. This resulted in faultless user journey for the business.",
        types:["Product Design", "Web App", "Saas", "HRMS", "Dashboard Design"],
    },
    {
        id:2,
        category:"saas",
        thumbnail:"/assets/work/portfolio/zomaq.jpg",
        title:"Zomaq - Property Management",
        shortDes:"We developed a stunningly featured suite of web application especially for the over-advancing and complex real estate market in Dubai.",
        types:["Product Design", "Marketplace", "Saas", "Dashboard"],
    },
    {
        id:3,
        category:"websites",
        thumbnail:"/assets/work/portfolio/duqe.png",
        title:"Duqe - as Vibrant Website as Dubai",
        shortDes:"For Duqe, our expert UI UX designers focused on a responsive and minimal yet appealing website design that resonated with the vibrant culture of Dubai.",
        types:["Website Design", "Responsive", "Modern"],
    },
    {
        id:4,
        category:"websites",
        thumbnail:"/assets/work/portfolio/sync.jpg",
        title:"Sync Marketing: Fancy UI UX",
        shortDes:"Our pro designers went an extra mile to make a sleek, and modern custom website for a creative studio based in Australia.",
        types:["Website Design", "Responsive", "Modern", "Custom Website", "Minimal"],
    },
    {
        id:5,
        category:"UX Discovery",
        thumbnail:"/assets/work/portfolio/crickslab.png",
        title:"CricksLab – Smarter Cricket UX",
        shortDes:"We redesigned CricksLab from scratch, enhancing 10x usability and effortless match tracking for cricket fans. Post-launch, the successful revamped app crossed 10K+ downloads and improved retention significantly.",
        types:["Dashboard Design", "UI & UX", "Modern", "Minimal"],
    },
    {
        id:6,
        category:"UX Discovery",
        thumbnail:"/assets/work/portfolio/omneky.jpg",
        title:"Omneky – AI Meets UX",
        shortDes:"By analyzing Omneky’s enterprise users, we redesigned their ad platform into a streamlined 2.0 Version. A clear and performance-driven UX resulted in a 2.9% conversion boost.",
        types:["Dashboard Design", "UI & UX", "Modern", "Minimal"],
    },
];

const DigitalMarketing = () => {
    return (
        <div className='pt-[110px]'>
            <DigitalBanner data={bannerData} />
            <Portfolio className="my-[100px]" data={projectsData} />
        </div>
    );
}

export default DigitalMarketing;
