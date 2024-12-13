require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const productRoute = require("./routes/products.route.js");
const authRoute = require("./routes/auth.route.js");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT;
const uri = process.env.MONGO_URI;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/users", authRoute); // Protected product routes
app.use("/api/products", productRoute); // Protected product routes

// Database Connection
mongoose
  .connect(uri, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB: " + err.message || err);
    console.error(
      "Ensure your IP is whitelisted and your connection string is correct."
    );
  });