const Cart = require("../../models/Cart");
const Product = require("../../models/product");
exports.getProducts = (req, res) => {
  Product.fetchAll()
    .then((products) => {
      res.render("shop/shop", { pageTitle: "Shop", products });
    })
    .catch((err) => console.log(err));
  //res.sendFile(path.join(dirName, "views", "shop.html"));
};

exports.getCart = (req, res) => {
  Cart.fetchAll((products) => {
    res.render("shop/cart", { pageTitle: "Cart", products });
  });
};

exports.getCheckout = (req, res) => {
  res.render("shop/checkout", { pageTitle: "Checkout" });
};

exports.getProductDetails = (req, res) => {
  const { prodId } = req.params;
  Product.findById(prodId)
    .then((productDetails) => {
      res.render("shop/product-details", {
        pageTitle: "ProductDetails",
        product: productDetails,
      });
    })
    .catch((err) => console.log(err));
};

exports.postAddToCart = (req, res) => {
  Product.findById(req.body.id, (prodDetails) => {
    Cart.saveItem(prodDetails);
    res.redirect("/");
  });
};

exports.deleteItem = (req, res) => {
  console.log(req.params.id, "id!!!!");
  Cart.deleteItem(req.params.id, (re) => {
    res.redirect("/cart");
  });
};
