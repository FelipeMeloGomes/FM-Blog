import { ButtonProps } from "./types";

const EditButton = ({ alt, children, ...rest }: ButtonProps) => (
  <button {...rest} aria-label={alt}>
    {children}
  </button>
);

export { EditButton };
