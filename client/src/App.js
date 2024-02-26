// import { getAuth } from "firebase/auth";
// import { motion } from "framer-motion";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Route, Routes } from "react-router-dom";
// import { fadeInOut } from "./animations";
// import { getAllCartItems, validateUserJWTToken } from "./api";
// import {
//   Alert,
//   MainLoader,
//   CheckOutSuccess,
//   UsersOrder,
//   AboutUs,
//   Menu,
//   Contact,
// } from "./components";
// import { app } from "./config/firebase.config";
// import { Dashboard, Login, Main } from "./containers";
// import { setCartItems } from "./context/actions/cartAction";
// import { setUserDetails } from "./context/actions/userActions";
// import { Navigate } from "react-router-dom";

// const App = () => {
//   const firebaseAuth = getAuth(app);
//   const [isLoading, setIsLoading] = useState(false);
//   const alert = useSelector((state) => state.alert);

//   const dispatch = useDispatch();

//   useEffect(() => {
//     setIsLoading(true);
//     firebaseAuth.onAuthStateChanged((cred) => {
//       if (cred) {
//         cred.getIdToken().then((token) => {
//           validateUserJWTToken(token).then((data) => {
//             if (data) {
//               getAllCartItems(data.user_id).then((items) => {
//                 console.log(items);
//                 dispatch(setCartItems(items));
//               });
//             }
//             dispatch(setUserDetails(data));
//           });
//         });
//       }
//       setInterval(() => {
//         setIsLoading(false);
//       }, 3000);
//     });
//   }, []);
//   return (
//     <div className="w-screen min-h-[100vh] h-auto flex flex-col items-center bg-primary justify-center">
//       {isLoading && (
//         <motion.div
//           {...fadeInOut}
//           className="fixed z-50 inset-0 backdrop-blur-md flex items-center justify-center w-full"
//         >
//           <MainLoader />
//         </motion.div>
//       )}
//       <Routes>
//         <Route path="/*" element={<Main />} />
//         <Route path="/login" element={<Login />} />
//         <Route
//           path="/dashboard/*"
//           element={
//             firebaseAuth.currentUser ? (
//               <Dashboard />
//             ) : (
//               <Navigate replace to="/login" />
//             )
//           }
//         />
//         <Route path="/checkout-success" element={<CheckOutSuccess />} />
//         <Route path="/user-orders" element={<UsersOrder />} />
//         <Route path="/about-us" element={<AboutUs />} />
//         <Route path="/menu" element={<Menu />} />
//         <Route path="/contact" element={<Contact />} />
//       </Routes>

//       {alert?.type && <Alert type={alert?.type} message={alert?.message} />}
//     </div>
//   );
// };

// export default App;

// App.js
import { getAuth } from "firebase/auth";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { fadeInOut } from "./animations";
import { getAllCartItems, validateUserJWTToken } from "./api";
import {
  Alert,
  MainLoader,
  CheckOutSuccess,
  UsersOrder,
  AboutUs,
  Menu,
  ContactComponent,
} from "./components";
import { app } from "./config/firebase.config";
import { Dashboard, Login, Main } from "./containers";
import { setCartItems } from "./context/actions/cartAction";
import { setUserDetails } from "./context/actions/userActions";
import { Navigate } from "react-router-dom";

const App = () => {
  const firebaseAuth = getAuth(app);
  const [isLoading, setIsLoading] = useState(false);
  const [isContactFormVisible, setIsContactFormVisible] = useState(false);
  const alert = useSelector((state) => state.alert);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    firebaseAuth.onAuthStateChanged((cred) => {
      if (cred) {
        cred.getIdToken().then((token) => {
          validateUserJWTToken(token).then((data) => {
            if (data) {
              getAllCartItems(data.user_id).then((items) => {
                console.log(items);
                dispatch(setCartItems(items));
              });
            }
            dispatch(setUserDetails(data));
          });
        });
      }
      setInterval(() => {
        setIsLoading(false);
      }, 3000);
    });
  }, []);

  const toggleContactForm = () => {
    setIsContactFormVisible(!isContactFormVisible);
  };

  return (
    <div className="w-screen min-h-[100vh] h-auto flex flex-col items-center bg-primary justify-center relative">
      {isLoading && (
        <motion.div
          {...fadeInOut}
          className="fixed z-50 inset-0 backdrop-blur-md flex items-center justify-center w-full"
        >
          <MainLoader />
        </motion.div>
      )}

      {/* Toggle Button */}
      <button
        onClick={toggleContactForm}
        className="fixed z-50 right-10 bottom-10 bg-customOrange-500 text-white p-4 rounded-full"
        aria-label="Toggle Contact Form"
      >
        {/* Icon or text to represent opening the contact form */}
        Contact Us
      </button>

      {/* Contact Form */}
      {isContactFormVisible && (
        <ContactComponent
          onToggle={toggleContactForm}
          isContactFormVisible={isContactFormVisible}
        />
      )}

      <Routes>
        <Route path="/*" element={<Main />} />{" "}
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard/*"
          element={
            firebaseAuth.currentUser ? (
              <Dashboard />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
        <Route path="/checkout-success" element={<CheckOutSuccess />} />
        <Route path="/user-orders" element={<UsersOrder />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/menu" element={<Menu />} />
      </Routes>

      {alert?.type && <Alert type={alert?.type} message={alert?.message} />}
    </div>
  );
};

export default App;
