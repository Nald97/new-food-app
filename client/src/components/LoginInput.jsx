// // src/components/LoginInput.jsx

// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { fadeInOut } from "../animations";

// const LoginInput = ({
//   placeHolder,
//   icon,
//   inputState,
//   inputStateFunc,
//   type,
//   isSignUp,
// }) => {
//   const [isFocus, setIsFocus] = useState(false);
//   return (
//     <motion.div
//       {...fadeInOut}
//       className={`flex items-center justify-center gap-4 bg-lightOverlay backdrop-blur-md rounded-md w-full px-4 py-2 ${
//         isFocus ? "shadow-md shadow-red-400" : "shadow-md shadow-gray-400"
//       }`}
//     >
//       {icon}
//       <input
//         type={type}
//         placeholder={placeHolder}
//         className="w-full h-full bg-transparent text-headingColor text-lg font-semibold border-none outline-none"
//         value={inputState}
//         onChange={(e) => inputStateFunc(e.target.value)}
//         onFocus={() => setIsFocus(true)}
//         onBlur={() => setIsFocus(false)}
//       />
//     </motion.div>
//   );
// };

// export default LoginInput;

// src/components/LoginInput.jsx

// src/components/LoginInput.jsx

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fadeInOut } from "../animations";

const LoginInput = ({
  placeHolder,
  icon,
  inputState,
  inputStateFunc,
  type,
  isSignUp,
  validateInput = () => "", // Validation function prop
}) => {
  const [isFocus, setIsFocus] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [touched, setTouched] = useState(false); // State to track if the input has been touched

  // Effect to validate input when it changes, only if it has been touched
  useEffect(() => {
    if (touched) {
      setErrorMessage(validateInput(inputState));
    }
  }, [inputState, validateInput, touched]);

  return (
    <motion.div
      {...fadeInOut}
      className={`flex flex-col justify-center gap-2 bg-lightOverlay backdrop-blur-md rounded-md w-full px-4 py-2 ${
        isFocus ? "shadow-md shadow-red-400" : "shadow-md shadow-gray-400"
      }`}
    >
      <div className="flex items-center gap-4">
        {icon}
        <input
          type={type}
          placeholder={placeHolder}
          className="w-full h-full bg-transparent text-headingColor text-lg font-semibold border-none outline-none"
          value={inputState}
          onChange={(e) => {
            inputStateFunc(e.target.value);
            if (!touched) setTouched(true); // Mark as touched on change
          }}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
        />
      </div>
      {touched && errorMessage && (
        <div className="text-xs text-red-500">{errorMessage}</div>
      )}
    </motion.div>
  );
};

export default LoginInput;
