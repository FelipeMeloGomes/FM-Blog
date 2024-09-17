import { ReactNode } from "react";

export interface ButtonConfig {
  text: string;
  icon: ReactNode;
  to?: string;
  onClick?: boolean;
}
