"use client";
import Expertise from "./components/Home/Expertise";
import HeroSection from "./components/Home/HeroSection";
import WhoWeAre from "./components/Home/WhoWeAre";
import WhoWeAre1 from "./components/Home/WhoWeAre1";
import WhoWeAreMob from "./components/Home/WhoweAreMob";
import Clients from "./components/Home/Clients";
import Solutions from "./components/Home/Solutions";
import Contact from "./components/Home/Contact";
import OurWork from "./components/Home/OurWork";
import LocationMap from "./components/Home/LocationMap";
import OurWorkNew from "./components/Home/OurWorkNew";
import WhyGTF from "./components/Home/WhyGTF";

const Home = () => {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <div>
      <HeroSection />
      {isMobile ? <WhoWeAreMob /> : <WhoWeAre />}
      {/* {isMobile ? <WhoWeAreMob /> : <WhoWeAre1 />} */}
      <Expertise />
      <LocationMap />
      <OurWorkNew />
      <Clients />
      <WhyGTF />
      <OurWork />
      {/* <Solutions /> */}
      <Contact />
    </div>
  );
};
export default Home;
