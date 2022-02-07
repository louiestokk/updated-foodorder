import React, { useEffect } from "react";
import styled from "styled-components";
import { AiFillCloseCircle } from "react-icons/ai";
import { useProductsContext } from "../context/products_context";
const Modal = () => {
  const {
    sides,
    handleAddToCart,
    cart,
    handleUpdateCartQty,
    modalOpen,
    setModalOpen,
  } = useProductsContext();

  return (
    <Wrapper
      className={modalOpen ? "modal show-modal" : "modal"}
      style={{ color: "black" }}
    >
      <AiFillCloseCircle
        onClick={() => setModalOpen(false)}
        className="close-btn"
      />
      <section className="modal-section">
        <div>
          <h4 className="title">Need topping?</h4>
          {sides.map((el) => {
            return (
              <div key={el.id} className="con">
                <p style={{ color: "black" }}>{el.name}</p>
                <div>
                  <span>${el.price.raw}</span>
                  <button
                    type="button"
                    onClick={() => handleAddToCart(el.id, 1)}
                  >
                    add 👍
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div>
          <h4 className="bag">Your Foodbag</h4>
          {cart.line_items.map((el) => {
            return (
              <div key={el.id}>
                <ul>
                  <li>
                    <p className="order-p">{el.name}</p>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <p className="order-p">${el.price.raw * el.quantity}</p>
                      <button
                        type="button"
                        className="btn"
                        onClick={() =>
                          handleUpdateCartQty(el.id, el.quantity - 1)
                        }
                      >
                        -
                      </button>
                      <p style={{ color: "black" }}>{el.quantity}</p>
                      <button
                        type="button"
                        className="btn"
                        onClick={() =>
                          handleUpdateCartQty(el.id, el.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
            );
          })}
        </div>
      </section>
      <div className="order-sum">
        <div>
          <h4>Total: ${cart.subtotal.raw}</h4>
          <p style={{ fontSize: "0.9rem" }}>
            Delivery Fee <strong>$2.5</strong>
          </p>
        </div>

        <button className="pay-btn">Pay ${cart.subtotal.raw + 2.5}</button>
      </div>
    </Wrapper>
  );
};

export default Modal;
const Wrapper = styled.div`
  position: relative;
  color: black;

  section {
    display: flex;
    justify-content: space-evenly;
    height: 100%;
  }
  .title {
    color: black;
    margin-top: 1rem;
    font-size: 1.1rem;
  }
  p {
    color: black;
  }
  .bag {
    color: black;
    margin-right: 1rem;
    margin-top: 1rem;
    font-size: 1.1rem;
  }
  button {
    background: #f44336;
    color: white;
    width: 4rem;
    height: 1.4rem;
    margin: 0 0.5rem;
    &:hover {
      border-radius: 5px 5px;
    }
  }
  .con {
    margin: 0.75rem 0;
  }
  .btn {
    width: 1.4rem;
    height: 1.4rem;
  }
  li {
    margin-top: 0.7rem;
  }
  .order-p {
    color: #f44336;
  }

  .order-sum h4 {
    color: black;
    margin-left: 0.5rem;
  }

  .order-sum p {
    color: black;
    margin-left: 0.5rem;
  }
  .order-sum {
    background: white;
    height: 160px;
    align-items: center;
    display: flex;
    justify-content: space-between;
  }
  .close-btn {
    position: absolute;
    top: 0%;
    left: 1%;
    font-size: 1.2rem;
    cursor: pointer;
  }
  .pay-btn {
    width: 8rem;
    height: 1.8rem;
    margin-right: 2rem;
  }
`;
