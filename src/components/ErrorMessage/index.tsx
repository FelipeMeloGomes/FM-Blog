import type { ErrorMessageProps } from "./types";

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return <p className="error">{message}</p>;
};

export { ErrorMessage };
