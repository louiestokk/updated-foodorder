import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import SingelRestaurant from "./components/Restaurant/SingelRestaurant/SingelRestaurant";
import DashBoard from "./pages/DashBoard";
import Connect from "./pages/Connect";
import Cart from "./components/Cart";
import PrivateRoute from "./pages/PrivateRoute";
import { useFirebaseContext } from "./context/firebase_context";

function App() {
  const { logedinUser } = useFirebaseContext();

  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/connectbusiness" exact element={<Connect />} />
        <Route path="/cart" exact element={<Cart />} />
        <Route path={`/restaurant/:id`} exact element={<SingelRestaurant />} />
        {logedinUser.displayName && (
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
      <Footer />
    </Router>
  );
}

export default App;
