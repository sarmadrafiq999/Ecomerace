import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Tittle from "../components/Tittle";
import CartTotal from "../components/CartTotal";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Cart = () => {
  const {
    products,
    currency,
    cartItems,
    upDataQuantity,
    cartLoaded, // ✅ now included
  } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!cartLoaded) return;

    const temData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          temData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item],
          });
        }
      }
    }
    setCartData(temData);

    if (temData.length === 0) {
      toast.info("Can't access, having no cart item!");
      navigate("/");
    }
  }, [cartItems, cartLoaded, navigate]);

  return (
    <div className="border-t pt-14 px-4 sm:px-6 md:px-12 lg:px-20 max-w-[1440px] mx-auto">
      {/* Title */}
      <div className="text-2xl mb-3 text-center sm:text-left">
        <Tittle text1={"YOUR"} text2={"CART"} />
      </div>

      {/* Cart Items */}
      <div className="space-y-6">
        {cartData.map((item, index) => {
          const prodData = products.find((product) => product._id === item._id);
          if (!prodData) return null;

          return (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-4"
            >
              {/* Image & Info */}
              <div className="flex flex-1 items-start gap-4">
                <img
                  src={prodData.image[0]}
                  alt={prodData.name}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div>
                  <p className="text-lg font-medium">{prodData.name}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm">
                    <p>
                      {currency}
                      {prodData.price}
                    </p>
                    <span className="px-3 py-1 border bg-slate-50 rounded-md">
                      {item.size}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quantity Input */}
              <div className="flex items-center gap-4 sm:gap-2">
                <input
                  onChange={(e) =>
                    e.target.value === "" || e.target.value === "0"
                      ? null
                      : upDataQuantity(
                          item._id,
                          item.size,
                          Number(e.target.value)
                        )
                  }
                  className="border rounded px-3 py-2 w-20 sm:w-24"
                  type="number"
                  min={1}
                  defaultValue={item.quantity}
                />
                {/* Delete Button */}
                <FaTrash
                  onClick={() => upDataQuantity(item._id, item.size, 0)}
                  className="text-xl text-red-600 cursor-pointer"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Cart Summary & Checkout */}
      {cartData.length > 0 && (
        <div className="flex justify-end my-20">
          <div className="w-full sm:w-[450px]">
            <CartTotal />
            <div className="w-full text-end">
              <button
                onClick={() => {
                  if (cartData.length === 0) {
                    toast.error("Your cart is empty. Add items first.");
                    return;
                  }
                  navigate("/place-order");
                }}
                disabled={cartData.length === 0}
                className={`text-sm mt-6 px-8 py-3 rounded transition-all duration-200 w-full text-white ${
                  cartData.length === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-black hover:bg-gray-900"
                }`}
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
