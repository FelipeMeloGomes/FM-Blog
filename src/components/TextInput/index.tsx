import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import type { TextInputProps } from "./types";

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, name, placeholder, onChange }, ref) => (
    <div className="mt-7">
      <Label className="font-bold text-sm">{label}</Label>
      <Input type="text" name={name} placeholder={placeholder} ref={ref} onChange={onChange} />
    </div>
  )
);

export { TextInput };
