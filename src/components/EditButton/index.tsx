import { ButtonProps } from "./types";

const EditButton = ({ alt, children, ...rest }: ButtonProps) => (
  <button
    {...rest}
    className="inline-flex items-center justify-center bg-transparent text-black py-3 px-5 rounded border border-black font-medium text-sm transition duration-150 ease-in-out hover:bg-black hover:text-white"
    aria-label={alt}
  >
    {children}
  </button>
);

export { EditButton };
