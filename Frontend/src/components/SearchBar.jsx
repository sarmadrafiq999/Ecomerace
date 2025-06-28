import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  //
  useEffect(() => {
    if (location.pathname.includes("collection")) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);
  return showSearch && visible ? (
    <div className="border-t border-b text-center bg-gray-50">
      <div
        className="inline-flex items-center justify-center border px-5 py-2 mx-3 my-3 rounded-full w-3/4 sm-1/
"
      >
        <input
          className="flex-1 bg-inherit outline-none text-sm"
          type="text"
          placeholder="Search here"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FaSearch />
      </div>
      <FaTimes
        onClick={() => setShowSearch(!showSearch)}
        className="inline cursor-pointer"
      />
    </div>
  ) : null;
};

export default SearchBar;
