import React from "react";
import styled from "styled-components";
import { useProductsContext } from "../../context/products_context";
import Product from "./Product";
const Products = () => {
  const { products, categories } = useProductsContext();

  return (
    <Wrapper>
      <div className="categories">
        {categories.map((el, ind) => {
          return (
            <button type="button" key={ind}>
              {el}
            </button>
          );
        })}
      </div>
      <div className="products">
        {products.map((product) => {
          return <Product product={product} key={product.id} />;
        })}
      </div>
    </Wrapper>
  );
};

export default Products;
const Wrapper = styled.section`
  width: 100%;
  height: 100%;

  .categories {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    margin-top: 1rem;
  }
  .products {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
`;
