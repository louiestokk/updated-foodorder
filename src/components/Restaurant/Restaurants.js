import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useProductsContext } from "../../context/products_context";
import { Oval } from "react-loader-spinner";

const Restaurants = () => {
  const { business, products } = useProductsContext();
  const navigate = useNavigate();
  console.log(products);
  return (
    <Wrapper>
      {business.map((restaurant) => {
        const { id, name, image, type, deliverfee, icon } = restaurant;
        return (
          <div
            key={id}
            className="restaurant"
            onClick={() => navigate(`/restaurant/${id}`)}
          >
            <img src={image} />
            {restaurant.featured && (
              <div className="featured">
                <h4>FEATURED</h4>
              </div>
            )}
            <div className="content">
              <h4>{name}</h4>
              <p style={{ fontSize: "0.85rem", margin: "0.1rem 0" }}>
                {icon} {type}
              </p>
              <span>
                {deliverfee === 0 ? (
                  <span className="free">Free delivery</span>
                ) : (
                  <div>
                    <span className="deliver"> ${deliverfee} delivery fee</span>
                  </div>
                )}
              </span>
            </div>
          </div>
        );
      })}
    </Wrapper>
  );
};

export default Restaurants;
const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  img {
    width: 350px;
    height: 250px;
  }
  .restaurant {
    position: relative;
    background: black;
    color: white;
    cursor: pointer;
    overflow: hidden;
    transition: all 0.3s linear;
    margin: 0.5rem 0.2rem;
    border-radius: 5px 5px;
  }
  .restaurant img {
    opacity: 0.7;
    transition: all 0.3s linear;
    border-radius: 5px 5px;
  }
  .restaurant img:hover {
    transform: scale(1.1);
  }
  .featured {
    position: absolute;
    top: 5%;
    background: #f44336;
    font-size: 0.8rem;
    width: 6rem;
    text-align: center;
    padding: 0.1rem;
  }
  .content {
    position: absolute;
    bottom: 10%;
    left: 4%;
  }
  .content h4 {
    font-size: 1.2rem;
  }
  .free {
    background: #f44336;
    padding: 0.1rem;
    font-size: 0.8rem;
  }
  .deliver {
    font-size: 0.8rem;
  }
  @media screen and (max-width: 700px) {
    .restaurant {
    }
    img {
      width: 350px;
    }
  }
`;
