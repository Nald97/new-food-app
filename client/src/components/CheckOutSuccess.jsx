/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { clearCartItems } from "../context/actions/cartAction";
import { NavLink, useSearchParams } from "react-router-dom";
import { Header } from "../components";
import { motion } from "framer-motion";
import { buttonClcik } from "../animations";
import { baseURL } from "../api";
import { FaArrowLeft } from "../assets/icons";
import { Bill } from "../assets";

const CheckOutSuccess = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const session_id = searchParams.get("session_id");
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);

  // Removed the orderCreated state as we're now using a ref to track this.
  const orderSubmittedRef = useRef(false);

  const pickupDate = localStorage.getItem("selectedDate")
    ? new Date(localStorage.getItem("selectedDate"))
    : null;

  let total = 0;
  if (Array.isArray(cart)) {
    total = cart.reduce(
      (acc, item) => acc + item.product_price * item.quantity,
      0
    );
  }

  useEffect(() => {
    const createOrder = async () => {
      if (
        total > 0 &&
        user?.user_id &&
        pickupDate &&
        !orderSubmittedRef.current
      ) {
        const orderData = {
          userId: user.user_id,
          items: cart,
          total: total,

          userEmail: user.email,
          sessionId: session_id,
          pickupDate: pickupDate.toISOString(),
        };

        try {
          await axios.post(`${baseURL}/api/products/createOrder`, {
            orderData,
          });
          dispatch(clearCartItems());
          // Indicate order finalization for UI updates, if necessary.
          orderSubmittedRef.current = true; // Mark as order submitted to prevent duplicates.

          // // Sending email using EmailJS
          // const emailTemplateParams = {
          //   to_name: user.email,
          //   from_name: "Perkana Semily", // Customize this
          //   orderId: session_id,
          //   pickupDate: pickupDate.toDateString(),
          //   userEmail: user.email,
          //   // Add more parameters based on your EmailJS template
          // };

          // emailjs
          //   .send(
          //     your_service_ID,
          //     your_template_ID,
          //     emailTemplateParams,
          //     your_user_ID
          //   )
          //   .then(
          //     (result) => {
          //       console.log("Email sent successfully", result.text);
          //     },
          //     (error) => {
          //       console.log("Failed to send email", error.text);
          //     }
          //   );

          localStorage.removeItem("selectedDate");
        } catch (err) {
          console.error("Order creation failed:", err);
        }
      }
    };

    if (!orderSubmittedRef.current) {
      createOrder();
    }
  }, [dispatch, total, user, pickupDate, cart]);

  return (
    <main className="w-50 h-50 flex items-center justify-start flex-col">
      <Header />
      <div className="w-full flex flex-col items-center justify-center mt-40 px-6 md:px-24 2xl:px-96 gap-12 pb-24">
        <img
          src={Bill}
          className="w-full max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg"
          alt=""
        />

        <h1 className="text-lg md:text-xl lg:text-2xl text-headingColor font-bold text-center">
          Amount paid Successfully
        </h1>

        <motion.div {...buttonClcik}>
          <NavLink
            to={"/"}
            className="flex items-center justify-center gap-4 cursor-pointer text-lg md:text-xl lg:text-2xl text-textColor font-semibold px-4 py-2 rounded-md border border-gray-300 hover:shadow-md transition duration-300 ease-in-out"
          >
            <FaArrowLeft className="text-xl text-textColor" /> Get back to Home
          </NavLink>
        </motion.div>
      </div>
    </main>
  );
};

export default CheckOutSuccess;
