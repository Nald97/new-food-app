/* eslint-disable no-case-declarations */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable spaced-comment */
/* eslint-disable new-cap */
/* eslint-disable camelcase */
/* eslint-disable max-len */
// /* eslint-disable no-unused-vars */
// /* eslint-disable no-undef */
// /* eslint-disable camelcase */
// /* eslint-disable max-len */
// /* eslint-disable spaced-comment */
// /* eslint-disable new-cap */

const router = require("express").Router();

const admin = require("firebase-admin");
const db = admin.firestore();
const express = require("express");
db.settings({ignoreUndefinedProperties: true});
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
require("dotenv").config;

// eslint-disable-next-line spaced-comment
/********************************************************** */
// create a product
router.post("/create", async (req, res) => {
  try {
    const id = Date.now();
    const data = {
      productId: id,
      product_name: req.body.product_name,
      product_category: req.body.product_category,
      product_price: req.body.product_price,
      product_description: req.body.product_description,
      imageURL: req.body.imageURL,
      forSale: req.body.forSale,
    };

    const response = await db.collection("products").doc(`/${id}/`).set(data);
    console.log(response);
    return res.status(200).send({success: true, data: response});
  } catch (err) {
    return res.send({success: false, msg: `Error :${err}`});
  }
});

/********************************************************** */
// getall the products
router.get("/all", async (req, res) => {
  (async () => {
    try {
      const query = db.collection("products");
      const response = [];
      await query.get().then((querysnap) => {
        const docs = querysnap.docs;
        docs.map((doc) => {
          response.push({...doc.data()});
        });
        return response;
      });
      return res.status(200).send({success: true, data: response});
    } catch (err) {
      return res.send({success: false, msg: `Error :${err}`});
    }
  })();
});

/********************************************************** */
// delete a product
router.delete("/delete/:productId", async (req, res) => {
  const productId = req.params.productId;
  try {
    await db
        .collection("products")
        .doc(`/${productId}/`)
        .delete()
        .then((result) => {
          return res.status(200).send({success: true, data: result});
        });
  } catch (err) {
    return res.send({success: false, msg: `Error :${err}`});
  }
});

/********************************************************** */
// create a cart
router.post("/addToCart/:userId", async (req, res) => {
  const userId = req.params.userId;
  const productId = req.body.productId;

  try {
    const doc = await db
        .collection("cartItems")
        .doc(`/${userId}/`)
        .collection("items")
        .doc(`/${productId}/`)
        .get();

    if (doc.data()) {
      const quantity = doc.data().quantity + 1;
      const updatedItem = await db
          .collection("cartItems")
          .doc(`/${userId}/`)
          .collection("items")
          .doc(`/${productId}/`)
          .update({quantity});
      return res.status(200).send({success: true, data: updatedItem});
    } else {
      const data = {
        productId: productId,
        product_name: req.body.product_name,
        product_category: req.body.product_category,
        product_price: req.body.product_price,
        imageURL: req.body.imageURL,
        pickupDate: req.body.pickupDate,
        quantity: 1,
      };
      const addItems = await db
          .collection("cartItems")
          .doc(`/${userId}/`)
          .collection("items")
          .doc(`/${productId}/`)
          .set(data);
      return res.status(200).send({success: true, data: addItems});
    }
  } catch (err) {
    return res.send({success: false, msg: `Error :${err}`});
  }
});

/********************************************************** */
// update cart to increase and decrease the quantity
router.post("/updateCart/:user_id", async (req, res) => {
  const userId = req.params.user_id;
  const productId = req.query.productId;
  const type = req.query.type;

  try {
    const doc = await db
        .collection("cartItems")
        .doc(`/${userId}/`)
        .collection("items")
        .doc(`/${productId}/`)
        .get();

    if (doc.data()) {
      if (type === "increment") {
        const quantity = doc.data().quantity + 1;
        const updatedItem = await db
            .collection("cartItems")
            .doc(`/${userId}/`)
            .collection("items")
            .doc(`/${productId}/`)
            .update({quantity});
        return res.status(200).send({success: true, data: updatedItem});
      } else {
        if (doc.data().quantity === 1) {
          await db
              .collection("cartItems")
              .doc(`/${userId}/`)
              .collection("items")
              .doc(`/${productId}/`)
              .delete()
              .then((result) => {
                return res.status(200).send({success: true, data: result});
              });
        } else {
          const quantity = doc.data().quantity - 1;
          const updatedItem = await db
              .collection("cartItems")
              .doc(`/${userId}/`)
              .collection("items")
              .doc(`/${productId}/`)
              .update({quantity});
          return res.status(200).send({success: true, data: updatedItem});
        }
      }
    }
  } catch (err) {
    return res.send({success: false, msg: `Error :${err}`});
  }
});

