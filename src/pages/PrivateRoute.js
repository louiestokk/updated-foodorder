import React from "react";
import { getAuth } from "firebase/auth";
import { Navigate } from "react-router-dom";
const PrivateRoute = ({ children }) => {
  const auth = getAuth();
  return auth ? children : <Navigate to="/" />;
};

export default PrivateRoute;
