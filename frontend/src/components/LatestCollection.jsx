import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Tittle from "./Tittle";
import ProductItems from "./ProductItems";

const LatestCollection = () => {
  const { products, search } = useContext(ShopContext); // include `search`
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    let filtered = products;

    // Filter based on search if not empty
    if (search && search.trim() !== "") {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Always show latest (first 10)
    setLatestProducts(filtered.slice(0, 10));
  }, [products, search]);

  return (
    <div className="my-10">
      <div className="text-center py-10 text-3xl">
        <Tittle text1={"Latest"} text2={"Collection"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis amet
          veritatis corporis nihil eveniet et, ab omnis commodi ipsa culpa
          quasi, molestias aliquid.
        </p>
      </div>

      {/* rendering products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestProducts.length > 0 ? (
          latestProducts.map((items, index) => (
            <ProductItems
              key={index}
              id={items._id}
              image={items.image}
              name={items.name}
              price={items.price}
            />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No products found.
          </p>
        )}
      </div>
    </div>
  );
};

export default LatestCollection;
