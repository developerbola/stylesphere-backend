const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    name: { type: String, required: [true, "Product name is required"] },
    image: { type: String, required: [true, "Product image is required"] },
    price: { type: Number, required: [true, "Product price is required"] },
    category: { type: String, required: [true, "Product category is required"] },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
