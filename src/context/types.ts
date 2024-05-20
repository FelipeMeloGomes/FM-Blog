import { ReactNode } from "react";

export interface AuthValue {
    isAuthenticated?: boolean;
    user?: string;
}

export interface AuthContextType {
    authValue: AuthValue;
}

export interface AuthProviderProps {
    children: ReactNode;
    value: AuthValue;
}
