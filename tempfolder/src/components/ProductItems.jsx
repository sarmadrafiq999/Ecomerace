import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext"; // Import the context object, NOT the provider
import { Link } from "react-router-dom";

const ProductItems = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext); // Use ShopContext here

  return (
    <Link className="text-gray-700 cursor-pointer  " to={`/product/${id}`}>
      <div className="aspect-3/4 overflow-hidden">
        <img
          className="w-full h-full  hover:scale-110 transition ease-in-out"
          src={image[0]}
          alt=""
        />
      </div>

        <p className="pt-3 pb-1 text-sm">{name}</p>
        <p className="font-medium text-sm">
          {currency}
          {price}
        </p>
    </Link>
  );
};

export default ProductItems;
