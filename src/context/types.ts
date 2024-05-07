import { User } from "firebase/auth";
import { ReactNode } from "react";

export interface AuthValue {
    isAuthenticated?: boolean;
    user?: User | null;
}

export interface AuthContextType {
    authValue: AuthValue;
}

export interface AuthProviderProps {
    children: ReactNode;
    value: AuthValue;
}
