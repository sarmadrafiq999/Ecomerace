import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaTimes, FaSearch } from "react-icons/fa";
import { backendUrl } from "../App"; // ✅ Update if needed

const AdminAllReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const token = localStorage.getItem("token");

  const loadReviews = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/reviews/admin/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReviews(res.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      toast.error("Failed to load reviews");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${backendUrl}/api/reviews/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Review deleted");
      setReviews((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error(err);
      toast.error("Error deleting review");
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const filteredReviews = reviews.filter((review) =>
    review.productId?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-red-700">
        Admin Panel - All Customer Reviews
      </h2>

      {/* 🔍 Search Field */}
      <div className="flex items-center justify-center mb-8">
        <div className="relative w-full max-w-md">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by product name..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 transition"
          />
        </div>
      </div>

      {filteredReviews.length === 0 ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <div className="grid gap-6">
          {filteredReviews.map((review) => (
            <div
              key={review._id}
              className="relative bg-white border border-gray-200 rounded-xl shadow-md p-6 hover:shadow-lg transition-all"
            >
              {/* ❌ Delete Button */}
              <button
                onClick={() => handleDelete(review._id)}
                className="absolute top-3 right-3 text-red-600 hover:text-red-800 transition text-xl"
                title="Delete Review"
              >
                <FaTimes />
              </button>

              <div>
                <p className="text-gray-800 mb-1">
                  <strong>User:</strong> {review.user?.name || "Anonymous"}
                </p>
                <p className="text-gray-800 mb-1">
                  <strong>Product:</strong> {review.productId?.name || "Unknown"}
                </p>
                <p className="text-yellow-600 mb-2">
                  <strong>Rating:</strong> {review.rating} ⭐
                </p>
                <p className="italic text-gray-600">"{review.message}"</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminAllReviews;
