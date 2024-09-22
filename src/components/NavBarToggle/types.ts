import { MouseEventHandler } from "react";

export interface NavBarToggleProps {
  isOpen: boolean;
  onToggle: MouseEventHandler;
  onClick: () => void;
}
