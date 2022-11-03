const express = require("express");
const path = require("path");
const dirName = require("./../utils/path");
const customerControllers = require("../controllers/shop/shopControllers");
const router = express.Router();

router.get("/", customerControllers.getProducts);

router.get("/cart", customerControllers.getCart);

router.get("/orders", customerControllers.getCheckout);

router.get("/product-details/:prodId", customerControllers.getProductDetails);

router.post("/add-to-cart", customerControllers.postAddToCart);

router.get("/delete-item-from-cart/:id", customerControllers.deleteItem);

router.post("/orders", customerControllers.postCheckout);

module.exports = router;
