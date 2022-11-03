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
  req.user
    .getCartItems()
    .then((products) => {
      console.log(products.totalPrice, "prod");
      res.render("shop/cart", {
        pageTitle: "Cart",
        products: products.products,
        totalPrice: products.totalPrice,
      });
    })
    .catch((err) => console.log(err));
};

exports.getCheckout = (req, res) => {
  req.user
    .getOrders()
    .then((orders) => {
      res.render("shop/orders", { pageTitle: "Checkout", orders: orders });
      console.log(orders);
    })
    .catch((err) => console.log(err));
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
  Product.findById(req.body._id)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((result) => {
      console.log(result);
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};

exports.deleteItem = (req, res) => {
  Product.findById(req.params.id).then((product) => {
    req.user.deleteCartItem(product);
    res.redirect("/cart");
  });
};

exports.postCheckout = (req, res) => {
  console.log("hellooo", req);
  req.user
    .addOrder()
    .then((result) => {
      res.redirect("/orders");
      console.log("order placed");
    })
    .catch((err) => console.log(err));
};
