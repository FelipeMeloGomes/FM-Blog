import { To } from "react-router-dom";

export interface ButtonConfig {
  text: string;
  to?: To;
  onClick?: () => void;
  disabled?: boolean;
}
