import React, { useState, useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import {
  FaBars,
  FaCross,
  FaLock,
  FaSearch,
  FaUser,
} from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
  const { setShowSearch, getCartCount, navigate, setToken } =
    useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  // Logout function
  const logOut = () => {
    setToken("");
    localStorage.removeItem("token");
    toast.success("Loged out ");
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to="/">
        <h1>FOREVER</h1>
        {/* <FaBlog className="w-30" /> */}
      </Link>
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>Home </p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>Collection </p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>About</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>Contact </p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-6 ">
        <FaSearch
          onClick={() => setShowSearch(true)}
          className="w-5 cursor-pointer"
        />
        <div className="group relative">
          <FaUser
            onClick={() => navigate("/login")}
            className="w-5 cursor-pointer"
          />
          <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4 ">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 rounded">
              <p className="cursor-pointer hover:text-black"> My Profile</p>
              <p
                onClick={() => navigate("/orders")}
                className="cursor-pointer hover:text-black"
              >
                Orders
              </p>
              <p
                onClick={() => logOut()}
                className="cursor-pointer hover:text-black"
              >
                Logout
              </p>
            </div>
          </div>
        </div>
        <Link to="/cart" className="relative">
          <FaLock className="text-xl" />
          <p className="absolute right-[-5px] bottom-[-5px] flex items-center justify-center w-3 h-3 bg-black text-white text-[10px] rounded-full">
            {getCartCount()}
          </p>
        </Link>
        <FaBars
          onClick={() => setVisible(true)}
          className="w-6 cursor-pointer sm:hidden"
        />
      </div>
      {/* sidebar for the small screen */}
      <div
        className={`absolute top-0 bottom-0 right-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 bg-gray-300 cursor-pointer"
          >
            <FaCross className="h-4" />
            <p>Back</p>
          </div>
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
        </div>
      </div>
    </div>
  );
};

export default Navbar;
