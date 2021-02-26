import tw from "twin.macro";
import { gsap, TimelineMax } from "gsap";
import { useEffect, useRef, useState } from "react";
import SplitTextToChars from "../utils/SplitTextToChars";
import { useRouter } from "next/router";
import Contact from "./Contact";

const AboutOrContact: React.FC = () => {
  const bgRef = useRef<HTMLDivElement>(null);
  const finestRef = useRef<HTMLParagraphElement>(null);
  const craftedRef = useRef<HTMLParagraphElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const teaRef = useRef<HTMLImageElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const arrayRef = useRef<Array<HTMLParagraphElement>>([]);
  const containersRef = useRef<Array<HTMLDivElement>>([]);

  const [messageSent, setMessageSent] = useState<boolean>(false);

  console.log(messageSent);
  const route = useRouter();

  const about = route.asPath === "/about";
  const valid = route.pathname === "/about" || route.pathname === "/contact";

  const tl = new TimelineMax();

  const playTimeline = () => {
    const finestChars = SplitTextToChars(finestRef.current);
    const craftedChars = about && SplitTextToChars(craftedRef.current);

    const animation = {
      opacity: 0,
      y: -40,
      rotationX: -90,
      transformOrigin: "0% 50% -50",
      ease: "inOut",
      stagger: 0.025,
    };

    const mobile = window.innerWidth <= 768;

    tl.to(containersRef.current, { opacity: 1 })
      .staggerFrom(
        arrayRef.current,
        0.5,
        { yPercent: 50, ease: "Out", opacity: 0 },
        0.6
      )
      .to(
        bgRef.current,
        mobile ? 12 : 3,
        {
          yPercent: -100,
          ease: "power4",
        },
        0.3
      )
      .to(
        contactRef.current,
        mobile ? 1.3 : 1,
        {
          y: mobile ? -88 : 0,
          opacity: 1,
        },
        mobile ? "-=9.5" : "-=1"
      )
      .to(
        teaRef.current,
        3,
        {
          y: 0,
          rotate: 180,
          ease: "power4",
        },
        0.3
      )
      .from(finestChars, 0.2, animation, 0.7)
      .from(craftedChars, 0.2, animation, 2);
  };

  const revertBg = () => {
    gsap.to(bgRef.current, {
      yPercent: 100,
      duration: 0,
    });
  };

  useEffect(() => {
    playTimeline();

    return () => {
      revertBg();
    };
  }, [route.asPath]);

  if (messageSent) {
    revertBg();
    playTimeline();
  }

  return (
    <div tw="h-full w-full overflow-y-auto md:(overflow-hidden)">
      <div
        tw="flex flex-col px-10 md:(flex-row h-full py-0) items-center mx-auto relative z-10"
        className={`${about ? "py-52 gap-12" : "pt-28 gap-52"}`}
      >
        <div tw="absolute inset-0 grid grid-rows-2 md:(grid-cols-2 grid-rows-none)">
          <div tw="bg-white" />
          <div
            tw="background[url('/images/about-bg.jpg')] bg-cover bg-center"
            className={`${!about && "-mt-48 md:-mt-0"}`}
          >
            <div ref={bgRef} tw="absolute inset-0 bg-white" />
          </div>
        </div>
        <div
          tw="w-full opacity-0"
          ref={(el) => {
            containersRef.current[0] = el;
          }}
        >
          <div
            className={`${
              !about ? "ml-auto max-w-sm md:max-w-xs" : "mx-auto md:max-w-xs"
            }`}
          >
            <p
              tw="text-gray-500"
              ref={(el) => {
                arrayRef.current[0] = el;
              }}
            >
              {about ? " 最高の食材" : "お問い合わせ"}
            </p>
            <p
              ref={finestRef}
              tw="mt-3 mb-6 text-2xl font-family['Merriweather', serif]"
            >
              {about ? "finest ingredients" : "contact us"}
            </p>
            <p
              tw="text-xs"
              ref={(el) => {
                arrayRef.current[1] = el;
              }}
            >
              {about
                ? `all of our leaves are grown to perfection and gently steamed soon
              after harvesting. Thanks to the steaming process our leaves retain
              their natural colour, fragrance and nutritional components, giving
              you the perfect cup of tea`
                : `we welcome your enquiry. if you would like to place an order or to contact us, please send a message via the contact form`}
            </p>
          </div>
        </div>
        {about ? (
          <>
            <img
              ref={teaRef}
              src="/images/about.png"
              alt="about.png"
              tw="max-w-xs transform rotate-90 -translate-x-12 object-contain translate-y-96 md:(h-screen translate-y-full) select-none"
            />
            <div
              tw="w-full opacity-0"
              ref={(el) => {
                containersRef.current[1] = el;
              }}
            >
              <div tw="md:max-w-xs mx-auto">
                <p
                  tw="text-gray-500"
                  ref={(el) => {
                    arrayRef.current[2] = el;
                  }}
                >
                  情熱を持って作られた
                </p>
                <p
                  ref={craftedRef}
                  tw="mt-3 mb-2 text-2xl text-white font-family['Merriweather', serif]"
                >
                  crafted with passion
                </p>
                <p
                  tw="text-xs text-white"
                  ref={(el) => {
                    arrayRef.current[3] = el;
                  }}
                >
                  from seed to cup our teas are picked, processed and packaged
                  with care. We believe that drinking tea should be a luxurious
                  affair which is why we only source top quality ingredients and
                  process our teas in the traditional Japanese way, giving you
                  an authentic taste experience
                </p>
              </div>
            </div>{" "}
          </>
        ) : (
          <Contact
            about={about}
            ref={contactRef}
            setMessageSent={setMessageSent}
            messageSent={messageSent}
          />
        )}
      </div>
    </div>
  );
};

export default AboutOrContact;
