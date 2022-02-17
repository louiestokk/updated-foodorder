import React from "react";
import { Badge } from "@material-ui/core";
import { ShoppingBasket } from "@material-ui/icons";
import { useProductsContext } from "../context/products_context";
import styled from "styled-components";
import { getAuth, signInWithRedirect, signOut } from "firebase/auth";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useFirebaseContext } from "../context/firebase_context";
import { useUserContext } from "../context/user_context";
const Navbar = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const loaction = useLocation();
  const { cart, setModalOpen } = useProductsContext();
  const { loginWithRedirect, logout, user, isAuthenticated } = useUserContext();
  const { signIn, logedinUser, loading, usersBusiness } = useFirebaseContext();
  console.log(user.sub);
  console.log(isAuthenticated);
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
        {
          <button onClick={() => navigate("/cart")}>
            <Badge badgeContent={cart.total_items}>
              <ShoppingBasket style={{ color: "white" }} />
            </Badge>
          </button>
        }

        {!logedinUser.displayName && (
          <button onClick={loginWithRedirect} type="button">
            <span
              style={{ fontSize: "0.8rem", borderBottom: "1px solid white" }}
            >
              {loading ? "proccessing..." : "Login"}
            </span>
          </button>
        )}
        {logedinUser.displayName && (
          <div className="account-menu">
            {usersBusiness.length > 0 ? (
              <div>
                <Link to={`/dashboard/${logedinUser.reloadUserInfo.localId}`}>
                  Dashboard
                </Link>
              </div>
            ) : (
              <h4 className="logout" onClick={logout}>
                Logout
              </h4>
            )}
          </div>
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
  a {
    margin-right: 0.5rem;
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
