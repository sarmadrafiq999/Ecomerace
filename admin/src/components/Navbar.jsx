import React from "react";

const Navbar = ({ setToken }) => {
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  return (
    <div className="flex items-center justify-between px-6 py-3 shadow-md bg-white">
      {/* Classical Brand Text */}
      <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-wide text-gray-800">
        Afshan
      </h1>

      {/* Logout Button */}
      <button
        onClick={logout}
        className="bg-black text-white px-5 py-2 sm:px-6 sm:py-2 rounded-full text-sm sm:text-base hover:bg-gray-800 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
