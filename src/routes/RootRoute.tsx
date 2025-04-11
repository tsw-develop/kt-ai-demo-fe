import { createBrowserRouter, Outlet } from "react-router-dom";

import { Sidebar } from "@/components/Sidebar";
import { RegisterPage } from "@/pages/RegisterPage";
import { SessionPage } from "@/pages/SessionPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="flex bg-[#F3F4F5]">
        <Sidebar />
        <Outlet />
      </div>
    ),
    children: [
      {
        index: true,
        element: <RegisterPage />,
      },
      // {
      //   path: "/1",
      //   element: <Main />,
      // },
      {
        path: "/onboarding",
        element: <SessionPage />,
      },
    ],
  },
]);

export default router;
