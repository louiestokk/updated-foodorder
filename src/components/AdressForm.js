import React, { useState, useRef } from "react";
import styled from "styled-components";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import emailjs from "@emailjs/browser";
import { init } from "@emailjs/browser";
init("user_a9rRSeZcRVhTLpSYxEfo8");

const AdressForm = ({ setActiveStep }) => {
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();
  };
  return (
    <Wrapper>
      <form onSubmit={sendEmail} ref={form}>
        <input type="text" name="name" required placeholder="Name" />
        <input type="text" name="address" required placeholder="Address" />
        <input type="text" name="area" placeholder="Area: ex: Paje" required />
        <input type="text" name="number" required placeholder="+255" />
        <button
          type="submit"
          onClick={() => {
            setActiveStep(1);
          }}
        >
          Next <MdKeyboardArrowRight className="icon" />
        </button>
      </form>
    </Wrapper>
  );
};

export default AdressForm;
const Wrapper = styled.div`
  background: white;
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 80%;
  }
  input {
    width: 300px;
    height: 1.6rem;
    margin-bottom: 0.4rem;
    border-radius: 5px 5px;
    border: 1px solid #f44336;
  }
  button {
    padding: 0.2rem;
    border-radius: 5px 5px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
