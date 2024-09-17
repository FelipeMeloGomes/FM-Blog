import { ReactNode } from "react";

export interface NavButtonProps {
  text: string;
  icon: ReactNode;
  to?: string;
  onClick?: () => void;
}
