const express = require("express");
const path = require("path");
const adminControllers = require("../controllers/admin/adminControllers");
const dirName = require("./../utils/path");
const router = express.Router();

const products = [];

router.get("/add-product", adminControllers.getAddProduct);

//will execute only when the route matches for the post request.
router.post("/add-product", adminControllers.postAddProduct);

router.get("/products-list", adminControllers.getAdminProducts);

router.get("/edit-product/:id", adminControllers.editProduct);

router.post("/edit-product/:id", adminControllers.postEditProduct);

router.get("/delete/:id", adminControllers.getDeleteProduct);

module.exports = {
  router,
  products,
};
