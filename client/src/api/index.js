// src/api/index.js

import axios from "axios";

// export const baseURL = "http://localhost:5001/perkana-semily/us-central1/app";

export const baseURL =
  "https://us-central1-perkana-semily.cloudfunctions.net/app";

export const validateUserJWTToken = async (token) => {
  try {
    const res = await axios.get(`${baseURL}/api/users/jwtVerfication`, {
      headers: { Authorization: "Bearer " + token },
    });
    return res.data.data;
  } catch (err) {
    return null;
  }
};

// add new product
export const addNewProduct = async (data) => {
  try {
    const res = await axios.post(`${baseURL}/api/products/create`, { ...data });
    return res.data.data;
  } catch (err) {
    return null;
  }
};

// get all the products
export const getAllProducts = async () => {
  try {
    const res = await axios.get(`${baseURL}/api/products/all`);
    return res.data.data;
  } catch (err) {
    return null;
  }
};

// delete a product
export const deleteAProduct = async (productId) => {
  try {
    const res = await axios.delete(
      `${baseURL}/api/products/delete/${productId}`
    );
    return res.data.data;
  } catch (err) {
    return null;
  }
};

// get all the users
export const getAllUsers = async () => {
  try {
    const res = await axios.get(`${baseURL}/api/users/all`);
    return res.data.data;
  } catch (err) {
    return null;
  }
};

// add an item to cart
// add new items to  the cart
export const addNewItemToCart = async (user_id, data) => {
  try {
    const res = await axios.post(
      `${baseURL}/api/products/addToCart/${user_id}`,
      { ...data }
    );
    return res.data.data;
  } catch (error) {
    return null;
  }
};

// get all the cart items
export const getAllCartItems = async (user_id) => {
  try {
    const res = await axios.get(
      `${baseURL}/api/products/getCartItems/${user_id}`
    );
    return res.data.data;
  } catch (error) {
    return null;
  }
};

// cart increment
export const increaseItemQuantity = async (user_id, productId, type) => {
  console.log(user_id, productId, type);
  try {
    const res = await axios.post(
      `${baseURL}/api/products/updateCart/${user_id}`,
      null,
      { params: { productId: productId, type: type } }
    );
    return res.data.data;
  } catch (error) {
    return null;
  }
};

// get all the orders
export const getAllOrder = async () => {
  try {
    const res = await axios.get(`${baseURL}/api/products/orders`);
    return res.data.data;
  } catch (error) {
    return null;
  }
};

// update the order status
export const updateOrderSts = async (order_id, sts) => {
  try {
    const res = await axios.post(
      `${baseURL}/api/products/updateOrder/${order_id}`,
      null,
      { params: { sts: sts } }
    );
    return res.data.data;
  } catch (error) {
    return null;
  }
};

// create order
// export const createOrder = async (orderData) => {
//   try {
//     const response = await axios.post(
//       `${baseURL}/api/products/createOrder`,
//       orderData
//     );
//     // Check if the response indicates success
//     if (response.data && response.data.success) {
//       // Order created and cart cleared successfully
//       return {
//         success: true,
//         data: response.data.data,
//         message: response.data.message,
//       };
//     } else {
//       // Handle case where the API response format is unexpected or indicates failure
//       console.error(
//         "Order creation succeeded but the response format was unexpected:",
//         response
//       );
//       return {
//         success: false,
//         message: "Unexpected response format from createOrder API.",
//       };
//     }
//   } catch (error) {
//     console.error("Error creating order:", error);
//     // Optionally, parse error response for detailed error message
//     const errorMessage =
//       error.response?.data?.message ||
//       "Failed to create order due to an error.";
//     return { success: false, message: errorMessage };
//   }
// };

// delete cart items after order has been created
export const deleteCartItems = async (user_id) => {
  try {
    const res = await axios.delete(
      `${baseURL}/api/products/deleteCartItems/${user_id}`
    );
    return res.data.data;
  } catch (error) {
    return null;
  }
};

// create checkout session
export const createCheckoutSession = async (data) => {
  try {
    const res = await axios.post(
      `${baseURL}/api/products/create-checkout-session`,
      { ...data }
    );
    return res.data.data;
  } catch (err) {
    return null;
  }
};
