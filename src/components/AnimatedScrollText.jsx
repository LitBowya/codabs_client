import React, { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const AnimatedScrollText = ({
                              children,
                              types = "lines, words, chars",
                              tagName = "span",
                              animateTarget = ".char",
                              animationProps = {},
                              className = ""
                            }) => {
  const textRef = useRef(null);

  useGSAP(() => {
    if (!textRef.current) return;

    // Initialize SplitType
    const split = new SplitType(textRef.current, {
      types,
      tagName
    });

    // Wait for the split to finish before running animations
    const ctx = gsap.context(() => {
      // Use the animateTarget directly since we're scoped to the textRef
      gsap.from(animateTarget, {
        y: "110%",
        opacity: 0,
        rotationZ: 10,
        duration: 0.25,
        ease: "power1.inOut",
        stagger: 0.1,
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 90%",
          toggleActions: "play none none none"
        },
        ...animationProps
      });
    }, textRef); // This scopes the selector to the textRef element

    return () => {
      ctx.revert();
      split.revert();
    };
  }, [types, tagName, animateTarget, animationProps]);

  return (
    <div ref={textRef} className={className}>
      {children}
    </div>
  );
};

export default AnimatedScrollText;
