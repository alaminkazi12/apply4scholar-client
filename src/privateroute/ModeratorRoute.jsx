import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import useModerator from "../hooks/useModerator";

const ModeratorRoute = ({ children }) => {
  const { loading } = useContext(AuthContext);
  const location = useLocation();
  const [isModerator, isLoading] = useModerator();

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

  if (isModerator) {
    return children;
  }
  return <Navigate state={location.pathname} to="/login"></Navigate>;
};

export default ModeratorRoute;
