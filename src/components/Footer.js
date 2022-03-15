import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import { MdMoped } from "react-icons/md";
import { useUserContext } from "../context/user_context";
const Footer = () => {
  const { user } = useUserContext();

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

          {user && (
            <Link
              to="/delivery"
              className="link"
              style={{
                marginBottom: "1rem",
              }}
            >
              <h4>Drivers</h4>
              <MdMoped className="bsicon" />
            </Link>
          )}
        </div>
      )}
      <div
        style={{ marginTop: "0.3rem", display: "flex", alignItems: "center " }}
      >
        <h4>ZanziFood 🍕</h4>
        <p className="ya">
          &copy; {new Date().getFullYear()} All rights reserved Stokk Tech
          Limited
        </p>
      </div>
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
    justify-content: center;
    margin-bottom: 1rem;
  }
  .link span {
    font-size: 0.9rem;
  }

  .bsicon {
    margin: 0 0.5rem;
  }
  .ya {
    font-size: 0.6rem;
  }
`;
