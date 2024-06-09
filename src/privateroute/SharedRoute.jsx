import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";
import useModerator from "../hooks/useModerator";
import useAdmin from "../hooks/useAdmin";

const SharedRoute = ({ children }) => {
  const { loading } = useContext(AuthContext);
  const location = useLocation();
  const [isModerator, isLoading] = useModerator();
  const [isAdmin] = useAdmin();

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

  if (isModerator || isAdmin) {
    return children;
  }
  return <Navigate state={location.pathname} to="/login"></Navigate>;
};

export default SharedRoute;
