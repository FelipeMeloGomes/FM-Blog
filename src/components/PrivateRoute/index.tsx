import { Navigate } from "react-router-dom";
import { useAuthState } from "../../hooks/useAuthState";

interface PrivateRouteProps {
  children: React.ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const user = useAuthState();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
