import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Spinner = ({ size = 48, color = "#4f46e5", dotCount = 8, speed = 1 }) => {
  const spinnerRef = useRef(null);
  const dots = Array.from({ length: dotCount });

  useEffect(() => {
    if (!spinnerRef.current) return;

    const dots = spinnerRef.current.querySelectorAll(".spinner-dot");
    const radius = size / 2;
    const center = radius;
    const angleStep = (Math.PI * 2) / dotCount;
    const dotSize = size / 8;

    // Position dots in a circle
    dots.forEach((dot, index) => {
      const angle = angleStep * index;
      const x = center + Math.cos(angle) * (radius - dotSize);
      const y = center + Math.sin(angle) * (radius - dotSize);

      gsap.set(dot, {
        x: x - dotSize / 2,
        y: y - dotSize / 2,
        width: dotSize,
        height: dotSize,
        backgroundColor: color,
        opacity: 0.3 + (0.7 * index / dotCount)
      });
    });

    // Create the animation timeline
    const tl = gsap.timeline({ repeat: -1 });

    dots.forEach((dot, index) => {
      tl.to(dot, {
        opacity: 1,
        scale: 1.3,
        duration: 0.1,
        ease: "power1.out"
      }, index * 0.1)
        .to(dot, {
          opacity: 0.3,
          scale: 1,
          duration: 0.3,
          ease: "power1.in"
        }, index * 0.1 + 0.1);
    });

    // Adjust speed
    tl.timeScale(speed);

    return () => {
      tl.kill();
    };
  }, [size, color, dotCount, speed]);

  return (
    <div
      ref={spinnerRef}
      style={{
        position: "relative",
        width: size,
        height: size
      }}
    >
      {dots.map((_, index) => (
        <div
          key={index}
          className="spinner-dot"
          style={{
            position: "absolute",
            borderRadius: "50%",
            transformOrigin: "center center"
          }}
        />
      ))}
    </div>
  );
};

export default Spinner;