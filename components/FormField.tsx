import tw from "twin.macro";

interface ErrorProps {
  errors: object;
  message: string;
}

const FormField: React.FC<ErrorProps> = ({ children, errors, message }) => {
  return (
    <div
      tabIndex={0}
      tw="border-b border-gray-600 relative mb-6 
        after:(content absolute right-0 h-full border-b w-full duration-1500 pointer-events-none)
        focus-within:after:w-0"
    >
      {children}
      {errors ? (
        <div tw="text-red-700 text-sm absolute pt-1">{message}</div>
      ) : null}
      <div
        tw="absolute right-0 h-full border-t transform -translate-y-px  border-red-700 duration-1500 pointer-events-none z-10"
        className={`${errors ? "w-full" : "w-0"}`}
      />
    </div>
  );
};

export default FormField;
