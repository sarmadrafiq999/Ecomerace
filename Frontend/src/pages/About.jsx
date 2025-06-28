import React from "react";
import Tittle from "../components/Tittle";
import NewsLetterBox from "../components/NewsLetterBox";
import { ImgAbout } from "../assets/assets";

const About = () => {
  return (
    <div className="px-4 sm:px-6 md:px-12 lg:px-20 xl:px-28 max-w-[1440px] mx-auto">
      {/* ABOUT US SECTION */}
      <div className="text-2xl text-center pt-8 border-t">
        <Tittle text1={"ABOUT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col md:flex-row items-center gap-10">
        <img
          src={ImgAbout}
          alt="About Us"
          className="w-full md:w-1/2 h-auto max-h-[350px] object-cover rounded-2xl shadow-lg"
        />
        <div className="flex flex-col justify-center gap-6 w-full md:w-1/2 text-gray-600">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam
            doloribus nesciunt esse eaque quam quibusdam facere nulla, animi et
            cum?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
            qui unde, ea aliquam ipsam adipisci vel beatae, quidem alias itaque
            iusto consequuntur ratione?
          </p>
          <b className="text-gray-800 text-lg">Our Mission</b>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, eum
            magni vitae animi ullam voluptas sit obcaecati. Vitae, facilis.
          </p>
        </div>
      </div>

      {/* WHY CHOOSE US SECTION */}
      <div className="text-2xl py-4">
        <Tittle text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-20">
        <div className="border px-6 py-8 sm:py-12 flex-1 rounded-lg shadow-md">
          <b className="text-base text-gray-800">Quality Assurance:</b>
          <p className="text-gray-700 mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            repellendus? Amet, earum quibusdam qui animi odio eligendi ex vel
            molestias ut magnam quae?
          </p>
        </div>
        <div className="border px-6 py-8 sm:py-12 flex-1 rounded-lg shadow-md">
          <b className="text-base text-gray-800">Convenience:</b>
          <p className="text-gray-700 mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            repellendus? Amet, earum quibusdam qui animi odio eligendi ex vel
            molestias ut magnam quae?
          </p>
        </div>
        <div className="border px-6 py-8 sm:py-12 flex-1 rounded-lg shadow-md">
          <b className="text-base text-gray-800">Exceptional Customer Service:</b>
          <p className="text-gray-700 mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            repellendus? Amet, earum quibusdam qui animi odio eligendi ex vel
            molestias ut magnam quae?
          </p>
        </div>
      </div>

      {/* NEWSLETTER */}
      <NewsLetterBox />
    </div>
  );
};

export default About;