/********************************************************** */
// get all the cartitems for that user
router.get("/getCartItems/:user_id", async (req, res) => {
  const userId = req.params.user_id;
  (async () => {
    try {
      const query = db
          .collection("cartItems")
          .doc(`/${userId}/`)
          .collection("items");
      const response = [];

      await query.get().then((querysnap) => {
        const docs = querysnap.docs;

        docs.map((doc) => {
          response.push({...doc.data()});
        });
        return response;
      });
      return res.status(200).send({success: true, data: response});
    } catch (er) {
      return res.send({success: false, msg: `Error :,${er}`});
    }
  })();
});

/********************************************************** */
// create a checkout session
router.post("/create-checkout-session", async (req, res) => {
  const customer = await stripe.customers.create({
    metadata: {
      user_id: req.body.data.user.user_id,
      cart: JSON.stringify(req.body.data.cart),
      total: req.body.data.total,
    },
  });

  const line_items = req.body.data.cart.map((item) => {
    return {
      price_data: {
        currency: "CZK",
        product_data: {
          name: item.product_name,
          images: [item.imageURL],
          metadata: {
            id: item.productId,
          },
        },
        unit_amount: item.product_price * 100,
      },
      quantity: item.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    customer_email: req.body.data.user.email,
    line_items,
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.CLIENT_URL}/checkout-cancel`,
    consent_collection: {
      terms_of_service: "required",
    },
    custom_text: {
      terms_of_service_acceptance: {
        message: "I agree to the [Terms of Service](https://example.com/terms)",
      },
    },
  });

  res.send({
    url: session.url,
    customer_email: session.customer_details.email,
  });
});

let endpointSecret;
// endpointSecret = process.env.WEBHOOK_SECRET;

/********************************************************** */
// Webhook handler for asynchronous events.
router.post(
    "/webhook",
    express.raw({type: "application/json"}),
    (req, res) => {
      const sig = req.headers["stripe-signature"];

      let eventType;
      let data;

      if (endpointSecret) {
        let event;
        try {
          event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
          console.log("event", event);
        } catch (err) {
          res.status(400).send(`Webhook Error: ${err.message}`);
          return;
        }
        data = event.data.object;
        eventType = event.type;
      } else {
        data = req.body.data.object;
        eventType = req.body.type;
      }

      // Handle the event
      if (eventType === "checkout.session.completed") {
        stripe.customers.retrieve(data.customer).then((customer) => {
          console.log("customer", customer);
          console.log("data", data);
        // createOrder(customer, data, res);
        });
      }

      // Return a 200 res to acknowledge receipt of the event
      res.send().end();
    },
);

/********************************************************** */
// create an order after the payment is successful
// Create an order and delete cart items
// router.post("/createOrder", async (req, res) => {
//   try {
//     const {userId, items, total, userEmail, pickupDate} = req.body.orderData; // Adjusted for the nested structure from the frontend

//     const orderId = Date.now().toString(); // Convert to string to avoid potential issues with number precision

//     const orderData = {
//       orderId,
//       userId,
//       items,
//       total,
//       userEmail,
//       pickupDate,
//       createdAt: admin.firestore.FieldValue.serverTimestamp(), // Correct usage for Firestore timestamp
//       status: "pending",
//     };

//     await db.collection("orders").doc(orderId).set(orderData); // Changed doc ID to orderId for uniqueness

//     if (items && items.length > 0) {
//       const batch = db.batch();
//       items.forEach((item) => {
//         const docRef = db
//             .collection("cartItems")
//             .doc(userId)
//             .collection("items")
//             .doc(item.productId);
//         batch.delete(docRef);
//       });
//       await batch.commit();
//     }

//     res.status(200).send({
//       success: true,
//       data: orderData,
//       message: "Order created and cart cleared.",
//     });
//   } catch (err) {
//     res.status(400).send({
//       success: false,
//       message: `Error creating order or clearing cart: ${err.message}`,
//     });
//   }
// });

/*router.post("/createOrder", async (req, res) => {
  try {
    const {userId, items, total, userEmail, pickupDate} = req.body.orderData; // Destructure the orderData

    // Proceed with creating the order
    const orderId = Date.now().toString(); // Unique orderId
    const orderData = {
      orderId,
      userId,
      items,
      total,
      userEmail,
      pickupDate,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      status: "pending",
    };

    await db.collection("orders").doc(orderId).set(orderData);

    // Clearing cart items
    const batch = db.batch();
    items.forEach((item) => {
      const docRef = db
          .collection("cartItems")
          .doc(userId)
          .collection("items")
          .doc(item.productId.toString());
      batch.delete(docRef);
    });
    await batch.commit();

    res.status(200).send({
      success: true,
      data: orderData,
      message: "Order created and cart cleared.",
    });
  } catch (err) {
    console.log(err); // Log the error to the console for debugging
    res.status(500).send({
      success: false,
      message: `Server error: ${err.message}`,
    });
  }
});*/

/********************************************************** */
/********************************************************** */
/********************************************************** */

router.post("/createOrder", async (req, res) => {
  const {userId, items, total, userEmail, pickupDate, sessionId} =
    req.body.orderData; // Include sessionId in your orderData from the frontend

  // Check for an existing order with the same sessionId to ensure idempotency
  const ordersCollection = db.collection("orders");
  const existingOrdersSnapshot = await ordersCollection
      .where("sessionId", "==", sessionId)
      .get();

  if (!existingOrdersSnapshot.empty) {
    // If an order with the same sessionId already exists, don't create a new one.
    return res.status(409).send({
      success: false,
      message: "An order with this session ID already exists.",
    });
  }

  // Proceed with creating the order if no existing order with the sessionId was found
  const orderId = Date.now().toString(); // Use current timestamp as order ID or generate a unique ID as per your preference
  const orderData = {
    orderId,
    userId,
    items,
    total,
    userEmail,
    pickupDate,
    sessionId, // Store this sessionId in your order for idempotency checks
    createdAt: admin.firestore.FieldValue.serverTimestamp(), // Use server timestamp for order creation time
    status: "pending",
  };

  try {
    await ordersCollection.doc(orderId).set(orderData);

    const batch = db.batch();
    items.forEach((item) => {
      const docRef = db
          .collection("cartItems")
          .doc(userId)
          .collection("items")
          .doc(item.productId.toString());
      batch.delete(docRef);
    });
    await batch.commit();

    res.status(201).send({
      success: true,
      data: orderData,
      message: "Order created successfully.",
    });
  } catch (error) {
    console.error("Error creating order: ", error);
    res.status(500).send({
      success: false,
      message: `Error creating order: ${error.message}`,
    });
  }
});

/********************************************************** */
/********************************************************** */
/********************************************************** */

/********************************************************** */
// delete the cart items after the order is created
const deleteCart = async (userId, items) => {
  console.log("Inside the delete");

  console.log(userId);

  console.log("*****************************************");
  items.map(async (data) => {
    console.log("-------------------inside--------", userId, data.productId);
    await db
        .collection("cartItems")
        .doc(`/${userId}/`)
        .collection("items")
        .doc(`/${data.productId}/`)
        .delete()
        .then(() => console.log("-------------------successs--------"));
  });
};

/********************************************************** */
// get all the orders for the admin
router.get("/orders", async (req, res) => {
  (async () => {
    try {
      const query = db.collection("orders");
      const response = [];
      await query.get().then((querysnap) => {
        const docs = querysnap.docs;
        docs.map((doc) => {
          response.push({...doc.data()});
        });
        return response;
      });
      return res.status(200).send({success: true, data: response});
    } catch (err) {
      return res.send({success: false, msg: `Error :${err}`});
    }
  })();
});

/********************************************************** */
// update the order status
router.post("/updateOrder/:order_id", async (req, res) => {
  const order_id = req.params.order_id;
  const sts = req.query.sts;

  try {
    const updatedItem = await db
        .collection("orders")
        .doc(`/${order_id}/`)
        .update({sts});
    return res.status(200).send({success: true, data: updatedItem});
  } catch (er) {
    return res.send({success: false, msg: `Error :,${er}`});
  }
});

module.exports = router;
