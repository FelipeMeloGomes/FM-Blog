import { forwardRef, ReactElement } from "react";
import { PasswordInputProps } from "./types";
import { Icon } from "../IconComponent";
import {
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";

const PasswordInputWithToggle = forwardRef<
  HTMLInputElement,
  PasswordInputProps
>(
  (
    {
      label,
      name,
      value,
      minLength,
      maxLength,
      required,
      onChange,
      placeholder,
      alt,
      passwordVisible,
      togglePasswordVisibility,
      iconName,
      ...rest
    },
    ref,
  ) => {
    const renderIcon = (iconName?: string): ReactElement | null => {
      return iconName ? <Icon name={iconName} /> : null;
    };

    const renderVisibilityIcon = (
      passwordVisible: boolean,
      togglePasswordVisibility: () => void,
    ): ReactElement | null => {
      const icon = passwordVisible ? "Eye" : "Slash";
      return (
        <IconButton
          aria-label={passwordVisible ? "Hide password" : "Show password"}
          icon={<Icon name={icon} />}
          onClick={togglePasswordVisibility}
          variant="unstyled"
        />
      );
    };

    return (
      <FormControl id={name} isRequired={required}>
        <FormLabel textAlign="center">{label}</FormLabel>
        <InputGroup>
          {iconName && (
            <InputLeftElement>{renderIcon(iconName)}</InputLeftElement>
          )}
          <Input
            type={passwordVisible ? "text" : "password"}
            name={name}
            value={value}
            minLength={minLength}
            maxLength={maxLength}
            onChange={onChange}
            placeholder={placeholder}
            ref={ref}
            {...rest}
          />
          <InputRightElement>
            {renderVisibilityIcon(passwordVisible, togglePasswordVisibility)}
          </InputRightElement>
        </InputGroup>
      </FormControl>
    );
  },
);

export { PasswordInputWithToggle };
