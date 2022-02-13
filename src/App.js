import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SingelRestaurant from "./components/Restaurant/SingelRestaurant/SingelRestaurant";
import Connect from "./components/AddRestaurant/Connect";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/connectbusiness" exact element={<Connect />} />
        <Route path={`/restaurant/:id`} exact element={<SingelRestaurant />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
