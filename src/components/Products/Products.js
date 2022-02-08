import React, { useState } from "react";
import styled from "styled-components";
import { FaBars } from "react-icons/fa";
import { useProductsContext } from "../../context/products_context";
import Modal from "../Modal";
const Products = () => {
  const {
    products,
    categories,
    sides,
    handleAddToCart,
    modalOpen,
    setModalOpen,
    fetchProducts,
  } = useProductsContext();

  return (
    <Wrapper className={modalOpen ? "open back" : "back"}>
      <div className="container">
        <div className="area">
          <h4>Area</h4>
          <div
            style={{
              display: "flex",
              marginLeft: "1rem",
              alignItems: "center",
              color: "white",
            }}
          >
            <p style={{ cursor: "pointer" }}>
              <FaBars />
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
        <div className="categories">
          {categories.map((el, ind) => {
            return (
              <button
                type="button"
                key={ind}
                className="cat-btn"
                onClick={() => fetchProducts(el)}
              >
                {el}
              </button>
            );
          })}
        </div>
      </div>
      <h2
        style={{
          margin: "0 auto",
          textAlign: "center",
          borderBottom: "1px solid black",
          maxWidth: "4rem",
        }}
      >
        Food
      </h2>
      <div className="products">
        {products.map((product) => {
          return (
            <div key={product.id} className="product">
              <img
                src={product.image.url}
                alt={product.name}
                className="prod-img"
              />
              <div className="content">
                <h4>{product.name}</h4>
                <p>{product.price.formatted_with_symbol}</p>
                <button
                  type="button"
                  className="add-btn"
                  style={{ background: "#f44336", color: "white" }}
                  onClick={() => {
                    setModalOpen(true);
                    handleAddToCart(product.id, 1);
                  }}
                >
                  add
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {modalOpen && <Modal modalOpen={modalOpen} />}
    </Wrapper>
  );
};

export default Products;
const Wrapper = styled.section`
  width: 100%;
  height: 100%;

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
    border-radius: 5px 5px;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    overflow: hidden;
    transition: all 0.3s linear;
  }
  .products {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 2rem;
  }
  .product {
    position: relative;
    margin: 0.5rem 0.5rem;
    border-radius: 5px 5px;
    background: black;
    &:hover img {
      opacity: 0.5;
    }
  }
  .prod-img {
    height: 200px;
    width: 300px;
    object-fit: cover;
    border-radius: 5px 5px;
    opacity: 0.7;
  }
  .content {
    position: absolute;
    top: 40%;
    left: 5%;
    display: flex;
    flex-direction: column;
  }
  h4,
  p {
    color: white;
    margin-bottom: 0.2rem;
  }
  .cat-btn {
    background: white;
    width: 5rem;
    height: 1.8rem;
    border-radius: 5px 5px;
    margin-top: 0.5rem;
    color: #f44336;
    letter-spacing: 1px;
  }
  .modal {
    position: fixed;
    height: 300px;
    width: 100%;
    background: white;
    z-index: 99;
    color: black;
    top: calc(0%);
    box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
    border-radius: 5px 5px;
  }
  input {
    margin: 0 0.5rem;
  }
  .modal-img {
    width: 100px;
    height: 60px;
  }
  .add-btn {
    width: 4rem;
    height: 1.8rem;
    margin-top: 0.7rem;
    border-radius: 5px 5px;
  }
  .filter {
    color: black;
    text-align: center;
    margin: 1rem auto;
  }
  @media screen and (max-width: 500px) {
    .prod-img {
      width: 400px;
    }
    .cat-btn {
      margin-right: 0.1rem;
      width: 5rem;
      font-size: 0.8rem;
      margin-left: 0.1rem;
    }
  }
`;
