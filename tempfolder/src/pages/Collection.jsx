import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { FaChevronDown } from "react-icons/fa";
import Tittle from "../components/Tittle";
import ProductItems from "../components/ProductItems";

const Collection = () => {
  const { products, search, setSearch } = useContext(ShopContext);
  const [ShowFilter, SetShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subcategory, setSubategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");
  //
  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };
  //
  const toggleSubCategory = (e) => {
    if (subcategory.includes(e.target.value)) {
      setSubategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let copyProds = products.slice();
    if (search && setSearch) {
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

  // Sort products
  const sortProduct = () => {
    let fpCopy = filterProducts.slice();
    switch (sortType) {
      case "low-high":
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
      default:
        applyFilter(fpCopy);
        break;
    }
  };
  //

  useEffect(() => {
    applyFilter();
  }, [category, subcategory, search, setSearch,products]);
  //
  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className=" flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t ">
      {/* filter options  */}
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
        {/* catagory filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            ShowFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATAGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Men"}
                onChange={toggleCategory}
              />
              Men
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Women"}
                onChange={toggleCategory}
              />
              Women
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Kids"}
                onChange={toggleCategory}
              />
              Kids
            </p>
          </div>
        </div>
        {/* Sub Catagory */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${
            ShowFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Topwear"}
                onChange={toggleSubCategory}
              />
              Topwear
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Bottomwear"}
                onChange={toggleSubCategory}
              />
              Bottomwear
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Winterwear"}
                onChange={toggleSubCategory}
              />
              Winterwear
            </p>
          </div>
        </div>
      </div>
      {/* Rightside  */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Tittle text1={"ALL"} text2={"COLLECTIONS"} />
          {/* Product Sort */}
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 text-sm px-2"
          >
            <option value="relevant">Sort by :Relavent </option>
            <option value="low-high">Sort by : Low to High </option>
            <option value="high-low">Sort by : High to Low</option>
          </select>
        </div>
        {/* map prod */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6 ">
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
