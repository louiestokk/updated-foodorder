import React, { useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SingelRestaurant from "./components/Restaurant/SingelRestaurant/SingelRestaurant";
import Cart from "./components/Cart";
import { useUserContext } from "./context/user_context";
import { ErrorPage, DashBoard, Connect, PrivateRoute, Home } from "./pages";
function App() {
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
        {user && (
          <Route
            path={`/dashboard/:loid`}
            exact
            element={
              <PrivateRoute>
                <DashBoard />
              </PrivateRoute>
            }
          />
        )}
      </Routes>
    </Router>
  );
}

export default App;
