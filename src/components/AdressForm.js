import React, { useRef } from "react";
import styled from "styled-components";
import { MdKeyboardArrowRight } from "react-icons/md";

const AdressForm = ({ setActiveStep, contact, setContact }) => {
  const form = useRef();

  return (
    <Wrapper>
      <form ref={form}>
        <input
          type="text"
          name="name"
          required
          placeholder="Name"
          onChange={(e) => setContact({ ...contact, name: e.target.value })}
        />
        <input
          type="text"
          name="address"
          required
          placeholder="Address"
          onChange={(e) => setContact({ ...contact, address: e.target.value })}
        />
        <input
          type="text"
          name="hotel"
          placeholder="(Optional) Hotel Name"
          onChange={(e) => setContact({ ...contact, hotel: e.target.value })}
        />
        <input
          type="text"
          name="area"
          placeholder="Area: ex: Paje"
          required
          onChange={(e) => setContact({ ...contact, area: e.target.value })}
        />
        <input
          type="text"
          name="number"
          required
          placeholder="+255"
          onChange={(e) => setContact({ ...contact, phone: e.target.value })}
        />
        <input
          type="text"
          name="explain"
          placeholder="(Optional)  Explain for us where you are"
          onChange={(e) => setContact({ ...contact, explain: e.target.value })}
        />
        <button
          type="submit"
          onClick={(e) => {
            setActiveStep(1);
            e.preventDefault();
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
  margin-bottom: 2rem;
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
    background: #f44336;
    color: white;
  }
`;
