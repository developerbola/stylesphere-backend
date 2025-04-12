const express = require("express");
const { makeStyle } = require("../controllers/make-style.controller");
const router = express.Router();

router.post("/", makeStyle);

module.exports = router;
