const { getDB } = require("../utils/database");
const mongodb = require("mongodb");

class Product {
  constructor(title, image, price, description, id) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.imageURL = image;
    this._id = id;
  }

  save() {
    console.log("save me");
    const db = getDB();
    let dbOp;
    if (this._id) {
      console.log("update!!");
      //update
      dbOp = db
        .collection("products")
        .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: this });
    } else {
      dbOp = db.collection("products").insertOne(this);
    }
    return dbOp
      .then((res) => console.log("entry added", res))
      .catch((err) => console.log(err));
  }

  static fetchAll() {
    console.log("fetch");
    const db = getDB();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((res) => res)
      .catch((err) => console.log(err));
  }

  static findById(id) {
    const db = getDB();
    return db
      .collection("products")
      .find({ _id: new mongodb.ObjectId(id) })
      .next()
      .then((res) => res)
      .catch((err) => err);
  }

  static deleteById(id) {
    const db = getDB();
    return db
      .collection("products")
      .deleteOne({ _id: new mongodb.ObjectId(id) })
      .then((res) => res)
      .catch((err) => err);
  }
}

module.exports = Product;
