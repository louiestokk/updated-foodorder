import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Auth0Provider } from "@auth0/auth0-react";
import { UserProvider } from "./context/user_context";
import { ProductsProvider } from "./context/products_context";
import { GeoCoordsProvider } from "./context/geo_coords_context";
import { Provider } from "react-redux";
import store from "./redux-toolkit/store";
ReactDOM.render(
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH_DOMAIN}
    clientId={process.env.REACT_APP_AUTH_CLIENT_ID}
    redirectUri={window.location.origin}
    cacheLocation="localstorage"
  >
    <Provider store={store}>
      <GeoCoordsProvider>
        <UserProvider>
          <ProductsProvider>
            <App />
          </ProductsProvider>
        </UserProvider>
      </GeoCoordsProvider>
    </Provider>
  </Auth0Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
