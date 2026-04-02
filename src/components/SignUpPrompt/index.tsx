import { Link as RouterLink } from "react-router-dom";
import type { SignUpPromptProps } from "./types";

const SignUpPrompt = ({ message, linkText, linkUrl }: SignUpPromptProps) => (
  <div>
    <p className="text-center text-sm text-muted-foreground">
      {message}{" "}
      <RouterLink
        to={linkUrl}
        className="text-primary font-medium hover:underline underline-offset-4"
      >
        {linkText}
      </RouterLink>
    </p>
  </div>
);

export { SignUpPrompt };
