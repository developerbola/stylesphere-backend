const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  registerUser,
  loginUser,
  logOutUser,
  deleteUser,
} = require("../controllers/auth.controller");

router.get("/", getAllUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logOutUser);
router.delete("/deleteUser/:id", deleteUser);

module.exports = router;
