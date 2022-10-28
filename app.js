const http = require("http");

const express = require("express");

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/add-product", (req, res) => {
  console.log("First Middleware!!");
  res.send(`<h1>The 'add product' page</h1>
            <form action="/product" method="POST"><input type="text" name="product-name"/>
            <button type="submit">Add product</button></form>`);
});

//will execute only when the route matches for the post request else it will fallback to  "/"
app.post("/product", (req, res) => {
  console.log(req.body);
  res.redirect("/");
});

app.use("/", (req, res, next) => {
  console.log("Second Middleware!!");
  res.send("<h1>Hello from express:)!!</h1>");
});

//const server = http.createServer(app); not required because express creates the server when we call listen method

app.listen(3000);
