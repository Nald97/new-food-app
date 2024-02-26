// import { motion } from "framer-motion";
// import React from "react";
// import { buttonClcik, staggerFadeInOut } from "../animations";
// import { Delivery, HeroBg } from "../assets";
// import { randomData } from "../utils/styles";

// const Home = () => {
//   return (
//     <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
//       <div className="flex flex-col items-start justify-start gap-6">
//         <p className="text-[2rem] lg:text-[4rem] font-bold tracking-wide text-headingColor">
//           <span
//             style={{ color: "#D28C03", fontSize: "1.5rem" }}
//             className="lg:text-[2.3rem]"
//           >
//             Bakery Semily s.r.o
//           </span>
//         </p>
//         <p className="text-lg text-textColor text-center md:text-left md:w-[80%]">
//           In our bakery, we approach pastries with expertise and love. We love
//           baked goods and our work, and we pay attention to improving production
//           procedures and developing new products.
//         </p>

//         <motion.button
//           {...buttonClcik}
//           className="bg-gradient-to-br from-customOrange-500 to-customOrange-500 w-full md:w-auto px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100 text-white"
//         >
//           Order Now
//         </motion.button>
//       </div>

//       <div className="py-2 flex-1 flex items-center justify-end relative">
//         <img
//           className="absolute lg:h-[550px] h-[420px] w-full lg:w-auto"
//           src={HeroBg}
//           alt=""
//         />

//         <div className="w-full md:w-460 ml-0 flex flex-wrap items-center justify-center gap-4 gap-y-14">
//           {randomData &&
//             randomData.map((data, i) => (
//               <motion.div
//                 key={i}
//                 {...staggerFadeInOut(i)}
//                 className="cursor-pointer min-h-[140px] lg:min-h-[210px] min-w-[150px] lg:min-w-[200px] drop-shadow-lg p-2 bg-cardOverlay backdrop-blur-md rounded-xl flex flex-col items-center justify-center"
//               >
//                 <motion.img
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 1.1 }}
//                   src={data.imageURL}
//                   className="w-24 lg:w-40 -mt-10 lg:-mt-20"
//                   alt=""
//                 />
//                 <p className="text-base lg:text-lg font-semibold text-textColor">
//                   {data.product_name.slice(0, 14)}
//                 </p>

//                 <p className="text-[10px] lg:text-lg text-lightGray font-semibold my-2 lg:my-3">
//                   {data.product_category}
//                 </p>

//                 <p className="text-sm font-semibold text-headingColor">
//                   <span className="text-xs text-red-600">Kč</span>{" "}
//                   {data.product_price}
//                 </p>

//               </motion.div>
//             ))}
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default Home;

import { motion } from "framer-motion";
import React from "react";
import { buttonClcik, staggerFadeInOut } from "../animations"; // Assuming it's 'buttonClick', not 'buttonClcik'
import { Delivery, HeroBg } from "../assets";
import { randomData } from "../utils/styles";

const Home = () => {
  return (
    <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
      <div className="mb-8 flex flex-col items-start justify-start gap-6">
        <p className="text-4xl lg:text-8xl font-bold tracking-wide text-headingColor">
          <span style={{ color: "#D28C03" }} className="text-3xl lg:text-5xl">
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
          className="hidden md:inline-flex bg-gradient-to-br from-customOrange-500 to-customOrange-500 w-full md:w-auto px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-300 text-white"
        >
          Order Now
        </motion.button>
      </div>

      <div className="py-4 flex-1 flex items-center justify-end relative">
        <img
          className="absolute lg:h-[550px] h-[420px] w-full lg:w-auto object-cover" // Added object-cover for better image scaling
          src={HeroBg}
          alt="Hero Background"
        />

        <div className="w-full md:w-460 ml-0 flex flex-wrap items-center justify-center gap-4 gap-y-14">
          {randomData &&
            randomData.map((data, index) => (
              <motion.div
                key={index}
                {...staggerFadeInOut(index)}
                className="cursor-pointer min-h-[140px] lg:min-h-[210px] min-w-[150px] lg:min-w-[200px] drop-shadow-lg p-2 bg-cardOverlay backdrop-blur-md rounded-xl flex flex-col items-center justify-center"
              >
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  src={data.imageURL}
                  className="w-24 lg:w-40 -mt-10 lg:-mt-20"
                  alt={data.product_name}
                />
                <p className="text-base lg:text-lg font-semibold text-textColor">
                  {data.product_name.slice(0, 14)}
                </p>

                <p className="text-xs lg:text-lg text-lightGray font-semibold my-2 lg:my-3">
                  {data.product_category}
                </p>

                <p className="text-sm font-semibold text-headingColor">
                  <span className="text-xs text-cartNumBg">Kč</span>{" "}
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
