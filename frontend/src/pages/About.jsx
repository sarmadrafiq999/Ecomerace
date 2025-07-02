import React from "react";
import Tittle from "../components/Tittle";
import NewsLetterBox from "../components/NewsLetterBox";
import { ImgAbout } from "../assets/assets";

const About = () => {
  return (
    <div className="px-4 sm:px-6 md:px-12 lg:px-20 xl:px-28 max-w-[1440px] mx-auto font-sans text-gray-700">
      {/* ABOUT US SECTION */}
      <div className="text-3xl text-center pt-8 border-t font-bold text-orange-600 tracking-wider">
        <Tittle text1={"ABOUT"} text2={"AFSHAN CLOTHES"} />
      </div>

      <div className="my-16 flex flex-col md:flex-row items-center md:items-start gap-10">
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={ImgAbout}
            alt="About Afshan Clothes"
            className="w-full h-auto max-h-[450px] object-cover rounded-3xl shadow-2xl border-2 border-orange-300"
          />
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-center gap-6 text-lg leading-relaxed text-gray-800">
          <p className="text-xl">
            Welcome to <span className="font-extrabold text-orange-600">Afshan Clothes</span> — where fashion meets grace. Our purpose is simple:
            to bring elegance into everyday wear and style into every wardrobe.
          </p>
          <p>
            We take pride in offering hand-picked collections crafted with premium fabrics, traditional roots, and modern silhouettes. At Afshan, we believe that every piece of clothing should tell a story — your story.
          </p>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3 border-b pb-1 border-orange-400 inline-block">Our Mission</h3>
            <p>
              To celebrate individuality and culture through fashion that feels as good as it looks. We strive to create clothing that empowers women and men to embrace confidence, charm, and authenticity.
            </p>
          </div>
        </div>
      </div>

      {/* WHY CHOOSE US SECTION */}
      <div className="text-3xl py-6 font-semibold text-center text-orange-600">
        <Tittle text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
        <div className="bg-gradient-to-tr from-orange-50 to-white border border-orange-200 px-6 py-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all">
          <h4 className="text-lg font-bold text-gray-900 mb-3">✨ Premium Quality Fabrics</h4>
          <p>
            Our clothing is made with luxurious, breathable, and long-lasting fabrics. Each piece passes through rigorous quality control for guaranteed satisfaction.
          </p>
        </div>
        <div className="bg-gradient-to-tr from-orange-50 to-white border border-orange-200 px-6 py-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all">
          <h4 className="text-lg font-bold text-gray-900 mb-3">🛍️ Seamless Experience</h4>
          <p>
            From browsing to delivery, we ensure a smooth, simple, and secure journey. Our mobile-friendly platform and fast service make shopping joyful.
          </p>
        </div>
        <div className="bg-gradient-to-tr from-orange-50 to-white border border-orange-200 px-6 py-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all">
          <h4 className="text-lg font-bold text-gray-900 mb-3">❤️ Personalized Support</h4>
          <p>
            Our dedicated team is always just a message away. We genuinely care about your experience — and it shows in every conversation.
          </p>
        </div>
      </div>

      {/* CUSTOMER TESTIMONIALS */}
      <div className="text-3xl font-semibold text-center text-orange-600 py-4">
        <Tittle text1={"WHAT OUR"} text2={"CUSTOMERS SAY"} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-24">
        <div className="bg-orange-50 p-6 rounded-3xl shadow-md hover:shadow-xl">
          <p className="italic text-gray-800">“Absolutely stunning outfits! Got so many compliments at Eid. Definitely ordering again!”</p>
          <p className="text-sm text-right mt-4 font-semibold text-orange-600">— Ayesha R.</p>
        </div>
        <div className="bg-orange-50 p-6 rounded-3xl shadow-md hover:shadow-xl">
          <p className="italic text-gray-800">“Comfortable, classy, and budget-friendly. Afshan Clothes never disappoints!”</p>
          <p className="text-sm text-right mt-4 font-semibold text-orange-600">— Mariam K.</p>
        </div>
      </div>

      {/* CALL TO ACTION */}
      <div className="text-center mb-16">
        <h3 className="text-2xl font-bold text-gray-900 mb-3">Ready to Elevate Your Wardrobe?</h3>
        <p className="mb-6">Join the Afshan family and discover the power of beautiful clothing.</p>
        <a href="/collection" className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-all">
          Shop Now
        </a>
      </div>

      {/* NEWSLETTER */}
      <NewsLetterBox />
    </div>
  );
};

export default About;
