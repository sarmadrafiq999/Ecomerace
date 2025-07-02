import React, { useContext, useState } from "react";
import Tittle from "../components/Tittle";
import { FaPhone, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import NewsLetterBox from "../components/NewsLetterBox";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Contact = () => {
  const { backendUrl } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${backendUrl}/api/contact/contact-us`,
        formData
      );

      if (response.data.success) {
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error(response.data.message || "Failed to send message.");
      }
    } catch (error) {
      console.error("Contact error:", error);
      toast.error("Server error. Please try again later.");
    }
  };

  return (
    <div className="px-4 sm:px-6 md:px-12 lg:px-20 max-w-[1440px] mx-auto">
      {/* Title */}
      <div className="text-center text-2xl pt-10 border-t">
        <Tittle text1={"CONTACT"} text2={"US"} />
      </div>

      {/* Main Contact Section */}
      <div className="my-10 flex flex-col md:flex-row gap-10 mb-28">
        {/* HQ & Careers Info */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-orange-50 to-white p-8 rounded-xl shadow-xl border border-orange-100">
          {/* HQ Info */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Afshan Clothes <span className="text-orange-500">HQ</span>
            </h2>
            <div className="flex items-start gap-3 text-gray-600 text-sm mb-2">
              <FaMapMarkerAlt className="mt-1 text-orange-500" />
              <p>William 563 Street, TDA, Pakistan</p>
            </div>
            <div className="flex items-start gap-3 text-gray-600 text-sm mb-2">
              <FaPhone className="mt-1 text-orange-500" />
              <p>+92 123 4567 8765</p>
            </div>
            <div className="flex items-start gap-3 text-gray-600 text-sm">
              <FaEnvelope className="mt-1 text-orange-500" />
              <p>support@afshanclothes.com</p>
            </div>
          </div>

          {/* Careers Section */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Careers at Afshan
            </h3>
            <p className="text-gray-600 text-sm leading-6">
              Join our fashion-forward team and help redefine modern ethnic
              wear with creativity, culture, and class.
            </p>
           <a
  href="https://pk.indeed.com/q-fashion-designer-jobs.html"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-block mt-4 border border-orange-500 text-orange-600 px-6 py-2 text-sm font-medium rounded hover:bg-orange-500 hover:text-white transition-all duration-300"
>
  Explore Careers
</a>

          </div>
        </div>

        {/* Contact Form */}
        <div className="w-full md:w-1/2 bg-gray-100 p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="font-semibold text-gray-700">Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
              placeholder="Enter your name"
              className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />

            <label className="font-semibold text-gray-700">Email</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="Enter your email"
              className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />

            <label className="font-semibold text-gray-700">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              placeholder="Enter your message"
              className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            ></textarea>

            <button
              type="submit"
              className="mt-4 bg-orange-500 text-white px-6 py-3 rounded hover:bg-orange-600 transition-all duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Newsletter Box */}
      <NewsLetterBox />
    </div>
  );
};

export default Contact;
