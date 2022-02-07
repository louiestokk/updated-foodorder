import React from "react";
import styled from "styled-components";
const Product = ({ product }) => {
  return (
    <Wrapper>
      <img src={product.image.url} alt={product.name} />
      <div className="content">
        <h4>{product.name}</h4>
        <p>{product.price.formatted_with_symbol}</p>
        <button type="button">add</button>
      </div>
    </Wrapper>
  );
};

export default Product;
const Wrapper = styled.div`
  position: relative;
  margin: 0.5rem 0.5rem;
  border-radius: 5px 5px;
  background: black;
  &:hover img {
    opacity: 0.5;
  }
  img {
    height: 200px;
    width: 300px;
    object-fit: cover;
    border-radius: 5px 5px;
    opacity: 0.7;
  }
  .content {
    position: absolute;
    top: 40%;
    left: 30%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  h4,
  p {
    color: white;
    margin-bottom: 0.2rem;
  }
  button {
    background: #f44336;
    color: white;
    width: 3rem;
    height: 1.4rem;
    border-radius: 5px 5px;
    margin-top: 0.5rem;
  }
`;
