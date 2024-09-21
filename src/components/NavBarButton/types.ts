import { ReactElement } from "react";
import { To } from "react-router-dom";

export interface NavButtonProps {
  text?: string;
  icon?: ReactElement;
  to?: To;
  onClick?: () => void;
}
