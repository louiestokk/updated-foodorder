import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useProductsContext } from "../../../context/products_context";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { BsFillStarFill } from "react-icons/bs";
import { MdRestaurantMenu } from "react-icons/md";
import Navbar from "../../Navbar";
import Footer from "../../Footer";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../../redux-toolkit/products/productSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import GoogleMapReact from "google-map-react";
import { HiLocationMarker } from "react-icons/hi";
import mapStyles from "../../../utils/mapStyles";
import {
  addAddress,
  getAddress,
} from "../../../redux-toolkit/order/orderSlice";
// test
import Geocode from "react-geocode";
const SingelRestaurant = ({ coords }) => {
  const products = useSelector(getAllProducts);
  const { handleAddToCart, added, setAdded, business } = useProductsContext();
  const { id } = useParams();
  const userLocation = useSelector(getAddress);

  const dispatch = useDispatch();
  const reverseGeoCode = async () => {
    try {
      const { data } = await axios(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&key=${process.env.REACT_APP_GOOGLEMAPS_API_KEY}`
      );

      dispatch(addAddress(data.results[0].formatted_address));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    reverseGeoCode();
  });
  console.log(coords);
  // test
  Geocode.setApiKey(process.env.REACT_APP_GOOGLEMAPS_API_KEY);
  Geocode.setRegion("se");

  const getLatLng = (adress) => {
    Geocode.fromAddress("hisingsgatan 10").then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng);
      },
      (error) => {
        console.error(error);
      }
    );
  };
  useEffect(() => {
    getLatLng();
  }, []);
  return (
    <Wrapper>
      <Navbar />
      <div>
        {business
          .filter((el) => el.id === +id)
          .map((rest) => {
            const { id, name, menu, category, icon, mainImage } = rest;

            return (
              <div key={id} className="container">
                <div
                  className="deliver-address"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <div
                    className="users-address"
                    style={{ margin: "0 0.5rem", fontSize: "0.8rem" }}
                  >
                    <h4>Deliver to:</h4>
                    <p>{userLocation}</p>
                  </div>
                  <div
                    className="map-container"
                    style={{ height: "240px", width: "100%" }}
                  >
                    <GoogleMapReact
                      bootstrapURLKeys={{
                        key: process.env.REACT_APP_GOOGLEMAPS_API_KEY,
                      }}
                      defaultCenter={coords}
                      center={coords}
                      defaultZoom={12}
                      margin={[50, 50, 50, 50]}
                      options={{
                        disableDefaultUI: true,
                        zoomControl: true,
                        styles: mapStyles,
                      }}
                    >
                      <div
                        className="user-position"
                        lat={Number(coords.lat)}
                        lng={Number(coords.lng)}
                      >
                        <HiLocationMarker
                          style={{ fontSize: "0.8rem", color: "#f44336" }}
                        />
                      </div>
                    </GoogleMapReact>
                  </div>
                </div>

                <section className="filler"></section>
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
                    <ToastContainer
                      position="bottom-left"
                      autoClose={2000}
                      hideProgressBar={false}
                      newestOnTop={false}
                      closeOnClick
                      pauseOnHover
                      style={{ marginBottom: "1rem" }}
                    />
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
                            toast("Item added to your foodbag");
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
  .filler {
    background: #f44336;
    height: 2rem;
  }
  .map-container {
    margin: 0.5rem 0;
    height: 100%;
  }
`;
