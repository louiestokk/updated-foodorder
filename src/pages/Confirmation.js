import React, { useEffect, useRef, useState } from "react";
import { useUserContext } from "../context/user_context";
import { useProductsContext } from "../context/products_context";
import axios from "axios";
import { restaurants } from "../utils/data";
import emailjs from "@emailjs/browser";
import { useDispatch, useSelector } from "react-redux";
import { addOrder, getAddress } from "../redux-toolkit/order/orderSlice";
const Confimration = () => {
  const dispatch = useDispatch();
  const { cart, products } = useProductsContext();
  const { contact, user } = useUserContext();
  const userAddress = useSelector(getAddress);

  const [order, setOrder] = useState(
    cart?.line_items?.map((el) => `${el.name}, ${el.quantity}`)
  );
  const form = useRef();

  const orderId = Math.floor(Math.random() * 1000000);
  const test = products.filter((el) =>
    cart.line_items.map((el) => el.product_id).includes(el.id)
  );
  const test2 = [].concat(...test.map((el) => el.variant_groups));
  const test3 = [].concat(
    ...test2.map((el) => el.options.map((el) => +el.name))
  );
  const orderData = {
    contact: {
      name: contact.name,
      address: contact.address,
      area: contact.area,
      hotel: contact.hotel,
      phone: contact.phone,
      email: user?.email,
      explain: contact.explain,
    },
    orderid: orderId,
    picked: false,
    delivered: false,
    productsids: cart?.line_items?.map((el) => el.product_id),
    order: {
      item: cart?.line_items?.map((el) => el.name),
      quan: cart?.line_items?.map((el) => el.quantity),
    },
    storeid: test3,
    storeemails: restaurants
      .filter((el) => test3.includes(el.id))
      .map((el) => el.email),
    storename: restaurants
      .filter((el) => test3.includes(el.id))
      .map((rest) => rest.name),
    amount: {
      order: cart?.subtotal?.raw,
      delivery_fee: 2.5,
    },
  };
  const sendOrderData = async () => {
    try {
      const resp = await axios.post(
        "http://localhost:3000/new_order",
        orderData
      );
      dispatch(addOrder(orderData));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    sendOrderData();
  }, []);

  const sendEmail = () => {
    emailjs
      .sendForm(
        "service_4kw1opn",
        "template_h32mvfs",
        form.current,
        process.env.REACT_APP_EMAILJ_USER_ID_2
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
  useEffect(() => {
    sendEmail();
  }, []);
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
  return (
    <div>
      <h4 style={{ margin: "1rem auto" }}>Order Conformation </h4>
      <div className="form-cont">
        <form ref={form} style={{ display: "none" }}>
          <input type="text" value={contact.name} name="name" />
          <input type="text" value={contact.phone} name="number" />
          <input type="text" value={user.email} name="email" />
          <input type="text" value={userAddress} name="address" />
          <input type="text" value={order} name="items" />
          <input
            type="text"
            value={`$${cart.subtotal.raw + calculateDeliveryFee()}`}
            name="price"
          />
        </form>
      </div>
      <section
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div>
          <h4>Order</h4>
          {cart.line_items.map((el) => {
            return (
              <div style={{ display: "flex", alignItems: "center" }}>
                <h4 style={{ marginRight: "0.3rem" }}>{el.name}</h4>
                <p>{el.quantity} pcs</p>
              </div>
            );
          })}
          <p>Paid: ${cart.subtotal.raw + calculateDeliveryFee()}</p>
        </div>
        <div style={{ marginTop: "1rem" }}>
          <h4>Contact</h4>
          <p>{contact.name}</p>
          <p>{contact.phone}</p>
          <p>{userAddress}</p>
          <p>{user.email}</p>
        </div>
      </section>
    </div>
  );
};

export default Confimration;
