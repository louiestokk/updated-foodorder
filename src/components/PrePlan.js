import React, { useState, useMemo, useRef } from "react";
import classNames from "classnames";
import {
  Box,
  CircularProgress,
  CssBaseline,
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
  FormControlLabel,
  TextField,
  Button,
  Typography,
  IconButton,
  Grid,
  ButtonGroup,
} from "@material-ui/core";

import { BarChart, AccountCircle, ArrowDropDown } from "@material-ui/icons";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
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
    position: "relative",
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
  modal: {
    position: "absolute",
    top: "2%",
    left: "1%",
    width: "260px",
    height: "200px",
    alignItems: "center",
    display: "flex",
  },
  modaldiv: {
    width: "100%",
    height: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  routbtn: {
    width: "10rem",
    height: "2rem",
  },
  input: {
    margin: "0.35rem 0",
  },
  maprout: {
    position: "absolute",
    top: "55%",
    left: "1%",
    width: "260px",
    display: "flex",
    justifyContent: "space-evenly",

    transition: "all linear 0.3s",
  },
  buttons: {
    display: "flex",
    flexDirection: "column",
  },
  clearbtn: {
    width: "10rem",
    height: "2rem",
    marginTop: "0.3rem",
  },
});

const PrePlan = () => {
  const classes = useStyles();
  const [tourIndex, settourIndex] = useState(0);
  const [center, setcenter] = useState(newRoute[tourIndex]?.coords);
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [showAllOrders, setshowAllOrders] = useState(false);
  const [origin, setorigin] = useState("second");
  const [destination, setdestination] = useState("second");

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLEMAPS_API_KEY,
    libraries: ["places"],
  });

  const calculateRoute = async () => {
    if (origin === "" || destination === "") return;

    // eslint-disable-next-line no-undef
    const directionService = new google.maps.DirectionsService();
    const results = await directionService.route({
      origin: origin,
      destination: destination,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  };

  const clearRoute = () => {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    setorigin("");
    setdestination("");
  };
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
                <>
                  <Marker
                    position={{ lat: order.y, lng: order.x }}
                    label={`${ind + 1}`}
                    key={ind}
                    onClick={() => setorigin(order.address)}
                    onMouseOver={() => setdestination(order.address)}
                  />
                  {directionsResponse && (
                    <DirectionsRenderer directions={directionsResponse} />
                  )}
                </>
              ))}
            </>
          )}
        </GoogleMap>

        <Paper className={classes.modal}>
          <Grid container direction="column" alignItems="center">
            <Grid item xs={8} md={10}>
              <TextField
                placeholder="Origin"
                type={"text"}
                ref={originRef}
                variant="outlined"
                size="small"
                onChange={(e) => setorigin(e.target.value)}
              />
            </Grid>
            <Grid item xs={8} md={10}>
              <TextField
                placeholder="Destination"
                type={"text"}
                ref={destiantionRef}
                variant="outlined"
                size="small"
                className={classes.input}
                onChange={(e) => setdestination(e.target.value)}
              />
            </Grid>
            <Grid item xs={8} md={10}>
              <ButtonGroup className={classes.buttons}>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  className={classes.routbtn}
                  onClick={calculateRoute}
                >
                  Calculate Route
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  className={classes.clearbtn}
                  onClick={clearRoute}
                >
                  Clear
                </Button>
              </ButtonGroup>
            </Grid>
          </Grid>
        </Paper>

        <Paper className={classes.maprout}>
          <Typography variant="subtitle2">Distance: {distance}</Typography>
          <Typography variant="subtitle2">Duration: {duration}</Typography>
        </Paper>
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
              <TableCell>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={(e) => {
                        setshowAllOrders(true);
                      }}
                    />
                  }
                  label="All"
                />
              </TableCell>
              <TableCell>Nr</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Address</TableCell>
              <TableCell align="right">City</TableCell>
              <TableCell align="right">OrderNumber</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {newRoute?.map((rout, ind) => (
              <TableRow className={classes.routrow}>
                <TableCell>
                  <Checkbox
                    onChange={(e) => {
                      settourIndex(ind);
                      setshowAllOrders(false);
                    }}
                  />
                </TableCell>
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
