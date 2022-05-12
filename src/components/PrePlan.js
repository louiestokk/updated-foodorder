import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Grid,
  Box,
  Typography,
  CircularProgress,
  CssBaseline,
  Button,
  Container,
  Checkbox,
} from "@material-ui/core";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import { newRoute } from "../utils/data";
import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles({
  root: {
    height: "100%",
    width: "100%",
    display: "flex",
    marginTop: "2rem",
  },
  mapContainer: {
    width: "100%",
    height: "400px",
  },
});
const PrePlan = () => {
  const classes = useStyles();
  // center = coords for Tumba / newRoute city property
  const [center, setcenter] = useState({ lat: 59.199859, lng: 17.830957 });
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLEMAPS_API_KEY,
    libraries: ["places"],
  });

  if (!isLoaded) {
    return <CircularProgress />;
  }

  return (
    <>
      <CssBaseline />
      <Box className={classes.root}>
        <Box className={classes.prepelan}>
          <Typography variant="h4">Preplan</Typography>
        </Box>
        <Box className={classes.mapContainer}>
          <GoogleMap
            center={center}
            zoom={15}
            mapContainerStyle={{ width: "100%", height: "100%" }}
            options={{
              zoomControl: true,
              streetViewControl: true,
              mapTypeControl: true,
              fullscreenControl: true,
            }}
            onLoad={(map) => setMap(map)}
          >
            {newRoute?.map((el, ind) => {
              const { coords } = el;
              return (
                <Marker position={coords} title={`${ind}`} label={`${ind}`} />
              );
            })}
          </GoogleMap>
        </Box>
        <Box>
          <Container>
            <Button variant="contained" color="primary">
              Reset
            </Button>
            <Button variant="contained" color="secondary">
              Submit
            </Button>
          </Container>
          <Container>list</Container>
        </Box>
      </Box>
    </>
  );
};

export default PrePlan;
