import { createBrowserRouter } from "react-router-dom";
import Root from "../Root";
import Home from "../pages/Home/Home";
import ScholershipDetails from "../pages/ScholershopDetails/ScholershipDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/scholarship/:id",
        element: <ScholershipDetails></ScholershipDetails>,
      },
    ],
  },
]);

export default router;
