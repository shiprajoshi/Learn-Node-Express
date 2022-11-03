const { OrderedBulkOperation } = require("mongodb");
const Cart = require("../../models/Cart");
const Order = require("../../models/order");
const Product = require("../../models/product");
exports.getProducts = (req, res) => {
  //find method from mongoose returns you all the elements and also a cursor() and next() if you wanna use
  Product.find()
    .then((products) => {
      //console.log(products, "shop");
      res.render("shop/shop", { pageTitle: "Shop", products });
    })
    .catch((err) => console.log(err));
  //res.sendFile(path.join(dirName, "views", "shop.html"));
};

exports.getCart = (req, res) => {
  req.user
    .populate("cart.products.productId")
    .then((products) => {
      const productsArray = products.cart.products;
      // console.log(productsArray);
      res.render("shop/cart", {
        pageTitle: "Cart",
        products: productsArray,
        totalPrice: products.totalPrice,
      });
    })
    .catch((err) => console.log(err));
};

exports.getCheckout = (req, res) => {
  const id = req.user._id;
  Order.find({ userId: id })
    .then((result) => {
      console.log(result[0].products[0], "order");
      const products = result.map((p) => {
        return p.products;
      });
      res.render("shop/orders", {
        pageTitle: "Orders",
        orders: result,
      });
    })
    .catch((err) => console.log("err"));
};

exports.getProductDetails = (req, res) => {
  const { prodId } = req.params;
  console.log(prodId, "hello prodid");
  //mongose has findById method that will fetch a particular product with that id
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
      console.log("added to cart");
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};

exports.deleteItem = (req, res) => {
  Product.findById(req.params.id)
    .then((product) => {
      return req.user.deleteCartItem(product).then((result) => {
        res.redirect("/cart");
      });
    })
    .catch((err) => console.log(err));
};

exports.postCheckout = (req, res) => {
  console.log(req);
  req.user
    .populate("cart.products.productId")
    .then((products) => {
      const productsArray = products.cart.products;
      const prods = productsArray.map((i) => {
        return {
          quantity: i.quantity,
          product: { ...i.productId._doc },
        };
      });
      const order = new Order({
        products: prods,
        user: {
          name: req.user.name,
          userId: req.user._id,
        },
      });
      return order.save();
    })
    .then((result) => {
      return req.user.clearCart();
    })
    .then((result) => {
      res.redirect("/orders");
    });
  // .catch((err) => console.log(err));
  // .then((result) => {
  //   console.log("order saved");
  //   res.redirect("/orders");
  // })
  // .catch((err) => console.log(err));
  // Order.save({

  // })
  //   .then((result) => {
  //     res.redirect("/orders");
  //     console.log("order placed");
  //   })
  //   .catch((err) => console.log(err));
};
