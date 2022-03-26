import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  order: [],
  address: "",
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrder: (state, { payload }) => {
      state.order = payload;
    },
    addAddress: (state, { payload }) => {
      state.address = payload;
    },
  },
});

export const { addOrder, addAddress } = orderSlice.actions;
export const getOrder = (state) => state.order.order;
export const getAddress = (state) => state.order.address;

export default orderSlice.reducer;
