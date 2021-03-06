import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useUserContext } from "../context/user_context";
import { FiUser } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import axios from "axios";
import { BallTriangle } from "react-loader-spinner";
const UserPage = () => {
  const { user, logout } = useUserContext();
  const [orders, setOrders] = useState([]);
  const [userOrders, setUsersOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const { data } = await axios("http://localhost:3000/new_order");
      setOrders(data);
      setUsersOrders(
        data.filter((el) => el.contact.email.includes(user.email))
      );
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <Wrapper>
      <div className="info">
        <h4>
          <FiUser /> {user.name}
        </h4>
        <h4>
          <HiOutlineMail /> {user.email}
        </h4>
      </div>
      {loading && <BallTriangle />}
      {!loading && (
        <div className="order">
          <h4>Your orders</h4>
          {userOrders.map((item, ind) => {
            const {
              amount,
              contact,
              order,
              orderid,
              storeemails,
              storeid,
              storename,
              picked,
              delivered,
              driver,
            } = item;

            return (
              <div key={ind} className="singel-order">
                <h4>Order: {orderid}</h4>
                <p>
                  <span>Restaurants:</span> {storename.map((el) => `${el}, `)}
                </p>
                <p>
                  <span>Items:</span> {order.item.map((el) => `${el}, `)}
                </p>
                <p>
                  <span>Quantity:</span> {order.quan}
                </p>
                <p>
                  <span>Deliver to:</span> {contact.address} in {contact.area}
                </p>
                {!delivered && (
                  <>
                    <h4 style={{ display: "flex", alignItems: "center" }}>
                      Delivery status:
                      <p
                        style={{
                          color: "green",
                          marginLeft: "0.2rem",
                          display: delivered && "none",
                        }}
                      >
                        {picked ? "Picked up by delivery" : "The chef prepares"}
                      </p>
                    </h4>
                  </>
                )}
                {delivered && (
                  <div>
                    <p>
                      Orderstatus:{" "}
                      <span style={{ color: "green", fontWeight: "bold" }}>
                        Delivered
                      </span>
                    </p>
                  </div>
                )}
                <div>
                  <h4>Driver: {driver ? "" : <span>info coming sone</span>}</h4>
                  {driver &&
                    driver.map((person) => {
                      const { driverid, email, name, whatsup, number } = person;
                      return (
                        <div key={driverid} className="driver">
                          <p style={{ fontWeight: "bold" }}>Name: {name}</p>
                          <a href={`tel:${whatsup}`}>Whatsup: {whatsup}</a>
                          <a href={`tel:${number}`}>Number: {whatsup}</a>
                          <a href={`mailto:${email}`}>Email: {email}</a>
                        </div>
                      );
                    })}
                </div>
              </div>
            );
          })}
        </div>
      )}
      <button
        className="logout-btn"
        type="button"
        onClick={() => logout({ returnTo: window.location.origin })}
      >
        Logout
      </button>
    </Wrapper>
  );
};

export default UserPage;
const Wrapper = styled.section`
  background: #f44336;
  height: 600px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;

  .info {
    text-transform: capitalize;
    text-align: center;
    margin-bottom: 2rem;
  }
  .order {
    width: 90%;
    background: white;
    color: #f44336;
    height: 380px;
    border-radius: 4px 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: scroll;
  }
  .logout-btn {
    margin-top: 1rem;
    border: none;
    border-radius: 4px 4px;
    width: 5rem;
    height: 1.4rem;
    background: white;
    color: #f44336;
  }
  .order p {
    font-size: 0.8rem;
  }
  .order span {
    color: black;
    font-size: 0.8rem;
  }
  .singel-order {
    margin-bottom: 0.5rem;
    margin-top: 0.5rem;
    border-bottom: 1px solid #f44336;
  }
  .singel-order p {
    max-width: 200px;
  }
  .driver {
    margin-top: 0.2rem;
  }
`;
