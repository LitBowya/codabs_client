import { FiArrowUpRight, FiMapPin } from "react-icons/fi";
import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => {
  return (
    <div
      className="group relative h-[600px] cursor-pointer overflow-hidden rounded-2xl bg-gray-800 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-gray-900/50">
      {/* Image Container with Overlay */}
      <div className="relative h-60 overflow-hidden">
        <img
          src={project.finishedImages[0]}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* Content Card */}
      <div className="p-6 transition-all duration-300 group-hover:bg-gray-700/50">
        <div className="mb-4 flex items-center gap-2 justify-end">
          <FiMapPin className="h-5 w-5 text-secondary" />
          <h4 className="font-medium text-gray-300">{project.location}</h4>
        </div>

        <h3 className="mb-3 text-2xl font-bold text-white">{project.title}</h3>

        <p className="mb-5 line-clamp-3 text-gray-400">
          {project.description}
        </p>

        {/* Tags */}
        <div className="mb-6 flex flex-wrap gap-2">
          {project.tags.map((tag, index) => (
            <span
              key={index}
              className="rounded-full bg-secondary-lighter/20 px-3 py-1 text-sm text-secondary"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className={`flex justify-end z-50`}>
          {/* CTA Button */}
          <Link
            to={`/project/${project._id}`}
            className="inline-flex items-center gap-2 font-semibold text-white transition-all hover:text-secondary border-t pt-2 border-t-secondary"
          >
            View Details
            <FiArrowUpRight
              className="transition-transform group-hover:translate-x-1 group-hover:translate-y-[-2px]" />
          </Link>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div
        className="absolute pointer-events-none inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div
          className="absolute -inset-2 bg-gradient-to-r from-orange-500/30 from-10% to-transparent to-50% blur-xl" />
        <div
          className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/20 from-10% to-transparent to-90%" />
      </div>
    </div>
  );
};

export default ProjectCard;
