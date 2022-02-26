import React from "react";
import { useProductsContext } from "../context/products_context";
const Confimration = () => {
  const { order } = useProductsContext();
  console.log(order);
  return <div>Confimration</div>;
};

export default Confimration;
