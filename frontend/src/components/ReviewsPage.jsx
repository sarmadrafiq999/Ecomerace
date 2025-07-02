import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { FaStar } from "react-icons/fa";

const ReviewsPage = () => {
  const { productId } = useParams();
  console.log("Actual productId:", productId); // ✅ should be a real ID like "662..."
  const { getLatestReviews } = useContext(ShopContext);
  const [reviews, setReviews] = useState([]);

  console.log("Actual productId:", productId);
  useEffect(() => {
    const fetchLatestReviews = async () => {
      const reviews = await getLatestReviews(productId); // <- Must be a real ID like "662f..."
      setReviews(reviews);
    };
    fetchLatestReviews();
  }, [productId]);

  return (
    <div className="max-w-3xl mx-auto py-10 px-6">
      <h2 className="text-2xl font-bold mb-6">Latest Reviews</h2>

      {reviews.length === 0 ? (
        <p className="text-gray-600">Loading...</p>
      ) : (
        reviews.map((review) => (
          <div
            key={review._id}
            className="border p-4 mb-4 rounded-md shadow-sm bg-white"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="font-semibold">
                {review.user?.name || "Anonymous"}
              </p>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className={`text-sm ${
                      review.rating >= star
                        ? "text-orange-500"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-gray-700">{review.message}</p>
            <p className="text-xs text-gray-400 mt-2">
              {new Date(review.createdAt).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewsPage;
