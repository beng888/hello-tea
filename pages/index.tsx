import Head from "next/head";
import LoadScreen from "../components/LoadScreen";
import tw from "twin.macro";
import React, { useRef, useState } from "react";
import { slides } from "../static";
import { gsap, TimelineMax } from "gsap";
import TeaDetails from "../components/TeaDetails";

export default function Home() {
  const [current, setCurrent] = useState<number>(0);
  const length = slides.length;

  const slideRef = useRef([]);

  function changeSlide(e) {
    const downX = e.clientX;
    let moveX, opacity;

    function mouseMoveHandler(e) {
      moveX = e.clientX;
      opacity =
        1 - (moveX < downX ? downX - moveX : moveX - downX) / window.innerWidth;

      if (
        (moveX > downX && current === 0) ||
        (moveX < downX && current === length - 1)
      ) {
        return;
      } else {
        slideRef.current.forEach((el, i) => {
          el.style.opacity = opacity;
        });
      }
    }

    function mouseUpHandler(e) {
      const upX = e.clientX;

      if (upX < downX && current !== length - 1) {
        setCurrent(current + 1);
      } else if (upX > downX && current !== 0) {
        setCurrent(current - 1);
      }

      slideRef.current.forEach((el, i) => {
        const tl = new TimelineMax();
        if (current !== i) {
          el.style.opacity = 1;
        }
      });

      document.removeEventListener("mousemove", mouseMoveHandler);
      document.removeEventListener("mouseup", mouseUpHandler);
    }
    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
  }

  return (
    <div
      tw="flex items-center h-screen w-screen overflow-hidden relative"
      onMouseDown={(e) => changeSlide(e)}
    >
      <LoadScreen />
      {slides.map((s, i) => {
        return (
          <div
            className={`${i === current ? "opacity-100" : "opacity-0"} `}
            tw="h-full flex absolute inset-0 pl-96 duration-1000 
                cursor[grab] user-select[none] active:cursor[grabbing]"
            key={i}
          >
            <div tw="overflow-hidden absolute inset-0">
              <img
                src={`${s.bg}`}
                alt={`${s.title}`}
                tw="h-full object-cover"
                className={` transform duration-2000 ease-out ${
                  i === current ? "scale-125" : "scale-100"
                }`}
              />
              <div tw="bg-black absolute inset-0 bg-opacity-90" />
            </div>
            <div tw="overflow-hidden z-10 my-auto hidden md:block">
              <img
                src={`${s.bg}`}
                alt={`${s.title}`}
                tw="cursor[grab] active:cursor[grabbing] pointer-events-none "
                className={` transform duration-2000 ease-out ${
                  i === current ? "scale-100" : "scale-150"
                }`}
              />
            </div>

            <div
              tw="z-20 absolute inset-0 flex my-auto h-fit w-screen justify-evenly px-4 pointer-events-none max-h-96
                  md:(ml-4 w-fit)"
              ref={(el) => {
                slideRef.current[i] = el;
              }}
            >
              <TeaDetails s={s} i={i} current={current} />
            </div>
          </div>
        );
      })}
      <div tw="fixed z-20 flex bottom-0 inset-x-0 justify-evenly font-medium tracking-widest height[100px]">
        {slides.map((s, i) => (
          <div
            key={i}
            tw="w-full flex justify-center items-center text-xs relative cursor-pointer bg-black 
                md:bg-transparent"
            className="group"
            onClick={() => setCurrent(i)}
          >
            <div
              tw="flex justify-center items-center w-full h-8 box-border duration-1000 
                  sm:border-l-2 group-hover:gap-14 "
              className={` ${
                current === i || i === 0 || i === current + 1
                  ? "border-transparent"
                  : "border-gray-400"
              }  ${
                current === i ? "gap-14 text-primary" : "gap-24 text-gray-500"
              }`}
            >
              <p tw="hidden z-10 md:block">0{i + 1}</p>
              <p tw="z-10">{s.title}</p>
            </div>

            <div
              tw="transition[1500ms cubic-bezier(0.175, 0.885, 0.32, 1.1)]"
              className={`absolute inset-0 bg-white duration-2000 ${
                current === i ? "w-full" : "w-0"
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
