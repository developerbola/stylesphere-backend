const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product.model.js");
const productRoute = require("./routes/products.route.js");
const app = express();
const cors = require("cors");
const PORT = 3000;

const uri =
  "mongodb+srv://developerbola08:He2bCFddzX84TIR6@backenddb.dgv8u.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB";
// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// routes
app.use("/api/products", productRoute);


mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB: " + err.message || err);
  });
