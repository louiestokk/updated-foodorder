import { configureStore } from "@reduxjs/toolkit";
import restaurantReducer from "./restaurants/restaurantSlice";
import productsReducer from "./products/productSlice";
const store = configureStore({
  reducer: {
    restaurants: restaurantReducer,
    products: productsReducer,
  },
});

export default store;
