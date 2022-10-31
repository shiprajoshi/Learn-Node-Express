// const products = [];
const fs = require("fs");
const path = require("path");
const dirName = require("../utils/path");
const filePath = path.join(dirName, "data", "products.json");
class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    // products.push(this.title);
    fs.readFile(filePath, (err, content) => {
      let products = [];
      if (!err) {
        products = JSON.parse(content);
        products.push({ title: this.title });
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
}

module.exports = Product;
