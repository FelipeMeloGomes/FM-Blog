import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement> & VariantProps<typeof labelVariants>
>(({ className, htmlFor, ...props }, ref) => (
  // biome-ignore lint/a11y/noLabelWithoutControl: Label can be used with htmlFor or as wrapper
  <label ref={ref} htmlFor={htmlFor} className={cn(labelVariants(), className)} {...props} />
));
Label.displayName = "Label";

export { Label };
