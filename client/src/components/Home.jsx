import { motion } from "framer-motion";
import React from "react";
import { buttonClcik, staggerFadeInOut } from "../animations";
import { Delivery, HeroBg } from "../assets";
import { randomData } from "../utils/styles";

const Home = () => {
  return (
    <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
      <div className="flex flex-col items-start justify-start gap-6">
        <p className="text-[2rem] lg:text-[4rem] font-bold tracking-wide text-headingColor">
          <span
            style={{ color: "#D28C03", fontSize: "1.5rem" }}
            className="lg:text-[2.3rem]"
          >
            Bakery Semily s.r.o
          </span>
        </p>
        <p className="text-lg text-textColor text-center md:text-left md:w-[80%]">
          In our bakery, we approach pastries with expertise and love. We love
          baked goods and our work, and we pay attention to improving production
          procedures and developing new products.
        </p>

        <motion.button
          {...buttonClcik}
          className="bg-gradient-to-bl from-orange-400 to-orange-400 px-4 py-2 rounded-xl text-white text-base font-semibold"
        >
          Order Now
        </motion.button>
        <br />
      </div>

      <div className="py-2 flex-1 flex items-center justify-end relative">
        <img
          className="absolute lg:h-[550px] h-[420px] w-full lg:w-auto"
          src={HeroBg}
          alt=""
        />

        <div className="w-full md:w-460 ml-0 flex flex-wrap items-center justify-center gap-4 gap-y-14">
          {randomData &&
            randomData.map((data, i) => (
              <motion.div
                key={i}
                {...staggerFadeInOut(i)}
                className=" w-32 h-36 md:h-auto  md:w-190 p-4 bg-lightOverlay backdrop-blur-md rounded-3xl flex flex-col items-center justify-center drop-shadow-lg"
              >
                <img
                  src={data.imageURL}
                  className="w-12 h-12 md:w-32 md:h-32 md:-mt-16 object-contain "
                  alt=""
                />
                <p className="text-sm lg:text-xl font-semibold text-textColor">
                  {data.product_name.slice(0, 14)}
                </p>

                <p className="text-[12px] text-center  md:text-base text-lighttextGray font-semibold  capitalize">
                  {data.product_category}
                </p>

                <p className="text-sm  font-semibold text-headingColor">
                  <span className="text-xs text-red-600">Kč</span>{" "}
                  {data.product_price}
                </p>
              </motion.div>
            ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
