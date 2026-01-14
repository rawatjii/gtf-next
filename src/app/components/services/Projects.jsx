"use client";
import React, { useEffect, useRef } from "react";
import ClipPathAnimation from "@/app/utils/ClipPathAnimation";
import CommonHeading1 from "@/app/utils/CommonHeading1";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import { MdArrowOutward } from "react-icons/md";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    projectName:"CricksLab – Smarter Cricket UX",
    projectUrl:"/",
    techs:[
      "Product Design",
      "Dashboard Design",
      "Mobile App",
      "Interface Design & UX",
      "Data Insight",
      "Saas",
      "React",
    ],
    video:"/assets/services/website-design/crickslab/Crikslab-Cover.mp4",
    image:"/assets/services/website-design/crickslab/CricksLab-2.png",
    desc:"We redesigned CricksLab from scratch, enhancing 10x usability and effortless match tracking for cricket fans. Post-launch, the successful revamped app crossed 10K+ downloads and improved retention significantly.",
  },
  {
    projectName:"Omneky – AI Meets UX",
    projectUrl:"/",
    techs:[
      "Product Design",
      "Dashboard Design",
      "Mobile App",
      "Interface Design & UX",
      "Data Insight",
      "Saas",
      "React",
    ],
    video:"/assets/services/website-design/omneky/Omneky-Cover.mp4",
    image:"/assets/services/website-design/omneky/Crickslab-Dashboard.jpg",
    desc:"By analyzing Omneky’s enterprise users, we redesigned their ad platform into a streamlined 2.0 Version. A clear and performance-driven UX resulted in a 2.9% conversion boost.",
  },
  {
    projectName:"PackageX – Streamlined Logistics",
    projectUrl:"/",
    techs:[
      "Product Design",
      "Dashboard Design",
      "Mobile App",
      "Interface Design & UX",
      "Data Insight",
      "Saas",
      "React",
    ],
    video:"/assets/services/website-design/packagex/PackageX-Cover.mp4",
    image:"/assets/services/website-design/packagex/Crickslab-Dashboard-1.jpg",
    desc:"We built a unified design system for PackageX, aligning all product experiences under one scalable UX framework—boosting consistency, usability, and rollout speed across their logistics platform.",
  },
];

const ServiceProjects = ({ data, className }) => {
  const sectionRef = useRef(null);

  useEffect(()=>{
    const body = document.body;

    const ctx = gsap.context(()=>{
      ScrollTrigger.create({
        trigger:sectionRef.current,
        start:"top 80%",
        onEnter:()=>{
          gsap.to(body, {
            backgroundColor: "white",
            color: "black",
          })
        },
        onLeaveBack:()=>{
          gsap.to(body, {
            backgroundColor: "black",
            color: "white",
          })
        }
      })
    }, sectionRef);

    return()=>ctx.revert();

  }, [])

  return (
    <section ref={sectionRef} className={className}>
      <div className="container mx-auto">
        <ClipPathAnimation reverse="false">
          <CommonHeading1 data={data.heading} />
        </ClipPathAnimation>

        <ClipPathAnimation reverse="false" className="mt-[30px]">
          <p className="max-w-[1000px] mx-auto text-center text-[14px] tracking-[0.5px] text-[#8d8d8d]">
            {data.subPara}
          </p>
        </ClipPathAnimation>

        <div className="contentArea mt-[100px]">

          {projects?.map((project, idx)=>(
            <div key={idx} className="mb-[100px]">
              {/* title row */}
              <div className="title flex items-center justify-between">
                <h4 className="text-[28px] font-medium">{project.projectName}</h4>
                <Link href="/" className="border border-black h-[45px] w-[45px] flex items-center justify-center rounded-full">
                  <MdArrowOutward
                    size={18}
                    className={``}
                  />
                </Link>
              </div>

              {/* tech row */}
              <ul className="flex mt-[20px] gap-[10px]">
                {project.techs?.map((tech, techIdx)=>(
                  <li key={techIdx} className="border rounded-[100px] px-[16px] py-[7px] text-[14px]">{tech}</li>
                ))}
              </ul>

              <div className="grid grid-cols-12 mt-[30px] gap-[20px]">
                <div className="col-span-8">
                  <Link href="/" className="block rounded rounded-[10px] overflow-hidden h-full">
                    <video autoPlay muted loop className="h-full object-cover">
                      <source src={project?.video} />
                    </video>
                  </Link>
                </div>

                {/* right col */}
                <div className="col-span-4 flex flex-col gap-[20px]">

                  <div className="">
                    <Image src={project.image} layout="responsive" width={600} height={400} alt=""/>
                  </div>

                  <div className={`h-full flex items-center justify-center p-[50px] rounded rounded-[10px] ${idx == 0 ? 'bg-[#ffc5e4]' : idx==1 ? 'bg-[#fff179]' : 'bg-[#76d6fd]'}`}>
                    <p>{project.desc}</p>
                  </div>

                </div>
              </div>

            </div>   
          ))}

                 

        </div>

      </div>
    </section>
  );
};

export default ServiceProjects;
