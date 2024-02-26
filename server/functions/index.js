/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-spacing */
/* eslint-disable max-len */
/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const functions = require("firebase-functions");
const admin = require("firebase-admin");
require("dotenv").config();

const serviceAccountKey = require("./serviceAccountKey.json");

const express = require("express");
const app = express();

// Body parser for our JSON data
app.use(express.json());

// cross orgin
const cors = require("cors");
app.use(cors({ origin: true }));
app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  next();
});

// firebase credentials
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
});

// api endpoints
app.get("/", (req, res) => {
  return res.send("hello word");
});

const userRoute = require("./routes/user");
app.use("/api/users", userRoute);

const productRoute = require("./routes/products");
app.use("/api/products/", productRoute);

exports.app = functions.https.onRequest(app);

// server/functions/index.js
// const functions = require("firebase-functions");
// const admin = require("firebase-admin");
// require("dotenv").config();
// const serviceAccountKey = require("./serviceAccountKey.json");
// const express = require("express");
// const app = express();
// const cors = require("cors");

// // Initialize Firebase Admin SDK
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccountKey),
// });
// const db = admin.firestore(); // Firestore reference

// app.use(express.json());
// app.use(cors({origin: true}));

// // Add Message Endpoint
// app.get("/api/addMessage", async (req, res) => {
//   const {text} = req.query;
//   if (!text) {
//     return res.status(400).send("No text provided");
//   }
//   try {
//     const writeResult = await db.collection("messages").add({original: text});
//     return res.json({result: `Message with ID: ${writeResult.id} added.`});
//   } catch (error) {
//     console.error("Error adding message to Firestore", error);
//     return res.status(500).send("Error adding message");
//   }
// });

// // Make Uppercase Firestore Trigger
// exports.makeUppercase = functions.firestore
//     .document("/messages/{documentId}")
//     .onCreate(async (snap, context) => {
//       const original = snap.data().original;
//       const uppercase = original.toUpperCase();
//       return snap.ref.set({uppercase}, {merge: true});
//     });

// // Existing routes and middleware
// app.use("/api/users", require("./routes/user"));
// app.use("/api/products", require("./routes/products"));

// exports.app = functions.https.onRequest(app);
