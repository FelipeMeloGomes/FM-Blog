import { ButtonProps } from "./type";

const DeleteButton = ({ alt, children, ...rest }: ButtonProps) => (
  <button {...rest} className="btn btn-outline btn-danger" aria-label={alt}>
    {children}
  </button>
);

export { DeleteButton };
