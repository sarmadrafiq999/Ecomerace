import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { FaChevronDown } from "react-icons/fa";
import Tittle from "../components/Tittle";
import ProductItems from "../components/ProductItems";
import { useLocation } from "react-router-dom";

const Collection = () => {
  const {
    products,
    search,
    setSearch,
    getAllProducts, // ✅ make sure this is exposed from context
  } = useContext(ShopContext);

  const [ShowFilter, SetShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subcategory, setSubategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  const location = useLocation();

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subcategory.includes(e.target.value)) {
      setSubategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubategory((prev) => [...prev, e.target.value]);
    }
  };

  // Apply filters
  const applyFilter = () => {
    let copyProds = [...products];

    if (search) {
      copyProds = copyProds.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      copyProds = copyProds.filter((item) => category.includes(item.category));
    }

    if (subcategory.length > 0) {
      copyProds = copyProds.filter((item) =>
        subcategory.includes(item.subcategory)
      );
    }

    setFilterProducts(copyProds);
  };

  // Apply sorting
  const sortProduct = () => {
    let sorted = [...filterProducts];

    if (sortType === "low-high") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortType === "high-low") {
      sorted.sort((a, b) => b.price - a.price);
    }

    setFilterProducts(sorted);
  };

  // 🔁 Reload products if navigating back to this route
  useEffect(() => {
    if (products.length === 0) {
      getAllProducts();
    }
  }, [location.pathname]);

  // Apply filters on dependency change
  useEffect(() => {
    applyFilter();
  }, [category, subcategory, search, products]);

  // Apply sorting after filtering
  useEffect(() => {
    sortProduct();
  }, [sortType, filterProducts.length]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter section */}
      <div className="min-w-60">
        <p
          onClick={() => SetShowFilter(!ShowFilter)}
          className="my-2 cursor-pointer text-xl flex items-center gap-2"
        >
          FILTERS
          <FaChevronDown
            className={`h-3 sm:hidden ${
              ShowFilter ? "rotate-90" : ""
            } cursor-pointer text-sm`}
          />
        </p>

        {/* Category filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            ShowFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {["Men", "Women", "Kids"].map((item) => (
              <label key={item} className="flex gap-2">
                <input
                  type="checkbox"
                  className="w-3"
                  value={item}
                  onChange={toggleCategory}
                />
                {item}
              </label>
            ))}
          </div>
        </div>

        {/* Subcategory filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${
            ShowFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {["Topwear", "Bottomwear", "Winterwear"].map((item) => (
              <label key={item} className="flex gap-2">
                <input
                  type="checkbox"
                  className="w-3"
                  value={item}
                  onChange={toggleSubCategory}
                />
                {item}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Products section */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Tittle text1={"ALL"} text2={"COLLECTIONS"} />
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 text-sm px-2"
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Product listing */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item, index) => (
            <ProductItems
              key={index}
              name={item.name}
              id={item._id}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
