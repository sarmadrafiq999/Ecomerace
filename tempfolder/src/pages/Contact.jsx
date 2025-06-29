import React, { useContext, useState } from "react";
import Tittle from "../components/Tittle";
import { FaPhone } from "react-icons/fa";
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
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Tittle text1={"CONTACT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 px-4">
        {/* Contact Info */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-start gap-6">
          <FaPhone className="text-4xl text-gray-600 mb-4" />
          <p className="font-semibold text-xl text-gray-600">Our Store</p>
          <p className="text-gray-500">
            William 563 <br /> Street, TDA, PAK
          </p>
          <p className="text-gray-500">
            Tel: +92 12345678765 <br /> Email: sar@gmail.com
          </p>
          <p className="font-semibold text-xl text-gray-600">
            Careers at SOLAR CONECT
          </p>
          <p className="text-gray-500">
            Learn about our teams and job openings.
          </p>
          <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500">
            Explore Jobs
          </button>
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
              className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
              required
            />

            <label className="font-semibold text-gray-700">Email</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="Enter your email"
              className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
              required
            />

            <label className="font-semibold text-gray-700">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              placeholder="Enter your message"
              className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
              required
            ></textarea>

            <button
              type="submit"
              className="mt-4 bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition-all duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      <NewsLetterBox />
    </div>
  );
};

export default Contact;
