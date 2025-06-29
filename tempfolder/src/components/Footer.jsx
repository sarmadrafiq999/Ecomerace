import React from "react";
import { FaAccusoft } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm ">
        <div className="">
          <FaAccusoft className="text-3xl mb-5" />
          <p className="w-full md:w-2/3 text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod iure
            doloremque rerum? Ex!
          </p>
        </div>
        <div>
          <p className="text-xl font-medium mb-5 ">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600 cursor-pointer">
            <li>HOME </li>
            <li>About us </li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600 cursor-pointer">
            <li>+92 300 4556654</li>
            <li>saad@gmail.com</li>
          </ul>
        </div>
      </div>
        <div>
          <hr />
          <p className="py-5 text-sm items-center text-center">
            Copyright 2024@ forever.com - All Rights Reserved
          </p>
        </div>
    </div>
  );
};

export default Footer;
