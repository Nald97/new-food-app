// import React, { useState } from "react";
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import { Avatar, Logo } from "../assets";
// import { isActiveStyles, isNotActiveStyles } from "../utils/styles";
// import { motion } from "framer-motion";
// import { buttonClcik, slideTop } from "../animations";
// import { MdLogout, MdShoppingCart } from "../assets/icons";
// import { useDispatch, useSelector } from "react-redux";
// import { getAuth } from "firebase/auth";
// import { app } from "../config/firebase.config";
// import { setUserNull } from "../context/actions/userActions";
// import { setCartOn } from "../context/actions/displayCartAction";
// import { RiArrowDropDownLine } from "react-icons/ri";
// import { HiOutlineMenuAlt2 } from "react-icons/hi";

// const Header = () => {
//   const user = useSelector((state) => state.user);
//   const cart = useSelector((state) => state.cart);

//   const [isMenu, setIsMenu] = useState(false);
//   const firebaseAuth = getAuth(app);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [isOpen, setIsOpen] = useState(false);
//   const [isOpenMobileNav, setIsOpenMobileNav] = useState(false);

//   const signOut = () => {
//     firebaseAuth
//       .signOut()
//       .then(() => {
//         dispatch(setUserNull());
//         navigate("/login", { replace: true });
//         // Close the mobile nav when user signs out
//         setIsOpenMobileNav(false);
//       })
//       .catch((err) => console.log(err));
//   };

//   // Toggle for mobile navigation menu
//   const toggleMobileNav = () => {
//     setIsOpenMobileNav(!isOpenMobileNav);
//   };

//   return (
//     <header className="w-screen fixed z-50 bg-cardOverlay backdrop-blur-md md:p-3 md:px-4 lg:p-6 lg:px-16">
//       {/* Mobile */}
//       <div className="md:hidden flex justify-between items-center p-4">
//         <img src={Logo} className="w-20" alt="Logo" />
//         <HiOutlineMenuAlt2 className="text-3xl" onClick={toggleMobileNav} />
//       </div>

//       {/* Mobile Navigation Menu */}
//       {isOpenMobileNav && (
//         <motion.div
//           initial={{ opacity: 0, x: 50 }}
//           animate={{ opacity: 1, x: 0 }}
//           exit={{ opacity: 0, x: 50 }}
//           className="md:hidden absolute top-0 right-0 w-[75vw] h-screen bg-white p-4 shadow-lg"
//         >
//           <ul className="flex flex-col gap-4">
//             <NavLink to="/" onClick={toggleMobileNav}>
//               Home
//             </NavLink>
//             <NavLink to="/menu" onClick={toggleMobileNav}>
//               Menu
//             </NavLink>

//             <NavLink to="/about-us" onClick={toggleMobileNav}>
//               About Us
//             </NavLink>
//             {/* Additional links as needed */}
//             {user && (
//               <li className="mt-4">
//                 <button
//                   onClick={signOut}
//                   className="px-4 py-2 rounded-md shadow-md bg-red-500 text-white w-full"
//                 >
//                   Sign Out
//                 </button>
//               </li>
//             )}
//           </ul>
//         </motion.div>
//       )}
//       {/* Tablet and Desktop */}
//       <div className="hidden md:flex w-full justify-between itesm-center">
//         <NavLink to={"/"} className="flex items-center justify-center gap-4">
//           <img src={Logo} className="w-20" alt="" />
//         </NavLink>

//         <nav className="flex-1 flex items-center justify-center">
//           <ul className="flex items-center justify-center gap-8">
//             <NavLink
//               className={({ isActive }) =>
//                 isActive ? isActiveStyles : isNotActiveStyles
//               }
//               to={"/"}
//             >
//               Home
//             </NavLink>
//             <NavLink
//               className={({ isActive }) =>
//                 isActive ? isActiveStyles : isNotActiveStyles
//               }
//               to={"/menu"}
//             >
//               Menu
//             </NavLink>

//             <NavLink
//               className={({ isActive }) =>
//                 isActive ? isActiveStyles : isNotActiveStyles
//               }
//               to={"/about-us"}
//             >
//               About Us
//             </NavLink>
//           </ul>
//         </nav>

//         <nav className="flex-1 flex items-center justify-center">
//           <ul className="flex items-center justify-center gap-2">
//             <motion.div
//               {...buttonClcik}
//               onClick={() => dispatch(setCartOn())}
//               className="relative cursor-pointer "
//             >
//               <MdShoppingCart className="text-3xl text-textColor" />
//               {cart?.length > 0 && (
//                 <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center absolute -top-4 -right-1">
//                   <p className="text-primary text-base font-semibold">
//                     {cart?.length}
//                   </p>
//                 </div>
//               )}
//             </motion.div>
//           </ul>
//         </nav>

//         {user ? (
//           <>
//             <div
//               className="relative cursor-pointer"
//               onMouseEnter={() => setIsMenu(true)}
//             >
//               <div className="w-12 h-12 rounded-full shadow-md cursor-pointer overflow-hidden flex items-center justify-center">
//                 <motion.img
//                   className="w-full h-full object-cover"
//                   src={user?.picture ? user?.picture : Avatar}
//                   whileHover={{ scale: 1.15 }}
//                   referrerPolicy="no-referrer"
//                 />
//               </div>

