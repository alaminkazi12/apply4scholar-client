import { createBrowserRouter } from "react-router-dom";
import Root from "../Root";
import Home from "../pages/Home/Home";
import ScholershipDetails from "../pages/ScholershopDetails/ScholershipDetails";
import Login from "../pages/Auth/Login";
import SignUp from "../pages/Auth/SignUp";
import AllScholarships from "../pages/AllScholarship/AllScholarships";
import Dashboard from "../dashboard/Dashboard";
import MyProfile from "../pages/Profiles/MyProfile";
import UpdateProfile from "../pages/Profiles/UpdateProfile";
import AddScholarship from "../dashboard/pages/AddScholarship/AddScholarship";
import ManageScholarships from "../dashboard/pages/ManageScholarship/ManageScholarships";
import ManageReview from "../dashboard/pages/ManageReviews/ManageReview";
import ManageUsers from "../dashboard/pages/ManageUsers/ManageUsers";
import AllAppliesScholarships from "../dashboard/pages/AllAppliedScholarships/AllAppliesScholarships";
import AllReviews from "../dashboard/pages/AllReviews/AllReviews";
import MyApplication from "../dashboard/pages/MyApplication/MyApplication";
import MyReviews from "../dashboard/pages/MyReviews/MyReviews";
import DashRoot from "../dashboard/DashRoot";
import Payment from "../pages/Payment/Payment";
import PrivateRouter from "../privateroute/PrivateRouter";

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
        element: (
          <PrivateRouter>
            <ScholershipDetails></ScholershipDetails>
          </PrivateRouter>
        ),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/all-scholarsips",
        element: <AllScholarships></AllScholarships>,
      },
      {
        path: "/payment/:id",
        element: (
          <PrivateRouter>
            <Payment></Payment>
          </PrivateRouter>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashRoot></DashRoot>,
    children: [
      {
        path: "/dashboard/home",
        element: <Dashboard></Dashboard>,
      },
      {
        path: "/dashboard/profile",
        element: <MyProfile></MyProfile>,
      },
      {
        path: "/dashboard/update-profile",
        element: <UpdateProfile></UpdateProfile>,
      },
      {
        path: "/dashboard/add-scholarship",
        element: <AddScholarship></AddScholarship>,
      },
      {
        path: "/dashboard/manage-scholarship",
        element: <ManageScholarships></ManageScholarships>,
      },
      {
        path: "/dashboard/manage-reviews",
        element: <ManageReview></ManageReview>,
      },
      {
        path: "/dashboard/manage-users",
        element: <ManageUsers></ManageUsers>,
      },
      {
        path: "/dashboard/all-applied-scholarship",
        element: <AllAppliesScholarships></AllAppliesScholarships>,
      },
      {
        path: "/dashboard/all-reviews",
        element: <AllReviews></AllReviews>,
      },
      {
        path: "/dashboard/my-application",
        element: <MyApplication></MyApplication>,
      },
      {
        path: "/dashboard/my-reviews",
        element: <MyReviews></MyReviews>,
      },
    ],
  },
]);

export default router;
