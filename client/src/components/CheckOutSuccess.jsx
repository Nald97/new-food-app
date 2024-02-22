import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { clearCartItems } from "../context/actions/cartAction";
import { NavLink, useSearchParams } from "react-router-dom";
import emailjs from "emailjs-com";
import { FaArrowLeft } from "../assets/icons";
import { Bill } from "../assets";
import { Header } from "../components";
import { motion } from "framer-motion";
import { buttonClcik } from "../animations";
import { baseURL } from "../api";

export const your_service_ID = "service_narlpyw";
export const your_template_ID = "template_uwsfeqq";
export const your_user_ID = "2JHD0eSLPWztJcvel";

const CheckOutSuccess = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const session_id = searchParams.get("session_id");
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const [total, setTotal] = useState(0);
  const [orderFinalized, setOrderFinalized] = useState(false);

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

      (async () => {
        if (tot > 0 && user?.user_id && pickupDate) {
          const orderData = {
            userId: user.user_id,
            items: cart,
            total: tot,
            userEmail: user.email,
            pickupDate: pickupDate.toISOString(),
          };

          try {
            const response = await axios.post(
              `${baseURL}/api/products/createOrder`,
              { orderData }
            );
            // Assuming the order is successfully created if there's no error up to this point
            dispatch(clearCartItems());
            setOrderFinalized(true);

            // Sending email using EmailJS
            const emailTemplateParams = {
              to_name: user.email,
              from_name: "Perkana Semily", // Customize this
              orderId: session_id,
              pickupDate: pickupDate.toDateString(),
              userEmail: user.email,
              // Add more parameters based on your EmailJS template
            };

            emailjs
              .send(
                your_service_ID,
                your_template_ID,
                emailTemplateParams,
                your_user_ID
              )
              .then(
                (result) => {
                  console.log("Email sent successfully", result.text);
                },
                (error) => {
                  console.log("Failed to send email", error.text);
                }
              );

            localStorage.removeItem("selectedDate");
          } catch (err) {
            console.log(err);
          }
        }
      })();
    }
  }, [cart, user, dispatch, orderFinalized, pickupDate, session_id, total]);

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
