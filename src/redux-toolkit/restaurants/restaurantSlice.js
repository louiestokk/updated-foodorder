import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  restaurants: [],
  filter: [],
};

const restaurantSlice = createSlice({
  name: "restaurants",
  initialState,
  reducers: {
    addRestaurants: (state, { payload }) => {
      state.restaurants = payload;
    },
    filterRestaurants: (state, { payload }) => {
      state.filter = payload;
    },
  },
});

export const { addRestaurants, filterRestaurants } = restaurantSlice.actions;
export const getAllRestaurants = (state) => state.restaurants.restaurants;
export const getAllForFilter = (state) => state.restaurants.filter;

export default restaurantSlice.reducer;
