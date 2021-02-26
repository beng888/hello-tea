import tw from "twin.macro";
import { gsap, TimelineMax } from "gsap";
import { useEffect, useRef } from "react";
import Link from "next/link";

const FourOHFour = () => {
  const ref = useRef<HTMLDivElement>(null);
  const arrayRef = useRef([]);

  const tl = new TimelineMax();

  useEffect(() => {
    tl.to(ref.current, {
      opacity: 1,
      delay: 1,
    }).staggerFrom(
      arrayRef.current,
      0.7,
      {
        opacity: 0,
        y: 50,
      },
      0.3
    );
  }, []);

  return (
    <div
      ref={ref}
      tw="h-full opacity-0 text-white flex flex-col justify-center items-center gap-8 
          background[#191919] font-family['Merriweather', serif]"
    >
      <div tw="absolute h-24 w-full top-0 bg-black" />
      <p
        ref={(el) => {
          arrayRef.current[0] = el;
        }}
        tw="text-8xl"
      >
        404
      </p>
      <p
        ref={(el) => {
          arrayRef.current[1] = el;
        }}
        tw="text-4xl"
      >
        Page not found
      </p>
      <Link href="/">
        <button
          ref={(el) => {
            arrayRef.current[2] = el;
          }}
          tw="px-6 md:px-12 py-2 w-fit text-black font-bold text-sm  
            background[#A08060] 
            hover:text-white"
        >
          <p tw="duration-300">Back to home</p>
        </button>
      </Link>
    </div>
  );
};

export default FourOHFour;
