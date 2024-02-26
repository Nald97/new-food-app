import React from "react";
import { NavLink } from "react-router-dom";
import { Logo } from "../assets";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";

const DBLeftSection = () => {
  return (
    <div className="h-full py-12 flex flex-col bg-lightOverlay backdrop-blur-md shadow-md min-w-210 w-300 gap-3">
      <NavLink to={"/"} className="flex items-center justify-start px-6 gap-4">
        <img src={Logo} className="w-24" alt="" />
       
      </NavLink>

      <hr />

      <ul className="flex flex-col gap-4">
        <NavLink
          to={"/dashboard/home"}
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 border-l-8  border-red-500`
              : isNotActiveStyles
          }
        >
          Home
        </NavLink>
        <NavLink
          to={"/dashboard/orders"}
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 border-l-8  border-red-500`
              : isNotActiveStyles
          }
        >
          Orders
        </NavLink>
        <NavLink
          to={"/dashboard/items"}
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 border-l-8  border-red-500`
              : isNotActiveStyles
          }
        >
          Items
        </NavLink>
        <NavLink
          to={"/dashboard/newItem"}
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 border-l-8  border-red-500`
              : isNotActiveStyles
          }
        >
          Add New Item
        </NavLink>
      </ul>
    </div>
  );
};

export default DBLeftSection;
