import React from "react";
import { FaCertificate, FaHeadset, FaRetweet } from "react-icons/fa";

const OurPolicey = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700">
      <div className="">
        <FaRetweet className="text-5xl m-auto mb-5" />
        <p className="font-semibold">Easy Exchange</p>
        <p className="text-gray-700">We offer hassel free exchange policey</p>
      </div>
      <div className="">
        <FaCertificate className="text-5xl m-auto mb-5" />
        <p className="font-semibold">7 Days return policey</p>
        <p className="text-gray-700">We offer 7 days return policey policey</p>
      </div>
      <div className="">
        <FaHeadset className="text-5xl m-auto mb-5" />
        <p className="font-semibold">Coustomer Support</p>
        <p className="text-gray-700">We offer coustomer support policey</p>
      </div>
    </div>
  );
};

export default OurPolicey;
