import React, { useState, useRef } from "react";
import styled from "styled-components";
import { FaPizzaSlice } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom";

const Connect = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    emailjs
      .sendForm(
        "service_4kw1opn",
        "template_xn7q61k",
        form.current,
        "user_vErATX9GYURJuxCrMM6NM"
      )
      .then(
        (result) => {
          if (result.text === "OK") {
            setLoading(false);
            setSent(true);
            setTimeout(() => {
              navigate("/");
            }, 15000);
          }
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  return (
    <Wrapper>
      <div className="top">
        <h1>Are you ready to start selling more? </h1>

        <p style={{ margin: "1rem 0" }}>- We handle the delivery -</p>
      </div>
      <div className="form-container">
        <h1
          style={{
            fontSize: sent ? "0" : "25rem",
            marginTop: "2rem",
            opacity: "0.6",
            color: "#f44336",
          }}
        >
          <FaPizzaSlice />
        </h1>
        {sent && (
          <div className="confirm">
            <h1>Thank you we have recived your information</h1>
            <p>
              We will sone confirm your account. You will recive an email when
              this is done. And then you can login to your account and add your
              menu etc and start selling.
            </p>
            <h3>God Luck From Us 👍</h3>
            <h3>ZanziFood 🍕</h3>
          </div>
        )}
        <form
          ref={form}
          onSubmit={sendEmail}
          style={{ display: sent && "none" }}
        >
          <h3 style={{ opacity: "0.7" }}>Join your business now</h3>
          <input type="text" name="business" placeholder="Business name" />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "0.75rem 0",
            }}
          >
            <label htmlFor="type">Type of business</label>
            <select name="type">
              <option value="Fast Food">Fast Food</option>
              <option value="Vegan">Vegan</option>
              <option value="Pizza">Pizza</option>
              <option value="Burgers">Burgers</option>
              <option value="Asian">Asian</option>
              <option value="Indian">Indian</option>
              <option value="Italian">Italian</option>
              <option value="African">African</option>
              <option value="BBQ">BBQ</option>
              <option value="Cafeteria ">Cafeteria </option>
              <option value="Bakery ">Bakery </option>
              <option value="Supermarket">Supermarket</option>
              <option value="Liquor">Liquor/Alkohol</option>
            </select>
          </div>
          <input type="text" name="name" placeholder="Name" />
          <input type="text" name="lname" placeholder="Last name" />
          <input type="text" name="number" placeholder="+255" />
          <input type="email" name="email" placeholder="name@mail.com" />
          <input type="text" name="address" placeholder="City example Paje" />
          <button type="submit" className="submit-btn">
            {loading ? "sending..." : "Send"}
          </button>
        </form>
      </div>
      <div className="works">
        <h3 style={{ marginTop: "1.4rem" }}>This is how its works!</h3>
        <div className="step">
          <h4>1 👩</h4>
          <p>The customer orders, pays and provides us with the adddress etc</p>
        </div>
        <div className="step">
          <h4>2 📲</h4>
          <p>You receive the order and prepare it for the pick-up time</p>
        </div>
        <div className="step">
          <h4>3 🛵</h4>
          <p>
            Our bid will reach you at the specified time and pick up the order.
            Then it is delivered directly to the customer!
          </p>
        </div>
        <div className="step">
          <h4>4 💵</h4>
          <p>
            After each week, you will receive payments for the orders you have
            received via ZanziFood
          </p>
        </div>
      </div>
    </Wrapper>
  );
};

export default Connect;
const Wrapper = styled.section`
  .top {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #f44336;
  }
  .top h1 {
    color: white;
    margin-top: 2rem;
    max-width: 300px;
    font-size: 1.8rem;
    text-align: center;
  }
  .top p {
    color: white;
  }
  .works {
    background: #f44336;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .step {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 0.7rem;
  }
  .step p {
    max-width: 300px;
    text-align: center;
    font-size: 0.8rem;
  }
  .form-container {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  form {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 999;
    background: white;
    height: 390px;
    width: 350px;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    border-radius: 4px 4px;
  }
  input {
    width: 240px;
    height: 1.8rem;
    border-radius: 4px 4px;
    border: none;
    border-bottom: 1px solid gray;
    margin-top: 0.5rem;
  }
  select {
    margin: rem 0;
    background: white;
    border: none;
    border: 1px solid #f44336;
    border-radius: 4px 4px;
    margin-top: 0.1rem;
    cursor: pointer;
  }
  .submit-btn {
    width: 5.2rem;
    height: 1.4rem;
    margin-top: 1rem;
    background: #f44336;
    color: white;
    border-radius: 4px 4px;
    font-size: 0.8rem;
  }
  .confirm {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 2rem 0;
    text-align: center;
  }
  .confirm h1,
  p {
    max-width: 340px;
  }
`;
