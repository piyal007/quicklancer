import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import SignIn from "../Pages/SignIn";
import Home from "../Pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: "/signin",
        Component: SignIn
      }
    ]
  },
]);

export default router;
