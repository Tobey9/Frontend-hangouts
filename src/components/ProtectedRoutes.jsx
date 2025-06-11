// components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../stateContext/stateContext";

const ProtectedRoute = ({ children }) => {
  const { authState } = useContext(AuthContext);

  if (authState.status === false) {
    return <Navigate to="/main" replace />;
  }

  return children;
};

export default ProtectedRoute;
