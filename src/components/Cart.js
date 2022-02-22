import React, { useState, useEffect } from "react";
import { useProductsContext } from "../context/products_context";
import styled from "styled-components";
import Checkout from "../pages/Checkout";
import axios from "axios";
import { useUserContext } from "../context/user_context";
import { restaurants } from "../utils/data";
const Cart = () => {
  const orderId = Math.floor(Math.random() * 1000000);
  const { cart, products, sides, handleUpdateCartQty, handleAddToCart } =
    useProductsContext();
  const { loginWithRedirect, user, isAuthenticated } = useUserContext();
  const [showCheckout, setShowCheckout] = useState(false);

  //  get storeid and storename of cart items so when send order its marked in server with witch restaurant,id and email
  const test = products.filter((el) =>
    cart.line_items.map((el) => el.product_id).includes(el.id)
  );
  const test2 = [].concat(...test.map((el) => el.variant_groups));
  const test3 = [].concat(
    ...test2.map((el) => el.options.map((el) => +el.name))
  );

  const calculateDeliveryFee = () => {
    const restaurantsInCurrentOrder = restaurants
      .filter((el) => test3.includes(el.id))
      .map((rest) => rest.name);

    let deliveryfee = 2.5;

    if (restaurantsInCurrentOrder.length === 1) {
      deliveryfee = 2.5;
      return deliveryfee;
    }
    if (restaurantsInCurrentOrder.length === 2) {
      deliveryfee = 4;
      return deliveryfee;
    }
    if (restaurantsInCurrentOrder.length === 3) {
      deliveryfee = 6;
      return deliveryfee;
    }
    if (restaurantsInCurrentOrder.length > 3) {
      deliveryfee = 10;
      return deliveryfee;
    }
    return deliveryfee;
  };
  const [contact, setContact] = useState({
    name: "",
    address: "",
    area: "",
    phone: "",
    hotel: "none",
    explain: "none",
  });

  const sendOrderData = async () => {
    try {
      const resp = await axios.post("http://localhost:3000/new_order", {
        contact: {
          name: contact.name,
          address: contact.address,
          area: contact.area,
          hotel: contact.hotel,
          phone: contact.phone,
          email: user.email,
          explain: contact.explain,
        },
        orderid: orderId,
        productsids: cart.line_items.map((el) => el.product_id),
        order: {
          item: cart.line_items.map((el) => el.name),
          quan: cart.line_items.map((el) => el.quantity),
        },
        storeid: test3,
        storeemails: restaurants
          .filter((el) => test3.includes(el.id))
          .map((el) => el.email),
        storename: restaurants
          .filter((el) => test3.includes(el.id))
          .map((rest) => rest.name),
        amount: {
          order: cart.subtotal.raw,
          delivery_fee: 2.5,
        },
      });
    } catch (error) {
      console.log(error);
    }
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
        <p>Delivery Fee: ${calculateDeliveryFee()}</p>
        <h4>
          Total: ${cart.subtotal && cart.subtotal.raw + calculateDeliveryFee()}
        </h4>
        {user && user.sub ? (
          <button
            type="button"
            className="pay-btn"
            onClick={() => setShowCheckout(!showCheckout)}
          >
            Pay ${cart.subtotal && cart.subtotal.raw + calculateDeliveryFee()}
          </button>
        ) : (
          <button
            type="button"
            onClick={(e) => {
              loginWithRedirect();
              e.target.textContent = !isAuthenticated && "proccessing...";
            }}
            className="pay-btn"
          >
            Login
          </button>
        )}
      </div>
      {showCheckout && (
        <Checkout
          sendOrderData={sendOrderData}
          setContact={setContact}
          contact={contact}
          orderId={orderId}
          calculateDeliveryFee={calculateDeliveryFee}
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
