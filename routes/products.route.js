const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getSingleProduct,
  getHeroProducts,
  createProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/product.controller");

router.get("/", getAllProducts);
router.get("/hero", getHeroProducts);
router.post("/", createProduct);
router.get("/:id", getSingleProduct);
router.delete("/:id", deleteProduct);
router.put("/:id", updateProduct);

module.exports = router;
