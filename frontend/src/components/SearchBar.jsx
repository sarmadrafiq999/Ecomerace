import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { FaSearch, FaTimes } from "react-icons/fa";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);

  return showSearch ? (
    <div className="border-t border-b text-center bg-gray-50">
      <div className="inline-flex items-center justify-center border px-5 py-2 mx-3 my-3 rounded-full w-3/4">
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
        onClick={() => setShowSearch(false)}
        className="inline cursor-pointer"
      />
    </div>
  ) : null;
};

export default SearchBar;
