import { Link as RouterLink } from "react-router-dom";
import type { NavButtonProps } from "./types";

const NavButton = ({ text, icon, to, onClick }: NavButtonProps) => {
  return to ? (
    <RouterLink
      to={to}
      className="flex items-center gap-2 text-[#e0e0e0] hover:text-blue-500 font-semibold text-lg md:text-xl"
    >
      {icon}
      {text}
    </RouterLink>
  ) : (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 text-blue-400 hover:text-blue-500 font-semibold text-lg md:text-xl"
    >
      {icon}
      {text}
    </button>
  );
};

export { NavButton };
