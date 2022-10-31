const express = require("express");
const path = require("path");
const adminControllers = require("../controllers/products");
const dirName = require("./../utils/path");
const router = express.Router();

const products = [];

router.get("/add-product", adminControllers.getAddProduct);

//will execute only when the route matches for the post request.
router.post("/add-product", adminControllers.postAddProduct);

module.exports = {
  router,
  products,
};
