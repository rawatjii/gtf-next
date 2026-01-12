import HowWeWorkOverview from "@/app/components/HowWeWork/Overview";
import WeDo from "@/app/components/HowWeWork/WeDo";
import Services from "@/app/components/services/services";
import WhyChooseUs from "@/app/components/services/WhyChooseUs";
import HorizontalScroll from "@/app/utils/HorizontalScroll";
import InnerHero from "@/app/utils/InnerHero";
import React from "react";

const pageData = {
  heading: "Websites Built to Perform, Scale, and Convert",
  overview:
    "We design and develop websites that combine visual clarity with technical precision. Every site is built to reflect your brand, engage users, and support long-term business goals across devices and platforms.",
  videoUrl: "/assets/digital/digital-media.mp4",
};

const headingData = {
  light: {
    text: "Unlocking Business Growth with",
    class: "",
  },
  bold: {
    text: "Website Design & Development",
    class: "",
  },
};

const overviewData =
  "Compelling content and creative strategies engage your audience, drive brand storytelling, and foster lasting connections. Well-aligned content enhances user experience, boosts conversions, and builds brand loyalty.";

const servicesData = {
  heading: {
    light: {
      text: "Comprehensive",
      class: "",
    },
    bold: {
      text: "Design & Development Services",
      class: "",
    },
  },
  subPara:
    "Our design and development services cover every stage of the digital journey—from initial concept and user experience planning to visual design, development, testing, and deployment. We focus on creating websites that are visually refined, technically sound, and built for real-world performance. Every solution is tailored to your brand, ensuring seamless functionality, responsiveness across devices, and a scalable foundation that supports growth, speed, and long-term reliability.",
  data: [
    {
      icon: "/assets/services/website-design/custom-website-design.png",
      title: "Custom Website Design",
      desc: "We don’t sketch a design that we love. Instead, we draw a design that meets your needs. Our design blueprint is formulated based on your requirements and ideas. We share it with you for your approval. Once we get your assent, we turn it into a website that is not only captivating but also practical and business-friendly.",
    },
    {
      icon: "/assets/services/website-design/website-redesign.png",
      title: "Website Redesign",
      desc: [
        "If your existing website is incapable of holding your website visitors, we can redesign your website to boost its conversion rates. Why should you trust our words? We pick the best designers and experts in human behavioral science. They work in tandem to meet your expectations.",
      ],
    },
    {
      icon: "/assets/services/website-design/ecommerce-website-design.png",
      title: "Ecommerce Website Design",
      desc: [
        "Looking for an engaging and convincing eCommerce website? GTF Technologies can deliver you a conversion-friendly website that will give you an edge over your competition. However, if you have a website, but that website is lagging behind your competition, we can reinvent your website in a way that it will compel them to click on your products.",
      ],
    },
    {
      icon: "/assets/services/website-design/blog-design.png",
      title: "Blog Design",
      desc: [
        "Blogs drive traffic and generate leads. It is a proven fact that websites that publish user-friendly blogs have more visitors on their websites than those websites which don’t have any blogs. However, the performance of a blog very much hinges upon its designing because people read the texts when visuals and font steal their attention. At GTF Technologies, we understand how to design a blog for optimal results.",
      ],
    },
  ],
};


const whyChooseUsData = {
  heading: "Why Choose Us",
  subPara:
    "We combine strategic thinking, refined design, and robust development to build websites that deliver real business value. Our focus is on clarity, performance, and long-term scalability.",
  data: {
    0:[
      {
        title:"Underperforming Digital Product?",
        para:"Is your digital product not generating the expected results? Want your users to say WOW! Every time they view it?",
      },
      {
        title:"Design. Refine. Deliver.",
        para:"Our best UI/UX designers create stunning digital products integrated with design branding and design systems, ensuring human-centric design principles to meet users’ expectations.",
      },
    ],
    1:[
      {
        title:"Guessing What Users Want?",
        para:"Are you facing difficulty in understanding your user’s expectations? Do you want to resonate with your users through a stunning user interface design?",
      },
      {
        title:"Know. Create. Connect.",
        para:"Our user interface design and user experience design include UX research, usability testing, and heuristic analysis with a creative strategy and design audit to help you understand your users’ preferences, behaviours, and motivations.",
      },
    ],
    2:[
      {
        title:"Struggling To Communicate Your Design Vision?",
        para:"Have you got a great design idea, but a trouble conveying it to stakeholders? Do you want to create a tangible, interactive representation of your design concept?",
      },
      {
        title:"Envision. Prototype. Refine.",
        para:"Our digital prototyping services help you create interactive, clickable prototypes that communicate your design vision, and facilitate feedback and iteration.",
      },
    ],
    3:[
      {
        title:"Missing Opportunities To Engage Your Users?",
        para:"Are you unsure how to create an immersive experience for your users? Do you want to captivate user’s attention with a superb user experience design?",
      },
      {
        title:"Capture. Engage. Convert.",
        para:"Our interactive design services help you create engaging and realistic experiences that capture your users’ attention and accelerate conversions.",
      },
    ],
  },
};

const DigitalResearch = () => {
  return (
    <div className="pt-[110px]">
      <InnerHero
        data={pageData}
        videoType="full"
        videoPosition="static"
        contentClass="py-[100px]"
      />

      {/* overview section */}
      <section>
        <HowWeWorkOverview
          headingData={headingData}
          overviewData={overviewData}
        />

        <Services data={servicesData} className="pb-[100px]" />
        
        {/* <WeDo data={worksData} /> */}
        <WhyChooseUs data={whyChooseUsData} className="pt-[100px] border-t" />
      </section>
    </div>
  );
};

export default DigitalResearch;
 