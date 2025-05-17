import { FiArrowUpRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const ServiceCard = ({ service, index }) => {
  return (
    <div
      className="group relative h-[500px] cursor-pointer overflow-hidden rounded-lg bg-primary transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-secondary/20">
      {/* Index Number */}
      <div className="absolute right-4 top-4 z-10 text-5xl lg:text-8xl font-black text-secondary/20">
        0{index + 1}
      </div>

      {/* Image Container */}
      <div className="relative h-64 overflow-hidden border-b-4 border-secondary">
        <img
          src={service.images[0]}
          alt={service.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
      </div>

      {/* Content Card */}
      <div className="p-6 transition-all duration-300 group-hover:bg-primary-dark">
        <h3 className="mb-3 text-xl lg:text-3xl font-bold text-white">
          {service.title}
          <span className="ml-3 inline-block h-1 w-16 bg-white transition-all group-hover:bg-secondary"></span>
        </h3>

        <p className="mb-5 line-clamp-3 text-sm text-gray-300">
          {service.description}
        </p>

        {/* CTA Button */}
        <div className="flex justify-end">
          <Link
            to={`/service/${service._id}`}
            className="flex items-center gap-2 rounded-full bg-secondary px-2 py-1 lg:px-6 lg:py-3 font-medium text-primary transition-all duration-300 hover:bg-secondary-dark hover:shadow-lg hover:shadow-secondary/30"
          >
            Discover More
            <FiArrowUpRight className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>
      </div>

    </div>
  );
};

export default ServiceCard;
