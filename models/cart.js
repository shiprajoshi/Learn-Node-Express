const fs = require("fs");
const path = require("path");
const dirName = require("../utils/path");
const filePath = path.join(dirName, "data", "cart.json");
class Cart {
  static saveItem(item) {
    // let cartItems;
    fs.readFile(filePath, (err, content) => {
      let cartItems = { products: [], totalPrice: 0 };
      if (!err) {
        cartItems = JSON.parse(content);
        console.log(cartItems.products, "llklk");
        const existingProductIndex = cartItems.products.findIndex(
          (prod) => prod.id === item.id
        );
        const existingProduct = cartItems.products[existingProductIndex];

        let updatedProduct;

        if (existingProduct) {
          updatedProduct = { ...existingProduct };
          console.log(updatedProduct, "updatesdprod");
          updatedProduct.qty = updatedProduct.qty + 1;
          cartItems.products = [...cartItems.products];
          cartItems.products[existingProductIndex] = updatedProduct;
        } else {
          updatedProduct = { id: item.id, qty: 1, price: item.price };
          cartItems.products = [...cartItems.products, updatedProduct];
        }
        //calculating price
        cartItems.totalPrice = cartItems.totalPrice + item.price;
      }
      // console.log(cartItems, "items");
      fs.writeFile(filePath, JSON.stringify(cartItems), (err) => {});
    });
  }
}

module.exports = Cart;
