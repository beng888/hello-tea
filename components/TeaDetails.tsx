import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Button from "./Button";
import tw from "twin.macro";

interface Props {
  s: {
    image: string;
    subtitle: string;
    title: string;
    description: string;
    desc: string;
    price: string;
    weight: string;
    flavors: string[];
  };

  current: number;
  i: number;
  goUp?: string;
}

const TeaDetails: React.FC<Props> = ({ s, current, i }) => {
  const router = useRouter();
  const path = router.pathname;
  const ref = useRef(null);

  const goUp = `transform duration-1000  ${
    i === current
      ? "opacity-100 visible translate-y-0 z-10"
      : "opacity-0 invisible translate-y-12 no-delay"
  }`;

  return (
    <>
      {router.pathname === "/" && (
        <div tw="max-width[40vw]">
          <img
            src={`${s.image}`}
            alt={`${s.title}`}
            tw="w-full object-contain h-full sm:(max-h-72) "
          />
        </div>
      )}
      <div
        tw="text-white text-xs flex flex-col justify-evenly gap-4 w-full"
        className={`${router.pathname === "/" && "sm:gap-0"}`}
      >
        <p className={goUp} tw="text-gray-500 text-base" ref={ref}>
          {s.subtitle}
        </p>
        <p
          className={goUp}
          tw="text-3xl delay-150 font-family['Merriweather', serif]"
        >
          {s.title}
        </p>
        <div className={goUp} tw="leading-relaxed delay-300 max-width[47ch]">
          <p> {s.description}</p>

          {path !== "/" && <p tw="mt-4">{s.desc}</p>}
        </div>
        <div tw="text-gray-400 flex gap-6">
          <p className={goUp} tw="delay-500">
            {s.price}
          </p>{" "}
          <p className={goUp} tw=" delay-700">
            {s.weight}
          </p>
        </div>
        <button
          onClick={() =>
            router.push(
              router.pathname === "/" ? "/product/" + s.title : "/contact"
            )
          }
          className={`${goUp} group`}
          tw="w-fit delay-1000 py-3 px-6 lg:px-20 pointer-events-auto relative"
        >
          <Button>Purchase</Button>
        </button>
      </div>
    </>
  );
};

export default TeaDetails;
