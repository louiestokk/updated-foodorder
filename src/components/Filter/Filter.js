import React from "react";
import styled from "styled-components";
import { useProductsContext } from "../../context/products_context";
import { restaurants } from "../../utils/data";

const Filter = () => {
  const { setBusiness } = useProductsContext();

  const filterCategory = (e) => {
    console.log(e.target.textContent);
    const newBusiness = restaurants.filter((el) =>
      el.category.includes(e.target.textContent)
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
    aling-items: center;
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
    border-radius: 5px 5px;
    margin-right: 0.2rem;
    color: #f44336;
    letter-spacing: 1px;
    width: 6rem;
    padding: 0.3rem;
    font-size: 0.9rem;
  }
  .loc-btn {
    border: none;
    background: transparent;
  }
`;
