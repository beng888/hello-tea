import { useEffect, useRef } from "react";
import { TimelineMax, gsap } from "gsap";
import tw from "twin.macro";

const LoadScreen: React.FC = () => {
  const titleRef = useRef([]);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const subtitleBlockerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const tl = new TimelineMax();

  gsap.defaults({
    ease: "ease.easeOut",
  });

  useEffect(() => {
    tl.to(containerRef.current, 0.3, { color: "white" })
      .staggerFrom(titleRef.current, 1.5, { yPercent: 200, autoAlpha: 0 }, 0.3)
      .to(subtitleBlockerRef.current, 0.5, { xPercent: 100, duration: 2 }, 0.5)
      .from(
        subtitleRef.current,
        1.5,
        { yPercent: 200, autoAlpha: 0, skewY: 5 },
        0.5
      )
      .to(wrapperRef.current, 0.5, { width: "100%" })
      .to(containerRef.current, 0.5, { color: "black" }, 1.9)
      .to(subtitleRef.current, { yPercent: 200, autoAlpha: 0, skewY: 5 }, 2.5)
      .staggerTo(titleRef.current, 1, { yPercent: 200, autoAlpha: 0 }, 0.2, 2.8)
      .to(containerRef.current, 0.3, { xPercent: "100" }, 3.5);
  }, []);
  return (
    <div
      ref={containerRef}
      tw="absolute inset-0 flex flex-col items-center justify-center tracking-widest text-black bg-black z-50"
    >
      <div ref={wrapperRef} tw="absolute inset-0 w-0 bg-white" />
      <div tw="flex text-5xl font-family['Noto Serif TC', serif]">
        <p
          ref={(el) => {
            titleRef.current[0] = el;
          }}
        >
          もしもし
        </p>
        <p
          ref={(el) => {
            titleRef.current[1] = el;
          }}
        >
          お茶
        </p>
      </div>
      <div
        tw="mt-8 overflow-hidden origin-left transform tracking-1rem"
        ref={subtitleRef}
      >
        hello tea
        <div
          ref={subtitleBlockerRef}
          tw="absolute inset-0 origin-left bg-black"
        />
      </div>
    </div>
  );
};

export default LoadScreen;
