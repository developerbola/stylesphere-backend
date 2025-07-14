const mongoose = require("mongoose");

const CheckoutsSchema = mongoose.Schema(
  {
    email: { type: String, required: [true, "Email is required"] },
    products: {
      type: Array,
      default: [],
      required: [true, "You need to give products to checkout!"],
    },
    status: {
      type: String,
      enum: ["Processing", "Shipped", "Failed", "Cancelled", "Completed"],
      required: [true, "Status is required"],
      default: "Proccessing",
    },
  },
  {
    timestamps: true,
  }
);

const Checkouts = mongoose.model("Checkouts", CheckoutsSchema);
module.exports = Checkouts;
