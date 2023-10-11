import { Navigate } from "react-router-dom";
import { routes } from "../../router/routes";

export function HomePage() {
  return (
    <Navigate to={routes.BOOKS()} />
  );
}
