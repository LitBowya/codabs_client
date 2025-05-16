import { FaStar } from "react-icons/fa";
import { useState } from "react";

const TestimonialCard = ({ testimonial }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative h-[400px] overflow-hidden rounded-2xl bg-primary transition-all duration-500 shadow-md shadow-orange-200 hover:shadow-2xl hover:shadow-secondary/20 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Dynamic Background Element */}
      <div className={`absolute top-0 h-1 bg-secondary transition-all duration-700 ${isHovered ? "w-full" : "w-0"}`} />

      {/* Profile Section */}
      <div className="relative z-10 flex items-center gap-4 p-6">
        <div
          className={`relative h-24 w-24 overflow-hidden rounded-full border-2 transition-all duration-500 ${isHovered ? "border-secondary scale-110" : "border-white"}`}>
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex-1 overflow-hidden">
          <h4 className="truncate text-lg font-bold text-white">{testimonial.name}</h4>
          <p className="truncate text-sm text-secondary">{testimonial.position}</p>
          <p className="truncate text-xs text-gray-400">{testimonial.company}</p>
        </div>
      </div>

      {/* Rating Stars */}
      <div className="px-6 pb-4 flex justify-end">
        <div className="flex gap-1">
          {[...Array(testimonial.rating)].map((_, i) => (
            <FaStar
              key={i}
              className={`transition-all duration-300 ${isHovered ? "text-secondary scale-125" : "text-gray-400"}`}
            />
          ))}
        </div>
      </div>

      {/* Testimonial Message */}
      <div className="relative px-6">
        <div
          className={`relative overflow-hidden text-gray-300 transition-all duration-500 ${isHovered ? "max-h-[260px]" : "max-h-[200px]"}`}>
          <div
            className={`absolute bottom-0 h-8 w-full bg-gradient-to-t from-primary transition-opacity duration-300 ${isHovered ? "opacity-0" : "opacity-100"}`} />
          <p className="text-justify">{testimonial.message}</p>
        </div>
      </div>

      {/* Hover-activated Company Badge */}
      <div
        className={`absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-2 transition-all duration-500 ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
        <span className="text-sm font-medium text-secondary">Featured at</span>
        <span className="text-white">{testimonial.company}</span>
      </div>

      {/* Interactive Grid Pattern */}
      <div className="absolute inset-0 -z-0 opacity-10 [mask-image:linear-gradient(to_bottom,transparent,black_30%)]">
        <div
          className="h-full w-full animate-grid-pulse [background-size:40px_40px] [background-image:linear-gradient(to_right,#f9731633_1px,transparent_0),linear-gradient(to_bottom,#f9731633_1px,transparent_0)]" />
      </div>
    </div>
  );
};

export default TestimonialCard;
