import React, { useEffect, useSate, useContext, useState } from "react";
import axios from "axios";
const GeoCoordsContext = React.createContext();

const GeoCoordsProvider = ({ children }) => {
  const [userCoords, setUserCoords] = useState([]);
  const [userLocation, setUserLoaction] = useState([]);
  const fetchUserLoaction = async (lat, lon) => {
    try {
      const resp = await axios(
        `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${process.env.REACT_APP_OPEN_WEATHER_KEY}`
      );
      console.log(resp.data);
    } catch (error) {
      console.log(error);
    }
  };
  //   get user coords and setCoords and fetchUserLocation
  //   useEffect(() => {
  //     navigator.geolocation.getCurrentPosition(
  //       function (coords) {
  //         const { latitude, longitude } = coords.coords;
  //         setUserCoords([latitude, longitude]);
  //         fetchUserLoaction(latitude, longitude);
  //       },
  //       function (error) {
  //         console.log(error);
  //       }
  //     );
  //   }, []);

  return (
    <GeoCoordsContext.Provider value={userCoords}>
      {children}
    </GeoCoordsContext.Provider>
  );
};

export const useGeoCoordsContext = () => {
  return useContext(GeoCoordsContext);
};

export { GeoCoordsContext, GeoCoordsProvider };
