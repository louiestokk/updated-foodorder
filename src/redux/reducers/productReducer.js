import { ActionTypes } from "../constans/action-types";
import { restaurants } from "../../utils/data";
const initialState = {
  products: [],
  shops: restaurants,
};

export const productReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_PRODUCTS:
      return { ...state, products: payload };
    default:
      return state;
  }
};
