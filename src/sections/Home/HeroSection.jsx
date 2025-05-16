import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { FaBuilding, FaHardHat, FaPhoneAlt } from "react-icons/fa";
import Button from "../../components/Button.jsx";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const container = useRef();
  const tl = useRef();

  // Function to split text into characters
  const renderAnimatedText = (text, className) => {
    return (
      <span className={className}>
      {text.split("").map((char, index) => (
        <span
          key={index}
          className={`${className}-char inline-block font-title`}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
    );
  };

  useGSAP(() => {
    tl.current = gsap.timeline({ defaults: { ease: "power4.out" } });

    // Background animation
    tl.current.from(".hero-bg", {
      scale: 1.2,
      duration: 2,
      opacity: 0,
      ease: "power3.inOut"
    });

    // Animate brand name characters
    tl.current.from(".brand-char", {
      opacity: 0,
      y: 100,
      rotation: -45,
      duration: 0.8,
      stagger: 0.05
    }, "-=1.5");

    // Animate constructions characters
    tl.current.from(".construction-char", {
      opacity: 0,
      y: 100,
      skewY: 20,
      duration: 0.6,
      stagger: 0.03
    }, "-=1");

    // Animate subtitle characters
    tl.current.from(".subtitle-char", {
      opacity: 0,
      x: 50,
      duration: 0.4,
      stagger: 0.02
    }, "-=0.5");

    // Icon animations
    tl.current.from(".title-icon", {
      scale: 0,
      rotation: 360,
      duration: 1,
      ease: "elastic.out(1, 0.5)"
    }, "-=0.5");

    // Paragraph animation
    tl.current.from(".hero-paragraph", {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    }, "-=0.5");

    // Button animation
    tl.current.from(".contact-button", {
      scale: 0,
      rotation: 0,
      duration: 1,
      ease: "back.out(0.7)"
    });

    // Quick call section
    tl.current.from(".quick-call", {
      x: -100,
      opacity: 0,
      duration: 1
    }, "-=0.5");

    // Stats animation
    tl.current.from(".stat-box", {
      y: 100,
      opacity: 0,
      stagger: 0.2,
      duration: 0.8,
      ease: "bounce.out"
    }, "-=0.5");

  }, { scope: container });

  return (
    <div className="w-full" ref={container}>
      <div
        className="hero-bg w-full bg-center bg-cover relative border-l-[10px] md:border-l-[15px] border-orange-500"
        style={{
          backgroundImage: `linear-gradient(60deg, rgba(0,0,0,0.8) 50%, transparent), 
          url("/images/nice.jpeg")`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="max-width sm:px-6 lg:px-12 pt-32 sm:pt-40 lg:pt-48 xl:pt-64">
          <div className="space-y-4 lg:space-y-6">
            {/* Brand Name */}
            <div>
              <h1
                className="text-secondary text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold flex items-center gap-3">
                <FaHardHat className="title-icon" />
                <span className="brand-text">
                  {renderAnimatedText("codabs", "brand")}
                </span>
              </h1>
              <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mt-1">
                {renderAnimatedText("constructions", "construction")}
              </h1>
            </div>

            {/* Subtitle */}
            <h4 className="text-white text-base sm:text-xl lg:text-3xl flex items-center gap-2 max-w-3xl">
              <FaBuilding className="subtitle-icon text-secondary" />
              <span className="font-subtitle">
                <span className="text-secondary">
                  {renderAnimatedText("Building with Purpose,", "subtitle")}
                </span>
                {renderAnimatedText(" Crafting the Future.", "subtitle")}
              </span>
            </h4>

            {/* Paragraph */}
            <p className="hero-paragraph text-white text-sm sm:text-base lg:text-lg mt-2 max-w-2xl leading-relaxed">
              At <span className="text-secondary font-bold">Codabs Construction</span>, we don’t just build structures —
              we create
              landmarks of trust, innovation, and lasting quality. Every detail matters, and every project reflects our
              passion
              for excellence.
            </p>

            {/* Contact Button */}
            <div className={`contact-button `}>
              <Link to={"/contact-us"}>
                <Button
                  variant={`orange`}
                  className="font-bold mt-4"
                  size="medium"
                  icon={<FaPhoneAlt />}
                  iconPosition="left"
                >
                  Contact Us
                </Button>
              </Link>
            </div>

            {/* Quick Call & Stats */}
            <div className="pt-12 lg:pt-20 pb-16 flex items-start lg:items-center justify-between gap-10">
              {/* Quick Call */}
              <div className="quick-call space-y-2">
                <p className="text-white text-lg sm:text-xl font-semibold">In a haste?</p>
                <p className="text-white text-lg sm:text-xl font-semibold">
                  <span className="text-secondary">Call Us Now:</span> 0209494008
                </p>
              </div>

              {/* Stats */}
              <div className="hidden lg:grid lg:grid-cols-3 gap-4 text-center">
                <div className="stat-box p-1 bg-white lg:px-4   lg:py-3 rounded-full">
                  <p className="text-lg lg:text-2xl font-bold text-black">120+</p>
                  <p className="text-black text-sm sm:text-base">Projects</p>
                </div>
                <div className="stat-box p-1 bg-secondary lg:px-4 lg:py-3 rounded-full">
                  <p className="text-lg lg:text-2xl font-bold text-white">95+</p>
                  <p className="text-white text-sm sm:text-base">Happy Clients</p>
                </div>
                <div className="stat-box p-1 bg-white lg:px-4   lg:py-3 rounded-full">
                  <p className="text-lg lg:text-2xl font-bold text-black">10+</p>
                  <p className="text-black text-sm sm:text-base">Years of Experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
