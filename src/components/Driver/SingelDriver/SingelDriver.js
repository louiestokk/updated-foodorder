import React, { useState, useRef } from "react";
import "./SingelDriver.scss";
import { drivers } from "../../../utils/drivers";
import { useUserContext } from "../../../context/user_context";
import emailjs from "@emailjs/browser";
const SingelDriver = ({ orders, delivered, setDelivered }) => {
  const { user } = useUserContext();
  const [driver, setDriver] = useState(
    drivers.filter((el) => el.email === user.email)
  );
  const form = useRef();

  const applyAsDriver = () => {
    emailjs
      .sendForm(
        "service_4kw1opn",
        "template_h32mvfs",
        form.current,
        process.env.REACT_APP_EMAILJ_USER_ID
      )
      .then(
        (result) => {
          if (result.text === "OK") {
            console.log("email sent");
          }
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  return (
    <div>
      {driver.length > 0 ? (
        <div className="driver">
          <h2 style={{ color: "black" }}>Welcome {user.nickname}</h2>
        </div>
      ) : (
        <div className="signup">
          <form ref={form}>
            <h3>Become a driver</h3>
            <h4>Enter your</h4>
            <input type="text" placeholder="Name" name="Name" required />
            <input type="text" placeholder="Number" name="Number" required />
            <input
              type="email"
              value={user.email}
              style={{ display: "none" }}
              name="Email"
            />
            <select name="Area">
              <option value="Your city">Your City</option>
              <option value="Paje">Paje</option>
              <option value="Jambiani">Paje</option>
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
  );
};

export default SingelDriver;
