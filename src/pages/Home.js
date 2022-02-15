import React from "react";
import Restaurants from "../components/Restaurant/Restaurants";
import styled from "styled-components";
import { useUserContext } from "../context/user_context";
import Filter from "../components/Filter/Filter";
const Home = () => {
  const { user } = useUserContext();

  return (
    <Wrapper>
      <div className="banner"></div>
      <Filter />
      <Restaurants />
    </Wrapper>
  );
};

export default Home;
const Wrapper = styled.section``;
