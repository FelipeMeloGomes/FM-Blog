import { forwardRef } from "react";
import { FaEye as EyeIcon, FaEyeSlash as SlashIcon } from "react-icons/fa";
import { FiLock } from "react-icons/fi";
import { Button } from "../Button";
import { Input } from "../Input";
import { Label } from "../Label";
import type { PasswordInputProps } from "./types";

const PasswordInputWithToggle = forwardRef<HTMLInputElement, PasswordInputProps>(
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
    ref
  ) => (
    <div className="space-y-2">
      <Label htmlFor={name}>
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10 text-muted-foreground">
          <FiLock />
        </div>
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
          className="pl-10 pr-10"
          required={required}
          {...rest}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
          onClick={togglePasswordVisibility}
          aria-label={passwordVisible ? "Ocultar senha" : "Mostrar senha"}
        >
          {passwordVisible ? <EyeIcon /> : <SlashIcon />}
        </Button>
      </div>
    </div>
  )
);

export { PasswordInputWithToggle };
