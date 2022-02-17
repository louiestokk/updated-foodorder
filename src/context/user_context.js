import React, { useState, UseEffect, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
  return (
    <UserContext.Provider
      value={{
        user,
        loginWithRedirect,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export const useUserContext = () => {
  return useContext(UserContext);
};
export { UserContext, UserProvider };
