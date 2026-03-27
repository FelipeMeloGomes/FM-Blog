import { Navigate } from "react-router-dom";
import { useAuthState } from "../../hooks/useAuthState";

interface PublicRouteProps {
  children: React.ReactNode;
}

export function PublicRoute({ children }: PublicRouteProps) {
  const user = useAuthState();

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
