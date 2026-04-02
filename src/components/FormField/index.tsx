import { type ReactNode, forwardRef } from "react";
import { cn } from "../../lib/utils";
import type { InputProps } from "../ui/input";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export interface FormFieldProps extends Omit<InputProps, "id" | "name"> {
  label: string;
  name: string;
  error?: string;
  hint?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  rightElement?: ReactNode;
  containerClassName?: string;
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  (
    {
      label,
      name,
      error,
      hint,
      icon,
      iconPosition = "left",
      rightElement,
      containerClassName,
      className,
      required,
      ...props
    },
    ref
  ) => {
    const inputId = name;

    return (
      <div className={cn("space-y-2", containerClassName)}>
        <Label htmlFor={inputId} className={cn("text-sm font-medium", error && "text-destructive")}>
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>

        <div className="relative">
          {icon && iconPosition === "left" && (
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground">
              {icon}
            </div>
          )}

          <Input
            ref={ref}
            id={inputId}
            name={name}
            className={cn(
              icon && iconPosition === "left" && "pl-10",
              icon && iconPosition === "right" && "pr-10",
              rightElement && "pr-10",
              error && "border-destructive focus-visible:ring-destructive/30",
              className
            )}
            required={required}
            {...props}
          />

          {icon && iconPosition === "right" && (
            <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-muted-foreground">
              {icon}
            </div>
          )}

          {rightElement && (
            <div className="absolute inset-y-0 right-0 flex items-center">{rightElement}</div>
          )}
        </div>

        {error && (
          <p className="text-sm text-destructive flex items-center gap-1" role="alert">
            <span className="w-1 h-1 rounded-full bg-destructive" />
            {error}
          </p>
        )}

        {hint && !error && <p className="text-sm text-muted-foreground">{hint}</p>}
      </div>
    );
  }
);

FormField.displayName = "FormField";

export { FormField };
