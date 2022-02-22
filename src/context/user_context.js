import React, { useState, useContext, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { restaurants } from "../utils/data";

const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
  const [usersBusiness, setUsersBusiness] = useState([]);

  return (
    <UserContext.Provider
      value={{
        user,
        loginWithRedirect,
        logout,
        isAuthenticated,
        usersBusiness,
        setUsersBusiness,
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
