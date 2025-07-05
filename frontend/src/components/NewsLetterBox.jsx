import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const NewsLetterBox = () => {
  const [email, setEmail] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/newsletter/subscribe`,
        { email }
      );

      if (response.data.success) {
        toast.success("🎉 Subscribed successfully!");
        setEmail("");
      } else {
        toast.error(response.data.message || "Subscription failed.");
      }
    } catch (error) {
      console.error("Subscription error:", error);
      toast.error("❌ Failed to subscribe.  Try again later with different Mail.");
    }
  };

  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-gray-800 pt-3">
        Subscribe now & get 20% off
      </p>
      <p className="text-gray-400 mt-3">
        Join our newsletter to get updates on deals, news, and more.
      </p>
      <form
        onSubmit={submitHandler}
        className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3"
      >
        <input
          className="w-full outline-none sm:flex-1 p-3"
          type="email"
          placeholder="Enter your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className="bg-black text-white text-xs px-10 py-4  cursor-pointer"
          type="submit"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default NewsLetterBox;
