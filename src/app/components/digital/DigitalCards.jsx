"use client";
import React, { useEffect, useRef } from "react";
import { MdArrowOutward } from "react-icons/md";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import CommonHeading1 from "@/app/utils/CommonHeading1";
import ClipPathAnimation from "@/app/utils/ClipPathAnimation";

gsap.registerPlugin(ScrollTrigger);

const headingData = {
  light: {
    text: "Discover innovative strategies and",
    class: "",
  },
  bold: {
    text: "creative solutions",
    class: "",
  },
};

const pageData = [
  {
    title: "Research",
    thumbnail: "/assets/digital/research/thumbnail.jpg",
    desc: "Keyword research in SEO enables you to discover and ascertain what your customers are after. The planned keyword research techniques.",
    points: [
      "Understand customer search intent.",
      "Optimize website with target keywords.",
      "Enhance content relevance and visibility.",
      "Improve organic traffic and rankings.",
    ],
    others: {
      title: "Want to Build Stronger Connections?",
      desc: "Keyword research is the foundation for effective SEO strategies.",
      link: "/digital/research",
    },
  },
  {
    title: "Online Positioning & Strategy",
    thumbnail: "/assets/digital/strategy/thumbnail.jpg",
    desc: "A brand must be positioned well online to be highlighted among competitors. For this, one must know the customer's genuine requirements.",
    points: [
      "Define your brand’s unique value proposition.",
      "Analyze competitors and identify market gaps.",
      "Create targeted strategies to attract your audience.",
      "Consistently evaluate and refine your approach for growth.",
    ],
    others: {
      title: "Want to Establish a Strong Digital Presence?",
      desc: "Online positioning ensures your brand stands out.",
      link: "/digital/online-positioning-strategy",
    },
  },
  {
    title: "Brand Loyalty",
    thumbnail: "/assets/digital/brand-loyalty/thumbnail.jpg",
    desc: "Each brand has an identity, regardless of whether positive or negative. A brand is developed to inspire your specific market segment.",
    points: [
      "Create emotional connections with your audience.",
      "Offer consistent, exceptional value and service.",
      "Implement rewards and incentives to retain customers.",
      "Engage with customers to foster long-term relationships.",
    ],
    others: {
      title: "Want to Build Lasting Relationships with Your Customers?",
      desc: "Brand loyalty turns customers into advocates.",
      link: "",
    },
  },
  {
    title: "Media Planning",
    thumbnail: "/assets/digital/media-planning/thumbnail.jpg",
    desc: "It's always important to select the right media platform for your brand or product. A combination of best media helps.",
    points: [
      "Identify the most effective media channels for your target audience.",
      "Optimize ad placements based on data-driven insights.",
      "Plan campaigns that integrate digital, social, and traditional media.",
      "Track performance and adjust strategies for maximum impact.",
    ],
    others: {
      title: "Want to Optimize Your Marketing Reach?",
      desc: "Media planning ensures your message reaches the right audience.",
      link: "",
    },
  },
  {
    title: "Site Architecture",
    thumbnail: "/assets/digital/site-architecture/thumbnail.jpg",
    desc: "Site architecture is the blueprint upon which your new site is built. It is a technological art, and at GTF Technologies, we are experts in determining the most effective foundation to increase user engagement.",
    points: [
      "Ensure a clear, intuitive website structure for easy navigation.",
      "Design a scalable site that grows with your business.",
      "Prioritize mobile responsiveness and device compatibility.",
      "Streamline content management for easy updates and edits.",
    ],
    others: {
      title: "Want to Build a Seamless User Experience?",
      desc: "Site architecture lays the foundation for easy navigation.",
      link: "",
    },
  },
  {
    title: "Analytics Analysis & Roi",
    thumbnail: "/assets/digital/analytics/thumbnail.jpg",
    desc: "Keyword research in SEO enables you to discover and ascertain what your customers are after. The planned keyword research techniques.",
    points: [
      "Use data-driven insights to optimize marketing strategies.",
      "Track key performance indicators (KPIs) to measure success.",
      "Allocate budget efficiently based on campaign performance.",
      "Analyze ROI to ensure maximum returns on marketing investments.",
    ],
    others: {
      title: "Want to Track Your Marketing Success?",
      desc: "Analytics analysis reveals key insights for growth.",
      link: "",
    },
  },
];

