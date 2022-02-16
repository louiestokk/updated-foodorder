import React, { useState } from "react";
import { useProductsContext } from "../context/products_context";
import styled from "styled-components";
import Checkout from "../pages/Checkout";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import { useFirebaseContext } from "../context/firebase_context";

const Cart = () => {
  const { cart, sides, handleUpdateCartQty, handleAddToCart } =
    useProductsContext();
  const { signIn, logedinUser, loading, usersBusiness } = useFirebaseContext();
  const [showCheckout, setShowCheckout] = useState(false);
  const [contact, setContact] = useState({
    name: "",
    address: "",
    area: "",
    phone: "",
    hotel: "none",
    explain: "none",
  });
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "zanzifood-98826.firebaseapp.com",
    databaseURL: "https://zanzifood-98826-default-rtdb.firebaseio.com",
    projectId: "zanzifood-98826",
    storageBucket: "zanzifood-98826.appspot.com",
    messagingSenderId: "554696686395",
    appId: "1:554696686395:web:dcadb3237dfc66e673951e",
    measurementId: "G-PGJTLMRSXM",
  };

  const app = initializeApp(firebaseConfig);
  const sendOrderData = () => {
    const db = getDatabase();
    set(ref(db, "new_order"), {
      contact: {
        name: contact.name,
        address: contact.address,
        area: contact.area,
        hotel: contact.hotel,
        phone: contact.phone,
        email: logedinUser.email,
        explain: contact.explain,
      },
      order: cart.line_items,
      amount: {
        order: cart.subtotal.raw,
        delivery_fee: 2.5,
      },
    });
  };
  return (
    <Wrapper>
      <div className="cart">
        <div className="sec sec-1">
          <h2 style={{ marginLeft: "0.5rem" }}>Your Food Bag</h2>
          {cart.line_items &&
            cart.line_items.map((el) => {
              return (
                <div key={el.id} className="cart-item">
                  <h4 style={{ marginBottom: "0.2rem" }}>{el.name}</h4>
                  <div className="cart-btn">
                    <p>Quantity: </p>
                    <button
                      type="button"
                      onClick={() =>
                        handleUpdateCartQty(el.id, el.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <span>{el.quantity}</span>
                    <button
                      type="button"
                      onClick={() =>
                        handleUpdateCartQty(el.id, el.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="sec sec-2">
          <h2>You need?</h2>
          {sides.map((el) => {
            return (
              <div key={el.id} className="cart-item">
                <h4>{el.name}</h4>
                <div style={{ display: "flex" }}>
                  <p className="price">${el.price.raw}</p>
                  <button
                    type="button"
                    className="add-btn"
                    onClick={() => handleAddToCart(el.id, 1)}
                  >
                    add 👍
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="sum">
        <p>Food: ${cart.subtotal && cart.subtotal.raw}</p>
        <p>Delivery Fee: ${2.5}</p>
        <h4>Total: ${cart.subtotal && cart.subtotal.raw + 2.5}</h4>
        {logedinUser.displayName ? (
          <button
            type="button"
            className="pay-btn"
            onClick={() => setShowCheckout(!showCheckout)}
          >
            Pay ${cart.subtotal.raw + 2.5}
          </button>
        ) : (
          <button type="button" onClick={signIn} className="pay-btn">
            {loading ? "proccessing..." : "Login"}
          </button>
        )}
      </div>
      {showCheckout && (
        <Checkout
          logedinUser={logedinUser}
          sendOrderData={sendOrderData}
          setContact={setContact}
          contact={contact}
        />
      )}
    </Wrapper>
  );
};

export default Cart;
const Wrapper = styled.section`
  height: 100%;
  width: 100%;
  .cart-item {
    display: flex;
    flex-direction: column;
  }
  .cart {
    display: flex;
    justify-content: space-evenly;
  }
  .cart-item {
    margin-top: 1rem;
    margin-left: 0.5rem;
  }
  .cart-btn {
    display: flex;
    align-items: center;
  }
  .cart-btn p {
    font-size: 0.8rem;
    margin-right: 0.5rem;
  }
  .cart-btn span {
    font-size: 0.8rem;
    margin: 0 0.5rem;
  }
  .cart-btn button {
    width: 1.6rem;
    background: #f44336;
    color: white;
    border-radius: 4px 4px;
  }
  .add-btn {
    width: 3rem;
    background: #f44336;
    color: white;
    border-radius: 4px 4px;
  }
  .price {
    font-size: 0.8rem;
    margin-right: 0.5rem;
  }
  .sum {
    margin-left: 0.5rem;
  }
  .pay-btn {
    background: #f44336;
    color: white;
    border-radius: 4px 4px;
    width: 7rem;
    height: 1.8rem;
    margin: 1rem 0;
  }
  @media screen and (max-width: 500px) {
    h2 {
      font-size: 1rem;
    }
    .cart-item h4 {
      font-size: 0.8rem;
    }
    .price {
      font-size: 0.8rem;
    }
  }
`;
