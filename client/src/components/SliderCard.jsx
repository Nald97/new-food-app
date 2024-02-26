/* eslint-disable no-undef */
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { buttonClcik } from "../animations";
import { addNewItemToCart, getAllCartItems } from "../api";
import { HiCurrencyRupee, IoBasket } from "../assets/icons";
import { alertNULL, alertSuccess } from "../context/actions/alertActions";
import { setCartItems } from "../context/actions/cartAction";

const SliderCard = ({ data, index }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [col, setCol] = useState(false);

  const sendToCart = () => {
    dispatch(alertSuccess("Added to the cart"));
    addNewItemToCart(user?.user_id, data).then((res) => {
      getAllCartItems(user?.user_id).then((items) => {
        dispatch(setCartItems(items));
      });
      setInterval(() => {
        dispatch(alertNULL());
      }, 3000);
    });
  };

  const forSale = data.forSale === "true"; // Assuming data.forSale is a string

  return (
    <motion.div
      whileTap={{ rotate: [0, -1, 1, -1, 0] }}
      className={`${
        !col ? "w-full max-w-[275px]" : "w-full max-w-[320px]"
      } sm:w-[300px] sm:max-w-[300px] ${
        col ? "my-4" : "my-2 sm:my-5"
      } h-auto bg-gray-100 rounded-lg p-2 px-3 backdrop-blur-lg drop-shadow-2xl shadow-gray-800 hover:drop-shadow-md cursor-pointer`}
    >
      <div className="w-full flex items-center justify-between">
        <motion.img
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 1.1 }}
          className="w-40 h-30 sm:w-60 sm:h-50 md:w-48 md:h-40 -mt-10 object-contain cursor-pointer"
          src={data.imageURL}
        />
        {forSale && (
          <motion.div
            {...buttonClcik}
            onClick={sendToCart}
            whileTap={{ scale: 1.1 }}
            whileHover={{ scale: 1.2 }}
            className="w-6 h-6 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-cartNumBg flex items-center justify-center cursor-pointer"
          >
            <IoBasket className="text-xl sm:text-2xl text-primary" />
          </motion.div>
        )}
      </div>
      <div className="w-full flex items-end justify-end flex-col">
        <p className="text-sm lg:text-lg font-semibold text-textColor truncate">
          {data.product_name}
        </p>
        {!forSale && (
          <p className="text-textColor text-xs">{data.product_category}</p>
        )}
        <p className="text-xs lg:text-md text-customOrange-500 font-semibold my-1 lg:my-2 truncate">
          {data.product_description}
        </p>
        {forSale && (
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm lg:text-base text-headingColor font-semibold">
              <span className="text-sm font-semibold text-cartNumBg">
                Kč: &nbsp;
              </span>
              {data.product_price}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default SliderCard;
