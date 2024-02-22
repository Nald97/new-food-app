import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Avatar, Logo } from "../assets";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";
import { motion } from "framer-motion";
import { buttonClcik, slideTop } from "../animations";
import { MdLogout, MdShoppingCart } from "../assets/icons";
import { useDispatch, useSelector } from "react-redux";
import { getAuth } from "firebase/auth";
import { app } from "../config/firebase.config";
import { setUserNull } from "../context/actions/userActions";
import { setCartOn } from "../context/actions/displayCartAction";
// import MobileNav from "./mobile-nav";
import { RiArrowDropDownLine } from "react-icons/ri";
import { HiOutlineMenuAlt2 } from "react-icons/hi";

const Header = () => {
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);

  const [isMenu, setIsMenu] = useState(false);
  const firebaseAuth = getAuth(app);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenMobileNav, setIsOpenMobileNav] = useState(false);

  const signOut = () => {
    firebaseAuth
      .signOut()
      .then(() => {
        dispatch(setUserNull());
        navigate("/login", { replace: true });
      })
      .catch((err) => console.log(err));
  };

  return (
    <header className="w-screen fixed z-50 bg-cardOverlay backdrop-blur-md md:p-3 md:px-4 lg:p-6 lg:px-16">
      {/* Tablet and Desktop */}
      <div className="hidden md:flex w-full justify-between itesm-center">
        <NavLink to={"/"} className="flex items-center justify-center gap-4">
          <img src={Logo} className="w-20" alt="" />
        </NavLink>

        <nav className="flex items-center justify-center gap-16">
          <ul className="hidden md:flex items-center justify-center gap-8">
            <NavLink
              className={({ isActive }) =>
                isActive ? isActiveStyles : isNotActiveStyles
              }
              to={"/"}
            >
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? isActiveStyles : isNotActiveStyles
              }
              to={"/menu"}
            >
              Menu
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? isActiveStyles : isNotActiveStyles
              }
              to={"/services"}
            >
              Services
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? isActiveStyles : isNotActiveStyles
              }
              to={"/aboutus"}
            >
              About Us
            </NavLink>
          </ul>

          <motion.div
            {...buttonClcik}
            onClick={() => dispatch(setCartOn())}
            className="relative cursor-pointer"
          >
            <MdShoppingCart className="text-3xl text-textColor" />
            {cart?.length > 0 && (
              <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center absolute -top-4 -right-1">
                <p className="text-primary text-base font-semibold">
                  {cart?.length}
                </p>
              </div>
            )}
          </motion.div>

          {user ? (
            <>
              <div
                className="relative cursor-pointer"
                onMouseEnter={() => setIsMenu(true)}
              >
                <div className="w-12 h-12 rounded-full shadow-md cursor-pointer overflow-hidden flex items-center justify-center">
                  <motion.img
                    className="w-full h-full object-cover"
                    src={user?.picture ? user?.picture : Avatar}
                    whileHover={{ scale: 1.15 }}
                    referrerPolicy="no-referrer"
                  />
                </div>

                {isMenu && (
                  <motion.div
                    {...slideTop}
                    onMouseLeave={() => setIsMenu(false)}
                    className="px-6 py-4 w-48 bg-lightOverlay backdrop-blur-md rounded-md shadow-md absolute top-12 right-0 flex flex-col gap-4"
                  >
                    {user.email === "donaldisufi9@gmail.com" && (
                      <Link
                        className=" hover:text-red-500 text-xl text-textColor"
                        to={"/dashboard/home"}
                      >
                        Dashboard
                      </Link>
                    )}

                    <Link
                      className=" hover:text-red-500 text-xl text-textColor"
                      to={"/profile"}
                    >
                      My Profile
                    </Link>
                    <Link
                      className=" hover:text-red-500 text-xl text-textColor"
                      to={"/user-orders"}
                    >
                      Orders
                    </Link>
                    <hr />

                    <motion.div
                      {...buttonClcik}
                      onClick={signOut}
                      className="group flex items-center justify-center px-3 py-2 rounded-md shadow-md bg-gray-100 hover:bg-gray-200 gap-3"
                    >
                      <MdLogout className="text-2xl text-textColor group-hover::text-headingColor" />
                      <p className="text-textColor text-xl group-hover:text-headingColor">
                        Sign Out
                      </p>
                    </motion.div>
                  </motion.div>
                )}
              </div>
            </>
          ) : (
            <>
              <NavLink to={"/login"}>
                <motion.button
                  {...buttonClcik}
                  className="px-4 py-2 rounded-md shadow-md bg-lightOverlay border border-red-300 cursor-pointer"
                >
                  Login
                </motion.button>
              </NavLink>
            </>
          )}
        </nav>
      </div>

      {/* Mobile
            <motion.div
        className="flex md:hidden w-full p-0 items-center justify-between"
        initial={{ opacity: 0, x: 200 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 200 }}
      >
        {isOpenMobileNav ? (
          <MobileNav isOpen={isOpenMobileNav} setIsOpen={setIsOpenMobileNav} />
        ) : (
          <div className="p-5 flex items-center justify-between w-full">
            <motion.div
              whileTap={{ scale: 0.9 }}
              className=" flex items-center justify-center"
              onClick={() => setIsOpenMobileNav(!isOpenMobileNav)}
            >
              <HiOutlineMenuAlt2 className="text-headingColor text-4xl" />
            </motion.div>
            <Link to={"/"}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="flex items-center gap-2 cursor-pointer"
              >
                <img src={Logo} alt="Logo" className="w-8 object-cover" />
                <p className="text-headingColor text-xl font-bold">
                  Pekarna Semily
                </p>
              </motion.div>
            </Link>
            {user ? (
              <div
                className={`flex items-center gap-3 px-3 py-1 rounded-lg relative`}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="group flex items-center justify-center"
                >
                  <img
                    src={user?.photoURL ? user.photoURL : Avatar}
                    className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-2xl rounded-full cursor-pointer"
                    alt="user-profile"
                    onClick={() => setIsOpen(!isOpen)}
                  />
                  <p className="text-headingColor cursor-pointer flex items-center justify-center gap-2">
                    <RiArrowDropDownLine />
                  </p>
                  {isOpen && <DropDown user={user} />}
                </motion.div>
              </div>
            ) : (
              <LoginAction mobile />
            )}
          </div>
        
      </motion.div>*/}
    </header>
  );
};

export default Header;
