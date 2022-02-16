import React, { useState, useEffect } from "react";
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
import { BsPlusSquareFill } from "react-icons/bs";
import { useProductsContext } from "../context/products_context";
import axios from "axios";
const DashBoard = () => {
  const { usersBusiness, orders, customers } = useFirebaseContext();
  const { products } = useProductsContext();
  const [showDash, setShowDash] = useState(false);
  const [showSett, setShowSett] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showNewItemInput, setShowNewItemInput] = useState(false);
  const [sent, setSent] = useState(false);

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
    address,
    days,
    offer,
    offerdate,
  } = usersBusiness[0];

  const [businessdata, setbusinessdata] = useState({
    bsname: name,
    phone: number,
    bsaddress: address,
    bsopen: open,
    bsclose: close,
    bsdays: days,
    bsoffer: offer,
    bsofferdate: offerdate,
    storeid: id,
  });
  const [createdNewItem, setCreatedNewItem] = useState({
    name: "",
    price: "",
    storeid: id,
  });
  const postData = async (url, data) => {
    try {
      const resp = await axios.post(url, data);
    } catch (error) {
      console.log(error);
    }
  };

  const handelAddMenuItem = (e) => {
    setShowNewItemInput(!showNewItemInput);
    postData("http://localhost:3000/new_items", createdNewItem);
    setSent(true);
    setTimeout(() => {
      setSent(false);
    }, 6000);
  };
  const bsProducts = products.filter((el) => menu.includes(el.id));

  useEffect(() => {
    document.querySelectorAll(".dashBtn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        setShowSett(false);
        if (e.target.textContent !== "Menu") {
          setShowMenu(false);
        }
      });
    });
  }, []);
  return (
    <Wrapper>
      <div className={showDash ? "dash-menu show" : "dash-menu"}>
        <div className="user-menu">
          <p>Business Overwiev</p>
          <FiSettings
            className="set-icon"
            onClick={() => {
              setShowSett(!showSett);
              setShowDash(!showDash);
            }}
          />
        </div>
        <div className="menu-btns">
          <button
            type="button"
            className="dashBtn"
            onClick={() => {
              setShowMenu(!showMenu);
              setShowDash(!showDash);
            }}
          >
            <MdRestaurantMenu /> Menu
          </button>
          <button
            type="button"
            className="dashBtn"
            style={{ display: "flex", alignItems: "center" }}
          >
            <FcSalesPerformance className="icon" /> <p>Orders</p>
          </button>
          <button type="button" className="dashBtn">
            <FiUsers /> Customers
          </button>
          <button type="button" className="dashBtn">
            <AiFillDollarCircle /> Billing
          </button>
        </div>
      </div>
      <FaBars className="bars" onClick={() => setShowDash(!showDash)} />
      <div
        className="sec sec-1"
        style={{ opacity: showDash && "0.1", cursor: showDash && "pointer" }}
        onClick={() => setShowDash(false)}
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
        <div className={showMenu ? "stats" : "stats hidden"}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <MdRestaurantMenu className="icon" style={{ color: "orange" }} />
              <p>Menu</p>
            </div>
            <BsPlusSquareFill
              style={{
                color: "orange",
                fontSize: "1.1rem",
                cursor: "pointer",
                marginRight: "0.5rem",
              }}
              onClick={() => setShowNewItemInput(!showNewItemInput)}
            />
          </div>
          {showNewItemInput && (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <input
                type="text"
                placeholder="name"
                value={createdNewItem.name}
                onChange={(e) =>
                  setCreatedNewItem({ ...createdNewItem, name: e.target.value })
                }
              />
              <input
                type="text"
                value={createdNewItem.price}
                placeholder="price in dollar"
                onChange={(e) =>
                  setCreatedNewItem({
                    ...createdNewItem,
                    price: e.target.value,
                  })
                }
              />
              <button
                type="button"
                style={{ background: "#f44336", color: "white" }}
                onClick={handelAddMenuItem}
              >
                add
              </button>
            </div>
          )}
          {sent && (
            <p style={{ color: "black" }}>
              Thank you. We have recived your new item. We will review and
              publish the item in 24h.{" "}
            </p>
          )}
          <div className="menu-container">
            {bsProducts.map((el) => {
              return (
                <div
                  key={el.id}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: "0.5rem",
                  }}
                >
                  <p
                    style={{
                      color: " #f44336",
                      border: "none",
                      marginLeft: "0.5rem",
                      fontSize: "0.75rem",
                    }}
                  >
                    {el.name}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <div className={showSett ? "stats" : "stats hidden"}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <FiSettings className="icon" style={{ color: "orange" }} />
              <p>Settings</p>
            </div>
            <button
              type="button"
              style={{
                position: "fixed",
                right: "12%",
                width: "3rem",
                borderRadius: "4px 4px",
                background: "#f44336",
                color: "white",
              }}
              onClick={() =>
                postData("http://localhost:3000/changes", businessdata)
              }
            >
              save
            </button>
          </div>
          <div className="orders">
            <form className="business-data-form">
              <div className="form-control">
                <label htmlFor="bsname">Name</label>
                <input
                  type="text"
                  name="bsname"
                  value={businessdata.bsname}
                  onChange={(e) =>
                    setbusinessdata({ ...businessdata, bsname: e.target.value })
                  }
                />
              </div>
              <div className="form-control">
                <label htmlFor="bsaddress">Address</label>
                <input
                  type="text"
                  name="bsaddress"
                  value={businessdata.bsaddress}
                  onChange={(e) =>
                    setbusinessdata({
                      ...businessdata,
                      bsaddress: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-control">
                <label htmlFor="bsaddress">Phone</label>
                <input
                  type="text"
                  name="bsphone"
                  value={businessdata.phone}
                  onChange={(e) =>
                    setbusinessdata({
                      ...businessdata,
                      phone: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-control">
                <label htmlFor="bsopen">Open at time</label>
                <input
                  type="text"
                  name="bsopen"
                  value={businessdata.bsopen}
                  onChange={(e) =>
                    setbusinessdata({
                      ...businessdata,
                      bsopen: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-control">
                <label htmlFor="bsclose">Close at time</label>
                <input
                  type="text"
                  name="bsclose"
                  value={businessdata.bsclose}
                  onChange={(e) =>
                    setbusinessdata({
                      ...businessdata,
                      bsclose: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-control">
                <label htmlFor="bsdays">Open days</label>
                <input
                  type="text"
                  name="bsdays"
                  value={businessdata.bsdays}
                  onChange={(e) =>
                    setbusinessdata({
                      ...businessdata,
                      bsdays: e.target.value,
                    })
                  }
                />
                <div className="form-control">
                  <label htmlFor="bsoffer">Deal / Offer</label>
                  <input
                    type="text"
                    name="bsoffer"
                    value={businessdata.bsoffer}
                    onChange={(e) =>
                      setbusinessdata({
                        ...businessdata,
                        bsoffer: e.target.value,
                      })
                    }
                  />
                  <div className="form-control">
                    <label htmlFor="bsofferdate">Deal/Offer date</label>
                    <input
                      type="text"
                      name="bsofferdate"
                      value={businessdata.bsofferdate}
                      onChange={(e) =>
                        setbusinessdata({
                          ...businessdata,
                          bsofferdate: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </form>
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
    height: 100%;
  }
  .stats {
    position: relative;
    width: 80%;
    height: 200px;
    background: white;
    border-radius: 4px 4px;
    margin: 1rem auto;
    overflow-y: scroll;
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
  .hidden {
    display: none;
  }
  .business-data-form {
    color: #f44336;
  }
  .form-control {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 0.5rem;
  }
  .form-control input {
    width: 80%;
    height: 1.4rem;
    border-radius: 5px 5px;
    border: 1px solid #f44336;
  }
  .menu-container {
    overflow-y: scroll;
  }
`;
//
