import { LockIcon } from "@chakra-ui/icons";
import {
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { forwardRef } from "react";
import { FaEye as EyeIcon, FaEyeSlash as SlashIcon } from "react-icons/fa";
import { PasswordInputProps } from "./types";

const PasswordInputWithToggle = forwardRef<
  HTMLInputElement,
  PasswordInputProps
>(
  (
    {
      label,
      name,
      value,
      minLength = 0,
      maxLength = 100,
      required = false,
      onChange,
      placeholder,
      alt,
      passwordVisible,
      togglePasswordVisibility,
      ...rest
    },
    ref,
  ) => (
    <FormControl id={name} isRequired={required}>
      <FormLabel>{label}</FormLabel>
      <InputGroup>
        {<LockIcon /> && <InputLeftElement>{<LockIcon />}</InputLeftElement>}
        <Input
          type={passwordVisible ? "text" : "password"}
          name={name}
          value={value}
          minLength={minLength}
          maxLength={maxLength}
          onChange={onChange}
          placeholder={placeholder}
          ref={ref}
          aria-label={alt}
          {...rest}
        />
        <InputRightElement>
          <IconButton
            aria-label={passwordVisible ? "Hide password" : "Show password"}
            icon={passwordVisible ? <EyeIcon /> : <SlashIcon />}
            onClick={togglePasswordVisibility}
            variant="unstyled"
          />
        </InputRightElement>
      </InputGroup>
    </FormControl>
  ),
);

export { PasswordInputWithToggle };
