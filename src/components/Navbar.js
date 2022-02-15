import React from "react";
import { Badge } from "@material-ui/core";
import { ShoppingBasket } from "@material-ui/icons";
import { useLocation } from "react-router-dom";
import { useProductsContext } from "../context/products_context";
import styled from "styled-components";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Navbar = ({ signIn, logedinUser, loading, usersBusiness }) => {
  const auth = getAuth();
  const navigate = useNavigate();
  const { cart, setModalOpen } = useProductsContext();
  const location = useLocation();

  return (
    <Wrapper>
      <h1
        style={{ marginLeft: "1rem", cursor: "pointer" }}
        onClick={() => navigate("/")}
      >
        ZanziFood 🍕
      </h1>
      {usersBusiness.length > 0 && (
        <Link
          to={`/dashboard/${
            logedinUser.displayName && logedinUser.reloadUserInfo.localId
          }`}
        >
          Dashboard
        </Link>
      )}
      <div style={{ display: "flex", alignItems: "center" }}>
        {
          <button onClick={() => navigate("/cart")}>
            <Badge badgeContent={cart.total_items} style={{ color: "white" }}>
              <ShoppingBasket style={{ color: "white" }} />
            </Badge>
          </button>
        }

        {!logedinUser.displayName && (
          <button onClick={signIn} type="button">
            <span
              style={{ fontSize: "0.8rem", borderBottom: "1px solid white" }}
            >
              {loading ? "proccessing..." : "Login"}
            </span>
          </button>
        )}
        {logedinUser.displayName && (
          <div
            className="circle"
            onClick={() => {
              signOut(auth)
                .then(() => {
                  navigate(0);
                })
                .catch((error) => {
                  // An error happened.
                });
            }}
          >
            <span
              style={{ fontSize: "0.8rem", borderBottom: "1px solid white" }}
            >
              {loading ? "proccessing..." : "Logout"}
            </span>
            <h4>{logedinUser.displayName}</h4>
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
`;
