// ContactComponent.js
import React, { useState } from "react";
import { MdOutlineKeyboardBackspace, MdOutlineMessage } from "react-icons/md";
import { motion } from "framer-motion";
import { EmptyCart } from "../assets";

const ContactComponent = ({ isContactFormVisible, onToggle }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");

  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className="w-full h-screen md:w-[350px] bg-white flex flex-col z-[101] drop-shadow-xl fixed top-0 right-0"
    >
      {/* Contact Header */}
      <div className="w-full flex flex-row-reverse items-center bg-white justify-between px-4 py-2 cursor-pointer">
        <motion.div whileTap={{ scale: 0.8 }} onClick={onToggle}>
          <MdOutlineKeyboardBackspace className="text-textColor text-2xl " />
        </motion.div>

        <motion.div
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 0.9 }}
          className="flex items-center justify-center gap-x-2 px-2"
        >
          <MdOutlineMessage className="text-xl cursor-pointer text-customOrange-500" />
          <span>CONTACT US</span>
        </motion.div>
      </div>

      {/* Form - Conditionally rendered based on isFormVisible */}
      {isContactFormVisible && (
        <div className="h-full w-full flex items-center flex-col justify-center px-4 bg-primary">
          <img src={EmptyCart} alt="not found" className="w-[40%] h-[15%]" />
          <br />
          <form
            action="#"
            className="mb-6 w-full flex itemx-center justify-center gap-y-3 flex-col"
          >
            {/* Form Fields */}
            <div className="mb-6">
              <input
                type="text"
                className="form-control block w-full px-4 py-2 text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:outline-none"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <input
                type="text"
                className="form-control block w-full px-4 py-2 text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:outline-none"
                placeholder="Email ID"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <input
                type="text"
                className="form-control block w-full px-4 py-2 text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:outline-none"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <textarea
                className="form-control block w-full min-h-[25vh] px-4 py-2 text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:outline-none"
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="text-white bg-customOrange-500 hover:bg-customOrange-500 w-full focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-customOrange-500 dark:hover:bg-orange-700 focus:outline-none dark:focus:ring-orange-800 block"
            >
              Send Message
            </button>
          </form>
          <p className="mb-2 cursor-pointer text-sm text-gray-500 dark:text-gray-400">
            <a href="mailto:gmaill@gmail.com" className="hover:underline">
              gmail@gmail.com
            </a>
          </p>
          <p className="text-sm cursor-pointer text-gray-500 dark:text-gray-400">
            <a href="tel:+90 555 555 55 55" className="hover:underline">
              +233 55 684 4331
            </a>
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default ContactComponent;
