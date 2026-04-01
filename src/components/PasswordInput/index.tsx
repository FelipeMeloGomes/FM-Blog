import { forwardRef, useState } from "react";
import { FiLock } from "react-icons/fi";
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
              className="h-full px-3 hover:bg-transparent"
              onClick={toggleVisibility}
              aria-label={isVisible ? toggleAriaLabel.hide : toggleAriaLabel.show}
            >
              {isVisible ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <title>Ocultar senha</title>
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <title>Mostrar senha</title>
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
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
