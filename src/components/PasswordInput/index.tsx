import { forwardRef, useState } from "react";
import { FiEye, FiEyeOff, FiLock } from "react-icons/fi";
import { FormField } from "../FormField";
import type { FormFieldProps } from "../FormField/types";
import { Button } from "../ui/button";

export interface PasswordInputProps
  extends Omit<FormFieldProps, "icon" | "type" | "iconPosition" | "rightElement"> {
  showToggle?: boolean;
  toggleAriaLabel?: {
    show: string;
    hide: string;
  };
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      label,
      name,
      error,
      hint,
      showToggle = true,
      toggleAriaLabel = { show: "Mostrar senha", hide: "Ocultar senha" },
      containerClassName,
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible((prev) => !prev);

    return (
      <FormField
        ref={ref}
        type={isVisible ? "text" : "password"}
        label={label}
        name={name}
        error={error}
        hint={hint}
        icon={<FiLock />}
        containerClassName={containerClassName}
        rightElement={
          showToggle ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-full px-2 hover:bg-transparent text-muted-foreground hover:text-foreground transition-colors"
              onClick={toggleVisibility}
              aria-label={isVisible ? toggleAriaLabel.hide : toggleAriaLabel.show}
            >
              {isVisible ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </Button>
          ) : undefined
        }
        {...props}
      />
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
