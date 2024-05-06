// Hooks
import { useContext, createContext } from "react";
import { AuthContextType, AuthProviderProps, AuthValue } from "./type";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children, value }: AuthProviderProps) => {
    return (
        <AuthContext.Provider value={{ authValue: value }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthValue = (): AuthValue => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuthValue must be used within an AuthProvider");
    }
    return context.authValue;
};
