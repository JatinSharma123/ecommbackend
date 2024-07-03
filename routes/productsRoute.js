const express = require("express");
const {
  getProduct,
  getProducts,
  searchProductController,
  addProduct,
} = require("../controllers/productsController");
const router = express.Router();

//GET ROUTE FOR ALL PRODUCTS
router.get("/products",getProducts);

//GET ROUTE FOR SINGLE PRODUCT
router.get("/products/:id",getProduct);
router.post("/products/add",addProduct);




module.exports = router;
