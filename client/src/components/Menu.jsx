import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Header, FilterSection, Cart } from "../components";

const Menu = () => {
  const isCart = useSelector((state) => state.isCart);

  return (
    <main className="w-screen min-h-screen flex items-center justify-start flex-col bg-primary">
      <Header />
      <div className="w-full flex flex-col items-start justify-center mt-40 px-6 md:px-24 2xl:px-40 gap-12 pb-24">
        <FilterSection />
      </div>
      {isCart && <Cart />}
    </main>
  );
};

export default Menu;
