import React, { useEffect, useState, useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { FaStar } from "react-icons/fa";

const AllReviews = () => {
  const { getAllReviews } = useContext(ShopContext);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const loadReviews = async () => {
      const result = await getAllReviews();
      setReviews(Array.isArray(result) ? result : result.reviews || []);
    };

    loadReviews();
  }, []);

  const renderStars = (count) => {
    return (
      <div className="flex gap-1 text-yellow-500">
        {[...Array(5)].map((_, i) => (
          <FaStar key={i} className={i < count ? "fill-current" : "text-gray-300"} />
        ))}
      </div>
    );
  };

  return (
    <div className="py-10 px-4 sm:px-10 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">What Our Customers Say</h2>

      {reviews.length === 0 ? (
        <p className="text-center text-gray-500">No reviews found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="bg-white rounded-2xl p-6 shadow hover:shadow-xl transition duration-300 border"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {review.user?.name || "Anonymous"}
              </h3>

              <p className="text-sm text-gray-500 mb-1">
                Product: <span className="font-medium">{review.productId?.name || "Unknown"}</span>
              </p>

              {renderStars(review.rating)}

              <p className="mt-3 text-gray-600 italic line-clamp-4">"{review.message}"</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllReviews;
