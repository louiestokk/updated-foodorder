import React, { useState, useContext, useEffect } from "react";
import { commerce } from "../lib/commerce";
const ProductsContext = React.createContext();

const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await commerce.products.list({
        category_slug: ["All"],
      });
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchCategories = async () => {
    const { data } = await commerce.categories.list();
    setCategories(data.map((el) => el.name));
  };
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);
  return (
    <ProductsContext.Provider
      value={{
        products,
        categories,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = () => {
  return useContext(ProductsContext);
};
export { ProductsContext, ProductsProvider };
