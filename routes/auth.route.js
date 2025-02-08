const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  registerUser,
  loginUser,
  logOutUser,
  deleteUser,
  addProductToUserCart,
  deleteProductFromUserCart,
  getUserData,
  updateUser,
} = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth");

router.get("/", getAllUsers);
router.get("/user", authMiddleware, getUserData);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logOutUser);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);
// === CART ===
router.put("/:id/cart", addProductToUserCart);
router.delete("/:id/cart/:productId", deleteProductFromUserCart);

module.exports = router;
