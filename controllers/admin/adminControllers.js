const Product = require("../../models/product");

exports.getAddProduct = (req, res) => {
  //res.sendFile(path.join(dirName, "views", "add-product.html"));
  res.render("admin/add-product", { pageTitle: "Add a product" });
};

exports.getAdminProducts = (req, res) => {
  Product.fetchAll((products) => {
    res.render("admin/product-list", {
      pageTitle: "Admin Products List",
      products,
    });
  });
};

exports.postAddProduct = (req, res) => {
  const { title, image, price, description } = req.body;
  const prod = new Product(title, image, price, description);
  prod.save();
  res.redirect("/");
};

exports.editProduct = (req, res) => {
  const { id } = req.params;
  Product.findById(id, (prod) => {
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      productDetails: prod,
    });
  });
};

exports.postEditProduct = (req, res) => {
  console.log(req.params, "helloooo");
  const { id } = req.params;
  const { title, image, price, description } = req.body;
  Product.editProductById(id, title, image, price, description, (products) => {
    res.render("shop/shop", { pageTitle: "Shop", products });
  });
};

exports.getDeleteProduct = (req, res) => {
  const { id } = req.params;
  console.log(id, "params");
  Product.deleteProductById(id, (products) => {
    res.render("admin/product-list", {
      pageTitle: "Admin Products List",
      products,
    });
  });
};
