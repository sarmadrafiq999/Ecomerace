import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const onSubmittHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subcategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));
      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        `${backendUrl}/api/product/add`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setDescription("");
        setPrice("");
        setCategory("Men");
        setSubCategory("Topwear");
        setBestseller(false);
        setSizes([]);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmittHandler}
      className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-xl flex flex-col gap-5 font-sans"
    >
      <h2 className="text-xl font-semibold mb-2 text-gray-800">Add New Product</h2>

      {/* Image Upload */}
      <div>
        <p className="mb-2 font-medium">Upload Images</p>
        <div className="flex gap-3">
          {[image1, image2, image3, image4].map((img, index) => (
            <label key={index} htmlFor={`image${index + 1}`} className="cursor-pointer">
              <img
                className="w-20 h-20 object-cover rounded border hover:shadow-lg"
                src={!img ? assets.upload_area : URL.createObjectURL(img)}
                alt={`Preview ${index + 1}`}
              />
              <input
                type="file"
                id={`image${index + 1}`}
                hidden
                onChange={(e) =>
                  [setImage1, setImage2, setImage3, setImage4][index](e.target.files[0])
                }
              />
            </label>
          ))}
        </div>
      </div>

      {/* Name */}
      <div>
        <p className="mb-1 font-medium">Product Name</p>
        <input
          type="text"
          placeholder="Type product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Description */}
      <div>
        <p className="mb-1 font-medium">Product Description</p>
        <textarea
          placeholder="Write product description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-md shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows={4}
        />
      </div>

      {/* Category, Subcategory, Price */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <p className="mb-1 font-medium">Category</p>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border rounded-md shadow-sm"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className="mb-1 font-medium">Sub Category</p>
          <select
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            className="w-full px-3 py-2 border rounded-md shadow-sm"
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div>
          <p className="mb-1 font-medium">Price</p>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="e.g. 499"
            className="w-full px-3 py-2 border rounded-md shadow-sm"
          />
        </div>
      </div>

      {/* Sizes */}
      <div>
        <p className="mb-1 font-medium">Available Sizes</p>
        <div className="flex gap-3">
          {["S", "M", "L"].map((size) => (
            <button
              key={size}
              type="button"
              onClick={() =>
                setSizes((prev) =>
                  prev.includes(size)
                    ? prev.filter((s) => s !== size)
                    : [...prev, size]
                )
              }
              className={`px-4 py-1 rounded-md border font-medium transition ${
                sizes.includes(size)
                  ? "bg-black text-white border-black"
                  : "bg-gray-200 text-gray-700 border-gray-300 hover:bg-gray-300"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Bestseller checkbox */}
      <div className="flex items-center gap-2">
        <input
          id="bestseller"
          type="checkbox"
          checked={bestseller}
          onChange={() => setBestseller((prev) => !prev)}
          className="accent-black w-4 h-4"
        />
        <label htmlFor="bestseller" className="text-gray-700 cursor-pointer">
          Mark as Bestseller
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-32 py-2 mt-4 bg-black text-white rounded-md hover:bg-gray-800 transition"
      >
        Add Product
      </button>
    </form>
  );
};

export default Add;
