import React from "react";
import styled from "styled-components";
import { useProductsContext } from "../../context/products_context";
import { restaurants } from "../../utils/data";

const Filter = () => {
  const { setBusiness } = useProductsContext();

  const filterCategory = (e) => {
    const newBusiness = restaurants.filter((el) =>
      el.category.includes(e.target.innerText)
    );
    setBusiness(newBusiness);
  };

  const categories = Array.from(
    new Set([].concat(...restaurants.map((el) => el.category)))
  );

  return (
    <Wrapper>
      <div className="container">
        <div className="categories">
          {categories.map((el, ind) => {
            return (
              <button
                type="button"
                key={ind}
                className="cat-bt"
                onClick={filterCategory}
              >
                <p> {el}</p>
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
  width: 100%;
  .area {
    display: flex;
    margin-left: 1rem;
    padding: 0.3rem;
  }
  .categories {
    display: flex;
    overflow-x: scroll;
    width: 100%;
  }
  .container {
    margin: 1rem auto;
    height: 3rem;
    width: 100%;
    max-width: 700px;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    transition: all 0.3s linear;
  }
  .cat-btn {
    background: white;
    margin-right: 0.3rem;
    color: #f44336;
    letter-spacing: 1px;
    font-size: 0.9rem;
    text-align: center;
  }
  .loc-btn {
    border: none;
    background: transparent;
  }
  .cat-bt {
    background: white;
    border: none;
    color: #f44336;
  }
  p {
    width: 6rem;
  }
`;
