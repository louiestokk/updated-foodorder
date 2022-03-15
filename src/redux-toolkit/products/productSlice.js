import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  products: [],
  filter: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProducts: (state, { payload }) => {
      state.products = payload;
    },
    filterProducts: (state, { payload }) => {
      state.filter = payload;
    },
  },
});

export const { addProducts, filterProducts } = productSlice.actions;
export const getAllProducts = (state) => state.products.products;
export const getAllForFilter = (state) => state.products.filter;

export default productSlice.reducer;
