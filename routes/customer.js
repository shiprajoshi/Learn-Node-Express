const express = require("express");
const path = require("path");
const dirName = require("./../utils/path");
const customerControllers = require("./../controllers/products");
const router = express.Router();

router.get("/", customerControllers.getProducts);

module.exports = router;
