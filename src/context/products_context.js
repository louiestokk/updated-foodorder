import React, { useState, useContext, useEffect } from "react";
import { commerce } from "../lib/commerce";
import { restaurants } from "../utils/data";

const ProductsContext = React.createContext();

const ProductsProvider = ({ children }) => {
  const [business, setBusiness] = useState(restaurants);
  const [products, setProducts] = useState([]);
  const [sides, setSides] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState(false);
  const fetchProducts = async (query) => {
    try {
      setLoading(true);
      const { data } = await commerce.products.list({
        category_slug: [query],
      });
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };
  const fetchCategories = async () => {
    const { data } = await commerce.categories.list();
    setCategories(data.map((el) => el.name));
  };
  const fetchSides = async () => {
    try {
      const { data } = await commerce.products.list({
        category_slug: ["Sides"],
      });
      setSides(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddToCart = async (productId, quantity) => {
    const { cart } = await commerce.cart.add(productId, quantity);
    // display that item is added
    setCart(cart);
  };
  const fetchCart = async () => {
    const resp = await commerce.cart.retrieve();
    setCart(resp);
  };
  const handleUpdateCartQty = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, { quantity });
    setCart(cart);
  };
  useEffect(() => {
    fetchProducts("All");
    fetchCategories();
    fetchSides();
    fetchCart();
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        products,
        categories,
        sides,
        cart,
        handleAddToCart,
        handleUpdateCartQty,
        modalOpen,
        setModalOpen,
        fetchProducts,
        loading,
        error,
        business,
        setBusiness,
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
