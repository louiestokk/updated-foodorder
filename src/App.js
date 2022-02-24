import React, { useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SingelRestaurant from "./components/Restaurant/SingelRestaurant/SingelRestaurant";
import Cart from "./components/Cart";
import { useUserContext } from "./context/user_context";
import {
  ErrorPage,
  DashBoard,
  Connect,
  PrivateRoute,
  Home,
  UserPage,
} from "./pages";
function App() {
  const [orderPickedUp, setorderPickedUp] = useState(true);
  const { user } = useUserContext();
  // const fetchRestaurants = async () => {
  //   try {
  //     const { data } = await axios.post(
  //       "https://zanzifood-restaurants-api.netlify.app/api/zanzifood-restaurants",
  //       { user }
  //     );
  //     console.log(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   fetchRestaurants();
  // }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/connectbusiness" exact element={<Connect />} />
        <Route path="/cart" exact element={<Cart />} />
        <Route path={`/restaurant/:id`} exact element={<SingelRestaurant />} />
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
      </Routes>
    </Router>
  );
}

export default App;