//               {isMenu && (
//                 <motion.div
//                   {...slideTop}
//                   onMouseLeave={() => setIsMenu(false)}
//                   className="px-6 py-4 w-48 bg-white backdrop-blur-md rounded-md shadow-md absolute top-12 right-0 flex flex-col gap-4"
//                 >
//                   {user.email === "donaldisufi9@gmail.com" && (
//                     <Link
//                       className=" hover:text-red-500 text-xl text-textColor"
//                       to={"/dashboard/home"}
//                     >
//                       Dashboard
//                     </Link>
//                   )}

//                   <Link
//                     className=" hover:text-red-500 text-xl text-textColor"
//                     to={"/profile"}
//                   >
//                     My Profile
//                   </Link>
//                   <Link
//                     className=" hover:text-red-500 text-xl text-textColor"
//                     to={"/user-orders"}
//                   >
//                     Orders
//                   </Link>
//                   <hr />

//                   <motion.div
//                     {...buttonClcik}
//                     onClick={signOut}
//                     className="group flex items-center justify-center px-3 py-2 rounded-md shadow-md bg-gray-100 hover:bg-gray-200 gap-3"
//                   >
//                     <MdLogout className="text-2xl text-textColor group-hover::text-headingColor" />
//                     <p className="text-textColor text-md group-hover:text-headingColor">
//                       Sign Out
//                     </p>
//                   </motion.div>
//                 </motion.div>
//               )}
//             </div>
//           </>
//         ) : (
//           <>
//             <NavLink to={"/login"}>
//               <motion.button
//                 {...buttonClcik}
//                 className="px-4 py-2 rounded-md shadow-md bg-lightOverlay border border-red-300 cursor-pointer"
//               >
//                 Login
//               </motion.button>
//             </NavLink>
//           </>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;

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
        setIsOpenMobileNav(false);
      })
      .catch((err) => console.log(err));
  };

  const toggleMobileNav = () => {
    setIsOpenMobileNav(!isOpenMobileNav);
  };

  return (
    <header className="w-screen fixed z-50 bg-cardOverlay shadow-md backdrop-blur-md md:p-3 md:px-4 lg:p-6 lg:px-16">
      <div className="md:hidden flex justify-between items-center p-4">
        <img src={Logo} className="w-24" alt="Logo" />
        <HiOutlineMenuAlt2 className="text-3xl" onClick={toggleMobileNav} />
      </div>

      {isOpenMobileNav && (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          className="md:hidden absolute top-0 right-0 w-[75vw] h-screen bg-white p-4 shadow-lg"
        >
          <ul className="flex flex-col gap-4">
            <NavLink to="/" onClick={toggleMobileNav}>
              Home
            </NavLink>
            <NavLink to="/menu" onClick={toggleMobileNav}>
              Menu
            </NavLink>
            <NavLink to="/about-us" onClick={toggleMobileNav}>
              About Us
            </NavLink>
            {user && (
              <li className="mt-4">
                <button
                  onClick={signOut}
                  className="px-4 py-2 rounded-md shadow-md bg-red-500 text-white w-full"
                >
                  Sign Out
                </button>
              </li>
            )}
          </ul>
        </motion.div>
      )}

      <div className="hidden md:flex w-full justify-between items-center">
        <NavLink to={"/"} className="flex items-center">
          <img src={Logo} className="w-24" alt="Logo" />
        </NavLink>

        <nav className="flex justify-center items-center flex-grow">
          <ul className="flex items-center justify-center gap-8">
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
              to={"/about-us"}
            >
              About Us
            </NavLink>
          </ul>
        </nav>

        <div className="flex items-center justify-end gap-6">
          <motion.div
            {...buttonClcik}
            onClick={() => dispatch(setCartOn())}
            className="relative cursor-pointer"
          >
            <MdShoppingCart className="text-3xl text-textColor" />
            {cart?.length > 0 && (
              <div className="w-6 h-6 rounded-full bg-cartNumBg flex items-center justify-center absolute -top-3 -right-3">
                <p className="text-white text-xs font-semibold">
                  {cart?.length}
                </p>
              </div>
            )}
          </motion.div>
          <br />
          <br />

          {user ? (
            <div
              className="relative cursor-pointer flex items-center justify-center gap-2"
              onMouseEnter={() => setIsMenu(true)}
            >
              <motion.img
                className="w-12 h-12 rounded-full shadow-md cursor-pointer overflow-hidden flex items-center justify-center"
                src={user?.picture ? user?.picture : Avatar}
                whileHover={{ scale: 1.15 }}
                referrerPolicy="no-referrer"
              />
              {isMenu && (
                <motion.div
                  {...slideTop}
                  onMouseLeave={() => setIsMenu(false)}
                  className="px-6 py-4 w-48 bg-white backdrop-blur-md rounded-md shadow-md absolute top-12 right-0 flex flex-col gap-4"
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
                    <p className="text-textColor text-md group-hover:text-headingColor">
                      Sign Out
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </div>
          ) : (
            <NavLink to={"/login"}>
              <motion.button
                {...buttonClcik}
                className="px-4 py-2 rounded-md shadow-md bg-lightOverlay border border-red-300 cursor-pointer"
              >
                Login
              </motion.button>
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
