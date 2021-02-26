import tw from "twin.macro";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";

const FourOHFour = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.to(ref.current, {
      opacity: 1,
      delay: 1,
    });
  }, []);

  return (
    <div ref={ref} tw="h-full flex justify-center items-center opacity-0">
      404
    </div>
  );
};

export default FourOHFour;
