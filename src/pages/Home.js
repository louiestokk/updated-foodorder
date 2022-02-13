import React from "react";
import Products from "../components/Products/Products";
import styled from "styled-components";
import { useUserContext } from "../context/user_context";

const Home = () => {
  const { user } = useUserContext();
  console.log(user);
  return (
    <Wrapper>
      <div className="banner"></div>
      <Products />
    </Wrapper>
  );
};

export default Home;
const Wrapper = styled.section``;
