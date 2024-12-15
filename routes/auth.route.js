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
} = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth");

router.get("/", getAllUsers);
router.get("/user", authMiddleware, getUserData);
router.get("/:id", getUserData);
router.put("/:id/cart", addProductToUserCart);
router.delete("/:id/cart/:productId", deleteProductFromUserCart);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logOutUser);
router.delete("/deleteUser/:id", deleteUser);

module.exports = router;
