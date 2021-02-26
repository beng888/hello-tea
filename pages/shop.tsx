import gsap from "gsap";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import tw from "twin.macro";
import { shopItems } from "../static";

const Shop: React.FC = () => {
  const itemRef = useRef<Array<HTMLDivElement | null>>([]);
  itemRef.current = [] as any;
  const router = useRouter();

  const addToitemRef = (el: HTMLDivElement) => {
    if (el && !itemRef.current.includes(el)) {
      itemRef.current.push(el);
    }
  };

  useEffect(() => {
    gsap.fromTo(
      itemRef.current,
      {
        y: 50,
      },
      {
        delay: 0.5,
        autoAlpha: 1,
        duration: 1,
        y: 0,
        stagger: 0.2,
      }
    );
  }, []);

  return (
    <div tw="background-image[url('/images/menu.jpg')] h-full w-full fixed">
      <div tw="h-full w-full grid justify-center overflow-y-auto gap-24 lg:(grid-cols-4 gap-8 place-content-center overflow-y-hidden)   max-w-7xl mx-auto py-48 md:py-24 px-9 text-center">
        {shopItems.map((item, i) => (
          <div
            onClick={() => router.push("/product/" + item.title)}
            ref={addToitemRef}
            key={i}
            tw="px-7 flex flex-col justify-center gap-4 relative invisible opacity-0 cursor-pointer height[500px] font-family['Merriweather', serif] 
            hover:(before:h-full after:border-white)  
            before:(content absolute inset-x-0 h-60 bottom-0 bg-white transform duration-2000 transition-timing-function[cubic-bezier(0.19, 1, 0.22, 1)])
            after:(content absolute inset-0 border -m-1.5 border-transparent duration-2000)"
            className="group"
          >
            <div tw="z-10 transform duration-500 ease-out origin-bottom max-width[14rem]">
              <img
                src={item.lid}
                alt={item.lid}
                tw="transform duration-700 ease-out translate-y-1 group-hover:scale-80"
              />
              <div tw="transform origin-bottom duration-700 ease-out group-hover:scale-80">
                <img
                  src={item.content}
                  alt={item.content}
                  tw="absolute -z-10 mt-px transform duration-300 ease-out group-hover:(-translate-y-full delay-150 duration-700) "
                />
                <img src={item.body} alt={item.body} />
              </div>
            </div>

            <div tw="z-10">
              <p tw="text-lg"> {item.subtitle}</p>
              <p tw="text-2xl"> {item.title}</p>
            </div>
          </div>
        ))}
        <div tw="h-1 lg:hidden" />
      </div>
    </div>
  );
};

export default Shop;
