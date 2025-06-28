import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Tittle from "./Tittle";
import ProductItems from "./ProductItems";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestproducts, setBestproducts] = useState([]);
  useEffect(() => {
    const getbestsellerProducts = products.filter((items) => items.bestseller);
    setBestproducts(getbestsellerProducts.slice(0, 5));
  }, [products]);

  return (
    <div className="my-8">
      <div className="text-center text-3xl py-8">
        <Tittle text1={"BEST"} text2={"SELLER"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
          voluptatum aperiam impedit quo omnis dolor repellendus quisquam nisi
          mollitia hic. Unde explicabo quidem odio.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestproducts.map((item, index) => (
          <ProductItems
            key={index}
            id={item._id}
            name={item.name}
            image={item.image}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
