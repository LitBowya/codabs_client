import AnimatedScrollElement from "../../components/AnimatedScrollElement.jsx";
import EmptyState from "../../components/EmptyState.jsx";
import { useGetAllProjectsQuery } from "../../redux/services/projectApi.js";
import Spinner from "../../components/Spinner.jsx";
import ErrorMessage from "../../components/ErrorMessage.jsx";
import AnimatedScrollText from "../../components/AnimatedScrollText.jsx";
import ProjectCard from "../../components/User/ProjectCard.jsx";

const ProjectSection = () => {
  const { data, isLoading, isError } = useGetAllProjectsQuery();

  if (isLoading) return <Spinner />;
  if (isError) return <ErrorMessage />;

  const projects = data?.projects || [];

  return (
    <section className="bg-primary border-r-[10px] md:border-r-[15px] border-orange-500 py-24">
      <div className="max-width">
        <div className="mb-12 text-end">
          <h4
            className={`tag text-white`}
          >
            Craft, Commitment, Completion
          </h4>
          <h2
            className={`title text-secondary lowercase`}
          >
            Our Legacy in Concrete and Steel
          </h2>

          <p
            className={`subtitle`}
          >
            From groundbreaking to grand openings, our projects reflect a relentless dedication to quality, innovation,
            and lasting impact.
          </p>
        </div>

        {projects.length === 0 ? (

          <EmptyState title="No projects found" />

        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.slice(0, 3).map((project, index) => (
              <AnimatedScrollElement
                key={project._id}
                animationProps={{
                  from: { opacity: 0, y: 50 },
                  to: {
                    duration: 1,
                    opacity: 1,
                    y: 0,
                    delay: index * 0.5 // Stagger delay based on index
                  },
                  scrollTrigger: {
                    once: true // Only animate once
                  }
                }}
              >
                <ProjectCard project={project} index={index} />
              </AnimatedScrollElement>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectSection;
