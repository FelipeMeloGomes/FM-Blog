import {
  Box,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { TextInputWithIconProps } from "./types";

const TextInputWithIcon = ({
  label,
  iconName,
  name,
  value,
  minLength,
  maxLength,
  required,
  onChange,
  placeholder,
  alt,
}: TextInputWithIconProps) => {
  return (
    <Box>
      <FormLabel color="#151717" fontWeight="medium">
        {label}
      </FormLabel>
      <InputGroup size="md">
        {iconName && (
          <InputLeftElement pointerEvents="none">{iconName}</InputLeftElement>
        )}
        <Input
          type="text"
          name={name}
          value={value}
          minLength={minLength}
          maxLength={maxLength}
          required={required}
          onChange={onChange}
          placeholder={placeholder}
          aria-label={alt}
          borderColor="#ecedec"
          borderRadius="md"
          focusBorderColor="black"
          pl={iconName ? "2.5rem" : "1rem"}
        />
      </InputGroup>
    </Box>
  );
};

export { TextInputWithIcon };
