import React from "react";
import { TagsInputProps } from "./types";

const TagsInput = React.forwardRef<HTMLInputElement, TagsInputProps>(
  ({ placeholder }, ref) => (
    <div className="flex flex-col mt-7">
      <label className="font-bold text-sm">Tags:</label>
      <input
        className="border border-gray-300 rounded px-3 py-3 mt-2 transition ease-in-out duration-150 focus:border-black"
        type="text"
        name="tags"
        placeholder={placeholder}
        ref={ref}
      />
    </div>
  ),
);

export { TagsInput };
