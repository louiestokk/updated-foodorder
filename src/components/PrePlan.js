import React, { useState, useRef, useMemo } from "react";
import {
  Grid,
  Box,
  Typography,
  CircularProgress,
  CssBaseline,
  Button,
  Container,
  Checkbox,
  AppBar,
  Toolbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import { BarChart, AccountCircle } from "@material-ui/icons";
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
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  bar: {
    transform: "rotate(90deg)",
  },
  routrow: {
    cursor: "pointer",
  },
});

let test = 0;

const PrePlan = () => {
  const classes = useStyles();
  const [tourIndex, settourIndex] = useState(0);
  const [center, setcenter] = useState(newRoute[tourIndex]?.coords);
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [showAllOrders, setshowAllOrders] = useState(false);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLEMAPS_API_KEY,
    libraries: ["places"],
  });
  const orders = [].concat(...newRoute?.map((el) => el.orders));

  const memoizedMap = useMemo(() => {
    return (
      <Box className={classes.mapContainer}>
        <GoogleMap
          center={center}
          zoom={9}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          options={{
            zoomControl: true,
            streetViewControl: true,
            mapTypeControl: false,
            fullscreenControl: true,
          }}
          onLoad={(map) => setMap(map)}
        >
          {showAllOrders ? (
            <>
              {orders?.map((el, ind) => (
                <Marker
                  position={{ lat: el.y, lng: el.x }}
                  label={`${ind + 1}`}
                  key={ind}
                />
              ))}
            </>
          ) : (
            <>
              {newRoute[tourIndex]?.orders.map((order, ind) => (
                <Marker
                  position={{ lat: order.y, lng: order.x }}
                  label={`${ind + 1}`}
                  key={ind}
                />
              ))}
            </>
          )}
        </GoogleMap>
      </Box>
    );
  }, [tourIndex, center, orders, showAllOrders, classes]);

  if (!isLoaded) {
    return <CircularProgress />;
  }

  const TableComponent = () => {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Nr</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Address</TableCell>
              <TableCell align="right">City</TableCell>
              <TableCell align="right">OrderNumber</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {newRoute?.map((rout, ind) => (
              <TableRow
                className={classes.routrow}
                onClick={() => {
                  settourIndex(ind);
                  console.log(test);
                }}
              >
                <TableCell>{ind + 1}</TableCell>
                <TableCell align="right">{rout.name}</TableCell>
                <TableCell align="right">{rout.address}</TableCell>
                <TableCell align="right">{rout.city}</TableCell>
                <TableCell align="right">{rout.customerId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <BarChart className={classes.bar} />
          <AccountCircle />
        </Toolbar>
      </AppBar>
      {memoizedMap}
      <TableComponent />
    </>
  );
};

export default PrePlan;
