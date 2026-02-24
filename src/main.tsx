import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import router from "./routes/Router";

createRoot(document.getElementById("root")!).render(
  <>
    <Suspense fallback={<div className="p-6 text-sm text-slate-400">Loading...</div>}>
      <ToastContainer position="bottom-right" />
      <RouterProvider router={router} />
    </Suspense>
  </>
);