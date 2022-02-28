import React, { useState, useRef } from "react";
import "./SingelDriver.scss";
import { drivers } from "../../../utils/drivers";
import { useUserContext } from "../../../context/user_context";
import emailjs from "@emailjs/browser";
import { Link } from "react-router-dom";
const SingelDriver = ({ orders, delivered, setDelivered }) => {
  const { user } = useUserContext();
  const [driver, setDriver] = useState(
    drivers.filter((el) => el.email === user.email)
  );
  const activeorders = orders.filter((el) => el.picked !== true);
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
          {driver.length > 0 ? (
            <div className="driver">
              <h2 style={{ color: "black" }}>Welcome {user.nickname}</h2>
              <div>
                <h4>Active orders</h4>
                {activeorders.map((ord) => {
                  const { id, orderid, order, storename, contact } = ord;
                  return (
                    <div key={id} className="singel-order">
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
                      <button type="button">take order</button>
                    </div>
                  );
                })}
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
                <button type="submit" onClick={applyAsDriver}>
                  APPLY NOW
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SingelDriver;
