import type { ReactElement } from "react";
import type { To } from "react-router-dom";

export interface NavButtonProps {
  text?: string;
  icon?: ReactElement;
  to?: To;
  onClick?: () => void;
}
