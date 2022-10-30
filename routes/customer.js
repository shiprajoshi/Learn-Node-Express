const express = require("express");
const path = require("path");
const dirName = require("./../utils/path");
const { products } = require("./admin");
const router = express.Router();

router.get("/", (req, res) => {
  console.log("Second Middleware!!", products);
  //res.sendFile(path.join(dirName, "views", "shop.html"));
  res.render("shop", { pageTitle: "Shop", products });
});

module.exports = router;
