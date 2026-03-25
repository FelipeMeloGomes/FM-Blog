import { FiMenu, FiX } from "react-icons/fi";
import type { NavBarToggleProps } from "./types";

const NavBarMenuToggle = ({ isOpen, onToggle }: NavBarToggleProps) => (
  <button
    type="button"
    onClick={onToggle}
    aria-label="Toggle Navigation"
    className="md:hidden p-2 rounded-md hover:bg-gray-100 text-gray-600"
  >
    {isOpen ? <FiX /> : <FiMenu />}
  </button>
);

export { NavBarMenuToggle };
