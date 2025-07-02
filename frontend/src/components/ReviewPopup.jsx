// components/ReviewPopup.jsx
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const ReviewPopup = ({ productId, onSubmit, onSkip }) => {
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Leave a Review</h2>

        <div className="flex gap-1 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              onClick={() => setRating(star)}
              className={`cursor-pointer ${
                star <= rating ? "text-yellow-500" : "text-gray-300"
              }`}
            />
          ))}
        </div>

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your review..."
          className="w-full border p-2 rounded mb-4"
        ></textarea>

        <div className="flex justify-between">
          <button
            onClick={() => onSubmit(productId, rating, message)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
          <button
            onClick={onSkip}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewPopup;
