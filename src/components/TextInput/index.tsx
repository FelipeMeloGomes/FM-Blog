import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { TextInputProps } from "./types";
import React from "react";

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, name, placeholder, onChange }, ref) => (
    <FormControl mt={7}>
      <FormLabel fontWeight="bold" fontSize="sm">
        {label}
      </FormLabel>
      <Input
        type="text"
        name={name}
        placeholder={placeholder}
        borderColor="gray.300"
        focusBorderColor="black"
        variant="outline"
        ref={ref}
        onChange={onChange}
      />
    </FormControl>
  ),
);

export { TextInput };
