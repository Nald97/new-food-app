// src/components/OrderData.jsx

import { motion } from "framer-motion";
import React from "react";
import { buttonClcik, staggerFadeInOut } from "../animations";
import { getAllOrder, updateOrderSts } from "../api";
import { setOrders } from "../context/actions/ordersAction";
import { useDispatch } from "react-redux";

const OrderData = ({ index, data, admin }) => {
  const dispatch = useDispatch();
  const date = new Date(data?.pickupDate);
  const formattedDate = date.toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const handleClick = (orderId, sts) => {
    updateOrderSts(orderId, sts).then((response) => {
      getAllOrder().then((data) => {
        dispatch(setOrders(data));
      });
    });
  };

  return (
    <motion.div
      {...staggerFadeInOut(index)}
      className="w-full flex flex-col items-start justify-start px-3 py-2 border relative border-gray-300 bg-lightOverlay drop-shadow-md rounded-md gap-4"
    >
      <div className="w-full flex items-center justify-between">
        <h1 className="text-xl text-headingColor font-semibold">
          Order Details
        </h1>

        <div className="flex items-center gap-4">
          <p className="flex items-center gap-1 text-textColor">
            Total: Kč{" "}
            <span className="text-headingColor font-bold">{data?.total}</span>
          </p>

          <p className="px-2 py-[2px] text-sm text-headingColor font-semibold capitalize rounded-md bg-emerald-400 drop-shadow-md">
            {data?.status}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-start flex-wrap w-full">
        {data?.items &&
          data.items.map((item, j) => (
            <motion.div
              {...staggerFadeInOut(j)}
              key={j}
              className="flex items-center justify-center gap-4"
            >
              <img
                src={item.imageURL}
                className="w-20 h-20 object-contain"
                alt={item.product_name}
              />

              <div className="flex flex-col">
                <p className="text-base font-semibold text-headingColor">
                  {item.product_name}
                </p>
                <p className="text-sm text-textColor">Qty: {item.quantity}</p>
                <p className="flex items-center gap-1 text-textColor">
                  Kč {parseFloat(item.product_price).toFixed(2)}
                </p>
              </div>
            </motion.div>
          ))}

        <>
          <h2 className="ml-8 text-base text-headingColor font-semibold">
            Pickup Date:{" "} <br/>
            <span className="text-sm text-textColor">{formattedDate}</span>
          </h2>
        </>

        <div className="flex flex-col gap-2 px-6 ml-auto w-full md:w-460">
          <h1 className="text-lg text-headingColor font-semibold">
            Customer Details
          </h1>

          <p className="text-base text-headingColor -mt-2">{data.userEmail}</p>
          <p className="text-sm text-orange-400 font-semibold">
            Order ID: {data?.orderId}
          </p>

          {/* Assuming there's a field for customer's phone number in data, it's not shown in provided data structure */}
        </div>
      </div>
    </motion.div>
  );
};

export default OrderData;
