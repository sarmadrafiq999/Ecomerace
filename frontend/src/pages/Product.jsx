import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { FaStar } from "react-icons/fa";
import RelatedProduct from "../components/RelatedProduct";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  //
  const fetchProductData = async () => {
    // products.map((item) => {
    //   if (item._id === productId) {
    //     setProductData(item);
    //     setImage(item.image[0]);
    //     return null;
    //   }
    // });
    const foundProduct = products.find((item) => item._id === productId);
    if (foundProduct) {
      setProductData(foundProduct);
      console.log(foundProduct);
      // console.log(productId);
      setImage(foundProduct.image[0]);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-500 ">
      {/* prods data........ */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* prods images....... */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row ">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-auto justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className="w-[24%] sm:w-full  sm:mb-3 flex-shrink-0 cursor-pointer "
                alt=""
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
  <img className="w-full h-auto object-contain" src={image} alt="Product" />
</div>

        </div>
        {/* prod info.......*/}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <div className="text-2xl text-orange-500">
              <FaStar />
            </div>
            <div className="text-2xl text-orange-500">
              <FaStar />
            </div>
            <div className="text-2xl text-orange-500">
              <FaStar />
            </div>
            <div className="text-2xl text-orange-500">
              <FaStar />
            </div>
            <div className="text-2xl text-gray-200">
              <FaStar />
            </div>
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-3 mb-2 text-3xl font-medium">
            <span className="mx-2">{currency}</span>
            {productData.price}
          </p>
          <p className="mt-5 text-gray-600 md:w-4/5">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p className="font-medium text-xl">Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  key={index}
                  className={`border border-gray-300 hover:scale-110 hover:bg-gray-500 hover:text-white transition-transform duration-200 py-2 px-4 bg-gray-100 outline-none rounded-md ${
                    item === size
                      ? "border-orange-600 text-white bg-gray-500"
                      : ""
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => addToCart(productData._id, size)}
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
          >
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% original products.</p>
            <p>Cash on dilevery is avialable on this product.</p>
            <p>easy return and Exchange policey with in 7 days.</p>
          </div>
        </div>
      </div>
      {/* Description and Review Section */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews</p>
        </div>
        <div className="flex flex-col border gap-4 py-6 px-6 text-sm text-gray-500 ">
          <p className="">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, eaque
            ullam. Distinctio culpa suscipit tenetur adipisci natus quis dolorem
            unde est?
          </p>
          <p className="">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Similique
            labore accusantium sequi quibusdam dolore doloribus fugit
            necessitatibus, a quia possimus optio. Unde, in nulla?
          </p>
        </div>
      </div>
      {/* Related Product */}
      {/* <div className=""></div> */}
      <RelatedProduct
        category={productData.category}
        subcategory={productData.subcategory}
      />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
