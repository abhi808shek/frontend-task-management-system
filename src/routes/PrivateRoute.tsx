import { Navigate, Outlet, useLocation } from "react-router";

const PrivateRoutes = () => {
  const location = useLocation();

  const token = localStorage.getItem("access_token");
  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return <Outlet />;
};

export default PrivateRoutes;