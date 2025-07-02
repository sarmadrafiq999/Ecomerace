import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { FaStar } from "react-icons/fa";
import RelatedProduct from "../components/RelatedProduct";

const Product = () => {
  const { productId } = useParams();
  const {
    products,
    currency,
    addToCart,
    navigate,
    submitReview,
    getAverageRating,
  } = useContext(ShopContext);

  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);
  const [reviewMessage, setReviewMessage] = useState("");
  const [averageRating, setAverageRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [showReviewSection, setShowReviewSection] = useState(false);

  const fetchProductData = async () => {
    const foundProduct = products.find((item) => item._id === productId);
    if (foundProduct) {
      setProductData(foundProduct);
      setImage(foundProduct.image[0]);
    }

    const reviewData = await getAverageRating(productId);
    setAverageRating(reviewData.avgRating || 0);
    setReviewCount(reviewData.count || 0);
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-500 ">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
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
            <img
              className="w-full h-auto object-contain"
              src={image}
              alt="Product"
            />
          </div>
        </div>

        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <div key={star} className="text-2xl">
                <FaStar
                  className={
                    star <= Math.round(averageRating)
                      ? "text-orange-500"
                      : "text-gray-200"
                  }
                />
              </div>
            ))}
            <p className="pl-2">({reviewCount})</p>
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
            onClick={async () => {
              const added = await addToCart(productData._id, size);
              if (added) {
                setShowReviewSection(true); // ✅ only if added
              }
            }}
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
          >
            ADD TO CART
          </button>

          {/* ✅ Inline review section */}
          {showReviewSection && (
            <div className="border p-6 mt-6 bg-gray-100 rounded">
              <h2 className="text-lg font-semibold mb-3">Leave a Review</h2>

              <div className="flex items-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    onClick={() => setSelectedRating(star)}
                    className={`text-2xl cursor-pointer ${
                      selectedRating >= star
                        ? "text-orange-500"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              <textarea
                value={reviewMessage}
                onChange={(e) => setReviewMessage(e.target.value)}
                className="border p-2 w-full rounded mb-4"
                placeholder="Write your review..."
              ></textarea>

              <div className="flex gap-4">
                <button
                  onClick={async () => {
                    await submitReview(
                      productId,
                      selectedRating,
                      reviewMessage
                    );
                    setShowReviewSection(false);
                    fetchProductData(); // Refresh average rating
                  }}
                  className="bg-black text-white px-4 py-2 rounded"
                >
                  Submit
                </button>

                <button
                  onClick={() => setShowReviewSection(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                >
                  Skip
                </button>
              </div>
            </div>
          )}

          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% original products.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p
            onClick={() => navigate(`/reviews/${productId}`)}
            className="border px-5 py-3 text-sm cursor-pointer"
          >
            Reviews
          </p>{" "}
        </div>
        <div className="flex flex-col border gap-4 py-6 px-6 text-sm text-gray-500 ">
          <p className="">{productData.description}</p>
        </div>
      </div>

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
