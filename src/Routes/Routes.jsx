import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import DashboardLayout from "../Layouts/DashboardLayout";
import SignIn from "../Pages/SignIn";
import Signup from "../Pages/Signup";
import Home from "../Pages/Home";
import Error from "../Pages/Error";
import AddTask from "../Pages/AddTask";
import BrowseTask from "../Pages/BrowseTask";
import MyPostedTask from "../Pages/MyPostedTask";
import UpdateTask from "../Pages/UpdateTask";
import TaskDetails from "../Pages/TaskDetails";
import Overview from "../Pages/Dashboard/Overview";
import PrivateRoute from "./PrivateRoute";

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
        path: "browsetask",
        Component: BrowseTask
      },
      {
        path: "/task-details/:id",
        element: (
          <PrivateRoute>
            <TaskDetails />
          </PrivateRoute>
        )
      }
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Overview />
      },
      {
        path: "add-task",
        element: <AddTask />
      },
      {
        path: "my-posted-tasks",
        element: <MyPostedTask />
      },
      {
        path: "update-task/:id",
        element: <UpdateTask />
      }
    ]
  }
]);

export default router;
