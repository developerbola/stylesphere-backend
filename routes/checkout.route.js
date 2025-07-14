const express = require("express");
const {
  getCheckOuts,
  sendCheckOuts,
  deleteCheckOuts,
} = require("../controllers/checkout.controller");
const router = express.Router();

router.get("/", getCheckOuts);
router.post("/", sendCheckOuts);
router.delete("/:id", deleteCheckOuts);

module.exports = router;
