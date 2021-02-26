import tw from "twin.macro";

import { TimelineMax, gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import Menu from "./Menu";
import { useRouter } from "next/router";

gsap.defaults({
  ease: "ease.easeOut",
});

const Navigation: React.FC = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  const [tl] = useState(new TimelineMax({ paused: true }));

  useEffect(() => {
    tl.to(logoRef.current, { background: "transparent", color: "white" })
      .to(menuRef.current, { autoAlpha: 1 }, 0)
      .reverse();
  }, []);

  function handleClick() {
    setOpen(!open);
    tl.reversed(!tl.reversed());
  }

  function handleClose() {
    setOpen(false);
    open && tl.reversed(!tl.reversed());
  }

  return (
    <>
      <div tw="h-24 fixed flex w-full justify-between z-50">
        <div
          onClick={() => {
            handleClose();
            router.push("/");
          }}
          ref={logoRef}
          tw="bg-white h-full grid place-content-center text-center cursor-pointer px-5 sm:(px-12)"
        >
          <p tw="sm:(text-3xl) text-lg font-medium whitespace-nowrap font-family['Noto Serif TC', serif]">
            もしもし お茶
          </p>
          <p tw=" sm:(text-sm tracking-10px) tracking-5px text-xs transform scale-75">
            hello tea
          </p>
        </div>
        <div
          onClick={() => handleClick()}
          tw="flex items-center text-xs tracking-widest gap-10  w-full duration-500 justify-end cursor-pointer 
              sm:gap-12 "
          className={`group ${
            open
              ? "bg-transparent"
              : router.pathname === "/" && !open
              ? "bg-black"
              : "bg-black md:bg-transparent"
          }`}
        >
          <div
            className={`transform duration-700 group-hover:-translate-x-2 ${
              open ? "-translate-x-2" : "translate-x-0"
            }`}
          >
            <p
              tw="text-white absolute duration-700"
              className={`${open ? "opacity-100" : "opacity-0"}`}
            >
              Close
            </p>

            <p
              tw="text-gray-400 duration-700
              before:(content['Menu'] absolute duration-1000) 
              after:(content['Open'] opacity-0 absolute left-0 duration-1000)  
              group-hover:( before:(opacity-0) after:(opacity-100)  text-white)"
              className={`${!open ? "opacity-100" : "opacity-0"}`}
            >
              &nbsp;
            </p>
          </div>
          <div
            tw="h-12 w-12  duration-1000 rounded-full grid place-content-center mr-3 sm:mr-8"
            className={`border-2 border-transparent group-hover:border-gray-300 ${
              open && "border-gray-400"
            }`}
          >
            <svg
              version="1.1"
              x="0px"
              y="0px"
              viewBox="0 0 18.729 93.45"
              tw="transform w-full duration-700 ease-out h-full rounded-full fill[gray] group-hover:(scale-125 fill[white])"
            >
              <circle
                cx="9.386"
                r="5"
                tw=""
                className={`transform duration-500 ${
                  open ? "translate-y-1/2" : "translate-y-1/4 "
                }`}
              />
              <circle
                cx="9.386"
                r={`${open ? "7" : "5"}`}
                className={`transform origin-bottom duration-500 translate-y-1/2 ${open}`}
              />
              <circle
                cx="9.386"
                r="5"
                className={`transform duration-500 ${
                  open ? "translate-y-1/2" : "translate-y-3/4 "
                }`}
              />
            </svg>
          </div>
        </div>
      </div>
      <Menu ref={menuRef} open={open} handleClick={handleClick} />
    </>
  );
};

export default Navigation;
