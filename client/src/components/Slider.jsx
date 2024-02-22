import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "../assets/css/swiperStyles.css";
import "swiper/css/bundle";
import { useSelector } from "react-redux";
import { SliderCard } from "../components";
import { motion } from "framer-motion";

const Slider = () => {
  const products = useSelector((state) => state.products);
  const [fruits, setFruits] = useState(null);
  const [col, setCol] = useState(false);
  const [className, setClass] = useState("className");

  useEffect(() => {
    setFruits(products?.filter((data) => data.product_category === "fruits"));
    console.log(fruits);
  }, [products]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className={`${className} w-full my-4 flex items-center ${
        (!products || col) && "justify-center"
      }   min-h-[200px] gap-4  px-2 ${
        !col
          ? "overflow-x-scroll scrollbar-hidden scroll-smooth"
          : "overflow-x-hidden flex-wrap"
      }`}
    >
      <div className="w-full pt-24">
        {fruits &&
          fruits.map((data, i) => (
            <SwiperSlide key={i}>
              <SliderCard key={i} data={data} index={i} />
            </SwiperSlide>
          ))}
      </div>
    </motion.div>
  );
};

export default Slider;
