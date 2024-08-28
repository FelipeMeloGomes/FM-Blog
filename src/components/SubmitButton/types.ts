import { ReactNode } from "react";
export interface SubmitButtonProps {
    children: ReactNode;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    alt?: string;
}
