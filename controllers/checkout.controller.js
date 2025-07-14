const Checkouts = require("../models/checkout.model");

const getCheckOuts = async (_, res) => {
  try {
    const checkOuts = await Checkouts.find({});
    res.status(200).json(checkOuts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const sendCheckOuts = async (req, res) => {
  try {
    const { email, products, status } = req.body;
    const checkout = new Checkouts({ email, products, status });
    await checkout.save();
    return res.status(201).json(checkout);
  } catch (error) {
    return res.status(400).json({
      error: error.message || "Validation failed",
      details: error.errors || null,
    });
  }
};

const deleteCheckOuts = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    
    const deletedCheckout = await Checkouts.findByIdAndDelete(id);
    if (!deletedCheckout) {
      return res.status(404).json({ message: "Checkout not found" });
    }
    return res.status(200).json({ message: "Checkout deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getCheckOuts, sendCheckOuts, deleteCheckOuts };
