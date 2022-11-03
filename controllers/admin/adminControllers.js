const Product = require("../../models/product");
const mongodb = require("mongodb");

exports.getAddProduct = (req, res) => {
  //res.sendFile(path.join(dirName, "views", "add-product.html"));
  res.render("admin/add-product", { pageTitle: "Add a product" });
};

exports.getAdminProducts = (req, res) => {
  Product.fetchAll()
    .then((products) => {
      res.render("admin/product-list", {
        pageTitle: "Admin Products List",
        products,
      });
    })
    .catch((err) => console.log(err));
};

exports.postAddProduct = (req, res) => {
  const { title, image, price, description } = req.body;
  const prod = new Product(
    title,
    image,
    price,
    description,
    null,
    req.user._id
  );
  prod
    .save()
    .then((result) => {
      console.log(result);
      res.redirect("/");
    })
    .catch((err) => console.log(err, "err"));
};

exports.editProduct = (req, res) => {
  const { id } = req.params;
  console.log(id, "id!!!");
  Product.findById(id)
    .then((prod) => {
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        productDetails: prod,
      });
    })
    .catch((err) => console.log(err));
};

exports.postEditProduct = (req, res) => {
  const { id } = req.params;
  const { title, image, price, description } = req.body;
  const prodId = new mongodb.ObjectId(id);
  console.log(prodId, "id!!");
  const product = new Product(title, image, price, description, prodId);
  product
    .save()
    .then((result) => {
      console.log("updated!!!");
      res.redirect("/admin/products-list");
    })
    .catch((err) => console.log(err));
};

exports.getDeleteProduct = (req, res) => {
  const { id } = req.params;
  console.log(id, "params");
  Product.deleteById(id)
    .then((result) => {
      console.log(result);
      res.redirect("/admin/products-list");
    })
    .catch((err) => console.log(err));
};
