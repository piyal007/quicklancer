import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import SignIn from "../Pages/SignIn";
import Signup from "../Pages/Signup";
import Home from "../Pages/Home";
import Error from "../Pages/Error";
import AddTask from "../Pages/AddTask";
import BrowseTask from "../Pages/BrowseTask";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <Error />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "signin",
        Component: SignIn,
      },
      {
        path: "signup",
        Component: Signup,
      },
      {
        path: "addtask",
        Component: AddTask
      },
      {
        path: "browsetask",
        Component: BrowseTask
      },
    ],
  },
]);

export default router;
