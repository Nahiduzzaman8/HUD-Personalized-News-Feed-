import { Navigate } from "react-router-dom";
import { isTokenExpired } from "../utils/auth";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // If no token or token is expired, clear storage and redirect
  if (isTokenExpired(token)) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
