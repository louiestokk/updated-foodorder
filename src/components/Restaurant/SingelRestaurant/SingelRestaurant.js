import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useProductsContext } from "../../../context/products_context";
import { restaurants } from "../../../utils/data";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { BsFillStarFill } from "react-icons/bs";
import { MdRestaurantMenu } from "react-icons/md";
import Navbar from "../../Navbar";
import Footer from "../../Footer";
const SingelRestaurant = () => {
  const { products, handleAddToCart, added, setAdded } = useProductsContext();
  const { id } = useParams();

  return (
    <Wrapper>
      <Navbar />
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            height: "4.2rem",
          }}
        >
          <div>delivering to</div>
          <div>When</div>
        </div>
        {restaurants
          .filter((el) => el.id === +id)
          .map((rest) => {
            const {
              id,
              name,
              menu,
              location,
              query,
              number,
              image,
              type,
              deliverfee,
              category,
              icon,
              mainImage,
            } = rest;

            return (
              <div key={id} className="container">
                <img src={mainImage} className="mainImage" />
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h4 style={{ marginLeft: "1rem" }}>{name}</h4>
                  <BsFillInfoCircleFill
                    style={{
                      marginRight: "1rem",
                      color: "#f44336",
                      cursor: "pointer",
                      fontSize: "1.2rem",
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    marginLeft: "1rem",
                    alignItems: "center",
                  }}
                >
                  <BsFillStarFill
                    style={{
                      color: "orange",
                      marginRight: "0.4rem",
                    }}
                  />
                  <p style={{ fontSize: "0.8rem" }}>4.6/5 (10)</p>
                </div>
                <div
                  style={{
                    display: "flex",
                    marginLeft: "1rem",
                    alignItems: "center",
                  }}
                >
                  <p style={{ opacity: "0.6", marginRight: "0.4rem" }}>
                    {icon}
                  </p>
                  <p style={{ fontSize: "0.8rem" }}>. {category[0]} </p>
                </div>

                <div className="divider"></div>
                <h4
                  style={{
                    marginTop: "2rem",
                    maxWidth: "4rem",
                    marginLeft: "0.5rem",
                    color: "#f44336",
                  }}
                >
                  <MdRestaurantMenu /> Menu
                </h4>
                <div className="menu">
                  {added ? (
                    <h4 className="added-text">Item added to your food bag</h4>
                  ) : (
                    ""
                  )}
                  {products
                    .filter((el) => menu.includes(el.id))
                    .map((el) => {
                      return (
                        <div
                          key={el.id}
                          className="menu-items"
                          onClick={() => {
                            handleAddToCart(el.id, 1);
                            setTimeout(() => {
                              setAdded(false);
                            }, 6000);
                          }}
                        >
                          <div className="item-info">
                            <h4>{el.name}</h4>
                            <p
                              dangerouslySetInnerHTML={{
                                __html: el.description,
                              }}
                            ></p>
                            <p>${el.price.raw}</p>
                          </div>
                          <img src={el.image.url} alt={el.name} />
                        </div>
                      );
                    })}
                </div>
              </div>
            );
          })}
      </div>
      <Footer />
    </Wrapper>
  );
};

export default SingelRestaurant;
const Wrapper = styled.section`
  position: relative;
  .mainImage {
    width: 100%;
    height: 175px;
    object-fit: cover;
  }
  .container div {
    margin-top: 1rem;
  }
  .popular {
    width: 100%;
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
      0 4px 6px -4px rgb(0 0 0 / 0.1);
    height: 4rem;
    border: 1px solid rgb(218, 214, 214);
    margin: 1rem 0;
    overflow-x: scroll;
  }
  .menu-items {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgb(218, 214, 214);
    cursor: pointer;
    margin-bottom: 1rem;
    overflow: hidden;
  }
  .menu-items:hover {
    border-bottom: 1px solid black;
  }

  .menu-items img {
    height: 60px;
    width: 100px;
    object-fit: cover;
    margin-top: 1rem;
    transition: all 0.3s linear;
  }
  .item-info {
    margin-top: 1rem;
  }
  .item-info h4 {
    font-size: 0.9rem;
    margin-left: 0.1rem;
  }
  .item-info p {
    font-size: 0.8rem;
    opacity: 0.8;
    margin-top: 0.1rem;
    margin-left: 0.1rem;
    max-width: 260px;
  }
  .added-text {
    position: fixed;
    top: 50%;
    left: 30%;
    color: #f44336;
  }
`;
