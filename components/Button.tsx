import tw from "twin.macro";
const Button = ({ children }) => {
  return (
    <>
      <div
        tw="absolute inset-0 w-full background[#A08060] 
            after:(content absolute inset-0 bg-black bg-opacity-5 w-0 duration-300)
            before:(content absolute inset-0 bg-white w-0 duration-300 delay-300)
            group-hover:(after:w-full before:w-full)"
      />
      <p tw="group-hover:color[#A08060] duration-150 delay-150 z-10 relative">
        {children}
      </p>
    </>
  );
};

export default Button;
