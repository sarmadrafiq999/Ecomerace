import React from "react";
import {
  FaPlusSquare,
  FaListUl,
  FaBoxOpen,
  FaRegComment,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen border-r-2 bg-white">
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
        <NavLink
          className="flex items-center md:gap-3 justify-center md:justify-start border border-gray-300 border-r-0 px-3 py-2 rounded-md hover:bg-gray-100 transition"
          to="/add"
        >
          <FaPlusSquare className="w-5 h-5 text-gray-700" />
          <p className="hidden md:block">Add Items</p>
        </NavLink>

        <NavLink
          className="flex items-center md:gap-3 justify-center md:justify-start border border-gray-300 border-r-0 px-3 py-2 rounded-md hover:bg-gray-100 transition"
          to="/list"
        >
          <FaListUl className="w-5 h-5 text-gray-700" />
          <p className="hidden md:block">List Items</p>
        </NavLink>

        <NavLink
          className="flex items-center md:gap-3 justify-center md:justify-start border border-gray-300 border-r-0 px-3 py-2 rounded-md hover:bg-gray-100 transition"
          to="/orders"
        >
          <FaBoxOpen className="w-5 h-5 text-gray-700" />
          <p className="hidden md:block">Orders</p>
        </NavLink>

        <NavLink
          className="flex items-center md:gap-3 justify-center md:justify-start border border-gray-300 border-r-0 px-3 py-2 rounded-md hover:bg-gray-100 transition"
          to="/reviews"
        >
          <FaRegComment className="w-5 h-5 text-gray-700" />
          <p className="hidden md:block">All Reviews</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
