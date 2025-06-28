import React from "react";
import { Img19 } from "../assets/assets";
const Hero = () => {
  return (
    <div className="flex flex-col sm:mb-0 sm:flex-row h-96 mb-30 border border-gray-400">
      <div className="w-full sm:w-1/2 items-center flex justify-center py:10 sm:py-0">
        <div className="text-[#414141] ">
          <div className="flex items-center gap-2">
            <p className="w-8 md:w-11 h-[2px] bg-[#414141] "></p>
            <p className="font-medium text-sm md:text-base"> OUR BESTSELLER</p>
          </div>
          <h1 className=" prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed">
            Latest Arrivals
          </h1>
          <div className="flex items-center gap-2">
            <p className="font-semibold texe-sm sm:text-base">SHOP NOW</p>
            <p className="w-8 md:w-11 h-[1px] bg-[#414141] "></p>
          </div>
        </div>
      </div>
      {/* hero right side  */}
      <img
        className="w-full sm:w-1/2 sm:h-full  sm:mt-0 mt-7 h-96 object-cover "
        src={Img19}
        alt="Hero Image"
      />
    </div>
  );
};

export default Hero;
