import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { useLocation } from "react-router-dom";
const Footer = () => {
  const location = useLocation();
  return (
    <Wrapper>
      {location.pathname !== "/connectbusiness" && (
        <div className="link-container">
          <Link to="/connectbusiness" className="link">
            <BsFillArrowRightCircleFill className="bsicon" />
            Connect your business
            <BsFillArrowLeftCircleFill className="bsicon" />
          </Link>
        </div>
      )}
      <div style={{ marginTop: "1rem" }}>
        <h4>ZanziFood 🍕</h4>
      </div>
      <p className="ya">
        &copy; {new Date().getFullYear()} All rights reserved Stokk Tech Limited
      </p>
    </Wrapper>
  );
};

export default Footer;
const Wrapper = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 10rem;
  color: white;
  width: 100%;
  background: #f44336;
  .link-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .link {
    color: white;
    text-decoration: none;
    font-family: "Righteous", cursive;
    font-size: 1.2rem;
    width: 100%;
    align-items: center;
    display: flex;
  }

  .bsicon {
    margin: 0 0.5rem;
  }
  .ya {
    font-size: 0.6rem;
  }
`;
