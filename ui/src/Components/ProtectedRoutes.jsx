import { Outlet, Navigate } from "react-router-dom";
import useRefreshToken from "../Hooks/useRefreshToken";
import useAuth from "../Hooks/useAuth";

export default function ProtectedRoutes() {
  const { auth } = useAuth();
  const { refreshToken } = useRefreshToken();

  return auth?.user || refreshToken ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace={true} />
  );
}
