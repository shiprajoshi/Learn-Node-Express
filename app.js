const http = require("http");

const express = require("express");

const app = express();

app.use("/add-product", (req, res, next) => {
  console.log("First Middleware!!");
  res.send("<h1>The 'add product' page</h1>");
});

app.use("/", (req, res, next) => {
  console.log("Second Middleware!!");
  res.send("<h1>Hello from express:)!!</h1>");
});

//const server = http.createServer(app); not required because express creates the server when we call listen method

app.listen(3000);
