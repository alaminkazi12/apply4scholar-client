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
import ManageAppliedScholarship from "../dashboard/pages/ManageAppliedScholarShip/ManageAppliedScholarship";
import AdminRoute from "../privateroute/AdminRoute";
import SharedRoute from "../privateroute/SharedRoute";

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
    element: (
      <PrivateRouter>
        <DashRoot></DashRoot>
      </PrivateRouter>
    ),
    children: [
      {
        path: "/dashboard/home",
        element: (
          <PrivateRouter>
            <Dashboard></Dashboard>
          </PrivateRouter>
        ),
      },
      {
        path: "/dashboard/profile",
        element: (
          <PrivateRouter>
            <MyProfile></MyProfile>
          </PrivateRouter>
        ),
      },
      {
        path: "/dashboard/update-profile",
        element: (
          <PrivateRouter>
            <UpdateProfile></UpdateProfile>
          </PrivateRouter>
        ),
      },
      {
        path: "/dashboard/add-scholarship",
        element: (
          <PrivateRouter>
            <SharedRoute>
              <AddScholarship></AddScholarship>
            </SharedRoute>
          </PrivateRouter>
        ),
      },
      {
        path: "/dashboard/manage-scholarship",
        element: (
          <PrivateRouter>
            <SharedRoute>
              <ManageScholarships></ManageScholarships>
            </SharedRoute>
          </PrivateRouter>
        ),
      },
      {
        path: "/dashboard/manage-reviews",
        element: (
          <PrivateRouter>
            <AdminRoute>
              <ManageReview></ManageReview>
            </AdminRoute>
          </PrivateRouter>
        ),
      },
      {
        path: "/dashboard/manage-users",
        element: (
          <PrivateRouter>
            <AdminRoute>
              <ManageUsers></ManageUsers>
            </AdminRoute>
          </PrivateRouter>
        ),
      },
      {
        path: "/dashboard/all-applied-scholarship",
        element: (
          <PrivateRouter>
            <AllAppliesScholarships></AllAppliesScholarships>
          </PrivateRouter>
        ),
      },
      {
        path: "/dashboard/manage-applied-scholarship",
        element: (
          <PrivateRouter>
            <SharedRoute>
              <ManageAppliedScholarship></ManageAppliedScholarship>
            </SharedRoute>
          </PrivateRouter>
        ),
      },
      {
        path: "/dashboard/all-reviews",
        element: (
          <PrivateRouter>
            <SharedRoute>
              <AllReviews></AllReviews>
            </SharedRoute>
          </PrivateRouter>
        ),
      },
      {
        path: "/dashboard/my-application",
        element: (
          <PrivateRouter>
            <MyApplication></MyApplication>
          </PrivateRouter>
        ),
      },
      {
        path: "/dashboard/my-reviews",
        element: (
          <PrivateRouter>
            <MyReviews></MyReviews>
          </PrivateRouter>
        ),
      },
    ],
  },
]);

export default router;
