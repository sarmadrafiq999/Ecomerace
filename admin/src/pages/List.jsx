import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { FaTrashAlt } from "react-icons/fa";

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");

  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/product/remove`,
        { id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const filteredList = list.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 font-sans">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
        📦 All Product List
      </h2>

      {/* 🔍 Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          className="w-full md:w-1/3 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table Header */}
      <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] bg-gray-200 text-gray-700 font-medium px-4 py-3 rounded-md shadow-sm">
        <span>Image</span>
        <span>Name</span>
        <span>Category</span>
        <span>Price</span>
        <span className="text-center">Action</span>
      </div>

      {/* Product Rows */}
      {filteredList.map((item, index) => (
        <div
          key={index}
          className={`grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-3 px-4 py-3 rounded-lg shadow-sm border ${
            index % 2 === 0 ? "bg-white" : "bg-gray-50"
          }`}
        >
          <img
            src={item.image[0]}
            alt={item.name}
            className="w-12 h-12 object-cover rounded-md"
          />
          <p className="font-medium text-gray-800 truncate">{item.name}</p>

          {/* 🎨 Category Badge */}
          <span className="text-xs text-white bg-blue-500 px-2 py-1 rounded-full text-center w-fit capitalize">
            {item.category}
          </span>

          <p className="text-gray-700 font-semibold">
            {currency}
            {item.price}
          </p>

          <button
            onClick={() => removeProduct(item._id)}
            className="text-red-500 hover:text-red-700 text-center text-lg transition duration-150 ease-in-out"
            title="Remove"
          >
            <FaTrashAlt />
          </button>
        </div>
      ))}

      {/* No Results Found */}
      {filteredList.length === 0 && (
        <p className="mt-6 text-center text-gray-500">Loading...</p>
      )}
    </div>
  );
};

export default List;
