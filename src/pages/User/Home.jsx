import React from "react";
import HeroSection from "../../sections/Home/HeroSection.jsx";
import AboutUsSection from "../../sections/Home/AboutUsSection.jsx";
import ServiceSection from "../../sections/Home/ServiceSection.jsx";
import ProjectSection from "../../sections/Home/ProjectSection.jsx";
import TestimonialSection from "../../sections/Home/TestimonialSection.jsx";
import OurTeamSection from "../../sections/Home/OurTeamSection.jsx";
import AnimatedBanner from "../../components/AnimatedBanner.jsx";


const Home = () => {
  return (
    <div>
      <HeroSection />
      <AboutUsSection />
      <ServiceSection />
      <ProjectSection />
      <AnimatedBanner
        text="Crafting Excellence • Structures That Endure • Built for Generations •"
        direction="left"
        speed={15}
      />

      <TestimonialSection />
      <OurTeamSection />
    </div>
  );
};
export default Home;
