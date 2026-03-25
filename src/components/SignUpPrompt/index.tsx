import { Link as RouterLink } from "react-router-dom";
import type { SignUpPromptProps } from "./types";

const SignUpPrompt = ({ message, linkText, linkUrl }: SignUpPromptProps) => (
  <div>
    <p className="text-center text-sm text-black my-1">
      {message}{" "}
      <RouterLink to={linkUrl} className="text-black font-medium hover:underline">
        {linkText}
      </RouterLink>
    </p>
  </div>
);

export { SignUpPrompt };
