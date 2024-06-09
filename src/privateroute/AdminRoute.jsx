import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";

const AdminRoute = ({ children }) => {
  const { loading } = useContext(AuthContext);
  const [isAdmin, isLoading] = useAdmin();
  console.log(isAdmin);
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text"></span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text"></span>
      </div>
    );
  }

  if (isAdmin) {
    return children;
  }
  return <Navigate state={location.pathname} to="/login"></Navigate>;
};

export default AdminRoute;
