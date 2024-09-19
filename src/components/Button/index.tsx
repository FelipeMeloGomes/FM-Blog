import { ButtonProps } from "./types";

const Button = ({
  children,
  className = "",
  alt,
  ...rest
}: ButtonProps & { className?: string }) => (
  <button
    {...rest}
    className={`w-full mx-auto flex items-center justify-center bg-transparent text-black py-3 px-5 rounded border border-black font-medium text-sm cursor-pointer hover:bg-black hover:text-white transition duration-150 ease-in-out ${className}`}
    aria-label={alt}
  >
    {children}
  </button>
);

export { Button };
