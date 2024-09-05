import { SubmitButtonProps } from "./types";

const SubmitButton = ({ children, type, disabled }: SubmitButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className="mt-2.5 w-full h-12 rounded-lg flex items-center justify-center font-medium gap-2 border border-[#ededef] bg-white cursor-pointer transition-colors duration-200 ease-in-out hover:border-black"
    >
      {children}
    </button>
  );
};

export { SubmitButton };
