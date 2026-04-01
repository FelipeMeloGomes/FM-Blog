import type { FormFieldProps } from "../FormField/types";

export interface PasswordInputProps
  extends Omit<FormFieldProps, "icon" | "type" | "iconPosition" | "rightElement"> {
  showToggle?: boolean;
  toggleAriaLabel?: {
    show: string;
    hide: string;
  };
}
