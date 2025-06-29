import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Tittle from "../components/Tittle";
import axios from "axios";
import { toast } from "react-toastify";

const Orders = () => {
  const [orderData, setOrderData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const { backendUrl, token, currency } = useContext(ShopContext);

  const loadOrderData = async () => {
    try {
      if (!token) return;
      const response = await axios.post(
        `${backendUrl}/api/order/userorders`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        let allOrdersItems = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;
            allOrdersItems.push(item);
          });
        });
        setOrderData(allOrdersItems.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="border-t pt-16 px-4 sm:px-6 md:px-12 lg:px-20 max-w-[1440px] mx-auto">
      <div className="text-2xl mb-6 text-center sm:text-left">
        <Tittle text1={"MY"} text2={"ORDERS"} />
      </div>

      <div className="space-y-6">
        {orderData.map((item, index) => (
          <div
            key={index}
            className="py-4 border-b border-t text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
          >
            {/* Product Info */}
            <div className="flex gap-4 text-sm flex-1">
              <img
                className="w-16 sm:w-20 object-cover rounded"
                src={item.image[0]}
                alt=""
              />
              <div className="flex flex-col gap-1">
                <p className="text-base font-medium">{item.name}</p>
                <div className="flex flex-wrap items-center gap-4 mt-1 text-sm text-gray-700">
                  <p>
                    {currency} {item.price}
                  </p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Date: {new Date(item.date).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500">
                  Payment: {item.paymentMethod}
                </p>
              </div>
            </div>

            {/* Status & Track Button */}
            <div className="flex justify-between md:w-1/2 md:justify-end items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span className="text-sm md:text-base">{item.status}</span>
              </div>
              <button
                onClick={() => {
                  setSelectedItem(item);
                  setShowModal(true);
                }}
                className="border px-4 py-2 text-sm rounded-md hover:bg-gray-100 transition"
              >
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Tracking */}
      {showModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-[90%] sm:w-[400px] relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-3 text-2xl text-gray-600 hover:text-black"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4">Track Your Order</h2>
            <div className="space-y-2 text-sm">
              <p><strong>Product:</strong> {selectedItem.name}</p>
              <p><strong>Price:</strong> {currency} {selectedItem.price}</p>
              <p><strong>Quantity:</strong> {selectedItem.quantity}</p>
              <p><strong>Size:</strong> {selectedItem.size}</p>
              <p><strong>Status:</strong> {selectedItem.status}</p>
              <p><strong>Payment:</strong> {selectedItem.paymentMethod}</p>
              <p><strong>Date:</strong> {new Date(selectedItem.date).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
