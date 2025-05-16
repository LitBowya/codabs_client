import React, { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const selfClosingTags = ["img", "input", "br", "hr", "meta", "link"];

const AnimatedScrollElement = ({
                                 children,
                                 tag: Tag = "div",
                                 className = "",
                                 animationProps = {},
                                 ...restProps // For passing other attributes like src, alt, etc.
                               }) => {
  const elementRef = useRef(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        elementRef.current,
        animationProps.from || { opacity: 0, y: 50 },
        {
          ...animationProps.to,
          scrollTrigger: {
            trigger: elementRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
            ...animationProps.scrollTrigger
          }
        }
      );
    }, elementRef);

    return () => ctx.revert();
  }, [animationProps]);

  // Handle self-closing tags like <img />
  if (selfClosingTags.includes(Tag)) {
    return <Tag ref={elementRef} className={className} {...restProps} />;
  }

  // Regular tags like <div>, <span>, <button>
  return (
    <Tag ref={elementRef} className={className} {...restProps}>
      {children}
    </Tag>
  );
};

export default AnimatedScrollElement;
