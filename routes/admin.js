const express = require("express");
const path = require("path");
const dirName = require("./../utils/path");
const router = express.Router();

const products = [];

router.get("/add-product", (req, res) => {
  console.log("First Middleware!!");
  //res.sendFile(path.join(dirName, "views", "add-product.html"));
  res.render("add-product", { pageTitle: "Add a product" });
});

//will execute only when the route matches for the post request.
router.post("/add-product", (req, res) => {
  console.log(req.body);
  products.push({ title: req.body.title });
  res.redirect("/");
});

module.exports = {
  router,
  products,
};
