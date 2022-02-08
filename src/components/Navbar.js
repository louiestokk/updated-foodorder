import React from "react";
import { FaUserAlt } from "react-icons/fa";
import { Badge, IconButton } from "@material-ui/core";
import { ShoppingBasket } from "@material-ui/icons";
import { Link } from "@material-ui/core";
import { useUserContext } from "../context/user_context";
import { useProductsContext } from "../context/products_context";
import styled from "styled-components";
const Navbar = () => {
  const { user, loginWithRedirect, logout } = useUserContext();
  const { cart, modalOpen, setModalOpen } = useProductsContext();

  return (
    <Wrapper>
      <h1 style={{ marginLeft: "1rem" }}>ZanziFood 🍕</h1>
      <div style={{ display: "flex", alignItems: "center" }}>
        <button onClick={() => setModalOpen(true)}>
          <Badge badgeContent={cart.total_items} style={{ color: "white" }}>
            <ShoppingBasket
              style={{ color: "white" }}
              onClick={() => setModalOpen(true)}
            />
          </Badge>
        </button>
        {!user && (
          <button onClick={loginWithRedirect} type="button">
            <span
              style={{ fontSize: "0.8rem", borderBottom: "1px solid white" }}
            >
              Login
            </span>
          </button>
        )}
        {user && (
          <div className="circle">
            <FaUserAlt style={{ fontSize: "0.7rem" }} />
            <h4>{user.nickname}</h4>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default Navbar;
const Wrapper = styled.nav`
  button {
    background: transparent;
    color: white;
    margin-right: 1rem;
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
`;
