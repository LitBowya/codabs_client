import React from "react";
import SectionHero from "../../components/User/SectionHero.jsx";
import Blogg from "../../sections/Blogs/Blogg.jsx";
import Project from "../../sections/Project/Project.jsx";


const Blogs = () => {
  return (
    <div>
      <SectionHero
        tags="Insights, News, Industry Trends"
        title="Building Knowledge Together"
        subtitle="Stay informed with our latest articles, updates, and insights on construction, design, and innovation."

        imageUrl="/images/construction.jpg"
        pattern="diagonal"
      />

      <section className={`bg-primary py-24 lg:py-48`}>
        <Blogg />
      </section>
    </div>
  );
};
export default Blogs;
