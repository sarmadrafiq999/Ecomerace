import React, { useState, useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import {
  FaBars,
  FaTimes,
  FaLock,
  FaSearch,
  FaUser,
  FaAccusoft,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
  const {
    setShowSearch,
    getCartCount,
    navigate,
    setToken,
    cartItems,
    cartLoaded,
  } = useContext(ShopContext);

  const [visible, setVisible] = useState(false);

  const logOut = () => {
    setToken("");
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    toast.success("Logged out");
  };

  const handleCartClick = () => {
    if (!cartLoaded) return;

    let isCartEmpty = true;
    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        if (cartItems[productId][size] > 0) {
          isCartEmpty = false;
          break;
        }
      }
      if (!isCartEmpty) break;
    }

    if (isCartEmpty) {
      toast.info("Can't access, having no cart item!");
    } else {
      navigate("/cart");
    }
  };

  return (
    <div className="relative z-50 flex items-center justify-between py-5 font-medium bg-white">
      {/* Logo */}
      <NavLink to="/" className="no-active-style">
        <h1 className="text-xl font-bold tracking-wider">
          <div className="flex items-center">
            <FaAccusoft className="text-4xl text-gray-700 mr-4" />
            <span className="text-orange-500">Sarmad</span>
            <span className="text-gray-700">Cloth</span>
          </div>
        </h1>
      </NavLink>

      {/* Desktop Nav */}
      <ul className="hidden sm:flex gap-3 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>Home</p>
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>Collection</p>
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>About</p>
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>Contact</p>
        </NavLink>
        <NavLink to="/reviews" className="flex flex-col items-center gap-1">
          <p>Reviews</p>
        </NavLink>
      </ul>

      {/* Right Icons */}
      <div className="flex items-center gap-6">
        <FaSearch
          onClick={() => setShowSearch(true)}
          className="w-5 cursor-pointer"
        />

        {/* Profile */}
        <div className="group relative">
          <FaUser
            onClick={() => navigate("/login")}
            className="w-5 cursor-pointer"
          />
          <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 rounded">
              <p className="cursor-pointer hover:text-black">My Profile</p>
              <p
                onClick={() => navigate("/orders")}
                className="cursor-pointer hover:text-black"
              >
                Orders
              </p>
              <p onClick={logOut} className="cursor-pointer hover:text-black">
                Logout
              </p>
            </div>
          </div>
        </div>

        {/* Cart */}
        <button onClick={handleCartClick} className="relative">
          <FaLock className="text-xl" />
          <p className="absolute right-[-5px] bottom-[-5px] flex items-center justify-center w-3 h-3 bg-black text-white text-[10px] rounded-full">
            {getCartCount()}
          </p>
        </button>

        {/* Mobile Menu Icon */}
        <FaBars
          onClick={() => setVisible(true)}
          className="w-6 cursor-pointer sm:hidden"
        />
      </div>

      {/* Sidebar for Mobile */}
      {visible && (
        <>
          {/* No dark overlay */}
          <div
            onClick={() => setVisible(false)}
            className="fixed inset-0 z-40"
          ></div>

          {/* Sidebar */}
          <div className="fixed top-0 bottom-0 right-0 w-[80%] sm:w-64 bg-white z-50 shadow-md transition-transform duration-300">
            <div
              onClick={() => setVisible(false)}
              className="flex items-center gap-3 bg-gray-200 p-4 cursor-pointer"
            >
              <FaTimes className="text-lg" />
              <p>Close</p>
            </div>

            <div className="flex flex-col text-gray-600 mobile-nav">
              <NavLink
                onClick={() => setVisible(false)}
                className="py-2 pl-6 border"
                to="/"
              >
                Home
              </NavLink>
              <NavLink
                onClick={() => setVisible(false)}
                className="py-2 pl-6 border"
                to="/collection"
              >
                Collection
              </NavLink>
              <NavLink
                onClick={() => setVisible(false)}
                className="py-2 pl-6 border"
                to="/about"
              >
                About
              </NavLink>
              <NavLink
                onClick={() => setVisible(false)}
                className="py-2 pl-6 border"
                to="/contact"
              >
                Contact
              </NavLink>
              <NavLink
                onClick={() => setVisible(false)}
                className="py-2 pl-6 border"
                to="/reviews"
              >
                Reviews
              </NavLink>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
