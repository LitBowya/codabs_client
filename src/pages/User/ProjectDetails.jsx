// ProjectDetails.jsx
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiMapPin, FiCalendar, FiTool, FiCheckCircle, FiArrowLeft, FiClock, FiLayers, FiTag } from "react-icons/fi";
import Spinner from "../../components/Spinner";
import ErrorMessage from "../../components/ErrorMessage";
import AnimatedScrollElement from "../../components/AnimatedScrollElement";
import { useGetProjectByIdQuery } from "../../redux/services/projectApi.js";
import { format } from "date-fns";
import React from "react";

const ProjectDetails = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useGetProjectByIdQuery(id);

  const navigate = useNavigate();

  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><Spinner size="lg" /></div>;
  if (isError) return <ErrorMessage message={error?.data?.message || "Failed to load project details"} />;

  const project = data?.project;
  const statusColors = {
    starting: "bg-yellow-500",
    ongoing: "bg-blue-500",
    completed: "bg-green-500"
  };

  return (
    <div className={`bg-primary pb-12`}>
      <div className="max-width">
        <div className="mb-8 pt-16 lg:pt-24">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-300 cursor-pointer hover:text-gray-100 mb-8"
          >
            <FiArrowLeft className="mr-2" /> Back to all projects
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-white">{project.title}</h1>
              <div className="flex items-center gap-3">
              <span className={`${statusColors[project.status]} text-white px-4 py-1 rounded-full text-sm font-medium`}>
                {project.status}
              </span>
                <div className="flex items-center gap-2 text-secondary">
                  <FiMapPin className="w-5 h-5" />
                  <span className="font-medium">{project.location}</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-6 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-white rounded-lg shadow-sm">
                    <FiCalendar className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Project Timeline</h3>
                    <p className="text-gray-600">
                      {format(new Date(project.startDate), "PP")} - {" "}
                      {project.endDate ? format(new Date(project.endDate), "PP") : "Ongoing"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white rounded-lg shadow-sm">
                    <FiLayers className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Project Category</h3>
                    <p className="text-gray-600">{project.category?.name}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="prose max-w-none text-gray-300 text-lg leading-relaxed">
              <p>{project.description}</p>
            </div>

            {project.tags?.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {project.tags.map(tag => (
                  <span
                    key={tag}
                    className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium"
                  >
                  <FiTag className="w-4 h-4" />
                    {tag}
                </span>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-12">
            <div>
              <h3 className="flex items-center gap-3 text-xl font-semibold mb-6 text-gray-300">
                <FiTool className="w-6 h-6 " />
                Construction Progress
              </h3>
              <div className="grid grid-cols-2 gap-6">
                {project.startingImages?.map((img, index) => (
                  <AnimatedScrollElement
                    key={index}
                    animationProps={{
                      from: { opacity: 0, x: -20 },
                      to: { opacity: 1, x: 0 },
                      delay: index * 0.1
                    }}
                  >
                    <img
                      src={img}
                      alt={`Progress ${index + 1}`}
                      className="w-full h-56 object-cover rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                    />
                  </AnimatedScrollElement>
                ))}
              </div>
            </div>

            {project.finishedImages?.length > 0 && (
              <div>
                <h3 className="flex items-center gap-3 text-xl font-semibold mb-6 text-gray-300">
                  <FiCheckCircle className="w-6 h-6 text-green-500" />
                  Completed Results
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  {project.finishedImages?.map((img, index) => (
                    <AnimatedScrollElement
                      key={index}
                      animationProps={{
                        from: { opacity: 0, x: 20 },
                        to: { opacity: 1, x: 0 },
                        delay: index * 0.1
                      }}
                    >
                      <img
                        src={img}
                        alt={`Result ${index + 1}`}
                        className="w-full h-56 object-cover rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                      />
                    </AnimatedScrollElement>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
