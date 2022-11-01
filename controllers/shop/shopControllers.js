const Cart = require("../../models/Cart");
const Product = require("../../models/product");
exports.getProducts = (req, res) => {
  Product.fetchAll((products) => {
    res.render("shop/shop", { pageTitle: "Shop", products });
  });
  //res.sendFile(path.join(dirName, "views", "shop.html"));
};

exports.getCart = (req, res) => {
  res.render("shop/cart", { pageTitle: "Cart" });
};

exports.getCheckout = (req, res) => {
  res.render("shop/checkout", { pageTitle: "Checkout" });
};

exports.getProductDetails = (req, res) => {
  const { prodId } = req.params;
  Product.findById(prodId, (prodDetails) => {
    res.render("shop/product-details", {
      pageTitle: "ProductDetails",
      prodDetails: prodDetails,
    });
  });
};

exports.postAddToCart = (req, res) => {
  console.log(req.body);
  // res.send(200);
  Product.findById(req.body.id, (prodDetails) => {
    Cart.saveItem(prodDetails);
    res.redirect("shop/cart");
  });
};
