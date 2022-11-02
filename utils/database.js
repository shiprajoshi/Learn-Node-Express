const e = require("express");
const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;

let _db;
const mongoConnect = (callback) => {
  console.log("hello");
  mongoClient
    .connect(
      "mongodb+srv://shiprajoshi:shipra@cluster0.bqapehd.mongodb.net/shop?retryWrites=true&w=majority"
    )
    .then((client) => {
      console.log("**** Connected to Database ****");
      _db = client.db();
      callback();
    })
    .catch((err) => console.log(err));
};

const getDB = () => {
  if (_db) return _db;
  else return "No Db";
};

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;
