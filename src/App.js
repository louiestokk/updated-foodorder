import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SingelRestaurant from "./components/Restaurant/SingelRestaurant/SingelRestaurant";
import Cart from "./components/Cart";
import { useUserContext } from "./context/user_context";
import Driver from "./components/Driver/Driver";
import SingelDriver from "./components/Driver/SingelDriver/SingelDriver";
import {
  ErrorPage,
  DashBoard,
  Connect,
  PrivateRoute,
  Home,
  UserPage,
  Confirmation,
} from "./pages";
import GoogleMapReact from "google-map-react";
function App() {
  const [orderPickedUp, setorderPickedUp] = useState(true);
  const { user } = useUserContext();
  const [orders, setOrders] = useState([]);
  const [delivered, setDelivered] = useState(false);
  const [coords, setCoords] = useState({});
  const fetchOrder = async () => {
    try {
      const { data } = await axios("http://localhost:3000/new_order");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoords({ lat: latitude, lng: longitude });
      }
    );
  }, []);
  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/delivery" exact element={<Driver />} />
        <Route path="/confirmation" exact element={<Confirmation />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/connectbusiness" exact element={<Connect />} />
        <Route path="/cart" exact element={<Cart />} />
        <Route
          path={`/restaurant/:id`}
          exact
          element={<SingelRestaurant coords={coords} />}
        />
        <Route
          path={`/mydashboard/:nickname`}
          exact
          element={
            <PrivateRoute>
              <UserPage
                orderPickedUp={orderPickedUp}
                setorderPickedUp={setorderPickedUp}
              />
            </PrivateRoute>
          }
        />

        {user && (
          <Route
            path={`/dashboard/:loid`}
            exact
            element={
              <PrivateRoute>
                <DashBoard
                  orderPickedUp={orderPickedUp}
                  setorderPickedUp={setorderPickedUp}
                />
              </PrivateRoute>
            }
          />
        )}
        <Route
          path={`/delivery/:nickname`}
          exact
          element={
            <PrivateRoute>
              <SingelDriver
                orders={orders}
                delivered={delivered}
                setDelivered={setDelivered}
              />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
