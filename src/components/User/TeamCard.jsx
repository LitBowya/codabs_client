import { useState } from "react";
import {
  FiLinkedin,
  FiTwitter,
  FiInstagram,
  FiSmartphone
} from "react-icons/fi";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa";
import TestimonialCard from "./TestimonialCard.jsx";
import AnimatedScrollElement from "../AnimatedScrollElement.jsx";

export const TeamCard = ({ member }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="relative h-[450px] perspective-1000 cursor-pointer"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      {/* Card Container */}
      <div
        className={`relative h-full w-full preserve-3d transition-transform duration-700 ease-in-out ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front Side */}
        <div className="absolute h-full w-full bg-gray-800 rounded-2xl p-6 backface-hidden overflow-hidden">
          <div className="relative group">
            {/* Role Badge */}
            <div
              className="absolute z-10 -top-4 -right-4 bg-secondary text-primary px-4 py-2 rounded-full rotate-12 text-sm font-bold">
              {member.roles[0]}
            </div>

            {/* Profile Image */}
            <div
              className="relative h-64 w-full rounded-xl overflow-hidden border-4 border-white/10 transition-all duration-300 group-hover:border-secondary">
              <img
                src={member.image}
                alt={member.name}
                className="h-full w-full object-contain transition-all duration-500"
              />
            </div>

            {/* Name & Position */}
            <div className="mt-6 text-center">
              <h3 className="text-2xl font-bold text-white mb-1">
                {member.name}
              </h3>
              <p className="text-secondary font-mono">{member.position}</p>
            </div>
          </div>
        </div>

        {/* Back Side */}
        <div
          className="absolute h-full w-full bg-primary rounded-2xl p-6 rotate-y-180 backface-hidden border border-orange-500">
          <div className="flex flex-col h-full justify-between   ">
            {/* Bio */}
            <p className="text-gray-300 text-center line-clamp-6 mb-4">
              {member.bio}
            </p>

            {/* Social Links */}
            <div className="flex justify-center gap-4">
              {member.socialLinks.linkedin && (
                <a
                  href={member.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-secondary/10 hover:bg-secondary/20 transition-colors"
                >
                  <FiLinkedin className="text-secondary h-6 w-6" />
                </a>
              )}
              {member.socialLinks.twitter && (
                <a
                  href={member.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-secondary/10 hover:bg-secondary/20 transition-colors"
                >
                  <FiTwitter className="text-secondary h-6 w-6" />
                </a>
              )}
              {member.socialLinks.facebook && (
                <a
                  href={member.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-secondary/10 hover:bg-secondary/20 transition-colors"
                >
                  <FaFacebookF className="text-secondary h-6 w-6" />
                </a>
              )}
              {member.socialLinks.instagram && (
                <a
                  href={member.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-secondary/10 hover:bg-secondary/20 transition-colors"
                >
                  <FiInstagram className="text-secondary h-6 w-6" />
                </a>
              )}
              {member.socialLinks.whatsapp && (
                <a
                  href={`https://wa.me/${member.socialLinks.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-secondary/10 hover:bg-secondary/20 transition-colors"
                >
                  <FaWhatsapp className="text-secondary h-6 w-6" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div
        className="absolute pointer-events-none inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_40px_-5px_rgba(249,115,22,0.5)]" />
    </div>
  );
};

// To display leadership cards first
export const TeamList = ({ team }) => {
  const sortedTeam = [...team].sort(
    (a, b) => b.roles.includes("Leadership") - a.roles.includes("Leadership")
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {sortedTeam.slice(0, 3).map((member, index) => (
        <AnimatedScrollElement
          key={member._id}
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
          <TeamCard key={index} member={member} />
        </AnimatedScrollElement>

      ))}
    </div>
  );
};
