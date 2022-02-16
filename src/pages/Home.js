import React from "react";
import Restaurants from "../components/Restaurant/Restaurants";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Filter from "../components/Filter/Filter";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <Wrapper>
      <Navbar />
      <div className="banner"></div>
      <Filter />
      <Restaurants />
      <Footer />
    </Wrapper>
  );
};

export default Home;
const Wrapper = styled.section``;
