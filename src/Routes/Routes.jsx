import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import SignIn from "../Pages/SignIn";
import Signup from "../Pages/Signup";
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
      },
      {
        path: "/signup",
        Component: Signup
      }
    ]
  },
]);

export default router;
