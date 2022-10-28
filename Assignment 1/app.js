const express = require("express");

const app = express();

app.use("/users", (req, res, next) => {
  console.log("First Middleware", "Users!!1");
  res.send("<h1>Middleware that handles just /users</h1>");
  //next();
});

app.use("/", (req, res, next) => {
  console.log("Default");
  res.send("<h1>Middleware that handles just /</h1>");
  next();
});

app.use((req, res, next) => {
  console.log("Third Middleware");
});

app.listen(3001);
