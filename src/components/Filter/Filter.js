import React, { useState } from "react";
import styled from "styled-components";
import { FaBars } from "react-icons/fa";
import { useProductsContext } from "../../context/products_context";
import { restaurants } from "../../utils/data";
const Filter = () => {
  const [showLocation, setShowLocation] = useState(false);
  const { setBusiness } = useProductsContext();
  const filterCategory = (e) => {
    setBusiness(
      restaurants.filter((el) => el.category.includes(e.target.innerText))
    );
  };
  const filterLocation = (e) => {
    const newBusinness = restaurants.filter(
      (el) => el.location === e.target.textContent
    );
    setBusiness(newBusinness);
  };
  const categories = Array.from(
    new Set([].concat(...restaurants.map((el) => el.category)))
  );

  return (
    <Wrapper>
      <div className="container">
        <div className="area">
          <h4 style={{ color: "white" }}>Area</h4>
          <div
            style={{
              display: "flex",
              marginLeft: "1rem",
              alignItems: "center",
              color: "white",
            }}
          >
            <p style={{ cursor: "pointer" }}>
              <FaBars onClick={() => setShowLocation(!showLocation)} />
            </p>
            <p
              style={{
                marginBottom: "0.2rem",
                fontSize: "0.7rem",
                marginLeft: "0.2rem",
              }}
            >
              Select from list
            </p>
          </div>
        </div>

        {Array.from(new Set(restaurants.map((el) => el.location))).map(
          (el, ind) => {
            return (
              <button
                type="button"
                key={ind}
                className="loc-btn"
                style={{
                  color: "white",
                  textTransform: "capitalize",
                  marginLeft: "1.2rem",
                  display: showLocation ? "block" : "none",
                }}
                onClick={filterLocation}
              >
                {el}
              </button>
            );
          }
        )}
        <div className="categories">
          {categories.map((el, ind) => {
            return (
              <button
                type="button"
                key={ind}
                className="cat-btn"
                onClick={filterCategory}
              >
                {el}
              </button>
            );
          })}
        </div>
      </div>
      <h2
        style={{
          margin: "1.2rem auto",
          textAlign: "center",
          borderBottom: "1px solid black",
          maxWidth: "9rem",
        }}
      >
        Restaurants
      </h2>
    </Wrapper>
  );
};

export default Filter;
const Wrapper = styled.div`
  .area {
    display: flex;
    margin-left: 1rem;
    padding: 0.3rem;
  }
  .categories {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
    flex-wrap: wrap;
  }
  .container {
    margin: 1rem auto;
    background: #f44336;
    height: 200px;
    width: 96%;
    max-width: 700px;
    border-radius: 5px 5px;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    overflow-y: scroll;
    transition: all 0.3s linear;
  }
  .cat-btn {
    background: white;
    width: 7rem;
    height: 1.8rem;
    border-radius: 5px 5px;
    margin-top: 0.1rem;
    margin-right: 0.2rem;
    color: #f44336;
    letter-spacing: 1px;
  }
  .loc-btn {
    border: none;
    background: transparent;
  }
`;
