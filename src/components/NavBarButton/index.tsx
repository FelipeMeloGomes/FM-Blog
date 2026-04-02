import { Link as RouterLink } from "react-router-dom";
import type { NavButtonProps } from "./types";

const NavButton = ({ text, icon, to, onClick }: NavButtonProps) => {
  return to ? (
    <RouterLink
      to={to}
      className="flex items-center gap-2 text-foreground/70 hover:text-foreground font-medium transition-colors"
    >
      {icon}
      {text}
    </RouterLink>
  ) : (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 text-foreground/70 hover:text-foreground font-medium transition-colors"
    >
      {icon}
      {text}
    </button>
  );
};

export { NavButton };
