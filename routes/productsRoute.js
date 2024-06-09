const express = require("express");
const {
  getProduct,
  getProducts,
  searchProductController,
} = require("../controllers/productsController");
const router = express.Router();

//GET ROUTE FOR ALL PRODUCTS
router.route("/products").get(getProducts);

//GET ROUTE FOR SINGLE PRODUCT
router.route("/products/:id").get(getProduct);
router.route("/search/:keyword").get(searchProductController);


module.exports = router;
