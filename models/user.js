const { getDB } = require("../utils/database");
const mongodb = require("mongodb");
class User {
  constructor(name, email, cart, id) {
    this.name = name;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }
  save() {
    const db = getDB();
    return db
      .collection("users")
      .createOne(this)
      .then((res) => res)
      .catch((err) => err);
  }

  static findById(id) {
    const db = getDB();
    return db
      .collection("users")
      .findOne({ _id: new mongodb.ObjectId(id) })
      .then((res) => res)
      .catch((err) => err);
  }

  addToCart(product) {
    const existingProductIndex = this.cart.products.findIndex((prod) => {
      return prod.productId.toString() == product._id.toString();
    });
    const existingProduct = this.cart.products[existingProductIndex];
    let updatedCart;
    let totalPrice = !this.cart.totalPrice ? 0 : this.cart.totalPrice;
    if (existingProductIndex >= 0) {
      existingProduct.qty = existingProduct.qty + 1;
      updatedCart = {
        products: this.cart.products,
        totalPrice: Number(totalPrice) + Number(product.price),
      };
    } else {
      //if not present in cart
      updatedCart = {
        products: [
          ...this.cart.products,
          { productId: new mongodb.ObjectId(product._id), qty: 1 },
        ],
        totalPrice: totalPrice + Number(product.price),
      };
    }
    const db = getDB();
    return db
      .collection("users")
      .updateOne(
        { _id: new mongodb.ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }

  getCartItems() {
    const db = getDB();
    const prodIds = this.cart.products.map((prod) => prod.productId);
    return db
      .collection("products")
      .find({ _id: { $in: prodIds } })
      .toArray()
      .then((products) => {
        return {
          products: products.map((prod) => {
            return {
              ...prod,
              quantity: this.cart.products.find(
                (p) => p.productId.toString() == prod._id.toString()
              ),
            };
          }),
          totalPrice: this.cart.totalPrice,
        };
      });
  }

  deleteCartItem(product) {
    let updatedCartProducts = this.cart.products;
    const productIndex = this.cart.products.findIndex((prod) => {
      return prod.productId.toString() == product._id.toString();
    });
    console.log("delete cart items", updatedCartProducts[productIndex]);
    if (updatedCartProducts[productIndex].qty == 1) {
      updatedCartProducts = this.cart.products.filter((item) => {
        console.log(item.productId.toString(), product._id.toString(), "here");
        return item.productId.toString() !== product._id.toString();
      });
      console.log(updatedCartProducts, "helloooo");
    } else updatedCartProducts[productIndex].qty--;

    const db = getDB();
    return db.collection("users").updateOne(
      {
        _id: new mongodb.ObjectId(this._id),
      },
      {
        $set: {
          cart: {
            products: updatedCartProducts,
            totalPrice: this.cart.totalPrice - product.price,
          },
        },
      }
    );
  }

  addOrder() {
    const db = getDB();
    return this.getCartItems()
      .then((products) => {
        const order = {
          products: products,
          user: {
            _id: new mongodb.ObjectId(this._id),
            name: this.name,
          },
          totalPrice: this.cart.totalPrice,
        };
        return db.collection("orders").insertOne(order);
      })
      .then((res) => {
        this.cart = { products: [], totalPrice: 0 };
        return db.collection("users").updateOne(
          {
            _id: new mongodb.ObjectId(this._id),
          },
          { $set: { cart: { products: [] } } }
        );
      });
  }

  getOrders() {
    const db = getDB();
    return db
      .collection("orders")
      .find({ "user._id": this._id })
      .toArray()
      .then((res) => res)
      .catch((err) => err);
  }
}

module.exports = User;
