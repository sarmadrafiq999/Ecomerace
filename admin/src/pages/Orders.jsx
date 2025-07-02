import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return;
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/status`,
        {
          orderId,
          status: event.target.value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        await fetchAllOrders();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("Status update error", error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 font-sans">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
        📬 All Orders
      </h2>

      <div className="flex flex-col gap-4">
        {orders.map((order, index) => (
          <div
            key={index}
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-4 items-start border rounded-xl bg-white shadow-sm p-5 text-sm text-gray-700"
          >
            {/* Parcel Icon */}
            <div className="flex justify-center items-start">
              <img src={assets.parcel_icon} alt="" className="w-10" />
            </div>

            {/* Order Items & Address */}
            <div className="space-y-2">
              <div className="space-y-1">
                {order.items.map((item, i) => (
                  <p key={i}>
                    {item.name} x {item.quantity}{" "}
                    <span className="text-gray-500">({item.size})</span>
                    {i !== order.items.length - 1 && ","}
                  </p>
                ))}
              </div>
              <div className="mt-3">
                <p className="font-medium">
                  {order.address.firstName + " " + order.address.lastName}
                </p>
                <p>{order.address.street}</p>
                <p>
                  {order.address.city}, {order.address.state},{" "}
                  {order.address.country} - {order.address.zipcode}
                </p>
                <p className="text-sm text-gray-600">{order.address.phone}</p>
              </div>
            </div>

            {/* Payment Info */}
            <div className="space-y-2">
              <p>
                <b>Items:</b> {order.items.length}
              </p>
              <p>
                <b>Method:</b> {order.paymentMethod}
              </p>
              <p>
                <b>Payment:</b>{" "}
                <span
                  className={`font-bold ${
                    order.payment ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {order.payment ? "Done" : "Pending"}
                </span>
              </p>
              <p>
                <b>Date:</b>{" "}
                {new Date(order.date).toLocaleDateString("en-GB")}
              </p>
            </div>

            {/* Total Amount */}
            <div className="text-lg font-semibold text-gray-800">
              {currency}
              {order.amount}
            </div>

            {/* Status Dropdown */}
            <select
              onChange={(e) => statusHandler(e, order._id)}
              value={order.status}
              className="p-2 border rounded-md font-medium bg-gray-100 hover:bg-gray-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}

        {orders.length === 0 && (
          <p className="text-center text-gray-500 mt-8">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
