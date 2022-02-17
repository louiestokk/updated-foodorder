import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SingelRestaurant from "./components/Restaurant/SingelRestaurant/SingelRestaurant";
import Cart from "./components/Cart";
import { useUserContext } from "./context/user_context";
import { ErrorPage, DashBoard, Connect, PrivateRoute, Home } from "./pages";
function App() {
  const { user } = useUserContext();

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
