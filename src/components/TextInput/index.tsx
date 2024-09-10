import React from "react";
import { TextInputProps } from "./types";

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, name, placeholder, onChange }, ref) => (
    <div className="flex flex-col mt-7">
      <label className="font-bold text-sm">{label}</label>
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        className="border border-gray-300 rounded px-3 py-3 mt-2 transition ease-in-out duration-150 focus:border-black"
        ref={ref}
        onChange={onChange}
      />
    </div>
  ),
);

export { TextInput };
