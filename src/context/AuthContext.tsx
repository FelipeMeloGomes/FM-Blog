import { useContext, createContext } from "react";
import { AuthContextType, AuthProviderProps, AuthValue } from "./types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children, value }: AuthProviderProps) => {
  return (
    <AuthContext.Provider value={{ authValue: value }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthValue = (): AuthValue | undefined => {
  const context = useContext(AuthContext);
  return context?.authValue;
};
