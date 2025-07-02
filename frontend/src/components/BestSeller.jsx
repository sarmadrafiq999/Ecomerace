import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Tittle from "./Tittle";
import ProductItems from "./ProductItems";

const BestSeller = () => {
  const { products, search } = useContext(ShopContext); // include search from context
  const [bestproducts, setBestproducts] = useState([]);

  useEffect(() => {
    let filtered = products.filter((item) => item.bestseller);

    // Filter by search if applicable
    if (search && search.trim() !== "") {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setBestproducts(filtered.slice(0, 5)); // only show first 5
  }, [products, search]);

  return (
    <div className="my-8">
      <div className="text-center text-3xl py-8">
        <Tittle text1={"BEST"} text2={"SELLER"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          "Our best-selling product is loved by thousands for its unmatched
          quality, perfect fit, and modern design. Crafted with premium
          materials and backed by glowing reviews, it’s the go-to choice for
          smart shoppers. Don’t miss out—experience why it’s everyone’s
          favorite!"
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestproducts.length > 0 ? (
          bestproducts.map((item, index) => (
            <ProductItems
              key={index}
              id={item._id}
              name={item.name}
              image={item.image}
              price={item.price}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No best sellers found.
          </p>
        )}
      </div>
    </div>
  );
};

export default BestSeller;
