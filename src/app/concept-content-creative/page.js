import React from "react";
import InnerHero from "../utils/InnerHero";
import HowWeWorkOverview from "../components/HowWeWork/Overview";
import WeDo from "../components/HowWeWork/WeDo";

const pageData = {
  heading: "Blending Creativity with the Essentials",
  overview:
    "We use the art of storytelling to deliver content and messaging in an experiential way, all underpinned with unique strategic insights.",
  videoUrl: "/assets/digital/digital-media.mp4",
};

const headingData = {
  light: {
    text: "Unlocking Business Growth with",
    class: "",
  },
  bold: {
    text: "Effective SEO Keyword Research",
    class: "",
  },
};

const overviewData =
  "Compelling content and creative strategies engage your audience, drive brand storytelling, and foster lasting connections. Well-aligned content enhances user experience, boosts conversions, and builds brand loyalty.";

const worksData = {
  heading: "How It Works?",
  data: [
    {
      title: "Keyword Research",
      desc: "As an entrepreneur building a presence online for your business, your focus must be on ranking as high up on search engine page results as possible to survive the online marketplace. Whenever someone needs information about your product or service or needs more details before making a purchase, 81% of the time, they will rely on their search engine results pages. Furthermore, most will only go up to the first page and usually click the first top three links.",
    },
    {
      title: "Understand Your Audience",
      desc: [
        "Keyword research in SEO allows you to identify and determine precisely what your customers are searching for.",
        "For example, if you own a shoe store and sell five different designer shoes and realize that most of your clients only search for one specific shoe design, you can optimize your site using keywords related to that shoe. It will make it easy for your clients to find you, and they can look at your other shoe designs.",
        "That means that your audience has allowed you to know what they want, and by using those keywords, you show that you know what they need, and that is what you are giving them.",
        "Obviously, with all that pressure, it's simple to understand the significance of keyword research, mainly because you are new to the online space and have restricted assets.",
        "Keyword research techniques demonstrate considering and picking words and articulations that your clients will no doubt scan for on any web crawler that identifies with your brand, services, or products.",
      ],
    },
    {
      title: "Landing Pages",
      desc: [
        "Any savvy inbound advertiser knows that once you've done difficult work to get guests to your site, the next giant step is to change them into leads for your business. Landing pages, that's what! What is the ideal approach to get them to convert?",
        "Unfortunately, there is a significant disconnect between the importance of landing pages and their use. According to research, 44% of company clicks are directed to the business's homepage, not a particular landing page.",
        "A landing page is a website page that enables you to catch a guest's data through a lead-catch frame (AKA, a transformation shape). Landing pages are the complete self of an inbound marketer's lead generation efforts, so why are they still underutilized? A specialist is why organizations don't utilize landing pages because their promoting department needs to learn how to set them up or are excessively overburdened.",
        "Making landing pages enables you to focus on your audience, offer them something of significant worth, and change over a higher level of your guests into leads while also catching data about them and what they've changed. A decent landing page will focus on a specific audience, for example, activity from an email campaign promoting a specific digital book or guests who tap on a pay-per-click ad promoting your webinar. You can make landing pages that enable guests to download your substance offers (ebooks, whitepapers, online classes, etc.) or recover other proposals, such as free trials, demos, or coupons for your item.",
      ],
    },
  ],
};

const ConceptContentCreative = () => {
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
        <WeDo data={worksData} />
      </section>
    </div>
  );
};

export default ConceptContentCreative;
