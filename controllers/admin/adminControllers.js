const Product = require("../../models/product");
const mongodb = require("mongodb");

exports.getAddProduct = (req, res) => {
  //res.sendFile(path.join(dirName, "views", "add-product.html"));
  res.render("admin/add-product", { pageTitle: "Add a product" });
};

exports.getAdminProducts = (req, res) => {
  Product.find()
    .then((products) => {
      console.log(products, "admin");
      res.render("admin/product-list", {
        pageTitle: "Admin Products List",
        products,
      });
    })
    .catch((err) => console.log(err));
};

exports.postAddProduct = (req, res) => {
  console.log(req.user, "postAddProduct");
  const { title, image, price, description } = req.body;
  const prod = new Product({
    title: title,
    imageURL: image,
    price: price,
    description: description,
    userId: req.user,
    // null,
    // req.user._id}
  });
  //save is provided by mongoose
  prod
    .save()
    .then((result) => {
      console.log("saved to database");
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
  Product.findById(prodId)
    .then((product) => {
      product.title = title;
      product.imageURL = image;
      product.price = price;
      product.description = description;
      return product.save();
    })
    .then((result) => {
      console.log("upadted in db");
      res.redirect("/admin/products-list");
    })
    .catch((err) => console.log("err in post edit product"));

  //   product
  //     .save()
  //     .then((result) => {
  //       console.log("updated!!!");
  //       res.redirect("/admin/products-list");
  //     })
  //     .catch((err) => console.log(err));
};

exports.getDeleteProduct = (req, res) => {
  const { id } = req.params;
  console.log(id, "params");
  Product.findByIdAndRemove(id)
    .then((result) => {
      console.log("deleted from DB");
      res.redirect("/admin/products-list");
    })
    .catch((err) => console.log(err));
};
