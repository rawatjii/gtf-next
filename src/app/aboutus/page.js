import AboutUsBannerSection from "../components/Aboutus/AboutUsBannerSection";
import OurTools from "../components/Aboutus/OurTools";
import OurValuesAndMission from "../components/Aboutus/OurValues";
import OurMission from "../components/Aboutus/OurMission";
const AboutUs = () => {
  return (
    <>
    <div className="">
      <AboutUsBannerSection />
      <OurValuesAndMission/>
      <OurMission/>
      <OurTools/>
    </div>
  </>
  );
};

export default AboutUs;
