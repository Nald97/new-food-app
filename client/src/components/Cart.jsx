/* eslint-disable array-callback-return */
// src/components/Cart.jsx

import axios from "axios";
import { motion } from "framer-motion";
import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  buttonClcik,
  slideIn,
  staggerFadeInOut,
  fadeInOut,
} from "../animations";

import { baseURL, getAllCartItems, increaseItemQuantity } from "../api";
import {
  BiChevronsRight,
  FcClearFilters,
  BsExclamationTriangleFill,
} from "../assets/icons";
import { alertNULL, alertSuccess } from "../context/actions/alertActions";
import { setCartItems, clearCartItems } from "../context/actions/cartAction";
import { setCartOff } from "../context/actions/displayCartAction";
import { setPickupDate } from "../context/actions/pickupDateAction";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { EmptyCart } from "../assets";

import { useNavigate } from "react-router-dom"; // Import useNavigate hook


export const AlertWarning = ({ alertMessage }) => {
  return (
    <motion.div
      {...fadeInOut}
      className="fixed w-auto top-32 right-96 px-4 py-2 rounded-md backdrop-blur-sm bg-orange-300 shadow-md flex items-center gap-4"
    >
      <BsExclamationTriangleFill className="text-6xl text-cartNumBg" />
      <p className="text-md text-cartNumBg">{alertMessage}</p>
    </motion.div>
  );
};

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const [clientSecret, setClientSecret] = useState("");
  const [total, setTotal] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDate, setSelectedDate] = useState(() => {
    const savedDate = localStorage.getItem("selectedDate");
    return savedDate ? new Date(savedDate) : new Date();
  });
  const navigate = useNavigate(); // Initialize useNavigate

  // Load cart from local storage when component mounts
  // useEffect(() => {
  //   const savedCart = loadCartFromLocalStorage();
  //   if (savedCart?.length > 0) {
  //     dispatch(setCartItems(savedCart));
  //   }
  // }, [dispatch]);

  // // Update local storage whenever the cart changes
  // useEffect(() => {
  //   saveCartToLocalStorage(cart);
  // }, [cart]);

  useEffect(() => {
    let tot = 0;
    if (cart) {
      cart.map((data) => {
        tot += data.product_price * data.quantity;
      });
      setTotal(tot);
    }
  }, [cart]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    dispatch(setPickupDate(date));
    localStorage.setItem("selectedDate", date.toISOString());
  };

  const handleCheckOut = () => {
    if (!user || !user.email) {
      // Update the state to display the alert
      setShowAlert(true);
      setAlertMessage("Please login to continue");

      // Hide the alert and redirect after a delay
      setTimeout(() => {
        setShowAlert(false); // Hide the alert
        navigate("/login");
      }, 3000); // Adjust delay as needed

      return;
    }

    setIsSubmitting(true);
    const data = {
      user: user,
      cart: cart,
      total: total,
      pickupDate: selectedDate,
      email: user.email,
    };

    axios
      .post(`${baseURL}/api/products/create-checkout-session`, { data })
      .then((res) => {
        if (res.data.url) {
          window.location.href = res.data.url;
        }
        setIsSubmitting(false);
      })
      .catch((err) => {
        console.error(err);
        setIsSubmitting(false);
      });
  };
  return (
    <motion.div
      {...slideIn}
      className="w-full h-screen md:w-[350px] bg-white md:backdrop-blur-sm flex flex-col z-[101] shadow-xl shadow-slate-700 fixed top-0 right-0"
    >
      {showAlert && <AlertWarning alertMessage={alertMessage} />}

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

      <div className="flex-1 flex flex-col items-start justify-start rounded-t-3xl  bg-white md:backdrop-blur-sm flex flex-col z-[101] drop-shadow-xl h-full py-0  gap-3 relative">
        {cart && cart?.length > 0 ? (
          <div className="flex-1 flex flex-col items-start justify-start rounded-t-3xl  bg-zinc-700 md:backdrop-blur-sm flex flex-col z-[101] drop-shadow-xl w-full h-full pt-6 pb-0   gap-3 relative">
            <div className="flex flex-col w-full items-start justify-start gap-3 h-[65%] ß scrollbar-none px-4">
              {cart &&
                cart?.length > 0 &&
                cart?.map((item, i) => (
                  <CartItemCard key={i} index={i} data={item} />
                ))}
            </div>

            <div className="w-full mt-2 md:mt-0 flex-1 rounded bg-cartItem rounded-t-[2rem] px-8 py-2 flex flex-col  justify-evenly">
              <p className="text-white flex items-center justify-center text-base md:text-xs uppercase">
                Select the Date You Want to Pick Up
              </p>
              <div className=" bg-transparent flex flex-col items-center justify-center">
                <DatePicker
                  style={{ backgroundColor: "cartNumBg" }}
                  selected={selectedDate}
                  onChange={handleDateChange}
                  dateFormat="dd/MM/yyyy"
                  className=" text-sm text-center"
                />
              </div>

              <div className="w-full flex items-center justify-between">
                <p className="text-gray-50 text-base md:text-lg uppercase">
                  Total
                </p>
                <span className="text-lg font-semibold text-cartNumBg">
                  Kč: &nbsp;<span className="text-white">{total}</span>
                </span>
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
          </div>
        ) : (
          <div className="w-full bg-white mt-10 p-5 flex flex-col items-center gap-4 justify-center">
            <img src={EmptyCart} alt="not found" className="h-[340px]" />
            <p className="text-textColor  font-semibold">Cart is empty</p>
          </div>
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

      <div className="flex flex-col items-start justify-start gap-1 w-full">
        <p className="text-sm text-white font-semibold">{data?.product_name}</p>
        <span className="text-sm font-semibold text-cartNumBg">
          Kč: &nbsp;<span className="text-white">{itemTotal}</span>
        </span>
      </div>

      <br />
      <div className="ml-auto flex items-center justify-center gap-3">
        <motion.div
          {...buttonClcik}
          onClick={() => decrementCart(data?.productId)}
          className="w-6 h-6 flex items-center justify-center rounded-md drop-shadow-md bg-zinc-900 cursor-pointer"
        >
          <p className="text-sm font-semibold text-primary">-</p>
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
