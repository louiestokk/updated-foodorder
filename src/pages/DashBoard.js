import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FcSalesPerformance } from "react-icons/fc";
import { FiUsers } from "react-icons/fi";
import { useUserContext } from "../context/user_context";
import { BiDollar } from "react-icons/bi";
import { FaBars } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { MdRestaurantMenu } from "react-icons/md";
import { AiFillDollarCircle } from "react-icons/ai";
import { BsPlusSquareFill } from "react-icons/bs";
import { MdFastfood } from "react-icons/md";
import { useProductsContext } from "../context/products_context";
import axios from "axios";
import { restaurants } from "../utils/data";
const DashBoard = () => {
  const { usersBusiness, logout, user } = useUserContext();
  const { products } = useProductsContext();
  const [showDash, setShowDash] = useState(false);
  const [showSett, setShowSett] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showBilling, setShowBilling] = useState(false);
  const [showNewItemInput, setShowNewItemInput] = useState(false);
  const [sent, setSent] = useState(false);
  const [myOrders, setMyOrders] = useState([]);

  const form = useRef();
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
        if (e.target.textContent !== "Billing") {
          setShowBilling(false);
        }
        if (e.target.textContent === "Orders") {
          setShowDash(false);
        }
      });
    });
  }, []);

  const fecthOrders = async () => {
    try {
      const { data } = await axios("http://localhost:3000/new_order");
      setMyOrders(data.filter((el) => el.storeemails.includes(user.email)));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fecthOrders();
  }, []);
  // för varje order behöver jag kolla vilken han e hans och räkna ut priset så skall lägg ain i ordern produkt id så att sen så kan jag filterar på id från ordern och kunden menu
  const firstArray = [].concat(...myOrders.map((el) => el.productsids));
  const secondArray = restaurants
    .filter((el) => el.email === user.email)
    .map((el) => el.menu);
  // length på nedan ger antal i en array med produktid
  const allmyorderditemsid = firstArray.filter((el) =>
    secondArray[0].includes(el)
  );
  // nedan ger summan på  i en array
  const pricefortheitem = products
    .filter((el) => allmyorderditemsid.includes(el.id))
    .map((el) => el.price.raw);
  const myTotal = pricefortheitem.map(
    (el) => el * allmyorderditemsid.length
  )[0];
  const changeOrderStatus = async (id) => {
    try {
      const data = await axios.put(`http://localhost:3000/new_order/${id}/`, {
        picked: true,
      });
    } catch (error) {
      console.log(error);
    }
  };
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
          <button
            type="button"
            className="dashBtn"
            onClick={() => setShowDash(!showDash)}
          >
            <FiUsers /> Customers
          </button>
          <button
            type="button"
            className="dashBtn"
            onClick={() => {
              setShowDash(!showDash);
              setShowBilling(!showBilling);
            }}
          >
            <AiFillDollarCircle /> Billing
          </button>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <FaBars className="bars" onClick={() => setShowDash(!showDash)} />
        <button
          onClick={() => logout({ returnTo: window.location.origin })}
          type="button"
          style={{
            margin: "0.5rem 0.5rem",
            background: "transparent",
            color: "white",
            borderBottom: "1px solid white",
          }}
        >
          Logout
        </button>
      </div>
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
            <form className="business-data-form" ref={form}>
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
        {showBilling && (
          <div className="stats">
            <div style={{ display: "flex", alignItems: "center" }}>
              <BiDollar className="icon" style={{ color: "orange" }} />
              <p>Billing</p>
            </div>
            <div className="billing">
              <h4 style={{ color: "black" }}>Total sales: ${myTotal}</h4>
            </div>
          </div>
        )}
        <div className="stats">
          <div style={{ display: "flex", alignItems: "center" }}>
            <FcSalesPerformance className="icon" />
            <p>Orders</p>
          </div>
          <div className="orders">
            <h3>
              {myOrders ? (
                <div className="my-orders">
                  {myOrders.map((el) => {
                    const { amount, contact, order, orderid, id } = el;

                    return (
                      <div key={orderid} className="singel-my-order">
                        <h4>OrderId: {orderid}</h4>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            fontSize: "0.8rem",
                          }}
                        >
                          <h5>Name: {contact.name}</h5>
                          <h5>Address: {contact.address}</h5>
                          <h5>Phone: {contact.phone}</h5>
                          <h5>Email: {contact.email}</h5>
                          <h5 style={{ color: "black" }}>
                            Restaurant: {el.storename.map((el) => `${el}, `)}
                          </h5>
                          <h5>Items: {order.item}</h5>
                          <h5>Quantity: {order.quan}</h5>
                        </div>
                        <div className="singel-order-btn">
                          <button type="button">Cancel order</button>
                          <button
                            type="button"
                            onClick={() => changeOrderStatus(id)}
                          >
                            <MdFastfood /> Delivered
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                "no data"
              )}
            </h3>
          </div>
        </div>
        <div className="stats">
          <div style={{ display: "flex", alignItems: "center" }}>
            <FiUsers className="icon" style={{ color: "orange" }} />
            <p>Customers</p>
          </div>
          <div className="orders">
            {myOrders.length > 0 ? (
              <div className="my-customers">
                {myOrders.map((el) => {
                  const { name, email, phone } = el.contact;
                  return (
                    <div key={el.orderid} className="singel-customer">
                      <h4>Name: {name}</h4>
                      <p>Number: {phone}</p>
                      <p>Email: {email}</p>
                      <h4>Orders: {el.orderid}</h4>
                    </div>
                  );
                })}
              </div>
            ) : (
              "no data"
            )}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default DashBoard;
const Wrapper = styled.section`
  height: 900px;
  width: 100%;
  margin-bottom: 2rem;
  background: #f44336;
  position: relative;
  .sec-1 {
    color: white;
    height: 100%;
  }
  .stats {
    position: relative;
    width: 80%;
    height: 240px;
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
  .singel-my-order {
    border: 1px solid #f44336;
    width: 280px;
    margin: 0 0.3rem;
  }
  .singel-order-btn {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
  .singel-order-btn button {
    width: 6rem;
    height: 1.1rem;
    border: none;
    bordder-radius: 4px 4px;
    background: #f44336;
    color: white;
    margin-top: 1rem;
    margin-right: 0.1rem;
    margin-left: 0.1rem;
    border-radius: 4px 4px;
  }
  .my-orders {
    display: flex;
    overflow-x: scroll;
  }
  .my-customers {
    display: flex;
    overflow-x: scroll;
    width: 100%;
  }
  .singel-customer h4 {
    color: #f44336;
  }
  .singel-customer p {
    border: none;
    font-size: 0.8rem;
  }
  .singel-customer {
    border: 1px solid #f44336;
    margin: 0.2rem 0.2rem;
    width: 100%;
  }
  .singel-customer:hover {
    border: 3px solid #f44336;
  }
  .singel-my-order:hover {
    border: 3px solid #f44336;
  }
`;
//
