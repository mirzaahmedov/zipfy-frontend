import { createBrowserRouter } from "react-router-dom";

import MainLayout from "./layout/main";
import AuthLayout from "./layout/auth";
import Home from "./pages/home";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
]);

export default router;
