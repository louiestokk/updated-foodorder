import React from "react";
import { getAuth } from "firebase/auth";
import { Navigate } from "react-router-dom";
import { useUserContext } from "../context/user_context";
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useUserContext();
  const auth = getAuth();
  return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;
