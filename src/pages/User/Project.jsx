import React from "react";
import SectionHero from "../../components/User/SectionHero.jsx";
import Project from "../../sections/Project/Project.jsx";

const Projects = () => {
  return (
    <div>
      <SectionHero
        tags="Our Work, Portfolio, Results"
        title="Turning Vision into Reality"
        subtitle="Explore our completed projects and see how we bring ideas to life with craftsmanship, detail, and quality."
        imageUrl="/images/construction.jpg"
        pattern="dots"
      />
      <section className={`bg-primary py-24 lg:py-48`}>
        <Project />
      </section>
    </div>
  );
};
export default Projects;
