import { Navigate, Outlet } from "react-router";

const PublicRoutes = () => {
  const token = localStorage.getItem("access_token");
  const role  = localStorage.getItem("role");

  // Already logged in → redirect based on role
  if (token) {
    if (role === "admin") return <Navigate to="/dashboard" replace />;
    if (role === "manager") return <Navigate to="/projects" replace />;

    return <Navigate to="/tasks" replace />; // fallback
  }

  // Not logged in → allow public pages
  return <Outlet />;
};

export default PublicRoutes;