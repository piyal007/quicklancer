import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout
  },
]);

export default router;
