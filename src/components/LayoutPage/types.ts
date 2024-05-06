import { ReactNode } from "react";

export interface LayoutPageProps {
    height?: string;
    minHeight?: string;
    textAlign?: 'left' | 'right' | 'center' | 'justify';
    margin?: string;
    children: ReactNode;
}
