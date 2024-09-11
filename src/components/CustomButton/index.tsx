import { ButtonProps } from "./types";

const CustomButton = ({ alt, children, ...rest }: ButtonProps) => (
  <button
    {...rest}
    className="mx-auto flex items-center justify-center bg-transparent text-black py-3 px-5 rounded border border-black font-medium text-sm cursor-pointer hover:bg-black hover:text-white transition duration-150 ease-in-out"
    aria-label={alt}
  >
    {children}
  </button>
);

export { CustomButton };
