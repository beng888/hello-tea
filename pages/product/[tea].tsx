import { gsap, TimelineMax } from "gsap";
import { useRouter } from "next/router";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import tw from "twin.macro";
import TeaDetails from "../../components/TeaDetails";
import { slides, shopItems } from "../../static";

export default function Tea() {
  const length = slides.length;
  const [current, setCurrent] = useState(null);
  const [counter, setCounter] = useState(0);
  const [noDuration, setNoDuration] = useState(true);
  const [size, setSize] = useState(0);
  const router = useRouter();
  const path = router.query.tea;
  const slideContainerRef = useRef<HTMLDivElement>(null);
  const tl = new TimelineMax();
  const P = slides
    .map(function (e) {
      return e.title;
    })
    .indexOf(path?.toString());

  useEffect(() => {
    path && setCurrent(P);
  }, [path]);

  const p = P === 0 ? 2 : P === 1 ? 3 : P - 2;

  const carouselSlides = [
    shopItems[p],
    shopItems[P === 0 ? length - 1 : P - 1],
    shopItems[P],
    shopItems[P === length - 1 ? 0 : P + 1],
    shopItems[p],
    shopItems[P === 0 ? length - 1 : P - 1],
    shopItems[P],
    shopItems[P === length - 1 ? 0 : P + 1],
  ];

  const changeSize = () => {
    setSize(slideContainerRef.current?.offsetWidth);
    console.log(size);
  };

  useLayoutEffect(() => {
    changeSize();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", changeSize);
    return () => {
      window.removeEventListener("resize", changeSize);
    };
  }, []);

  const invalid = counter <= -2 || counter >= 5;
  // const difference =
  //   counter <= -2 ? Math.abs(counter - -2) : counter >= 5 ? counter - 5 : 0;

  // const T = (difference * 5) / 10;

  useEffect(() => {
    gsap.defaults({
      ease: "inOut",
      duration:
        (counter === 3 && noDuration) || (counter === 0 && noDuration) ? 0 : 1,
    });

    changeSlide();
  }, [counter]);

  const changeSlide = () => {
    if (invalid) return;
    counter === 1 || counter === 2 ? setNoDuration(false) : setNoDuration(true);
    tl.to(slideContainerRef.current, {
      x: (counter * -size) / 2,
    }).add(function () {
      if (counter === -1) {
        setCounter(3);
      } else if (counter === 4) {
        setCounter(0);
      }
    });
  };

  console.log(counter);

  const prevSlide = () => {
    if (counter >= 0) {
      setCounter(counter - 1);
      setCurrent(current <= 0 ? length - 1 : current - 1);
    } else return;
  };
  const nextSlide = () => {
    if (counter <= 3) {
      setCounter(counter + 1);
      setCurrent(current >= length - 1 ? 0 : current + 1);
    } else return;
  };

  return (
    <div tw="h-full w-full flex flex-col md:flex-row-reverse overflow-y-auto">
      <div tw="mt-52 mb-20 relative w-full cursor-pointer md:(flex-1 overflow-x-hidden min-h-screen my-auto)">
        <div tw="transform translate-x-3/4 m-auto md:absolute inset-0">
          <div
            ref={slideContainerRef}
            tw="flex items-center justify-center md:absolute inset-0"
          >
            {carouselSlides.map((s, i) => (
              <div key={i} tw="min-width[50%] h-full grid place-content-center">
                <div
                  tw="w-3/5 mx-auto ease-out"
                  className={`transform duration-1000 ${
                    current === s?.index ? "scale-150" : "scale-100"
                  }`}
                >
                  <img
                    src={s?.lid}
                    alt={s?.lid}
                    className={`transform duration-1000 ease-out ${
                      current === s?.index
                        ? "-translate-y-3/4"
                        : "translate-y-1"
                    }`}
                  />
                  <div>
                    <img
                      src={s?.content}
                      alt={s?.content}
                      className={`absolute -z-10 mt-px transform duration-1000 ${
                        current === s?.index
                          ? "-translate-y-3/4"
                          : "translate-y-1"
                      }`}
                    />
                    <img src={s?.body} alt={s?.body} />
                  </div>
                </div>
              </div>
            ))}
          </div>{" "}
        </div>

        <div tw="absolute inset-0 grid grid-cols-2">
          <div onClick={() => prevSlide()} />
          <div onClick={() => nextSlide()} />
        </div>
      </div>
      <div tw="bg-black bg-opacity-90 text-white flex justify-center items-center h-full w-full relative pb-40 pt-20 md:flex-1">
        <div tw="background-image[url('/images/products.jpg')] absolute inset-0 -z-10" />
        {slides.map((s, i) => (
          <div
            key={i}
            tw="max-width[30ch]"
            className={`${current === i ? "relative" : "absolute"}`}
          >
            <TeaDetails s={s} i={i} current={current} />
          </div>
        ))}
        <div tw="w-full absolute bottom-0 grid grid-cols-2 text-xs height[100px]">
          <div tw="background-color[#0D0D0D] flex items-center justify-around ">
            <img src="/images/tea.svg" alt="tea" />
            <p>Flavours</p>
          </div>
          <div tw="relative">
            {slides.map((s, i) => (
              <div
                tw="absolute inset-0 flex items-center justify-around"
                key={i}
              >
                {s.flavors.map((f, l) => (
                  <div
                    className={`transform duration-700 ease-out ${
                      l === 1 && "delay-300"
                    } ${
                      current !== i
                        ? "opacity-0 translate-y-full"
                        : "opacity-100 translate-y-0"
                    }`}
                    key={l}
                  >
                    {f}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
