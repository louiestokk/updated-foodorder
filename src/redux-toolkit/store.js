import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./products/productSlice";
import orderReducer from "./order/orderSlice";
const store = configureStore({
  reducer: {
    products: productsReducer,
    order: orderReducer,
  },
});

export default store;
