import * as React from "react";
import { cn } from "../../lib/utils";

const Tag = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { variant?: "default" | "secondary" | "outline" }
>(({ className, variant = "default", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
      {
        "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80":
          variant === "default",
        "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80":
          variant === "secondary",
        "text-foreground": variant === "outline",
      },
      className
    )}
    {...props}
  />
));
Tag.displayName = "Tag";

const TagLabel = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span ref={ref} className={cn("text-sm", className)} {...props} />
  )
);
TagLabel.displayName = "TagLabel";

const TagCloseButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "ml-1 inline-flex h-4 w-4 items-center justify-center rounded-full outline-none focus:ring-2",
      className
    )}
    {...props}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label="Fechar"
    >
      <title>Fechar</title>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  </button>
));
TagCloseButton.displayName = "TagCloseButton";

export { Tag, TagLabel, TagCloseButton };
