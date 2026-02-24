import { createBrowserRouter } from "react-router";
import { lazy } from "react";

import PublicRoutes from "./PublicRoute";
import PrivateRoutes from "./PrivateRoute";
import MainLayout from "../layouts";

// Lazy loaded pages (dynamic imports)
const Dashboard   = lazy(() => import("../features/dashboard/pages/Dashboard"));
const LoginPage   = lazy(() => import("../features/auth/pages/LoginPage"));
const SignupPage  = lazy(() => import("../features/auth/pages/SignupPage"));
const ProjectPage = lazy(() => import("../features/project/pages"));
const UsersPage   = lazy(() => import("../features/user/pages"));
const TaskPage    = lazy(() => import("../features/task/pages"));

const router = createBrowserRouter([
  // Public Routes
  {
    path: "/",
    Component: PublicRoutes,
    children: [
      { index: true, Component: LoginPage },     
      { path: "login", Component: LoginPage },  
      { path: "signup", Component: SignupPage },
    ],
  },

  // Private Routes
  {
    path: "/",
    Component: PrivateRoutes,
    children: [
      {
        path: "/",
        Component: MainLayout,
        children: [
          { path: "dashboard", Component: Dashboard },
          { path: "projects", Component: ProjectPage },
          { path: "tasks", Component: TaskPage },
          { path: "users", Component: UsersPage },
        ],
      },
    ],
  },
]);

export default router;