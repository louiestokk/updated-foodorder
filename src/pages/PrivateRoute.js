import React from "react";

import { Navigate } from "react-router-dom";
import { useUserContext } from "../context/user_context";
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useUserContext();
  return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;
