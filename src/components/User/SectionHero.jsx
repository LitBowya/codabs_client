import React from "react";
import AnimatedElement from "../AnimatedElement.jsx";

const SectionHero = ({
                       tags,
                       title,
                       subtitle,
                       imageUrl,
                       overlayColor = "bg-black/70",
                       textColor = "text-white",
                       pattern = "default",
                       ctaText,
                       onCtaClick
                     }) => {
  // Pattern designs
  const patterns = {
    default: null,
    bricks: "bg-brick-pattern ",
    grid: "bg-grid-pattern",
    dots: "bg-dot-pattern",
    diagonal: "bg-diagonal-pattern"
  };

  return (
    <section
      className={`relative h-[40vh] lg:h-[60vh] max-h-[900px] w-full overflow-hidden ${textColor}`}
    >
      {/* Background image */}
      {imageUrl && (
        <div className="absolute inset-0 z-0">
          <img src={imageUrl} alt="" className="w-full h-full object-cover" />
        </div>
      )}

      {/* Overlay & pattern */}
      <div
        className={`absolute inset-0 z-1 ${overlayColor} ${patterns[pattern]}`}
      ></div>

      {/* Content */}
      <div className="relative z-2 h-full flex flex-col justify-center py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">

          {/* Tags */}
          {tags && (
            <span className="">
                {tags.split(",").map((tag, i) => (
                  <React.Fragment key={i}>
                    {tag.trim()}
                    {i < tags.split(",").length - 1 && (
                      <span className="mx-1">•</span>
                    )}
                  </React.Fragment>
                ))}
              </span>
          )}

          {/* Title */}
          {title && (
            <h1 className="text-2xl lg:text-6xl font-bold leading-tight mb-4 drop-shadow-md">
              {title}
            </h1>
          )}

          {/* Subtitle */}
          {subtitle && (
            <p className="text-md lg:text-2xl max-w-2xl mx-auto mb-8 drop-shadow-sm">
              {subtitle}
            </p>
          )}

          {/* CTA Button */}
          {ctaText && (
            <button
              onClick={onCtaClick}
              className="px-8 py-3 bg-white text-gray-900 font-medium rounded-full hover:bg-gray-100 transition-colors shadow-lg"
            >
              {ctaText}
            </button>
          )}
        </div>
      </div>

    </section>
  );
};

export default SectionHero;
