import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCartItems } from "../context/actions/cartAction";
import { FaArrowLeft } from "../assets/icons";
import { NavLink, useSearchParams } from "react-router-dom";
import { Bill } from "../assets";
import { Header } from "../components";
import { motion } from "framer-motion";
import { buttonClcik } from "../animations";
import { baseURL } from "../api";

const CheckOutSuccess = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const session_id = searchParams.get("session_id");
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const [total, setTotal] = useState(0);
  const [orderFinalized, setOrderFinalized] = useState(false);

  // Retrieve the selected date from local storage
  const pickupDate = localStorage.getItem("selectedDate")
    ? new Date(localStorage.getItem("selectedDate"))
    : null;

  useEffect(() => {
    let tot = 0;
    if (cart && cart.length > 0 && !orderFinalized) {
      cart.forEach((item) => {
        tot += item.product_price * item.quantity;
      });
      setTotal(tot);

      // Immediately invoked async function to finalize order
      (async () => {
        if (tot > 0 && user?.user_id && pickupDate) {
          const orderData = {
            userId: user.user_id,
            items: cart,
            total: tot,
            userEmail: user.email,
            pickupDate: pickupDate.toISOString(), // Use the pickupDate in ISO string format
          };

          try {
            await axios.post(`${baseURL}/api/products/createOrder`, {
              orderData,
            });
            dispatch(clearCartItems());
            setOrderFinalized(true); // Prevent further API calls

            // Remove the selected date from local storage after order finalization
            localStorage.removeItem("selectedDate");
          } catch (err) {
            console.log(err);
          }
        }
      })();
    }
  }, [cart, user, dispatch, orderFinalized, pickupDate]);

  return (
    <main className="w-50 h-50 flex items-center justify-start flex-col">
      <Header />
      <div className="w-full flex flex-col items-center justify-center mt-40 px-6 md:px-24 2xl:px-96 gap-12 pb-24">
        <img src={Bill} className="w-full md:w-656" alt="" />

        <h1 className="text-[20px] text-headingColor font-bold">
          Amount paid Successfully
        </h1>

        <p>Session ID: {session_id}</p>

        <motion.div {...buttonClcik}>
          <NavLink
            to={"/"}
            className="flex items-center justify-center gap-4 cursor-pointer text-2xl text-textColor font-semibold px-4 py-2 rounded-md border border-gray-300 hover:shadow-md"
          >
            <FaArrowLeft className="text-xl text-textColor" /> Get back to Home
          </NavLink>
        </motion.div>
      </div>
    </main>
  );
};

export default CheckOutSuccess;
