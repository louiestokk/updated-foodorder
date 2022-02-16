import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
const ErrorPage = () => {
  return (
    <Wrapper>
      <h2>Something whent wrong</h2>
      <Link to="/">Back Home</Link>
    </Wrapper>
  );
};

export default ErrorPage;
const Wrapper = styled.div`
  background: #f44336;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  color: white;
  height: 500px;
  a {
    color: white;
    border: 1px solid white;
    padding: 0.3rem;
    margin-top: 1rem;
    border-radius: 4px 4px;
  }
`;
