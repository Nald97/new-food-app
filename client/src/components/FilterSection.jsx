import { motion } from "framer-motion";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { staggerFadeInOut } from "../animations";
import { statuses } from "../utils/styles";
import SliderCard from "./SliderCard";
import { MdOutlineFastfood } from "react-icons/md";

import NotFoundImage from "../assets/img/NotFound.png";

const FilterSection = () => {
  const [category, setCategory] = useState("Fresh Leaf Scarves");
  const products = useSelector((state) => state.products);

  // Filter products based on the selected category
  const filteredProducts = (products || []).filter(
    (data) => data.product_category === category
  );

  return (
    <motion.div className="w-full my-5 flex items-start justify-start flex-col">
      <div className="w-full flex items-center justify-center">
        <div className="flex flex-col items-start justify-start gap-1">
          <p className="text-3xl text-headingColor">All Our Products</p>
          <div className="w-full h-1 rounded-md bg-orange-500"></div>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, x: 200 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 200 }}
        className={`w-full py-10 flex items-center justify-start lg:justify-center  h-auto gap-4 md:gap-8  px-2  overflow-x-scroll scrollbar-hidden  scroll-smooth`}
      >
        {statuses &&
          statuses.map((data) => (
            <FilterCard
              key={data.id} // Assuming `data.id` is unique
              data={data}
              category={category}
              setCategory={setCategory}
            />
          ))}
      </motion.div>

      <div className="w-full my-5 h-auto flex items-center justify-evenly flex-wrap gap-3 mt-12 bg-containerbg">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((data) => (
            <SliderCard key={data.id} data={data} /> // Assuming `data.id` is unique
          ))
        ) : (
          <div className="w-full flex justify-center items-center">
            <img
              src={NotFoundImage}
              alt="No items found"
              className="w-1/2 h-auto"
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export const FilterCard = ({ data, category, setCategory }) => {
  return (
    <motion.div
      onClick={() => setCategory(data.category)}
      whileTap={{ scale: 1.1 }}
      className={`group ${
        category === data.category
          ? "bg-red-500 hover:bg-red-600"
          : "bg-white hover:bg-red-200"
      } w-24 min-w-[6rem] h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center duration-150 transition-all ease-out mx-1`}
    >
      <div
        className={`w-10 h-10 rounded-full ${
          category === data.category ? "bg-red-200" : "bg-red-500"
        } flex items-center justify-center`}
      >
        <span
          className={`text-lg ${
            category === data.category ? "text-red-600" : "text-white"
          }`}
        >
          {data.icon || <MdOutlineFastfood />}
        </span>
      </div>
      <p
        className={`text-base font-semibold ${
          category === data.category ? "text-white" : "text-black"
        }`}
      >
        {data.title}
      </p>
    </motion.div>
  );
};

export default FilterSection;
