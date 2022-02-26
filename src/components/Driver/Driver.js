import React, { useEffect } from "react";
import { useUserContext } from "../../context/user_context";
import "./Driver.scss";
import { useNavigate } from "react-router-dom";
const Driver = () => {
  const { user, loginWithRedirect, isAuthenticated } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    isAuthenticated && navigate(`/delivery/${user.nickname}`);
  }, [user]);
  return (
    <div className="root">
      <h2>Welcome rider</h2>
      <button type="button" onClick={loginWithRedirect}>
        Login
      </button>
    </div>
  );
};

export default Driver;
