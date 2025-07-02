import React from "react";
import { FaCertificate, FaHeadset, FaRetweet } from "react-icons/fa";

const OurPolicy = () => {
  return (
    <section className="bg-gradient-to-br from-white via-gray-50 to-gray-100 py-16">
      <div
        className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-12 text-center text-gray-700 px-4"
        data-aos="fade-up"
      >
        {/* Easy Exchange */}
        <div className="hover:shadow-md transition-all duration-300 rounded-md p-6 bg-white">
          <FaRetweet className="text-5xl text-indigo-600 mx-auto mb-4" />
          <h3 className="font-bold text-lg mb-1">Easy Exchange</h3>
          <p className="text-sm text-gray-600">
            Enjoy hassle-free product exchange with our flexible policy.
          </p>
        </div>

        {/* 7 Days Return */}
        <div className="hover:shadow-md transition-all duration-300 rounded-md p-6 bg-white">
          <FaCertificate className="text-5xl text-indigo-600 mx-auto mb-4" />
          <h3 className="font-bold text-lg mb-1">7-Day Return Policy</h3>
          <p className="text-sm text-gray-600">
            Return products within 7 days — no questions asked.
          </p>
        </div>

        {/* Customer Support */}
        <div className="hover:shadow-md transition-all duration-300 rounded-md p-6 bg-white">
          <FaHeadset className="text-5xl text-indigo-600 mx-auto mb-4" />
          <h3 className="font-bold text-lg mb-1">Customer Support</h3>
          <p className="text-sm text-gray-600">
            Reach out to our team anytime for support and assistance.
          </p>
        </div>
      </div>
    </section>
  );
};

export default OurPolicy;
