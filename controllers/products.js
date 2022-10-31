const Product = require("../models/product");

exports.getAddProduct = (req, res) => {
  //res.sendFile(path.join(dirName, "views", "add-product.html"));
  res.render("add-product", { pageTitle: "Add a product" });
};

exports.postAddProduct = (req, res) => {
  const prod = new Product(req.body.title);
  prod.save();
  res.redirect("/");
};

exports.getProducts = (req, res) => {
  Product.fetchAll((products) => {
    res.render("shop", { pageTitle: "Shop", products });
  });
  //res.sendFile(path.join(dirName, "views", "shop.html"));
};
