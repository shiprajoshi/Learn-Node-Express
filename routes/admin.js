const express = require("express");
const router = express.Router();

router.get("/add-product", (req, res) => {
  console.log("First Middleware!!");
  res.send(`<h1>The 'add product' page</h1>
              <form action="/admin/add-product" method="POST"><input type="text" name="product-name"/>
              <button type="submit">Add product</button></form>`);
});

//will execute only when the route matches for the post request.
router.post("/add-product", (req, res) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;
