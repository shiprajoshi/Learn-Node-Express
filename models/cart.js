const fs = require("fs");
const path = require("path");
const dirName = require("../utils/path");
const filePath = path.join(dirName, "data", "cart.json");
class Cart {
  static saveItem(item) {
    console.log(item);
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
          updatedProduct = {
            id: item.id,
            qty: 1,
            price: item.price,
            item: item.title,
          };
          cartItems.products = [...cartItems.products, updatedProduct];
        }
        //calculating price
        cartItems.totalPrice = cartItems.totalPrice + item.price;
      }
      // console.log(cartItems, "items");
      fs.writeFile(filePath, JSON.stringify(cartItems), (err) => {});
    });
  }

  static fetchAll(cb) {
    fs.readFile(filePath, (err, content) => {
      let cartItems = [];
      if (!err) {
        cartItems = JSON.parse(content);
        cb(cartItems);
      } else cb([]);
    });
  }

  static deleteItem(id, cb) {
    console.log(id, "id");
    fs.readFile(filePath, (err, content) => {
      let cartItems;
      if (!err) {
        cartItems = JSON.parse(content);
        let cartProducts = cartItems.products;
        let totalPrice = cartItems.totalPrice;
        const deleteItemIndex = cartProducts.findIndex((prod) => prod.id == id);
        let deleteItemDetails = cartProducts[deleteItemIndex];

        if (deleteItemDetails.qty == 1) {
          cartProducts.splice(deleteItemIndex, 1);
          cartItems = {
            products: cartProducts,
            totalPrice: totalPrice - deleteItemDetails.price,
          };
        } else if (deleteItemDetails.qty > 1) {
          deleteItemDetails = {
            ...deleteItemDetails,
            qty: deleteItemDetails.qty - 1,
          };
          cartProducts[deleteItemIndex] = deleteItemDetails;
          cartProducts = [...cartProducts];

          console.log(cartProducts, "delereitemdetals");
          cartItems = {
            products: cartProducts,
            totalPrice: cartItems.totalPrice - deleteItemDetails.price,
          };
        }
        fs.writeFile(filePath, JSON.stringify(cartItems), (err) => {});
        cb("done");
      } else {
        cb("err");
      }
    });
  }
}

module.exports = Cart;
