import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
function App() {
  const [userCoords, setUserCoords] = useState([]);

  // nedan är för att få användarens coords
  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(
  //     function (coords) {
  //       const { latitude, longitude } = coords.coords;
  //       setUserCoords([latitude, longitude]);
  //     },
  //     function (error) {
  //       console.log(error);
  //     }
  //   );
  // }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
