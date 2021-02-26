import tw from "twin.macro";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useRouter } from "next/router";
import { navLinks } from "../../static";

interface Props {
  open?: boolean;
  handleClick?: Function;
}

const Menu = React.forwardRef<HTMLDivElement, Props>(
  ({ open, handleClick }, ref) => {
    const menuRef = useRef<Array<HTMLDivElement | null>>([]);
    menuRef.current = [] as any;
    const router = useRouter();

    const addToMenuRef = (el: HTMLHeadingElement) => {
      if (el && !menuRef.current.includes(el)) {
        menuRef.current.push(el);
      }
    };

    useEffect(() => {
      gsap.set(menuRef.current, {
        y: 50,
        autoAlpha: 0,
      });

      open &&
        gsap.to(menuRef.current, {
          y: 0,
          autoAlpha: 1,
          stagger: 0.2,
          userSelect: "auto",
          pointerEvents: "auto",
        });
    }, [open]);

    return (
      <div
        ref={ref}
        tw="fixed w-full inset-0 z-40 background-image[url('/images/menu.jpg')] opacity-0 invisible grid  md:(grid-cols-4) gap-16 place-content-center padding[0 12vw]"
        className={`${!open && "select-none pointer-events-none"}`}
      >
        {navLinks.map((item, i) => (
          <div
            onClick={() => {
              handleClick();
              router.push(item.link);
            }}
            key={i}
            ref={addToMenuRef}
            tw="px-2.5 py-4 cursor-pointer md:(border) border-transparent h-fit w-fit m-auto relative duration-1000 ease-out hover:(border-gray-400)"
            className="group"
          >
            <div tw="overflow-hidden bg-black bg-opacity-0 duration-500 group-hover:(bg-opacity-10) hidden md:(block)">
              <div tw="opacity-50 duration-500 group-hover:(opacity-100)">
                <img
                  src={item.src}
                  alt={item.src}
                  tw="h-96 transform translate-y-full duration-1000 ease-in-out delay-100  group-hover:(translate-y-0)"
                />
              </div>
            </div>
            <div tw="absolute flex items-center inset-0 whitespace-nowrap">
              <div tw="relative text-left left-1 lg:left[25%] transform -translate-x-12 md:translate-x-0">
                <p tw="text-gray-400 duration-1000 group-hover:(text-gray-50)">
                  {item.subtitle}
                </p>
                <p tw="text-2xl text-white font-family['Merriweather', serif]">
                  {item.title}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
);

export default Menu;
