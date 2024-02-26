import React from "react";
import storeInterior from "../assets/img/interiorShop.jpeg";
import location from "../assets/img/location.jpeg";
import { Header, Cart } from "../components";
import { useSelector } from "react-redux";

const AboutUs = () => {
  const isCart = useSelector((state) => state.isCart);

  return (
    <main className="w-50 h-50 flex items-center justify-start flex-col">
      <Header />
      <div className="w-full flex flex-col items-center justify-center mt-40 px-6 md:px-24 2xl:px-96 gap-12 pb-24">
        <div className="flex flex-wrap justify-between items-center mb-10">
          <div className="w-full md:w-1/2 p-4">
            <h2 className="text-2xl font-bold mb-6 text-customOrange-500">
              {" "}
              About Bakery Semily s.r.o
            </h2>
            <p className="text-sm mb-6">
              In our bakery, we approach pastries with expertise and love. We
              love baked goods and our work, and we pay attention to improving
              production procedures and developing new products.
            </p>
            <p className="text-sm mb-6">
              Historically, baked goods have always been the main component of
              the Czech diet and thus had to contain enough nutrients for every
              day. However, after the revolutionary year of 1989, the pressure
              to reduce prices increased due to the strong bargaining position
              of the retail chains. This resulted in a decrease in the quality
              of Czech bread and other baked goods.
            </p>
            <p className="text-sm mb-6">
              Our bakery goes against this development and offers only the best
              and tastiest products that do not lose their quality even the
              second day after they are baked.
            </p>
          </div>
          <div className="w-full md:w-1/2 p-4">
            <img
              src={storeInterior}
              alt="Bakery interior"
              className="rounded-lg shadow-lg w-full h-auto transform transition duration-500 hover:scale-105"
            />
          </div>
        </div>

        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/2 p-4 text-center md:text-left">
            <h2 className="text-2xl font-bold mb-6 text-customOrange-500">
              Come and Taste
            </h2>
            <p className="text-sm mb-6">
              Our recipes, our products, our establishment, and our employees.
              And you. All this is Semily Bakery. We take care of all this and
              do it with love and taste. Visit us and taste it yourself.
              Selected ingredients, traditional preparation, and emphasis on
              quality will certainly convince you too.
            </p>
            <h2 className="text-2xl font-bold mb-6 text-customOrange-500">
              Contact Us
            </h2>
            <p className="text-sm mb-2 italic">
              Phone: 481,625,470; 481,624,819
            </p>
            <p className="text-sm mb-2 italic">
              Address: Riegrovo náměstí 53, 513 01 Semily
            </p>
            <p className="text-sm mb-2 italic">
              Email:{" "}
              <a
                href="mailto:expedition@pekarnasemily.cz"
                className="underline text-[#D67C59]"
              >
                expedition@pekarnasemily.cz
              </a>
            </p>
          </div>
          <div className="w-full md:w-1/2 p-4">
            <img
              src={location}
              alt="Bakery location"
              className="rounded-lg shadow-lg w-full h-auto transform transition duration-500 hover:scale-105"
            />
          </div>
        </div>
      </div>
      {isCart && <Cart />}
    </main>
  );
};

export default AboutUs;
