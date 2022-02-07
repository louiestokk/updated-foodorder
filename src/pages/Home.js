import React from "react";
import Products from "../components/Products/Products";
import styled from "styled-components";
const Home = () => {
  return (
    <Wrapper>
      <div className="banner"></div>
      <Products />
    </Wrapper>
  );
};

export default Home;
const Wrapper = styled.section``;
