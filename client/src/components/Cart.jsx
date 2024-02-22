/* eslint-disable array-callback-return */
// src/components/Cart.jsx

import axios from "axios";
import { motion } from "framer-motion";
import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { buttonClcik, slideIn, staggerFadeInOut } from "../animations";
import { baseURL, getAllCartItems, increaseItemQuantity } from "../api";
import { BiChevronsRight, FcClearFilters } from "../assets/icons";
import { alertNULL, alertSuccess } from "../context/actions/alertActions";
import { setCartItems } from "../context/actions/cartAction";
import { setCartOff } from "../context/actions/displayCartAction";
import { setPickupDate } from "../context/actions/pickupDateAction";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);

  const [total, setTotal] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDate, setSelectedDate] = useState(() => {
    const savedDate = localStorage.getItem("selectedDate");
    return savedDate ? new Date(savedDate) : new Date();
  });

  useEffect(() => {
    let tot = 0;
    if (cart) {
      cart.map((data) => {
        tot = tot + data.product_price * data.quantity;
        setTotal(tot);
      });
    }
  }, [cart]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    dispatch(setPickupDate(date));
    // Save the selected date to localStorage
    localStorage.setItem("selectedDate", date.toISOString());
  };

  const handleCheckOut = () => {
    setIsSubmitting(true); // Start submission
    const data = {
      user: user,
      cart: cart,
      total: total,
      pickupDate: selectedDate,
    };
    axios
      .post(`${baseURL}/api/products/create-checkout-session`, { data })
      .then((res) => {
        if (res.data.url) {
          window.location.href = res.data.url; // Redirect on success
        }
        setIsSubmitting(false); // Reset submission state on success
      })
      .catch((err) => {
        console.log(err); // Handle error
        setIsSubmitting(false); // Reset submission state on failure
      });
  };

  return (
    <motion.div
      {...slideIn}
      className="w-full h-screen md:w-[350px] bg-white md:backdrop-blur-sm flex flex-col z-[101] drop-shadow-xl fixed top-0 right-0"
    >
      <div className="w-full flex items-center bg-white justify-between px-4 py-2 cursor-pointer">
        <motion.i
          {...buttonClcik}
          className="cursor-pointer"
          onClick={() => dispatch(setCartOff())}
        >
          <BiChevronsRight className="text-[50px] text-textColor" />
        </motion.i>
        <p className="text-2xl text-headingColor font-semibold">Your Cart</p>
        <motion.i {...buttonClcik} className="cursor-pointer">
          <FcClearFilters className="text-[30px] text-textColor" />
        </motion.i>
      </div>

      <div className="flex-1 flex flex-col items-start justify-start rounded-t-3xl bg-zinc-900 h-full py-6  gap-3 relative">
        {cart && cart?.length > 0 ? (
          <>
            <div className="flex flex-col w-full items-start justify-start gap-3 h-[65%] overflow-y-scroll scrollbar-none px-4">
              {cart &&
                cart?.length > 0 &&
                cart?.map((item, i) => (
                  <CartItemCard key={i} index={i} data={item} />
                ))}
            </div>

            <div className="w-full mt-2 md:mt-0 flex-1 rounded bg-cartItem rounded-t-[2rem] px-8 py-2 flex flex-col items-center justify-evenly">
              <div className=" bg-transparent flex flex-col items-center justify-center">
                <DatePicker
                  theme={"dark"}
                  selected={selectedDate}
                  onChange={handleDateChange}
                  showTimeSelect
                  dateFormat="Pp"
                  className=" text-xs text-center"
                />
              </div>

              <div className="w-full flex items-center justify-between">
                <p className="text-gray-50 text-base md:text-lg uppercase">
                  Total
                </p>
                <p className="text-gray-50 text-base md:text-lg ">
                  Kč &nbsp;
                  {total}
                </p>
              </div>

              <motion.button
                {...buttonClcik}
                className="w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg"
                onClick={handleCheckOut}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Check Out"}
              </motion.button>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-3xl text-primary font-bold pl-2">Empty Cart</h1>
          </>
        )}
      </div>
    </motion.div>
  );
};

export const CartItemCard = ({ index, data }) => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const [itemTotal, setItemTotal] = useState(0);
  const dispatch = useDispatch();

  const decrementCart = (productId) => {
    dispatch(alertSuccess("Updated the cartitem"));

    increaseItemQuantity(user?.user_id, productId, "decrement").then((data) => {
      getAllCartItems(user?.user_id).then((items) => {
        dispatch(setCartItems(items));
        dispatch(alertNULL());
      });
    });
  };

  const incrementCart = (productId) => {
    dispatch(alertSuccess("Updated the cartitem"));
    increaseItemQuantity(user?.user_id, productId, "increment").then((data) => {
      getAllCartItems(user?.user_id).then((items) => {
        dispatch(setCartItems(items));
        dispatch(alertNULL());
      });
    });
  };

  useEffect(() => {
    setItemTotal(data.product_price * data.quantity);
  }, [itemTotal, cart]);

  return (
    <motion.div
      key={index}
      {...staggerFadeInOut(index)}
      className="w-full p-1 px-2 rounded-lg bg-cartItem hover:shadow-md flex items-center justify-between gap-2 cursor-pointer "
    >
      <div className="flex items-center  gap-2">
        <img
          src={data?.imageURL}
          className=" w-20 h-20 max-w-[60px] rounded-full object-contain"
          alt=""
        />
      </div>

      <div className="flex items-center justify-start gap-1 w-full">
        <p className="text-lg text-primary font-semibold">
          {data?.product_name}
          <span className="text-sm block capitalize text-gray-400">
            {data?.product_category}
          </span>
        </p>
        <p className="text-sm flex items-center justify-center gap-1 font-semibold text-red-400 ml-auto">
          Kč {itemTotal}
        </p>
      </div>

      <br />
      <div className="ml-auto flex items-center justify-center gap-3">
        <motion.div
          {...buttonClcik}
          onClick={() => decrementCart(data?.productId)}
          className="w-6 h-6 flex items-center justify-center rounded-md drop-shadow-md bg-zinc-900 cursor-pointer"
        >
          <p className="text-sm font-semibold text-primary">--</p>
        </motion.div>
        <p className="text-sm text-primary font-semibold">{data?.quantity}</p>
        <motion.div
          {...buttonClcik}
          className="w-6 h-6 flex items-center justify-center rounded-md drop-shadow-md bg-zinc-900 cursor-pointer"
          onClick={() => incrementCart(data?.productId)}
        >
          <p className="text-sm font-semibold text-primary">+</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Cart;
