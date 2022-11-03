const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

//Product with plural form would be used as collection name
module.exports = mongoose.model("Product", productSchema);

// const { getDB } = require("../utils/database");
// const mongodb = require("mongodb");

// class Product {
//   constructor(title, image, price, description, id, userId) {
//     this.title = title;
//     this.description = description;
//     this.price = price;
//     this.imageURL = image;
//     this._id = id;
//     this.userId = userId;
//   }

//   save() {
//     console.log("save me");
//     const db = getDB();
//     let dbOp;
//     if (this._id) {
//       console.log("update!!");
//       //update
//       dbOp = db
//         .collection("products")
//         .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: this });
//     } else {
//       dbOp = db.collection("products").insertOne(this);
//     }
//     return dbOp
//       .then((res) => console.log("entry added", res))
//       .catch((err) => console.log(err));
//   }

//   static fetchAll() {
//     console.log("fetch");
//     const db = getDB();
//     return db
//       .collection("products")
//       .find()
//       .toArray()
//       .then((res) => res)
//       .catch((err) => console.log(err));
//   }

//   static findById(id) {
//     const db = getDB();
//     return db
//       .collection("products")
//       .find({ _id: new mongodb.ObjectId(id) })
//       .next()
//       .then((res) => res)
//       .catch((err) => err);
//   }

//   static deleteById(id) {
//     const db = getDB();
//     return db
//       .collection("products")
//       .deleteOne({ _id: new mongodb.ObjectId(id) })
//       .then((res) => res)
//       .catch((err) => err);
//   }
// }

// module.exports = Product;
