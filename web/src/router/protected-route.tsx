import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/auth";
import { routes } from "./routes";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { auth } = useAuth();
  if (!auth) {
    return (
      <Navigate to={routes.LOGIN()} />
    );
  }
  return children;
};