const DigitalCards = () => {
  const titleRef = useRef(null);
  const cardsRef = useRef([]);
  const textContentRefs = useRef([]);
  const buttonRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(()=>{
      pageData.forEach((item, index)=>{
        const cardElement = cardsRef.current[index];

        gsap.fromTo(
          cardElement,
          {
            opacity:0,
            y:50,
          },{
            opacity:1,
            y:0,
            duration:1,
            ease:"power3.out",
            scrollTrigger:{
              trigger:cardElement,
              start: "top 80%", // Trigger the animation when the card reaches 80% from the top of the viewport
              toggleActions: "play none none reverse",
            }
          }
        )
      })
    });

    return ()=>ctx.revert();
  }, []);

  return (
    <section className="mt-[150px]">
      <div className="container mx-auto">
        <ClipPathAnimation>
          <CommonHeading1 data={headingData} />
        </ClipPathAnimation>

        <ClipPathAnimation>
          <p className="text-center text-[15px] leading-[25px] text-[#5B5B5B] font-[350] opacity-1 mt-[30px] max-w-[800px] mx-auto">
            We use our insight, experience, and rich industry knowledge to
            formulate and drive a distinct and differentiating positioning for
            your brand. We use our insight, experience, and rich industry
            knowledge to formulate and drive a distinct and differentiating
            positioning for your brand.
          </p>
        </ClipPathAnimation>

        <div className="mt-[80px]">
          <div className="border-[#000] pb-[80px] border-b-[1px] border-dashed">
            {pageData?.map((item, index) => (
              <div
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                className="max-w-[1200px] mx-auto mb-[100px]"
              >
                <div className="grid grid-cols-2 gap-[30px]">
                  <div
                    className={`rounded-[10px] overflow-hidden ${
                      index % 2 !== 0 ? "order-1" : undefined
                    }`}
                  >
                    <Image
                      src={item.thumbnail}
                      layout="responsive"
                      objectFit="cover"
                      width={1500} // Example width based on the image's aspect ratio
                      height={1500} // Example height based on the image's aspect ratio
                    />
                  </div>

                  <div className="rounded-[10px] bg-gray-100 px-[60px] py-[50px]">
                    <div
                      className="content mb-[auto]"
                      ref={(el) => (textContentRefs.current[index] = el)}
                    >
                      <h3 className="text-[24px] uppercase font-[500]">
                        {item.title}
                      </h3>
                      <p className="text-[#3D3D3D] my-[15px] text-[14px]">
                        {item.desc}
                      </p>

                      <ul className="list-disc list-inside pl-[10px] text-[15px] mt-[25px]">
                        {item.points.map((pt, idx) => (
                          <li className="mb-[5px]">{pt}</li>
                        ))}
                      </ul>

                      <div
                        className="text-start rounded-[10px] px-[25px] py-[25px] mt-[40px] text-white"
                        style={{
                          background:
                            "linear-gradient(108.07deg, #2aaee4 -21.16%, rgb(0, 49, 137) 99.18%)",
                        }}
                        ref={(el) => (buttonRefs.current[index] = el)}
                      >
                        <h3 className="text-[20px] font-regular">
                          {item.others.title}
                        </h3>
                        <p className=" text-[15px] mt-[10px] text-[#efefef]">
                          {item.others.desc}
                        </p>
                        <Link
                          href={item.others.link}
                          className="bg-white inline-flex items-center text-[#000] px-[20px] py-[10px] text-[13px] tracking-[0.5px] rounded-md mt-[25px]"
                        >
                          Know More
                          <MdArrowOutward className="ms-[12px] text-[18px]" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DigitalCards;
