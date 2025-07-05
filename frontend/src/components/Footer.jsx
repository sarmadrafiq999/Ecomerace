import React, { useContext, useEffect } from "react";
import {
  FaAccusoft,
  FaPhoneAlt,
  FaEnvelope,
 FaMapMarkerAlt
} from "react-icons/fa";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const { backendUrl } = useContext(ShopContext);
  const navigate = useNavigate();

  return (
    <footer className="bg-gradient-to-r from-white via-gray-50 to-gray-100 text-gray-700">
      <div
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 py-16 px-6 border-b"
        data-aos="fade-up"
      >
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <FaAccusoft className="text-4xl text-gray-700" />
            <span className="text-2xl font-bold text-orange-600">
              Sarmad <span className="text-gray-700">Clothes</span>{" "}
            </span>
          </div>
          <p className="text-gray-600 leading-relaxed">
            Your one-stop shop for stylish fashion and trusted quality. Explore
            the latest trends with confidence.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Company</h3>
          <ul className="space-y-2 text-sm">
            {[
              { name: "Home", path: "/" },
              { name: "About Us", path: "/about" },
              { name: "Delivery", path: "/orders" },
              { name: "Privacy Policy", path: "/privacy-policy" },
            ].map((item) => (
              <li
                key={item.name}
                onClick={() => navigate(item.path)}
                className="hover:text-orange-600 cursor-pointer transition-all duration-200"
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Get In Touch
          </h3>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex items-center gap-2">
              <FaPhoneAlt className="text-orange-600" /> +92 309 6333 563
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-orange-600" />{" "}
              sarmadrafiq999@gmail.com
            </li>
            {/* <li className="flex items-center gap-3 mt-3"> */}
            <li className="flex items-center gap-3 mt-3">
               <FaMapMarkerAlt className="text-red-500 mt-1" />
              <p>Muzaffargarh, Punjab, Pakistan</p>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div
        className="text-center text-xs text-gray-500 py-5"
        data-aos="fade-up"
      >
        &copy; {new Date().getFullYear()} Sarmad Clothes — All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
