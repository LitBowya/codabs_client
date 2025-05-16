import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const AnimatedBanner = ({
                          text = "Building the future with precision •",
                          direction = "left", // "left" or "right"
                          speed = 20, // seconds
                          effects = [] // ["scale", "skew", "rotate"]
                        }) => {
  const marqueeRef = useRef();

  useGSAP(() => {
    const tl = gsap.timeline({
      repeat: -1,
      defaults: {
        ease: "linear",
        duration: speed
      }
    });

    const effectStyle = {
      scale: 1.1,
      rotate: 2,
      skewX: 5
    };

    const baseTween = {
      xPercent: direction === "left" ? -100 : 100
    };

    effects.forEach(effect => {
      if (effect in effectStyle) {
        baseTween[effect] = effectStyle[effect];
      }
    });

    tl.to(".marquee-inner", baseTween);

    return () => tl.kill();
  }, [direction, speed, effects]);

  return (
    <div className="relative overflow-hidden bg-secondary text-primary py-4 border-y-4 border-orange-500">
      <div
        ref={marqueeRef}
        className="whitespace-nowrap flex gap-16 will-change-transform"
      >
        {[...Array(3)].map((_, index) => (
          <span
            key={index}
            className="marquee-inner text-2xl md:text-3xl font-bold uppercase tracking-widest"
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
};

export default AnimatedBanner;
