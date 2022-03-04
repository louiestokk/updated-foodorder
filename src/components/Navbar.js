import React, { useState, useEffect } from "react";
import { Badge } from "@material-ui/core";
import { ShoppingBasket } from "@material-ui/icons";
import { useProductsContext } from "../context/products_context";
import styled from "styled-components";

import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import { useUserContext } from "../context/user_context";
import { restaurants } from "../utils/data";
const Navbar = () => {
  const navigate = useNavigate();
  const loaction = useLocation();
  const { cart, setModalOpen } = useProductsContext();
  const {
    loginWithRedirect,
    logout,
    user,
    isAuthenticated,
    usersBusiness,
    setUsersBusiness,
  } = useUserContext();
  // const { signIn, logedinUser, loading, usersBusiness } = useFirebaseContext();
  useEffect(() => {
    if (user) {
      setUsersBusiness(restaurants.filter((el) => el.loid === user.sub));
    }
  }, [user]);
  return (
    <Wrapper>
      <h1
        style={{ marginLeft: "1rem", cursor: "pointer" }}
        onClick={() => navigate("/")}
        className="logo"
      >
        ZanziFood 🍕
      </h1>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          onClick={() => navigate("/cart")}
          style={{ marginRight: "0.3rem" }}
        >
          <Badge badgeContent={cart.total_items}>
            <ShoppingBasket style={{ color: "white" }} />
          </Badge>
        </div>

        {!isAuthenticated && (
          <button
            onClick={(e) => {
              loginWithRedirect();
              e.target.textContent = !isAuthenticated && "proccessing...";
            }}
            type="button"
          >
            <span
              style={{
                fontSize: "0.8rem",
                borderBottom: "1px solid white",
              }}
            >
              Login
            </span>
          </button>
        )}
        {isAuthenticated && usersBusiness.length > 0 && (
          <div className="account-menu">
            <div>
              <Link to={`/dashboard/${user.sub}`}>Dashboard</Link>
            </div>
          </div>
        )}
        {isAuthenticated && !usersBusiness.length > 0 && (
          <Link to={`/mydashboard/${user.nickname}`}>Account</Link>
        )}
      </div>
    </Wrapper>
  );
};

export default Navbar;
const Wrapper = styled.nav`
  position: relative;
  button {
    background: transparent;
    color: white;
  }
  span {
    font-size: 0.7rem;
    margin-left: 0.2rem;
  }

  h4 {
    font-size: 0.7rem;
  }
  .circle {
    margin-right: 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
  }
  .circle:hover {
    border-bottom: 1px solid white;
  }
  .user {
    position: fixed;
    right: 0;
    top: 16%;
    color: red;
  }
  a {
    margin: 0rem 0.75rem;
    color: white;
    font-size: 0.9rem;
    font-family: "Righteous", cursive;
    border: 1px solid white;
    padding: 0.3rem;
    border-radius: 4px 4px;
  }
  a:hover {
  }

  .logout {
    margin-right: 0.5rem;
    cursor: pointer;
    &:hover {
      border-bottom: 1px solid white;
    }
  }
  @media screen and (max-width: 500px) {
    .logo {
      font-size: 1.8rem;
    }
    .cart-btn {
      font-size: 0.8rem;
    }
  }
`;
