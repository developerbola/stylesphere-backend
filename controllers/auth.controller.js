const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserData = async (req, res) => {
  const id = req.params.id || req.user.id;
  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email }).collation({
      locale: "en",
      strength: 2,
    });
    if (existingUser)
      return res.status(400).json({ message: "Email already in use" });
    const user = new User({ name, email, password });
    await user.save();
    return res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Avoid returning sensitive user data
    const { password: _, ...userWithoutPassword } = user._doc;

    res.status(200).json({ user: userWithoutPassword, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An internal server error occurred" });
  }
};

const logOutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    req.user = null;
    return res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addProductToUserCart = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    const user = await User.findById(id);

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Ensure user cart exists
    if (!user.cart) {
      user.cart = [];
    }

    // Add product to cart
    user.cart.push(req.body);

    // Save user document
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.error("Error adding product to cart:", error);
    res.status(500).json({ message: error.message });
  }
};

const deleteProductFromUserCart = async (req, res) => {
  try {
    const { id, productId } = req.params;
    const user = await User.findById(id);

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find product index in cart
    const cart = user.cart;
    const productIndex = cart.findIndex((item) => item._id === productId);

    // Check if product exists in cart
    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    // Remove product from cart
    cart.splice(productIndex, 1);

    // Save user document
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserData,
  addProductToUserCart,
  deleteProductFromUserCart,
  registerUser,
  loginUser,
  logOutUser,
  deleteUser,
};
