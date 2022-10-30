const express = require("express");

const bodyParser = require("body-parser");
const path = require("path");
const adminData = require("./routes/admin");
const customerRoutes = require("./routes/customer");
const dirName = require("./utils/path");
const app = express();

// tells  express which templating engine are we using, so that it finds files with that extension
app.set("view engine", "ejs");

// tells express where to find the above mentioned dynamic views, in our case /views
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));

//filter using /admin routes
app.use("/admin", adminData.router);

app.use(customerRoutes);

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res) => {
  res.status(404).sendFile(path.join(dirName, "views", "404NotFound.html"));
});

//const server = http.createServer(app); not required because express creates the server when we call listen method
app.listen(3000);
