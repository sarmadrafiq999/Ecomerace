import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [cartItems, setCartItems] = useState({});
  const [cartLoaded, setCartLoaded] = useState(false); // ✅ Track when cart is loaded

  const navigate = useNavigate();

  const addToCart = async (itemId, size) => {
    if (!size || size.trim() === "") {
      toast.error("Please select at least one size");
      return;
    }

    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/add`,
          { itemId, size },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
    return true;
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalCount;
  };

  const totalAmountCart = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalAmount;
  };

  const upDataQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/update`,
          { itemId, size, quantity },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/cart/get`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setCartItems(response.data.cartData);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setCartLoaded(true); // ✅ Mark cart as loaded
    }
  };

  const getAllProducts = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const submitReview = async (productId, rating, message) => {
    if (!token) return toast.error("Please login to submit review.");

    try {
      const response = await axios.post(
        `${backendUrl}/api/reviews`,
        { productId, rating, message },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        toast.success("Review submitted!");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit review");
    }
  };

  const getAverageRating = async (productId) => {
    try {
      const res = await axios.get(
        `${backendUrl}/api/reviews/average/${productId}`
      );
      return res.data;
    } catch (error) {
      console.error(error);
      return { avgRating: 0, count: 0 };
    }
  };

  const getLatestReviews = async (productId) => {
    try {
      const res = await axios.get(
        `${backendUrl}/api/reviews/latest/${productId}`
      );
      return res.data;
    } catch (err) {
      console.error("Error fetching reviews:", err);
      return [];
    }
  };
  // getAllReviews
  const getAllReviews = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/reviews/all`);
      return res.data;
    } catch (error) {
      console.error("Error fetching all reviews:", error);
      toast.error("Failed to load all reviews.");
      return [];
    }
  };

  useEffect(() => {
    if (token) {
      getUserCart(token);
    }
  }, [token]);

  useEffect(() => {
    getAllProducts();
  }, []);

  const value = {
    getLatestReviews,
    getAverageRating,
    submitReview,
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    addToCart,
    cartItems,
    setCartItems,
    getCartCount,
    upDataQuantity,
    totalAmountCart,
    navigate,
    backendUrl,
    token,
    setToken,
    getAllReviews,
    cartLoaded,// ✅ Provided in context
    getAllProducts,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
