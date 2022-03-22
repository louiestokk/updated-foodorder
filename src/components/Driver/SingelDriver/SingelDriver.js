import React, { useState, useRef, useEffect } from "react";
import "./SingelDriver.scss";
import { drivers } from "../../../utils/drivers";
import { useUserContext } from "../../../context/user_context";
import emailjs from "@emailjs/browser";
import { Link } from "react-router-dom";
import axios from "axios";

const SingelDriver = ({ orders, delivered, setDelivered }) => {
  const { user } = useUserContext();
  const [showDelivered, setShowDelivered] = useState(false);
  const [myActiveOrders, setMyActiveOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [driver, setDriver] = useState(
    drivers.filter((el) => el.email === user.email)
  );
  let activeorders = orders.filter((el) => el.picked !== true);
  const form = useRef();
  const [sent, setSent] = useState(false);
  const applyAsDriver = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_9wx2s0e",
        "template_cj67o8s",
        form.current,
        process.env.REACT_APP_EMAILJ_USER_ID
      )
      .then(
        (result) => {
          if (result.text === "OK") {
            setSent(!sent);
          }
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  console.log(activeorders);
  const fetchMyActiveOrders = async () => {
    try {
      const { data } = await axios(
        `http://localhost:3000/${driver[0].driverid}/`
      );
      setMyActiveOrders(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchMyActiveOrders();
  }, []);
  const handleTakeOrder = async (id, orderid) => {
    try {
      const orders = await axios(`http://localhost:3000/new_order/${id}/`);
      const driversorder = await axios.post(
        `http://localhost:3000/${driver[0].driverid}`,
        {
          orderid,
        }
      );
      const data = await axios.put(`http://localhost:3000/new_order/${id}/`, {
        ...orders.data,
        driver: driver,
        driveremail: user.email,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const orderDelivered = async (id) => {
    try {
      const orders = await axios(`http://localhost:3000/new_order/${id}/`);
      const data = await axios.put(`http://localhost:3000/new_order/${id}/`, {
        ...orders.data,
        delivered: true,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const fetchCompletedOrders = async () => {
    const { data } = await axios("http://localhost:3000/new_order");
    const mycompletedOrders = data.filter(
      (el) => el.delivered === true && el.driveremail === user.email
    );
    setCompletedOrders(mycompletedOrders);
  };
  useEffect(() => {
    fetchCompletedOrders();
  }, []);
  console.log(driver);
  return (
    <>
      {sent && (
        <div className="sent">
          <h1>Thank you for you request</h1>
          <p>
            You will sone get an email confirmation with login details and
            description of how it works.
          </p>
          <Link to="/">Back home</Link>
        </div>
      )}
      {!sent && (
        <div className="root">
          <h2 style={{ color: "white", marginBottom: "1rem" }}>
            Welcome {user.nickname}
          </h2>
          {driver.length > 0 ? (
            <div className="driver">
              <div className="orders">
                <h4 style={{ color: "black", marginBottom: "0.2rem" }}>
                  Orders
                </h4>
                {activeorders.map((ord) => {
                  const { id, orderid, order, storename, contact } = ord;
                  return (
                    <div
                      key={id}
                      className="singel-order"
                      style={{ display: ord.delivered && "none" }}
                    >
                      <h4>orderId: {orderid}</h4>
                      <h4>restaurants: {storename.map((el) => `${el}, `)}</h4>
                      <p>
                        <strong>Food</strong>:{" "}
                        {order.item.map((el) => `${el}, `)}
                      </p>
                      <div>
                        <h4>Customer</h4>
                        <p>
                          <strong>Name:</strong> {contact.name}
                        </p>
                        <p>
                          <strong>Address</strong> {contact.address},
                          <span> {contact.area}</span>
                        </p>

                        <p>
                          <strong>Phone:</strong> {contact.phone}
                        </p>
                        <p>
                          <strong>Hotel: </strong> {contact.hotel}
                        </p>
                        <p>
                          <strong>Message:</strong> {contact.explain}
                        </p>
                      </div>
                      {!ord.driver && (
                        <button
                          style={{ display: ord.driver && "none" }}
                          type="button"
                          onClick={(e) => {
                            handleTakeOrder(id, orderid);
                            setShowDelivered(!showDelivered);
                            e.target.style.display = "none";
                            fetchMyActiveOrders();
                          }}
                        >
                          Take order
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="my-act-ord">
                <h4>Your active orders</h4>

                <ul>
                  {myActiveOrders.map((el) => {
                    return (
                      <li key={el.id}>
                        {el.delivered !== true && (
                          <div>
                            {orders
                              .filter((or) => or.orderid === el.orderid)
                              .map((el) => {
                                const { orderid, storename, contact, id } = el;
                                return (
                                  <div
                                    key={orderid}
                                    style={{ display: el.delivered && "none" }}
                                  >
                                    <h4 style={{ color: "red" }}>{orderid}</h4>
                                    <p>{contact.name.toUpperCase()}</p>
                                    <p>{`${storename}, `}</p>
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        orderDelivered(id);
                                        e.target.style.display = "none";
                                      }}
                                    >
                                      Delivered
                                    </button>
                                  </div>
                                );
                              })}
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="my-act-ord">
                <h4>My completed orders</h4>
                <ul>
                  {completedOrders.map((el, ind) => {
                    return (
                      <li key={ind}>
                        {!el.deliverypaid && el.orderid}
                        {el.delivered && !el.deliverypaid && (
                          <span style={{ marginLeft: "0.2rem" }}>
                            Profit:
                            {el.storename.length === 1
                              ? `3000 tzsh`
                              : ` ${el.storename.length * 3000} tzsh`}
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          ) : (
            <div className="signup">
              <form ref={form}>
                <h2>Become a driver</h2>
                <h4>Enter your</h4>
                <input type="text" placeholder="Name" name="Name" required />
                <input type="text" placeholder="Number" name="Phone" required />
                <input
                  type="email"
                  value={user.email}
                  style={{ display: "none" }}
                  name="Email"
                />
                <select name="Area">
                  <option value="Your city">Your City</option>
                  <option value="Paje">Paje</option>
                  <option value="Jambiani">Jambiani</option>
                  <option value="Bvujue">Bvujue</option>
                </select>
                <select name="About">
                  <option value="motorbike">Motorbike</option>
                  <option value="bicyle">Bicyle</option>
                  <option value="car">car</option>
                </select>
                <button
                  type="submit"
                  onClick={applyAsDriver}
                  style={{
                    width: "8rem",
                    border: "1px solid white",
                    height: "1.6rem",
                  }}
                >
                  APPLY NOW
                </button>
              </form>

              <Link
                to="/"
                style={{
                  textDecoration: "none",
                  color: "white",
                  textAlign: "center",
                }}
              >
                <p> Back Home</p>
              </Link>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SingelDriver;
