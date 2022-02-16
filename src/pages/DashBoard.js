import React, { useState } from "react";
import styled from "styled-components";
import { FcSalesPerformance } from "react-icons/fc";
import { FiUsers } from "react-icons/fi";
import { useFirebaseContext } from "../context/firebase_context";
import { FaPizzaSlice } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { Oval } from "react-loader-spinner";
import { MdRestaurantMenu } from "react-icons/md";
import { AiFillDollarCircle } from "react-icons/ai";
const DashBoard = () => {
  const [orders, setOrders] = useState();
  const [customers, setCustomers] = useState();
  const { usersBusiness } = useFirebaseContext();
  const [showDash, setShowDash] = useState(false);
  const {
    category,
    close,
    deliveryfee,
    id,
    location,
    menu,
    name,
    number,
    open,
    query,
    type,
    icon,
    active,
  } = usersBusiness[0];
  return (
    <Wrapper>
      <div className={showDash ? "dash-menu show" : "dash-menu"}>
        <div className="user-menu">
          <p>Business Overwiev</p>
          <FiSettings className="set-icon" />
        </div>
        <div className="menu-btns">
          <button type="button">
            <MdRestaurantMenu /> Menu
          </button>
          <button
            type="button"
            style={{ display: "flex", alignItems: "center" }}
          >
            <FcSalesPerformance className="icon" /> <p>Orders</p>
          </button>
          <button type="button">
            <FiUsers /> Customers
          </button>
          <button type="button">
            <AiFillDollarCircle /> Billing
          </button>
        </div>
      </div>
      <FaBars className="bars" onClick={() => setShowDash(!showDash)} />
      <div
        className="sec sec-1"
        style={{ opacity: showDash && "0.1", cursor: showDash && "pointer" }}
        onClick={() => setShowDash(!showDash)}
      >
        <div className="store">
          <h1 style={{ marginLeft: "0.5rem" }}>{name}</h1>
          <h4 style={{ marginBottom: "1.6rem" }}>
            {icon} {type}
          </h4>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              fontSize: "0.9rem",
            }}
          >
            <p>Store: {id}</p>
            <p>Active: {active ? "👍" : "👎"}</p>
          </div>
        </div>
        <div className="stats">
          <div style={{ display: "flex", alignItems: "center" }}>
            <FcSalesPerformance className="icon" />
            <p>Orders</p>
          </div>
          <div className="orders">
            <h3>{orders ? "orders here" : "no data"}</h3>
          </div>
        </div>
        <div className="stats">
          <div style={{ display: "flex", alignItems: "center" }}>
            <FiUsers className="icon" style={{ color: "orange" }} />
            <p>Customers</p>
          </div>
          <div className="orders">
            <h3>{customers ? "customers here" : "no data"}</h3>
          </div>
        </div>
        <div className="stats">
          <div style={{ display: "flex", alignItems: "center" }}>
            <FaPizzaSlice className="icon" style={{ color: "orange" }} />
            <p>Popular items</p>
          </div>
          <div className="orders">
            <h3>{customers ? "customers here" : "no data"}</h3>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default DashBoard;
const Wrapper = styled.section`
  height: 100%;
  width: 100%;
  background: #f44336;
  position: relative;
  .sec-1 {
    color: white;
    height: 800px;
  }
  .stats {
    width: 80%;
    height: 200px;
    background: white;
    border-radius: 4px 4px;
    margin: 1rem auto;
  }
  .stats p {
    color: black;
    font-size: 0.9rem;
    border-bottom: 1px solid gray;
  }
  .icon {
    font-size: 1.3rem;
    margin: 0.5rem 0.5rem;
  }
  .orders {
    text-align: center;
  }
  .orders h3 {
    color: #f44336;
  }
  .store {
    text-align: center;
  }
  .bars {
    color: white;
    margin: 0.5rem 0.5rem;
    font-size: 1.2rem;
    cursor: pointer;
  }
  .dash-menu {
    position: fixed;
    width: 50vw;
    height: 100%;
    top: 0%;
    background: white;
    z-index: 99;
    transform: translateX(-100%);
    transition: all 0.3s linear;
  }
  .show {
    transform: translateX(0%);
  }
  .user-menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #f44336;
    color: white;
    height: 3rem;
    width: 96%;
    margin: 2rem auto;
  }
  .user-menu p {
    font-size: 0.9rem;
    margin-left: 2rem;
  }
  .set-icon {
    margin-right: 1rem;
    cursor: pointer;
  }
  .menu-btns {
    margin: 0 auto;
    height: 400px;
    width: 96%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .menu-btns button {
    border: none;
    color: #f44336;
    background: transparent;
    font-size: 1rem;
    font-weight: bold;
    margin: 0.7rem 0;
  }
`;
//
