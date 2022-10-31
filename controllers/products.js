const products = [];
exports.getAddProduct = (req, res) => {
  //res.sendFile(path.join(dirName, "views", "add-product.html"));
  res.render("add-product", { pageTitle: "Add a product" });
};

exports.postAddProduct = (req, res) => {
  console.log(req.body);
  products.push({ title: req.body.title });
  res.redirect("/");
};

exports.getProducts = (req, res) => {
  console.log("Second Middleware!!", products);
  //res.sendFile(path.join(dirName, "views", "shop.html"));
  res.render("shop", { pageTitle: "Shop", products });
};
