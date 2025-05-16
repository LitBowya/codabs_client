import React from "react";
import { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";

const SectionBackground = ({
                             elementCount = 25,
                             colors = ["#ff6b6b", "#4ecdc4", "#45b7d1"],
                             shapes = ["circle", "triangle", "square", "wave", "cross"],
                             mouseIntensity = 30,
                             animationSpeed = 0.8,
                             pattern = "floating",
                             blurAmount = 2
                           }) => {
  const containerRef = useRef(null);
  const [elements, setElements] = useState([]);
  const mousePos = useRef({ x: 0, y: 0 });

  const createElements = useCallback(() => {
    const baseElements = Array.from({ length: elementCount }).map((_, i) => ({
      id: i,
      size: Math.random() * 50 + 20,
      x: Math.random() * 100,
      y: Math.random() * 100,
      speed: Math.random() * 0.5 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      rotation: Math.random() * 360,
      offset: Math.random() * 100
    }));

    // Add special pattern elements
    if (pattern === "grid") {
      return Array.from({ length: Math.sqrt(elementCount) ** 2 }).map((_, i) => ({
        id: i,
        size: 20,
        x: (i % Math.sqrt(elementCount)) * (100 / (Math.sqrt(elementCount) - 1)),
        y: Math.floor(i / Math.sqrt(elementCount)) * (100 / (Math.sqrt(elementCount) - 1)),
        color: colors[i % colors.length],
        shape: "gridDot",
        speed: 0.5
      }));
    }

    return baseElements;
  }, [elementCount, colors, shapes, pattern]);

  useEffect(() => {
    setElements(createElements());
  }, [createElements]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || elements.length === 0) return;

    let animation;
    const ctx = gsap.context(() => {
      // Mouse move handler
      const handleMouseMove = (e) => {
        mousePos.current = {
          x: (e.clientX / window.innerWidth - 0.5) * 2,
          y: (e.clientY / window.innerHeight - 0.5) * 2
        };
      };

      // Pattern-based animations
      switch (pattern) {
        case "floating":
          animation = gsap.timeline({ repeat: -1, yoyo: true });
          elements.forEach((el, i) => {
            animation.to(container.children[i], {
              duration: el.speed * 3,
              x: `+=${Math.random() * 100 - 50}`,
              y: `+=${Math.random() * 100 - 50}`,
              rotation: `+=${Math.random() * 360}`,
              ease: "power1.inOut"
            }, 0);
          });
          break;

        case "responsive":
          elements.forEach((el, i) => {
            gsap.to(container.children[i], {
              duration: 2,
              x: `+=${Math.random() * 50 - 25}`,
              y: `+=${Math.random() * 50 - 25}`,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut"
            });
          });
          break;

        case "wave":
          elements.forEach((el, i) => {
            gsap.to(container.children[i], {
              duration: 2 + Math.random() * 2,
              y: `+=${50 * Math.sin(el.offset)}`,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut"
            });
          });
          break;

        case "grid":
          elements.forEach((el, i) => {
            gsap.to(container.children[i], {
              duration: 2,
              scale: 0.5,
              repeat: -1,
              yoyo: true,
              ease: "power2.inOut"
            });
          });
          break;
      }

      // Mouse interaction
      const mouseAnimation = gsap.quickTo(container, "x", {
        duration: animationSpeed,
        ease: "power3"
      });

      const mouseAnimationY = gsap.quickTo(container, "y", {
        duration: animationSpeed,
        ease: "power3"
      });

      const updateMousePosition = () => {
        mouseAnimation(mousePos.current.x * mouseIntensity);
        mouseAnimationY(mousePos.current.y * mouseIntensity);

        if (pattern === "responsive") {
          elements.forEach((el, i) => {
            gsap.to(container.children[i], {
              duration: 0.8,
              x: `+=${mousePos.current.x * el.size * 0.2}`,
              y: `+=${mousePos.current.y * el.size * 0.2}`,
              ease: "power1.out"
            });
          });
        }

        requestAnimationFrame(updateMousePosition);
      };

      window.addEventListener("mousemove", handleMouseMove);
      updateMousePosition();

      // Touch support
      const handleTouchMove = (e) => {
        handleMouseMove(e.touches[0]);
      };
      window.addEventListener("touchmove", handleTouchMove);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("touchmove", handleTouchMove);
        animation?.kill();
      };
    }, container);

    return () => ctx.revert();
  }, [elements, mouseIntensity, animationSpeed, pattern]);

  const renderShape = (el) => {
    const commonStyles = {
      position: "absolute",
      width: el.size,
      height: el.size,
      left: `${el.x}%`,
      top: `${el.y}%`,
      background: el.color,
      opacity: 0.3,
      mixBlendMode: "overlay",
      transform: `rotate(${el.rotation}deg)`,
      filter: `blur(${blurAmount}px)`
    };

    switch (el.shape) {
      case "triangle":
        return (
          <div style={{
            ...commonStyles,
            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
            background: "none",
            borderLeft: `${el.size / 2}px solid transparent`,
            borderRight: `${el.size / 2}px solid transparent`,
            borderBottom: `${el.size}px solid ${el.color}`
          }} />
        );
      case "square":
        return <div style={{ ...commonStyles, borderRadius: "10%" }} />;
      case "cross":
        return (
          <div style={{
            ...commonStyles,
            background: "none",
            position: "relative",
            "&::before, &::after": {
              content: "\"\"",
              position: "absolute",
              background: el.color,
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)"
            },
            "&::before": {
              width: "100%",
              height: "20%"
            },
            "&::after": {
              width: "20%",
              height: "100%"
            }
          }} />
        );
      case "wave":
        return (
          <svg style={{ ...commonStyles, overflow: "visible" }}>
            <path
              d={`M 0 50 Q 25 0 50 50 T 100 50`}
              stroke={el.color}
              strokeWidth="2"
              fill="none"
            />
          </svg>
        );
      case "gridDot":
        return <div style={{ ...commonStyles, borderRadius: "50%", opacity: 0.2 }} />;
      default:
        return <div style={{ ...commonStyles, borderRadius: "50%" }} />;
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden"
      }}
    >
      {elements.map((el) => (
        <React.Fragment key={el.id}>
          {renderShape(el)}
        </React.Fragment>
      ))}
    </div>
  );
};

export default SectionBackground;
