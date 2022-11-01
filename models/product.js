// const products = [];
const fs = require("fs");
const path = require("path");
const dirName = require("../utils/path");
const filePath = path.join(dirName, "data", "products.json");
class Product {
  constructor(title, image, price, description) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.imageURL = image;
  }

  save() {
    // products.push(this.title);
    this.id = Math.random();
    fs.readFile(filePath, (err, content) => {
      let products = [];
      if (!err) {
        products = JSON.parse(content);
        products.push(this);
      }
      fs.writeFile(filePath, JSON.stringify(products), (err) => {});
    });
  }

  static fetchAll(cb) {
    let products = [];
    fs.readFile(filePath, (err, content) => {
      if (!err) {
        products = JSON.parse(content);
        cb(products);
      } else {
        cb([]);
      }
    });
  }

  static findById(id, cb) {
    console.log(id, "hellou");
    let products = [];
    fs.readFile(filePath, (err, content) => {
      if (!err) {
        products = JSON.parse(content);
        console.log(products);
        const selectedProduct = products.find((prod) => prod.id == id);
        console.log(selectedProduct, "seleceee");
        cb(selectedProduct);
      } else {
        cb([]);
      }
    });
  }

  static editProductById(id, title, image, price, description, cb) {
    fs.readFile(filePath, (err, content) => {
      let products = [];
      if (!err) {
        products = JSON.parse(content);
        const newProducts = products.map((product) => {
          if (product.id == id) {
            product.title = title;
            product.image = image;
            product.price = price;
            product.description = description;
          }
          return product;
        });

        fs.writeFile(filePath, JSON.stringify(newProducts), (err) => {});
        cb(newProducts);
      } else {
        cb("err");
      }
    });
  }

  static deleteProductById(id, cb) {
    let products = [];
    fs.readFile(filePath, (err, content) => {
      if (!err) {
        products = JSON.parse(content);
        console.log(products, "hello before splice");

        const selectedProductIndex = products.findIndex(
          (prod) => prod.id == id
        );
        console.log(selectedProductIndex, "index at");
        products.splice(selectedProductIndex, 1);
        console.log(products, "hello after splice");
        fs.writeFile(filePath, JSON.stringify(products), (err) => {});
        cb(products);
      } else {
        cb([]);
      }
    });
  }
}

module.exports = Product;
