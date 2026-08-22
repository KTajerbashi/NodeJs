import { Navigate, Outlet, useLocation } from "react-router-dom";
import authService from "../services/authService";

function ProtectedRoute() {
  const location = useLocation();

  const token = authService.getAccessToken();

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
