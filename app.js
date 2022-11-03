const express = require("express");

const bodyParser = require("body-parser");
const path = require("path");
const adminData = require("./routes/admin");
const customerRoutes = require("./routes/customer");
const dirName = require("./utils/path");
const errorController = require("./controllers/error");
// const { mongoConnect } = require("./utils/database");

const mongoose = require("mongoose");
const User = require("./models/user");

const app = express();

// tells  express which templating engine are we using, so that it finds files with that extension
app.set("view engine", "ejs");

// tells express where to find the above mentioned dynamic views, in our case /views
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  User.findById("6363c068c9e58b5ff73b8f96")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

//filter using /admin routes
app.use("/admin", adminData.router);

app.use(customerRoutes);

app.use(express.static(path.join(__dirname, "public")));

app.use(errorController.get404);

mongoose
  .connect(
    "mongodb+srv://shiprajoshi:shipra@cluster0.bqapehd.mongodb.net/shop?retryWrites=true&w=majority"
  )
  .then((res) => {
    //console.log(res);
    User.findOne().then((u) => {
      if (!u) {
        const user = new User({
          name: "Shipra",
          email: "joshishipra0@gmail.com",
          cart: {
            products: [],
            totalPrice: 0,
          },
        });
        user.save();
      }
    });
    app.listen(3000);
  })
  .catch((err) => console.log(err));

// mongoConnect(() => {
//   console.log("client");
//   app.listen(3000);
// });

//const server = http.createServer(app); not required because express creates the server when we call listen method
